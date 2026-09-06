---
title: "Azure virtual networks and cloud"
subtitle: "From local VMs to inter-region peering"
description: "VirtualBox VMs, Azure deployment and interconnection of regional virtual networks."
year: 2025
category: "Cloud"
tags: ["Azure", "VirtualBox", "Linux", "VNet", "Peering"]
featured: false
number: "09"
metrics:
  - { value: "3", label: "VM Ubuntu locales" }
  - { value: "3", label: "phases d'étude" }
locale: "en"
translationKey: "project.azure-virtual-networks"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "Azure virtual networks and cloud report"
    type: "report"
    url: "/documents/azure-virtual-networks/azure-virtual-networks-report.pdf"
---

## Context and objective

The project studies virtual networking progressively, first in a VirtualBox lab and then in Microsoft Azure. It establishes Linux connectivity on local private networks, transfers those principles to Azure VNets and extends communication across regions.

## Architecture

The local lab contains three Ubuntu virtual machines with interfaces for Internet access and host-private networking. In Azure, two Ubuntu Linux or Windows Server machines are placed in private virtual networks inside a resource group. Peering then connects VNets in different regions, while security rules determine allowed traffic.

## Implementation

The VirtualBox VMs are created, their interfaces configured, and local and Internet connectivity verified. The Azure section covers subscription setup, resource-group creation, server deployment, VNets and access rules. The final scenario configures cross-region VNet peering and verifies communication between remote resources.

## Results and deliverables

The “Virtual Networks & Clouds” report documents the three local Ubuntu environments, the two-server Azure infrastructure and VNet interconnection. It records connectivity checks and the security settings required for traffic to flow.

## Lessons learned

The project connects interface, private-network, routing and filtering concepts across a local lab and public cloud. It also shows that peering provides a network path, but effective communication still depends on security rules applied to the resources.
