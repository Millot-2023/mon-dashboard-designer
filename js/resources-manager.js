/**
 * Gestionnaire des Ressources de Session
 * Gère l'ajout (Entrée / Bouton +), l'affichage et la suppression
 */

// Suppression globale
window.deleteResource = function(id) {
    let resources = JSON.parse(localStorage.getItem('workstation_resources')) || [];
    resources = resources.filter(r => r.id !== id);
    localStorage.setItem('workstation_resources', JSON.stringify(resources));
    renderResources();
};

// Rendu global des cartes
window.renderResources = function() {
    const listContainer = document.getElementById('resources-list');
    if (!listContainer) return;

    const resources = JSON.parse(localStorage.getItem('workstation_resources')) || [];
    listContainer.innerHTML = "";

    resources.forEach(res => {
        const card = document.createElement('div');
        card.className = "resource-mini-card";
        
        card.innerHTML = `
            <a href="${res.url}" target="_blank" class="res-link-wrapper">
                <img class="res-icon" src="https://www.google.com/s2/favicons?domain=${res.url}&sz=32">
                <span class="res-title">${res.title}</span>
            </a>
            <span class="res-delete" onclick="event.stopPropagation(); deleteResource(${res.id})">✕</span>
        `;
        listContainer.appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('project-name');
    const addBtn = document.getElementById('add-project-btn');

    // 1. Initialisation
    renderResources();

    // 2. Fonction de traitement commune
    const processInput = () => {
        const val = inputField.value.trim();
        if (val === "") return;

        addResource(val);
        inputField.value = ""; // Vider le champ
    };

    // 3. Événement Clavier (Entrée)
    if (inputField) {
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') processInput();
        });
    }

    // 4. Événement Clic (Bouton +)
    if (addBtn) {
        addBtn.addEventListener('click', processInput);
    }

    function addResource(query) {
        let resources = JSON.parse(localStorage.getItem('workstation_resources')) || [];
        
        // Détection URL vs Recherche
        const isUrl = query.includes('.') && !query.includes(' ');
        const finalUrl = isUrl ? (query.startsWith('http') ? query : 'https://' + query) : `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        // Formatage du titre
        let displayTitle = query;
        if (isUrl) {
            displayTitle = query.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
        }

        const newRes = {
            id: Date.now(),
            url: finalUrl,
            title: displayTitle.length > 25 ? displayTitle.substring(0, 25) + '...' : displayTitle
        };

        resources.push(newRes);
        localStorage.setItem('workstation_resources', JSON.stringify(resources));
        renderResources();
    }
});