---
title: "Runbook d'exploitation Supfile"
subtitle: "Séquence de contrôle des 17 VM et des trois sites."
description: "Séquence de contrôle des 17 VM et des trois sites."
year: 2025
category: "Documentation"
tags: ["Supfile", "Operations", "Failover"]
featured: false
number: "D01"
metrics:
locale: "fr"
translationKey: "doc.supfile-runbook"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Contrôles initiaux
1. Vérifier la connectivité Tailscale de chaque VM.
2. Contrôler les health checks HTTP de Paris et New York.
3. Vérifier l'état `wsrep` des trois nœuds Galera.
4. Confirmer les six briques GlusterFS en ligne.

## Test de bascule
Établir l'état Prometheus, arrêter un nœud web, observer la reprise locale, puis tester la perte d'un site. Conserver chaque résultat dans les preuves.
