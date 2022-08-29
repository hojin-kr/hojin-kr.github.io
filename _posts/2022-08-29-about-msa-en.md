---
layout: post
title: Service Mesh Architecture (GCP) Concepts
tags: [container,kubernetes,msa]
---

# Service Mesh Architecture (GCP) Concepts

What is Service Mesh Architecture?
In Micro Service Architecture, a number of services are composed of a network structure, and the need to manage them arises. This is an advanced architecture that focuses on integrated management of services.
→ Service Mesh Structure → Service Mesh

![](/assets/img/3FA0C899-E390-4422-890E-A20D3E31DDE7.png)￼

purpose
By deploying a proxy in every part of the service mesh structure, it manages and logs all parts of communication between services and contributes to deployment management, monitoring, and security improvement.
traffic management
Management of traffic between services
• Control of distribution methods such as canary, blue green, etc. between distributions
Observability insights
• Visualization of traffic between services Utilizing metrics such as Monitoring, Logging, and Trace, all traffic can be managed centrally through the Service Mesh Control pane
Security benefits
• Automatic application of TLS (an improved security protocol of SSL) for each section by communicating through proxy between internal services (controlled by istio)
type
Istio
Representative Open Source Service Mesh Software
https://istio.io/
Anthos Service Mesh
Service Mesh Software developed based on istio can be used on-premises or fully managed by GCP

About GCP Anthos below

Anthos provides three types according to the management type.
• In-cluster control plane
Use the Control Plane by placing it inside the cluster.

![](/assets/img/C1D37322-D59C-47E1-A4DA-DFD2E651F467.png)_

• Managed Anthos Service Mesh
With fully managed Anthos Service Mesh provided by GCP, Google manages updates, scaling, and security, and minimizes user management.

![](/assets/img/51A641C3-1AF1-4BF8-945F-FBD5932C198C.png)￼￼

• Include Compute Engine VMs in the service mesh
It is a GCP preview feature that allows you to use Anthos Service Mesh for GCP Managed Instance Groups (MIGs) other than GKE environments.
→ MIG (GCP has a service that groups VM instances and uses them)
Reference
https://cloud.google.com/service-mesh/docs/overview