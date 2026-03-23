/**
 * DASHBOARD ENGINE - VERSION 1.3 FLAT-FILE
 */

// --- GESTION DES PROJETS ---

function displayProjects() {
    const container = document.getElementById('projects-wrapper');
    if (!container) return;
    
    // Pour l'instant on garde le localStorage en miroir, 
    // mais on prépare l'appel au fichier JSON
    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');

    let html = projects.map((p) => {
        return `
            <div class="card card-created" onclick="window.open('${p.url}', '_blank')">
                <button onclick="event.stopPropagation(); deleteProject(${p.id})" class="delete-btn">&times;</button>
                <div class="icon-placeholder">${p.initial}</div>
                <h3>${p.name}</h3>
            </div>`;
    }).join('');

    // --- LE BOUTON "DESIGNER" (Champ texte intégré) ---
    html += `
        <div class="card card-new">
            <div class="selection-area" onclick="event.stopPropagation();">
                <input type="text" id="new-project-name" placeholder="Nom du projet..." class="dash-input">
                <button onclick="addProject()" class="btn-add-circle">+</button>
            </div>
            <span class="label">Ajouter un raccourci</span>
        </div>`;
             
    container.innerHTML = html;
}

function addProject() {
    const input = document.getElementById('new-project-name');
    if (!input) return;

    const name = input.value.trim();
    if (!name) {
        input.focus();
        return;
    }
    
    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    const newProj = { 
        id: Date.now(), 
        name, 
        url: name.toLowerCase() + ".php", 
        initial: name.charAt(0).toUpperCase() 
    };
    
    projects.push(newProj);
    
    // SAUVEGARDE FLAT-FILE (Vers le disque)
    const formData = new FormData();
    formData.append('projects', JSON.stringify(projects));

    fetch('includes/save_project.php', {
        method: 'POST',
        body: formData
    })
    .then(() => {
        // Mise à jour locale
        localStorage.setItem('dashboard_projects', JSON.stringify(projects));
        displayProjects();
    })
    .catch(err => console.error("Erreur sauvegarde projet:", err));
}

function deleteProject(id) {
    if (!confirm("Supprimer ce projet ?")) return;

    let projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    projects = projects.filter(p => p.id !== id);
    
    const formData = new FormData();
    formData.append('projects', JSON.stringify(projects));

    fetch('includes/save_project.php', {
        method: 'POST',
        body: formData
    }).then(() => {
        localStorage.setItem('dashboard_projects', JSON.stringify(projects));
        displayProjects();
    });
}

// --- NOTES & HORLOGE (Version Flat-file) ---

function initNotes() {
    const container = document.getElementById('notes-container');
    if (!container) return;
    
    // On vide pour injecter proprement
    container.innerHTML = `
        <textarea id="quick-note-field" 
            placeholder="Écrire une note..."
            style="width: 100%; min-height: 80px; background: transparent; border: none; color: white; outline: none; resize: none; padding: 20px;"
        ></textarea>`;
    
    const field = document.getElementById('quick-note-field');

    // Chargement initial depuis le fichier physique
    fetch('data/notes.txt')
        .then(res => res.ok ? res.text() : "")
        .then(texte => {
            field.value = texte;
            field.style.height = 'auto';
            field.style.height = field.scrollHeight + 'px';
        });
    
    let timer;
    field.addEventListener('input', () => {
        // Auto-resize
        field.style.height = 'auto';
        field.style.height = field.scrollHeight + 'px';

        // Sauvegarde physique (Debounce 500ms)
        clearTimeout(timer);
        timer = setTimeout(() => {
            const fd = new FormData();
            fd.append('content', field.value);
            fetch('includes/save_notes.php', { method: 'POST', body: fd });
        }, 500);
    });
}

function updateClock() {
    const clock = document.getElementById('clock');
    const dateDisp = document.getElementById('date-display');
    const now = new Date();
    
    if(clock) {
        clock.textContent = now.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    if(dateDisp) {
        dateDisp.textContent = now.toLocaleDateString('fr-FR', { 
            weekday: 'long', 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    }
}

async function updateWeather() {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&lang=fr&appid=fbed67c1cd62da35b87fffad876b56ee`);
        const data = await response.json();
        const tempElement = document.getElementById('temp-display');
        if (tempElement) {
            tempElement.textContent = `${Math.round(data.main.temp)} °C`;
        }
    } catch (e) { 
        console.error("Weather update failed"); 
    }
}

// --- INITIALISATION ---
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initPalette === 'function') initPalette(); 
    
    updateClock();
    displayProjects();
    initNotes();
    updateWeather();
    
    setInterval(updateClock, 1000);
    setInterval(updateWeather, 3600000); 
});

window.addEventListener('resize', displayProjects);