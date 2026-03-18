<?php include 'partials/head.php'; ?>

<div class="launchpad">
    <div class="welcome-msg">
        <h1>Workstation</h1>
        <p id="date-display">Chargement...</p>
    </div>

    <div class="grid-container">
        <div class="card small" style="gap: 10px;">
            <div style="border-bottom: 1px solid rgba(255,255,255,0.1); width: 100%; padding-bottom: 8px;">
                <h3 id="clock" style="margin:0; font-size: 1.8rem;">00:00</h3>
            </div>
            <div style="width: 100%;">
                <h3 id="temp-display" style="margin:0; font-size: 1.2rem;">15 °C</h3>
            </div>
        </div>

        <div class="card small">
            <h3 style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                <div style="width: 10px; height: 10px; border-radius: 50%; background: #2ecc71;"></div>
                <span>Online</span>
            </h3>
            <p style="margin:0; font-size:0.8rem; opacity:0.6;">Localhost</p>
        </div>

        <div class="card small">
            <div style="display: flex; gap: 5px; margin-bottom: 8px; justify-content: center;">
                <div style="width:12px; height:12px; background:#3498db; border-radius:2px;"></div>
                <div style="width:12px; height:12px; background:#9b59b6; border-radius:2px;"></div>
                <div style="width:12px; height:12px; background:#2ecc71; border-radius:2px;"></div>
            </div>
            <p style="margin:0;">#Palette</p>
        </div>

        <div class="card small">
            <h3 id="timer-display">00:00</h3>
            <p style="margin:0; font-size:0.8rem;">Session</p>
        </div>

        <div id="projects-wrapper"></div>

        <div class="card large">
            <h3 style="margin:0; text-align: left; width: 100%;">🗒️ Notes Rapides</h3>
            <div id="notes-container"></div>
        </div>
    </div>
</div>

<?php include 'partials/footer.php'; ?>