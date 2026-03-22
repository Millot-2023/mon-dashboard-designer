<div class="card card-tier-system" id="session-card">
    <div class="tier-header">
        <h3>⏱️ PROJETS</h3>
    </div>
    
    <div class="tier-body">
        <div class="custom-select" id="session-project-container">
            <div class="select-trigger">
                <span>Sélectionner un projet</span>
            </div>
            <div class="select-options">
                <div class="option selected" data-value="work">Workstation</div>
                <div class="option" data-value="design">Design System</div>
                <div class="option" data-value="dev">Développement</div>
            </div>
            <input type="hidden" id="session-project-id" value="work">
        </div>
    </div>

    <div class="tier-footer">
        <span id="session-timer">00:00</span>
        <button class="btn-session" id="start-session">START</button>
    </div>
</div>