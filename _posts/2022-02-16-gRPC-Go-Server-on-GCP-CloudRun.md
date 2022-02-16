---  
layout: post
title: gRPC Go Server on GCP CloudRun
tags: [github,go,grpc,cloudrun]
---
# gRPC Go Server on GCP CloudRun
GCP CloudRun에  gRPC 기반의 go Server를 서비스

# Protobuffer 정의
```
syntax = "proto3";

option go_package = "github.com/hojin-kr/haru/cmd/proto";

package haru;

// Service definition.
service version1 {
  // Ping
  rpc Ping (PingRequest) returns (PingReply) {}
}

message PingRequest {

}

message PingReply{
  
}

```

# Protobuffer에서 go언어 gRPC 빌드
```
protoc --go_out=./cmd --go_opt=paths=source_relative \
    --go-grpc_out=./cmd --go-grpc_opt=paths=source_relative \
    proto/haru.proto

```

#  Container image 빌드를 위한 Dockerfile 정의
 Dockerfile을 정의하여 Container Image 빌드
```
# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /app
COPY . ./
COPY go.mod ./
COPY go.sum ./
COPY cmd ./
RUN go build -o /app/haru

CMD [ "/app/haru" ]

```


#   CloudRun 정의 파일 작성
```
apiVersion: serving.knative.dev/v1
kind: Service
metadata:
  name: haru
  annotations:
    run.googleapis.com/ingress: all
spec:
  template:
    spec:
      containerConcurrency: 80
      timeoutSeconds: 300
      serviceAccountName: {YOUR_S_A}
      containers:
      - image: gcr.io/{YOUR_PROJECT_ID}/{YOUR_REPO}:latest
        ports:
        - name: h2c
          containerPort: 50051
        env:
        - name: PROJECT_ID
          value: {YOUR_PROJECT_ID}
        resources:
          limits:
            cpu: 1000m
            memory: 512Mi


```

# gcloud API로 배포
## GCP Cloud Build
GCP 의 클라우드 빌드 서비스를 사용해서 빌드 이미지  PUSh
```
  gcloud builds submit . --tag=gcr.io/${PROJECT_ID}/{REPO}
```

## GCP Cloud Run 배포
사전에 작성한 Cloud Run 배포  정의파일을 사용해서 서비스를 배포

```
gcloud run services replace deployments/test/cloudrun.yaml --region=asia-northeast3

```


# Github Action을 사용한 배포 자동화 (CD) 
  GitOps 기반의 운영을 위해서  GitHub Action을 사용해 배포 자동화
-  main 브랜치에 push 발생시 배포 스크립트를 수행

```
name: Deploy to CloudRun Main

on:
  push:
    branches:
      - main
env:
  PROJECT_ID: ${{ secrets.PROJECT_ID }}

jobs:
  setup-deploy:
    name: Setup and Deploy
    runs-on: ubuntu-latest
    environment: production

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    # Setup gcloud CLI
    - uses: google-github-actions/setup-gcloud@v0.2.0
      with:
        service_account_key: ${{ secrets.SA_KEY }}
        project_id: ${{ secrets.PROJECT_ID }}

    # Configure Docker to use the gcloud command-line tool as a credential
    # helper for authentication
    - run: |-
        gcloud --quiet auth configure-docker

    # Deploy - stop previous version
    - name: Deploy - stop previous version
      run: |-
        gcloud builds submit . --tag=gcr.io/${PROJECT_ID}/{REPO}
        gcloud run services replace deployments/test/cloudrun.yaml --region=asia-northeast3


```

#  결과 예시
## GitHub Action
![](/assets/img/B2E22BA8-D7A7-484C-9B5A-620B3D75C08E.png)

## Cloud Run
![](/assets/img/3B9010C7-BE69-423A-BFE2-9B790BC476D0.png)

Tip. Triggers 에서 필요에 따라 접근 인증 설정 필요


# gRPC 테스트
 gRPC에 대해 클라이언트 테스트를 위해서는  gRPC를 사용한 클라이언트 구현이 필요하지만 유용한 툴을 사용해서 편하게 테스트가 가능함
[The API Design Platform and API Client - Insomnia](https://insomnia.rest)
API 테스트 클라이언트 툴인 Insomnia를 사용하면 작성한  Protobuffer 정의를 읽어 바로 테스트를 구축할 수 있음

## 새로운 Request를 gRPC로 생성
![](/assets/img/82BD4177-7A72-4C4F-BF74-8CD0D696F256.png)
## 적용할 Protobuffer 정의 선택
![](/assets/img/F009EE30-F391-4837-9821-8916185B5A96.png)

## Host 작성
CloudRun에서 제공하는 기본 URL을 사용시 secure grpc이기 때문에 grpcs로 설정하여 host를 작성
```
grpcs://{YOUR}-du.a.run.app
```



#blog/live
