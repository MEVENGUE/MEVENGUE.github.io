---
title: "Aquatic Monitor"
subtitle: "Embedded sensing for water systems"
description: "An ESP32 monitoring system measuring water temperature and level in real time, simulated end-to-end in Wokwi."
year: 2024
category: "IoT & Embedded"
tags: ["ESP32", "Arduino", "DS18B20", "HC-SR04", "Wokwi"]
featured: true
number: "04"
metrics:
  - { value: "2", label: "Live sensors" }
  - { value: "24/7", label: "Monitoring intent" }
---
## The system

An embedded monitoring prototype combining a DS18B20 temperature probe with an HC-SR04 ultrasonic level sensor. Measurements are exposed through a 16×2 I²C display and serial monitor.

The complete circuit and control logic were simulated in Wokwi, allowing repeatable validation before physical deployment.
