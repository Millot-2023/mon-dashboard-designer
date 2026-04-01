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
                            <button class="btn-timer ${isProjectActive ? 'active' : ''}" onclick="event.stopPropagation(); toggleProject('${project.name}')">
                                <i class="fas ${isProjectActive ? 'fa-stop' : 'fa-play'}"></i>
                            </button>
                        </div>
                    `;
                    wrapper.appendChild(card);
                });
            }

            if (selectOptions) {
                selectOptions.innerHTML = ''; 
                projects.forEach(project => {
                    const opt = document.createElement('div');
                    opt.className = 'option';
                    if (hiddenInput && hiddenInput.value === project.name) {
                        opt.classList.add('selected');
                        if (selectTrigger) selectTrigger.innerText = project.name;
                    }
                    opt.innerText = project.name;
                    opt.onclick = (e) => {
                        e.stopPropagation();
                        selectOptions.querySelectorAll('.option').forEach(o => o.classList.remove('selected', 'active'));
                        opt.classList.add('selected');
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
        .catch(err => console.error("Audit injection projects :", err));
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
    updateTimerButtons();
};

function updateTimerButtons() {
    const buttons = document.querySelectorAll('.btn-timer');
    buttons.forEach(btn => {
        const container = btn.closest('.project-link-container');
        const nameSpan = container ? container.querySelector('.project-name') : null;
        if (nameSpan) {
            const name = nameSpan.innerText;
            const isActive = projectsData[name]?.active || false;
            btn.className = `btn-timer ${isActive ? 'active' : ''}`;
            btn.querySelector('i').className = `fas ${isActive ? 'fa-stop' : 'fa-play'}`;
        }
    });
}

document.addEventListener('DOMContentLoaded', initProjects);