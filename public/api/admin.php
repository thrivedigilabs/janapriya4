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
  $st = db()->prepare('SELECT id, email FROM admins WHERE id = ?');
  $st->execute([$id]);
  return $st->fetch() ?: null;
}

try {
  switch ($action) {
    case 'login':
      need_post();
      $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
      $st = db()->prepare('SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND attempted_at > NOW() - INTERVAL 15 MINUTE');
      $st->execute([$ip]);
      if ((int)$st->fetchColumn() >= 10) fail('Too many failed attempts. Try again in 15 minutes.', 429);
      $st = db()->prepare('SELECT * FROM admins WHERE email = ?');
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
      json_out(['user' => ['id' => (int)$u['id'], 'email' => $u['email']]]);
    case 'logout':
      need_post();
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
      json_out(['ok' => true]);
    case 'list':
      json_out(['rows' => list_rows((string)($_GET['r'] ?? ''), false)]);
    case 'save':
      need_post();
      json_out(['row' => save_row((string)($in['resource'] ?? ''), (int)($in['id'] ?? 0), (array)($in['data'] ?? []))]);
    case 'delete':
      need_post();
      delete_row((string)($in['resource'] ?? ''), (int)($in['id'] ?? 0));
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
