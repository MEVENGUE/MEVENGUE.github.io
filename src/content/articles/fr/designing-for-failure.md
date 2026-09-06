---
title: "Concevoir pour la panne sur trois sites"
subtitle: "Ce que les 37 preuves Supfile montrent sur la résilience observable."
description: "Une architecture résiliente n'est pas validée par son diagramme mais par son comportement lors d'une panne."
year: 2025
category: "Article"
tags: ["Reliability", "Multi-DC", "Prometheus"]
featured: true
number: "A01"
metrics:
locale: "fr"
translationKey: "article.designing-for-failure"
school: "Franck Mevengue"
readingTime: "4 min"
---

## Partir des domaines de panne
Paris, New York et Toronto ont chacun un rôle, des dépendances et une voie de reprise. Cette séparation rend les scénarios de perte de nœud ou de site explicites.

## Observer avant de provoquer
Les cibles Prometheus et les 19 panels Grafana fournissent un état de référence. Galera, GlusterFS et l'application doivent être observés ensemble.

## Conserver les preuves
Les 37 fichiers de test documentent connectivité, réplication, stockage et bascules. L'archive rend le résultat relisible et vérifiable.
