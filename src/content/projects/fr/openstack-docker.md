---
title: "OpenStack et Docker"
subtitle: "Virtualisation, cloud privé et conteneurs"
description: "Déploiement d'OpenStack en environnement virtualisé puis prise en main de Docker sur Ubuntu."
year: 2025
category: "Cloud"
tags: ["OpenStack", "Docker", "Ubuntu", "VirtualBox"]
featured: false
number: "04"
metrics:
  - { value: "2", label: "plateformes" }
  - { value: "1", label: "topologie réseau" }
locale: "fr"
translationKey: "project.openstack-docker"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rapport OpenStack et Docker"
    type: "report"
    url: "/documents/openstack-docker/openstack-docker-report.pdf"
---

## Contexte et objectif

Ce TP compare deux niveaux de virtualisation : la création d'une infrastructure cloud avec OpenStack et l'exécution d'environnements isolés avec Docker. L'objectif est de pratiquer le cycle de déploiement d'une machine virtuelle, puis celui d'images et de conteneurs sur un serveur Ubuntu.

## Architecture ou méthode

La première partie utilise VirtualBox pour héberger une machine Linux sur laquelle OpenStack est installé. L'environnement OpenStack est structuré en projets, utilisateurs, gabarits et réseaux virtuels, avec une topologie réseau visualisable. La seconde partie installe Docker sur Ubuntu et s'intéresse aux images, aux conteneurs et aux namespaces qui assurent leur isolation.

## Mise en œuvre

Après le déploiement de la VM Linux, les ressources d'identité et de réseau OpenStack sont créées, puis des gabarits sont préparés pour lancer des instances. Côté Docker, une image Ubuntu est importée et utilisée pour démarrer des conteneurs en mode interactif puis détaché. Les exercices couvrent aussi la gestion des images, des conteneurs et des namespaces.

## Résultats et livrables

Le rapport OpenStack & Docker retrace l'installation, la configuration des projets et réseaux, la lecture de la topologie, puis les manipulations Docker. Il matérialise la différence entre virtualisation de machines via une plateforme cloud et isolation de processus par conteneurs.

## Enseignements

Le projet permet de distinguer le rôle d'un hyperviseur, d'un orchestrateur IaaS et d'un moteur de conteneurs. Il montre aussi que l'identité et le réseau sont des objets centraux d'OpenStack, alors que Docker met l'accent sur l'image, le cycle de vie du conteneur et l'isolation par namespaces.
