<?php require 'includes/db.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Configuration</title>
    <link rel="stylesheet" href="css/main.css">
</head>
<body>
    <div style="padding: 50px;">
        <a href="index.php">← Retour</a>
        <h1>Configuration</h1>
        <div class="grid-container" id="sortable-grid">
            <?php
            $stmt = $pdo->query("SELECT * FROM widgets ORDER BY ordre ASC");
            while($w = $stmt->fetch()): ?>
                <div class="card <?php echo $w['est_visible'] ? '' : 'is-hidden'; ?>" draggable="true" data-id="<?php echo $w['id']; ?>">
                    <div class="card-header">
                        <h3><?php echo $w['titre']; ?></h3>
                        <span>⠿</span>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>
    <script src="js/drag-drop.js"></script>
</body>
</html>