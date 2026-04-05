<?php include 'partials/head.php'; ?>

<div class="launchpad">
    <div class="welcome-msg">
        <div class="welcome-text">
            <h1 class="logo">W<span id="trigger-edit" class="dot-online">O</span>RKSTATION</h1>
            <p id="date-display">Chargement...</p>
        </div>
    </div>

    <div class="grid-container" id="dashboard-grid">
        <div class="dashboard-row-4">
            <?php include 'widgets/w-clock.php'; ?>
            <?php include 'widgets/w-weather.php'; ?>
            <?php include 'widgets/w-palette.php'; ?>
            <?php include 'widgets/w-projets.php'; ?> 
        </div>

        <div class="project-group">
            <?php include 'widgets/w-add-project.php'; ?>

            <div id="resources-session-wrapper" class="resources-container">
                <?php include 'widgets/w-resources.php'; ?>
            </div>

            <h4 class="group-title">Lanceur Projets</h4>
            <div id="projects-auto-wrapper" class="dashboard-row-4"></div>
        </div>

        <div class="project-group">
            <h4 class="group-title">Modules & Outils</h4>
            <div id="shortcuts-manual-wrapper" class="dashboard-row-4">
                <?php include 'widgets/w-fonts-tester.php'; ?> </div>
        </div>

        <div class="dashboard-row-4">
            <div style="grid-column: span 2;">
                <?php include 'widgets/w-lorem.php'; ?>
            </div>
            <div style="grid-column: span 2;">
                <?php include 'widgets/w-px-to-rem.php'; ?>
            </div>
        </div>

        <div class="dashboard-row-full">
             <?php include 'widgets/w-lab.php'; ?>
        </div>

        <?php include 'widgets/w-notes.php'; ?>
        <?php include 'widgets/w-roadmap.php'; ?>
    </div>
</div>

<?php include 'partials/footer.php'; ?>