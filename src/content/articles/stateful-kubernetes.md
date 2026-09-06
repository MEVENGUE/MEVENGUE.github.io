---
title: "State has gravity"
description: "Notes on deploying MongoDB and messaging workloads to a self-hosted Kubernetes cluster."
published: 2025-05-02
tags: ["Kubernetes", "Storage", "Operations"]
---
Stateless demos make orchestration look effortless. Real systems become interesting when data must survive rescheduling.

## Declare what must persist

StatefulSets give workloads stable identities, but persistence depends on the complete chain: StorageClass, PersistentVolume and claim. Each layer needs an owner and an observable failure mode.

## Health is contextual

Liveness and readiness answer different questions. A process can be alive while unable to serve traffic. Separating those signals keeps recovery mechanisms from making an unhealthy situation worse.
