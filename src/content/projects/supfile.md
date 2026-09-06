---
title: "Supfile Multi-Datacenter"
subtitle: "A resilient private cloud across three continents"
description: "A secure Dropbox-inspired platform engineered across Paris, New York and Toronto, with real-time replication, observability and disaster recovery."
year: 2025
category: "Cloud Infrastructure"
tags: ["Vagrant", "Galera", "GlusterFS", "HAProxy", "Prometheus"]
featured: true
number: "01"
metrics:
  - { value: "17", label: "Virtual machines" }
  - { value: "3", label: "Datacenters" }
  - { value: "37", label: "Validated tests" }
---
## The mission

Design and deploy a secure cloud storage application inspired by Dropbox across a resilient, multi-datacenter infrastructure spanning **Paris, New York and Toronto**.

## System architecture

Paris and New York operate active services behind HAProxy and Keepalived. A three-node MariaDB Galera cluster synchronizes data across sites, while six GlusterFS bricks provide distributed, replicated storage. Toronto hosts monitoring, backup and the cold disaster-recovery site.

The estate is provisioned with Vagrant and purpose-built shell roles. Prometheus and a 19-panel Grafana dashboard observe the system; Fail2ban and Suricata reinforce the perimeter.

## Evidence, not assumptions

Thirty-seven documented tests exercise health checks, synchronous replication, storage, intra-datacenter failover, inter-site failover and security controls. This project turns a broad infrastructure brief into a verifiable operating system.
