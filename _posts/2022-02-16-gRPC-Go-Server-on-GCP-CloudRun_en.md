---
layout: post
title: gRPC Go Server on GCP CloudRun
tags: [github,go,grpc,cloudrun,en]
---
# gRPC Go Server on GCP CloudRun
Service gRPC-based go Server to GCP CloudRun

# Define Protobuffer
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

# Build go language gRPC in Protobuffer
```
protoc --go_out=./cmd --go_opt=paths=source_relative \
    --go-grpc_out=./cmd --go-grpc_opt=paths=source_relative \
    proto/haru.proto

```

# Define Dockerfile for container image build
 Defining a Dockerfile to build a container image
```
# syntax=docker/dockerfile:1

FROM golang:1.16-alpine

WORKDIR /app
COPY. ./
COPY go.mod ./
COPY go.sum ./
COPY cmd ./
RUN go build -o /app/haru

CMD [ "/app/haru" ]

```


# Create CloudRun definition file
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

# Deploy with gcloud API
## Cloud Cloud Build
PUSh build images using GCP's cloud build service
```
  gcloud builds submit . --tag=gcr.io/${PROJECT_ID}/{REPO}
```

## Deploy GCP Cloud Run
Deploy the service using a pre-written Cloud Run deployment definition file.

```
gcloud run services replace deployments/test/cloudrun.yaml --region=asia-northeast3

```


# Automating deployment using Github Actions (CD)
  Automate deployment using GitHub Actions for GitOps-based operations
- Execute deployment script when push to main branch occurs

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

# Example result
## GitHub Actions
![](/assets/img/B2E22BA8-D7A7-484C-9B5A-620B3D75C08E.png)

## Cloud Run
![](/assets/img/3B9010C7-BE69-423A-BFE2-9B790BC476D0.png)

Tip. In Triggers, you need to set up access authentication as needed


# gRPC test
 For gRPC client testing, it is necessary to implement a client using gRPC, but it can be conveniently tested using a useful tool.
[The API Design Platform and API Client - Insomnia](https://insomnia.rest)
Insomnia, an API test client tool, allows you to build tests directly by reading the Protobuffer definition you have written.

## Create a new request with gRPC
![](/assets/img/82BD4177-7A72-4C4F-BF74-8CD0D696F256.png)
## Select the Protobuffer definition to apply
![](/assets/img/F009EE30-F391-4837-9821-8916185B5A96.png)

## Create Host
When using the default URL provided by CloudRun, it is secure grpc, so set it as grpcs and create a host.
```
grpcs://{YOUR}-du.a.run.app
```



#blog/live