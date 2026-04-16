    <div class="tier-header">
        <h3>🎨 Palette Mood</h3>
    </div>
    
    <div class="tier-body">
        <div class="palette-controls-row">
            <div class="custom-qty">
                <button type="button" class="qty-btn down">-</button>
                <input type="number" id="palette-count" value="5" min="2" max="12">
                <button type="button" class="qty-btn up">+</button>
            </div>

            <div class="custom-select" id="palette-mood-container">
                <div class="select-trigger">
                    <span>Vibrant</span>
                    <i class="chevron"></i>
                </div>
                <div class="select-options">
                    <div class="option selected" data-value="vibrant">Vibrant</div>
                    <div class="option" data-value="pastel">Pastel</div>
                    <div class="option" data-value="darksynth">Dark Synth</div>
                </div>
                <input type="hidden" id="palette-mood" value="vibrant">
            </div>
        </div>
    </div>

    <div class="tier-footer" id="palette-colors">
        </div>
