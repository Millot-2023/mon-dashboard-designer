<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Laboratoire Dashboard</title>
    <style>
        /* CONFIGURATION DE BASE (Inspirée de tes variables) */
        :root {
            --bg-gradient: linear-gradient(135deg, #0f0f13 0%, #1a1a2e 100%);
            --card-bg: rgba(255, 255, 255, 0.03);
            --card-border: rgba(255, 255, 255, 0.08);
            --primary: #4a90e2; /* Ton bleu projet */
            --white: #ffffff;
        }

        body {
            background: var(--bg-gradient);
            color: var(--white);
            font-family: 'Inter', sans-serif;
            display: flex;
            gap: 20px;
            padding: 50px;
            justify-content: center;
        }

        /* --- LE COMPOSANT UNIFIÉ --- */
        .card {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 16px;
            backdrop-filter: blur(10px);
            width: 280px;
            min-height: 180px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }

        /* LE HEADER "MOOD" (Style Palette/Projet) */
        .tier-header {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            padding-bottom: 10px;
            margin-bottom: 20px;
        }

        .tier-header h3 {
            margin: 0;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: rgba(255, 255, 255, 0.5); /* L'opacité demandée */
        }

        /* LE CORPS */
        .tier-body {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            gap: 15px;
        }

        /* LES ÉLÉMENTS INTERNES (Inputs/Selects) */
        .custom-select-mock {
            height: 38px;
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            display: flex;
            align-items: center;
            padding: 0 12px;
            font-size: 0.85rem;
        }

        /* LE FOOTER */
        .tier-footer {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .btn-mock {
            background: var(--primary);
            border: none;
            color: white;
            padding: 8px 15px;
            border-radius: 6px;
            font-size: 0.75rem;
            font-weight: bold;
        }
    </style>
</head>
<body>

    <div class="card">
        <div class="tier-header">
            <h3>🎨 PALETTE MOOD</h3>
        </div>
        <div class="tier-body">
            <div class="custom-select-mock">Vibrant</div>
        </div>
        <div class="tier-footer">
            <span>#F0F0F0</span>
        </div>
    </div>

    <div class="card">
        <div class="tier-header">
            <h3>⏱️ SESSION PROJETS</h3>
        </div>
        <div class="tier-body">
            <div class="custom-select-mock">Projet Alpha</div>
        </div>
        <div class="tier-footer">
            <button class="btn-mock">START</button>
            <span style="font-family: monospace;">00:00</span>
        </div>
    </div>

</body>
</html>