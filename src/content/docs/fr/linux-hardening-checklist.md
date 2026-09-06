---
title: "Checklist de durcissement Linux"
subtitle: "Contrôles issus du projet Evil Corp."
description: "Contrôles issus du projet Evil Corp."
year: 2025
category: "Documentation"
tags: ["Linux", "Hardening", "Backup"]
featured: false
number: "D04"
metrics:
locale: "fr"
translationKey: "doc.linux-hardening-checklist"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Accès
Durcir SSH, appliquer MFA lorsque disponible, limiter sudoers et réviser les comptes.

## Système
Activer auditd, SELinux ou AppArmor et les règles ufw ou firewalld adaptées.

## Exploitation
Superviser avec Prometheus et Node Exporter, chiffrer les sauvegardes rsync ou Borg et tester la procédure de reprise.
