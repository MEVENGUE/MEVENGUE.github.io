---
title: "Running stateful services on Kubernetes"
subtitle: "Fleetman's choices around StatefulSets, probes and persistent volumes."
description: "Fleetman shows why orchestrating a stateful service requires more than a simple Deployment."
year: 2025
category: "Article"
tags: ["Kubernetes", "StatefulSet", "Storage"]
featured: true
number: "A02"
metrics:
locale: "en"
translationKey: "article.stateful-kubernetes"
school: "Franck Mevengue"
readingTime: "4 min"
---

## Give data a stable identity
MongoDB uses a StatefulSet and persistent volume. Pod identity and storage lifecycle remain manageable.

## Separate configuration and secrets
ConfigMaps and Secrets keep configuration out of the image. Namespaces clarify responsibilities.

## Make health operational
Liveness and readiness probes distinguish a running process from a service that is actually ready for traffic.
