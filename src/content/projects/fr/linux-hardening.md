---
title: "Administration Linux avancée — Evil Corp"
subtitle: "Durcissement, supervision, sauvegarde et PRA"
description: "Conception d'une infrastructure Linux critique avec contrôles d'accès, audit, monitoring et reprise."
year: 2025
category: "Infrastructure"
tags: ["Linux", "auditd", "SELinux", "Prometheus", "Borg"]
featured: false
number: "15"
metrics:
  - { value: "4", label: "axes opérationnels" }
  - { value: "2", label: "familles Linux" }
locale: "fr"
translationKey: "project.linux-hardening"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Rapport technique Evil Corp"
    type: "report"
    url: "/documents/linux-hardening/evil-corp-technical-report.pdf"
  - title: "Présentation du projet Evil Corp"
    type: "presentation"
    url: "/documents/linux-hardening/evil-corp-presentation.pdf"
  - title: "Support de démonstration Evil Corp"
    type: "deliverable"
    url: "/documents/linux-hardening/evil-corp-demo.pdf"
---

## Contexte et objectif

Le scénario Evil Corp porte sur une infrastructure Linux d'entreprise considérée comme critique. Il faut couvrir quatre axes complémentaires : durcissement du système, supervision, sauvegarde et plan de reprise d'activité, sur des environnements RHEL et Ubuntu Server.

## Architecture et méthode

La sécurité combine durcissement SSH, MFA, règles `sudoers`, pare-feu `ufw` ou `firewalld`, journalisation avec `auditd` et contrôle obligatoire par SELinux ou AppArmor. Prometheus et Node Exporter assurent la visibilité opérationnelle. La sauvegarde repose sur `rsync` et Borg, avec une copie externalisée, du chiffrement et une politique de rétention ; le PRA formalise la bascule et la restauration.

## Mise en œuvre

Les accès privilégiés sont réduits et tracés, les politiques de confinement et de pare-feu sont appliquées, puis les événements système utiles sont audités. Les métriques hôte sont exposées à Prometheus. Les procédures de sauvegarde et de reprise sont documentées avec des tests de restauration et de failover, afin de vérifier qu'elles ne restent pas seulement théoriques.

## Résultats et livrables

Le projet produit un rapport technique, une présentation et un support de démonstration. Ensemble, ils décrivent les contrôles d'accès, la détection d'anomalies, la supervision, la sauvegarde chiffrée avec rétention et les procédures de reprise testées.

## Enseignements

Le durcissement efficace associe prévention, traçabilité et capacité de récupération. Le projet souligne aussi qu'une sauvegarde n'est crédible qu'après restauration vérifiée et qu'un PRA doit préciser les opérations de bascule plutôt que rester un principe général.
