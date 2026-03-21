document.addEventListener('DOMContentLoaded', () => {
    const timerDisplay = document.getElementById('session-timer');
    const btnToggle = document.getElementById('btn-session-toggle');
    const btnReset = document.getElementById('btn-session-reset');

    // Récupération des données ou initialisation
    let sessionData = JSON.parse(localStorage.getItem('current-session')) || {
        totalTime: 0,
        startTime: null,
        isActive: false
    };

    function updateUI() {
        let displayTime = sessionData.totalTime;
        
        // Calcul mathématique par soustraction si actif
        if (sessionData.isActive && sessionData.startTime) {
            displayTime += (Date.now() - sessionData.startTime);
        }

        const s = Math.floor((displayTime / 1000) % 60);
        const m = Math.floor((displayTime / 1000 / 60) % 60);
        const h = Math.floor((displayTime / 1000 / 3600));

        timerDisplay.textContent = 
            `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        
        btnToggle.textContent = sessionData.isActive ? "STOP" : "START";
        btnToggle.style.background = sessionData.isActive ? "#e74c3c" : "#27ae60";
    }

    btnToggle.addEventListener('click', () => {
        const now = Date.now();
        if (!sessionData.isActive) {
            sessionData.startTime = now;
            sessionData.isActive = true;
        } else {
            // Fin de période : on ajoute la différence au cumul
            sessionData.totalTime += (now - sessionData.startTime);
            sessionData.startTime = null;
            sessionData.isActive = false;
        }
        localStorage.setItem('current-session', JSON.stringify(sessionData));
        updateUI();
    });

    btnReset.addEventListener('click', () => {
        if (confirm("Réinitialiser le temps de session ?")) {
            sessionData = { totalTime: 0, startTime: null, isActive: false };
            localStorage.setItem('current-session', JSON.stringify(sessionData));
            updateUI();
        }
    });

    setInterval(updateUI, 1000);
    updateUI();
});