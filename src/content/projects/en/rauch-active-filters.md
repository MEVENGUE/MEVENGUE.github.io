---
title: "Rauch active filters"
subtitle: "Second-order analog design"
description: "Design, Proteus simulation and analysis of three Rauch active-filter structures."
year: 2025
category: "Electronics"
tags: ["Proteus", "Électronique analogique", "Traitement du signal"]
featured: false
number: "05"
metrics:
  - { value: "3", label: "types de filtres" }
  - { value: "2", label: "domaines d'analyse" }
locale: "en"
translationKey: "project.rauch-active-filters"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rauch active filters report"
    type: "report"
    url: "/documents/rauch-active-filters/rauch-active-filters-report.pdf"
---

## Context and objective

This analog-electronics synthesis project studies second-order active filters using the Rauch topology. Its objective is to cover the three main responses—low-pass, high-pass and band-pass—from theoretical design through simulation.

## Architecture or method

Each filter combines resistors, capacitors and an active element in a Rauch structure suited to the required response. Analysis covers the transfer function, frequency response and time-domain behavior. Proteus is used to build the schematics and compare simulated behavior with theoretical specifications.

## Implementation

The three structures are sized separately and integrated into Proteus projects. For each one, simulation is used to observe the pass region and out-of-band attenuation and, for the band-pass filter, bandwidth and selectivity. `TP2 FILTRAGE ACTIF.pdsprj`, `testélectronique.pdsprj` and `TEST3.pdsprj` retain the circuits and experiments.

## Results and deliverables

The “Electronics Project” report presents diagrams, examples and analyses for low-pass, high-pass and band-pass filters. The associated Proteus projects preserve the simulated circuits and make the studied designs reproducible.

## Lessons learned

The work connects the choice of an analog topology to an expected frequency response. It also shows that simulation should be interpreted in both frequency and time domains and compared with the filter's theoretical model.
