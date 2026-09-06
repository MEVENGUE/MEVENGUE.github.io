---
title: "Supfile Operations Runbook"
description: "Operational map for the multi-datacenter proof of concept."
section: "Infrastructure"
order: 1
---
## Scope

The Supfile estate comprises 17 virtual machines across Paris, New York and Toronto. Core layers include HAProxy and Keepalived, FastAPI behind Nginx, MariaDB Galera, ProxySQL, GlusterFS and centralized monitoring.

## Validation sequence

1. Verify overlay connectivity between every host.
2. Confirm HTTP health at Paris and New York.
3. Inspect Galera `wsrep` synchronization.
4. Confirm all six GlusterFS bricks are online.
5. Validate Prometheus targets before initiating failover.
6. Stop one web node and observe local load-balancer recovery.
7. Exercise inter-site failover and preserve the evidence.
