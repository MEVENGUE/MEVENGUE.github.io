---
title: "MedSearchLab Windows Server"
subtitle: "Services d'annuaire sécurisés pour un laboratoire"
description: "Environnement Windows Server documenté autour d'AD DS, DNS, DHCP, GPO, supervision et durcissement."
year: 2025
category: "Infrastructure"
tags: ["Windows Server", "AD DS", "DNS", "DHCP", "GPO"]
featured: true
number: "16"
metrics:
  - { value: "4", label: "services d'infrastructure" }
  - { value: "3", label: "axes de sécurité" }
locale: "fr"
translationKey: "project.medsearchlab"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/medsearchlab-cover.jpg"
gallery: ["/assets/medsearchlab-architecture.png"]
documents:
  - title: "Rapport technique de l’infrastructure MedSearchLab"
    type: "report"
    url: "/documents/medsearchlab/medsearchlab-technical-report.pdf"
  - title: "Présentation de l’infrastructure Microsoft"
    type: "presentation"
    url: "/documents/medsearchlab/medsearchlab-presentation.pdf"
  - title: "Évaluation du projet MedSearchLab"
    type: "deliverable"
    url: "/documents/medsearchlab/medsearchlab-assessment.pdf"
---

## Problem — Problème
MedSearchLab a besoin d'un socle Windows Server administrable, supervisé et sécurisé pour porter ses services d'infrastructure.

## Idea — Idée
Centraliser identités et politiques tout en séparant les responsabilités d'annuaire, de résolution de noms, d'adressage et de supervision.

## Architecture
AD DS structure les identités. DNS et DHCP assurent découverte et adressage. Les GPO distribuent les paramètres de sécurité, et PerfMon ainsi que les alertes rendent l'état de la plateforme observable.

## Implementation — Implémentation
Le livrable documente l'installation des rôles, la création des objets d'annuaire, l'application de stratégies, les droits d'accès et les procédures d'exploitation.

## Security — Sécurité
Le durcissement repose sur les GPO, les modèles de sécurité, l'audit et une attribution contrôlée des permissions. La supervision complète ces mesures par la remontée d'alertes.

## Infrastructure
Les diagrammes Hyper-V et VMware décrivent les variantes de virtualisation et les flux entre les services Windows.

## Challenges — Défis
L'enjeu consiste à maintenir la cohérence entre DNS, DHCP, domaine, politiques et droits : une erreur sur un rôle peut affecter l'ensemble du laboratoire.

## Results — Résultats
L'assessment fournit un environnement intégré, des preuves visuelles d'architecture et une documentation d'exploitation couvrant services et sécurité.

## Lessons — Enseignements
Dans un domaine Windows, identité, réseau et politiques forment un seul système. Leur supervision doit être conçue dès le départ.
