---
layout: doc
---
# History
## Contact
[Linkedin](https://www.linkedin.com/in/hojin-jang-221aa3198)

## 경력
### WEMADE PLAY (SundayToz) 2020.02 ~        
소속팀 : DevOps(서버 운영 및 개발), TentPole (기반 기술 개발 및 선진 기술 연구)

- AWS, GCP 클라우드 인프라 아키텍쳐 구성 및 유지보수
    - 약 5천만 유저 데이터베이스 유지 관리
    - 일간 액티브 유저 10만 이상 웹 서버 운영
    - TPS 1,000 이상의 서비스 구성 및 운영
- PHP 서버 개발
- Golang 서버 개발
- 데이터레이크 구성 및 비즈니스 인텔리전트(BI) 연동 & 운영
- PHP 게임 서버 개발및 서버 운영 유저 문의 (CS) 대응
- 서버 인프라를 Container 기반의 Full Managed 서비스로 전환(GCP Compute Engine)
- 쿠버네티스 환경의 서비스 구성 및 운영 트러블 슈팅 및 문제 해결
- 다양한 유즈케이스의 클라우드 컴퓨팅 환경 구성
- 로그기반 데이터를 통한 이상 탐지 및 클라우드 모니터링 알람 구성

## 운영 아키텍처
### GCP
- GKE (Full Game Server)
![FullGameServerGCP-2023-07-18-0045](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/d097a391-0337-4815-83bd-733b72ee77f0)   
GCP의 서비스를 사용하는 서버 아키텍처.
정적 자원의 경우, GCS로 제공되며, CDN과 부하의 균형을 맞추고, 에지 로케이션 서비스로 적은 지연시간을 제공합니다.
게임 서버는 GKE로 매니지드되는 K8S를 통해 부하를 배포하고 다양한 배포 정책을 지원합니다.
또한, Memorystore memcache는 대분의 Get 요청에 대한 낮은 대기 시간을 보장하고 데이터베이스에 대한 부하의 균형을 맞추기 위해 각 데이터베이스의 전면에 배치됩니다.

- CloudRun (CloudRun - VPC Connector - Memorystore - Stackdriver - logbase metric - alert & monitoring)
- Instance Group Compute Engine (Simple Web Server)

### AWS
- EC2 AMI Base Instance Group Web Server
- S3 Static Web Service

### 사내 연구 및 발행 아티클
- GitHub Action에 대한 기초 및 CI/CD 샘플
- 복수의 EC2 머신을 사용한 신규 서비스 로드 테스트
- docker desktop에서의 rancher desktop 전환
- k8s에 대해서 기본 개념과 특성
- Kubernetes 배포 툴(Helm & Kustomazation) 테스트 및 차이점
- GCP에서의 InstanceGrup을 사용한 서비스 구축
- AWS DynamoDB의 속성 크기와 성능 관계 분석 및 시스템 개선


## 참여한 게임 프로젝트
- 애니팡1 https://url.tl-dr.in/anipang
    - 유지보수 및 개발
    - 5천만 국민 게임 애니팡

![image](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/f0532084-e6ad-413f-bc3b-98c752b5add8)

- 애니팡3 https://url.tl-dr.in/anipang3
    - 유지보수 및 개발
    - 애니팡의 3번째 시리즈 다양한 기믹과 이벤트
    
![image](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/278d248e-437a-4b8f-8331-85b07cebae01)
    
- 유메이로가든 (러브레시피,pastelgarden,yumeirogarden,Lovey-Buddy) https://url.tl-dr.in/yumeiro
    - 신규 개발 및 런칭
    - 실시간 3D SNG    
  
![image](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/f115e671-f987-4549-beac-8c7597ea0b5d)

- 사내 AI 이미지 생성 툴 개발
    - GCP 인프라의 컴퓨팅 환경
    - PHP 서버와 Stable Difuttion Web UI 연동 및 서비스 개발
      
- 전사 통합 쿠폰 서비스 개발
    - 전사 통합 쿠폰 입력 서비스 개발
    - Golang 서버
    - AWS 호스팅
    - EC2 배포 파이프라인 구성



## Certification
### Professional Cloud DevOps Engineer

Professional Cloud DevOps Engineers implement processes throughout the systems development lifecycle using Google-recommended methodologies and tools. They build and deploy software and infrastructure delivery pipelines, optimize and maintain production systems and services, and balance service reliability with delivery speed.   
The Professional Cloud DevOps Engineer exam assesses your ability to:   
    - Bootstrap a Google Cloud organization for DevOps   
    - Apply site reliability engineering practices to a service   
    - Optimize service performance   
    - Build and implement CI/CD pipelines for a service   
    - Implement service monitoring strategies  

![abu5vp1m](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/2af5a620-a9bb-4497-bbe8-44867c9c9dd7)   
![abu5vp1m_1689379949550_badge](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/d64e5e62-edb0-4854-821e-4e0619d53592)   
   
https://www.credential.net/d63ce8d4-ea49-4e43-a945-0d37497b3931

## 활동
![image](https://github.com/hojin-kr/hojin-kr.github.io/assets/22079767/98700af7-55aa-4f30-b037-344cb2d19b3d)   
   
https://www.credential.net/b322cea5-0271-4ac9-a98c-7120a3aa53fd

