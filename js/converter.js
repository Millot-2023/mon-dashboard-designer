document.addEventListener('DOMContentLoaded', () => {
    const pxInput = document.getElementById('input-px');
    const remInput = document.getElementById('input-rem');
    const baseInput = document.getElementById('base-font');

    const convertPxToRem = () => {
        const base = parseFloat(baseInput.value) || 16;
        const px = parseFloat(pxInput.value) || 0;
        remInput.value = (px / base).toFixed(3);
    };

    const convertRemToPx = () => {
        const base = parseFloat(baseInput.value) || 16;
        const rem = parseFloat(remInput.value) || 0;
        pxInput.value = (rem * base).toFixed(0);
    };

    pxInput.addEventListener('input', convertPxToRem);
    remInput.addEventListener('input', convertRemToPx);
    baseInput.addEventListener('input', convertPxToRem);

    // Initialisation
    convertPxToRem();
});