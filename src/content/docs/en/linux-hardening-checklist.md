---
title: "Linux hardening checklist"
subtitle: "Controls drawn from the Evil Corp project."
description: "Controls drawn from the Evil Corp project."
year: 2025
category: "Documentation"
tags: ["Linux", "Hardening", "Backup"]
featured: false
number: "D04"
metrics:
locale: "en"
translationKey: "doc.linux-hardening-checklist"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Access
Harden SSH, apply MFA where available, constrain sudoers and review accounts.

## System
Enable auditd, SELinux or AppArmor, and appropriate ufw or firewalld rules.

## Operations
Monitor with Prometheus and Node Exporter, encrypt rsync or Borg backups and test recovery procedures.
