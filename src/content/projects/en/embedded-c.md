---
title: "C for microcontrollers"
subtitle: "Signal generation and digital filtering"
description: "Two practical assignments in embedded programming and real-time signal processing."
year: 2025
category: "Embedded Systems"
tags: ["C", "Microcontrôleurs", "Filtres numériques"]
featured: false
number: "08"
metrics:
  - { value: "2", label: "travaux pratiques" }
  - { value: "2", label: "fonctions temps réel" }
locale: "en"
translationKey: "project.embedded-c"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "C microcontrollers — Practical work 2"
    type: "report"
    url: "/documents/embedded-c/embedded-c-microcontroller-tp2.pdf"
  - title: "C microcontrollers — Practical work 3"
    type: "report"
    url: "/documents/embedded-c/embedded-c-microcontroller-tp3.pdf"
---

## Context and objective

Two microcontroller labs implement a signal generator and digital filters in C. The first connects DSP architecture, sampling, timers and interrupts to periodic signal generation; the second transforms continuous transfer functions into executable recurrence equations.

## Architecture or method

The studied device is a TMS320F2808 DSP. Preparation compares fixed- and floating-point processing, Harvard and Von Neumann architectures, Flash, RAM and ROM, watchdogs, ADC and PWM. The generator updates an angle recursively from frequency and sampling period. For filtering, Laplace models and Bode plots are moved into the Z domain through a bilinear transform.

## Implementation

`Generateur_calc` computes the current angle, wraps it to one period and stores the previous state. Simulations are prepared at 50 Hz and 500 Hz. The filter lab organizes code into `main.c`, `Interruption_Timer.c`, `Fonctions_Filtres.c` and `Filtres.h`; each output is calculated from the current input, previous input and previous output.

## Results and deliverables

Both reports document the theoretical preparation, recurrence equations, code and simulations for the generator and filters. They show the transition from a continuous signal representation to a discrete interrupt-driven implementation.

## Lessons learned

The project directly connects sampling frequency, stored state and digital-processing stability. It also shows that embedded filter implementation requires a correct translation from transfer function to coefficients and state updates.
