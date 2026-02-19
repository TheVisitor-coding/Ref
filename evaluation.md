󰋜 Cours M2 DevSecOps-et-deploiement-des-solutions 10-evaluation
/ / / /
10 – Évaluation
🎓 Évaluation Finale - M2 DFS - Module
DevSecOps
Projet : Industrialisation de « MyDigitalStartup »
Durée : Projet de fin de module (environ 2-3 semaines ou selon planning)
Format : Individuel ou Binôme (à valider avec l’intervenant)
Livrables :
1. Dépôt Git (Public ou invité)
2. Lien vers l’application fonctionnelle (HTTPS)
3. Archive « Livrables » (détails plus bas)
📝 Contexte
Vous avez développé lors de votre année précédente (ou modules précédents) une application
nommée « MyDigitalStartup »
. Jusqu’à présent, le développement était focalisé sur les
fonctionnalités (MVP).
L’entreprise passe maintenant à une phase d’industrialisation. L’équipe technique s’agrandit et
les enjeux de sécurité et de stabilité deviennent critiques.
Votre mission, en tant qu’ingénieur DevSecOps, est de construire le pipeline d’intégration et de
déploiement continu (CI/CD) de cette application, en y intégrant les meilleures pratiques de
sécurité et d’observabilité.
🎯 Objectifs de la mission
1. Automatiser le cycle de vie de l’application (Build, Test, Release).
2. Sécuriser la chaîne d’approvisionnement logicielle (Supply Chain Security).
3. Déployer l’application de manière fiable et reproductible.
4. Surveiller l’état de santé de l’application en production.
🛠 Pré-requis & Stack Technique
▸
▸
▸
▸
▸
▸
Application Cible : Votre projet « MyDigitalStartup » existant.
▸
S i v o u s n’ a v e z p a s d e p ro j e t f o n c t i o n n e l , vous pouvez utiliser un projet Open Source simple
(ex: une API Node.js/Express, une application Python/Flask, ou une stack JS complet) comme
base. L’important n’est pas le code métier, mais le pipeline autour.
SCM : GitHub ou GitLab.
CI/CD : GitHub Actions ou GitLab CI.
Conteneurisation : Docker (Pré-installé sur votre VPS).
Infrastructure : VPS Infomaniak mis à votre disposition.
Reverse Proxy : Nginx Proxy Manager (déjà présent sur le VPS) pour la gestion des domaines
et certificats SSH.
🚀 Missions Détaillées
Mission 1 : Gestion de Configuration & Qualité du Code (CI)
Le code doit être propre et testé avant toute chose.
▸
▸
▸
Mettre en place une stratégie de branche (GitFlow ou GitHub Flow).
Protéger la branche main / master (Pull Request obligatoire).
Pipeline CI :
▸
Installation des dépendances.
▸
▸
Linting du code.
Tests unitaires (avec rapport de couverture si possible).
Mission 2 : Containerisation & Sécurité (Sec)
Le « Build » doit produire un artefact sécurisé.
▸
▸
▸
Créer un Dockerfile optimisé (Multi-stage build recommandé).
Security Scans (intégrés dans la CI) :
▸
SAST : Scan statique du code (ex: SonarCloud, SonarQube, CodeQL).
▸
SCA : Scan des dépendances (ex: npm audit, OWASP Dependency Check, Snyk).
▸
Secret Detection : Vérifier qu’aucun secret n’est commité (ex: Gitleaks, GitGuardian).
▸
Container Scan : Scan de l’image Docker construite (ex: Trivy, Docker Scout).
B o n u s : Signer l’image Docker (Cosign) ou générer une SBOM (Syft).
Mission 3 : Déploiement Continu (CD)
L’application doit être déployée automatiquement sur un environnement (Staging ou Prod).
▸
▸
▸
Déploiement automatique via le pipeline (SSH vers le VPS Infomaniak).
Utilisation de docker-compose pour lancer le service.
Configuration HTTPS : Utiliser Nginx Proxy Manager (interface web) pour exposer votre service
avec un nom de domaine et un certificat SSL valide.
Mission 4 : Observabilité & Monitoring (Ops)
Une fois en prod, on ne doit pas être aveugle.
▸
▸
Mettre en place une stack de monitoring :
▸
Logs : Centralisation ou accès simple (ex: Loki, ELK, ou simplement un mapping de volume
bien géré).
▸
Métriques : Prometheus + Grafana (ou solution Cloud type Grafana Cloud version free).
Créer un Dashboard simple affichant :
▸
Disponibilité du service (Uptime).
▸
Utilisation ressources (CPU/RAM).
▸
(Bonus) Métriques applicatives (nombre de requêtes, temps de réponse).
Mission 5 : Documentation & Onboarding
▸
▸
▸
Documentation technique : Comment un nouveau développeur lance le projet en local ?
Architecture : Expliquer les choix (Pourquoi cet outil de CI ? Pourquoi ce scanner ?).
Procédure « Rollback » : Paragraphe expliquant la commande ou l’action à faire si la mise en
prod échoue.
📦 Livrables Concrets (Ce qui est attendu)
⚠ Rendu : Les éléments suivants doivent être déposés sur le devoir Teams correspondant.
Le lien vers votre dépôt Git est obligatoire. Celui-ci DOIT contenir :
1.
📁 À la racine :
▸
README.md : Documentation complète (voir Mission 5).
▸
Dockerfile : Le descripteur de conteneur de votre application.
▸
docker-compose.yml : La configuration utilisée pour le déploiement sur le VPS.
▸
.gitlab-ci.yml OU .github/workflows/ : La définition de votre pipeline.
2. 📁 Dossier /docs (ou documentation équivalente dans le README) :
▸
ARCHITECTURE.md l’infrastructure.
(ou section dans README) : Schéma du pipeline CI/CD et de
▸
/evidence : Dossier contenant les preuves de validation :
▸
📸 ci-pipeline-success.png : Capture du pipeline complet passé au vert.
▸
📸 security-scan-report.png : Capture d’un rapport de scan (SAST ou Container).
▸
📸 app-https.png : Capture de l’application accessible en HTTPS.
▸
📸 monitoring-dashboard.png : Capture de votre dashboard Grafana/autre en
action.
3. 📄 Explication de la démarche DevSecOps (PDF ou Markdown) :
▸
Un document (ou une section détaillée dans le README/Wiki) expliquant votre logique mise
en place.
▸
Pourquoi ces outils ? Comment avez-vous sécurisé le pipeline ? Quels problèmes avez-vous
rencontrés et résolus ?
▸
Montrez que vous avez compris la philosophie DevSecOps au-delà de la simple
configuration d’outils.
📊 Grille d’Évaluation (sur 20 points)
Catégorie Critère Points
Pipeline CI Pipeline fonctionnel (Build, Test, Lint) déclenché auto. 3
Qualité Docker Dockerfile optimisé (multi-stage), image légère. 2
Sécurité
(DevSec) Sécurité Image
Scan de code (SAST) + Scan de dépendances + Secrets. 3
Scan de vulnérabilités conteneur (Trivy/Scout) bloquant ou
informatif.
2
CD / Déploiement Déploiement automatisé fonctionnel sur serveur distant. 4
Observabilité Dashboard accessible, remontée de métriques/logs basique. 3
Documentation README clair, schéma d’architecture, procédure de rollback. 2
Soft Skills / Bonus Qualité de la démo, pertinence des choix, IA, config avancée. 1
⚠ Conditions de validation
▸
Le dépôt Git doit être accessible au correcteur.
▸
▸
La démonstration doit montrer le pipeline s’exécuter et le résultat en ligne.
Tout plagiat ou copie de projet existant sans adaptation majeure sera sanctionné.
Bon courage ! 🚀
Online School by Sergent.dev | Propulsé par Wiki.js