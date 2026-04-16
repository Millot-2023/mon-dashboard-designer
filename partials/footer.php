<?php require_once __DIR__ . '/config.php'; ?>
<?php foreach ($config['scripts'] as $script): ?>
    <script src="<?= $script ?>"></script>
<?php endforeach; ?>
</body>
</html>