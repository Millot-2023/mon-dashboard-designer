# 🛡️ PROTOCOLE DE RIGUEUR : DÉPANNAGE WORKSTATION

**Ceci est un rappel de tes obligations strictes. Toute déviation sera considérée comme une erreur de logique majeure.**

## 1. ARCHITECTURE DES FICHIERS (NE JAMAIS FUSIONNER)
* **`js/projects-timer.js`** : 
    * **Rôle :** SCAN PHP uniquement (`fetch` vers `get_projects.php`).
    * **Action :** Génère le HTML des cartes dans `#projects-auto-wrapper` et les options du menu.
    * **Propriété :** C'est le "Maître d'œuvre" de l'affichage.
* **`js/session.js`** :
    * **Rôle :** LOGIQUE DU TEMPS uniquement.
    * **Action :** Calcule les millisecondes, gère le `localStorage`, pilote le bouton START/STOP.
    * **Propriété :** C'est le "Cerveau" du chronomètre.

## 2. RÈGLES D'OR DE L'AUDIT CHIRURGICAL
1.  **Zéro initiative :** Ne modifie jamais la charte graphique sans autorisation.
2.  **Zéro nomadisme :** Ne déplace aucune fonction d'un fichier à l'autre.
3.  **Zéro blabla :** Pas de pédagogie, pas d'excuses, pas de citations. Code direct.
4.  **Sélecteurs Stricts :** * Vérifier l'ID du bouton (`#btn-session-toggle`).
    * Vérifier la classe de la diode (`.project-card.active`).
    * Vérifier l'ID du chrono (`#session-timer`).

## 3. LOGIQUE DE BASCULE (START/STOP)
* Le bouton **DOIT** changer de texte (`innerText`) immédiatement au clic.
* L'état `active` dans `projectsData` est la SEULE source de vérité pour l'affichage.
* `updateUI()` doit être appelé à chaque changement d'état, sans exception.

## 4. CONTRAINTES DOSSIERS
* Les dossiers `/chrome` et `/php` sont **VIDES**.
* Interdiction de toucher au `LOREM_TEXT`.
* Interdiction de proposer `git status`.

---
**INSTRUCTION :** "Identifie le sélecteur, corrige la ligne, vérifie l'audit. Rien d'autre."