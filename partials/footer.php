<script>
    // --- HORLOGE ET DATE ---
    function updateClock() {
        const now = new Date();
        
        // Heure
        const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
        const clockEl = document.getElementById('clock');
        if(clockEl) clockEl.textContent = time;

        // Date complète
        const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
        const dateStr = now.toLocaleDateString('fr-FR', options);
        const dateEl = document.getElementById('date-display');
        if(dateEl) {
            dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
        }
    }

    // --- MÉTÉO (Open-Meteo API) ---
    async function updateWeather() {
        const lat = 48.8566; // Paris
        const lon = 2.3522;
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const temp = Math.round(data.current_weather.temperature);
            const code = data.current_weather.weathercode;

            const tempEl = document.getElementById('weather-temp');
            const iconEl = document.getElementById('weather-icon');

            if(tempEl) tempEl.textContent = temp;
            
            const icons = {
                0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️",
                45: "🌫️", 48: "🌫️",
                51: "🌦️", 61: "🌧️", 71: "❄️", 95: "⛈️"
            };
            if(iconEl) iconEl.textContent = icons[code] || "🌤️";
            
        } catch (error) {
            console.error("Erreur météo:", error);
        }
    }

    // --- GESTION DES NOTES (LocalStorage) ---
    function addQuickNote() {
        const text = prompt("Saisir une note :");
        if (!text) return;

        const notes = JSON.parse(localStorage.getItem('dashboard_notes') || '[]');
        notes.push({
            id: Date.now(),
            content: text,
            date: new Date().toLocaleDateString('fr-FR', {hour: '2-digit', minute:'2-digit'})
        });
        
        localStorage.setItem('dashboard_notes', JSON.stringify(notes));
        displayNotes();
    }

    function displayNotes() {
        const container = document.getElementById('notes-container');
        if(!container) return;

        const notes = JSON.parse(localStorage.getItem('dashboard_notes') || '[]');
        
        if (notes.length === 0) {
            container.innerHTML = '<p style="opacity: 0.5; font-style: italic;">Aucune note enregistrée.</p>';
            return;
        }

        container.innerHTML = notes.map(note => `
            <div style="background: rgba(255,255,255,0.05); padding: 12px; border-radius: 10px; border-left: 3px solid var(--accent);">
                <p style="margin: 0 0 5px 0; font-size: 0.85rem; line-height: 1.4;">${note.content}</p>
                <span style="font-size: 0.7rem; opacity: 0.4;">${note.date}</span>
            </div>
        `).join('');
    }

    function clearNotes() {
        if (confirm("Supprimer toutes les notes ?")) {
            localStorage.removeItem('dashboard_notes');
            displayNotes();
        }
    }

    // --- PALETTE ET TIMER ---
    function generatePalette() {
        const colors = Array.from({length: 3}, () => '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'));
        const display = document.getElementById('palette-display');
        const hex = document.getElementById('palette-hex');
        if(display) display.innerHTML = colors.map(c => `<div style="width:18px; height:18px; border-radius:4px; background:${c}"></div>`).join('');
        if(hex) hex.textContent = colors[0].toUpperCase();
    }

    let timerInterval;
    let seconds = 0;
    let isRunning = false;

    function toggleTimer() {
        const display = document.getElementById('timer-display');
        const status = document.getElementById('timer-status');
        const card = document.getElementById('timer-card');

        if (!isRunning) {
            isRunning = true;
            status.textContent = "Working...";
            card.style.borderColor = "var(--accent)";
            timerInterval = setInterval(() => {
                seconds++;
                const m = Math.floor(seconds / 60).toString().padStart(2, '0');
                const s = (seconds % 60).toString().padStart(2, '0');
                display.textContent = `${m}:${s}`;
            }, 1000);
        } else {
            isRunning = false;
            clearInterval(timerInterval);
            status.textContent = "Paused";
            card.style.borderColor = "rgba(255,255,255,0.1)";
        }
    }

    // --- INITIALISATION ---
    updateClock();
    updateWeather();
    displayNotes();
    generatePalette();

    setInterval(updateClock, 1000);
    setInterval(updateWeather, 600000); // 10 min
</script>
</body>
</html>