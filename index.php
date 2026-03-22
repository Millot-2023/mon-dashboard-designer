<?php include 'partials/head.php'; ?>

<div class="launchpad">
    <div class="welcome-msg">
        <div class="welcome-text">
            <h1 class="logo">W<span id="trigger-edit" class="dot-online">O</span>RKSTATION</h1>
            <p id="date-display">Chargement...</p>
        </div>
    </div>

    <div class="grid-container" id="dashboard-grid">
        <?php include 'widgets/w-clock.php'; ?>
        <?php include 'widgets/w-weather.php'; ?>
        <?php include 'widgets/w-palette.php'; ?>
        <?php include 'widgets/w-projets.php'; ?>

        <div id="projects-wrapper"></div>
        
        <?php include 'widgets/w-lorem.php'; ?>
        <?php include 'widgets/w-px-to-rem.php'; ?>
        <?php include 'widgets/w-notes.php'; ?>
        <?php include 'widgets/w-roadmap.php'; ?>
    </div>
</div>

<?php include 'partials/footer.php'; ?>