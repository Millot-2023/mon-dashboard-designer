<div class="card small" id="session-card">
    <div class="tier-header">
        <h3>⏱️ SESSION TRAVAIL</h3>
    </div>
    <div class="tier-body">
        <div class="custom-select" id="session-project-container">
            <div class="select-trigger">
                <span>Chargement des projets</span>
                <i class="chevron"></i>
            </div>
            <div class="select-options">
                </div>
            <input type="hidden" id="session-project-id" value="">
        </div>
    </div>
    <div class="tier-footer" style="display: flex; align-items: center; gap: 10px;">
        <button class="btn-session" id="btn-session-toggle">START</button>
        <span id="session-timer" style="font-family: monospace; font-size: 1.2rem; min-width: 80px;">00:00:00</span>
        <button id="btn-session-reset" style="background:none; border:none; color:gray; cursor:pointer; font-size: 0.7rem;">Reset</button>
    </div>
</div>