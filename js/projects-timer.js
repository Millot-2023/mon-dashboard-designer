let projectsData = JSON.parse(localStorage.getItem('projects-logs')) || {};

function toggleProject(projectName) {
    const now = Date.now(); // Heure précise en millisecondes
    
    if (!projectsData[projectName]) {
        projectsData[projectName] = { totalTime: 0, startTime: null, active: false };
    }

    let project = projectsData[projectName];

    if (!project.active) {
        // START : On marque juste le point de départ
        project.startTime = now;
        project.active = true;
    } else {
        // STOP : On fait l'opération mathématique
        const sessionDuration = now - project.startTime; // Résultat en millisecondes
        project.totalTime += sessionDuration; // On cumule
        project.startTime = null;
        project.active = false;
    }

    localStorage.setItem('projects-logs', JSON.stringify(projectsData));
    updateUI();
}