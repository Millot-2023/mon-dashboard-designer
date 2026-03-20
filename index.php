<?php include 'partials/head.php'; ?>

<div class="launchpad">

    <div class="welcome-msg">
        <div class="welcome-text">
            <h1 class="logo">W<span id="trigger-edit" class="dot-online">O</span>RKSTATION</h1>
            <p id="date-display" style="margin: 0; opacity: 0.5; font-size: 0.8rem;">Chargement...</p>
        </div>
    </div>

    <div class="grid-container" id="dashboard-grid">

        <?php include 'widgets/w-clock.php'; ?>
        <?php include 'widgets/w-weather.php'; ?>
        <?php include 'widgets/w-palette.php'; ?>
        <div class="card small">
            <h3 id="timer-display" style="margin: 0;">00:00</h3>
            <p style="margin:0; font-size:0.8rem; opacity: 0.6;">Session</p>
        </div>

        <?php include 'widgets/w-lorem.php'; ?>
        <?php include 'widgets/w-px-to-rem.php'; ?>
        
        <div id="projects-wrapper" style="grid-column: 1 / -1; display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px;"></div>

        <div class="card large notes-card" style="grid-column: 1 / -1;">
            <div class="notes-header">
                <h3 style="margin:0; text-align: left;">🗒️ Notes Rapides</h3>
                <button id="clear-notes" class="btn-purge">Effacer tout</button>
            </div>
            <textarea id="notes-area" placeholder="Écrivez vos notes ici..."></textarea>
        </div>

    </div>
</div>

<?php include 'partials/footer.php'; ?>