---
title: "Fleetman deployment checklist"
subtitle: "Verifiable points for the self-hosted Kubernetes cluster."
description: "Verifiable points for the self-hosted Kubernetes cluster."
year: 2025
category: "Documentation"
tags: ["Kubernetes", "Fleetman", "Checklist"]
featured: false
number: "D03"
metrics:
locale: "en"
translationKey: "doc.kubernetes-deployment-checklist"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Cluster
- Validate the master and two workers.
- Check containerd or Docker and inter-node connectivity.

## Workloads
- Verify namespaces, the MongoDB StatefulSet, ActiveMQ and Nginx ingress.
- Check ConfigMaps, Secrets, StorageClass and PVCs.

## Health
Observe readiness, liveness and persistent-volume availability separately.
