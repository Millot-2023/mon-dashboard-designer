<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Workstation Dashboard</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
            --card-bg: rgba(255, 255, 255, 0.05);
            --accent: #3498db;
        }

        body, html { 
            margin: 0; padding: 0; min-height: 100%; 
            font-family: 'Inter', sans-serif;
            background: var(--bg-gradient);
            color: white;
            overflow-x: hidden; 
        }

        .launchpad {
            display: flex; flex-direction: column; align-items: center;
            min-height: 100vh; padding: 40px 20px; box-sizing: border-box;
        }

        .welcome-msg { text-align: center; margin-bottom: 40px; }
        .grid-container {
            display: grid; grid-template-columns: repeat(4, 1fr); 
            gap: 25px; width: 100%; max-width: 1200px;
        }

        .card {
            background: var(--card-bg); backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
            padding: 25px; text-align: center; transition: 0.3s;
            display: flex; flex-direction: column; align-items: center;
            justify-content: center; min-height: 180px; box-sizing: border-box;
        }

        .card:hover { transform: translateY(-10px); border-color: var(--accent); }
        .card.small { grid-column: span 1; }
        .card.large { grid-column: span 4; }
        #projects-wrapper { display: contents; }

        .icon-placeholder {
            width: 50px; height: 50px; background: var(--accent);
            border-radius: 12px; display: flex; align-items: center;
            justify-content: center; font-weight: bold; margin-bottom: 10px;
        }

        @media (max-width: 1024px) {
            .grid-container { grid-template-columns: repeat(2, 1fr); }
            .card.large { grid-column: span 2; }
        }
        @media (max-width: 480px) {
            .grid-container { grid-template-columns: 1fr; }
            .card.small, .card.large { grid-column: span 1; }
        }
    </style>
</head>
<body>