(function() {
    let allSessions = JSON.parse(localStorage.getItem('projects-sessions')) || {};
    let currentSession = { projectName: null, startTime: null, isActive: false };

    function updateUI() {
        const timerDisplay = document.getElementById('session-timer');
        const btnToggle = document.getElementById('start-session');
        
        if (!timerDisplay || !btnToggle) return;

        // 1. MISE À JOUR ET INJECTION DYNAMIQUE DANS LES CARTES
        document.querySelectorAll('.project-card').forEach(card => {
            const nameEl = card.querySelector('.project-name');
            if (!nameEl) return;

            const pName = nameEl.innerText.trim();
            
            // On vérifie si le badge de temps existe, sinon on le crée (Injection Sécurisée)
            let badge = card.querySelector('.project-cumul-time');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'project-cumul-time';
                const link = card.querySelector('.project-main-link');
                if (link) link.appendChild(badge);
            }

            let pData = allSessions[pName] || { totalTime: 0 };
            let pTime = pData.totalTime;

            // Gestion de l'état actif (Diode SCSS)
            if (currentSession.isActive && pName === currentSession.projectName) {
                pTime += (Date.now() - currentSession.startTime);
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            // Formatage du texte cumulé
            const mins = Math.floor((pTime / 1000 / 60) % 60);
            const hrs = Math.floor((pTime / 1000 / 3600));
            badge.textContent = `${hrs}h ${mins.toString().padStart(2, '0')}m`;
        });

        // 2. MISE À JOUR DU WIDGET DE SESSION
        const span = document.querySelector('#session-project-container .select-trigger span');
        let selected = span ? span.innerText.trim() : "";

        if (selected && !selected.includes("Chargement")) {
            let data = allSessions[selected] || { totalTime: 0 };
            let displayTime = data.totalTime;

            if (currentSession.isActive && selected === currentSession.projectName) {
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
    }

    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'start-session') {
            const span = document.querySelector('#session-project-container .select-trigger span');
            let selected = span ? span.innerText.trim() : "";

            if (!selected || selected.includes("Chargement")) return;

            if (!currentSession.isActive) {
                currentSession.projectName = selected;
                currentSession.startTime = Date.now();
                currentSession.isActive = true;
            } else {
                if (selected === currentSession.projectName) {
                    if (!allSessions[selected]) allSessions[selected] = { totalTime: 0 };
                    allSessions[selected].totalTime += (Date.now() - currentSession.startTime);
                    localStorage.setItem('projects-sessions', JSON.stringify(allSessions));
                    currentSession.isActive = false;
                    currentSession.projectName = null;
                } else {
                    alert("Session déjà active sur : " + currentSession.projectName);
                }
            }
            updateUI();
        }
    });

    // On lance l'intervalle immédiatement
    setInterval(updateUI, 1000);
})();