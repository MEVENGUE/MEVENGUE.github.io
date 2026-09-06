---
title: "Designing for failure across three cities"
description: "What a 17-machine private cloud taught me about making resilience observable and testable."
published: 2025-07-18
tags: ["Reliability", "Multi-DC", "Cloud"]
---
Resilience is not a diagram. It is a behavior a system can demonstrate when a dependency disappears.

## Start with failure domains

Paris, New York and Toronto were not three decorative labels. Each site had a clear role, explicit dependencies and a recovery path. Separating load balancing, web, data, storage and monitoring made individual failures easier to reason about.

## Instrument before testing

Prometheus targets and Grafana panels provided the shared language for each exercise. A failover result became useful only when application health, database state and storage availability could be observed together.

## Keep the evidence

Thirty-seven proof files document what was tested and what happened. That archive turns an infrastructure demonstration into an engineering argument another person can inspect.
