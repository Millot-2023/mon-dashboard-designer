<?php
// includes/save_projects.php - EndPoint Flat-File sécure
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['projects'])) {
    $dir = __DIR__ . '/../data';
    if (!is_dir($dir)) mkdir($dir, 0777, true);
    
    $json = $_POST['projects'];
    // On valide l'intégrité JSON
    if (json_decode($json) !== null) {
        file_put_contents($dir . '/projects.json', $json);
        echo "OK";
    } else {
        http_response_code(400);
        echo "Error: JSON invalide";
    }
}
?>
