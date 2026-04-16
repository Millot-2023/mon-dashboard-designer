<?php 
require_once __DIR__ . '/includes/functions.php';
include 'partials/head.php'; 
?>

<div class="launchpad">
    <div class="welcome-msg">
        <div class="welcome-text">
            <h1 class="logo">W<span id="trigger-edit" class="dot-online">O</span>RKSTATION</h1>
            <p id="date-display">Chargement...</p>
        </div>
    </div>

    <div class="grid-container" id="dashboard-grid">
        
        <div class="dashboard-row-4">
            <?php renderWidget('clock', 'small', 'clock-card'); ?>
            <?php renderWidget('weather', 'small', 'weather-card'); ?>
            <?php renderWidget('palette', 'card-tier-system', '', 'id="palette-card"'); ?>
            <?php renderWidget('projets', 'card-tier-system', '', 'id="session-card"'); ?> 
        </div>

        <div class="project-group">
            <h4 class="group-title">Lanceur Projets</h4>
            <?php renderWidget('add-project', 'card-new', '', 'id="project-creator-bar"'); ?>
            <div id="resources-session-wrapper" class="resources-container">
                <?php include 'widgets/w-resources.php'; ?>
            </div>
          
            <div id="projects-auto-wrapper" class="dashboard-row-4"></div>
        </div>

        <div class="project-group">
            <h4 class="group-title">Modules & Outils</h4>
            <div id="shortcuts-manual-wrapper" class="dashboard-row-4">
                <?php renderWidget('fonts-tester', 'card-tier-system', '', 'id="fonts-tester-card"'); ?> 
            </div>
        </div>

        <div class="dashboard-row-4">
            <div style="grid-column: span 2;">
                <?php renderWidget('lorem', 'card-tier-system large', '', 'id="lorem-generator" data-id="lorem"'); ?>
            </div>
            <div style="grid-column: span 2;">
                <?php renderWidget('px-to-rem', 'card-tier-system large', '', 'id="converter-px-rem" data-id="px-rem"'); ?>
            </div>
        </div>

        <div class="dashboard-row-full">
            <?php renderWidget('codepen', 'card-tier-system', 'lab-preview-card codepen-wrapper', 'id="codepen-master-card"'); ?> 
        </div>

        <div class="dashboard-row-full">
            <?php renderWidget('lab', 'card-tier-system large', 'lab-card', 'id="css-lab"'); ?>
        </div>

        <?php renderWidget('notes', 'large', 'notes-card', 'style="grid-column: 1 / -1;"'); ?>
        <?php include 'widgets/w-roadmap.php'; ?>
        
    </div>
</div>

<?php include 'partials/footer.php'; ?>