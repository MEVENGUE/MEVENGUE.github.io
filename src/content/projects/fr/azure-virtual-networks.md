---
title: "Réseaux virtuels et cloud Azure"
subtitle: "Des VM locales au peering inter-régions"
description: "Création de VM VirtualBox, déploiement Azure et interconnexion de réseaux virtuels régionaux."
year: 2025
category: "Cloud"
tags: ["Azure", "VirtualBox", "Linux", "VNet", "Peering"]
featured: false
number: "09"
metrics:
  - { value: "3", label: "VM Ubuntu locales" }
  - { value: "3", label: "phases d'étude" }
locale: "fr"
translationKey: "project.azure-virtual-networks"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Rapport sur les réseaux virtuels et le cloud Azure"
    type: "report"
    url: "/documents/azure-virtual-networks/azure-virtual-networks-report.pdf"
---

## Contexte et objectif

Le projet étudie progressivement les réseaux virtuels, d'abord dans un laboratoire VirtualBox puis dans Microsoft Azure. Il vise à établir la connectivité de machines Linux sur des réseaux locaux privés, à transposer ces principes dans des VNet Azure et à étendre la communication entre régions.

## Architecture

Le laboratoire local comprend trois machines virtuelles Ubuntu dotées d'interfaces permettant l'accès Internet et les échanges sur des réseaux privés d'hôte. Dans Azure, deux serveurs Linux Ubuntu ou Windows Server sont placés dans des réseaux privés virtuels au sein d'un groupe de ressources. Un peering relie ensuite des VNet situés dans des régions différentes ; les règles de sécurité déterminent les flux autorisés.

## Mise en œuvre

Les VM VirtualBox sont créées, leurs interfaces configurées et la connectivité locale et Internet vérifiée. La partie Azure couvre la souscription, le groupe de ressources, le déploiement des serveurs, les VNet et les règles d'accès. Le scénario final configure le peering inter-régions et contrôle la communication entre ressources distantes.

## Résultats et livrables

Le rapport « Réseaux Virtuels & Clouds » documente les trois environnements Ubuntu locaux, l'infrastructure Azure à deux serveurs et l'interconnexion de VNet. Il rassemble les vérifications de connectivité et les paramètres de sécurité nécessaires au fonctionnement des échanges.

## Enseignements

Le projet relie les notions d'interface, de réseau privé, de routage et de filtrage entre laboratoire local et cloud public. Il montre également que le peering fournit le chemin réseau, mais que la communication effective dépend encore des règles de sécurité appliquées aux ressources.
