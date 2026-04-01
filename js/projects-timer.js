// On rend projectsData global pour la synchronisation entre scripts
window.projectsData = JSON.parse(localStorage.getItem('projects-logs')) || {};

function initProjects() {
    const wrapper = document.getElementById('projects-auto-wrapper');
    const selectOptions = document.querySelector('#session-project-container .select-options');
    const selectTrigger = document.querySelector('#session-project-container .select-trigger span');
    const hiddenInput = document.getElementById('session-project-id');

    fetch('./includes/get_projects.php')
        .then(response => {
            if (!response.ok) throw new Error("Erreur réseau");
            return response.json();
        })
        .then(projects => {
            if (wrapper) {
                wrapper.innerHTML = ''; 
                projects.forEach(project => {
                    const isProjectActive = window.projectsData[project.name]?.active || false;
                    const card = document.createElement('div');
                    
                    // Applique la classe active sur la card pour le voyant SCSS
                    card.className = `card project-card ${isProjectActive ? 'active' : ''}`;
                    
                    card.innerHTML = `
                        <div class="project-link-container">
                            <a href="${project.url}" target="_blank" class="project-main-link">
                                <div class="project-initial">${project.initial}</div>
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

            if (selectOptions && projects) {
                selectOptions.innerHTML = ''; 
                projects.forEach(project => {
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
        })
        .catch(err => console.error("Erreur chargement projets :", err));
}

/**
 * window.toggleProject
 * @param {string} projectName - Nom du projet
 * @param {boolean|null} forceState - Force l'état ON (true) ou OFF (false)
 */
window.toggleProject = function(projectName, forceState = null) {
    const now = Date.now();
    
    // On recharge systématiquement pour être synchro avec session.js
    window.projectsData = JSON.parse(localStorage.getItem('projects-logs')) || {};

    if (!window.projectsData[projectName]) {
        window.projectsData[projectName] = { totalTime: 0, startTime: null, active: false };
    }
    
    let p = window.projectsData[projectName];
    
    // Détermine le prochain état (soit forcé, soit inversion)
    const nextState = (forceState !== null) ? forceState : !p.active;

    if (nextState && !p.active) {
        p.startTime = now;
        p.active = true;
    } else if (!nextState && p.active) {
        p.totalTime += (now - p.startTime);
        p.startTime = null;
        p.active = false;
    }
    
    localStorage.setItem('projects-logs', JSON.stringify(window.projectsData));
    updateTimerButtons();
};

function updateTimerButtons() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        const nameSpan = card.querySelector('.project-name');
        const btn = card.querySelector('.btn-timer');
        
        if (nameSpan && btn) {
            const name = nameSpan.innerText;
            const isActive = window.projectsData[name]?.active || false;
            
            // Mise à jour de la CARD (pour le voyant lumineux en CSS)
            if (isActive) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            // Mise à jour du BOUTON (classe et icône)
            btn.className = `btn-timer ${isActive ? 'active' : ''}`;
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = `fas ${isActive ? 'fa-stop' : 'fa-play'}`;
            }
        }
    });
}

document.addEventListener('DOMContentLoaded', initProjects);