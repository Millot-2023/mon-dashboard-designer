document.addEventListener('DOMContentLoaded', function() {
    const htmlInput = document.getElementById('cp-html');
    const cssInput = document.getElementById('cp-css');
    const jsInput = document.getElementById('cp-js');
    const renderFrame = document.getElementById('cp-live-render');

    // Fonction de rendu
    function updatePreview() {
        const html = htmlInput.value;
        const css = `<style>${cssInput.value}</style>`;
        const js = `<script>${jsInput.value}<\/script>`; // Échappement du slash pour le JS
        
        const content = `
            <!DOCTYPE html>
            <html>
                <head>${css}</head>
                <body>
                    ${html}
                    ${js}
                </body>
            </html>
        `;
        
        const frameDoc = renderFrame.contentDocument || renderFrame.contentWindow.document;
        frameDoc.open();
        frameDoc.write(content);
        frameDoc.close();
    }

    // Écouteurs d'événements
    [htmlInput, cssInput, jsInput].forEach(el => {
        el.addEventListener('input', updatePreview);
    });

    // Gestion des onglets
    const tabs = document.querySelectorAll('.codepen-wrapper .tab-btn');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');
            
            // Toggle classes
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            document.getElementById('cp-tab-css').classList.remove('active');
            document.getElementById('cp-tab-js').classList.remove('active');
            document.getElementById(`cp-tab-${target}`).classList.add('active');
        });
    });

    // Initialisation
    updatePreview();
});