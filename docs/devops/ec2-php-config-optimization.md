# PHP 설정 변경을 통한 EC2 인스턴스 타입 최적화

EC2 인스턴스 타입에 적합한 PHP 설정을 확인함으로써 리소스를 더 유연하게 조정할 수 있습니다. PHP 프로세스 수를 제한하면 Redis, Memcached, RDS와 같은 잠재적 병목 지점에 대한 연결 관리에 이점을 제공합니다. 과도한 연결은 각 지점에서 오버헤드를 발생시킬 수 있으며, PHP 프로세스를 제한함으로써 어느 정도 조정할 수 있습니다.

## EC2 인스턴스 타입별 PHP 설정 검증
비용 관점에서 EC2 인스턴스 타입을 적극적으로 줄이는 것을 고려해볼 만합니다. 하지만 PHP 프로세스 설정이 EC2 메모리와 관련되어 있어 현재 PHP 설정으로 인스턴스 타입을 낮추는 것에 대한 우려가 있습니다. 더 적은 프로세스 설정으로 서비스가 부하를 처리할 수 있는지 테스트해야 합니다.

## 테스트 결과

| 설정 | CPU 사용률 | 메모리 사용률 | child | spare | start | max_child | 비고 |
|------|------------|---------------|---------------|---------------|-----------|-------------------|------|
| 원본 상태 | 10% | 24% | 180 | 150 | 60 | 160 | - |
| 1차 조정 | 11% | 17% | 150 | 100 | 60 | 150 | 실제 사용량 대비 설정이 여전히 크므로 활성 프로세스는 변화가 없었고, 유휴 프로세스만 적게 생성되어 메모리 사용량만 감소 |
| 2차 조정 | 11% | 7% | 50 | 30 | 10 | 50 | 1차 조정과 유사하게 활성 프로세스는 동일한 CPU 사용률로 변화 없었지만, 유휴 프로세스가 감소하여 메모리 사용량 감소 |
| 3차 조정 | 12% | 5% | 30 | 5 | 5 | 30 | 10개 유휴 프로세스 유지, CPU 사용률 동일, 문제없이 약간의 메모리 감소 |


```markdown
● php7.2-fpm.service - The PHP 7.2 FastCGI Process Manager
     Loaded: loaded (/usr/lib/systemd/system/php7.2-fpm.service; enabled; preset: enabled)
     Active: active (running) since Tue 2025-05-13 06:21:57 UTC; 5h 40min ago
       Docs: man:php-fpm7.2(8)
    Process: 610110 ExecStartPost=/usr/lib/php/php-fpm-socket-helper install /run/php/php-fpm.sock /etc/php/7.2/fpm/poo>
   Main PID: 609958 (php-fpm7.2)
     Status: "Processes active: 0, idle: 150, Requests: 1387052, slow: 0, Traffic: 84.5req/sec"
      Tasks: 151 (limit: 9115)
     Memory: 1.4G (peak: 1.6G)
        CPU: 2h 28min 15.644s
     CGroup: /system.slice/php7.2-fpm.service
```

start_servers 5 min_spare_servers 5 설정으로 12개의 태스크를 가지고 있다는 것은 6개 프로세스 내에서 원활하게 처리되고 있음을 나타냅니다. 이 경우 보다 적은 PHP 프로세스의 개수를 세팅하여도 문제 없이 서비스가 가능하다고 판단할 수 있고, 그에 따라 컴퓨팅 자원을 적게 소모하도록 하여 부가적인 득을 얻을 수 있습니다.
프로세스 개수대비 요청 수처리에 대해서는 서비스의 특성, 로직의 특성에 따라서 다르게 나타날 수 있습니다.

```markdown
● php7.2-fpm.service - The PHP 7.2 FastCGI Process Manager
     Loaded: loaded (/usr/lib/systemd/system/php7.2-fpm.service; enabled; preset: enabled)
     Active: active (running) since Tue 2025-05-13 07:55:23 UTC; 4h 7min ago
       Docs: man:php-fpm7.2(8)
    Process: 70546 ExecStartPost=/usr/lib/php/php-fpm-socket-helper install /run/php/php-fpm.sock /etc/php/7.2/fpm/pool>
   Main PID: 70538 (php-fpm7.2)
     Status: "Processes active: 1, idle: 10, Requests: 911110, slow: 0, Traffic: 73.7req/sec"
      Tasks: 12 (limit: 9115)
     Memory: 140.3M (peak: 365.5M)
        CPU: 1h 48min 10.302s
     CGroup: /system.slice/php7.2-fpm.service

```
