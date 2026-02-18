# Ref

Application web de facilitation des activités de coaching sportifs avec un backend Strapi 5 et un frontend Next.js 14.

## Stack & Architecture

| Composant | Technologie | Version |
|-----------|-------------|---------|
| Frontend | Next.js (React) | 14 |
| Backend | Strapi (Headless CMS) | 5 |
| Base de données | PostgreSQL | 17-Alpine |
| Conteneurisation | Docker & Docker Compose | Multi-stage |
| CI/CD | GitHub Actions | - |
| SAST | SonarQube | - |
| Container Scan | Trivy | - |
| Secret Detection | Gitleaks | - |
| Monitoring | Prometheus + Grafana | - |
| Reverse Proxy | Nginx Proxy Manager | - |

**Architecture détaillée** : [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)

---

## Getting started

### Pré-requis
- **Docker** & **Docker Compose** installés
- **Git**
- **Node.js** (pour le développement hors Docker)

### 1. Cloner et configurer

```bash
# Cloner le dépôt
git clone https://github.com/TheVisitor-coding/Ref.git
cd Ref

# Copier le template d'environnement
cp .env.template .env

# Générer les secrets Strapi
node scripts/generate-secrets.js

# Copier les secrets générés dans le fichier .env
```

### 2. Démarrer l'application

```bash
# Mode développement
docker-compose up -d

# Avec monitoring (Prometheus + Grafana)
docker-compose --profile monitoring up -d
```

### 3. Accéder aux services

| Service | URL | Identifiants |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | - |
| Strapi Admin | http://localhost:1337/admin | Créer au 1er lancement |
| API | http://localhost:1337/api | - |
| Grafana | http://localhost:3001 | admin / admin |
| Prometheus | http://localhost:9090 | - |
| Mailpit | http://localhost:8025 | - |

### 4. Commandes utiles

```bash
# Voir les logs
docker-compose logs -f

# Reconstruire un service
docker-compose build frontend
docker-compose build backend

# Accéder à la base de données
docker-compose exec postgres psql -U strapi -d strapidb

# Arrêter tout
docker-compose down

# Reset complet (supprime les volumes)
docker-compose down -v && docker-compose up -d
```

---

## Pipeline CI/CD

### Pipeline Overview

Le pipeline CI/CD s'exécute automatiquement sur chaque **pull request** vers la branche `main` :

| Étape | Outil | Description |
|-------|-------|-------------|
| **Qualité** | SonarQube | Analyse statique du code (bugs, vulnérabilités, régression) |
| **Lint** | ESLint / Next.js | Vérification des conventions de code |
| **Tests** | Jest | Tests unitaires avec rapport de couverture |
| **SCA** | npm audit | Scan des dépendances pour vulnérabilités connues |
| **Secrets** | Gitleaks | Détection de secrets commités (API keys, tokens) |
| **Build** | Docker | Build multi-stage des images (backend + frontend) |
| **Container Scan** | Trivy | Scan de vulnérabilités dans les images Docker |
| **Deploy** | SSH | Déploiement automatique sur le VPS (uniquement sur push main) |

### Stratégie de branches

On utilise **GitHub Flow** :
- `main` : branche de production, protégée (PR obligatoire)
- `feat/*`, `fix/*`, `docs/*` : branches de travail
- Merge via Pull Request avec review obligatoire

### Démarche DevSecOps

Notre approche intègre une couche de sécurité et qualité à chaque étape du cycle :

1. **Code** (Dev) : SonarQube détecte les vulnérabilités dès l'écriture du code
2. **Dépendances** (Sec) : npm audit vérifie que les packages n'ont pas de CVE connues
3. **Secrets** (Sec) : Gitleaks empêche la fuite de credentials dans le repo
4. **Conteneur** (Sec) : Trivy scanne l'image finale pour les vulnérabilités OS et applicatives
5. **Déploiement** (Ops) : Déploiement automatisé, reproductible, sans intervention manuelle
6. **Monitoring** (Ops) : Prometheus + Grafana surveillent la production en continu

L'objectif est de **détecter les problèmes le plus tôt possible** dans le cycle de développement et de garantir que le code déployé est de qualité et sécurisé.

---

## Production & Déploiement

### Déploiement automatique

Le déploiement se fait automatiquement lors d'un merge sur `main` :

1. Les images Docker sont construites et poussées sur **GitHub Container Registry (GHCR)**
2. Le VPS pull les nouvelles images via SSH
3. Les services sont redémarrés avec `docker compose up -d`

### Configuration HTTPS

Le HTTPS est géré par **Nginx Proxy Manager** agissant comme Reverse Proxy devant les containers frontend et backend. Pour configurer le SSL :

1. Accéder à l'interface NPM sur le VPS
2. Créer un Proxy Host pointant vers le container frontend (:3000) ou backend (:1337)
3. Activer le SSL avec Let's Encrypt (certificat automatique)

### Déploiement manuel (si nécessaire)

```bash
# Sur le VPS
cd ~/apps/ref
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --remove-orphans
```

---

## Procédure de Rollback

En cas de problème après un déploiement, voici la procédure de rollback :

### Rollback rapide (image précédente)

```bash
# 1. Se connecter au VPS
ssh user@your-vps-ip

# 2. Aller dans le répertoire du projet
cd ~/apps/ref

# 3. Identifier le SHA du commit précédent (fonctionnel)
git log --oneline -5

# 4. Revenir au commit précédent
git checkout <sha-du-commit-precedent>

# 5. Relancer les services avec les anciennes images
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d --remove-orphans

# 6. Vérifier que les services sont OK
docker compose -f docker-compose.prod.yml ps
```

### Rollback via image Docker taguée

Selon les bests practices de gestion des images Docker, chaque image est taguée avec l'empreinte SHA. Si l'image `latest` pose problème :

```bash
# Utiliser une image spécifique par son SHA
docker compose -f docker-compose.prod.yml pull
DOCKER_IMAGE_TAG=<sha-commit-stable> docker compose -f docker-compose.prod.yml up -d
```

### Rollback de la base de données

Un service containeurisé de backup de la base de données PostgreSQL est configuré pour créer des dumps réguliers. En cas de besoin, vous pouvez restaurer un backup :

```bash
# Lister les backups disponibles
ls -la docker/backup/

# Restaurer un backup
docker compose exec postgres psql -U strapi -d strapidb < docker/backup/backup_YYYYMMDD_HHMMSS.sql
```

> ⚠️ **Important** : Toujours vérifier l'état des services après un rollback avec `docker compose ps` et tester l'application dans le navigateur.

---

## 📊 Monitoring

### Stack de monitoring

- **Prometheus** : Collecte des métriques (CPU, RAM, uptime, requêtes HTTP)
- **Grafana** : Dashboard de visualisation (Self-hosted)
- **Blackbox Exporter** : Vérification de la disponibilité des endpoints
- **cAdvisor** : Surveillance des ressources des containers

### Métriques surveillées

| Métrique | Source | Description |
|----------|--------|-------------|
| CPU Usage | cAdvisor | Utilisation CPU des containers |
| Memory Usage | cAdvisor | Utilisation RAM des containers |
| HTTP Requests | Strapi Middleware | Nombre de requêtes, latence, erreurs |
| Endpoint Availability | Blackbox Exporter | Vérification de la disponibilité des endpoints (HTTP 200) |
| Uptime | Prometheus Node Exporter | Temps de fonctionnement des services |

📖 **Guide complet** : [MONITORING_GUIDE.md](docs/MONITORING_GUIDE.md)

---

## Structure du projet

```
Ref/
├── .github/workflows/
│   └── main.yml                # Pipeline CI/CD
├── apps/
│   ├── api/                    # Strapi 5 (Backend)
│   └── web/                    # Next.js 14 (Frontend)
├── docker/
│   ├── backend/                # Dockerfiles backend
│   ├── frontend/               # Dockerfiles frontend
│   ├── monitoring/             # Prometheus & Grafana config
│   └── nginx/                  # Config reverse proxy
├── docs/
│   ├── ARCHITECTURE.md         # Architecture détaillée
│   └── evidence/               # Captures de validation
├── docker-compose.yml          # Dev local
├── docker-compose.prod.yml     # Production
├── MONITORING_GUIDE.md         # Guide monitoring
└── README.md                   # Ce fichier
```

---

## 🔧 Troubleshooting

### Erreurs courantes

```bash
# Erreur APP_KEYS Strapi
node scripts/generate-secrets.js
# Copier les secrets dans .env

# Erreur de permissions
sudo chown -R $USER:$USER ./apps/

# Conflits de ports
# Modifier dans .env : NEXTJS_PORT_EXTERNAL=3001

# Rebuild après changement de config
docker-compose build && docker-compose up -d
```

---

**En cas de problème, n'hésitez pas à consulter les logs avec `docker-compose logs -f` et à vérifier la documentation dans le dossier `docs/` pour des guides détaillés.**