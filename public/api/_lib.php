<?php
declare(strict_types=1);
if (!defined('JPGI')) { http_response_code(403); exit; }

// Types: s=string, t=long text, i=int, b=bool, d=date (YYYY-MM-DD), u=url/path, f=uploaded file name
const RESOURCES = [
  'announcements' => [
    'fields' => ['title' => 's', 'date' => 'd', 'category' => 's', 'excerpt' => 't', 'body' => 't', 'link' => 'u', 'is_published' => 'b', 'sort_order' => 'i'],
    'required' => ['title', 'date'], 'order' => 'date DESC, sort_order, id DESC', 'public' => 'is_published = 1',
  ],
  'gallery_albums' => [
    'fields' => ['name' => 's', 'sort_order' => 'i'], 'required' => ['name'], 'order' => 'sort_order, id',
  ],
  'gallery_images' => [
    'fields' => ['album_id' => 'i', 'image' => 'f', 'title' => 's', 'description' => 's', 'sort_order' => 'i'],
    'required' => ['album_id', 'image'], 'order' => 'sort_order, id',
  ],
  'hero_slides' => [
    'fields' => ['image' => 'f', 'title' => 's', 'subtitle' => 's', 'cta' => 's', 'cta_link' => 'u', 'is_published' => 'b', 'sort_order' => 'i'],
    'required' => ['image', 'title'], 'order' => 'sort_order, id', 'public' => 'is_published = 1',
  ],
  'exam_schedules' => [
    'fields' => ['program' => 's', 'date_text' => 's', 'status' => 's', 'sort_order' => 'i'], 'required' => ['program'], 'order' => 'sort_order, id',
  ],
  'exam_downloads' => [
    'fields' => ['name' => 's', 'type' => 's', 'size_text' => 's', 'file' => 'f', 'url' => 'u', 'sort_order' => 'i'], 'required' => ['name'], 'order' => 'sort_order, id',
  ],
  'calendar_events' => [
    'fields' => ['event' => 's', 'date_text' => 's', 'sort_order' => 'i'], 'required' => ['event'], 'order' => 'sort_order, id',
  ],
  'leads' => [
    'fields' => ['is_read' => 'b'], 'order' => 'id DESC', 'private' => true,
  ],
];

const FILE_RE = '/^(t_)?[a-f0-9]{24}\.(jpg|pdf|zip|docx?|xlsx?)$/';
const FILE_MIME = [
  'jpg' => 'image/jpeg', 'pdf' => 'application/pdf', 'zip' => 'application/zip', 'doc' => 'application/msword',
  'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls' => 'application/vnd.ms-excel', 'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
];

function cfg(): array {
  static $c = null;
  if ($c === null) {
    $path = getenv('JPGI_CONFIG') ?: dirname(__DIR__, 4) . '/jpgi_cms/config.php';
    $c = require $path;
    $c['upload_dir'] = $c['upload_dir'] ?? dirname($path) . '/uploads';
    if (!is_dir($c['upload_dir'])) mkdir($c['upload_dir'], 0755, true);
  }
  return $c;
}

function db(): PDO {
  static $pdo = null;
  if ($pdo === null) {
    $c = cfg();
    $pdo = new PDO("mysql:host={$c['db_host']};dbname={$c['db_name']};charset=utf8mb4", $c['db_user'], $c['db_pass'], [
      PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
      PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
      PDO::ATTR_EMULATE_PREPARES => false,
    ]);
  }
  return $pdo;
}

function json_out(mixed $data, int $code = 200): never {
  http_response_code($code);
  header('Content-Type: application/json; charset=utf-8');
  header('X-Content-Type-Options: nosniff');
  echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
  exit;
}

function fail(string $msg, int $code = 400): never {
  json_out(['error' => $msg], $code);
}

function resource(string $name): array {
  return RESOURCES[$name] ?? fail('Unknown section', 404);
}

function list_rows(string $name, bool $public): array {
  $def = resource($name);
  $where = $public && isset($def['public']) ? "WHERE {$def['public']}" : '';
  return db()->query("SELECT * FROM `$name` $where ORDER BY {$def['order']}")->fetchAll();
}

function public_content(): array {
  $out = [];
  foreach (RESOURCES as $name => $def) if (empty($def['private'])) $out[$name] = list_rows($name, true);
  return $out;
}

function clean_data(array $def, array $data, bool $isNew): array {
  $out = [];
  foreach ($def['fields'] as $k => $t) {
    if (!array_key_exists($k, $data)) continue;
    $v = $data[$k];
    $s = trim((string)($v ?? ''));
    $out[$k] = match ($t) {
      'i' => (int)$v,
      'b' => $v ? 1 : 0,
      'd' => preg_match('/^\d{4}-\d{2}-\d{2}$/', $s) ? $s : fail("Please enter a valid date"),
      'u' => ($s === '' || preg_match('#^(/|https?://|mailto:|tel:)#i', $s)) ? mb_substr($s, 0, 500) : fail('Links must start with / or https://'),
      'f' => ($s === '' || preg_match(FILE_RE, $s)) ? $s : fail('Invalid file'),
      't' => mb_substr($s, 0, 60000),
      default => mb_substr($s, 0, 500),
    };
  }
  foreach ($def['required'] ?? [] as $k) {
    if (($isNew || array_key_exists($k, $out)) && (($out[$k] ?? '') === '' || ($out[$k] ?? null) === 0)) {
      fail('Please fill in: ' . str_replace('_', ' ', $k));
    }
  }
  return $out;
}

function save_row(string $name, int $id, array $data): array {
  $def = resource($name);
  $data = clean_data($def, $data, $id === 0);
  if (!$data && $id) fail('Nothing to save');
  $cols = array_keys($data);
  if ($id) {
    $old = get_row($name, $id);
    $set = implode(', ', array_map(fn($c) => "`$c` = ?", $cols));
    db()->prepare("UPDATE `$name` SET $set WHERE id = ?")->execute([...array_values($data), $id]);
    foreach ($def['fields'] as $k => $t) {
      if ($t === 'f' && isset($data[$k]) && $old[$k] !== $data[$k]) remove_file_if_unused($name, $k, (string)$old[$k]);
    }
  } else {
    $ph = implode(', ', array_fill(0, count($cols), '?'));
    db()->prepare("INSERT INTO `$name` (`" . implode('`, `', $cols) . "`) VALUES ($ph)")->execute(array_values($data));
    $id = (int)db()->lastInsertId();
  }
  return get_row($name, $id);
}

function get_row(string $name, int $id): array {
  resource($name);
  $st = db()->prepare("SELECT * FROM `$name` WHERE id = ?");
  $st->execute([$id]);
  return $st->fetch() ?: fail('Item not found', 404);
}

function delete_row(string $name, int $id): void {
  $def = resource($name);
  $row = get_row($name, $id);
  db()->prepare("DELETE FROM `$name` WHERE id = ?")->execute([$id]);
  foreach ($def['fields'] as $k => $t) if ($t === 'f') remove_file_if_unused($name, $k, (string)$row[$k]);
}

function remove_file_if_unused(string $name, string $col, string $file): void {
  if ($file === '' || !preg_match(FILE_RE, $file)) return;
  $st = db()->prepare("SELECT COUNT(*) FROM `$name` WHERE `$col` = ?");
  $st->execute([$file]);
  if ((int)$st->fetchColumn() > 0) return;
  $dir = cfg()['upload_dir'];
  @unlink("$dir/$file");
  @unlink("$dir/t_$file");
}

function save_image(string $tmp): array {
  $info = @getimagesize($tmp);
  if (!$info || !in_array($info[2], [IMAGETYPE_JPEG, IMAGETYPE_PNG, IMAGETYPE_WEBP], true)) fail('Only JPG, PNG or WebP images are allowed');
  if ($info[0] * $info[1] > 50_000_000) fail('Image is too large');
  $src = match ($info[2]) {
    IMAGETYPE_JPEG => @imagecreatefromjpeg($tmp),
    IMAGETYPE_PNG => @imagecreatefrompng($tmp),
    IMAGETYPE_WEBP => @imagecreatefromwebp($tmp),
  };
  if (!$src) fail('Could not read image');
  if ($info[2] === IMAGETYPE_JPEG && function_exists('exif_read_data')) {
    $e = @exif_read_data($tmp);
    $o = is_array($e) ? (int)($e['Orientation'] ?? 1) : 1;
    $src = match ($o) { 3 => imagerotate($src, 180, 0), 6 => imagerotate($src, -90, 0), 8 => imagerotate($src, 90, 0), default => $src };
  }
  $name = bin2hex(random_bytes(12)) . '.jpg';
  $dir = cfg()['upload_dir'];
  write_jpeg($src, 1920, "$dir/$name");
  write_jpeg($src, 800, "$dir/t_$name");
  return ['file' => $name, 'size_text' => human_size((int)filesize("$dir/$name")), 'type' => 'JPG'];
}

function write_jpeg(GdImage $src, int $max, string $path): void {
  $w = imagesx($src);
  $h = imagesy($src);
  $s = min(1, $max / max($w, $h));
  $nw = max(1, (int)round($w * $s));
  $nh = max(1, (int)round($h * $s));
  $dst = imagecreatetruecolor($nw, $nh);
  imagefill($dst, 0, 0, imagecolorallocate($dst, 255, 255, 255));
  imagecopyresampled($dst, $src, 0, 0, 0, 0, $nw, $nh, $w, $h);
  imageinterlace($dst, true);
  if (!imagejpeg($dst, $path, 82)) fail('Could not save image', 500);
}

function save_document(string $tmp, string $origName): array {
  $size = (int)filesize($tmp);
  if ($size > 25 * 1024 * 1024) fail('File must be under 25 MB');
  $mime = (new finfo(FILEINFO_MIME_TYPE))->file($tmp);
  $origExt = strtolower(pathinfo($origName, PATHINFO_EXTENSION));
  $ext = array_search($mime, FILE_MIME, true);
  if ($mime === 'application/x-zip-compressed') $ext = 'zip';
  // Office files are zip/CDF containers; trust the original extension only within that family.
  if (in_array($ext, ['zip', false], true) && in_array($origExt, ['docx', 'xlsx'], true) && in_array($mime, ['application/zip', 'application/octet-stream'], true)) $ext = $origExt;
  if (in_array($mime, ['application/x-ole-storage', 'application/CDFV2', 'application/vnd.ms-office'], true) && in_array($origExt, ['doc', 'xls'], true)) $ext = $origExt;
  if (!$ext || $ext === 'jpg') fail('Allowed files: PDF, ZIP, Word, Excel');
  $name = bin2hex(random_bytes(12)) . ".$ext";
  $dest = cfg()['upload_dir'] . "/$name";
  $ok = is_uploaded_file($tmp) ? move_uploaded_file($tmp, $dest) : copy($tmp, $dest);
  if (!$ok) fail('Could not save file', 500);
  chmod($dest, 0644);
  return ['file' => $name, 'size_text' => human_size($size), 'type' => strtoupper($ext)];
}

function human_size(int $b): string {
  if ($b >= 1048576) return round($b / 1048576, 1) . ' MB';
  return max(1, (int)round($b / 1024)) . ' KB';
}
