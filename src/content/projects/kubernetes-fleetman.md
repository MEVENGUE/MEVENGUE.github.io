---
title: "Kubernetes Fleetman"
subtitle: "Real-time microservices on a self-hosted cluster"
description: "A production-minded Kubernetes deployment with stateful workloads, durable storage, health probes and separated responsibilities."
year: 2025
category: "Orchestration"
tags: ["Kubernetes", "Spring Boot", "MongoDB", "ActiveMQ", "Nginx"]
featured: true
number: "02"
metrics:
  - { value: "3", label: "Cluster nodes" }
  - { value: "2", label: "Worker nodes" }
  - { value: "100%", label: "Self-hosted" }
---
## The mission

Deploy a real-time microservices application on a self-hosted Kubernetes cluster built with `kubeadm`.

## Engineering decisions

The cluster separates responsibilities through namespaces and deploys stateful services with StatefulSets. MongoDB persists through StorageClasses and PVCs, ActiveMQ handles messaging, and Nginx controls ingress.

Configuration and secrets remain external to application images. Liveness and readiness probes make service health observable to the orchestrator, allowing the platform to recover deliberately rather than optimistically.
