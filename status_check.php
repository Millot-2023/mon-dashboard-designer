<?php
error_reporting(0); // Empêche les warnings de polluer la réponse JSON/Text

function checkService($port) {
    // Test sur localhost avec le port spécifié
    $connection = @fsockopen('127.0.0.1', $port, $errno, $errstr, 1);
    if ($connection) {
        fclose($connection);
        return true;
    }
    return false;
}

// Diagnostic : Apache (80) et ton MySQL spécifique (3307)
$apache = checkService(80);
$mysql  = checkService(3307); 

// Réponse brute pour le JavaScript
echo ($apache && $mysql) ? "online" : "offline";
exit;