---
layout: post
title: AWS Lightsail CentOS PHP MySQL 세팅
subtitle: Amazon Web Service lightsail CentOS PHP 세팅
gh-repo: daattali/beautiful-jekyll
tags: [centos, php, aws, mysql]
comments: true
---

# AWS Lightsail CentOS PHP MySQL 세팅
퓨어한 CentOS에 PHP 5.6과 MySQL을 설정하고 웹앱 서비스를 위한 PHP 기본 환경을 세팅합니다.

### 키페어를 이용해 SSH 접속
AWS Lightsail에서 제공하는 키페어를 다운받고 키를 이용하여 ssh 접속합니다.  
  
~~~
sudo ssh -i /키페어 위치.pem centos@xx.xx.xxx.xxx
~~~
  
  
### PHP 5.6 설치
PHP 5.6 버전을 선택하여 설치합니다.  
  
~~~
yum install https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm
yum install http://rpms.remirepo.net/enterprise/remi-release-7.rpm
yum install yum-utils
yum-config-manager --enable remi-php56
yum install php php-mcrypt php-cli php-gd php-curl php-mysql php-ldap php-zip php-fileinfo
php -v
~~~
  
  
### PHP 설정 변경 (php.ini)
기 개발되어있는 웹앱이 php short_tag를 사용하고있습니다. 또한 대한민국에서 서비스하기 때문에 타임존을 설정합니다. 코드이그나이터에서 로그인 기능을 위해 세션 오토 스타트 설정합니다.
  
  - 단축 태그 on : short_tag : On  
~~~
//PHP 단축 태그 사용 예시
<?=$value ?> 
~~~
    
  - 타임존 설정  : data.timezone = Asia/Seoul
  - 세션 설정 : session.auto_start = 1
    
    
### MySQL 설치
       
~~~
yum -y install http://dev.mysql.com/get/mysql57-community-release-el7-11.noarch.rpm  
yum -y install mysql-community-server  
systemctl start mysqld  
systemctl enable mysqld  
~~~
  
  
### 주의 할 점
  
  - centOS는 기본 방화벽 설정이 모든 포트를 제한하고 있음, 원한느 포트가 있다면 방화벽을 해제 해야함
  - 원한는 디렉토리로의 접근이 안되다면 SELinux에 의해 방어되고 있는지 확인
  - MySQL 마이그레이션시 사용자 추가 함수를 놓치지 말고 추가
    
