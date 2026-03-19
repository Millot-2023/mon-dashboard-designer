async function updateWeatherAndSnapshot() {
    const card = document.querySelector('.weather-card');
    const timer = document.getElementById('last-update');
    const tempDisplay = document.getElementById('temp-display');
    const weatherIcon = document.getElementById('weather-icon');
    
    const apiKey = "VOTRE_CLE_API"; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=Paris&units=metric&lang=fr&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // 1. MAJ de la Température
        if (tempDisplay) tempDisplay.innerText = Math.round(data.main.temp) + "°C";

        // 2. MAJ de l'Icône (Flux officiel OpenWeather)
        if (weatherIcon) {
            const iconCode = data.weather[0].icon; 
            weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" style="width:80px;">`;
        }

        // 3. MAJ du Fond selon la météo (Le flux nous donne l'ID météo)
        const mainWeather = data.weather[0].main; // Ex: "Rain", "Clear", "Clouds"
        if (card) {
            if (mainWeather === "Clear") card.style.background = "linear-gradient(135deg, #f1c40f, #f39c12)"; // Soleil
            else if (mainWeather === "Rain") card.style.background = "linear-gradient(135deg, #2980b9, #2c3e50)"; // Pluie
            else if (mainWeather === "Clouds") card.style.background = "linear-gradient(135deg, #7f8c8d, #95a5a6)"; // Nuages
            else card.style.background = "linear-gradient(135deg, #16a085, #2c3e50)"; // Par défaut
        }

        if (timer) {
            const now = new Date();
            timer.innerText = "Paris - " + now.getHours() + ":" + now.getMinutes().toString().padStart(2, '0');
        }

    } catch (error) {
        console.error("Erreur flux météo", error);
    }
}