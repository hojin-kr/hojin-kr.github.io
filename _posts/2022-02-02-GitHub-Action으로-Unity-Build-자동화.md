---
layout: post
title: GitHub Action으로 Unity Build 및 Deploy 자동화
tags: [ci,cd,unity,github,action]
---

# GitHub Action으로 Unity Build 및 Deploy 자동화
github Action을 활용해서 원하는 깃허브 Unity 프로젝트를 빌드하고 결과물을 생성합니다.   
Android의 경우 원하는 테스트 트랙으로 자동 배포합니다.   

- Android : .apk
- ios : xcode project

github repository : [https://github.com/hojin-kr/builder-unity-ci](https://github.com/hojin-kr/builder-unity-ci)

> 참고 : builder-unity-ci, unity build ci open source project  
> [https://github.com/game-ci/unity-builder](https://github.com/game-ci/unity-builder) 

# Workflow 
* just-build : 빌드를 수행 후 apk, iOS project 파일을 artifact로 저장합니다.
* releaseToGooglePlay : 빌드 수행 후 google Play의 테스트 트랙으로 배포합니다.
* remove-old-artifacts : github 비용 관리를 위해 매일 정해진 시간에 저장된 artifact를 제거하여 저장소를 비웁니다.
 

## 버전
workflow 실행시 명시적으로 지정합니다.    
![](https://user-images.githubusercontent.com/22079767/141799344-bbb3548b-89e9-42aa-90ec-a63608e7d1b2.png)


#blog/live