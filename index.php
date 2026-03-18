<?php include 'partials/head.php'; ?>

<div class="launchpad">
    <div class="welcome-msg">
        <h1>Workstation</h1>
        <p id="date-display">Chargement...</p>
    </div>

    <div class="grid-container">
        <div class="card small">
            <h3 id="clock">--:--</h3>
            <p>Heure Locale</p>
        </div>

        <div class="card small">
            <h3 style="display: flex; align-items: center; gap: 8px; justify-content: center;">
                <span id="weather-icon">☀️</span> <span id="weather-temp">--</span>°C
            </h3>
            <p id="weather-city">Paris, FR</p>
        </div>

        <div class="card small">
            <h3 style="display: flex; align-items: center; gap: 10px; justify-content: center;">
                <div id="status-lamp" style="width: 10px; height: 10px; border-radius: 50%; background: #2ecc71; box-shadow: 0 0 8px #2ecc71;"></div>
                <span>Online</span>
            </h3>
            <p>Localhost (PHP)</p>
        </div>

        <div class="card small" onclick="generatePalette()">
            <div id="palette-display" style="display: flex; gap: 5px; margin-bottom: 8px; justify-content: center;">
                <div style="width:18px; height:18px; border-radius:4px; background:#3498db"></div>
                <div style="width:18px; height:18px; border-radius:4px; background:#e74c3c"></div>
                <div style="width:18px; height:18px; border-radius:4px; background:#f1c40f"></div>
            </div>
            <p id="palette-hex">#Palette</p>
        </div>

        <div class="card medium" onclick="location.href='editor.php'">
            <div class="icon-placeholder">E</div>
            <h3>Editor</h3>
            <p>Code & Structure</p>
        </div>

        <div class="card medium" onclick="location.href='personator.php'">
            <div class="icon-placeholder">P</div>
            <h3>Personator</h3>
            <p>Identités & UX</p>
        </div>

        <div class="card medium" onclick="location.href='arboretor.php'">
            <div class="icon-placeholder">A</div>
            <h3>Arboretor</h3>
            <p>Arborescence & Flux</p>
        </div>

        <div class="card small" id="timer-card" onclick="toggleTimer()">
            <h3 id="timer-display">00:00</h3>
            <p id="timer-status">Start Session</p>
        </div>

        <div class="card small" onclick="addQuickNote()" style="border-style: dashed; opacity: 0.7;">
            <div class="icon-placeholder" style="background: #7f8c8d;">+</div>
            <h3>Note</h3>
        </div>

        <div class="card large" style="text-align: left; align-items: flex-start; min-height: 150px;">
            <div style="display: flex; justify-content: space-between; width: 100%; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0;">🗒️ Notes Rapides</h3>
                <button onclick="clearNotes()" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: white; cursor: pointer; border-radius: 5px; font-size: 0.7rem; padding: 5px 10px;">Effacer tout</button>
            </div>
            <div id="notes-container" style="width: 100%; display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                </div>
        </div>
    </div>
</div>

<?php include 'partials/footer.php'; ?>