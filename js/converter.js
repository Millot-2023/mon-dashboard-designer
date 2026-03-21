document.addEventListener('DOMContentLoaded', () => {
    const pxInput = document.getElementById('input-px');
    const remInput = document.getElementById('input-rem');
    const baseInput = document.getElementById('base-font');

    // Fonction de conversion PX -> REM
    const updateRem = () => {
        const pxValue = parseFloat(pxInput.value);
        const baseValue = parseFloat(baseInput.value) || 16;
        if (!isNaN(pxValue)) {
            remInput.value = (pxValue / baseValue).toFixed(3);
        } else {
            remInput.value = '';
        }
    };

    // Fonction de conversion REM -> PX
    const updatePx = () => {
        const remValue = parseFloat(remInput.value);
        const baseValue = parseFloat(baseInput.value) || 16;
        if (!isNaN(remValue)) {
            pxInput.value = Math.round(remValue * baseValue);
        } else {
            pxInput.value = '';
        }
    };

    // Écouteurs d'événements
    pxInput.addEventListener('input', updateRem);
    remInput.addEventListener('input', updatePx);
    baseInput.addEventListener('input', updateRem); // Recalcule si on change la base
});