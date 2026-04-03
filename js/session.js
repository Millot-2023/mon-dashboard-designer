(function() {
    let allSessions = JSON.parse(localStorage.getItem('projects-sessions')) || {};
    let currentSession = { projectName: null, startTime: null, isActive: false };

    function updateUI() {
        const timerDisplay = document.getElementById('session-timer');
        const btnToggle = document.getElementById('btn-session-toggle'); // ID Corrigé
        
        if (!timerDisplay || !btnToggle) return;

        // 1. MISE À JOUR DES CARTES DE PROJETS
        document.querySelectorAll('.project-card').forEach(card => {
            const nameEl = card.querySelector('.project-name');
            if (!nameEl) return;

            const pName = nameEl.innerText.trim();
            
            let badge = card.querySelector('.project-cumul-time');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'project-cumul-time';
                const link = card.querySelector('.project-main-link');
                if (link) link.appendChild(badge);
            }

            let pData = allSessions[pName] || { totalTime: 0 };
            let pTime = pData.totalTime;

            if (currentSession.isActive && pName === currentSession.projectName) {
                pTime += (Date.now() - currentSession.startTime);
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            const mins = Math.floor((pTime / 1000 / 60) % 60);
            const hrs = Math.floor((pTime / 1000 / 3600));
            badge.textContent = `${hrs}h ${mins.toString().padStart(2, '0')}m`;
        });

        // 2. MISE À JOUR DU WIDGET SESSION
        const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
        let selected = triggerSpan ? triggerSpan.innerText.trim() : "";

        if (selected && !selected.includes("Chargement")) {
            let data = allSessions[selected] || { totalTime: 0 };
            let displayTime = data.totalTime;

            if (currentSession.isActive && selected === currentSession.projectName) {
                displayTime += (Date.now() - currentSession.startTime);
                btnToggle.textContent = "STOP";
                btnToggle.classList.add('active'); // Utilise ta classe SCSS $accent-red
            } else {
                btnToggle.textContent = "START";
                btnToggle.classList.remove('active');
            }

            const s = Math.floor((displayTime / 1000) % 60);
            const m = Math.floor((displayTime / 1000 / 60) % 60);
            const h = Math.floor((displayTime / 1000 / 3600));
            timerDisplay.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
    }

    // GESTION DU CLIC SUR LE BOUTON START/STOP
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'btn-session-toggle') { // ID Corrigé
            const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
            let selected = triggerSpan ? triggerSpan.innerText.trim() : "";

            if (!selected || selected.includes("Chargement")) {
                alert("Veuillez sélectionner un projet.");
                return;
            }

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
                    alert("Une session est déjà en cours sur : " + currentSession.projectName);
                }
            }
            updateUI();
        }

        // RESET DE LA SESSION
        if (e.target && e.target.id === 'btn-session-reset') {
            const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
            let selected = triggerSpan ? triggerSpan.innerText.trim() : "";
            
            if (selected && allSessions[selected] && confirm(`Réinitialiser le temps pour ${selected} ?`)) {
                allSessions[selected].totalTime = 0;
                localStorage.setItem('projects-sessions', JSON.stringify(allSessions));
                if (currentSession.isActive && selected === currentSession.projectName) {
                    currentSession.isActive = false;
                    currentSession.projectName = null;
                }
                updateUI();
            }
        }
    });

    setInterval(updateUI, 1000);
})();