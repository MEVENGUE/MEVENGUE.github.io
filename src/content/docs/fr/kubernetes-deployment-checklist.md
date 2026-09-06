---
title: "Checklist de déploiement Fleetman"
subtitle: "Points vérifiables du cluster Kubernetes auto-hébergé."
description: "Points vérifiables du cluster Kubernetes auto-hébergé."
year: 2025
category: "Documentation"
tags: ["Kubernetes", "Fleetman", "Checklist"]
featured: false
number: "D03"
metrics:
locale: "fr"
translationKey: "doc.kubernetes-deployment-checklist"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Cluster
- Valider le master et les deux workers.
- Contrôler containerd ou Docker et la connectivité inter-nœuds.

## Charges de travail
- Vérifier namespaces, StatefulSet MongoDB, ActiveMQ et ingress Nginx.
- Contrôler ConfigMaps, Secrets, StorageClass et PVC.

## Santé
Observer séparément readiness, liveness et disponibilité du volume persistant.
