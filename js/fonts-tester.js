document.addEventListener('DOMContentLoaded', () => {
    const urlInput = document.getElementById('font-url-input');
    const textInput = document.getElementById('font-text-input');
    const sizeInput = document.getElementById('font-size-input');
    const preview = document.getElementById('font-preview-display');

    const updateFont = () => {
        // 1. MISE À JOUR IMMÉDIATE (Texte et Taille)
        // On le fait avant les vérifications d'URL pour que ce soit toujours réactif
        preview.textContent = textInput.value || "Saisissez votre texte...";
        const size = sizeInput.value || 24;
        preview.style.fontSize = size + 'px';

        // 2. LOGIQUE D'IMPORTATION DE LA POLICE
        let rawValue = urlInput.value.trim();
        if (!rawValue) return;

        let cleanUrl = rawValue;

        // Extraction si c'est une balise <link> complète
        if (rawValue.includes('<link') && rawValue.includes('href="')) {
            const match = rawValue.match(/href="([^"]+)"/);
            if (match && match[1]) {
                cleanUrl = match[1];
            }
        }

        // Sécurité : on ne traite l'injection que si l'URL contient 'family='
        if (!cleanUrl.includes('family=')) return;

        // Injection du lien dans le HEAD
        let link = document.getElementById('dynamic-google-font');
        if (!link) {
            link = document.createElement('link');
            link.id = 'dynamic-google-font';
            link.rel = 'stylesheet';
            document.head.appendChild(link);
        }
        
        // On ne met à jour le href que s'il a changé pour éviter de recharger inutilement
        if (link.href !== cleanUrl) {
            link.href = cleanUrl;
        }

        // 3. EXTRACTION DU NOM ET APPLICATION DE LA FAMILLE
        try {
            const familyPart = cleanUrl.split('family=')[1].split('&')[0].split(':')[0];
            const fontName = familyPart.replace(/\+/g, ' ');
            
            preview.style.setProperty('font-family', `"${fontName}", sans-serif`, 'important');
            console.log("Police appliquée :", fontName);
        } catch (e) {
            console.error("Erreur d'analyse de l'URL Google Fonts");
        }
    };

    // Écouteurs pour une réactivité totale
    urlInput.addEventListener('input', updateFont);
    textInput.addEventListener('input', updateFont);
    sizeInput.addEventListener('input', updateFont);
    
    // Initialisation au chargement
    updateFont();
});