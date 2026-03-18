<?php include 'partials/head.php'; ?>

<div class="launchpad">
    <div class="welcome-msg">
        <h1>Workstation</h1>
        <p><?php echo date('l d F Y'); ?></p>
    </div>

    <div class="grid-container">
        <div class="card small">
            <h3 id="clock">--:--</h3>
            <p>Heure Locale</p>
        </div>

        <div class="card small">
            <h3>18°C</h3>
            <p>Paris, FR</p>
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

        <div class="card small" style="border-style: dashed; opacity: 0.5;">
            <div class="icon-placeholder" style="background: #7f8c8d;">+</div>
            <h3>Ajouter</h3>
        </div>
    </div>
</div>

<?php include 'partials/footer.php'; ?>