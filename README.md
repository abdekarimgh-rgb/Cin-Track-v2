#  CinéTrack V2 — Catalogue de films et séries

##  Présentation du projet

CinéTrack est une application web permettant de consulter un catalogue de films et de séries, d'afficher leurs détails et de partager des avis avec les autres utilisateurs.

Cette deuxième version enrichit l'application avec un espace d'administration pour gérer les contenus et un système de commentaires connecté à une API REST créée avec MockAPI.

##  Objectifs

- Consulter un catalogue de films et de séries.
- Afficher les informations détaillées de chaque contenu.
- Ajouter, modifier et supprimer des films et des séries.
- Ajouter et consulter les commentaires des utilisateurs.
- Communiquer avec une API REST pour gérer les données.

##  Technologies utilisées

- HTML5
- Tailwind CSS
- JavaScript ES6+
- Fetch API
- MockAPI.io
- Async / Await
- Modules JavaScript (Import / Export)
- LocalStorage

##  Fonctionnalités

###  Catalogue utilisateur

- Affichage des films et des séries.
- Consultation des détails dans une fenêtre modale.
- Affichage des genres, réalisateurs, pays de production et synopsis.
- Consultation des commentaires associés à chaque contenu.
- Ajout de nouveaux commentaires.

###  Administration

- Affichage de la liste des films et des séries.
- Ajout d'un nouveau film ou d'une nouvelle série.
- Modification des informations d'un contenu.
- Suppression d'un contenu avec confirmation.
- Validation des formulaires.

###  Système de commentaires

- Ajout de commentaires.
- Affichage des commentaires dans la fenêtre modale correspondante.
- Association de chaque commentaire à un contenu grâce à son `contentId`.

##  API REST — MockAPI

L'application utilise MockAPI.io pour stocker et gérer les données.

Deux ressources principales sont utilisées :

- `/contents` : gestion des films et des séries.
- `/comments` : gestion des commentaires.

Les opérations HTTP utilisées :

| Méthode | Utilisation                          |
| ------- | ------------------------------------ |
| GET     | Récupérer les données                |
| POST    | Ajouter un contenu ou un commentaire |
| PUT     | Modifier un contenu                  |
| DELETE  | Supprimer un contenu                 |

**Configuration :**

Chaque utilisateur doit configurer son propre endpoint MockAPI dans le fichier `api.js`.

## 🚀 Installation et lancement

1. Cloner le dépôt :

```bash
git clone URL_DU_DEPOT
```

2. Ouvrir le dossier du projet :

```bash
cd CineTrack
```

3. Configurer son endpoint personnel MockAPI dans `api.js`.

4. Lancer le projet avec l'extension **Live Server** de Visual Studio Code.

##  Gestion des erreurs

L'application utilise `try/catch` pour gérer les erreurs liées aux requêtes API et `response.ok` pour vérifier le statut des réponses HTTP.

Des messages permettent d'informer l'utilisateur en cas de chargement, de réussite ou d'erreur.

##  Réalisation

- **Développeur :** Abdelkarim Ghandour
- **Projet :** CinéTrack V2
- **Type :** Travail individuel
- **Période :** 16/11/2026 – 20/11/2026

---
