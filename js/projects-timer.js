window.projectsData = {}; // Legacy fallback si besoin
window.dbProjects = [];

async function loadProjectsFromFlatFile() {
    try {
        const res = await fetch('includes/get_projects.php?t=' + Date.now());
        if (res.ok) {
            window.dbProjects = await res.json();
            if (!Array.isArray(window.dbProjects)) window.dbProjects = [];
        } else {
            window.dbProjects = [];
        }
    } catch (e) {
        window.dbProjects = [];
    }
    renderProjects();
}

function renderProjects() {
    const wrapper = document.getElementById('projects-auto-wrapper');
    const selectOptions = document.querySelector('#session-project-container .select-options');
    const selectTrigger = document.querySelector('#session-project-container .select-trigger span');
    const hiddenInput = document.getElementById('session-project-id');

    if (wrapper) {
        wrapper.innerHTML = '';
        window.dbProjects.forEach(project => {
            const isProjectActive = project.active || false;
            const card = document.createElement('div');

            card.className = `card project-card ${isProjectActive ? 'active' : ''}`;
            
            // Masque la croix si c'est un projet scanné (local)
            const deleteBtnHtml = !project.isLocal ? `<button title="Supprimer le projet" class="project-delete-btn" onclick="event.stopPropagation(); window.deleteProject('${project.id}')" style="position: absolute; top:8px; left:8px; background:none; border:none; color:rgba(255,255,255,0.2); cursor:pointer; font-size:14px; z-index:30;">&times;</button>` : '';

            card.innerHTML = `
                ${deleteBtnHtml}
                <div class="project-link-container">
                    <a href="${project.url}" target="_blank" class="project-main-link">
                        <div class="project-initial">${project.initial || project.name.charAt(0).toUpperCase()}</div>
                        <span class="project-name">${project.name}</span>
                    </a>
                    <button class="btn-timer ${isProjectActive ? 'active' : ''}" onclick="event.stopPropagation(); window.toggleProject('${project.name}')">
                        <i class="fas ${isProjectActive ? 'fa-stop' : 'fa-play'}"></i>
                    </button>
                </div>
            `;
            wrapper.appendChild(card);
        });
    }

    if (selectOptions) {
        selectOptions.innerHTML = '';
        window.dbProjects.forEach(project => {
            const opt = document.createElement('div');
            opt.className = 'option';
            opt.innerText = project.name;
            opt.onclick = (e) => {
                e.stopPropagation();
                if (selectTrigger) selectTrigger.innerText = project.name;
                if (hiddenInput) {
                    hiddenInput.value = project.name;
                    hiddenInput.dispatchEvent(new Event('change'));
                }
            };
            selectOptions.appendChild(opt);
        });
    }
}

window.addNewProject = async function () {
    const input = document.getElementById('project-name');
    if (!input || !input.value.trim()) return;

    let name = input.value.trim();
    let url = name.startsWith('http') ? name : `http://${name}`;

    if (name.startsWith('http')) {
        try {
            const domain = new URL(url).hostname;
            name = domain.replace('www.', '').split('.')[0];
        } catch (e) { } // Fallback silencieux
    }

    const newProj = {
        id: Date.now(),
        name: name.charAt(0).toUpperCase() + name.slice(1),
        url: url,
        initial: name.charAt(0).toUpperCase()
    };

    window.dbProjects.push(newProj);
    await saveProjectsToDisk();

    input.value = '';
    renderProjects();
};

window.deleteProject = async function (id) {
    if (!confirm('Effacer definitivement ce raccourci ?')) return;
    window.dbProjects = window.dbProjects.filter(p => p.id !== id);
    await saveProjectsToDisk();
    renderProjects();
};

window.saveProjectsToDisk = async function() {
    const fd = new FormData();
    fd.append('projects', JSON.stringify(window.dbProjects));
    try {
        await fetch('includes/save_projects.php', { method: 'POST', body: fd });
    } catch (e) {
        console.error("Save error: ", e);
    }
}

window.toggleProject = function (projectName, forceState = null) {
    const now = Date.now();
    let p = window.dbProjects.find(pf => pf.name === projectName);
    if (!p) return;

    const nextState = (forceState !== null) ? forceState : !p.active;

    if (nextState && !p.active) {
        // Départ du chrono
        p.startTime = now;
        p.active = true;
    } else if (!nextState && p.active) {
        // Arrêt du chrono
        p.totalTime += (now - p.startTime);
        p.startTime = null;
        p.active = false;
    }

    // La persistance totale de l'état se fait dans projects.json
    saveProjectsToDisk();
    updateTimerButtons();
};

function updateTimerButtons() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const nameSpan = card.querySelector('.project-name');
        const btn = card.querySelector('.btn-timer');

        if (nameSpan && btn) {
            const name = nameSpan.innerText;
            const p = window.dbProjects.find(pf => pf.name === name);
            const isActive = p ? (p.active || false) : false;

            if (isActive) card.classList.add('active');
            else card.classList.remove('active');

            btn.className = `btn-timer ${isActive ? 'active' : ''}`;
            const icon = btn.querySelector('i');
            if (icon) icon.className = `fas ${isActive ? 'fa-stop' : 'fa-play'}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadProjectsFromFlatFile();

    // Raccrochement du formulaire rapide
    const addBtn = document.getElementById('add-project-btn');
    if (addBtn) {
        addBtn.addEventListener('click', window.addNewProject);
    }

    const addInput = document.getElementById('project-name');
    if (addInput) {
        addInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') window.addNewProject();
        });
    }
});