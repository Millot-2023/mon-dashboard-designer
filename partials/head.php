<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Launchpad Designer</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        :root {
            --bg-gradient: linear-gradient(135deg, #1e1e2f 0%, #2d2d44 100%);
            --card-bg: rgba(255, 255, 255, 0.05);
            --accent: #3498db;
        }

        body, html { 
            margin: 0; padding: 0; min-height: 100%; 
            font-family: 'Inter', 'Segoe UI', sans-serif;
            background: var(--bg-gradient);
            color: white;
            overflow-x: hidden; 
        }

        .launchpad {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            width: 100vw;
            padding: 40px 20px;
            box-sizing: border-box;
        }

        .welcome-msg { text-align: center; margin-bottom: 40px; }
        .welcome-msg h1 { font-size: 2.5rem; margin-bottom: 5px; }
        .welcome-msg p { opacity: 0.7; font-size: 1.1rem; }

        .grid-container {
            display: grid;
            grid-template-columns: repeat(4, 1fr); 
            gap: 25px;
            width: 100%;
            max-width: 1200px;
        }

        /* Tailles des cartes */
        .card.small  { grid-column: span 1; }
        .card.medium { grid-column: span 2; }
        .card.large  { grid-column: span 4; }

        .card {
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 25px;
            text-align: center;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-shadow: none !important;
        }

        .card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.1);
            border-color: var(--accent);
            box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }

        .card h3 { margin: 10px 0 5px 0; font-weight: 500; color: #ffffff; }
        .card p { font-size: 0.8rem; opacity: 0.8; margin: 0; color: #bdc3c7; }

        .icon-placeholder {
            width: 50px; height: 50px;
            background: var(--accent);
            border-radius: 12px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem;
            font-weight: bold;
        }

        /* Responsive */
        @media (max-width: 900px) {
            .grid-container { grid-template-columns: repeat(2, 1fr); }
            .card.small, .card.medium { grid-column: span 1; }
            .card.large { grid-column: span 2; }
        }

        @media (max-width: 600px) {
            .grid-container { 
                grid-template-columns: repeat(2, 1fr); 
                gap: 15px; 
            }
            .card.small { grid-column: span 1; } /* Côte à côte sur mobile */
            .card.medium, .card.large { grid-column: span 2; } /* Full width sur mobile */
            
            .card { padding: 15px; }
            .card h3 { font-size: 1.1rem; }
            .welcome-msg h1 { font-size: 1.8rem; }
        }
    </style>
</head>
<body>