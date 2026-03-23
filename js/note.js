document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('notes-area');
    if (!area) return;

    // 1. Charger le texte proprement depuis le fichier physique
    fetch('data/notes.txt')
        .then(res => {
            if (!res.ok) return ""; 
            return res.text();
        })
        .then(texte => { 
            if(texte) {
                area.value = texte;
                // Ajuster la hauteur initiale après le chargement du texte
                area.style.height = 'auto';
                area.style.height = area.scrollHeight + 'px';
            }
        })
        .catch(err => console.log("Fichier notes.txt en attente de création..."));

    // 2. Sauvegarder et Ajuster la hauteur
    let timer;
    area.addEventListener('input', () => {
        // Auto-ajustement de la hauteur pendant la saisie
        area.style.height = 'auto';
        area.style.height = area.scrollHeight + 'px';

        // Debounce de 500ms pour ne pas harceler le serveur PHP
        clearTimeout(timer);
        timer = setTimeout(() => {
            const donnees = new FormData();
            donnees.append('content', area.value);

            fetch('includes/save_notes.php', {
                method: 'POST',
                body: donnees
            })
            .then(res => res.text())
            .then(status => console.log("Sauvegarde : " + status))
            .catch(err => console.error("Erreur de sauvegarde :", err));
        }, 500);
    });
});