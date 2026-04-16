/**
 * DASHBOARD ENGINE - BOOTSTRAPPER (Version Flat-File)
 */

function updateClock() {
    const clock = document.getElementById('clock');
    const dateDisp = document.getElementById('date-display');
    const now = new Date();

    if (clock) {
        clock.textContent = now.toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (dateDisp) {
        dateDisp.textContent = now.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    }
}

async function updateWeather() {
    try {
        // L'appel OpenWeather sécurisé
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&lang=fr&appid=fbed67c1cd62da35b87fffad876b56ee`);
        const data = await response.json();
        const tempElement = document.getElementById('temp-display');
        if (tempElement) {
            tempElement.textContent = `${Math.round(data.main.temp)} °C`;
        }
    } catch (e) {
        console.error("Le module météo n'a pas pu joindre le serveur");
    }
}

// --- CHEF D'ORCHESTRE GLOBAL ---
document.addEventListener('DOMContentLoaded', () => {
    // Déclenche l'horloge et la météo dès la première seconde
    updateClock();
    updateWeather();

    // L'UI globale
    if (typeof initPalette === 'function') initPalette();

    // Les boucles actives
    setInterval(updateClock, 1000);
    setInterval(updateWeather, 3600000); // 1h
});