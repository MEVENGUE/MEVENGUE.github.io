---
title: "Supfile multi-datacenter"
subtitle: "Cloud privé résilient entre trois villes"
description: "Application de stockage sécurisée sur 17 VM, avec réplication, observabilité et reprise multi-site."
year: 2025
category: "Infrastructure cloud"
tags: ["Vagrant", "Galera", "GlusterFS", "HAProxy", "Prometheus"]
featured: true
number: "21"
metrics:
  - { value: "17", label: "machines virtuelles" }
  - { value: "3", label: "datacenters" }
  - { value: "37", label: "preuves de test" }
locale: "fr"
translationKey: "project.supfile"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/supfile-app.png"
gallery: ["/assets/supfile-architecture.png", "/assets/supfile-grafana.jpeg", "/assets/supfile-security.jpg"]
github: "https://github.com/MEVENGUE/SUPFile-VB-App"
documents:
  - title: "Rapport d’infrastructure multi-datacenter"
    type: "report"
    url: "/documents/supfile/supfile-infrastructure-report.pdf"
  - title: "Rapport technique de l’application web"
    type: "report"
    url: "/documents/supfile/supfile-frontend-report.pdf"
  - title: "Présentation du POC Supfile"
    type: "presentation"
    url: "/documents/supfile/supfile-poc-presentation.pdf"
  - title: "Guide de déploiement Supfile"
    type: "guide"
    url: "/documents/supfile/deployment-guide.md"
---

## Problem — Problème
Supfile doit proposer un stockage de fichiers sécurisé malgré la perte d'un serveur ou d'un site, sur du matériel de POC contraint.

## Idea — Idée
Répartir l'application entre Paris, New York et Toronto, dupliquer chaque couche critique et conserver des preuves pour chaque scénario de défaillance.

## Architecture
Paris et New York servent l'application FastAPI derrière Nginx, HAProxy et Keepalived. Galera réplique la base sur trois nœuds ; six briques GlusterFS répliquent les fichiers. Toronto héberge monitoring, sauvegarde, DNS et site froid.

## Implementation — Implémentation
Vagrant provisionne 17 VM et des scripts spécialisés installent load balancers, web, stockage, base, ProxySQL et observabilité. Tailscale relie les sites.

## Security — Sécurité
Fail2ban, Suricata, filtrage réseau, séparation des rôles et exposition via les load balancers composent la défense périmétrique. Le POC documente la contrainte mémoire ayant imposé l'arrêt de Suricata sur un nœud web.

## Infrastructure
Le trafic est distribué par HAProxy et une VIP Keepalived. ProxySQL sépare lectures et écritures, Prometheus collecte les cibles et Grafana les expose sur 19 panels.

## Challenges — Défis
La cohérence des données et des fichiers doit survivre aux coupures inter-sites. Les ressources locales limitées imposent aussi d'arbitrer entre couverture fonctionnelle et consommation mémoire.

## Results — Résultats
Le POC couvre 3 datacenters, 17 VM, un cluster Galera à 3 nœuds, 6 briques GlusterFS et 37 preuves de connectivité, réplication, failover, monitoring et sécurité.

## Lessons — Enseignements
La résilience n'est crédible que si elle est observable et testée. Des preuves conservées transforment une démonstration en argument d'ingénierie.
