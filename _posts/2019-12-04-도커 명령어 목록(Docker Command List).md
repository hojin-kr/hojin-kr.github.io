
### 실행중인 컨테이너에서 bash 실행
```shell
$ docker exec -it 7c172 /bin/bash
```
---  
layout: post
title: 도커 명령어 목록 (Docker Command List)
gh-repo: daattali/beautiful-jekyll
tags: [docker]
comments: true
---  

### 실행중인 컨테이너 목록 (Running container list)
실행중인 컨테이너의 ID, IMAGE NAMES, COMMAND, CREAGED, STATUS, PORTS를 표시
```shell
$ docker ps
```
### 실행중인 컨테이너 중지
컨테이너 고유 아이디로 중지시킴, 단축하여 명시 가능
```shell
$ docker stop 7c172
```
### 컨테이너 삭제
컨테이너 고유 아이디로 삭제
```shell
$ docker rm 7c172
```
### 컨테이너 이미지 삭제
컨테이너 이미지 고유 아이디로 삭제
```shell
$ docker rmi 7c172
```
### Dockerfile로 이미지 빌드
현재 디렉토리에 있는 Dockerfile을 기반으로 이미지 빌드
```shell
$ docker build -t hojindev/codeigniter-virtualhost .
```
### Docker hub에 Push
로컬에 가지고 있는 latest 태그의 이미지 docker hub에 푸시, 원격 저장소가 없다면 자동으로 생성함
```shell
$ docker push hojindev/codeigniter-virtualhost:latest
```
### Docker hub에서 Pull
원격 저장소 (docker hub)에서 해당 이미지 Pulling
```shell
$ docker pull hojindev/codeigniter-virtualhost
```
### 컨테이너 전체 삭제
로컬에 있는 전체 컨테이너 삭제 (ps 수행 후 그 값으로 삭제 수행)
```shell
$ docker rm $(docker ps -a -q)
```
### 컨테이너 이미지 전체 삭제
로컬에 있는 전체 컨테이너 이미지 삭제 (images 수행 후 그 값으로 삭제 수행)  
```shell
$ docker rmi $(docker images -q)
```

```shell
$ 
```
