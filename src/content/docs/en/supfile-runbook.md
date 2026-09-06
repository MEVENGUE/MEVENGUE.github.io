---
title: "Supfile operations runbook"
subtitle: "Control sequence for 17 VMs across three sites."
description: "Control sequence for 17 VMs across three sites."
year: 2025
category: "Documentation"
tags: ["Supfile", "Operations", "Failover"]
featured: false
number: "D01"
metrics:
locale: "en"
translationKey: "doc.supfile-runbook"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Initial checks
1. Verify Tailscale connectivity for every VM.
2. Check HTTP health in Paris and New York.
3. Inspect `wsrep` state on all three Galera nodes.
4. Confirm that all six GlusterFS bricks are online.

## Failover test
Record Prometheus state, stop one web node, observe local recovery, then test site loss. Preserve every result as evidence.
