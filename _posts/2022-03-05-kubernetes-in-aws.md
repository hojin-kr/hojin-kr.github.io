---  
layout: post
title: AWS & 쿠버네티스에 대해서
tags: [aws,container,kubernetes,eks]
---  

# 쿠버네티스에 대해서
서버 아키텍처의 현대화라고 한다면 컨테이너를 빼놓을 수 없게 되었습니다.  많은 개발과 서비스가 컨테이너 기반으로 이뤄지고있고, 컨테이너 기반에서 리소스를 더욱이 효율적으로 활용하기 위해서 컨테이너 오케스트레이션 시스템인 쿠버네티스가 개발되었습니다.

# 장점, 쿠버네티스를 채택하는 이유
- 자동 롤아웃, 롤백
	- 유연하게 내 어플리케이션의 배포를 관리할 수 있습니다. 다양한 배포 방식을 선택적으로 사용할 수 있으며 그에 따른 컨테이너 관리에 신뢰성있습니다.
- 서비스 디스커버리 및 로드밸런싱 (Service discovery and load balancing)
	- DNS및 서비스를 통해 들어오는 트래픽을 쿠버네티스가 내부 IP를 사용해 적절한 Pod에게 밸런싱하여 전달합니다.
- Secret 및  Config 관리
	- 각종 키 값 혹은 설정 파일을 쿠버네티스를 통해 신뢰성있게 적재하고 관리합니다.
- 수평 확장
	- 세밀하게 커스텀 가능한 스케일 인/아웃을 제공합니다.
- 마이크로 서비스 아키텍처(MSA)의 새로운 서비스 아키텍처로의 확장에 대한 바탕
	- MSA를 구성하기 위해  서비스 메시(서비스가 망사형 구조로 연결되는 형태를 지칭함) 구조의 서비스 세팅이 필요합니다. 서비스 메시 구조를 쿠버네티스에서 효율적이며 편리하게 구성이 가능합니다.
- 구글이 주도하고 이제는 모두가 기여하는 오픈소스 프로그램
	- 구글에서 시작한 오픈소스이지만 이제는 모두가 기여하는 오픈소스 프로그램으로 지금 이 순간에도 수많은 플러그인과 추가 개발이 이뤄지고 있습니다. 

# 쿠버네티스 블루프린트
쿠버네티스를 클라우드 프로바이더에 세팅하는 블루 프린트를 설명합니다. 
해당 블로그에는 과정을 설명하고 블루프틴트는 아래 깃에서 받아 사용합니다.
 #todo GitHub

## 기본 과정
#todo 과정에 따라 브랜치 분리
- AWS의 관리형 쿠버네티스
- 샘플 어플리케이션 배포
- 직접 컨테이너로 빌드한 어플리케이션 배포
- 지속 통합 및 지속 배포 (CI/CD)
	- AWS에 관련 서비스가 있는지 확인 #todo
	- 깃을 통해 통합 (GitOps)
	- GitHub Action 사용해서 신규 버전 릴리즈에 맞춰 자동 배포

##  고도화 과정
 #todo 과정에 따라 브랜치 분리
- 배포 환경 분리
	- 헬름 차트
- 다수의 서비스를 대상으로 지속 통합 및 지속 배포 CI/CD
	- GitOps + 아르고 CD
- 마이크로 서비스 아키텍처의 서비스 메시 구성
	- 복수의 서비스를 배포
	- 쿠버네티스용 서비스 메시 기술 이스티오(istio) 세팅
- 쿠버네티스 자원 모니터링
	- 프로메테우스 데이터 수집및 통합
	#todo 사운드 클라우드에서 자사 모니터링을 위해 개발한 도구
	- 그라파나 데이터 시각화

# 기본 과정
## AWS의 관리형 쿠버네티스
대표적인 쿠버네티스 서비스 프로바이더는 GCP와 AWS가 있습니다. 이 과정에서는 AWS의 관리형 쿠버네티스를 사용합니다.

### Elastic Kubernetes Service
[Elastic Kubernetes Service](https://ap-northeast-2.console.aws.amazon.com/eks/home?region=ap-northeast-2)
Fully managed Kubernetes control plane
EKS는 AWS의 완전 관리형 쿠버네티스 서비스입니다. 

> [Amazon EKS Workshop :: Amazon EKS Workshop](https://www.eksworkshop.com)  
> AWS EKS Workshop - AWS의 교육자료  

쿠버네티스틔 기본 아키텍처에서 AWS EKS를 사용하여 완전 관리형 Control Plane Node 서비스를 이용하며, EC2 환경에 Data Plane Worker Node를 사용합니다.

ECS(컨테이너 서비스), EKS(클러스터 서비스), ECR(컨테이너 레지스트리)의 조합으로 AWS에서 쿠버네티스를 구현합니다.

### AWS EKS를 위한 로컬 환경 설정
로컬 환경에서 AWS EKS와 소통하기위한 툴을 설치합니다.
> [Getting started with Amazon EKS - Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)  

### EKS에 클러스터를 생성합니다.
eksctl을 사용해서 관리형 EKS 클러스터를 생성합니다. 생성된 클러스터는 쿠버네티스 컨트롤 패널이 설치되어 세팅됩니다.

> eksctl을 사용하여 신규 관리형 클러스터를 생성하면 CloudFormation에 cluster를 추가하는 스택이 추가되어 동작합니다.   

```
➜  eks eksctl create cluster \
> --name eksctl-test-1 \
> --version 1.21 \
> --without-nodegroup 
2022-03-05 02:19:35 [ℹ]  eksctl version 0.86.0
2022-03-05 02:19:35 [ℹ]  using region ap-northeast-2
2022-03-05 02:19:35 [ℹ]  setting availability zones to [ap-northeast-2c ap-northeast-2a ap-northeast-2b]
2022-03-05 02:19:35 [ℹ]  subnets for ap-northeast-2c - public:192.168.0.0/19 private:192.168.96.0/19
2022-03-05 02:19:35 [ℹ]  subnets for ap-northeast-2a - public:192.168.32.0/19 private:192.168.128.0/19
2022-03-05 02:19:35 [ℹ]  subnets for ap-northeast-2b - public:192.168.64.0/19 private:192.168.160.0/19
2022-03-05 02:19:35 [ℹ]  using Kubernetes version 1.21
2022-03-05 02:19:35 [ℹ]  creating EKS cluster "eksctl-test-1" in "ap-northeast-2" region with 
2022-03-05 02:19:35 [ℹ]  if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=ap-northeast-2 --cluster=eksctl-test-1'
2022-03-05 02:19:35 [ℹ]  Kubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster "eksctl-test-1" in "ap-northeast-2"
2022-03-05 02:19:35 [ℹ]  CloudWatch logging will not be enabled for cluster "eksctl-test-1" in "ap-northeast-2"
2022-03-05 02:19:35 [ℹ]  you can enable it with 'eksctl utils update-cluster-logging --enable-types={SPECIFY-YOUR-LOG-TYPES-HERE (e.g. all)} --region=ap-northeast-2 --cluster=eksctl-test-1'
2022-03-05 02:19:35 [ℹ]  
2 sequential tasks: { create cluster control plane "eksctl-test-1", wait for control plane to become ready 
}
2022-03-05 02:19:35 [ℹ]  building cluster stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:19:36 [ℹ]  deploying stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:30:37 [ℹ]  waiting for CloudFormation stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:32:38 [ℹ]  waiting for the control plane availability...
2022-03-05 02:32:39 [✔]  saved kubeconfig as "/Users/hojin/.kube/config"
2022-03-05 02:32:39 [ℹ]  no tasks
2022-03-05 02:32:39 [✔]  all EKS cluster resources for "eksctl-test-1" have been created
2022-03-05 02:32:40 [ℹ]  kubectl command should work with "/Users/hojin/.kube/config", try 'kubectl get nodes'
2022-03-05 02:32:40 [✔]  EKS cluster "eksctl-test-1" in "ap-northeast-2" region is ready
```

### AWS CLI를 사용해서 kubectl config에 클러스터를 추가합니다.
```
# using aws cli add kubectl cluster
➜  eks aws eks --region ap-northeast-2 update-kubeconfig --name eksctl-test-1
Added new context arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1 to /Users/hojin/.kube/config
# checkout success add cluster
➜  eks kubectl config get-contexts
CURRENT   NAME                                                            CLUSTER                                                         AUTHINFO                                                        NAMESPACE
*         arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1   arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1   arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1   
          arn:aws:eks:ap-northeast-2:771148603266:cluster/test-1          arn:aws:eks:ap-northeast-2:771148603266:cluster/test-1          arn:aws:eks:ap-northeast-2:771148603266:cluster/test-1          
          iam-root-account@eksctl-test-1.ap-northeast-2.eksctl.io         eksctl-test-1.ap-northeast-2.eksctl.io                          iam-root-account@eksctl-test-1.ap-northeast-2.eksctl.io         
          minikube                                                        minikube                                                        minikube                                                        default
```

### 쿠버네티스 API를 사용해서 쿠버네티스 접근을 확인합니다.
추가된 클러스터의 쿠버네티스 컨트롤 패널로 API를 사용해 명령을 전달하고 반환을 확인합니다.
```
➜  eks kubectl get all
NAME                 TYPE        CLUSTER-IP   EXTERNAL-IP   PORT(S)   AGE
service/kubernetes   ClusterIP   10.100.0.1   <none>        443/TCP   8m43s
```

### eksctl 사용해서 노드그룹 추가

```
# 현재 eks에 세팅된 클러스터 조회
➜  eks eksctl get cluster
2022-03-05 02:37:22 [ℹ]  eksctl version 0.86.0
2022-03-05 02:37:22 [ℹ]  using region ap-northeast-2
NAME		REGION		EKSCTL CREATED
eksctl-test-1	ap-northeast-2	False
# 현재 특정 클러스터에 세팅된 노드그룹 조회
➜  eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 02:37:49 [ℹ]  eksctl version 0.86.0
2022-03-05 02:37:49 [ℹ]  using region ap-northeast-2
Error: No nodegroups found
# 클러스터에 노드그룹 추가
➜  eks eksctl create nodegroup \                   
--cluster eksctl-test-1 \
--region ap-northeast-2 \
--name test-group \
--node-type t2.micro \     
--nodes 1 \
--nodes-min 1 \
--nodes-max 1 \

2022-03-05 02:38:21 [ℹ]  eksctl version 0.86.0
2022-03-05 02:38:21 [ℹ]  using region ap-northeast-2
2022-03-05 02:38:21 [ℹ]  will use version 1.21 for new nodegroup(s) based on control plane version
2022-03-05 02:38:22 [ℹ]  nodegroup "test-group" will use "" [AmazonLinux2/1.21]
2022-03-05 02:38:22 [ℹ]  1 nodegroup (test-group) was included (based on the include/exclude rules)
2022-03-05 02:38:22 [ℹ]  will create a CloudFormation stack for each of 1 managed nodegroups in cluster "eksctl-test-1"
2022-03-05 02:38:22 [ℹ]  
2 sequential tasks: { fix cluster compatibility, 1 task: { 1 task: { create managed nodegroup "test-group" } } 
}
2022-03-05 02:38:22 [ℹ]  checking cluster stack for missing resources
2022-03-05 02:38:22 [ℹ]  cluster stack has all required resources
2022-03-05 02:38:23 [ℹ]  building managed nodegroup stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:38:23 [ℹ]  deploying stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:38:23 [ℹ]  waiting for CloudFormation stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:42:30 [ℹ]  no tasks
2022-03-05 02:42:30 [✔]  created 0 nodegroup(s) in cluster "eksctl-test-1"
2022-03-05 02:42:30 [ℹ]  nodegroup "test-group" has 1 node(s)
2022-03-05 02:42:30 [ℹ]  node "ip-192-168-16-191.ap-northeast-2.compute.internal" is ready
2022-03-05 02:42:30 [ℹ]  waiting for at least 1 node(s) to become ready in "test-group"
2022-03-05 02:42:30 [ℹ]  nodegroup "test-group" has 1 node(s)
2022-03-05 02:42:30 [ℹ]  node "ip-192-168-16-191.ap-northeast-2.compute.internal" is ready
2022-03-05 02:42:30 [✔]  created 1 managed nodegroup(s) in cluster "eksctl-test-1"
2022-03-05 02:42:30 [ℹ]  checking security group configuration for all nodegroups
2022-03-05 02:42:30 [ℹ]  all nodegroups have up-to-date cloudformation templates
```

###  추가된 노드그룹 조회
클러스터가 세팅되고, 노드그룹이 추가되었는지 확인합니다.

> Tip.  
> - CoreDNS에 의해 자동으로 내부 DNS가 생성된것을 확인할 수 있습니다.  
> - EC2 Dashboard에서 해당 인스턴스가 생성되어있는 것을 확인 할 수 있습니다.  

```
➜  eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 02:45:30 [ℹ]  eksctl version 0.86.0
2022-03-05 02:45:30 [ℹ]  using region ap-northeast-2
CLUSTER		NODEGROUP	STATUS	CREATED			MIN SIZE	MAX SIZE	DESIRED CAPACITY	INSTANCE TYPE	IMAGE ID	ASG NAME				TYPE
eksctl-test-1	test-group	ACTIVE	2022-03-04T17:39:11Z	1		1		1			t2.micro	AL2_x86_64	eks-test-group-78bfab01-c799-c778-37a7-5db5f421d37b	managed

➜  eks kubectl get node
NAME                                                STATUS   ROLES    AGE     VERSION
ip-192-168-16-191.ap-northeast-2.compute.internal   Ready    <none>   5m32s   v1.21.5-eks-9017834
```

##  어플리케이션 배포
테스트 어플리케이션을 배포해서 디플로이먼트와 서비스를 세팅하여 동작을 확인합니다.

```
# 샘플 어플리케이션 디플로이먼트 배포
➜  eks kubectl create deployment hello-node --image=k8s.gcr.io/echoserver:1.4
deployment.apps/hello-node created

# 배포된 샘플 어플리케이션에 대해 서비스를 연결
➜  eks kubectl expose deployment hello-node --type=LoadBalancer --port=8080
service/hello-node exposed

# 노출된 서비스 조회
➜  eks kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP                                                                    PORT(S)          AGE
hello-node   LoadBalancer   10.100.168.10   ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com   8080:31540/TCP   110s
kubernetes   ClusterIP      10.100.0.1      <none>                                                                         443/TCP          34m
```

### 이슈 발생 및 해결
샘플 어플리케이션의 상태가 `pendding` 상태에서 `running` 으로 전환되지 않습니다. 원인을 파악하기 위해 쿠버네티스의 이벤트를 확인합니다. 
```
# 쿠베네티스 이벤트 조회
➜  eks kubectl get events
LAST SEEN   TYPE      REASON                    OBJECT                                                   MESSAGE
4m42s       Warning   FailedScheduling          pod/hello-node-7567d9fdc9-rksz5                          0/2 nodes are available: 1 Too many pods, 1 node(s) were unschedulable.
44s         Warning   FailedScheduling          pod/hello-node-7567d9fdc9-rksz5                          0/1 nodes are available: 1 Too many pods.
36m         Normal    SuccessfulCreate          replicaset/hello-node-7567d9fdc9                         Created pod: hello-node-7567d9fdc9-qxxqt
```

신규 pod을 생성하는 스케쥴을 수행중에 노드에 너무 많은 pod을 생성 시도하여 실패한것으로 확인됩니다.
노드 그룹 생성시 노드 타입을 t2.micro로 저성능에 노드 개수를 1개로 제한하여 생성하였으나, 쿠버네티스의 충분한 자원 확보를 위해서 노드의 스케일을 변경합니다.

```
# 노드그룹의 노드 개수를 2개로 수정
➜  eks eksctl scale nodegroup \                                                                     
--cluster eksctl-test-1 \
--name test-group \
--nodes 2 \
--nodes-max 2

# 노드그룹 수정 확인
➜  eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 03:43:45 [ℹ]  eksctl version 0.86.0
2022-03-05 03:43:45 [ℹ]  using region ap-northeast-2
CLUSTER		NODEGROUP	STATUS	CREATED			MIN SIZE	MAX SIZE	DESIRED CAPACITY	INSTANCE TYPE	IMAGE ID	ASG NAME				TYPE
eksctl-test-1	test-group	ACTIVE	2022-03-04T17:39:11Z	1		2		2			t2.micro	AL2_x86_64	eks-test-group-78bfab01-c799-c778-37a7-5db5f421d37b	managed

# pod의 상태 조회
➜  eks kubectl get pods
NAME                          READY   STATUS    RESTARTS   AGE
hello-node-7567d9fdc9-4s7qh   1/1     Running   0          17m
```

### 노출된 EXTERNAL-IP를 사용해서 접속 테스트
```
# 노출된 서비스 조회
➜  eks kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP                                                                    PORT(S)          AGE
hello-node   LoadBalancer   10.100.168.10   ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com   8080:31540/TCP   45m
kubernetes   ClusterIP      10.100.0.1      <none> 

# 노출된 서비스의 외부 IP로 접속 테스트
➜  eks curl http://ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com:8080
CLIENT VALUES:
client_address=192.168.17.54
command=GET
real path=/
query=nil
request_version=1.1
request_uri=http://ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com:8080/

SERVER VALUES:
server_version=nginx: 1.10.0 - lua: 10001

HEADERS RECEIVED:
accept=*/*
host=ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com:8080
user-agent=curl/7.77.0
BODY:
-no body in request-% 
```

### 현재 쿠버네티스의 상태를 조회
```
➜  eks kubectl get all
NAME                              READY   STATUS    RESTARTS   AGE
pod/hello-node-7567d9fdc9-4s7qh   1/1     Running   0          87s

NAME                 TYPE           CLUSTER-IP      EXTERNAL-IP                                                                    PORT(S)          AGE
service/hello-node   LoadBalancer   10.100.168.10   ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com   8080:31540/TCP   28m
service/kubernetes   ClusterIP      10.100.0.1      <none>                                                                         443/TCP          61m

NAME                         READY   UP-TO-DATE   AVAILABLE   AGE
deployment.apps/hello-node   1/1     1            1           87s

NAME                                    DESIRED   CURRENT   READY   AGE
replicaset.apps/hello-node-7567d9fdc9   1         1         1       87s
```

## 직접 컨테이너로 빌드한 어플리케이션 배포
#todo



#blog/draft
