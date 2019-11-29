---  
layout: post
title: Dockerfile DocumentRoot Env
gh-repo: daattali/beautiful-jekyll
tags: [docker, apache, vm]
comments: true
---

# Dockerfile DocumentRoot Env

도커 구성 중 DocumentRoot를 바꿔야 하는 경우가 생겼습니다.  
현재 운영 중인 서비스가 코드이그나이터를 이용하여 다음과 같은 구조를 가지고 있습니다.  
m.domain.kr -> app/m -> app/CI/application/m/  
www.domain.kr -> app/www -> app/CI/application/www/  
DocumentRoot는 app/m 을 향하면서 -v 옵션으로 링크하는 영역은 하나 뒤 영역인 app/을 잡아야합니다.  
Docker hub에 공유되어있는 대부분의 컨테이너는 링크 폴더를 곳 DocumentRoot로 사용하기 때문에 바로 적용할 수 없어 Dockfile을 수정하였습니다.
수정 내용은 DocumentRoot를 환경변수로 지정할 수 있도록하고 코드이그나이터에서 session.auto_start를 사용하기 때문에 php.ini에서 옵션을 설정해줍니다.

<center><img src ="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5de0c694ea6cfb7ee7170f75/ce4584f5b40b556675d0ef7ff928255d/image.png" width="80%;"></center>
<center><img src ="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5de0c694ea6cfb7ee7170f75/a6e78153dcc073488f76afb3311245eb/image.png" width="80%;"></center>

Dockerfile 수정하고 반영하는 플로우

~~~
FROM php:5.6-apache

RUN apt-get update && apt-get install -y git-core cron \
  libjpeg-dev libmcrypt-dev libpng-dev libpq-dev \
  && rm -rf /var/lib/apt/lists/* \
  && docker-php-ext-configure gd --with-png-dir=/usr --with-jpeg-dir=/usr \
  && docker-php-ext-install gd mcrypt mysqli opcache pdo pdo_mysql zip

# Recommended opcache settings - https://secure.php.net/manual/en/opcache.installation.php
RUN { \
    echo 'opcache.memory_consumption=128'; \
    echo 'opcache.interned_strings_buffer=8'; \
    echo 'opcache.max_accelerated_files=4000'; \
    echo 'opcache.revalidate_freq=2'; \
    echo 'opcache.fast_shutdown=1'; \
    echo 'opcache.enable_cli=1'; \
  } > /usr/local/etc/php/conf.d/docker-ci-opcache.ini

RUN { \
    echo 'log_errors=on'; \
    echo 'display_errors=off'; \
    echo 'upload_max_filesize=32M'; \
    echo 'post_max_size=32M'; \
    echo 'memory_limit=128M'; \
    echo 'date.timezone="UTC"'; \
    echo 'session.auto_start=1'; \
  } > /usr/local/etc/php/conf.d/docker-ci-php.ini

RUN { \
    echo '<FilesMatch "^\.">'; \
    echo '    Order allow,deny'; \
    echo '    Deny from all'; \
    echo '</FilesMatch>'; \
    echo '<DirectoryMatch "^\.|\/\.">'; \
    echo '    Order allow,deny'; \
    echo '    Deny from all'; \
    echo '</DirectoryMatch>'; \
  } > /etc/apache2/conf-available/docker-ci-php.conf

  ENV APACHE_DOCUMENT_ROOT=/var/www/html/m
  RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
  RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN a2enconf docker-ci-php

RUN a2enmod rewrite

COPY --chown=www-data:www-data ./CodeIgniter_1.7.3 /usr/src/CodeIgniter_1.7.3

RUN ln -s /usr/src/CodeIgniter_1.7.3/system /var/www/codeigniter

COPY docker-entrypoint /usr/local/bin/

ENTRYPOINT ["docker-entrypoint"]
CMD ["apache2-foreground"]
~~~
https://hub.docker.com/r/aspendigital/codeigniter 소스 포크하여 사용하였습니다.   
DocumentRoot 환경변수로 추가하고 php.ini sesseion.auto_start on 설정 추가한 Dockerfile  
https://hub.docker.com/repository/docker/hojindev/codeigniter_hmvc  
  
docker-compose.yml 파일에서 환경변수 접근 가능하도록 라인 추가
~~~
version: '2.2'
services:
  web:
    image: hojindev/codeigniter_hmvc:latest
    ports:
      - "80:80"
    volumes:
      - $PWD:/var/www/html
    environment:
      - APACHE_DOCUMENT_ROOT="/var/www/html/m"
~~~
  
추가로 vurtual_host를 어떻게 구현해야할지 고민 + 아니면 실행할때 옵션으로 포트 구분해서 개발 서버는 사용
