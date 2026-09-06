---
title: "Cybersecurity vulnerability analysis"
subtitle: "From CISA 2022 data to network controls"
description: "An applied study combining vulnerability data, phishing classification, network analysis and cryptography."
year: 2025
category: "Cybersecurity"
tags: ["Python", "Qlik", "Machine Learning", "Nmap", "Scapy"]
featured: true
number: "01"
metrics:
  - { value: "4", label: "volets techniques" }
  - { value: "2022", label: "catalogue CISA" }
locale: "en"
translationKey: "project.cybersecurity"
school: "ECAM EPMI"
readingTime: "8 min"
cover: "/assets/cybersecurity-cover.png"
gallery: ["/assets/cybersecurity-cover.png"]
documents:
  - title: "Vulnerability risk analysis report"
    type: "report"
    url: "/documents/cybersecurity/vulnerability-risk-analysis.pdf"
  - title: "Cybersecurity project overview"
    type: "guide"
    url: "/documents/cybersecurity/project-overview.md"
---

## Problem
CISA's 2022 catalog lists actively exploited vulnerabilities, but raw data alone does not guide a security analysis. The project had to connect trends, network exposure, phishing and data protection.

## Idea
Build a layered study: visualize vulnerabilities, classify phishing emails, automate network reconnaissance and experiment with cryptographic functions.

## Architecture
Python supports the analysis scripts. Qlik presents trends. Nmap discovers hosts, ports, versions and operating systems, while Scapy supports packet inspection. A notebook handles email classification.

## Implementation
The work is split across `Phishing_Email_classification.ipynb`, Nmap scripts, Scapy exercises, encryption functions and Qlik dashboards.

## Security
The approach combines detection, analysis and protection through network-surface inspection, suspicious-message recognition and secure encrypted-password handling.

## Infrastructure
The environment can be reconstructed from the Python scripts and thematic folders. Analytical results are consolidated in the report and Qlik visuals.

## Challenges
The main challenge is aligning heterogeneous signals: vulnerability records, email metadata, scan results and network packets.

## Results
The project delivers four complementary workstreams, a risk-analysis report and visualizations for interpreting the CISA 2022 catalog.

## Lessons
Useful security analysis combines data, network visibility and practical controls. Clear communication matters as much as the detection tool.
