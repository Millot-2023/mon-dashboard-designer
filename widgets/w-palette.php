<div class="card card-tier-system" id="palette-card">
    
    <div class="tier-header">
        <h3>🎨 Palette Mood</h3>
    </div>
    
    <div class="tier-body">
        <div class="palette-controls-row" style="display: flex; align-items: center; gap: 15px; width: 100%;">
            
            <div style="display: flex; align-items: center; gap: 8px; flex-shrink: 0;">
                <label style="font-size: 0.75rem; opacity: 0.5; white-space: nowrap;">Qté:</label>
                <input type="number" id="palette-count" value="5" min="2" max="10" 
                       style="width: 45px; height: 38px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; color: #fff; text-align: center;">
            </div>

            <div class="custom-select" id="palette-mood-container" style="flex-grow: 1;">
                <div class="select-trigger">
                    <span>Vibrant</span>
                    <span class="arrow-select">▼</span>
                </div>
                <div class="select-options">
                    <div class="option selected" data-value="juicy">Vibrant</div>
                    <div class="option" data-value="pastel">Pastel</div>
                    <div class="option" data-value="dark">Dark</div>
                    <div class="option" data-value="cyber">Cyberpunk</div>
                </div>
                <input type="hidden" id="palette-mood" value="juicy">
            </div>

        </div>
    </div>

    <div class="tier-footer" id="palette-colors">
        </div>
    
</div>