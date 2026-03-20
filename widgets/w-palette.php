<div class="card" id="palette-card">
    <div class="palette-header">
        <h3>🎨 Palette Mood</h3>
    </div>
    
    <div class="palette-controls">
        <input type="number" id="palette-count" value="5" min="2" max="10">
        
        <div class="custom-select" id="palette-mood-container">
            <div class="select-trigger">
                <span>Vibrant</span>
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

    <div id="palette-colors">
        </div>
</div>