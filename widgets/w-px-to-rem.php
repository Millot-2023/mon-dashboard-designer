<div class="card card-tier-system large" id="converter-px-rem" data-id="px-rem">
    <div class="tier-header">
        <h3 class="tier-title">PX to REM</h3>
        <div class="tier-actions">
            <span class="counter">Base: 16px</span>
        </div>
    </div>
    
    <div class="tier-body">
        <div class="converter-body">
            <div class="input-group">
                <label>Pixels (px)</label>
                <div class="custom-qty">
                    <button type="button" class="qty-btn down">-</button>
                    <input type="number" id="input-px" placeholder="16" value="16">
                    <button type="button" class="qty-btn up">+</button>
                </div>
            </div>

            <div class="conversion-arrow">⇄</div>

            <div class="input-group">
                <label>Root EM (rem)</label>
                <div class="custom-qty">
                    <button type="button" class="qty-btn down">-</button>
                    <input type="number" id="input-rem" placeholder="1" step="0.01">
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
            <span class="unit">px</span>
        </div>
    </div>
</div>