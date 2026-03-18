<script>
        function updateClock() {
            const now = new Date();
            const time = now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
            const clockEl = document.getElementById('clock');
            if(clockEl) clockEl.textContent = time;
        }
        setInterval(updateClock, 1000);
        updateClock();
    </script>
</body>
</html>