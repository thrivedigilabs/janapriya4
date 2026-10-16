<?php
// Usage (CLI on server): php create_admin.php path/to/api/_lib.php email password
if (PHP_SAPI !== 'cli') exit;
define('JPGI', 1);
require $argv[1];
[$email, $pass] = [strtolower(trim($argv[2])), $argv[3]];
db()->prepare('INSERT INTO admins (email, pass_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE pass_hash = VALUES(pass_hash)')
  ->execute([$email, password_hash($pass, PASSWORD_DEFAULT)]);
echo "Admin ready: $email\n";
