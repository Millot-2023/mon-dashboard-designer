<div id="css-lab" class="card card-tier-system large lab-card">
    <div class="tier-header">
        <h3 class="tier-title">CSS Playground</h3>
    </div>

    <div class="tier-body">
        <div class="lab-body">
            <div class="lab-panel">
                <label class="panel-label">Contrôles</label>
                
                <div class="control-group">
                   <div id="lab-shape-select" class="custom-select">
                        <div class="select-trigger">
                            <span>Round</span>
                        </div>
                        <div class="options">
                            <div class="option selected" data-value="round">Round</div>
                            <div class="option" data-value="squircle">Squircle</div>
                            <div class="option" data-value="bevel">Bevel</div>
                            <div class="option" data-value="scoop">Scoop</div>
                            <div class="option" data-value="notch">Notch</div>
                        </div>
                    </div>
                </div>

                <div class="control-group">
                    <label>Border Radius</label>
                    <div class="value-display">15px</div>
                    <input type="range" id="lab-radius-slider" min="0" max="100" value="15">
                </div>

                <div class="control-group">
                    <label>Dimension</label>
                    <div class="value-display">150px</div>
                    <input type="range" id="lab-size-input" min="50" max="250" value="150">
                </div>
            </div>

            <div class="lab-panel preview">
                <label class="panel-label">Preview</label>
                <div class="preview-container">
                    <div id="lab-target" class="shape-target">Preview</div>
                </div>
            </div>

            <div class="lab-panel code">
                <label class="panel-label">CSS Output</label>
                <div class="code-block">
                    <pre id="lab-css-output"><code></code></pre>
                    <button id="lab-copy-btn" class="btn-action">COPY CODE</button>
                </div>
            </div>
        </div>
    </div>
</div>