---
title: "NovaSys Infra"
subtitle: "Virtualization, segmentation and continuity"
description: "A virtualized infrastructure designed around high availability, VLANs, backups and disaster recovery."
year: 2025
category: "Virtualization"
tags: ["VMware", "Hyper-V", "VirtualBox", "VLAN", "PRA"]
featured: true
number: "20"
metrics:
  - { value: "3", label: "hyperviseurs étudiés" }
  - { value: "4", label: "axes d'exploitation" }
locale: "en"
translationKey: "project.novasys"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/novasys-cover.jpg"
gallery: ["/assets/novasys-architecture.png", "/assets/novasys-ha-rpo.png"]
documents:
  - title: "NovaSys infrastructure report"
    type: "report"
    url: "/documents/novasys/novasys-infrastructure-report.pdf"
  - title: "NovaSys project presentation"
    type: "presentation"
    url: "/documents/novasys/novasys-presentation.pdf"
  - title: "Virtualization design brief"
    type: "deliverable"
    url: "/documents/novasys/novasys-virtualization-brief.pdf"
  - title: "NovaSys resilience study"
    type: "report"
    url: "/documents/novasys/novasys-resilience-overview.pdf"
---

## Problem
NovaSys must host workloads on a virtualized platform that remains available, segmented and recoverable after an incident.

## Idea
Combine a hypervisor foundation with VLAN architecture, snapshot policy, restorable backups and an explicit recovery plan.

## Architecture
The study compares VMware, Hyper-V and VirtualBox. VLANs, NAT and virtual-firewall rules segment the networks; datastores host virtual machines and their data.

## Implementation
The project defines addressing, VM templates, snapshot policy, datastore organization, and backup and restore procedures.

## Security
Segmentation limits flows between zones. RBAC and least privilege constrain administrative operations.

## Infrastructure
Diagrams describe the global architecture, network, RBAC and continuity. The report and presentation connect these views to operating choices.

## Challenges
Snapshots and backups serve different purposes. Fast rollback must not be confused with an independent copy suitable for disaster recovery.

## Results
NovaSys gains a documented virtualization model, network segmentation and a continuity scenario with restore tests.

## Lessons
High availability replaces neither backup nor disaster recovery. Recovery must be measured and rehearsed, not merely diagrammed.
