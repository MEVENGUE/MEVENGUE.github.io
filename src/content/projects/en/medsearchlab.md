---
title: "MedSearchLab Windows Server"
subtitle: "Secure directory services for a laboratory"
description: "A documented Windows Server environment built around AD DS, DNS, DHCP, GPO, monitoring and hardening."
year: 2025
category: "Infrastructure"
tags: ["Windows Server", "AD DS", "DNS", "DHCP", "GPO"]
featured: true
number: "16"
metrics:
  - { value: "4", label: "services d'infrastructure" }
  - { value: "3", label: "axes de sécurité" }
locale: "en"
translationKey: "project.medsearchlab"
school: "SUPINFO Paris"
readingTime: "8 min"
cover: "/assets/medsearchlab-cover.jpg"
gallery: ["/assets/medsearchlab-architecture.png"]
documents:
  - title: "MedSearchLab infrastructure technical report"
    type: "report"
    url: "/documents/medsearchlab/medsearchlab-technical-report.pdf"
  - title: "Microsoft infrastructure presentation"
    type: "presentation"
    url: "/documents/medsearchlab/medsearchlab-presentation.pdf"
  - title: "MedSearchLab project assessment"
    type: "deliverable"
    url: "/documents/medsearchlab/medsearchlab-assessment.pdf"
---

## Problem
MedSearchLab needs an administrable, monitored and secured Windows Server foundation for its infrastructure services.

## Idea
Centralize identities and policies while separating directory, name-resolution, addressing and monitoring responsibilities.

## Architecture
AD DS structures identities. DNS and DHCP provide discovery and addressing. GPOs distribute security settings, while PerfMon and alerts make platform health observable.

## Implementation
The deliverable documents role installation, directory objects, policy application, access rights and operating procedures.

## Security
Hardening uses GPOs, security templates, auditing and controlled permission assignment. Monitoring complements prevention by raising alerts.

## Infrastructure
Hyper-V and VMware diagrams describe virtualization alternatives and the flows between Windows services.

## Challenges
DNS, DHCP, domain services, policies and rights must remain consistent because an error in one role can affect the entire laboratory.

## Results
The assessment provides an integrated environment, visual architecture evidence and operating documentation covering services and security.

## Lessons
In a Windows domain, identity, networking and policy are one system. Monitoring must be designed from the start.
