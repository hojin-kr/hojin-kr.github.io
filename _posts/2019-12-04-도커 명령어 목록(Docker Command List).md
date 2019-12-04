
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
```shell
$ docker ps
```
### 실행중인 컨테이너 중지
```shell
$ docker stop 7c172
```
### 컨테이너 삭제
```shell
$ docker rm 7c172
```
### 컨테이너 이미지 삭제
```shell
$ docker rmi 7c172
```
### Dockerfile로 이미지 빌드
```shell
$ docker build -t hojindev/codeigniter-virtualhost .
```
### Docker hub에 Push
```shell
$ docker push hojindev/codeigniter-virtualhost:latest
```
### Docker hub에서 Pull
```shell
$ docker pull hojindev/codeigniter-virtualhost
```
### 컨테이너 전체 삭제
```shell
$ docker rm $(docker ps -a -q)
```
### 컨테이너 이미지 전체 삭제
```shell
$ docker rmi $(docker images -q)
```
```shell
$ 
```
