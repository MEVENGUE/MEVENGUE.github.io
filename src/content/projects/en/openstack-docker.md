---
title: "OpenStack and Docker"
subtitle: "Virtualization, private cloud and containers"
description: "Deploying OpenStack in a virtual environment, then operating Docker containers on Ubuntu."
year: 2025
category: "Cloud"
tags: ["OpenStack", "Docker", "Ubuntu", "VirtualBox"]
featured: false
number: "04"
metrics:
  - { value: "2", label: "plateformes" }
  - { value: "1", label: "topologie réseau" }
locale: "en"
translationKey: "project.openstack-docker"
school: "ECAM EPMI"
readingTime: "3 min"
documents:
  - title: "OpenStack and Docker report"
    type: "report"
    url: "/documents/openstack-docker/openstack-docker-report.pdf"
---

## Context and objective

This lab compares two virtualization layers: building cloud infrastructure with OpenStack and running isolated environments with Docker. Its objective is to practice the virtual-machine deployment cycle and then the image and container lifecycle on an Ubuntu server.

## Architecture or method

The first part uses VirtualBox to host a Linux machine on which OpenStack is installed. The OpenStack environment is organized into projects, users, templates and virtual networks with a visible network topology. The second part installs Docker on Ubuntu and examines images, containers and the namespaces providing isolation.

## Implementation

After deploying the Linux VM, OpenStack identity and network resources are created and templates are prepared for launching instances. On the Docker side, an Ubuntu image is imported and used to start containers in interactive and detached modes. Exercises also cover image, container and namespace management.

## Results and deliverables

The OpenStack & Docker report records installation, project and network configuration, topology inspection and Docker exercises. It makes the distinction between machine virtualization through a cloud platform and process isolation through containers concrete.

## Lessons learned

The project distinguishes the roles of a hypervisor, an IaaS platform and a container engine. It also shows that identity and networking are central OpenStack resources, while Docker focuses on images, container lifecycle and namespace-based isolation.
