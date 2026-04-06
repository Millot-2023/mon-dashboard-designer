document.addEventListener('DOMContentLoaded', function() {
    const card = document.getElementById('codepen-master-card');
    const htmlInput = document.getElementById('cp-html');
    const cssInput = document.getElementById('cp-css');
    const jsInput = document.getElementById('cp-js');
    const renderFrame = document.getElementById('cp-live-render');
    
    const flipBtns = document.querySelectorAll('.btn-flip');
    const saveBtn = document.getElementById('cp-save-snapshot');
    const copyBtn = document.getElementById('cp-copy');
    const resetBtn = document.getElementById('cp-reset');
    
    const tabs = document.querySelectorAll('.codepen-wrapper .tab-btn');
    const projectList = document.querySelector('.project-list-container');

    // --- 1. AJUSTEMENT DE LA HAUTEUR (AVEC RESET) ---
    function adjustHeight() {
        if (!renderFrame) return;
        const frameDoc = renderFrame.contentDocument || renderFrame.contentWindow.document;
        if (frameDoc && frameDoc.body) {
            // Reset pour forcer le recalcul
            renderFrame.style.height = "0px";
            // Mesure du contenu réel du wrapper centré
            const height = frameDoc.body.scrollHeight;
            // Minimum 400px pour l'esthétique
            renderFrame.style.height = (height < 400 ? 400 : height) + "px";
        }
    }

    // --- 2. RENDU TEMPS RÉEL (AVEC CENTRAGE FLEXBOX) ---
    function updatePreview() {
        if (!renderFrame || !htmlInput || !cssInput || !jsInput) return;
        
        const content = `
            <!DOCTYPE html>
            <html lang="fr">
                <head>
                    <meta charset="UTF-8">
                    <style>
                        /* Centrage absolu du contenu dans l'aperçu */
                        html, body { 
                            margin: 0; 
                            padding: 0; 
                            width: 100%;
                            min-height: 100vh;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            background: #fff;
                            overflow: hidden; 
                        }
                        #wrapper {
                            padding: 30px; /* Espace pour les effets de survol/ombre */
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        ${cssInput.value}
                    </style>
                </head>
                <body>
                    <div id="wrapper">${htmlInput.value}</div>
                    <script>
                        try { ${jsInput.value} } catch (err) { console.error('JS Error:', err); }
                    <\/script>
                </body>
            </html>
        `;
        
        const frameDoc = renderFrame.contentDocument || renderFrame.contentWindow.document;
        frameDoc.open();
        frameDoc.write(content);
        frameDoc.close();

        // Délai pour laisser le rendu s'opérer avant de mesurer la hauteur
        setTimeout(adjustHeight, 150);
        saveDraft(); 
    }

    // --- 3. BROUILLON AUTOMATIQUE ---
    function saveDraft() {
        const draft = { html: htmlInput.value, css: cssInput.value, js: jsInput.value };
        localStorage.setItem('cp_master_draft', JSON.stringify(draft));
    }

    function loadDraft() {
        const saved = localStorage.getItem('cp_master_draft');
        if (saved) {
            const data = JSON.parse(saved);
            htmlInput.value = data.html || "";
            cssInput.value = data.css || "";
            jsInput.value = data.js || "";
            updatePreview();
        }
    }

    // --- 4. ARCHIVAGE ---
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const name = prompt("Nom de votre archive :");
            if (!name || name.trim() === "") return;

            const newProject = {
                id: Date.now(),
                name: name,
                date: new Date().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
                html: htmlInput.value,
                css: cssInput.value,
                js: jsInput.value
            };

            let projects = JSON.parse(localStorage.getItem('cp_projects') || "[]");
            projects.unshift(newProject);
            localStorage.setItem('cp_projects', JSON.stringify(projects));
            
            renderProjectList(); 
            alert("Projet archivé !");
        });
    }

    // --- 5. ACTIONS ADDITIONNELLES (COPY / RESET) ---
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const fullCode = `${htmlInput.value}\n\n/* CSS */\n${cssInput.value}\n\n// JS\n${jsInput.value}`;
            navigator.clipboard.writeText(fullCode).then(() => {
                const originalText = copyBtn.innerText;
                copyBtn.innerText = "COPIED!";
                setTimeout(() => copyBtn.innerText = originalText, 2000);
            });
        });
    }

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm("Vider l'éditeur ?")) {
                htmlInput.value = ""; cssInput.value = ""; jsInput.value = "";
                updatePreview();
            }
        });
    }

    // --- 6. LISTE DES PROJETS (VERSO) ---
    function renderProjectList() {
        if (!projectList) return;
        let projects = JSON.parse(localStorage.getItem('cp_projects') || "[]");
        
        if (projects.length === 0) {
            projectList.innerHTML = `<p style="font-size: 0.8rem; color: rgba(255,255,255,0.2); text-align: center; margin-top: 50px;">Aucune archive.</p>`;
            return;
        }

        projectList.innerHTML = projects.map(p => `
            <div class="project-item" style="display:flex; justify-content:space-between; align-items:center; background:rgba(255,255,255,0.05); padding:10px; border-radius:8px; margin-bottom:8px; border:1px solid rgba(255,255,255,0.1);">
                <div class="project-info" style="display:flex; flex-direction:column;">
                    <span style="color:#4ecca3; font-weight:bold; font-size:0.8rem;">${p.name}</span>
                    <span style="color:rgba(255,255,255,0.3); font-size:0.6rem;">${p.date}</span>
                </div>
                <div class="project-actions" style="display:flex; gap:5px;">
                    <button onclick="loadProject(${p.id})" style="background:#4ecca3; border:none; color:#1a1a1a; padding:4px 8px; border-radius:4px; font-size:0.6rem; cursor:pointer; font-weight:bold;">LOAD</button>
                    <button onclick="deleteProject(${p.id})" style="background:rgba(231,76,60,0.2); border:1px solid #e74c3c; color:#e74c3c; padding:4px 8px; border-radius:4px; font-size:0.6rem; cursor:pointer;">DEL</button>
                </div>
            </div>
        `).join('');
    }

    // --- FONCTIONS GLOBALES (WINDOW) ---
    window.loadProject = (id) => {
        let projects = JSON.parse(localStorage.getItem('cp_projects') || "[]");
        const p = projects.find(proj => proj.id === id);
        if (p) {
            htmlInput.value = p.html;
            cssInput.value = p.css;
            jsInput.value = p.js;
            updatePreview();
            card.classList.remove('is-flipped'); 
        }
    };

    window.deleteProject = (id) => {
        if (confirm("Supprimer cette archive ?")) {
            let projects = JSON.parse(localStorage.getItem('cp_projects') || "[]");
            projects = projects.filter(proj => proj.id !== id);
            localStorage.setItem('cp_projects', JSON.stringify(projects));
            renderProjectList();
        }
    };

    // --- 7. NAVIGATION ET ÉVÉNEMENTS ---
    flipBtns.forEach(btn => btn.addEventListener('click', () => card.classList.toggle('is-flipped')));

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById('cp-tab-css').classList.toggle('active', target === 'css');
            document.getElementById('cp-tab-js').classList.toggle('active', target === 'js');
        });
    });

    [htmlInput, cssInput, jsInput].forEach(el => el && el.addEventListener('input', updatePreview));

    // INITIALISATION
    loadDraft();
    renderProjectList();
});