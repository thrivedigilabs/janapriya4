<?php
define('JPGI', 1);
require __DIR__ . '/_lib.php';
header('Cache-Control: no-store');

$https = (($_SERVER['HTTPS'] ?? 'off') !== 'off') || (($_SERVER['HTTP_X_FORWARDED_PROTO'] ?? '') === 'https');
session_name('JPGI_ADMIN');
session_set_cookie_params(['lifetime' => 0, 'path' => '/api/', 'secure' => $https, 'httponly' => true, 'samesite' => 'Strict']);
session_start();

$action = (string)($_GET['action'] ?? '');
$isPost = $_SERVER['REQUEST_METHOD'] === 'POST';
// Custom header blocks cross-site form posts (browsers can't add it without a CORS preflight, which we never allow).
if (($_SERVER['HTTP_X_JPGI'] ?? '') !== '1') fail('Bad request');
$in = $_POST;
if ($isPost && str_starts_with((string)($_SERVER['CONTENT_TYPE'] ?? ''), 'application/json')) {
  $in = json_decode((string)file_get_contents('php://input'), true) ?: [];
}
function need_post(): void { global $isPost; if (!$isPost) fail('POST required', 405); }

function current_admin(): ?array {
  $id = $_SESSION['admin_id'] ?? 0;
  if (!$id || time() - ($_SESSION['t'] ?? 0) > 8 * 3600) return null;
  $_SESSION['t'] = time();
  $st = db()->prepare('SELECT id, email, name, role FROM admins WHERE id = ? AND is_active = 1');
  $st->execute([$id]);
  return $st->fetch() ?: null;
}

function log_action(array $who, string $action, string $resource = '', ?int $itemId = null, string $summary = ''): void {
  db()->prepare('INSERT INTO activity_log (admin_id, admin_email, action, resource, item_id, summary, ip) VALUES (?, ?, ?, ?, ?, ?, ?)')
    ->execute([$who['id'], $who['email'], $action, $resource, $itemId, mb_substr($summary, 0, 500), (string)($_SERVER['REMOTE_ADDR'] ?? '')]);
}

function item_label(array $row): string {
  foreach (['title', 'name', 'program', 'event', 'image', 'file'] as $k) if (!empty($row[$k])) return (string)$row[$k];
  return '';
}

function need_role_admin(array $admin): void { if ($admin['role'] !== 'admin') fail('Only admins can do this', 403); }

try {
  switch ($action) {
    case 'login':
      need_post();
      $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
      $st = db()->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at > NOW() - INTERVAL 15 MINUTE');
      $st->execute([$ip]);
      if ((int)$st->fetchColumn() >= 10) fail('Too many failed attempts. Try again in 15 minutes.', 429);
      $st = db()->prepare('SELECT * FROM admins WHERE email = ? AND is_active = 1');
      $st->execute([strtolower(trim((string)($in['email'] ?? '')))]);
      $u = $st->fetch();
      if (!$u || !password_verify((string)($in['password'] ?? ''), $u['pass_hash'])) {
        db()->prepare('INSERT INTO login_attempts (ip) VALUES (?)')->execute([$ip]);
        usleep(400000);
        fail('Invalid email or password', 401);
      }
      db()->prepare('DELETE FROM login_attempts WHERE ip = ?')->execute([$ip]);
      session_regenerate_id(true);
      $_SESSION['admin_id'] = (int)$u['id'];
      $_SESSION['t'] = time();
      db()->prepare('UPDATE admins SET last_login_at = NOW() WHERE id = ?')->execute([$u['id']]);
      $me = ['id' => (int)$u['id'], 'email' => $u['email'], 'name' => $u['name'], 'role' => $u['role']];
      log_action($me, 'login');
      json_out(['user' => $me]);
    case 'logout':
      need_post();
      if ($who = current_admin()) log_action($who, 'logout');
      $_SESSION = [];
      session_destroy();
      json_out(['ok' => true]);
    case 'me':
      json_out(['user' => current_admin()]);
  }

  $admin = current_admin() ?? fail('Please log in again', 401);

  switch ($action) {
    case 'password':
      need_post();
      $st = db()->prepare('SELECT pass_hash FROM admins WHERE id = ?');
      $st->execute([$admin['id']]);
      if (!password_verify((string)($in['current'] ?? ''), (string)$st->fetchColumn())) fail('Current password is wrong');
      $new = (string)($in['new'] ?? '');
      if (strlen($new) < 10) fail('New password must be at least 10 characters');
      db()->prepare('UPDATE admins SET pass_hash = ? WHERE id = ?')->execute([password_hash($new, PASSWORD_DEFAULT), $admin['id']]);
      session_regenerate_id(true);
      log_action($admin, 'password');
      json_out(['ok' => true]);
    case 'users':
      need_role_admin($admin);
      json_out(['rows' => db()->query('SELECT id, email, name, role, is_active, last_login_at, created_at FROM admins ORDER BY id')->fetchAll()]);
    case 'user_save':
      need_post();
      need_role_admin($admin);
      $id = (int)($in['id'] ?? 0);
      $email = strtolower(trim((string)($in['email'] ?? '')));
      $name = trim((string)($in['name'] ?? ''));
      $role = in_array($in['role'] ?? '', ['admin', 'editor'], true) ? $in['role'] : 'editor';
      $active = empty($in['is_active']) ? 0 : 1;
      $pw = (string)($in['password'] ?? '');
      if (!filter_var($email, FILTER_VALIDATE_EMAIL)) fail('Please enter a valid email');
      if ($name === '') fail('Please enter the person\'s name');
      if (($id === 0 || $pw !== '') && strlen($pw) < 10) fail('Password must be at least 10 characters');
      if ($id === $admin['id'] && ($role !== 'admin' || !$active)) fail('You cannot remove your own admin access');
      if ($id) {
        db()->prepare('UPDATE admins SET email = ?, name = ?, role = ?, is_active = ? WHERE id = ?')->execute([$email, $name, $role, $active, $id]);
        if ($pw !== '') db()->prepare('UPDATE admins SET pass_hash = ? WHERE id = ?')->execute([password_hash($pw, PASSWORD_DEFAULT), $id]);
      } else {
        db()->prepare('INSERT INTO admins (email, name, role, is_active, pass_hash) VALUES (?, ?, ?, ?, ?)')->execute([$email, $name, $role, $active, password_hash($pw, PASSWORD_DEFAULT)]);
        $id = (int)db()->lastInsertId();
      }
      log_action($admin, $in['id'] ? 'update' : 'create', 'staff', $id, "$name <$email> ($role" . ($active ? '' : ', disabled') . ($pw !== '' && $in['id'] ? ', password reset' : '') . ')');
      json_out(['ok' => true]);
    case 'activity':
      need_role_admin($admin);
      $uid = (int)($_GET['user'] ?? 0);
      $st = db()->prepare('SELECT l.*, a.name AS admin_name FROM activity_log l LEFT JOIN admins a ON a.id = l.admin_id' . ($uid ? ' WHERE l.admin_id = ?' : '') . ' ORDER BY l.id DESC LIMIT 500');
      $st->execute($uid ? [$uid] : []);
      json_out(['rows' => $st->fetchAll()]);
    case 'list':
      json_out(['rows' => list_rows((string)($_GET['r'] ?? ''), false)]);
    case 'save':
      need_post();
      $res = (string)($in['resource'] ?? ''); $id = (int)($in['id'] ?? 0); $data = (array)($in['data'] ?? []);
      $old = $id ? get_row($res, $id) : null;
      $row = save_row($res, $id, $data);
      if ($res !== 'leads') {
        $changed = $old ? array_keys(array_filter($row, fn($v, $k) => array_key_exists($k, $data) && (string)$old[$k] !== (string)$v, ARRAY_FILTER_USE_BOTH)) : [];
        log_action($admin, $old ? 'update' : 'create', $res, (int)$row['id'], item_label($row) . ($changed ? ' — changed: ' . implode(', ', $changed) : ''));
      }
      json_out(['row' => $row]);
    case 'delete':
      need_post();
      $res = (string)($in['resource'] ?? ''); $id = (int)($in['id'] ?? 0);
      $old = get_row($res, $id);
      delete_row($res, $id);
      log_action($admin, 'delete', $res, $id, $res === 'leads' ? 'Enquiry from ' . (string)($old['name'] ?? '') : item_label($old));
      json_out(['ok' => true]);
    case 'upload':
      need_post();
      $f = $_FILES['file'] ?? null;
      if (!$f || $f['error'] !== UPLOAD_ERR_OK) fail('Upload failed. Please try again.');
      json_out(($_POST['kind'] ?? '') === 'image' ? save_image($f['tmp_name']) : save_document($f['tmp_name'], (string)$f['name']));
    default:
      fail('Unknown action', 404);
  }
} catch (PDOException $e) {
  error_log('[jpgi admin] ' . $e->getMessage());
  if ($e->getCode() === '23000') fail('This item is still in use (for example, an album that still has photos).', 409);
  fail('Database error', 500);
}
