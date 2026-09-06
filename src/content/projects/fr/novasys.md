---
title: "NovaSys Infra"
subtitle: "Virtualisation, segmentation et continuité"
description: "Infrastructure virtualisée conçue autour de la haute disponibilité, des VLAN, des sauvegardes et du PRA."
year: 2025
category: "Virtualisation"
tags: ["VMware", "Hyper-V", "VirtualBox", "VLAN", "PRA"]
featured: true
number: "20"
metrics:
  - { value: "3", label: "hyperviseurs étudiés" }
  - { value: "4", label: "axes d'exploitation" }
locale: "fr"
translationKey: "project.novasys"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/novasys-cover.jpg"
gallery: ["/assets/novasys-architecture.png", "/assets/novasys-ha-rpo.png"]
documents:
  - title: "Rapport d’infrastructure NovaSys"
    type: "report"
    url: "/documents/novasys/novasys-infrastructure-report.pdf"
  - title: "Présentation du projet NovaSys"
    type: "presentation"
    url: "/documents/novasys/novasys-presentation.pdf"
  - title: "Dossier de conception de la virtualisation"
    type: "deliverable"
    url: "/documents/novasys/novasys-virtualization-brief.pdf"
  - title: "Étude de résilience NovaSys"
    type: "report"
    url: "/documents/novasys/novasys-resilience-overview.pdf"
---

## Problem — Problème
NovaSys doit héberger ses charges de travail sur une infrastructure virtualisée disponible, segmentée et récupérable après incident.

## Idea — Idée
Associer un socle d'hyperviseurs à une architecture VLAN, une politique de snapshots, des sauvegardes restaurables et un plan de reprise explicite.

## Architecture
L'étude compare VMware, Hyper-V et VirtualBox. Les réseaux sont segmentés par VLAN, NAT et règles de pare-feu virtuel ; les datastores portent les VM et leurs données.

## Implementation — Implémentation
Le projet définit plan d'adressage, templates de VM, politique de snapshots, organisation des datastores et procédures de sauvegarde et de restauration.

## Security — Sécurité
La segmentation limite les flux entre zones. Le RBAC et le principe du moindre privilège encadrent les opérations d'administration.

## Infrastructure
Les diagrammes décrivent architecture globale, réseau, RBAC et continuité. Le rapport et la présentation relient ces vues aux choix d'exploitation.

## Challenges — Défis
Snapshots et sauvegardes répondent à des besoins différents. Il faut éviter de confondre retour arrière rapide et copie indépendante utilisable pour un PRA.

## Results — Résultats
NovaSys dispose d'un modèle documenté de virtualisation, d'une segmentation réseau et d'un scénario de continuité avec tests de restauration.

## Lessons — Enseignements
La haute disponibilité ne remplace ni la sauvegarde ni le PRA. La reprise doit être mesurée et répétée, pas seulement dessinée.
