(function() {
    // On récupère l'objet global des sessions { "nom-projet": {totalTime: 0}, ... }
    let allSessions = JSON.parse(localStorage.getItem('projects-sessions')) || {};
    
    // État de la session actuelle (en mémoire vive)
    let currentSession = {
        projectName: null,
        startTime: null,
        isActive: false
    };

    function updateUI() {
        const timerDisplay = document.getElementById('session-timer');
        const btnToggle = document.getElementById('btn-session-toggle') || document.getElementById('start-session');
        const hiddenInput = document.getElementById('session-project-id');
        
        if (!timerDisplay || !btnToggle) return;

        // 1. Identifier le projet affiché dans le menu
        let selectedProject = hiddenInput ? hiddenInput.value : "";
        if (!selectedProject || selectedProject === "") {
            const span = document.querySelector('#session-project-container .select-trigger span');
            selectedProject = (span && !span.innerText.includes("Chargement")) ? span.innerText : null;
        }

        if (!selectedProject) {
            timerDisplay.textContent = "00:00:00";
            return;
        }

        // 2. Calculer le temps pour ce projet précis
        let projectData = allSessions[selectedProject] || { totalTime: 0 };
        let displayTime = projectData.totalTime;

        // 3. Si c'est le projet en cours d'exécution, on ajoute le temps écoulé
        if (currentSession.isActive && selectedProject === currentSession.projectName) {
            displayTime += (Date.now() - currentSession.startTime);
            btnToggle.textContent = "STOP";
            btnToggle.style.backgroundColor = "#e74c3c";
        } else {
            btnToggle.textContent = "START";
            btnToggle.style.backgroundColor = "#27ae60";
        }

        const s = Math.floor((displayTime / 1000) % 60);
        const m = Math.floor((displayTime / 1000 / 60) % 60);
        const h = Math.floor((displayTime / 1000 / 3600));

        timerDisplay.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'btn-session-toggle' || e.target.id === 'start-session')) {
            
            const hiddenInput = document.getElementById('session-project-id');
            let selectedProject = hiddenInput ? hiddenInput.value : "";
            if (!selectedProject) {
                const span = document.querySelector('#session-project-container .select-trigger span');
                selectedProject = span ? span.innerText : "";
            }

            if (!selectedProject || selectedProject.includes("Chargement")) return;

            if (!currentSession.isActive) {
                // DÉMARRAGE
                currentSession.projectName = selectedProject;
                currentSession.startTime = Date.now();
                currentSession.isActive = true;
                
                if (window.toggleProject) window.toggleProject(selectedProject, true);
            } else {
                // ARRÊT
                if (selectedProject === currentSession.projectName) {
                    // On enregistre le temps dans la base globale
                    if (!allSessions[currentSession.projectName]) allSessions[currentSession.projectName] = { totalTime: 0 };
                    
                    allSessions[currentSession.projectName].totalTime += (Date.now() - currentSession.startTime);
                    
                    if (window.toggleProject) window.toggleProject(currentSession.projectName, false);
                    
                    currentSession.isActive = false;
                    currentSession.projectName = null;
                    localStorage.setItem('projects-sessions', JSON.stringify(allSessions));
                } else {
                    alert("Une session est déjà en cours sur " + currentSession.projectName);
                }
            }
            updateUI();
        }

        // RESET spécifique au projet affiché
        if (e.target && e.target.id === 'btn-session-reset') {
            const span = document.querySelector('#session-project-container .select-trigger span');
            let selected = span ? span.innerText : "";
            if (selected && confirm("Reset temps pour " + selected + " ?")) {
                if (allSessions[selected]) allSessions[selected].totalTime = 0;
                localStorage.setItem('projects-sessions', JSON.stringify(allSessions));
                updateUI();
            }
        }
    });

    setInterval(updateUI, 1000);
})();