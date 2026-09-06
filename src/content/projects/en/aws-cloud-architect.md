---
title: "AWS Cloud Architect — Capstone"
subtitle: "A resilient AWS Academy architecture"
description: "A multi-AZ design using IAM, VPC, EC2, Auto Scaling, S3, EBS and a bastion host."
year: 2025
category: "Cloud"
tags: ["AWS", "IAM", "VPC", "EC2", "Auto Scaling"]
featured: false
number: "17"
metrics:
  - { value: "2", label: "zones de disponibilité" }
  - { value: "3", label: "piliers d'architecture" }
locale: "en"
translationKey: "project.aws-cloud-architect"
school: "SUPINFO Paris"
readingTime: "3 min"
documents:
  - title: "Final AWS capstone technical report"
    type: "report"
    url: "/documents/aws-cloud-architect/aws-capstone-technical-report.pdf"
---

## Context and objective

This AWS Academy capstone focuses on designing a resilient and secure cloud infrastructure. The objective is to organize identity, networking, compute and storage according to AWS architectural practices, with explicit attention to availability, least privilege and cost.

## Architecture

The solution uses a VPC spanning two Availability Zones, with public and private subnets, Security Group rules and controlled outbound access through a NAT Gateway. EC2 instances belong to an Auto Scaling group, while storage uses S3 and EBS. Administration relies on IAM roles and policies and a bastion host so private resources do not need direct exposure.

## Implementation

The work first defines the network plan and allowed traffic, then assigns minimum IAM permissions to each component. Instances and volumes are provisioned in the appropriate subnets, and Auto Scaling is configured to maintain the service across zones. Storage choices distinguish object data from attached block volumes.

## Results and deliverables

The deliverable is the final technical report for the AWS Academy Cloud Architecting capstone. It documents a multi-AZ architecture combining VPC segmentation, identity controls, EC2, Auto Scaling, S3, EBS and a bastion, together with security, availability and cost considerations.

## Lessons learned

The project demonstrates that cloud architecture is more than launching instances: resilience depends on multi-AZ placement, security on both network segmentation and IAM, and operability on coherent compute, storage and administrative-access choices.
