<?php
error_reporting(0);
ini_set('display_errors', 0);

$activeProjects = [
    'user_journey-v1.0',
    'skeletor-v1.0',
    'personator-v1.2',
    'mon_book',
    'cms-2026-v8'
];

$projects = [];
foreach ($activeProjects as $folder) {
    $projects[] = [
        'name'    => $folder,
        'url'     => 'http://localhost/' . $folder, 
        'initial' => strtoupper(substr($folder, 0, 1))
    ];
}

ob_clean();
header('Content-Type: application/json; charset=utf-8');
echo json_encode($projects);
exit;