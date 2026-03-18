<?php
// includes/widgets-loader.php
function renderWidgets($pdo) {
    // On récupère uniquement les widgets visibles, triés par l'ordre défini
    $stmt = $pdo->query("SELECT * FROM widgets WHERE est_visible = 1 ORDER BY ordre ASC");
    $widgets = $stmt->fetchAll();

    if (!$widgets) {
        echo "<p style='color:white; text-align:center; width:100%; padding:20px;'>Aucun widget actif. Activez-en dans les réglages.</p>";
        return;
    }

    foreach ($widgets as $w) {
        $file = "widgets/" . $w['nom_technique'] . ".php";
        if (file_exists($file)) {
            // On entoure le contenu du fichier par la structure de la Card
            echo '<div class="card" draggable="true" data-id="' . $w['id'] . '">';
            echo '  <div class="card-header">';
            echo '      <h3>' . htmlspecialchars($w['titre']) . '</h3>';
            echo '      <div class="controls"><span class="drag-handle">⠿</span></div>';
            echo '  </div>';
            echo '  <div class="card-body">';
            include $file; // On inclut le contenu spécifique (HTML/PHP du widget)
            echo '  </div>';
            echo '</div>';
        }
    }
}