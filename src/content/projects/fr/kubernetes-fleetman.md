---
title: "Kubernetes — Fleetman"
subtitle: "Microservices temps réel sur cluster auto-hébergé"
description: "Déploiement de Fleetman avec services à état, messagerie, ingress, probes et stockage persistant."
year: 2025
category: "Cloud natif"
tags: ["Kubernetes", "Spring Boot", "MongoDB", "ActiveMQ", "Nginx"]
featured: true
number: "14"
metrics:
  - { value: "3", label: "nœuds" }
  - { value: "2", label: "workers" }
locale: "fr"
translationKey: "project.kubernetes-fleetman"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Présentation de l’application Fleetman"
    type: "presentation"
    url: "/documents/kubernetes-fleetman/kubernetes-fleetman-presentation.pdf"
---

## Contexte et objectif

Le projet Fleetman consiste à déployer une application de suivi de flotte composée de microservices temps réel sur un cluster Kubernetes auto-hébergé. L'enjeu est de faire fonctionner ensemble les services Spring Boot, le stockage MongoDB, la messagerie ActiveMQ et l'accès web, tout en traitant explicitement la persistance et la santé des workloads.

## Architecture

Le cluster est installé avec `kubeadm` sur Hyper-V et comprend un nœud maître et deux workers. L'architecture distingue le frontal exposé par Nginx, les services applicatifs, le broker ActiveMQ, MongoDB déployé en StatefulSet et un stockage persistant. Des namespaces séparent les responsabilités ; les paramètres et données sensibles sont externalisés dans des ConfigMaps et Secrets.

## Mise en œuvre

Le déploiement configure les objets Kubernetes nécessaires aux services, les probes de liveness et readiness, ainsi que la chaîne StorageClass, PersistentVolume et PersistentVolumeClaim. Les services sans état peuvent être distribués entre les workers, tandis que MongoDB conserve une identité et un volume stables grâce au StatefulSet. L'ingress Nginx fournit le point d'entrée de l'application.

## Résultats et livrables

Le dépôt documente un cluster à trois nœuds capable d'héberger les composants Fleetman avec messagerie, service à état, configuration externalisée, contrôles de santé et persistance. La présentation Fleetman constitue le livrable de synthèse de l'architecture et du déploiement.

## Enseignements

Ce travail met en évidence la différence entre workloads avec et sans état, le rôle des probes dans l'exploitation d'un cluster et la nécessité de concevoir ensemble orchestration, réseau, configuration et stockage.
