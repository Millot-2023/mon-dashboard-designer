/**
 * Gestion des composants d'interface (UI)
 */
document.addEventListener('DOMContentLoaded', () => {
    const selects = document.querySelectorAll('.custom-select');

    selects.forEach(select => {
        const trigger = select.querySelector('.select-trigger');
        const options = select.querySelectorAll('.option');
        const inputHidden = select.querySelector('input[type="hidden"]');
        const label = trigger ? trigger.querySelector('span') : null;

        // On ne met des écouteurs QUE si les éléments existent
        if (trigger) {
            trigger.addEventListener('click', (e) => {
                e.stopPropagation();
                selects.forEach(s => { if (s !== select) s.classList.remove('active'); });
                select.classList.toggle('active');
            });
        }

        options.forEach(opt => {
            opt.addEventListener('click', (e) => {
                e.stopPropagation();
                const val = opt.getAttribute('data-value');
                
                if (label) label.textContent = opt.textContent;
                if (inputHidden) {
                    inputHidden.value = val;
                    inputHidden.dispatchEvent(new Event('input', { bubbles: true }));
                }

                options.forEach(o => o.classList.remove('selected'));
                opt.classList.add('selected');
                select.classList.remove('active');
                
                // On prévient les autres scripts (comme palette.js)
                select.dispatchEvent(new CustomEvent('change', { detail: val }));
            });
        });
    });

    // Fermeture propre au clic extérieur
    window.addEventListener('click', () => {
        selects.forEach(s => s.classList.remove('active'));
    });
});