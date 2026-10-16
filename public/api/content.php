<?php
define('JPGI', 1);
require __DIR__ . '/_lib.php';
header('Cache-Control: public, max-age=30');
try {
  json_out(public_content());
} catch (Throwable $e) {
  error_log('[jpgi content] ' . $e->getMessage());
  fail('Content temporarily unavailable', 503);
}
