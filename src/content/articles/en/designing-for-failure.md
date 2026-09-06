---
title: "Designing for failure across three sites"
subtitle: "What Supfile's 37 evidence files reveal about observable resilience."
description: "A resilient architecture is validated by its behavior during failure, not by its diagram."
year: 2025
category: "Article"
tags: ["Reliability", "Multi-DC", "Prometheus"]
featured: true
number: "A01"
metrics:
locale: "en"
translationKey: "article.designing-for-failure"
school: "Franck Mevengue"
readingTime: "4 min"
---

## Start with failure domains
Paris, New York and Toronto each have a role, dependencies and a recovery path. This separation makes node-loss and site-loss scenarios explicit.

## Observe before disruption
Prometheus targets and 19 Grafana panels establish a baseline. Galera, GlusterFS and the application must be observed together.

## Preserve evidence
Thirty-seven test files document connectivity, replication, storage and failovers. The archive makes results reviewable and verifiable.
