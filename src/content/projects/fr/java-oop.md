---
title: "Application Java orientée objet"
subtitle: "Du diagramme UML à l'implémentation"
description: "Modélisation StarUML et développement Eclipse d'une solution Java à un problème concret."
year: 2025
category: "Développement"
tags: ["Java", "UML", "Eclipse", "StarUML"]
featured: false
number: "07"
metrics:
  - { value: "3", label: "classes et tests" }
  - { value: "2", label: "outils principaux" }
locale: "fr"
translationKey: "project.java-oop"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rapport du projet Java orienté objet"
    type: "report"
    url: "/documents/java-oop/java-oop-project-report.pdf"
---

## Contexte et objectif

Ce mini-projet Java part d'un problème de gestion courant pour construire une solution orientée objet et sa représentation UML. Le cas retenu manipule des clients et des produits, avec affichage des caractéristiques et du prix, ajout d'éléments et recherche de clients.

## Architecture

La modélisation StarUML formalise classes, héritage, encapsulation, multiplicités et stéréotypes. L'implémentation Eclipse est répartie en trois packages : `metier` pour les objets du domaine, `dao` pour l'accès et les opérations sur les clients, et `test` pour l'exécution. Une interface `IProduit` complète la hiérarchie des produits.

## Mise en œuvre

Le code utilise des constructeurs, des tableaux et des `ArrayList` d'objets. La classe `ClientDao` expose notamment `CreateClient()` et `getClientParMc()`, appelées depuis `GestionTest`. Une interface graphique permet d'ajouter un produit sous forme de tableau et d'afficher ses caractéristiques. Le rapport retrace aussi la correction d'une erreur liée à l'absence de méthode `main` dans la classe exécutée.

## Résultats et livrables

Le projet fournit le diagramme de classes, les sources Java — dont `Client.java` et `GestionTest.java` — ainsi que les rapports PDF et DOCX. Le résultat associe une modélisation UML à une application Java fonctionnelle organisée par responsabilités.

## Enseignements

Le travail montre comment traduire un diagramme de classes en packages et objets exécutables. Il met en pratique encapsulation, héritage, interface, collections, DAO et point d'entrée, tout en soulignant l'intérêt de séparer modèle métier, accès aux données et tests.
