function updateSystemStatus() {
    const glyph = document.getElementById('status-glow');
    if (!glyph) return;

    // On vérifie l'état réel du navigateur
    const isOnline = navigator.onLine;

    if (isOnline) {
        // VERT NÉON
        glyph.style.setProperty('color', '#00ff9d', 'important');
        glyph.style.setProperty('text-shadow', '0 0 8px #00ff9d, 0 0 15px rgba(0,255,157,0.6)', 'important');
        glyph.style.setProperty('font-weight', 'bold', 'important');
    } else {
        // ORANGE ALERTE
        glyph.style.setProperty('color', '#ffb347', 'important');
        glyph.style.setProperty('text-shadow', '0 0 8px #ffb347, 0 0 15px rgba(255,179,71,0.6)', 'important');
        glyph.style.setProperty('font-weight', 'bold', 'important');
    }
}

// Écouteurs d'événements
window.addEventListener('online', updateSystemStatus);
window.addEventListener('offline', updateSystemStatus);

// Lancement immédiat au chargement du DOM
document.addEventListener('DOMContentLoaded', updateSystemStatus);