<script>



function displayProjects() {
    const container = document.getElementById('projects-wrapper');
    if (!container) return;

    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    
    // 1. Rendu des projets (1 colonne chacun)
    let html = projects.map(p => `
        <div class="card small" onclick="window.open('${p.url}', '_blank')" style="position: relative; cursor: pointer;">
            <button onclick="event.stopPropagation(); deleteProject(${p.id})" 
                    style="position:absolute; top:10px; right:10px; background:none; border:none; color:#ff4757; cursor:pointer; font-size:1.5rem; opacity:0.5;">&times;</button>
            <div class="icon-placeholder">${p.initial}</div>
            <h3>${p.name}</h3>
        </div>
    `).join('');

    // 2. CALCUL DU COMBLEMENT DYNAMIQUE (Logique implacable)
    const totalStaticWidgets = 4; 
    const totalElementsBeforeNew = totalStaticWidgets + projects.length;
    
    // Déterminer le nombre de colonnes selon l'écran
    let columns = 4;
    if (window.innerWidth <= 480) columns = 1;
    else if (window.innerWidth <= 1024) columns = 2;

    // Calcul de l'occupation sur la ligne actuelle
    const rest = totalElementsBeforeNew % columns;
    
    // Si rest == 0, la ligne est pleine, Nouveau va sur une nouvelle ligne (span columns)
    // Sinon, Nouveau prend la place qu'il reste (columns - rest)
    const dynamicSpan = (rest === 0) ? columns : (columns - rest);

    // 3. Ajout de la carte "Nouveau" avec le span calculé
    html += `
        <div class="card" onclick="addProject()" 
             style="grid-column: span ${dynamicSpan}; border-style: dashed; border-color: var(--accent); opacity: 0.8; cursor: pointer;">
            <div class="icon-placeholder">+</div>
            <h3>Nouveau</h3>
        </div>
    `;

    container.innerHTML = html;
}

// Les fonctions addProject, deleteProject et updateClock restent identiques à ton code
function addProject() {
    const name = prompt("Nom du projet :");
    if (!name) return;
    const url = prompt("URL :", name.toLowerCase() + ".php");
    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    projects.push({ id: Date.now(), name, url, initial: name.charAt(0).toUpperCase() });
    localStorage.setItem('dashboard_projects', JSON.stringify(projects));
    displayProjects();
}

function deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    projects = projects.filter(p => p.id !== id);
    localStorage.setItem('dashboard_projects', JSON.stringify(projects));
    displayProjects();
}

function updateClock() {
    const now = new Date();
    const clock = document.getElementById('clock');
    const dateDisp = document.getElementById('date-display');
    if(clock) clock.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
    if(dateDisp) dateDisp.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

window.addEventListener('resize', displayProjects);
updateClock();
displayProjects();
setInterval(updateClock, 1000);





    
    function addProject() {
        const name = prompt("Nom du projet :");
        if (!name) return;
        const url = prompt("URL :", name.toLowerCase() + ".php");
        const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
        
        projects.push({ 
            id: Date.now(), 
            name: name, 
            url: url, 
            initial: name.charAt(0).toUpperCase() 
        });

        localStorage.setItem('dashboard_projects', JSON.stringify(projects));
        displayProjects();
    }

    function deleteProject(id) {
        let projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
        projects = projects.filter(p => p.id !== id);
        localStorage.setItem('dashboard_projects', JSON.stringify(projects));
        displayProjects();
    }

    function updateClock() {
        const now = new Date();
        const clock = document.getElementById('clock');
        const dateDisp = document.getElementById('date-display');
        if(clock) clock.textContent = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        if(dateDisp) dateDisp.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    }

    // Recalculer le span si on redimensionne la fenêtre
    window.addEventListener('resize', displayProjects);

    // Lancement
    updateClock();
    displayProjects();
    setInterval(updateClock, 1000);
</script>