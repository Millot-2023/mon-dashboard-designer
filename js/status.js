async function updateSystemStatus() {
    const glyph = document.getElementById('status-dot');
    if (!glyph) return;

    try {
        const response = await fetch('status_check.php?t=' + Date.now());
        const data = await response.text();
        const status = data.trim();

        if (status === 'online') {
            // On nettoie les styles inline s'ils existent
            glyph.style.cssText = ""; 
            glyph.classList.remove('dot-offline');
            glyph.classList.add('dot-online');
        } else {
            glyph.style.cssText = "";
            glyph.classList.remove('dot-online');
            glyph.classList.add('dot-offline');
        }
    } catch (error) {
        glyph.classList.remove('dot-online');
        glyph.classList.add('dot-offline');
    }
}

setInterval(updateSystemStatus, 3000);
document.addEventListener('DOMContentLoaded', updateSystemStatus);