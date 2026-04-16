<?php
/**
 * Helper Flat-File pour la génération des wrappers de composants.
 * Permet de centraliser et d'alléger le balisage de index.php.
 */
function renderWidget($slug, $size = 'medium', $extraClass = '', $extraAttr = '') {
    $file = __DIR__ . '/../widgets/w-' . $slug . '.php';
    $classes = trim("card {$size} widget-{$slug} {$extraClass}");
    
    echo "<div class=\"{$classes}\" {$extraAttr}>\n";
    
    if (file_exists($file)) {
        include $file;
    } else {
        echo "<p style='padding:10px; color:#e74c3c; font-size:0.8rem;'>Module [ {$slug} ] manquant.</p>";
    }
    
    echo "</div>\n";
}
?>
