<?php
// One-time import of the site's existing hardcoded content. Usage: php seed.php path/to/api/_lib.php path/to/src/assets
if (PHP_SAPI !== 'cli') exit;
define('JPGI', 1);
require $argv[1];
$assets = rtrim($argv[2], '/');
$db = db();
if ((int)$db->query('SELECT COUNT(*) FROM gallery_albums')->fetchColumn() > 0) exit("Already seeded\n");
$ins = fn($t, $d) => save_row($t, 0, $d);
foreach ([
  ['Admissions Open for Academic Year 2025-26', '2024-12-10', 'Admissions', 'Applications are now open for all undergraduate and diploma programs. Early bird scholarships available.'],
  ['National Seminar on Healthcare Innovation', '2024-12-05', 'Events', 'Join us for a two-day national seminar featuring experts from leading healthcare institutions.'],
  ['New Partnership with Apollo Hospitals', '2024-11-28', 'Partnership', 'Exciting new clinical training partnership with Apollo Hospitals for enhanced student exposure.'],
] as [$t, $d, $c, $e]) $ins('announcements', ['title' => $t, 'date' => $d, 'category' => $c, 'excerpt' => $e, 'link' => '/contact', 'is_published' => 1]);
foreach ([['hero-campus.jpg', 'Admissions Open 2025-26', "Join India's Premier Health Sciences Institution", 'Apply Now', '/apply'],
  ['hero-students.jpg', 'Excellence in Healthcare Education', 'Shaping Future Healthcare Leaders Since 2005', 'Explore Programs', '/academics'],
  ['hero-infrastructure.jpg', 'World-Class Infrastructure', 'State-of-the-Art Labs, Libraries & Clinical Facilities', 'Virtual Tour', '/about']] as $i => [$f, $t, $s, $c, $l])
  $ins('hero_slides', ['image' => save_image("$assets/$f")['file'], 'title' => $t, 'subtitle' => $s, 'cta' => $c, 'cta_link' => $l, 'is_published' => 1, 'sort_order' => $i]);
foreach ([['B.Sc Nursing', 'April 1-15, 2025'], ['BPT', 'April 5-20, 2025'], ['B.Sc MLT / EMT', 'April 10-25, 2025'], ['GNM', 'March 25 - April 10, 2025'], ['DMLT / D.OTT', 'March 20 - April 5, 2025']] as $i => [$p, $d])
  $ins('exam_schedules', ['program' => $p, 'date_text' => $d, 'status' => 'Upcoming', 'sort_order' => $i]);
foreach ([['Exam Time Table 2024-25', 'PDF', '245 KB'], ['Previous Year Question Papers', 'ZIP', '12 MB'], ['Exam Guidelines & Instructions', 'PDF', '180 KB'], ['Hall Ticket Download (Portal)', 'Link', '-']] as $i => [$n, $t, $s])
  $ins('exam_downloads', ['name' => $n, 'type' => $t, 'size_text' => $s, 'sort_order' => $i]);
foreach (['Academic Year Begins', 'Internal Assessments', 'University Examinations'] as $i => $e)
  $ins('calendar_events', ['event' => $e, 'date_text' => 'To be announced', 'sort_order' => $i]);
$albums = [['Campus', 'Campus', 'Campus', 'Janapriya Campus View', '/^Campus[ -](\d+)\.jpeg$/'],
  ['Clinical Facilities', 'Clinical Facilities', 'Clinical Facility', 'Clinical Facilities & Training Labs', '/^Clinical Facilities(\d+)\.jpeg$/']];
foreach ($albums as $ai => [$name, $dir, $prefix, $desc, $re]) {
  $album = $ins('gallery_albums', ['name' => $name, 'sort_order' => $ai]);
  $files = [];
  foreach (scandir("$assets/Gallery Images/$dir") as $f) if (preg_match($re, $f, $m)) $files[(int)$m[1]] = $f;
  ksort($files);
  $n = 0;
  foreach ($files as $f) {
    $n++;
    $ins('gallery_images', ['album_id' => $album['id'], 'image' => save_image("$assets/Gallery Images/$dir/$f")['file'], 'title' => "$prefix $n", 'description' => $desc, 'sort_order' => $n]);
  }
  echo "$name: $n photos\n";
}
echo "Seeded\n";
