    <div class="card-flipper">
        
        <div class="card-front">
            <div class="tier-header">
                <h3 class="tier-title">Codepen Master</h3>
                <div class="tier-actions">
                    <button type="button" class="btn-flip" title="Archives">
                        <span class="utf-icon">⟳</span>
                    </button>
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

                <div class="editor-footer">
                    <div class="footer-actions">
                        <button class="btn-action btn-save" id="cp-save-snapshot">SAVE AS...</button>
                        <button class="btn-action btn-copy" id="cp-copy">COPY ALL</button>
                        <button class="btn-action btn-reset" id="cp-reset">RESET EDITOR</button>
                    </div>
                </div>

                <div class="preview-output">
                    <iframe id="cp-live-render" title="Live Preview"></iframe>
                </div>
            </div>
        </div>

        <div class="card-back">
            <div class="tier-header">
                <h3 class="tier-title">Saved Snippets</h3>
                <div class="tier-actions">
                    <button type="button" class="btn-flip" title="Retour">
                        <span class="utf-icon">⟳</span>
                    </button>
                </div>
            </div>
            <div class="tier-body">
                <div class="project-list-container">
                    <p style="font-size: 0.8rem; color: rgba(255,255,255,0.2); text-align: center; margin-top: 50px;">
                        Aucune archive pour le moment.
                    </p>
                </div>
            </div>
        </div>

    </div>
