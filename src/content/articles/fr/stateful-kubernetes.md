---
title: "Exécuter des services à état sur Kubernetes"
subtitle: "Les choix Fleetman autour des StatefulSets, probes et volumes persistants."
description: "Fleetman montre pourquoi l'orchestration d'un service à état demande davantage qu'un simple Deployment."
year: 2025
category: "Article"
tags: ["Kubernetes", "StatefulSet", "Storage"]
featured: true
number: "A02"
metrics:
locale: "fr"
translationKey: "article.stateful-kubernetes"
school: "Franck Mevengue"
readingTime: "4 min"
---

## Donner une identité stable aux données
MongoDB utilise un StatefulSet et un volume persistant. L'identité du pod et le cycle de vie du stockage restent maîtrisables.

## Séparer configuration et secrets
ConfigMaps et Secrets évitent d'enfermer la configuration dans l'image. Les namespaces clarifient les responsabilités.

## Rendre la santé exploitable
Les probes de liveness et readiness distinguent un processus vivant d'un service réellement prêt à recevoir du trafic.
