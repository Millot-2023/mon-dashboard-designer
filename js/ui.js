/**
 * Gestion unifiée des composants d'interface (UI)
 */
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GESTION DES CUSTOM SELECTS ---
    const selects = document.querySelectorAll('.custom-select');

    selects.forEach(select => {
        const trigger = select.querySelector('.select-trigger');
        const options = select.querySelectorAll('.option');
        const inputHidden = select.querySelector('input[type="hidden"]');
        const label = trigger ? (trigger.querySelector('span') || trigger) : null;
        const parentCard = select.closest('.card, .lab-panel');

        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Fermer les autres et réinitialiser leur z-index
                selects.forEach(s => { 
                    if (s !== select) {
                        s.classList.remove('active');
                        const otherCard = s.closest('.card, .lab-panel');
                        if (otherCard) otherCard.style.zIndex = "";
                    }
                });

                const isActive = select.classList.toggle('active');
                
                // Gestion dynamique du z-index pour passer au-dessus des voisins
                if (parentCard) {
                    parentCard.style.zIndex = isActive ? "1000" : "";
                }
            });
        }

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = opt.getAttribute('data-value');
                
                // Mise à jour du texte (si span existe ou directement dans le trigger)
                if (label) {
                    if (label.tagName === 'SPAN') label.textContent = opt.textContent;
                    else label.childNodes[0].textContent = opt.textContent;
                }

                if (inputHidden) {
                    inputHidden.value = val;
                    inputHidden.dispatchEvent(new Event('input', { bubbles: true }));
                }

                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                
                select.classList.remove('active');
                if (parentCard) parentCard.style.zIndex = "";
                
                select.dispatchEvent(new CustomEvent('change', { detail: val }));
            });
        });
    });

    // --- 2. GESTION DES INPUTS QUANTITÉ (+/-) ---
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.qty-btn');
        if (!btn) return;

        const container = btn.closest('.custom-qty');
        if (!container) return;

        const input = container.querySelector('input');
        if (!input) return;
        
        if (btn.classList.contains('up')) {
            input.stepUp();
        } else {
            input.stepDown();
        }

        input.dispatchEvent(new Event('change', { bubbles: true }));
        input.dispatchEvent(new Event('input', { bubbles: true }));
    });

    // Fermeture propre au clic extérieur
    window.addEventListener('click', () => {
        selects.forEach(s => {
            s.classList.remove('active');
            const pc = s.closest('.card, .lab-panel');
            if (pc) pc.style.zIndex = "";
        });
    });
});