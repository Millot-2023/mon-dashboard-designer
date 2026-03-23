<?php
if (isset($_POST['projects'])) {
    $path = dirname(__DIR__) . '/data/projects.json';
    file_put_contents($path, $_POST['projects']);
    echo "Configuration enregistrée";
}