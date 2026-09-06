---
title: "AWS Cloud Architect — Capstone"
subtitle: "Architecture résiliente issue d'AWS Academy"
description: "Conception multi-AZ avec IAM, VPC, EC2, Auto Scaling, S3, EBS et bastion."
year: 2025
category: "Cloud"
tags: ["AWS", "IAM", "VPC", "EC2", "Auto Scaling"]
featured: false
number: "17"
metrics:
  - { value: "2", label: "zones de disponibilité" }
  - { value: "3", label: "piliers d'architecture" }
locale: "fr"
translationKey: "project.aws-cloud-architect"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Rapport technique final du projet AWS"
    type: "report"
    url: "/documents/aws-cloud-architect/aws-capstone-technical-report.pdf"
---

## Contexte et objectif

Ce capstone AWS Academy demande de concevoir une infrastructure cloud résiliente et sécurisée. L'objectif est d'organiser les identités, le réseau, le calcul et le stockage selon les bonnes pratiques d'architecture AWS, avec une attention portée à la disponibilité, au moindre privilège et aux coûts.

## Architecture

La solution s'appuie sur un VPC réparti sur deux zones de disponibilité, avec sous-réseaux publics et privés, règles de Security Groups et sortie contrôlée par NAT Gateway. Les instances EC2 sont intégrées à un groupe Auto Scaling ; le stockage mobilise S3 et EBS. L'administration repose sur des rôles et politiques IAM ainsi que sur un bastion pour éviter d'exposer directement les ressources privées.

## Mise en œuvre

Le travail structure d'abord le plan réseau et les flux autorisés, puis associe à chaque composant les permissions IAM minimales. Les instances et volumes sont provisionnés dans les sous-réseaux adaptés, et l'Auto Scaling est configuré pour maintenir le service sur plusieurs zones. Les choix de stockage distinguent données objet et volumes attachés.

## Résultats et livrables

Le livrable est un rapport technique final du capstone AWS Academy Cloud Architecting. Il présente une architecture multi-AZ combinant segmentation VPC, contrôle d'identité, EC2, Auto Scaling, S3, EBS et bastion, ainsi que les considérations de sécurité, disponibilité et optimisation des coûts.

## Enseignements

Le projet montre qu'une architecture cloud ne se réduit pas au déploiement d'instances : la résilience dépend du placement multi-AZ, la sécurité du découpage réseau et d'IAM, et l'exploitation d'un choix cohérent entre calcul, stockage et accès administratifs.
