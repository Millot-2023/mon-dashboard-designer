<div class="card lab-preview-card">
    <div class="tier-header">
        <div class="tier-title">
            <i class="fa-solid fa-flask"></i> Design Lab
        </div>
        <div class="tier-actions">
            <button class="btn-action" onclick="resetLab()" title="Réinitialiser">
                <i class="fa-solid fa-rotate-right"></i>
            </button>
        </div>
    </div>

    <div class="tier-body">
        <div class="split-editor">
            <div class="editor-section static-section">
                <label>Structure HTML</label>
                <textarea id="lab-html-raw" spellcheck="false" placeholder=""></textarea>
            </div>

            <div class="editor-section dynamic-section">
                <div class="tab-controls">
                    <button id="btn-tab-css" class="tab-btn active" onclick="switchTab('css')">CSS</button>
                    <button id="btn-tab-js" class="tab-btn" onclick="switchTab('js')">JS</button>
                </div>
                
                <div id="tab-css" class="tab-content active">
                    <textarea id="lab-css-raw" spellcheck="false" placeholder="/* Styles CSS */"></textarea>
                </div>
                
                <div id="tab-js" class="tab-content">
                    <textarea id="lab-js-raw" spellcheck="false" placeholder="// Scripts JS"></textarea>
                </div>
            </div>
        </div>

        <div class="preview-output">
            <iframe id="lab-render-frame" title="Lab Preview"></iframe>
        </div>
    </div>
</div>