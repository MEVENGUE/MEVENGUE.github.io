---
title: "Langage C pour microcontrôleurs"
subtitle: "Génération de signaux et filtrage numérique"
description: "Deux travaux pratiques de programmation embarquée et de traitement du signal en temps réel."
year: 2025
category: "Systèmes embarqués"
tags: ["C", "Microcontrôleurs", "Filtres numériques"]
featured: false
number: "08"
metrics:
  - { value: "2", label: "travaux pratiques" }
  - { value: "2", label: "fonctions temps réel" }
locale: "fr"
translationKey: "project.embedded-c"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Microcontrôleurs en C — TP2"
    type: "report"
    url: "/documents/embedded-c/embedded-c-microcontroller-tp2.pdf"
  - title: "Microcontrôleurs en C — TP3"
    type: "report"
    url: "/documents/embedded-c/embedded-c-microcontroller-tp3.pdf"
---

## Contexte et objectif

Deux travaux pratiques de microcontrôleur mettent en œuvre en C un générateur de signaux puis des filtres numériques. Le premier relie architecture DSP, échantillonnage, timers et interruptions à la génération périodique ; le second passe des fonctions de transfert continues à des équations de récurrence exécutables.

## Architecture ou méthode

Le support étudié est un DSP TMS320F2808. La préparation compare virgule fixe et flottante, architectures Harvard et Von Neumann, mémoires Flash, RAM et ROM, watchdog, ADC et PWM. Le générateur met à jour un angle par récurrence à partir de la fréquence et de la période d'échantillonnage. Pour les filtres, les modèles de Laplace et diagrammes de Bode sont transposés dans le domaine Z par transformation bilinéaire.

## Mise en œuvre

La fonction `Generateur_calc` calcule l'angle courant, le ramène dans l'intervalle d'une période et mémorise l'état précédent. Des simulations sont prévues à 50 Hz et 500 Hz. Le TP filtres organise le code dans `main.c`, `Interruption_Timer.c`, `Fonctions_Filtres.c` et `Filtres.h` ; chaque sortie est calculée avec l'entrée courante, l'entrée précédente et la sortie précédente.

## Résultats et livrables

Les deux rapports documentent la préparation théorique, les équations de récurrence, le code et les simulations du générateur et des filtres. Ils montrent le passage d'une représentation continue du signal à une implémentation discrète pilotée par interruption.

## Enseignements

Le projet relie directement fréquence d'échantillonnage, état mémorisé et stabilité d'un traitement numérique. Il met aussi en évidence que l'implémentation embarquée d'un filtre exige de traduire correctement la fonction de transfert en coefficients et en mises à jour d'état.
