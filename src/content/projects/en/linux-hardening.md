---
title: "Advanced Linux administration — Evil Corp"
subtitle: "Hardening, monitoring, backup and recovery"
description: "Design of a critical Linux infrastructure with access controls, auditing, monitoring and recovery."
year: 2025
category: "Infrastructure"
tags: ["Linux", "auditd", "SELinux", "Prometheus", "Borg"]
featured: false
number: "15"
metrics:
  - { value: "4", label: "axes opérationnels" }
  - { value: "2", label: "familles Linux" }
locale: "en"
translationKey: "project.linux-hardening"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Evil Corp technical report"
    type: "report"
    url: "/documents/linux-hardening/evil-corp-technical-report.pdf"
  - title: "Evil Corp project presentation"
    type: "presentation"
    url: "/documents/linux-hardening/evil-corp-presentation.pdf"
  - title: "Evil Corp demonstration deck"
    type: "deliverable"
    url: "/documents/linux-hardening/evil-corp-demo.pdf"
---

## Context and objective

The Evil Corp scenario concerns a business-critical Linux infrastructure. It addresses four complementary areas: system hardening, monitoring, backup and disaster recovery across RHEL and Ubuntu Server environments.

## Architecture and method

Security combines SSH hardening, MFA, `sudoers` rules, `ufw` or `firewalld`, `auditd` logging and mandatory access controls through SELinux or AppArmor. Prometheus and Node Exporter provide operational visibility. Backups use `rsync` and Borg with an off-site copy, encryption and retention policy, while the recovery plan formalizes failover and restoration.

## Implementation

Privileged access is reduced and traced, confinement and firewall policies are applied, and relevant system events are audited. Host metrics are exposed to Prometheus. Backup and recovery procedures are documented with restoration and failover tests so that they are verified rather than merely theoretical.

## Results and deliverables

The project delivers a technical report, a presentation and a demonstration document. Together they document access controls, anomaly detection, monitoring, encrypted retained backups and tested recovery procedures.

## Lessons learned

Effective hardening combines prevention, traceability and recoverability. The project also shows that a backup is credible only after a successful restore and that a disaster recovery plan must state concrete failover operations rather than remain a general principle.
