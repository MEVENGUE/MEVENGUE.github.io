---
title: "Supfile multi-datacenter"
subtitle: "A resilient private cloud across three cities"
description: "A secure storage application on 17 VMs with replication, observability and multi-site recovery."
year: 2025
category: "Cloud Infrastructure"
tags: ["Vagrant", "Galera", "GlusterFS", "HAProxy", "Prometheus"]
featured: true
number: "21"
metrics:
  - { value: "17", label: "machines virtuelles" }
  - { value: "3", label: "datacenters" }
  - { value: "37", label: "preuves de test" }
locale: "en"
translationKey: "project.supfile"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/supfile-app.png"
gallery: ["/assets/supfile-architecture.png", "/assets/supfile-grafana.jpeg", "/assets/supfile-security.jpg"]
github: "https://github.com/MEVENGUE/SUPFile-VB-App"
documents:
  - title: "Multi-datacenter infrastructure report"
    type: "report"
    url: "/documents/supfile/supfile-infrastructure-report.pdf"
  - title: "Web application technical report"
    type: "report"
    url: "/documents/supfile/supfile-frontend-report.pdf"
  - title: "Supfile proof-of-concept presentation"
    type: "presentation"
    url: "/documents/supfile/supfile-poc-presentation.pdf"
  - title: "Supfile deployment guide"
    type: "guide"
    url: "/documents/supfile/deployment-guide.md"
---

## Problem
Supfile must provide secure file storage despite the loss of a server or site, using constrained proof-of-concept hardware.

## Idea
Distribute the application across Paris, New York and Toronto, duplicate every critical layer and retain evidence for each failure scenario.

## Architecture
Paris and New York serve FastAPI behind Nginx, HAProxy and Keepalived. Galera replicates the database across three nodes; six GlusterFS bricks replicate files. Toronto hosts monitoring, backup, DNS and the cold site.

## Implementation
Vagrant provisions 17 VMs, while specialized scripts install load balancers, web, storage, database, ProxySQL and observability. Tailscale connects the sites.

## Security
Fail2ban, Suricata, network filtering, role separation and load-balancer-only exposure provide perimeter defense. The POC records the memory constraint that required Suricata to be stopped on one web node.

## Infrastructure
HAProxy and a Keepalived VIP distribute traffic. ProxySQL separates reads and writes, Prometheus collects targets, and Grafana displays them through 19 panels.

## Challenges
Database and file consistency must survive inter-site outages. Limited local resources also require trade-offs between functional coverage and memory use.

## Results
The POC covers 3 datacenters, 17 VMs, a 3-node Galera cluster, 6 GlusterFS bricks and 37 pieces of evidence spanning connectivity, replication, failover, monitoring and security.

## Lessons
Resilience is credible only when observable and tested. Preserved evidence turns a demonstration into an engineering argument.
