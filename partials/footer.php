<script>
        function updateClock() {
            const now = new Date();
            
            // Heure
            const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const clockEl = document.getElementById('clock');
            if(clockEl) clockEl.textContent = time;

            // Date complète
            const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
            const dateStr = now.toLocaleDateString('fr-FR', options);
            const dateEl = document.getElementById('date-display');
            if(dateEl) {
                dateEl.textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
            }
        }

        function addQuickNote() {
            const note = prompt("Note rapide :");
            if (note) {
                console.log("Note capturée :", note);
                alert("Idée enregistrée localement.");
            }
        }

        // Init
        setInterval(updateClock, 1000);
        updateClock();
    </script>
</body>
</html>