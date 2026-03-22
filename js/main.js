// Ton code est correct ici, assure-toi juste que la structure reste celle-ci :
function displayProjects() {
    const container = document.getElementById('projects-wrapper');
    if (!container) return;
    
    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');

    let html = projects.map((p) => {
        return `
            <div class="card card-created" onclick="window.open('${p.url}', '_blank')">
                <button onclick="event.stopPropagation(); deleteProject(${p.id})" class="delete-btn">&times;</button>
                <div class="icon-placeholder">${p.initial}</div>
                <h3>${p.name}</h3>
            </div>`;
    }).join('');

    // On garde le bouton à la suite, dans le wrapper
    html += `
        <div class="card card-new" onclick="addProject()">
            <div class="icon-placeholder">+</div>
            <h3>Nouveau</h3>
        </div>`;
             
    container.innerHTML = html;
}




function addProject() {
    const name = prompt("Nom du projet :");
    if (!name) return;
    
    const projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    projects.push({ 
        id: Date.now(), 
        name, 
        url: name.toLowerCase() + ".php", 
        initial: name.charAt(0).toUpperCase() 
    });
    
    localStorage.setItem('dashboard_projects', JSON.stringify(projects));
    displayProjects();
}

function deleteProject(id) {
    let projects = JSON.parse(localStorage.getItem('dashboard_projects') || '[]');
    localStorage.setItem('dashboard_projects', JSON.stringify(projects.filter(p => p.id !== id)));
    displayProjects();
}

// --- NOTES & HORLOGE ---
function initNotes() {
    const container = document.getElementById('notes-container');
    if (!container) return;
    
    container.innerHTML = `
        <textarea id="quick-note-field" 
            style="width: 100%; min-height: 80px; background: transparent; border: none; color: white; outline: none; resize: none; padding: 20px;"
        >${localStorage.getItem('dashboard_quick_note') || ""}</textarea>`;
    
    const field = document.getElementById('quick-note-field');
    
    // Auto-ajustement de la hauteur au chargement
    if (field) {
        field.style.height = 'auto';
        field.style.height = field.scrollHeight + 'px';
        
        field.addEventListener('input', () => {
            localStorage.setItem('dashboard_quick_note', field.value);
            field.style.height = 'auto';
            field.style.height = field.scrollHeight + 'px';
        });
    }
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
    // Initialise la palette si le script externe est chargé
    if (typeof initPalette === 'function') initPalette(); 
    
    updateClock();
    displayProjects();
    initNotes();
    updateWeather();
    
    // Rafraîchissements périodiques
    setInterval(updateClock, 1000);
    setInterval(updateWeather, 3600000); // 1 heure
});

// Mise à jour de la grille lors du redimensionnement
window.addEventListener('resize', displayProjects);