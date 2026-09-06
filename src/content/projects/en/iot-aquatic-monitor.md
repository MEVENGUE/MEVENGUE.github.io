---
title: "IoT aquatic monitoring system"
subtitle: "Water temperature and level on ESP32"
description: "A Wokwi-simulated embedded system that measures and displays water temperature and level."
year: 2025
category: "IoT"
tags: ["ESP32", "Arduino", "Wokwi", "DS18B20", "HC-SR04"]
featured: false
number: "02"
metrics:
  - { value: "2", label: "capteurs" }
  - { value: "2", label: "sorties d'affichage" }
locale: "en"
translationKey: "project.iot-aquatic-monitor"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Aquatic IoT monitoring report"
    type: "report"
    url: "/documents/iot-aquatic-monitor/iot-aquatic-monitor-report.pdf"
---

## Context and objective

This IoT project implements an aquatic monitoring system around an ESP32. It measures water temperature in real time with a DS18B20 and water level with an HC-SR04 ultrasonic sensor, then presents both readings locally.

## Architecture

The DS18B20 communicates with the ESP32 over OneWire. The HC-SR04 uses two GPIO pins for Trigger and Echo, while a 16×2 LCD connects through I2C using SDA and SCL. The Arduino program centralizes acquisition and sends values to both the LCD and serial monitor. The complete assembly is represented in Wokwi.

## Implementation

The code uses the OneWire, DallasTemperature and LiquidCrystal_I2C libraries. Wiring is described in `diagram.json`, dependencies in `libraries.txt`, and simulation settings in `wokwi-project.txt`. Wokwi is used to validate integration of both sensors and the display before physical deployment.

## Results and deliverables

The system displays temperature and level readings simultaneously on the LCD and serial monitor. Deliverables include `sketch.ino`, the Wokwi wiring diagram, configuration and library files, and the complete project report.

## Lessons learned

The project demonstrates how to integrate different protocols on one microcontroller, turn an ultrasonic reading into usable level information, and validate embedded wiring and software through simulation before building the physical device.
