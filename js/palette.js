const MOOD_RULES = {
    juicy:   { s: [90, 100], l: [45, 55] },             
    autumn:  { s: [40, 65],  l: [30, 45], h: [10, 50] }, 
    spring:  { s: [50, 80],  l: [75, 85] },             
    light:   { s: [5, 15],   l: [90, 95] },             
    cyber:   { s: [90, 100], l: [50, 60], h: [280, 330]},
    deepsea: { s: [60, 90],  l: [15, 35], h: [190, 240]},
    forest:  { s: [30, 60],  l: [25, 45], h: [100, 155]},
    zen:     { s: [10, 25],  l: [70, 85] },
    vintage: { s: [25, 45],  l: [45, 65], h: [20, 90] },
    gold:    { s: [50, 70],  l: [35, 50], h: [35, 55] }
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

function initPalette() {
    const container = document.getElementById('palette-colors');
    const countInput = document.getElementById('palette-count');
    const moodInput = document.getElementById('palette-mood');
    const moodContainer = document.getElementById('palette-mood-container');

    if (!container) return;

    const generate = () => {
        const count = countInput ? parseInt(countInput.value) : 5;
        const currentMood = moodInput ? moodInput.value : "juicy";
        const config = MOOD_RULES[currentMood] || MOOD_RULES.juicy;
        
        container.innerHTML = '';
        
        let baseHue = config.h 
            ? Math.floor(Math.random() * (config.h[1] - config.h[0])) + config.h[0] 
            : Math.floor(Math.random() * 360);

        for (let i = 0; i < count; i++) {
            let h = (baseHue + (i * 25)) % 360;
            let s = Math.floor(Math.random() * (config.s[1] - config.s[0])) + config.s[0];
            let l = Math.floor(Math.random() * (config.l[1] - config.l[0])) + config.l[0];
            
            const hex = hslToHex(h, s, l);
            const rect = document.createElement('div');
            
            rect.className = 'color-rect';
            rect.style.backgroundColor = hex;
            rect.setAttribute('data-hex', hex);
            
            rect.onclick = (e) => {
                e.stopPropagation();
                navigator.clipboard.writeText(hex);
                rect.style.transform = "scale(0.9)";
                setTimeout(() => rect.style.transform = "", 100);
            };
            
            container.appendChild(rect);
        }
    };

    if (countInput) countInput.oninput = generate;
    
    // Écoute l'événement 'change' envoyé par ui.js
    if (moodContainer) {
        moodContainer.addEventListener('change', generate);
    }

    generate();
}

// Correction du chargement : on attend que TOUT soit prêt (images, styles, DOM)
window.addEventListener('load', initPalette);