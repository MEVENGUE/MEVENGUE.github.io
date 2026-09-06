---
title: "Object-oriented Java application"
subtitle: "From UML diagram to implementation"
description: "StarUML modeling and Eclipse development of a Java solution to a practical problem."
year: 2025
category: "Software Development"
tags: ["Java", "UML", "Eclipse", "StarUML"]
featured: false
number: "07"
metrics:
  - { value: "3", label: "classes et tests" }
  - { value: "2", label: "outils principaux" }
locale: "en"
translationKey: "project.java-oop"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Object-oriented Java project report"
    type: "report"
    url: "/documents/java-oop/java-oop-project-report.pdf"
---

## Context and objective

This Java mini-project starts from an everyday management problem and builds both an object-oriented solution and its UML representation. The selected case handles clients and products, including displaying product characteristics and prices, adding items and searching for clients.

## Architecture

The StarUML model formalizes classes, inheritance, encapsulation, multiplicities and stereotypes. The Eclipse implementation is split into three packages: `metier` for domain objects, `dao` for client data operations, and `test` for execution. An `IProduit` interface completes the product hierarchy.

## Implementation

The code uses constructors, arrays and object `ArrayList` collections. `ClientDao` exposes methods including `CreateClient()` and `getClientParMc()`, called from `GestionTest`. A graphical interface adds products in tabular form and displays their characteristics. The report also documents correcting an execution error caused by a missing `main` method in the selected class.

## Results and deliverables

The project provides the class diagram, Java sources including `Client.java` and `GestionTest.java`, and PDF and DOCX reports. The result connects a UML model to a working Java application organized by responsibility.

## Lessons learned

The work shows how to translate a class diagram into executable packages and objects. It applies encapsulation, inheritance, interfaces, collections, DAO and entry-point concepts while highlighting separation between domain model, data access and tests.
