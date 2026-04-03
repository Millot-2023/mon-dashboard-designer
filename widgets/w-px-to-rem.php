<div class="card large" id="converter-px-rem" data-id="px-rem">
    <div class="card-header">
        <div class="header-left">
            <h3>📏 PX to REM</h3>
        </div>
        <div class="header-right">
            <span class="counter">Base: 16px</span>
        </div>
    </div>
    
    <div class="converter-body">
        <div class="input-group">
            <label>Pixels (px)</label>
            <div class="custom-qty">
                <button type="button" class="qty-btn down">-</button>
                <input type="number" id="input-px" placeholder="Ex: 16" value="16">
                <button type="button" class="qty-btn up">+</button>
            </div>
        </div>

        <div class="conversion-arrow">⇄</div>

        <div class="input-group">
            <label>Root EM (rem)</label>
            <div class="custom-qty">
                <button type="button" class="qty-btn down">-</button>
                <input type="number" id="input-rem" placeholder="Ex: 1" step="0.01">
                <button type="button" class="qty-btn up">+</button>
            </div>
        </div>
    </div>

    <div class="converter-settings">
        <label>Base Font Size :</label>
        <div class="custom-qty">
            <button type="button" class="qty-btn down">-</button>
            <input type="number" id="base-font" value="16" min="1">
            <button type="button" class="qty-btn up">+</button>
        </div>
        <span>px</span>
    </div>
</div>