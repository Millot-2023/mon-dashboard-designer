console.log("1. Le fichier note.js est bien lu par le navigateur");

document.addEventListener('DOMContentLoaded', () => {
    const area = document.getElementById('notes-area');
    const btn = document.getElementById('clear-notes');

    if (!area) {
        console.error("2. ERREUR : L'élément #notes-area est introuvable dans la page !");
        return;
    }

    console.log("2. Succès : Le textarea #notes-area a été trouvé");

    // Charger les notes au démarrage
    const saved = localStorage.getItem('dash_notes');
    if (saved) {
        area.value = saved;
        console.log("3. Notes chargées depuis le stockage :", saved);
    } else {
        console.log("3. Aucun historique trouvé dans le stockage.");
    }

    // Sauvegarder à chaque touche
    area.addEventListener('input', () => {
        localStorage.setItem('dash_notes', area.value);
        console.log("Note sauvegardée en temps réel...");
    });

    if (btn) {
        btn.addEventListener('click', () => {
            if (confirm("Vider les notes ?")) {
                area.value = '';
                localStorage.removeItem('dash_notes');
            }
        });
    }
});