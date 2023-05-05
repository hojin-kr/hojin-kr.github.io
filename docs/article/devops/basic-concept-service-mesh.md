---
layout: post
title: Service Mesh Architecture (GCP) 개념
---

# Service Mesh Architecture (GCP) 개념

Service Mesh Architecture 란
Micro Service Architecture에서 다수의 서비스가 망사구조로 구성되며 이를 관리할 필요성이 대두되며 발전한 아키텍처로 Service에 대해 통합 관리하는데에 촞점이 맞춰진 아키텍처

## 서비스 망사 구조 → Service Mesh

![](/assets/img/3FA0C899-E390-4422-890E-A20D3E31DDE7.png)￼

## 목적
서비스 메시 구조의 모든 부분에 Proxy를 배치하여 서비스간 통신 모든 부분에 대해 관리, 로깅하며 배포관리, 모니터링, 보안성 향상에 기여함
### Traffic management
서비스간 트래픽에 대해 관리
	•	배포간에 카나리, 블루그린등 배포 방식 컨트롤
### Observability insights
	•	서비스간 트래픽에 대해 가시화 Monitoring, Logging, Trace등 Metrics 활용, 모든 트래픽이 Service Mesh Control pane를 통함으로 중앙 관리가 가능
### Security benefits
	•	내부 Service 간 Proxy를 통해 통신함으로 구간별 암호화 TLS (SSL의 개선 보안 프로토롤) 자동 적용 (istio에 의해 컨트롤)

## 종류
Istio
대표적인 Open source Service Mesh Software
https://istio.io/
Anthos Service Mesh
istio를 기반으로 개발된 Service Mesh Software로 on-premises로 사용하거나 GCP의 완전 관리형 사용 가능

## 이하 GCP Anthos에 대해

Anthos는 관리 형태에 따라 세가지 타입을 제공함
- In-cluster control plane
클러스터 내부에 Control Plane을 위치해서 사용

![](/assets/img/C1D37322-D59C-47E1-A4DA-DFD2E651F467.png)￼

- Managed Anthos Service Mesh
GCP에서 제공하는 완전 관리형 Anthos Service Mesh 로 구글에서 업데이트, 스케일링, 보안에 대해 관리해주며, 유저 관리를 최소로함

![](/assets/img/51A641C3-1AF1-4BF8-945F-FBD5932C198C.png)￼￼

- Include Compute Engine VMs in the service mesh
GKE 환경이 아닌 GCP Managed Instance Groups(MIGs)에 대해 Anthos Service Mesh를 사용 할 수 있도록 하는 GCP preview기능으로 현재는 다루지 않아도 될것으로 생각됨
MIG (GCP에 VM 인스턴스를 그룹으로 묶어서 사용하는 서비스가 있음)

## 참조
https://cloud.google.com/service-mesh/docs/overview