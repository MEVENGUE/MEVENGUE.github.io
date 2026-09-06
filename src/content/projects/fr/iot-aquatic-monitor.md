---
title: "Système IoT de monitoring aquatique"
subtitle: "Température et niveau d'eau sur ESP32"
description: "Un système embarqué simulé sur Wokwi qui mesure et affiche la température et le niveau d'eau."
year: 2025
category: "IoT"
tags: ["ESP32", "Arduino", "Wokwi", "DS18B20", "HC-SR04"]
featured: false
number: "02"
metrics:
  - { value: "2", label: "capteurs" }
  - { value: "2", label: "sorties d'affichage" }
locale: "fr"
translationKey: "project.iot-aquatic-monitor"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rapport du système IoT aquatique"
    type: "report"
    url: "/documents/iot-aquatic-monitor/iot-aquatic-monitor-report.pdf"
---

## Contexte et objectif

Ce projet IoT réalise un système de monitoring aquatique autour d'un ESP32. Il doit mesurer en temps réel la température de l'eau avec un DS18B20 et son niveau avec un capteur ultrasonique HC-SR04, puis rendre les deux mesures lisibles localement.

## Architecture

Le DS18B20 communique avec l'ESP32 par le bus OneWire. Le HC-SR04 utilise deux GPIO pour les signaux Trigger et Echo, tandis qu'un écran LCD 16×2 est relié par I2C via SDA et SCL. Le programme Arduino centralise l'acquisition et envoie les valeurs vers le LCD et le moniteur série. Le montage est décrit dans la simulation Wokwi.

## Mise en œuvre

Le code s'appuie sur les bibliothèques OneWire, DallasTemperature et LiquidCrystal_I2C. Le câblage est formalisé dans `diagram.json`, les dépendances dans `libraries.txt` et les paramètres de simulation dans `wokwi-project.txt`. La simulation Wokwi permet de contrôler l'intégration des deux capteurs et de l'affichage avant un déploiement matériel.

## Résultats et livrables

Le système produit simultanément les mesures de température et de niveau sur l'écran LCD et le moniteur série. Les livrables comprennent le code `sketch.ino`, le schéma Wokwi, les fichiers de configuration et de bibliothèques, ainsi qu'un rapport complet du projet.

## Enseignements

Le projet illustre l'intégration de protocoles différents sur un même microcontrôleur, la conversion d'une mesure ultrasonique en niveau exploitable et l'intérêt de simuler le câblage et le logiciel embarqué avant le montage physique.
