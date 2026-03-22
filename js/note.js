document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('notes-area');

    // 1. Charger le texte proprement
    fetch('data/notes.txt')
        .then(res => {
            // SI LE FICHIER N'EXISTE PAS : on ne fait rien (on n'affiche pas l'erreur 404)
            if (!res.ok) return ""; 
            return res.text();
        })
        .then(texte => { 
            // On n'affiche le texte que s'il n'est pas vide
            if(texte) area.value = texte; 
        })
        .catch(err => console.log("Fichier notes.txt en attente de création..."));

    // 2. Sauvegarder (Inchangé)
    let timer;
    area.addEventListener('input', () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            const donnees = new FormData();
            donnees.append('content', area.value);

            fetch('includes/save_notes.php', {
                method: 'POST',
                body: donnees
            });
        }, 500);
    });
});