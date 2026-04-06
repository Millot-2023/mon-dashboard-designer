<div class="card card-tier-system lab-preview-card codepen-wrapper">
    <div class="tier-header">
        <h3 class="tier-title">Codepen Master</h3>
        <div class="tier-actions">
            <button class="btn-action" id="cp-reset" title="Réinitialiser">RESET</button>
        </div>
    </div>

    <div class="tier-body">
        <div class="split-editor">
            <div class="editor-section">
                <label>HTML</label>
                <textarea id="cp-html" spellcheck="false" placeholder="<div class='box'></div>"></textarea>
            </div>

            <div class="editor-section dynamic-section">
                <div class="tab-controls">
                    <button class="tab-btn active" data-tab="css">CSS</button>
                    <button class="tab-btn" data-tab="js">JS</button>
                </div>
                
                <div id="cp-tab-css" class="tab-content active">
                    <textarea id="cp-css" spellcheck="false" placeholder=".box { color: red; }"></textarea>
                </div>
                
                <div id="cp-tab-js" class="tab-content">
                    <textarea id="cp-js" spellcheck="false" placeholder="console.log('Hello');"></textarea>
                </div>
            </div>
        </div>

        <div class="preview-output">
            <iframe id="cp-live-render" title="Live Preview"></iframe>
        </div>
    </div>
</div>