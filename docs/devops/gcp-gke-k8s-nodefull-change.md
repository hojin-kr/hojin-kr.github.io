# 쿠버네티스 운영 노드풀 조정 실행 계획

## 문제 정의

GCP GKE 쿠버네티스 운영 환경에서 노드풀을 교체할 때 다운타임 없이 안정적으로 수행하기 위한 방법론을 다룹니다. 기존 노드풀을 점진적으로 다른 노드풀로 교체하여 서비스 중단 없이 요청을 처리하도록 합니다.

## 개요

이 문서는 GCP의 GKE 클러스터에서 노드풀을 교체하는 절차를 안내합니다. 어피니티 태그를 사용하여, Pod가 특정 노드풀에서 실행되도록 설정하고, 다운타임 없이 노드풀을 신규 노드풀로 전환합니다. 이를 통해 클러스터 성능 최적화와 비용 절감을 기대할 수 있습니다.

## 배경 지식

- **GKE(Google Kubernetes Engine)**: Kubernetes 기반의 Google Cloud 서비스로, 클러스터 관리 및 활용을 지원합니다.
- **노드풀(Node Pool)**: Kubernetes에서 실행되는 노드의 그룹으로, 동일한 VM 구성과 설정을 공유합니다.
- **어피니티(Affinity)**: Pods의 배치 우선순위를 설정하여 특정 노드에 대한 선호도를 지정합니다.

## 작업 내용

### 1. Replica 개수 조정
- 기존 노드에서 작동 중인 Pod 수에 맞춰 Replica 개수를 조정합니다.
- 실행 명령:
  ```bash
  kubectl scale --replicas=18 deployment.apps/xxx-live -n xxx
  ```

### 2. 어피니티로 노드풀 조정
- 현재 실행 중인 Pod가 새로운 노드풀(pool-3, pool-4)로 이동하도록 affinity 설정을 변경합니다.
- 설정 파일 예시:
  ```yaml
  spec:
    template:
      spec:
        affinity:
          nodeAffinity:
            preferredDuringSchedulingIgnoredDuringExecution:
              - weight: 1
                preference:
                  matchExpressions:
                    - key: cloud.google.com/gke-nodepool
                      operator: In
                      values:
                        - pool-3
                        - pool-4
  ```
- 어피니티 조정 후 Pod 상태 확인:
  ```plaintext
  NAME                              READY   STATUS    RESTARTS   AGE     IP             NODE                                 NOMINATED NODE   READINESS GATES
  pod/xxx-live-8864dc89-454th   2/2     Running   0          2m5s    xx.xxx.9.9     xxx-xxx-live-pool-3-c1816ba9-l0qp   <none>           1/1
  pod/xxx-live-8864dc89-4ccfm   2/2     Running   0          2m44s   xx.xxx.12.5    xxx-xxx-live-pool-4-22906b23-rqfb   <none>           1/1
  pod/xxx-live-8864dc89-5jtns   2/2     Running   0          2m6s    xx.xxx.9.8     xxx-xxx-live-pool-3-c1816ba9-l0qp   <none>           1/1
  pod/xxx-live-8864dc89-bbbbc   2/2     Running   0          2m5s    xx.xxx.11.7    xxx-xxx-live-pool-4-22906b23-xlkp   <none>           1/1
  pod/xxx-live-8864dc89-chx8q   2/2     Running   0          2m44s   xx.xxx.11.5    xxx-xxx-live-pool-4-22906b23-xlkp   <none>           1/1
  pod/xxx-live-8864dc89-ckdp9   2/2     Running   0          2m44s   xx.xxx.8.10    xxx-xxx-live-pool-3-c1816ba9-rt24   <none>           1/1
  pod/xxx-live-8864dc89-gk4d4   2/2     Running   0          2m2s    xx.xxx.10.10   xxx-xxx-live-pool-3-c1816ba9-bs84   <none>           1/1
  pod/xxx-live-8864dc89-gqtgk   2/2     Running   0          2m44s   xx.xxx.11.6    xxx-xxx-live-pool-4-22906b23-xlkp   <none>           1/1
  pod/xxx-live-8864dc89-hpvzc   2/2     Running   0          2m44s   xx.xxx.13.5    xxx-xxx-live-pool-4-22906b23-rpfm   <none>           1/1
  pod/xxx-live-8864dc89-jqv97   2/2     Running   0          2m5s    xx.xxx.12.6    xxx-xxx-live-pool-4-22906b23-rqfb   <none>           1/1
  pod/xxx-live-8864dc89-l5lgw   2/2     Running   0          2m2s    xx.xxx.12.7    xxx-xxx-live-pool-4-22906b23-rqfb   <none>           1/1
  pod/xxx-live-8864dc89-nkbvg   2/2     Running   0          2m4s    xx.xxx.13.7    xxx-xxx-live-pool-4-22906b23-rpfm   <none>           1/1
  pod/xxx-live-8864dc89-p4np8   2/2     Running   0          2m5s    xx.xxx.8.11    xxx-xxx-live-pool-3-c1816ba9-rt24   <none>           1/1
  pod/xxx-live-8864dc89-qh22q   2/2     Running   0          2m44s   xx.xxx.10.8    xxx-xxx-live-pool-3-c1816ba9-bs84   <none>           1/1
  pod/xxx-live-8864dc89-r45gx   2/2     Running   0          2m44s   xx.xxx.13.6    xxx-xxx-live-pool-4-22906b23-rpfm   <none>           1/1
  pod/xxx-live-8864dc89-wc746   2/2     Running   0          2m5s    xx.xxx.10.9    xxx-xxx-live-pool-3-c1816ba9-bs84   <none>           1/1
  pod/xxx-live-8864dc89-wm2kx   2/2     Running   0          2m44s   xx.xxx.9.7     xxx-xxx-live-pool-3-c1816ba9-l0qp   <none>           1/1
  pod/xxx-live-8864dc89-zm7xt   2/2     Running   0          2m44s   xx.xxx.8.9     xxx-xxx-live-pool-3-c1816ba9-rt24   <none>           1/1
  ```

### 3. 노드풀 제거
- 이전 노드풀(pool-1, pool-2)을 GCP 콘솔에서 제거합니다.
- 노드풀 제거 후 유지 중인 노드 확인:
  ```plaintext
  ➜ kubectl top nodes
  NAME                                       CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
  xxx-xxx-live-default-pool-619eece6-b3rb   106m         2%     1906Mi          14%
  xxx-xxx-live-default-pool-77818f59-qexg   143m         3%     1040Mi          7%
  xxx-xxx-live-pool-3-c1816ba9-bs84         148m         1%     1553Mi          5%
  xxx-xxx-live-pool-3-c1816ba9-l0qp         181m         2%     1468Mi          5%
  xxx-xxx-live-pool-3-c1816ba9-rt24         132m         1%     1780Mi          6%
  xxx-xxx-live-pool-4-22906b23-rpfm         98m          1%     1518Mi          5%
  xxx-xxx-live-pool-4-22906b23-rqfb         107m         1%     1538Mi          5%
  xxx-xxx-live-pool-4-22906b23-xlkp         110m         1%     1598Mi          5%
  ```

### 4. 추후 계획
- e2-standard-8 타입으로 신규 노드풀(pool-3, pool-4)을 통일하여 리소스 확장성 및 효율성을 높입니다.