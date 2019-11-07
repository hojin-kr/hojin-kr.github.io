---  
layout: post
title: 맥 환경에서 ELK elasticsearch, Kibana 설치
gh-repo: daattali/beautiful-jekyll
tags: [log, monitoring, elk, kibana, elasticsearch]
comments: true
---  

# 맥 환경에서 ELK elasticsearch, kibana 설치

### Elasticsearch 를 설치합니다.
~~~
brew install elasticsearch
~~~
Elasticsearch를 설치하기 위해서느 JAVA 8 이상의 버전이 필요합니다. 맥에 JAVA 8 이상의 버전이 설치되어 있지 않으면 설치가 진행되지 않습니다.
<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/62b123493d50bb9f341dce11dd28d0d9/image.png" width="80%;"></center>

JAVA 8을 설치합니다.
<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/9ecf77e9c8dfec0f75ffeca69fc65e5f/image.png" width="80%;"></center>

~~~
brew cask install homebrew/cask-versions/adoptopenjdk8
~~~
JAVA 8 설치 후 다시 엘라스틱서치 설치를 수행하면 정상적으로 설치가 마무리됩니다.

<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/d91f26d3f37cb2143cc3415cf109771e/image.png" width="80%;"></center>

### Kibana를 설치합니다.
~~~
brew install kibana
~~~
<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/be9d3e57f4b6b7eec8682f030a758ce8/image.png" width="80%;"></center>

## ELK Elasticsearch, Kibana 실행
터미널에서 각 명령러를 이용해 Elasticsearch -> Kibana 순서로 실행합니다. 
~~~
elasticsearch
~~~
Elasticsearch를 실행하고 다른 터미널에서 Kibana를 실행합니다.
~~~
kibana
~~~
<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/06c97b3efe060cd61a56025fdbc2727c/image.png" width="80%;"></center>
  
Elasticsearch를 실행한 상태에서 Kibana를 실행하면 상호작용하며 연결된 모습을 확인할 수 있습니다.

## Kibana 접속
웹 브라우저를 이용해 Kibana의 환경에 접속할 수 있습니다. 접속 주소는 Kibana를 실행한 터미널에 로그로 확인할 수 있습니다.
~~~
http://localhost:5601/
~~~

<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/ba9dfb3b05c77fb732fad6daa8000f89/image.png" width="80%;"></center>
Sample Data로 띄운 Kibana 환경

# Filebeat 연결해서 데이터 띄우기
Filebeat로 var/logs에 남는 모든 log를 수집해 ElasticSearch와 연결하여 Kibana를 통해 데이터를 확인해봅시다.
 
Filebeat 설치
~~~
brew install filebeat
~~~
brew 로 설치한 filebeat의 설정파일 위치는 다음과 같습니다.
~~~
/usr/local/etc/filebeat 
~~~

filebeat.yml을 수정하여 ElasticSearch와 연결하여 Kibana를 통해 데이터를 확인해봅시다.



