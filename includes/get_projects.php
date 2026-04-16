<?php
// includes/get_projects.php - Générateur dynamique de projets & Merge manuel
header('Content-Type: application/json');

$jsonFile = __DIR__ . '/../data/projects.json';
$storedProjects = [];
if (file_exists($jsonFile)) {
    $content = file_get_contents($jsonFile);
    $storedProjects = json_decode($content, true);
    if (!is_array($storedProjects)) $storedProjects = [];
}

// 1. Scan du répertoire htdocs
$htdocsDir = realpath(__DIR__ . '/../../');
$scannedFolders = [];

if (is_dir($htdocsDir)) {
    $items = scandir($htdocsDir);
    foreach ($items as $item) {
        if ($item === '.' || $item === '..' || mb_strtolower($item) === 'mon-dashboard-designer') continue;
        if (is_dir($htdocsDir . '/' . $item)) {
            $scannedFolders[mb_strtolower($item)] = $item;
        }
    }
}

$finalProjects = [];
$handledNames = [];

// 2. Traitement des projets présents dans le JSON
foreach ($storedProjects as $p) {
    if (!isset($p['name'])) continue;
    $lowerName = mb_strtolower($p['name']);
    
    // Rétrocompatibilité : si isLocal n'existe pas, on détermine par l'URL
    $isLocal = isset($p['isLocal']) ? $p['isLocal'] : (strpos($p['url'], 'localhost') !== false);
    $p['isLocal'] = $isLocal;
    
    // Force la présence des clés de session
    if (!isset($p['totalTime'])) $p['totalTime'] = 0;
    if (!isset($p['active'])) $p['active'] = false;
    if (!isset($p['startTime'])) $p['startTime'] = null;

    if ($isLocal) {
        // Le projet est local. Existe-t-il encore sur le disque ?
        // On vérifie en mappant sur le basename de l'URL ou sur le nom
        $basename = mb_strtolower(basename($p['url']));
        if (isset($scannedFolders[$basename]) || isset($scannedFolders[$lowerName])) {
            $finalProjects[] = $p;
            $handledNames[] = $lowerName;
            $handledNames[] = $basename;
        }
        // Sinon, le dossier a été supprimé d'htdocs, on le drop (auto-nettoyage)
    } else {
        // Le projet est un raccourci manuel (URL externe), on le conserve
        $finalProjects[] = $p;
        $handledNames[] = $lowerName;
    }
}

// 3. Détection de TOUT NOUVEAU dossier htdocs non présent dans le JSON
foreach ($scannedFolders as $lower => $originalName) {
    if (!in_array($lower, $handledNames)) {
        $finalProjects[] = [
            'id' => md5($originalName . time()),
            'name' => ucfirst($originalName),
            'url' => 'http://localhost/' . $originalName,
            'initial' => mb_strtoupper(mb_substr($originalName, 0, 1)),
            'isLocal' => true,
            'totalTime' => 0,
            'active' => false,
            'startTime' => null
        ];
    }
}

echo json_encode($finalProjects);
?>
