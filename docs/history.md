---
layout: doc
---
# History
## Contact
[Linkedin](https://www.linkedin.com/in/hojin-jang-221aa3198)

## 기여할 수 있는 역할

클라우드 서버에 대한 전반적인 기술을 다양하게 경험하였습니다. 다양한 포지션에 빠르게 적응할 수 있으며, 경험한 다양한 개발 및 라이브 운영 경험을 토대로 작업을 진행할 수 있습니다.


## 경력
### WEMADE PLAY (SundayToz) 2020.02 ~        

소속팀: DevOps(서버 운영 및 개발), TentPole(기반 기술 개발 및 선진 기술 연구)

담당 프로젝트:

게임 서버 DevOps: 애니팡, 애니팡3, 러브레시피
기타 웹 서버: 쿠폰 서비스, Gen AI 중계

업무:

- AWS, GCP 클라우드 인프라 아키텍처 구성 및 유지보수  
AWS 인프라를 활용하고, EC2에 Linux 기반으로 운영하는 서비스를 전반적으로 운영, 관리합니다. 전반적으로 운영, 관리한다는 것은 기존에 구성되어 있는 VPC 내 EC2와 데이터 레이크 구조를 이해하여 활용하고 있으며, 필요에 따라 신규 서비스를 위한 인프라를 구성할 수 있습니다. 단일 장애 지점이 될 수 있는 부분에 대해 예측하고, 문제 상황에 인스턴스를 장애 조치하거나 로드밸런서에서 리스너를 통해 트래픽을 차단하는 등의 조치를 할 수 있습니다. 또한,  트래픽 분산과 자원 효율 그리고 성능과 고가용성을 위한 RDS, Memcache, Redis 구성을 이해하고 있습니다.

- 국내 서비스로서 대규모 데이터베이스와 일간 트래픽 담당  
누적 사용자 데이터 5천만 이상과 일간 활성 사용자 약 10만 명 이상의 데이터를 처리하는 웹 서버를 담당하고, 지속적으로 개발 및 배포를 진행하고 있습니다. 트래픽에 따른 부하와 데이터 레이크 및 내부 BI를 고려한 설계를 파악하고 있습니다. 또한, 개발 및 배포 운영 과정에서 발생할 수 있는 영향을 예측하고 관리합니다. 실제 개발 및 배포를 담당하기 때문에 클라이언트나 기획 파트와 같은 다른 파트와 일정 관리와 의견 조율도 많은 경험이 있습니다.

- PHP 서버 개발 
PHP를 사용하는 Linux 환경의 서버를 원하는 요구사항에 맞춰 설정할 수 있습니다. PHP-FPM 구조에서의 php.ini 및 config.ini 설정에 대해 이해하여 인프라를 세팅하며 문제점을 찾아 해결합니다. PHP 7.x 버전을 주로 사용하며 PSR에 맞춰 작업하는 것을 추구하지만, PHP의 유연한 특성에 따라 다양한 상황에 적응한 작업을 지향합니다. 또한, 현대화의 일환으로 PHP와 Nginx 조합으로 컨테이너화를 진행하여 글로벌 서비스를 진행한 경험이 있습니다.

- Golang 서버 개발
Golang을 통한 토이 프로젝트 진행 및 사내 Golang 프레임워크 개발에 참여하였습니다. 높은 수준의 이해는 없지만, 기본적인 작업을 경험하고 있으며, Golang의 경량화된 동시성 처리와 강직하면서도 유연함에 관심을 가지고 스터디를 지속하고 있습니다.

- 목적에 따른 아키텍처 이전 작업 및 신규 구성  
AWS에서 GCP로 서비스를 이전하거나, 기존 아키텍처의 취약한 부분으로 인해 신규 아키텍처로 변경하는 작업을 진행합니다. 서비스 엔드포인트는 유지한 상태로 서버 구성만 이전하는 계획을 수립하고 이전을 진행했습니다. 시니어 작업자와 함께 진행했습니다. 대표적인 사례는 AWS EKS 서비스를 GCP Container BootDisk를 가지는 Compute Engine으로 이전, GCP GKE의 서비스를 GCP CloudRun으로 변경 등이 있습니다.

- 쿠버네티스 환경 구성 및 개발 운영  
쿠버네티스를 게임 서버에 사내 최초로 도입하여 적용하는 작업을 시니어 작업자와 함께 진행했습니다. K8S를 위한 개발, 스테이징, 프로덕션 구성부터 CI/CD 구성 전반에 걸쳐 설계 및 구성을 진행했습니다. 사내 첫 프로젝트로서 프레임워크에 대한 컨테이너화, 현대화를 진행하며 K8S 도입을 위한 툴 도입을 위한 테스트 및 구성을 진행했습니다. Kustomize, ArgoCD, Helm 등 다양한 CI/CD 툴을 테스트하였고, 내부 사정으로 인해 Bash Shell을 통해 통합 및 배포를 스크립트로 작성하고, kubectl로 직접 쿠버네티스에 접근하여 리소스 상태를 확인하고 장애 상황을 대응하는 방식으로 운영했습니다. 지금 생각하면 가장 손이 많이 가는 방식이었지만, 가장 쿠버네티스를 직접, 가깝게 운영할 수 있었던 좋은 경험이었습니다. 실제 라이브 상황에서 어피니티 태그를 붙이고 자원 사용을 격리시키며 노드 top으로 사용량을 확인하며 날것의 쿠버네티스를 라이브로 경험했습니다.

- Gen AI 프로젝트 진행  
Gen AI 내부 프로젝트를 진행하고 있습니다. LangChain을 통해 간단한 프로젝트부터 진행하고 있습니다. Gen AI는 키가 되는 내부 작업에 대한 공유는 어렵습니다.


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


## 재밌는 개인 프로젝트
[Go-GRPC-GCP-AI](https://github.com/tldr-development/go-grpc)
- Go랭과 GRPC 그리고 MSA를 지향하는 아키텍처를 구성해보고 싶어서 시작한 프로젝트
- 각 서비스는 하나의 Container로 빌드되며 CloudRun으로 배포
- 데이터는 Datastore로 모든것을 커버한다.
- CloudRun - Datastore 구성을 가져가는 이유는 기본 유지 비용이 들어가지 않는 것과 뛰어난 확장 가능성
- GCP 관리형 LLM 서비스인 Vertex AI Gemini 사용
- 로케일에 대한 처리와 언어 지원을 위해 클라이언트측에 많은 기능을 넣고 Prompt또한 클라이언트에서 전달받아 사용하는 형태로 작업하여 서버는 받아 쓴다.
- gemini-1.0-pro-001를 사용하며 구현부는 [여기](https://github.com/tldr-development/go-grpc/blob/94f70bf4f9c7212f1bd6e1105f319396ec0246c4/inspire/inspire.go#L229C1-L230C1)
- 이때는 Go랭 작업에 있어서 코파일럿의 도움을 많이 받았다.
- [저장소](https://github.com/tldr-development/go-grpc)

[LLM 인터뷰 질문 생성](https://i.tl-dr.in)
- GCP의 관리형 LLM 서비스 초기 VertexAI의 PaLM 2로 개발
- 직군에 따른 인터뷰 예상 질문과 답변을 생성
- LangChain이나 Rag의 개념 없이 단순하게 LLM을 단순하게 사용
- 이때는 랭체인 존재도 몰랐다.
- [저장소](https://github.com/hojin-kr/vertexai_interview)

[단축URL](https://url.tl-dr.in)
- 단축 URL 서비스가 계속 사라지고 있어서 내꺼 가지려고 만든 프로젝트
- 운영 비용이 들지 않을것이 주요 컨셉
- GCP AppEngin, DataStore로 구성하여 기본 할당량에서는 유지비용이 발생하지 않도록 구성
- 또한, PHP와 GCP AppEngine 조합으로 얼마나 서비스 하나를 쉽고 빠르게 개발 할 수 있는지 보고 싶었다.
- 실제로 필요한거만 빠르게 개발했고, 핵심 기능 문제 없이 잘 작동한다.
- [저장소](https://github.com/hojin-kr/url)

[타임스탬프 컨버터](https://hojin-kr.github.io/timestampConverter/)
- 서버 작업을 하다보면 유닉스 타임스탬프의 데이트 변환이나 데이트의 타임스탬프 변환이 필요한데, 편리한 툴이 없어 만들었다.
- 프론트 기술이며 깃 페이지로 서비스
- [저장소](https://hojin-kr.github.io/timestampConverter/)

[안드로이드 빌드 자동화](https://github.com/hojin-kr/builder-unity-ci)
- 친구들과 안드로이드 앱 개발할 때 빌드서버를 무료로 쓰기 위해 깃 액션에 퍼블릭으로 구성
- 외부의 유니티 프로젝트 저장소에서 Pull 받아 빌드만 시키는게 컨셉이며, 트리거에 의해 자동으로 빌드및 배포되도록 구성

[공부중인 LangChain을 활용한 LLM 사용 능력 습득](https://github.com/hojin-kr/LangChain)
- LLM을 편리하게 사용할 수 있도록 개발된 LangChain에 대한 스터디
- 기본적으로 API로 퍼블릭 클라우드 인프라의 LLM에 구조화된 Prompt를 사용하기 위한 기반과 RAG, Vector-Store를 활용한 기능 사용 습득을 위함


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

