# Task Manager (NestJS / React)

TaskManager est application de gestion de tâches par catégorie réalisée dans le cadre de mes travaux personnels sur la stack **NestJS / React**.
Elle propose une interface d'administration sécurisée pour les utilisateurs souhaitant persister leur données et un mode "invité" pour tester l'application.

L'interface d'administration frontend est hébergée chez **Vercel** : https://taskmanager.vercel.app
L'API de traitement backend est hébergé chez **Render** : https://taskmanager.onrender.com
La base de données est hébergée chez **Neon** : https://neon.com

Cette application utilise une API hébergée sur le plan gratuit de Render. Après 15 minutes sans activité, l'API est automatiquement mise en veille. Lors de la première utilisation suivant cette période, son redémarrage peut prendre environ une minute. L'application peut donc sembler ne pas répondre immédiatement lors de la première requête.

---

## 🛠️ Stack technique principale

- Frontend: **React 19.2.8**
- Bundler : **Vite 5.0.0**
- Backend: **NestJS 10.4.22**
- ORM: **Prisma 5.22.0**
- Base de données: **PostgreSQL**

---

## 🛠️ Règles métier

### Authentification

- le portail d'authentification doit proposer un mode d'utilisation "invité" sans compte
- le mode "invité" doit proposer une liste de "tâches" et de "catégories" prédéfinies
- cette liste peut être modifiée, mais sans aucune persistance de données
- la création d'un compte client permet de sauvegarder les données en base
- la connexion permet de récupérer ses données à partir de n'importe quel support

### Tâches et catégories

- Une tâche peut être associée à 0/1 catégorie
- Une catégorie peut être asscoiée à 0/N tâche(s)

### Utilisateurs

- Un utilisateur possède plusieurs tâches et plusieurs catégories
- Chaque tâche/catégorie ne peut appartenir qu'à un seul utilisateur
- Une tâche ne peut utiliser qu'une catégorie appartenant au même utilisateur

---

## Fonctionnalités disponibles

1. Portail d'authentification avec mode "invité"
2. Dashboard SPA avec header, sidebar et content/outlet.
3. Formulaire de **création et de modification de tâche** (title, description, categoryId optionnel via un select).
4. Possibilité de **marquer une tâche comme "terminée" / "à faire"** (optimistic toogle update with rollback on failure).
5. **UI de gestion des catégories** : liste, ajout, suppression.
6. **Filtre des tâches par catégorie** sur la liste principale.
7. UX soignée : gestion des erreurs explicite, états de chargement, confirmations de changement d'état.

## Fonctionnalités à venir

- Tests unitaires des services NestJS
- Mise en place d'un système de pagination
- Mise en place d'un système de recherche des tâches par titre
- Ajout d'une fenêtre de confirmation avant la suppression d'un élément afin de sécuriser les actions utilisateur
- Intégration d'une fonctionnalité de priorisation des tâches par drag & drop
- Mettre en évidence le démarrage à froid de Render
- Privilégier les confirmations de changmenet d'état par popup dans les listes
- Add documentation logs
- Rendre le layout responsive
- Ajouter un mode sombre
- Implémenter une architecture multi-tenant

---

## 🚀 Développement

### Cloner le repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### Installation

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run start
```

Le serveur backend écoute par défaut sur `http://localhost:3000`.

```bash
cd frontend
npm install
npm run dev
```

Le serveur frontend écoute par défaut sur `http://localhost:5173`.

---

### Variables d'environnement

#### Backend

Cette application nécessite une instance PostgreSQL disponible.
Créer un fichier .env à la racine du dossier backend et initialiser les variables d'environnement tel que :

```env
DATABASE_URL = "postgresql://USER_NAME:USERPASSWORD@localhost:5432/taskmanager"
FRONTEND_URL = "http://localhost:5173"
JWT_SECRET = "YOUR_JWT_SECRET"
```

#### Frontend

Côté Frontend, seule l'url de l'api backend doit être déclarée.
Créer un fichier .env à la racine du dossier frontend et initialiser cette variable ainsi :

```env
VITE_BACKEND_URL = "http://localhost:3000/api";
```

---
