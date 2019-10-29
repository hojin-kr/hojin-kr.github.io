---
layout: post
title: AWS Lightsail CentOS PHP MySQL 초기 세팅
subtitle: Amazon Web Service lightsail CentOS PHP 초기 세팅
gh-repo: daattali/beautiful-jekyll
tags: [centos, php, aws, mysql]
comments: true
---

# AWS Lightsail CentOS PHP MySQL 초기 세팅

1. 키페어를 이용해 SSH 접속
~~~
sudo ssh -i /키페어 위치.pem centos@xx.xx.xxx.xxx
~~~

2. PHP 5.6 설치

~~~
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm  
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm  
yum install yum-utils  
yum-config-manager --enable remi-php56  
yum install php php-mcrypt php-cli php-gd php-curl php-mysql php-ldap php-zip php-fileinfo  
~~~
  
3. PHP 설정 변경 (php.ini)
  - 단축 태그 on : short_tag : On  
~~~
<?=$value ?> 
~~~
    
  - 타임존 설정  : data.timezone = Asia/Seoul
  - 세션 설정 : session.auto_start = 1
  
4. MySQL 설치
  
~~~
yum -y install http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm  
yum -y install mysql-community-server  
systemctl start mysqld  
systemctl enable mysqld  
~~~
  
5. CentOS Apache 홈디렉토리 접근 가능하게 권한 변경
  
~~~
setsebool -P httpd_enable_homedirs on
~~~
  
6. 주의 할 점
  
  - centOS는 기본 방화벽 설정이 모든 포트를 제한하고 있음, 원한느 포트가 있다면 방화벽을 해제 해야함
  - 원한는 디렉토리로의 접근이 안되다면 SELinux에 의해 방어되고 있는지 확인
  - MySQL 마이그레이션시 사용자 추가 함수를 놓치지 말고 추가
  



