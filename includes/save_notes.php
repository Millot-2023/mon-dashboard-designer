<?php
if (isset($_POST['content'])) {
    $path = dirname(__DIR__) . '/data/notes.txt';
    
    // LOCK_EX empêche d'autres processus d'écrire en même temps
    // On s'assure que même une chaîne vide est écrite pour supprimer les lignes
    if (file_put_contents($path, $_POST['content'], LOCK_EX) !== false) {
        // Optionnel : force la purge du cache de fichiers PHP pour ce fichier précis
        clearstatcache(true, $path);
        echo "OK";
    } else {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Erreur d'écriture";
    }
}