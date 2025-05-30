# EC2 기반 아키텍처에서의 AWS CodePipeline을 통한 배포 구성

## 문제 정의

프로젝트와 담당자별로 일관되지 않은 배포 환경과 프로세스로 인해 프로젝트 교체나 담당자 변경 시 일관성 있는 배포 환경을 보장하기 어려웠습니다.

## 개요

태그 기반의 EC2 인스턴스에 대해 구성원이 일관된 배포 환경을 마련하고, 자동화된 지속 배포(CD) 환경을 구축했습니다. 이를 통해 프로젝트 담당자가 변경되더라도 일관적인 방법으로 서버에 코드를 배포할 수 있게 되었습니다.

![image.png](aws-codepipeline-deploy-to-ec2/image.png)

## 배경 지식

AWS CodePipeline은 소프트웨어 배포를 자동화할 수 있는 CI/CD 서비스입니다. EC2 인스턴스와 AWS 시스템 매니저(SSM)를 활용하여 배포의 일관성을 보장할 수 있습니다.

## 작업 내용

이 문서에서는 EC2 인스턴스에 대한 자동화된 배포 파이프라인을 AWS CodePipeline을 사용하여 구성하고 그 과정을 설명합니다.

### 사용 AWS 서비스 및 역할

#### CodePipeline

- **역할**: 자동으로 코드를 가져와서 빌드하고 배포하는 역할을 수행합니다.
  - **Github 저장소 감지**: 특정 브랜치에 푸시 또는 PR이 발생했을 때 트리거됩니다.
  - **배포 프로세스 관리**: 새로운 코드 버전을 EC2 인스턴스에 배포합니다.
  - **S3 사용**: 최신 코드를 S3에 업로드 후 EC2가 이를 다운로드하여 배포합니다.

#### SSM (AWS Systems Manager)

- **역할**: EC2 인스턴스와 AWS 서비스 간의 원격 명령 실행 및 관리 기능을 수행합니다.
  - EC2 인스턴스 접근: 외부에서 직접 접근할 수 없는 EC2에 AWS SSM 서비스를 통해 명령을 전합니다.

이 과정에서 주체별 역할을 정리하면 다음과 같습니다.

| **단계** | **주체** | **작업 내용** |
| --- | --- | --- |
| 1 | 개발자 | GitHub에 코드 푸시 |
| 2 | CodePipeline | 코드 변경 감지 후 S3에 업로드 |
| 3 | CodePipeline | SSM을 통해 EC2에 배포 요청 |
| 4 | SSM | EC2의 ssm-agent에 명령 전달 |
| 5 | EC2 (ssm-agent) | S3에서 코드 다운로드 및 배포 |


### AWS 배포 자동화 작업 흐름

![image.png](aws-codepipeline-deploy-to-ec2/image.png)

#### 1. GitHub에 코드 푸시

- GitHub 특정 브랜치에 코드 변경이 발생하면, CodePipeline이 자동으로 시작됩니다.

#### 2. CodePipeline의 S3 업로드

- Pipeline이 실행되며, 소스 코드를 S3 버킷에 업로드하여 준비합니다.

#### 3. CodePipeline의 SSM을 통한 EC2 배포 요청

- CodePipeline이 EC2에 직접 접속하는 대신 SSM을 통해 안전하게 명령을 전달합니다.

#### 4. SSM이 EC2 내 ssm-agent를 통해 명령 실행

- EC2 내 `amazon-ssm-agent`가 SSM 명령을 받고, 이를 기반으로 S3에서 최신 배포 파일을 다운로드하고, 배포 및 서비스 재시작을 처리합니다.

### 작업 수행 단계

1. **CodePipeline 생성**
   - Github와 연결하고, 코드 변경 시 트리거되도록 설정합니다.
   - EC2 인스턴스는 태그 기반으로 배포 대상을 지정합니다.

2. **권한 설정**
   - CodePipeline 기본 롤에 S3 및 EC2 목록 조회 권한을 추가합니다.
   - EC2 인스턴스에 SSM 관리 권한(`SSMInstancCore`)을 부여하고 롤을 지정하여 시스템 관리 지원을 활성화합니다.

3. **배포 수행**
   - CodePipeline이 트리거되어 S3에 코드를 업로드하고, SSM을 통해 EC2 인스턴스로 배포합니다.

이 과정은 DevOps의 원활한 환경 제공을 목표로 합니다. 이를 통해 배포 과정의 자동화와 일관성을 확보하게 됩니다.



KeyWords: AMI, AWS, CI/CD, Cloud, CodePipeline, EC2, IAM, Lambda, S3, aws-ssm-agent
SubType: CI/CD
Type: DevOps