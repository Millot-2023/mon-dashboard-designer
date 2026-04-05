document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('font-url-input');
    const textInput = document.getElementById('font-text-input');
    const sizeInput = document.getElementById('font-size-input');
    const preview = document.getElementById('font-preview-display');

    const updateFont = () => {
        let rawValue = urlInput.value.trim();
        if (!rawValue) return;

        let cleanUrl = rawValue;

        // --- LOGIQUE D'EXTRACTION DE LA BALISE LINK ---
        // Si la chaîne contient '<link' et 'href=', on extrait ce qu'il y a entre les guillemets du href
        if (rawValue.includes('<link') && rawValue.includes('href="')) {
            const match = rawValue.match(/href="([^"]+)"/);
            if (match && match[1]) {
                cleanUrl = match[1];
            }
        }

        // Sécurité : on ne traite que si l'URL finale contient 'family='
        if (!cleanUrl.includes('family=')) return;

        // 1. Injection du lien dans le HEAD (pour charger la police)
        let link = document.getElementById('dynamic-google-font');
        if (!link) {
            link = document.createElement('link');
            link.id = 'dynamic-google-font';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        link.href = cleanUrl;

        // 2. Extraction du nom de la police (ex: "Playwrite+IE")
        try {
            const familyPart = cleanUrl.split('family=')[1].split('&')[0].split(':')[0];
            const fontName = familyPart.replace(/\+/g, ' ');
            
            // 3. Application visuelle
            preview.style.setProperty('font-family', `"${fontName}", sans-serif`, 'important');
            preview.style.fontSize = (sizeInput.value || 24) + 'px';
            preview.textContent = textInput.value;

            console.log("Extraction réussie :", fontName);
        } catch (e) {
            console.error("Erreur d'analyse de l'URL Google Fonts");
        }
    };

    // Écouteurs pour une réactivité immédiate
    urlInput.addEventListener('input', updateFont);
    textInput.addEventListener('input', updateFont);
    sizeInput.addEventListener('input', updateFont);
});