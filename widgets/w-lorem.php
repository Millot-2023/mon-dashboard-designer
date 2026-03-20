<div class="card large" id="lorem-generator" data-id="lorem">
    <div class="card-header">
        <div class="header-left">
            <h3>📝 Lorem Generator</h3>
        </div>
        <div class="header-right">
            <span id="lorem-counter" class="counter">0 chars</span>
        </div>
    </div>
    
    <div class="lorem-controls">
        <input type="number" id="lorem-amount" value="3" min="1" max="50">
        
        <div class="custom-select" id="lorem-type-container">
            <div class="select-trigger">
                <span>Phrases</span>
                <!--<div class="arrow"></div>-->
            </div>
            <div class="select-options">
                <div class="option" data-value="paragraphs">Paragraphes</div>
                <div class="option selected" data-value="sentences">Phrases</div>
                <div class="option" data-value="words">Mots</div>
            </div>
            <input type="hidden" id="lorem-type" value="sentences">
        </div>

        <button id="gen-lorem" class="btn-mini">Générer</button>
        <button id="copy-lorem" class="btn-mini" title="Copier tout">📋</button>
    </div>

    <div id="lorem-output" class="lorem-preview">
        Le texte généré apparaîtra ici...
    </div>
</div>