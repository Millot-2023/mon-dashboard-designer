function updateAnalogClock() {
    const hourHand = document.getElementById('hour-hand');
    const minHand = document.getElementById('min-hand');
    const secHand = document.getElementById('sec-hand');
    const digitalClock = document.getElementById('clock'); // Pour l'heure numérique en bas à droite

    if (!hourHand || !minHand || !secHand) return;

    const now = new Date();
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();

    // 1. Mise à jour de l'affichage numérique (format 00:00:00)
    if (digitalClock) {
        digitalClock.textContent = now.toLocaleTimeString('fr-FR', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }

    // 2. Calcul des angles
    const secDegree = (seconds / 60) * 360;
    const minDegree = (minutes / 60) * 360 + (seconds / 60) * 6;
    const hourDegree = (hours % 12 / 12) * 360 + (minutes / 60) * 30;

    // 3. Correction du bug de rotation arrière à la 60ème seconde
    if (seconds === 0) {
        secHand.style.transition = 'none'; // On coupe la transition à 0s
    } else {
        secHand.style.transition = 'transform 0.2s cubic-bezier(0.4, 2.08, 0.55, 0.44)';
    }

    // 4. Application
    secHand.style.transform = `translateX(-50%) rotate(${secDegree}deg)`;
    minHand.style.transform = `translateX(-50%) rotate(${minDegree}deg)`;
    hourHand.style.transform = `translateX(-50%) rotate(${hourDegree}deg)`;
}

document.addEventListener('DOMContentLoaded', () => {
    updateAnalogClock();
    setInterval(updateAnalogClock, 1000);
});