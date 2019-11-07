---  
layout: post
title: 기존 환경에 로그 모니터링 구축 ELK elasticsearch, Kibana
gh-repo: daattali/beautiful-jekyll
tags: [log, monitoring, elk, kibana, elasticsearch]
comments: true
---  

# 기존 환경에 로그 모니터링 구축 ELK:Kibana

## 맥 환경에서 ELK elasticsearch, kibana 설치

### elasticsearch 를 설치합니다.
~~~
brew install elasticsearch
~~~
엘라스틱서치를 설치하기 위해서느 JAVA 8 이상의 버전이 필요합니다. 맥에 자바 8 이상의 버전이 설치되어 있지 않으면 설치가 진행되지 않습니다.
<center>![자바8요구](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/62b123493d50bb9f341dce11dd28d0d9/image.png)</center>

자바 8을 설치합니다.
<center>![자바설치](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/9ecf77e9c8dfec0f75ffeca69fc65e5f/image.png)</center>

~~~
brew cask install homebrew/cask-versions/adoptopenjdk8
~~~
자바 8 설치 후 다시 엘라스틱서치 설치를 수행하면 정상적으로 설치가 마무리됩니다.
<center>![자바8설치후정상설치](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/d91f26d3f37cb2143cc3415cf109771e/image.png)</center>


### Kibana를 설치합니다.
~~~
brew install kibana
~~~
<center>![kibana설치](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dc3793d8afbad222c166461/be9d3e57f4b6b7eec8682f030a758ce8/image.png)</center>

