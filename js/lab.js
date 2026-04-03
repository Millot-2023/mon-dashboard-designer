document.addEventListener('DOMContentLoaded', function() {
    const lab = document.getElementById('css-lab');
    if (!lab) return;

    const target = lab.querySelector('#lab-target');
    const shapeSelect = lab.querySelector('#lab-shape-select');
    const radiusSlider = lab.querySelector('#lab-radius-slider');
    const sizeInput = lab.querySelector('#lab-size-input');
    const cssOutput = lab.querySelector('#lab-css-output code');
    const copyBtn = lab.querySelector('#lab-copy-btn');

    function getShapeStyle(shape, r, s) {
        let style = { clipPath: 'none', mask: 'none', webkitMask: 'none', borderRadius: '0' };
        switch(shape) {
            case 'round': style.borderRadius = `${r}px`; break;
            case 'squircle': style.borderRadius = `${Math.min(r * 4, s/2)}px`; break;
            case 'bevel': style.clipPath = `polygon(${r}px 0%, calc(100% - ${r}px) 0%, 100% ${r}px, 100% calc(100% - ${r}px), calc(100% - ${r}px) 100%, ${r}px 100%, 0% calc(100% - ${r}px), 0% ${r}px)`; break;
            case 'scoop': 
                const m = `radial-gradient(circle at ${r}px ${r}px, transparent ${r}px, black ${r}px) calc(${r}px * -1) calc(${r}px * -1)`;
                style.webkitMask = m; style.mask = m; break;
            case 'notch': style.clipPath = `polygon(0% ${r}px, ${r}px ${r}px, ${r}px 0, calc(100% - ${r}px) 0, calc(100% - ${r}px) ${r}px, 100% ${r}px, 100% calc(100% - ${r}px), calc(100% - ${r}px) calc(100% - ${r}px), calc(100% - ${r}px) 100%, ${r}px 100%, ${r}px calc(100% - ${r}px), 0% calc(100% - ${r}px))`; break;
        }
        return style;
    }

    function update() {
        const r = parseInt(radiusSlider.value);
        const s = parseInt(sizeInput.value);
        const selected = shapeSelect.querySelector('.option.selected');
        const shape = selected ? selected.dataset.value : 'round';

        target.style.width = s + 'px';
        target.style.height = s + 'px';

        const styles = getShapeStyle(shape, r, s);
        target.style.borderRadius = styles.borderRadius;
        target.style.clipPath = styles.clipPath;
        target.style.webkitMask = styles.webkitMask;
        target.style.mask = styles.mask;

        const displays = lab.querySelectorAll('.value-display');
        if (displays[0]) displays[0].textContent = r + 'px';
        if (displays[1]) displays[1].textContent = s + 'px';

        let css = `.target {\n  width: ${s}px;\n  height: ${s}px;\n`;
        if (styles.borderRadius !== '0') css += `  border-radius: ${styles.borderRadius};\n`;
        if (styles.clipPath !== 'none') css += `  clip-path: ${styles.clipPath};\n`;
        if (styles.mask !== 'none') css += `  mask: ${styles.mask};\n`;
        css += `}`;
        cssOutput.textContent = css;
    }

    shapeSelect.addEventListener('click', function(e) {
        e.stopPropagation();
        if (e.target.classList.contains('select-trigger')) {
            this.classList.toggle('active');
        } else if (e.target.classList.contains('option')) {
            this.querySelectorAll('.option').forEach(o => o.classList.remove('selected'));
            e.target.classList.add('selected');
            this.querySelector('.select-trigger').textContent = e.target.textContent;
            this.classList.remove('active');
            update();
        }
    });

    document.addEventListener('click', () => shapeSelect.classList.remove('active'));
    radiusSlider.addEventListener('input', update);
    sizeInput.addEventListener('input', update);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssOutput.textContent);
        const oldText = copyBtn.textContent;
        copyBtn.textContent = "✅ Copied!";
        setTimeout(() => copyBtn.textContent = oldText, 1500);
    });

    update();
});