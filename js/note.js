document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('notes-area');
    if (!area) return;

    // 1. Charger le texte proprement depuis le fichier physique
    fetch('data/notes.txt')
        .then(res => res.ok ? res.text() : "")
        .then(texte => { 
            if(texte) {
                area.value = texte;
                adjustHeight();
            }
        })
        .catch(() => console.log("Prêt pour la première note."));

    // Fonction d'ajustement de hauteur
    function adjustHeight() {
        area.style.height = 'auto';
        area.style.height = area.scrollHeight + 'px';
    }

    // 2. Sauvegarder et Ajuster la hauteur
    let timer;
    area.addEventListener('input', () => {
        adjustHeight();

        // Debounce de 500ms pour ne pas harceler le serveur PHP
        clearTimeout(timer);
        timer = setTimeout(saveToDisk, 500);
    });

    function saveToDisk() {
        const donnees = new FormData();
        donnees.append('content', area.value);

        fetch('includes/save_notes.php', {
            method: 'POST',
            body: donnees
        })
        .then(res => res.text())
        .then(status => console.log("Sauvegarde : " + status))
        .catch(err => console.error("Erreur de sauvegarde :", err));
    }
});