---
title: "Notes de câblage du moniteur aquatique"
subtitle: "Relier DS18B20, HC-SR04 et LCD à l'ESP32."
description: "Relier DS18B20, HC-SR04 et LCD à l'ESP32."
year: 2025
category: "Documentation"
tags: ["ESP32", "Wokwi", "Sensors"]
featured: false
number: "D05"
metrics:
locale: "fr"
translationKey: "doc.iot-wiring-notes"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Capteurs
Le DS18B20 communique sur un bus OneWire avec la résistance prévue par le montage. Le HC-SR04 utilise des broches Trigger et Echo.

## Affichage
Le LCD 16x2 est raccordé au bus I2C via SDA et SCL. Le moniteur série offre une seconde sortie de contrôle.

## Validation
Tester le câblage et les bibliothèques OneWire, DallasTemperature et LiquidCrystal_I2C dans Wokwi avant déploiement.
