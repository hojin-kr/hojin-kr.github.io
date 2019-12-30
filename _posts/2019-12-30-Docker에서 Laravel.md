---  
layout: post
title: Docker에서 Laravel
gh-repo: daattali/beautiful-jekyll
tags: [docker, laravel]
comments: true
---

## Docker에서 Laravel
- laravel + mariaDB

[bitnami docker laravel](https://github.com/bitnami/bitnami-docker-laravel)

~~~
$ mkdir ~/myapp && cd ~/myapp
$ curl -LO https://raw.githubusercontent.com/bitnami/bitnami-docker-laravel/master/docker-compose.yml
$ docker-compose up
~~~

### Docker Container ID 확인 및 해당 Container에서 bash shell 실행
~~~
❯ docker ps
CONTAINER ID        IMAGE                        COMMAND                  CREATED             STATUS              PORTS                    NAMES
e5251ff1a5ef        bitnami/laravel:6-debian-9   "/app-entrypoint.sh …"   5 minutes ago       Up 5 minutes        0.0.0.0:3000->3000/tcp   backend_myapp_1
9ca4a5b884a9        bitnami/mariadb:10.1         "/entrypoint.sh /run…"   5 minutes ago       Up 5 minutes        3306/tcp                 backend_mariadb_1

~
❯ docker exec -it e5  /bin/bash
bitnami@e5251ff1a5ef:/app$
~~~

### 로그인 인증
~~~
composer require laravel/ui --dev

php artisan ui vue --auth
~~~
