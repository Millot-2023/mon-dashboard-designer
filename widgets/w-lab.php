<div id="css-lab" class="lab-card card large">
    <div class="card-header">
        <div class="header-left">
            <span class="header-icon">🧪</span>
            <h3>CSS Lab <span>Playground</span></h3>
        </div>
    </div>

    <div class="lab-body">
        <div class="lab-panel">
            <h4>Contrôles</h4>
            
            <div class="control-group">
               <div id="lab-shape-select" class="custom-select">
                    <div class="select-trigger">
                        <span>Round</span>
                        <i class="chevron"></i>
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
            <h4>Preview</h4>
            <div class="preview-container">
                <div id="lab-target" class="shape-target">Preview</div>
            </div>
        </div>

        <div class="lab-panel code">
            <h4>CSS Output</h4>
            <div class="code-block">
                <pre id="lab-css-output"><code></code></pre>
                <button id="lab-copy-btn" class="btn-copy">📋 Copy Code</button>
            </div>
        </div>
    </div>
</div>