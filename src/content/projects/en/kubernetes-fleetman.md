---
title: "Kubernetes — Fleetman"
subtitle: "Real-time microservices on a self-hosted cluster"
description: "Fleetman deployment with stateful services, messaging, ingress, probes and persistent storage."
year: 2025
category: "Cloud Native"
tags: ["Kubernetes", "Spring Boot", "MongoDB", "ActiveMQ", "Nginx"]
featured: true
number: "14"
metrics:
  - { value: "3", label: "nœuds" }
  - { value: "2", label: "workers" }
locale: "en"
translationKey: "project.kubernetes-fleetman"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Fleetman application presentation"
    type: "presentation"
    url: "/documents/kubernetes-fleetman/kubernetes-fleetman-presentation.pdf"
---

## Context and objective

The Fleetman project deploys a real-time fleet-tracking application made of microservices on a self-hosted Kubernetes cluster. The challenge is to run the Spring Boot services, MongoDB storage, ActiveMQ messaging and web access together while explicitly addressing workload health and data persistence.

## Architecture

The cluster is installed with `kubeadm` on Hyper-V and contains one control-plane node and two workers. The architecture separates the Nginx-exposed frontend, application services, ActiveMQ broker, MongoDB StatefulSet and persistent storage. Namespaces separate responsibilities, while ConfigMaps and Secrets externalize configuration and sensitive values.

## Implementation

The deployment defines the Kubernetes objects required by each service, liveness and readiness probes, and the StorageClass, PersistentVolume and PersistentVolumeClaim chain. Stateless services can be distributed across workers, while MongoDB keeps a stable identity and volume through its StatefulSet. Nginx ingress provides the application entry point.

## Results and deliverables

The repository documents a three-node cluster hosting Fleetman components with messaging, a stateful service, externalized configuration, health checks and persistent storage. The Fleetman presentation is the summary deliverable for the architecture and deployment.

## Lessons learned

The project clarifies the difference between stateful and stateless workloads, the operational role of probes, and the need to design orchestration, networking, configuration and storage as one system.
