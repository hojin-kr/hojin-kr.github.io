---  
layout: post
title: About Kubernetes
tags: [aws,container,kubernetes,eks]
---  

# About Kubernetes
Containers have become indispensable when it comes to modernizing server architecture. Many developments and services are based on containers, and Kubernetes, a container orchestration system, has been developed to more efficiently utilize resources based on containers.

# Advantages, reasons to adopt Kubernetes
- Automatic rollout, rollback
- You can flexibly manage the distribution of your applications. Various deployment methods are optional and reliable for container management.
- Service discovery and load balancing
- Traffic coming through DNS and services is balanced and forwarded by Kubernetes to the appropriate Pods using internal IPs.
- Secret and Config management
- Reliably load and manage various key values ​​or configuration files through Kubernetes.
- horizontal scaling
- Provides finely customizable scale in/out.
- The basis for the extension of microservices architecture (MSA) to new service architectures
- To configure MSA, service setting of service mesh (referring to the form in which services are connected in a mesh structure) is required. The service mesh structure can be configured efficiently and conveniently in Kubernetes.
- An open source program led by Google and now everyone contributes
- It is an open source started by Google, but now it is an open source program that everyone contributes, and even at this moment, many plug-ins and additional development are being made.

# Kubernetes Blueprints
Describes Blueprint for setting up Kubernetes on a cloud provider.
The blog explains the process, and Blueftint is used from the git below.
 #todo GitHub

## Basic course
#Separate branches according to the todo process
- Managed Kubernetes on AWS
- EKS (Elastic Kubernetes Service)
- Local environment settings for EKS
- Create and assign EKS clusters and node groups
- Distribution of sample applications
- Deploy applications built directly into containers

## Advancement process
 #Separate branches according to the todo process
- Continuous Integration and Continuous Deployment (CI/CD)
- Check if AWS has related services #todo
- Integration via Git (GitOps)
- Automatic deployment according to new version releases using GitHub Action
- Continuous integration and continuous deployment CI/CD for multiple services
- GitOps + Argo CD
- Service mesh configuration of microservices architecture
- Deploy multiple services
- Setting up service mesh technology istio for Kubernetes
- Kubernetes resource monitoring
- Prometheus data collection and integration
#todo A tool developed by SoundCloud for its own monitoring
- Grappana data visualization

# Basic course
## Managed Kubernetes on AWS
Typical Kubernetes service providers are Google Cloud and AWS. This course uses Managed Kubernetes on AWS.

### Elastic Kubernetes Service
[Elastic Kubernetes Service](https://ap-northeast-2.console.aws.amazon.com/eks/home?region=ap-northeast-2)
Fully managed Kubernetes control plane
EKS is a fully managed Kubernetes service on AWS.

> [Amazon EKS Workshop :: Amazon EKS Workshop] (https://www.eksworkshop.com)
> AWS EKS Workshop - Training Resources on AWS

We use AWS EKS on the Kubernetes Studio basic architecture to get a fully managed Control Plane Node service, and we use Data Plane Worker Nodes for our EC2 environment.

Implementing Kubernetes on AWS with a combination of Container Services (ECS), Cluster Services (EKS), and Container Registry (ECR).

### Set up local environment for EKS
Install tools to communicate with AWS EKS in your local environment.
> [Getting started with Amazon EKS - Amazon EKS] (https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html)

### Create and assign an EKS cluster and node group
Create a managed EKS cluster using eksctl. The created cluster is set up with the Kubernetes Control Panel installed.

> When you create a new managed cluster using eksctl, a stack that adds a cluster to CloudFormation is added and operated.

```
➜ eks eksctl create cluster \
> --name eksctl-test-1 \
> --version 1.21 \
> --without-nodegroup
2022-03-05 02:19:35 [ℹ] eksctl version 0.86.0
2022-03-05 02:19:35 [ℹ] using region ap-northeast-2
2022-03-05 02:19:35 [ℹ] setting availability zones to [ap-northeast-2c ap-northeast-2a ap-northeast-2b]
2022-03-05 02:19:35 [ℹ] subnets for ap-northeast-2c - public:192.168.0.0/19 private:192.168.96.0/19
2022-03-05 02:19:35 [ℹ] subnets for ap-northeast-2a - public:192.168.32.0/19 private:192.168.128.0/19
2022-03-05 02:19:35 [ℹ] subnets for ap-northeast-2b - public:192.168.64.0/19 private:192.168.160.0/19
2022-03-05 02:19:35 [ℹ] using Kubernetes version 1.21
2022-03-05 02:19:35 [ℹ] creating EKS cluster "eksctl-test-1" in "ap-northeast-2" region with
2022-03-05 02:19:35 [ℹ] if you encounter any issues, check CloudFormation console or try 'eksctl utils describe-stacks --region=ap-northeast-2 --cluster=eksctl-test-1'
2022-03-05 02:19:35 [ℹ] Kubernetes API endpoint access will use default of {publicAccess=true, privateAccess=false} for cluster "eksctl-test-1" in "ap-northeast-2"
2022-03-05 02:19:35 [ℹ] CloudWatch logging will not be enabled for cluster "eksctl-test-1" in "ap-northeast-2"
2022-03-05 02:19:35 [ℹ] you can enable it with 'eksctl utils update-cluster-logging --enable-types={SPECIFY-YOUR-LOG-TYPES-HERE (eg all)} --region =ap-northeast-2 --cluster=eksctl-test-1'
2022-03-05 02:19:35 [ℹ]
2 sequential tasks: { create cluster control plane "eksctl-test-1", wait for control plane to become ready
}
2022-03-05 02:19:35 [ℹ] building cluster stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:19:36 [ℹ] deploying stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:30:37 [ℹ] waiting for CloudFormation stack "eksctl-eksctl-test-1-cluster"
2022-03-05 02:32:38 [ℹ] waiting for the control plane availability...
2022-03-05 02:32:39 [✔] saved kubeconfig as "/Users/hojin/.kube/config"
2022-03-05 02:32:39 [ℹ] no tasks
2022-03-05 02:32:39 [✔] all EKS cluster resources for "eksctl-test-1" have been created
2022-03-05 02:32:40 [ℹ] kubectl command should work with "/Users/hojin/.kube/config", try 'kubectl get nodes'
2022-03-05 02:32:40 [✔] EKS cluster "eksctl-test-1" in "ap-northeast-2" region is ready
```

Add the cluster to the kubectl config using the AWS CLI.
```
# using aws cli add kubectl cluster
➜ eks aws eks --region ap-northeast-2 update-kubeconfig --name eksctl-test-1
Added new context arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1 to /Users/hojin/.kube/config
# checkout success add cluster
➜ eks kubectl config get-contexts
CURRENT NAME

CLUSTER AUTHINFO NAMESPACE
* arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1 arn:aws:eks:ap-northeast-2:771148603266:cluster/eksctl-test-1 arn:aws:eks:ap -northeast-2:771148603266:cluster/eksctl-test-1
          arn:aws:eks:ap-northeast-2:771148603266:cluster/test-1 arn:aws:eks:ap-northeast-2:771148603266:cluster/test-1 arn:aws:eks:ap-northeast-2: 771148603266:cluster/test-1
          iam-root-account@eksctl-test-1.ap-northeast-2.eksctl.io eksctl-test-1.ap-northeast-2.eksctl.io iam-root-account@eksctl-test-1.ap- northeast-2.eksctl.io
          minikube minikube minikube default
```

Validate Kubernetes access using the Kubernetes API. Pass the command using the API to the Kubernetes control panel of the added cluster and check the return.
```
➜ eks kubectl get all
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
service/kubernetes ClusterIP 10.100.0.1 <none> 443/TCP 8m43s
```

Create a nodegroup using eksctl and assign it to the cluster.
Node groups are automatically set up by the AWS EC2 compute engine and assigned to a cluster.

```
# Look up the cluster currently set in eks
➜ eks eksctl get cluster
2022-03-05 02:37:22 [ℹ] eksctl version 0.86.0
2022-03-05 02:37:22 [ℹ] using region ap-northeast-2
NAME REGION EKSCTL CREATED
eksctl-test-1 ap-northeast-2 False
# Query the node group currently set in a specific cluster
➜ eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 02:37:49 [ℹ] eksctl version 0.86.0
2022-03-05 02:37:49 [ℹ] using region ap-northeast-2
Error: No nodegroups found
# Add node group to cluster
➜ eks eksctl create nodegroup\
--cluster eksctl-test-1 \
--region ap-northeast-2 \
--name test-group \
--node-type t2.micro \
--nodes 1 \
--nodes-min 1 \
--nodes-max 1 \

2022-03-05 02:38:21 [ℹ] eksctl version 0.86.0
2022-03-05 02:38:21 [ℹ] using region ap-northeast-2
2022-03-05 02:38:21 [ℹ] will use version 1.21 for new nodegroup(s) based on control plane version
2022-03-05 02:38:22 [ℹ] nodegroup "test-group" will use "" [AmazonLinux2/1.21]
2022-03-05 02:38:22 [ℹ] 1 nodegroup (test-group) was included (based on the include/exclude rules)
2022-03-05 02:38:22 [ℹ] will create a CloudFormation stack for each of 1 managed nodegroups in cluster "eksctl-test-1"
2022-03-05 02:38:22 [ℹ]
2 sequential tasks: { fix cluster compatibility, 1 task: { 1 task: { create managed nodegroup "test-group" } }
}
2022-03-05 02:38:22 [ℹ] checking cluster stack for missing resources
2022-03-05 02:38:22 [ℹ] cluster stack has all required resources
2022-03-05 02:38:23 [ℹ] building managed nodegroup stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:38:23 [ℹ] deploying stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:38:23 [ℹ] waiting for CloudFormation stack "eksctl-eksctl-test-1-nodegroup-test-group"
2022-03-05 02:42:30 [ℹ] no tasks
2022-03-05 02:42:30 [✔] created 0 nodegroup(s) in cluster "eksctl-test-1"
2022-03-05 02:42:30 [ℹ] nodegroup "test-group" has 1 node(s)
2022-03-05 02:42:30 [ℹ] node "ip-192-168-16-191.ap-northeast-2.compute.internal" is ready
2022-03-05 02:42:30 [ℹ] waiting for at least 1 node(s) to become ready in "test-group"
2022-03-05 02:42:30 [ℹ] nodegroup "test-group" has 1 node(s)
2022-03-05 02:42:30 [ℹ] node "ip-192-168-16-191.ap-northeast-2.compute.internal" is ready
2022-03-05 02:42:30 [✔] created 1 managed nodegroup(s) in cluster "eksctl-test-1"
2022-03-05 02:42:30 [ℹ] checking security group configuration for all nodegroups
2022-03-05 02:42:30 [ℹ] all nodegroups have up-to-date cloudformation templates
```

When the node group addition is completed, the node group is added and the cluster is set up properly.

> Tip.
> - You can check that the internal DNS is automatically created by CoreDNS.
> - You can check that the instance has been created in the EC2 Dashboard.

```
➜ eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 02:45:30 [ℹ] eksctl version 0.86.0
2022-03-05 02:45:30 [ℹ] using region ap-northeast-2
CLUSTER NODEGROUP STATUS CREATED MIN SIZE MAX SIZE DESIRED CAPACITY INSTANCE TYPE IMAGE ID ASG NAME TYPE
eksctl-test-1 test-group ACTIVE 2022-03-04T17:39:11Z 1 1 1 t2.micro AL2_x86_64 eks-test-group-78bfab01-c799-c778-37a7-5db5f421d37b managed

➜ eks kubectl get node
NAME STATUS ROLES AGE VERSION
ip-192-168-16-191.ap-northeast-2.compute.internal Ready <none> 5m32s v1.21.5-eks-9017834
```

## Deploy the sample application
Deploy the test application to configure the Deployment and service to check the operation.

```
# Deploy the sample application deployment
➜ eks kubectl create deployment hello-node --image=k8s.gcr.io/echoserver:1.4
deployment.apps/hello-node created

# Connect the service to the deployed sample application
➜ eks kubectl expose deployment hello-node --type=LoadBalancer --port=8080
service/hello-node exposed

# View exposed services
➜ eks kubectl get services
NAME

TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
hello-node LoadBalancer 10.100.168.10 ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com 8080:31540/TCP 110s
kubernetes ClusterIP 10.100.0.1 <none> 443/TCP 34m
```

### Issue occurrence and resolution
The sample application's state does not transition from `pendding` to `running`. Check events in Kubernetes to determine the cause.
```
# Query Kubenetes Events
➜ eks kubectl get events
LAST SEEN TYPE REASON OBJECT MESSAGE
4m42s Warning FailedScheduling pod/hello-node-7567d9fdc9-rksz5 0/2 nodes are available: 1 Too many pods, 1 node(s) were unschedulable.
44s Warning FailedScheduling pod/hello-node-7567d9fdc9-rksz5 0/1 nodes are available: 1 Too many pods.
36m Normal SuccessfulCreate replicaset/hello-node-7567d9fdc9 Created pod: hello-node-7567d9fdc9-qxxqt
```

It is confirmed that the attempt to create too many pods in the node has failed while executing the schedule to create a new pod.
When creating a node group, the node type was t2.micro and the number of nodes was limited to one for low performance, but the scale of the node is changed to secure sufficient resources for Kubernetes.

```
# Change the number of nodes in the node group to 2
➜ eks eksctl scale nodegroup \
--cluster eksctl-test-1 \
--name test-group \
--nodes 2 \
--nodes-max 2

# Confirm node group modification
➜ eks eksctl get nodegroup --cluster eksctl-test-1
2022-03-05 03:43:45 [ℹ] eksctl version 0.86.0
2022-03-05 03:43:45 [ℹ] using region ap-northeast-2
CLUSTER NODEGROUP STATUS CREATED MIN SIZE MAX SIZE DESIRED CAPACITY INSTANCE TYPE IMAGE ID ASG NAME TYPE
eksctl-test-1 test-group ACTIVE 2022-03-04T17:39:11Z 1 2 2 t2.micro AL2_x86_64 eks-test-group-78bfab01-c799-c778-37a7-5db5f421d37b managed

# Query status of pods
➜ eks kubectl get pods
NAME READY STATUS RESTARTS AGE
hello-node-7567d9fdc9-4s7qh 1/1 Running 0 17m
```

### Test connection using exposed EXTERNAL-IP
```
# View exposed services
➜ eks kubectl get services
NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
hello-node LoadBalancer 10.100.168.10 ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com 8080:31540/TCP 45m
kubernetes ClusterIP 10.100.0.1 <none>

# Test connection with the external IP of the exposed service
➜ eks curl http://ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com:8080
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

### Retrieve the current Kubernetes status
```
➜ eks kubectl get all
NAME READY STATUS RESTARTS AGE
pod/hello-node-7567d9fdc9-4s7qh 1/1 Running 0 87s

NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
service/hello-node LoadBalancer 10.100.168.10 ad3a74a624b464a72af77bc4e8930c0f-1995202289.ap-northeast-2.elb.amazonaws.com 8080:31540/TCP 28m
service/kubernetes ClusterIP 10.100.0.1 <none> 443/TCP 61m

NAME READY UP-TO-DATE AVAILABLE AGE
deployment.apps/hello-node 1/1 1 1 87s

NAME DESIRED CURRENT READY AGE
replicaset.apps/hello-node-7567d9fdc9 1 1 1 87s
```

## Deploy applications built directly into containers
### Set up EKS cluster and node group.
Since it's the same task, I make it a script to do it and wait for it to finish.
```
#!/bin/bash
NAME=$1
REGION=ap-northeast-2

# Create cluster and node group
eksctl create cluster \
--name $NAME \
--version 1.21 \
--nodegroup-name $NAME \
--node-type t2.small \
--nodes 2 \
--nodes-min 2 \
--nodes-max 2

# Set kubectl context with Kubernetes of the created EKS cluster
aws eks --region $REGION update-kubeconfig --name $NAME

# check settings
kubectl config get-contexts
kubectl get all
eksctl get cluster
eksctl get nodegroup --cluster $NAME
```

In order to deploy an application on Kubernetes, you basically need to provide a containerized application. Then, Kubernetes pulls the container from the container repository, loads it, and runs it.

### AWS Container Storage ECR Setup

As container storage on AWS, **Amazon Elastic Container Registry** (provides ECR service. Build a simple Go application and push it to ECR.

Create an ECR repository to store your containers.
```
➜ eks aws ecr create-repository\
> --repository-name test-eks

{
    "repository": {
        "repositoryArn": "arn:aws:ecr:ap-northeast-2:771148603266:repository/test-eks",
        "registryId": "771148603266",
        "repositoryName": "test-eks",
        "repositoryUri": "771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks",
        "createdAt": "2022-03-05T13:06:58+09:00",
        "imageTagMutability": "MUTABLE",
        "imageScanningConfiguration": {
            "scanOnPush": false
        },
        "encryptionConfiguration": {
            "encryptionType": "AES256"
        }
    }
}
```

To push to AWS ECR's private storage, we get an authentication token and authenticate the registry to the docker client.
```
➜ basic aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 771148603266.dkr.ecr.ap-northeast-2.amazonaws.com
Login Succeeded
```


### Build the sample application and push it to ECR

<Sample HTTP Go Application>
```
package main

import(
    "fmt"
    "net/http"
)

func hello(w http.ResponseWriter, req *http.Request) {

    fmt.Fprintf(w, "hello\n")
}

func bye(w http.ResponseWriter, req *http.Request) {

    fmt.Fprintf(w, "bye\n")
}


func headers(w http.ResponseWriter, req *http.Request) {

    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\n", name, h)
        }
    }
}

func main() {
    http.HandleFunc("/hello", hello)
    http.HandleFunc("/bye", bye)
    http.HandleFunc("/headers", headers)

    http.ListenAndServe(":8090", nil)
}
```

<Dockerfile>
```
FROM golang:1.16-alpine

WORKDIR /app
COPY. ./

CMD [ "go", "run", "main.go" ]
```

Build it by tagging it to match the repository name you created in AWS ECR. And it associates and pushes ECR's target image information and tags.
```
# build
➜ basic docker build -t test-eks
# Link with images from ECR repository and tagging
➜ basic docker tag test-eks:latest 771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks:latest
# push
➜ basic docker push 771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks:latest

The push refers to repository [771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks]
64c37ddcbb2d: Pushed
15eb9ba7eb67: Pushed
c4fe7bed7430: Pushed
40ab4c9c8714: Pushed
0ded06e76c58: Pushed
ad88393a9d2d: Pushed
07d3c46c9599: Pushed
latest: digest: sha256:42479bfb5d0a1e60ea712ae56df444269ce4ba3b28cacaa6c9caf124f0938b6a size: 1779
```

Deploy the image that you build yourself and push to the repository by loading it into Kubernetes.

Image : `771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks:latest`

### Write the kubernetes definition file YAML
Designate the image you built yourself as the Deployment type.
```
apiVersion: apps/v1
kind: Deployment
metadata:
  name: basic
  labels:
    app: basic
spec:
  replicas: 1
  selector:
    matchLabels:
      app: basic
  template:
    metadata:
      labels:
        app: basic
    spec:
      containers:
      - name: basic
        image: "771148603266.dkr.ecr.ap-northeast-2.amazonaws.com/test-eks:latest"
        ports:
        - containerPort: 8090

```

### distribute
Use the Kubectl command to request a deployment with the Kubernetes API.
```
➜ deployment kubectl apply -f basic_deployment.yaml
deployment.apps/basic created
➜ deployment kubectl expose deployment basic --type=LoadBalancer --port=80 --target-port=8090
service/basic exposed

```

-> Let's try it by matching the Kubernetes version with the local MiniKube.
Local mini-cube works, but not in the latest cloud.
-> I only go here because of the cost, but it is also a way to test Grafana and Prometheus by setting it in the minicube.

Load and run the command from Kubernetes, not from a docker file.
https://cloud.google.com/kubernetes-engine/docs/quickstart
#todo
AWS EKS has an issue, so I don't think it can be deployed, so proceed to the next step

## Continuous Integration and Continuous Deployment (CI/CD)
The destination where the application is deployed is Kubernetes, but in the process, it is necessary to configure continuous integration and continuous deployment plan for the work content. By adopting the GitOps approach, continuous integration proceeds with continuous deployment based on the definition of integrating with Git.

### Continuous integration CI using GitHub
Integrate your working code using the Git repositories, the leading provider of Git. It also leverages the GitHub Action service to build and load containers from code to container images.

1. Working with code
2. Git Push
3. Build and push container images

### Continuous distribution CD using Helm
Continuously proceed with new distributions with the integrated work.
In continuous deployment, application configuration and settings can be changed depending on the deployment environment, so the Kubernetes package manager, Helm, is used to manage version and environment configuration.

1. Deploy by changing settings according to the deployment environment

## Deploy the application with Helm
> Replace with local lightweight kubernetes minikube for cost reasons.


```
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm search repo prometheus-community
helm install prometheus-community/prometheus --generate-name



➜ eks watch kubectl get all

Every 2.0s: kubectl get all hojinjangs-MacBook-Air.local: Tue Mar 8 00:31:44 2022

NAME READY STATUS RESTARTS AGE
pod/prometheus-1646666941-alertmanager-855ccbbdc8-hhmkq 2/2 Running 0 2m40s
pod/prometheus-1646666941-kube-state-metrics-8455fb7578-726r4 1/1 Running 0 2m40s
pod/prometheus-1646666941-node-exporter-hkfn7 1/1 Running 0 2m40s
pod/prometheus-1646666941-pushgateway-64784f5ddd-2mqnk 1/1 Running 0 2m40s
pod/prometheus-1646666941-server-85744cdff9-brn5v 2/2 Running 0 2m40s

NAME TYPE CLUSTER-IP EXTERNAL-IP PORT(S) AGE
service/kubernetes

ClusterIP 10.96.0.1 <none> 443/TCP 19m
service/prometheus-1646666941-alertmanager ClusterIP 10.96.168.248 <none> 80/TCP 2m40s
service/prometheus-1646666941-kube-state-metrics ClusterIP 10.99.199.116 <none> 8080/TCP 2m40s
service/prometheus-1646666941-node-exporter ClusterIP None <none> 9100/TCP 2m40s
service/prometheus-1646666941-pushgateway ClusterIP 10.96.139.81 <none> 9091/TCP 2m40s
service/prometheus-1646666941-server ClusterIP 10.107.26.2 <none> 80/TCP 2m40s

NAME DESIRED CURRENT READY UP-TO-DATE AVAILABLE NODE SELECTOR AGE
daemonset.apps/prometheus-1646666941-node-exporter 1 1 1 1 1 <none> 2m40s

NAME READY UP-TO-DATE AVAILABLE AGE
deployment.apps/prometheus-1646666941-alertmanager 1/1 1 1 2m40s
deployment.apps/prometheus-1646666941-kube-state-metrics 1/1 1 1 2m40s
deployment.apps/prometheus-1646666941-pushgateway 1/1 1 1 2m40s
deployment.apps/prometheus-1646666941-server 1/1 1 1 2m40s

NAME DESIRED CURRENT READY AGE
replicaset.apps/prometheus-1646666941-alertmanager-855ccbbdc8 1 1 1 2m40s
replicaset.apps/prometheus-1646666941-kube-state-metrics-8455fb7578 1 1 1 2m40s
replicaset.apps/prometheus-1646666941-pushgateway-64784f5ddd 1 1 1 2m40s
replicaset.apps/prometheus-1646666941-server-85744cdff9 1 1 1 2m40s


```

Connect to the Prometheus Server service.
```
➜ eks minikube service prometheus-1646666941-server
|-----------|------------------------------|------ -------|---------------|
| NAMESPACE | NAME | TARGET PORT | URL |
|-----------|------------------------------|------ -------|---------------|
| default | prometheus-1646666941-server | | No node port |
|-----------|------------------------------|------ -------|---------------|
😿 service default/prometheus-1646666941-server has no node port
🏃 Starting tunnel for service prometheus-1646666941-server.
|-----------|------------------------------|------ -------|---------------------|
| NAMESPACE | NAME | TARGET PORT | URL |
|-----------|------------------------------|------ -------|---------------------|
| default | prometheus-1646666941-server | | http://127.0.0.1:59258 |
|-----------|------------------------------|------ -------|---------------------|
🎉 Opening service default/prometheus-1646666941-server in default browser...
❗ Because you are using a Docker driver on darwin, the terminal needs to be open to run it.
```


## service mesh
[Istio / Getting Started](https://istio.io/latest/docs/setup/getting-started/)
Set up the Kubernetes service mesh Istio and install Promethius and Grapata for data collection, analysis, and monitoring.

### Connect the load balancer in minikube
When a service provider deploys a load balancer type service, the provider allocates an external IP. However, in the case of minikube, use the `minikube tunnel` command to connect the external IP of the load balancer on the minikube to the local host and use it.

```
➜ helm minikube tunnel
✅ Tunnel successfully started

📌 NOTE: Please do not close this terminal as this process must stay alive for the tunnel to be accessible ...

❗ The service/ingress istio-ingressgateway requires privileged ports to be exposed: [80 443]
🔑 sudo permission will be asked for it.
🏃 Starting tunnel for service istio-ingressgateway.
```

> Tip.
> Networking and Connectivity Commands:
> service Returns a URL to connect to a service
> tunnel Connect to LoadBalancer services




#blog/draft