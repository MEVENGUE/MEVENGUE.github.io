---
title: "Fleetman Deployment Patterns"
description: "The reusable orchestration patterns behind the Fleetman cluster."
section: "Orchestration"
order: 2
---
## Cluster shape

One control-plane node coordinates two workers. Namespaces establish responsibility boundaries and Nginx provides controlled ingress.

## Stateful workload checklist

- Use StatefulSets when identity and ordering matter.
- Bind durable data through PVCs.
- Keep environment configuration in ConfigMaps.
- Store sensitive values in Secrets.
- Define independent readiness and liveness probes.
- Verify rescheduling behavior before calling a workload resilient.
