let projectsData = JSON.parse(localStorage.getItem('projects-logs')) || {};

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
            // 1. Injection des Cartes (Bas)
            if (wrapper) {
                wrapper.innerHTML = ''; 
                projects.forEach(project => {
                    const isProjectActive = projectsData[project.name]?.active || false;
                    const card = document.createElement('div');
                    card.className = 'card project-card';
                    card.innerHTML = `
                        <div class="project-link-container">
                            <a href="${project.url}" target="_blank" class="project-main-link">
                                <div class="project-initial">${project.initial}</div>
                                <span class="project-name">${project.name}</span>
                            </a>
                            <button class="btn-timer ${isProjectActive ? 'active' : ''}" onclick="toggleProject('${project.name}')">
                                <i class="fas ${isProjectActive ? 'fa-stop' : 'fa-play'}"></i>
                            </button>
                        </div>
                    `;
                    wrapper.appendChild(card);
                });
            }

            // 2. Injection du Select (Haut)
            if (selectOptions) {
                selectOptions.innerHTML = '';
                
                if (selectTrigger && (!hiddenInput || !hiddenInput.value)) {
                    selectTrigger.innerText = "Choisir un projet...";
                }

                projects.forEach(project => {
                    const opt = document.createElement('div');
                    opt.className = 'option';
                    
                    // Vérification au chargement : si c'est le projet sélectionné, on met le bleu
                    if (hiddenInput && hiddenInput.value === project.name) {
                        opt.classList.add('active');
                        if (selectTrigger) selectTrigger.innerText = project.name;
                    }

                    opt.innerText = project.name;
                    
                    opt.onclick = () => {
                        // 1. On retire le bleu de toutes les autres options
                        const allOptions = selectOptions.querySelectorAll('.option');
                        allOptions.forEach(o => o.classList.remove('active'));
                        
                        // 2. On ajoute le bleu sur celle-ci
                        opt.classList.add('active');
                        
                        // 3. Mise à jour du texte et de l'input
                        if (selectTrigger) selectTrigger.innerText = project.name;
                        if (hiddenInput) hiddenInput.value = project.name;
                    };
                    selectOptions.appendChild(opt);
                });
            }
        })
        .catch(err => console.error("Erreur d'injection :", err));
}

window.toggleProject = function(projectName) {
    const now = Date.now();
    if (!projectsData[projectName]) {
        projectsData[projectName] = { totalTime: 0, startTime: null, active: false };
    }
    let p = projectsData[projectName];
    if (!p.active) {
        p.startTime = now;
        p.active = true;
    } else {
        p.totalTime += (now - p.startTime);
        p.startTime = null;
        p.active = false;
    }
    localStorage.setItem('projects-logs', JSON.stringify(projectsData));
    initProjects(); 
};

document.addEventListener('DOMContentLoaded', initProjects);