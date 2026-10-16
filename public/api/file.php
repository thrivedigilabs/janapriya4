<?php
define('JPGI', 1);
require __DIR__ . '/_lib.php';
$f = (string)($_GET['f'] ?? '');
$path = preg_match(FILE_RE, $f) ? cfg()['upload_dir'] . '/' . $f : '';
if ($path === '' || !is_file($path)) { http_response_code(404); exit; }
$ext = pathinfo($f, PATHINFO_EXTENSION);
header('Content-Type: ' . FILE_MIME[$ext]);
header('Content-Length: ' . filesize($path));
header('Cache-Control: public, max-age=31536000, immutable');
header('X-Content-Type-Options: nosniff');
if ($ext !== 'jpg') {
  $n = trim(preg_replace('/[^\w.\- ]+/', '', (string)($_GET['n'] ?? ''))) ?: 'download';
  header('Content-Disposition: ' . ($ext === 'pdf' ? 'inline' : 'attachment') . "; filename=\"$n.$ext\"");
}
readfile($path);
