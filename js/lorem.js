document.addEventListener('DOMContentLoaded', () => {
    const words = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "nulla", "facilisi", "integer", "eu", "lacus", "at", "velit", "viverra", "aliquam", "mauris", "pharetra", "augue", "sed", "urna", "pretium", "porttitor"];
    
    const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

    const generateSentence = () => {
        let len = Math.floor(Math.random() * 8) + 6;
        let sentence = [];
        for (let i = 0; i < len; i++) {
            sentence.push(getRandom(words));
            // Ajout d'une virgule aléatoire (pas au début ni à la fin)
            if (i > 2 && i < len - 2 && Math.random() > 0.8) {
                sentence[i] += ",";
            }
        }
        let str = sentence.join(" ");
        return str.charAt(0).toUpperCase() + str.slice(1) + ".";
    };

    const updateUI = (text) => {
        const output = document.getElementById('lorem-output');
        output.innerText = text;
        document.getElementById('lorem-counter').innerText = `${text.length} chars`;
    };

    document.getElementById('gen-lorem').addEventListener('click', () => {
        const type = document.getElementById('lorem-type').value;
        const amount = parseInt(document.getElementById('lorem-amount').value);
        let results = [];

        for (let i = 0; i < amount; i++) {
            if (type === 'paragraphs') {
                let p = [];
                for (let j = 0; j < 4; j++) p.push(generateSentence());
                results.push(p.join(" ") + "\n\n");
            } else if (type === 'sentences') {
                results.push(generateSentence());
            } else {
                results.push(getRandom(words));
            }
        }
        updateUI(results.join(type === 'paragraphs' ? "" : " "));
    });

    document.getElementById('copy-lorem').addEventListener('click', () => {
        const output = document.getElementById('lorem-output');
        navigator.clipboard.writeText(output.innerText);
        
        output.classList.add('flash-success');
        setTimeout(() => output.classList.remove('flash-success'), 500);
    });
});