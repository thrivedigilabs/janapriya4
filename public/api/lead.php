<?php
define('JPGI', 1);
require __DIR__ . '/_lib.php';
if ($_SERVER['REQUEST_METHOD'] !== 'POST') fail('POST required', 405);
$raw = (string)file_get_contents('php://input');
if (strlen($raw) > 20000) fail('Too large');
$in = json_decode($raw, true);
if (!is_array($in)) fail('Bad request');
$type = in_array($in['formType'] ?? '', ['contact', 'application'], true) ? $in['formType'] : fail('Bad form');
$data = [];
foreach ($in as $k => $v) if (is_string($k) && preg_match('/^\w{1,40}$/', $k) && is_scalar($v)) $data[$k] = mb_substr(trim((string)$v), 0, 2000);
$name = trim($data['name'] ?? (($data['firstName'] ?? '') . ' ' . ($data['lastName'] ?? '')));
if ($name === '' || (($data['phone'] ?? '') === '' && ($data['email'] ?? '') === '')) fail('Please fill in your name and phone or email');
$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
try {
  $st = db()->prepare('SELECT COUNT(*) FROM leads WHERE ip = ? AND created_at > NOW() - INTERVAL 10 MINUTE');
  $st->execute([$ip]);
  if ((int)$st->fetchColumn() >= 5) fail('Too many submissions. Please try again later.', 429);
  db()->prepare('INSERT INTO leads (form_type, name, email, phone, data, ip) VALUES (?, ?, ?, ?, ?, ?)')
    ->execute([$type, mb_substr($name, 0, 255), mb_substr($data['email'] ?? '', 0, 255), mb_substr($data['phone'] ?? '', 0, 40), json_encode($data, JSON_UNESCAPED_UNICODE), $ip]);
  json_out(['ok' => true]);
} catch (PDOException $e) {
  error_log('[jpgi lead] ' . $e->getMessage());
  fail('Could not save', 500);
}
