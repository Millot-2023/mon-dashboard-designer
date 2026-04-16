(function() {
    function updateUI() {
        const timerDisplay = document.getElementById('session-timer');
        const btnToggle = document.getElementById('btn-session-toggle');
        const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
        
        if (!timerDisplay || !btnToggle) return;

        // 1. MISE À JOUR DES CARTES DE PROJETS (Synchronisation des badges et diodes)
        document.querySelectorAll('.project-card').forEach(card => {
            const nameEl = card.querySelector('.project-name');
            if (!nameEl) return;

            const pName = nameEl.innerText.trim();
            const pData = window.dbProjects.find(p => p.name === pName) || { totalTime: 0, active: false, startTime: null };
            
            let badge = card.querySelector('.project-cumul-time');
            if (!badge) {
                badge = document.createElement('span');
                badge.className = 'project-cumul-time';
                const container = card.querySelector('.project-link-container') || card;
                container.appendChild(badge);
            }

            let pTime = pData.totalTime;
            if (pData.active && pData.startTime) {
                pTime += (Date.now() - pData.startTime);
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }

            const mins = Math.floor((pTime / 1000 / 60) % 60);
            const hrs = Math.floor((pTime / 1000 / 3600));
            badge.textContent = `${hrs}h ${mins.toString().padStart(2, '0')}m`;
        });

        // 2. MISE À JOUR DU WIDGET SESSION
        let selected = triggerSpan ? triggerSpan.innerText.trim() : "";

        if (selected && !selected.includes("Chargement") && selected !== "Sélectionner un projet") {
            const data = window.dbProjects.find(p => p.name === selected) || { totalTime: 0, active: false, startTime: null };
            let displayTime = data.totalTime || 0;

            if (data.active) {
                displayTime += (Date.now() - data.startTime);
                btnToggle.textContent = "STOP";
                btnToggle.classList.add('active');
            } else {
                btnToggle.textContent = "START";
                btnToggle.classList.remove('active');
            }

            const s = Math.floor((displayTime / 1000) % 60).toString().padStart(2, '0');
            const m = Math.floor((displayTime / 1000 / 60) % 60).toString().padStart(2, '0');
            const h = Math.floor((displayTime / 1000 / 3600)).toString().padStart(2, '0');
            timerDisplay.textContent = `${h}:${m}:${s}`;
        }
    }

    // GESTION DU CLIC UNIQUE
    document.addEventListener('click', function(e) {
        const btnToggle = e.target.closest('#btn-session-toggle');
        const btnReset = e.target.closest('#btn-session-reset');

        if (btnToggle) {
            const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
            let selected = triggerSpan ? triggerSpan.innerText.trim() : "";

            if (!selected || selected.includes("Chargement") || selected === "Sélectionner un projet") {
                alert("Veuillez sélectionner un projet.");
                return;
            }

            // On appelle la fonction globale de projects-timer.js pour piloter la logique
            if (typeof window.toggleProject === 'function') {
                window.toggleProject(selected);
            }
            updateUI();
        }

        if (btnReset) {
            const triggerSpan = document.querySelector('#session-project-container .select-trigger span');
            let selected = triggerSpan ? triggerSpan.innerText.trim() : "";
            
            if (selected && confirm(`Réinitialiser le temps pour ${selected} ?`)) {
                const targetProject = window.dbProjects.find(p => p.name === selected);
                if (targetProject) {
                    targetProject.totalTime = 0;
                    targetProject.active = false;
                    targetProject.startTime = null;
                    if (typeof window.saveProjectsToDisk === 'function') {
                        window.saveProjectsToDisk();
                    }
                }
                updateUI();
            }
        }
    });

    setInterval(updateUI, 1000);
})();