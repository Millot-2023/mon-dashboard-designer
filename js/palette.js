const MOOD_RULES = {
    vibrant: { s: [90, 100], l: [45, 55] },
    pastel: { s: [50, 70], l: [80, 90] },
    darksynth: { s: [80, 100], l: [40, 50], h: [260, 330] }
};

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

function applyLivePreview(palette) {
    if (!palette || palette.length < 2) return;

    const root = document.documentElement;
    // Injecte les CSS Custom properties dans :root
    root.style.setProperty('--accent-primary', palette[0]);
    root.style.setProperty('--accent-secondary', palette[1]);

    // Par sécurité pour ton CSS existant s'il n'utilise pas encore var()
    root.style.setProperty('--primary-color', palette[0]);
}

window.initPalette = function () {
    const container = document.getElementById('palette-colors');
    const countInput = document.getElementById('palette-count');
    const moodInput = document.getElementById('palette-mood');

    if (!container) return;

    const generate = () => {
        const count = countInput ? parseInt(countInput.value) : 5;
        const currentMood = moodInput ? moodInput.value : "vibrant";
        const config = MOOD_RULES[currentMood] || MOOD_RULES.vibrant;

        container.innerHTML = '';
        let generatedColors = [];

        // Base Hue conditionnelle selon le mood
        let baseHue = config.h
            ? Math.floor(Math.random() * (config.h[1] - config.h[0])) + config.h[0]
            : Math.floor(Math.random() * 360);

        for (let i = 0; i < count; i++) {
            let h = (baseHue + (i * 25)) % 360;
            let s = Math.floor(Math.random() * (config.s[1] - config.s[0])) + config.s[0];
            let l = Math.floor(Math.random() * (config.l[1] - config.l[0])) + config.l[0];

            const hex = hslToHex(h, s, l);
            generatedColors.push(hex);

            const rect = document.createElement('div');
            rect.className = 'palette-swatch';
            rect.style.backgroundColor = hex;
            rect.style.flex = '1';
            rect.style.cursor = 'pointer';

            rect.onclick = (e) => {
                e.stopPropagation();
                applyLivePreview([hex, generatedColors[1] || hex]);
                navigator.clipboard.writeText(hex);
            };

            container.appendChild(rect);
        }

        // Déclenche le live preview à la génération de la palette
        applyLivePreview(generatedColors);
    };

    // Écoute les + / - de ton ui.js ou changement direct
    if (countInput) countInput.addEventListener('input', generate);

    // Écoute Custom Event du select
    if (moodInput) {
        moodInput.addEventListener('input', generate);
        moodInput.addEventListener('change', generate);
    }

    generate(); // Génération initiale
}