# Preuves et captures d'écran

Ce dossier contient les captures d'écran suivantes pour la validation de l'évaluation DevSecOps :

| Fichier | Description |
|---------|-------------|
| app-https.png | Capture de l'application accessible en HTTPS |
| workflow-pull-request.png | Capture du workflow GitHub Actions pour l'analyse de Pull Request |
| workflow-build-deploy.png | Capture du workflow GitHub Actions pour le Build & Deploy |
| artefacts.png | Capture des artéfacts générés par le pipeline CI/CD |
| monitoring-dashboard.png | Capture du dashboard de monitoring (Grafana) |
| prometheus-scraping.png | Capture de Prometheus montrant les services scrapés |


## Application Accessible en HTTPS

![app-https.png](./app-https.png)

## Sécurité de la branche main

Protection de la branche `main` avec les règles suivantes :
- Requiert au moins 1 approbation de code review
- Requiert le passage réussi du pipeline CI/CD avant tout merge
- Branche en readonly interdisant les pushs sur `main` sans PR

![branch-security.png](./branch-security.png)

## Validation du Pipeline CI/CD
- **Pull Request Analysis** :
![workflow-pull-request](./workflow-pull-request.png)

- **Build & Deploy** :
![workflow-build-deploy](./workflow-build-deploy.png)

## Artéfacts CI/CD
![artefacts.png](./artefacts.png)

## Monitoring Dashboard

- **Grafana Dashboard Self-Hosted** :

![monitoring-dashboard.png](./monitoring-dashboard.png)

- **Prometheus** :

![prometheus-scraping.png](./prometheus-scraping.png)