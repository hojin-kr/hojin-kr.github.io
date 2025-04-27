# 주제
Go로 작업된 Go-GRPC 클라우드 네이티브 서버
> https://github.com/hojin-kr/clubhouse

# 특징
- Golang
- GoCache
- GRPC
- Google Cloud Platform
    - Cloud Run
    - Datastore
    - Cloud Build
- Apns (Apple Server Push)
- Github Actions CI/CD

## Github Actions CI/CD
Github Actions로 자동화하여 컨테이너 빌드 및 GCP 환경으로 서비스 배포를 수행합니다.
키와 같이 민감한 데이터가 보함된 데이터는 깃허브 레포지토리 시크릿을 사용해 관리합니다.
코드가 통합되고 배포되기까지 흐름을 깃허브 액션에서 관리합니다.
1. 깃허브로 코드가 푸시되어 트리거되면 GCP Cloud Build로 빌드를 수행하고 Registy로 Push합니다.
2. GCP Cloud Run 서비스는 k8s Knative기반의 서비스로 해당 스펙에 맞춰 yml을 작성합니다.
3. GCP CLoud Run 서비스로 배포합니다.
```
# Deploy - stop previous version
    - name: Deploy - stop previous version
      run: |-
        gcloud builds submit -t gcr.io/${{ secrets.PROJECT_ID }}/${SERVICE_NAME}:${GITHUB_SHA} .
        cat <<EOF >> cloudrun.yaml
        apiVersion: serving.knative.dev/v1
        kind: Service
        metadata:
          name: clubhouse-dev
          annotations:
            run.googleapis.com/ingress: all
        spec:
          template:
            metadata:
              annotations:
                autoscaling.knative.dev/maxScale: '100'
                ... 중략 ...
          - name : KAKAO_REST_API_KEY
                  value : ${{ secrets.KAKAO_REST_API_KEY }}
          - name : ETCD_INTERVAL_AD
                  value : "300"
                resources:
                  limits:
                    cpu: 1000m
                    memory: 512Mi
        EOF
        cat cloudrun.yaml
        gcloud run services replace cloudrun.yaml --region=asia-northeast3
```

## Protobuff & GRPC
서버에서 작성한 proc 정의를 사용해서, 서버-클라 양측에서 사용할 모델을 생성하여 사용함으로써, 서버-클라간 상호 동일한 모델구조 참조를 보장함
```
syntax = "proto3";

option go_package = "github.com/hojin-kr/haru/cmd/proto";

package haru;

// Service definition.
service version1 {
  rpc CreateAccount (AccountRequest) returns (AccountReply) {}
  rpc GetProfile (ProfileRequest) returns (ProfileReply) {}
  rpc UpdateProfile (ProfileRequest) returns (ProfileReply) {}
  rpc CreateGame (GameRequest) returns (GameReply) {}
...중략
```

```
#!/bin/bash
protoc --go_out=./cmd --go_opt=paths=source_relative \
    --go-grpc_out=./cmd --go-grpc_opt=paths=source_relative \
    proto/haru.proto
protoc proto/haru.proto --swift_out=./proto --grpc-swift_out=./proto
```

## Cloud Run
- Deploy 분리 운영
![image](https://user-images.githubusercontent.com/22079767/236656458-205152ce-6784-4dcc-97c0-da86c28b44a7.png)
- Revision과 Env 관리및 서비스 모니터링
![image](https://user-images.githubusercontent.com/22079767/236656558-2248e140-9ec3-4dc5-a4df-b77794dabfde.png)


# 적용 프로젝트
### 클럽하우스
일정과 장소를 보고 조인을 신청하고, 채팅을 통해서 함께 라운딩할 사람들과 소통합니다.

![IMG_0068](https://user-images.githubusercontent.com/22079767/236656360-bb6f5709-64f6-46db-92ff-e89973afdad5.PNG)

