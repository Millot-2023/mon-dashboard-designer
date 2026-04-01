<?php
/**
 * Widget : Ressources de Session
 * État : Réceptacle dynamique qui s'auto-ajuste ou disparaît si vide.
 */
?>
<div id="resources-zone" class="resources-wrapper">
    <div id="resources-list" class="dashboard-row-4">
        </div>
</div>

<style>
.resources-wrapper {
    margin: 0;
    padding: 0;
    transition: all 0.3s ease-in-out;
}

#resources-list:not(:empty) {
    margin-top: 15px;
    margin-bottom: 20px;
    padding: 15px 0;
    border-top: 1px dashed rgba(255, 255, 255, 0.1);
    border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
}

/* On force le curseur pointer sur toute la carte */
.resource-mini-card {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 8px;
    display: flex;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.2s ease;
    cursor: pointer; 
    overflow: hidden;
    padding: 0; /* On gère le padding via le lien interne */
}

.resource-mini-card:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-2px);
    border-color: rgba(255, 255, 255, 0.2);
}

/* Le lien englobe l'icône et le texte et prend tout l'espace */
.res-link-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    text-decoration: none;
    flex-grow: 1;
    width: 100%;
}

.res-icon { 
    width: 16px; 
    height: 16px; 
    border-radius: 2px; 
    flex-shrink: 0; 
}

.res-title { 
    font-size: 0.8rem; 
    color: #eee; 
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
}

.res-delete { 
    color: #ff5f56; 
    font-size: 0.9rem; 
    opacity: 0.4;
    padding: 10px 15px; /* Zone de clic large pour supprimer */
    transition: opacity 0.2s;
    z-index: 2;
}

.res-delete:hover { 
    opacity: 1; 
}
</style>