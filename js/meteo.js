// Fonction pour traduire le code météo en icône visuelle
function getWeatherIcon(code) {
    if (code === 0) return '☀️'; // Ciel dégagé
    if (code >= 1 && code <= 3) return '🌤️'; // Peu nuageux
    if (code >= 45 && code <= 48) return '🌫️'; // Brouillard
    if (code >= 51 && code <= 67) return '🌧️'; // Pluie / Bruine
    if (code >= 71 && code <= 77) return '❄️'; // Neige
    if (code >= 80 && code <= 82) return '🌦️'; // Averses
    if (code >= 95) return '⛈️'; // Orage
    return '☁️'; // Par défaut : Nuageux
}

async function fetchWeather(lat, lon) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;

        // Mise à jour de l'affichage
        document.getElementById('temp-display').textContent = `${temp}°C`;
        document.getElementById('weather-icon').textContent = getWeatherIcon(code);
        
    } catch (e) { 
        console.error("Météo impossible");
        document.getElementById('temp-display').textContent = "--°C";
    }
}

async function searchCity(cityName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}&limit=1`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data && data.length > 0) {
            fetchWeather(data[0].lat, data[0].lon);
            localStorage.setItem('user-city', cityName);
        }
    } catch (e) { console.error("Ville non trouvée"); }
}

// Écouteur sur le champ de saisie
document.getElementById('city-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchCity(e.target.value);
    }
});

// Init au chargement
const savedCity = localStorage.getItem('user-city') || 'Paris';
document.getElementById('city-input').value = savedCity;
searchCity(savedCity);