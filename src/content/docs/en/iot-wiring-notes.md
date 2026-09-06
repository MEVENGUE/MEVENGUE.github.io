---
title: "Aquatic monitor wiring notes"
subtitle: "Connecting DS18B20, HC-SR04 and LCD to the ESP32."
description: "Connecting DS18B20, HC-SR04 and LCD to the ESP32."
year: 2025
category: "Documentation"
tags: ["ESP32", "Wokwi", "Sensors"]
featured: false
number: "D05"
metrics:
locale: "en"
translationKey: "doc.iot-wiring-notes"
school: "Franck Mevengue"
readingTime: "3 min"
---

## Sensors
The DS18B20 uses a OneWire bus with the resistor specified by the circuit. The HC-SR04 uses Trigger and Echo pins.

## Display
The 16x2 LCD connects to the I2C bus through SDA and SCL. The serial monitor provides a second control output.

## Validation
Test wiring and the OneWire, DallasTemperature and LiquidCrystal_I2C libraries in Wokwi before deployment.
