---  
layout: post
title: Github 100MB 초과 파일 업로드하기
tags: [github]
---

# Github 100MB 초과 파일 업로드하기
## 이슈
단일 파일 용량 제한에 따른 경고및 에러 발생
```
remote: warning: File Assets/Grpc/Grpc.Core/runtimes/android/x86/libgrpc_csharp_ext.so is 89.15 MB; this is larger than GitHub's recommended maximum file size of 50.00 MB
remote: error: File Assets/Grpc/Grpc.Core/runtimes/android/arm64-v8a/libgrpc_csharp_ext.so is 105.01 MB; this exceeds GitHub's file size limit of 100.00 MB
remote: error: GH001: Large files detected. You may want to try Git Large File Storage - https://git-lfs.github.com.
```

## 문제 확인
Github의 저장소는 단일 파일당 용량 제한이 있습니다. 
- 50MB 수준으로 맞추는 것을 권장합니다. (경고 발생)
- 100MB를 초과하는 파일에 대해서는 업로드를 제한합니다. (에러 발생)

## 해결
이런 경우 LFS 기술을 사용해서 큰 용량의 파일을 업로드 할 수 있습니다. 

> 공식 사이트 https://git-lfs.github.com  

### LFS 설치
```
brew install git-lfs
```

### git extention에 지정 
```
git lfs install
```

### 처리할 파일을 트래킹에 추가
```
git lfs track Assets/Grpc/Grpc.Core/runtimes/android/x86/libgrpc_csharp_ext.so
```

### 트래킹 파일에 대한 정보 커밋 및 푸시
```
git add .gitattributes
git add Assets/Grpc/Grpc.Core/runtimes/android/x86/libgrpc_csharp_ext.so
git commit -m "Add large file using lfs"
git push origin main
```

  LFS objects 업로드 프로그레스 표시
```
Uploading LFS objects:  50% (1/2), 910 MB | 2.1 MB/s         
```


> Tip. 적용하고자 하는 파일을 `add` 하기 전에 `track` 해야함으로, 먼저 `add` 되어있는 파일의 경우 `git rm —cached`  제거 후 `track` -> `add` 순서를 맞춰주어야함  

#blog/live
