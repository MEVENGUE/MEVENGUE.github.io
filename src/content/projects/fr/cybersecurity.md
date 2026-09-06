---
title: "Analyse des vulnérabilités en cybersécurité"
subtitle: "De la donnée CISA 2022 aux contrôles réseau"
description: "Analyse de vulnérabilités, phishing, réseau et cryptographie réunie dans une même étude appliquée."
year: 2025
category: "Cybersécurité"
tags: ["Python", "Qlik", "Machine Learning", "Nmap", "Scapy"]
featured: true
number: "01"
metrics:
  - { value: "4", label: "volets techniques" }
  - { value: "2022", label: "catalogue CISA" }
locale: "fr"
translationKey: "project.cybersecurity"
school: "ECAM EPMI"
readingTime: "8 min"
cover: "/assets/cybersecurity-cover.png"
gallery: ["/assets/cybersecurity-cover.png"]
documents:
  - title: "Rapport d’analyse des risques de vulnérabilités"
    type: "report"
    url: "/documents/cybersecurity/vulnerability-risk-analysis.pdf"
  - title: "Vue d’ensemble du projet cybersécurité"
    type: "guide"
    url: "/documents/cybersecurity/project-overview.md"
---

## Problem — Problème
Le catalogue CISA 2022 rassemble des vulnérabilités activement exploitées, mais les données seules ne suffisent pas à guider une analyse. Le projet devait relier tendances, exposition réseau, phishing et protection des données.

## Idea — Idée
Construire une étude à plusieurs niveaux : visualiser les vulnérabilités, classifier des courriels de phishing, automatiser la reconnaissance réseau et expérimenter des fonctions cryptographiques.

## Architecture
Python porte les scripts d'analyse. Qlik restitue les tendances. Nmap découvre hôtes, ports, versions et systèmes, tandis que Scapy permet l'observation des paquets. Un notebook traite la classification des courriels.

## Implementation — Implémentation
Les travaux sont répartis entre le notebook `Phishing_Email_classification.ipynb`, les scripts Nmap, les exercices Scapy, les fonctions de chiffrement et les tableaux de bord Qlik.

## Security — Sécurité
L'approche combine détection, analyse et protection : observation de la surface réseau, reconnaissance de messages suspects et gestion sécurisée de mots de passe chiffrés.

## Infrastructure
L'environnement est reproductible à partir des scripts Python et des dossiers thématiques du dépôt. Les résultats analytiques sont consolidés dans le rapport et les visuels Qlik.

## Challenges — Défis
Le principal défi est de rendre cohérents des signaux hétérogènes : catalogue de vulnérabilités, métadonnées d'e-mails, résultats de scans et paquets réseau.

## Results — Résultats
Le projet livre quatre volets complémentaires, un rapport d'analyse des risques et des visualisations permettant d'interpréter les vulnérabilités CISA 2022.

## Lessons — Enseignements
Une analyse de sécurité utile associe données, visibilité réseau et contrôles pratiques. La qualité de la restitution est aussi importante que l'outil de détection.
