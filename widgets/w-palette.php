<div class="card card-tier-system" id="palette-card">
    <div class="tier-header">
        <h3>🎨 Palette Mood</h3>
    </div>
    
    <div class="tier-body">
        <div class="palette-controls-row">
            <div class="custom-qty">
                <button type="button" class="qty-btn down">-</button>
                <input type="number" id="lorem-amount" value="3" min="1" max="50">
                <button type="button" class="qty-btn up">+</button>
            </div>

            <div class="custom-select" id="palette-mood-container">
                <div class="select-trigger">
                    <span>Vibrant</span>
                    <i class="chevron"></i>
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