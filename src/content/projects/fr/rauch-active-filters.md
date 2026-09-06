---
title: "Filtres actifs de Rauch"
subtitle: "Conception analogique du second ordre"
description: "Conception, simulation Proteus et analyse de trois structures de filtres actifs de Rauch."
year: 2025
category: "Électronique"
tags: ["Proteus", "Électronique analogique", "Traitement du signal"]
featured: false
number: "05"
metrics:
  - { value: "3", label: "types de filtres" }
  - { value: "2", label: "domaines d'analyse" }
locale: "fr"
translationKey: "project.rauch-active-filters"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rapport sur les filtres actifs de Rauch"
    type: "report"
    url: "/documents/rauch-active-filters/rauch-active-filters-report.pdf"
---

## Contexte et objectif

Ce projet de synthèse en électronique analogique étudie les filtres actifs du second ordre à structure de Rauch. L'objectif est de couvrir les trois réponses principales — passe-bas, passe-haut et passe-bande — depuis leur conception théorique jusqu'à leur simulation.

## Architecture ou méthode

Chaque filtre associe résistances, condensateurs et élément actif selon une structure de Rauch adaptée à la réponse recherchée. L'analyse porte sur la fonction de transfert, la réponse fréquentielle et le comportement temporel. Proteus sert à construire les schémas et à confronter les résultats simulés aux spécifications théoriques.

## Mise en œuvre

Les trois structures sont dimensionnées séparément puis intégrées dans des projets Proteus. Pour chacune, la simulation permet d'observer la zone transmise, l'atténuation hors bande et, pour le passe-bande, la bande passante et la sélectivité. Les fichiers `TP2 FILTRAGE ACTIF.pdsprj`, `testélectronique.pdsprj` et `TEST3.pdsprj` conservent les montages et essais.

## Résultats et livrables

Le rapport « Projet Électronique » présente les schémas, exemples et analyses des filtres passe-bas, passe-haut et passe-bande. Les projets Proteus constituent les livrables de simulation associés et permettent de retrouver les circuits étudiés.

## Enseignements

Le travail relie le choix d'une topologie analogique à une réponse fréquentielle attendue. Il montre également que la simulation doit être interprétée à la fois dans les domaines fréquentiel et temporel et comparée au modèle théorique du filtre.
