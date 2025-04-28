# GCP GKE 데이터 레이크 구성

## 문제 정의

GCP GKE 환경에서 로그 및 NoSQL 데이터를 효과적으로 수집하고 분석하기 위한 데이터 레이크 구성 필요성.

## 개요

GCP GKE 환경에서 생성되는 로그와 NoSQL 데이터를 BigQuery에 저장하여 데이터를 정형화하고 분석에 활용합니다. 이를 통해 시스템 운영의 효율성을 높이고, 데이터 기반의 의사결정을 지원할 수 있습니다.

## 배경 지식

- **GKE (Google Kubernetes Engine)**: 컨테이너화된 애플리케이션을 배포, 관리하는 Kubernetes 관리형 서비스.
- **BigQuery**: GCP의 서버리스 데이터 웨어하우스 솔루션으로 대량의 데이터를 SQL을 사용하여 분석 가능.
- **Stackdriver (현재 Cloud Operations Suite)**: 로그 관리 및 성능 모니터링을 포함한 GCP의 통합 운영 서비스.
- **Dataflow**: 데이터 처리 파이프라인을 구축하고 실행하는 GCP 서비스.
- **Zeppelin**: 데이터 시각화와 노트북을 제공하는 도구로, 다양한 데이터 소스와 상호작용할 수 있음.

## 작업 내용

작업의 주요 내용은 GKE 환경에서 활동 로그와 사용자 데이터(NoSQL)를 BigQuery로 수집하고 쿼리 및 시각화하는 것입니다.

### 활동 로그 관리

1. **활동 로그의 stdout 출력**
   - 컨테이너에서 활동 로그를 stdout으로 출력하여 Stackdriver에 의해 수집됩니다.

   ```yaml
   $defaultLog = [
        'externalData'=>$this->getData(),
        'time'=>date('Y-m-d H:i:s'.substr(microtime(), 1, 6).'O'),
        'uri'=>$request->getUri(),
        'params'=>static::toJsonPayload($request->getParams()),
        'remote_addr'=>$request->getRemoteAddr(),
        'server_addr'=>$_SERVER['SERVER_ADDR'],
        'severity'=>'info',
        'logging.googleapis.com/labels'=>['category'=>'server']
   ];
   ```

2. **Stackdriver를 통해 로그 확인**
   - Stackdriver Logs Explorer를 활용하여 로그를 조회하고 모니터링할 수 있습니다.

3. **BigQuery로 라우팅**
   - 특정 필터를 적용하여 관심 있는 로그만 BigQuery로 라우팅하여 SQL을 통해 분석 가능.

### 사용자 데이터 (NoSQL) 데이터 처리

1. **Dataflow를 통한 데이터 전송**
   - Datastore의 데이터를 Dataflow를 사용하여 GCS로 먼저 export, 이후 BigQuery로 import합니다.

2. **스키마와 UDF (유저 정의 함수) 정의**

   - **스키마 정의 예시**

   ```yaml
   {
       "BigQuery Schema": [
           {"name": "type", "type": "STRING"},
           {"name": "level", "type": "INTEGER"},
           {"name": "user_id", "type": "INTEGER"},
           {"name": "exp", "type": "INTEGER"},
           {"name": "date", "type": "STRING"}
       ]
   }
   ```

   - **UDF 정의 예시**

   ```javascript
   function transform(line) {
       var values = JSON.parse(line);
       var curr = new Date();
       var utc = curr.getTime() + (curr.getTimezoneOffset() * 60 * 1000);
       var KR_TIME_DIFF = 9 * 60 * 60 * 1000;
       var kr_curr = new Date(utc + (KR_TIME_DIFF));
   
       var obj = new Object();
       obj.type = values.properties.type.stringValue;
       obj.level = values.properties.level.integerValue;
       obj.user_id = values.properties.user_id.integerValue;
       obj.exp = values.properties.exp.integerValue;
       obj.date = kr_curr;
       return JSON.stringify(obj);
   }
   ```

### BigQuery와 Zeppelin 활용

- 모든 활동 로그와 사용자의 데이터를 BigQuery로 집중시킵니다.
- Zeppelin을 이용해 BigQuery 데이터를 시각화하고, 필요에 따라 데이터 기반 분석을 수행합니다.

### K8S Zeppelin 설정 예시

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: zeppelin

# Zeppelin 관련 리소스 설정 예시
apiVersion: apps/v1
kind: Deployment
metadata:
  name: zeppelin
  namespace: zeppelin
spec:
  replicas: 1
  selector:
    matchLabels:
      app: zeppelin
  template:
    metadata:
      labels:
        app: zeppelin
    spec:
      containers:
      - name: zeppelin
        image: {zeppelin-image}
        ports:
        - containerPort: 8080
```

이와 같은 구성은 GKE 환경에서 발생하는 데이터를 효과적으로 수집, 분석, 활용하는 데 기여합니다.