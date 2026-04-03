document.addEventListener('click', (e) => {
    // On cherche si on a cliqué sur un bouton de quantité
    const btn = e.target.closest('.qty-btn');
    if (!btn) return;

    const container = btn.closest('.custom-qty');
    const input = container.querySelector('input');
    
    // Action selon la classe du bouton
    if (btn.classList.contains('up')) {
        input.stepUp();
    } else {
        input.stepDown();
    }

    // IMPORTANT : On déclenche manuellement les événements pour que 
    // les scripts de tes widgets (lorem.js, palette.js, converter.js) 
    // détectent le changement de valeur.
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));
});