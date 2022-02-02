---  
layout: post
title: Go 서버와 Unity 클라이언트 gRPC 도입
tags: [Go, Unity, gRPC, server, client]
---

# Go 서버와 Unity 클라이언트 gRPC 도입
## gRPC 에 대해서 
원격에 존재하는 함수를 호출하는 형태의 구현을 지원하는 프로토콜로 proto buffer정의 파일을 중심에 두고 각 언어별 인터페이스를 자동 생성합니다. 개발자는 생성된 인터페이스를 통해 함수를 호출하면 네트워크는 gRPC에서 처리하여 원격지의 함수가 실행됩니다.


### 장점
- 서버와 클라이언트에서 정의된 명세에 의해서 인터페이스가 자동 생성
- 서버와 클라이언트 개발간 별도 문서 없이 구현체에 대한 정확한 정보 전달 및 개발이 가능
	- 서버 개발시 작성한 해당 메소드에 대한 주석이 공유되며, 인자에 대한 타입등 각 언어별로 완전하게 자동생성되어 관리됨으로 가능
- 서버 및 클라이언트 작업시 정의된 인터페이스에 대해 비즈니스 로직 설계만 신경쓰면됨
- 내부 메소드를 불러와 사용하듯 서버 기능을 가져다 쓰는 개념으로 사용할 수 있음

### 단점
- 익숙한 REST API 방식과의 차이를 이해하는 러닝 커브
- gRPC의 호환성 문제
	- Unity 엔진을 위한 패키지는 아직까지 정식 버전으로 릴리즈되지 않아 안정성을 보장하기 어려움
- 호환성 문제로 아직 적극적인 사용이 없어서 레퍼런스가 얼마 없음


# 서버 (Go)
서버는 기존에 REST API 방식의 구현과 달리 원하는 메소드를 명세하고 인터페이스를 자동 생성해 해당 인터페이스에 맞춰 로직 개발을 하며됨, 이러한 과정으로 인해서 TDD 하기 좋은 구조로 생각됩니다.

1. 공식 Quick start에 맞춰서 샘플 코드 진행

[Quick start | Go | gRPC](https://grpc.io/docs/languages/go/quickstart/)

- Proto 파일 정의
- 정읠 파일을 통해 서버 인터페이스 자동 생성

> tip. protoc 설치가 필요  
> [protobuf — Homebrew Formulae](https://formulae.brew.sh/formula/protobuf)  
> ` brew install protobuf`  

> tip. protoc을 사용하며, photo buffer + gRPC를 사용함으로 `go_grpc_out`으로 추가 out 옵션이 필요  

protoc 을 사용한 파일 변환
```
protoc --go_out=. --go_opt=paths=source_relative \
    --go-grpc_out=. --go-grpc_opt=paths=source_relative \
    helloworld/helloworld.proto
```

4. 서버 실행
Quick start 의 서버를 실행해두고 Unity Client에서 테스트를 진행할 것
```
go run greeter_server/main.go
2022/01/28 11:23:52 server listening at 127.0.0.1:50051
```

# 클라이언트 (Unity)
C#에서 gRPC를 사용하기 위해서 botnet 4.x의 버전을 사용할 필요가 있으며, gRPC관련 패키지들을 install 하여야함

nuGet에서 받아온 gRPC 의 플러그인의 권한이 실행가능하지 않도록 되어 있어서 변경
protoc에서 외부 플러그인으로 씨샵을 지정하고 수행

gitAction으로 배포하면 돌아서 수행하도록 해놔야겠다 


1. Unity에서 dotnet 패키지 매니저 Nuget 설치해서 패키지 import
NuGetForUnity 저장소에서 최신 버전의 릴리즈를 다운로드하여 Unity에 임포트
[Releases · GlitchEnzo/NuGetForUnity · GitHub](https://github.com/GlitchEnzo/NuGetForUnity/releases)


> Tip. M1 Mac에서 dotnet 을 사용하여 dotnet 패키지 설치  
```
# M1 Mac 에서 x86_x64 버전으로 dotnet 설치
arch -x86_64 /usr/local/bin/brew install dotnet
# dotnet 패키지 매니저로 
dotnet add package Grpc.Tools --version 2.43.0 
```

[Quick start | C# | gRPC](https://grpc.io/docs/languages/csharp/quickstart/)

2. NuGet packages Manager를 사용해 gRPC install
Tool -> Nuget -> package manager에서 Search에 gRPC 검색

Todo - 이미지, 설치해야하는 기본 리스트



3.  C# 클라이언트를 위한 파일 변환
Grpc csharp 플러그인을 `Grpc.Tools.2.43.0/tools/`에서 찾아 경로를 연결해서 변환 수행

- —plugin  : 사용할 플러그인 명시 및 해당 프러그인 위치 지정

```
protoc --csharp_out=. --plugin=protoc-gen-csharp_grpc=/${YOUR_WORKSPACE_DIR}/Packages/Grpc.Tools.2.43.0/tools/macosx_x64/grpc_csharp_plugin  --csharp_grpc_out=.  helloworld.proto
```

> issue.  Grpc tool의 `grpc_csharp_plugin`의 실행권한 문제  
> 해당 파일에 실행 권한을 부여 `chmod 777 grpc_csharp_plugin `  



> Todo 20220129  
> 패키지 로드 중 에러 발생  
gRPC Go 서버를 테스트로 띄워 두고 unity 클라이언트에서 테스트를 진행하였음, 그런데 gRPC 관련 패키지 관련 에러가 발생해서 진행 중단 상태, 해당 원인 파악 후 해야할듯 경고 메시지로 봤을때는, 단순히 해당 패키지가 없어서 그런걸로 생각됨, 관련된 패키지는 다 install했으나 그렇기 때문에 원인 파악이 필요함 
```
DllNotFoundException: grpc_csharp_ext
```



# 자동화
서버에서 명세를 변경하여 Github에 릴리즈하면 GitHub Action에서 트리거를 받아서 신규 생성된 정의 파일로 클라이언트 저장소에 신규 커밋으로 추가하고 푸시 후 노티
(신규 poto파일의 변환 파일은 서버 개발중 함께, 생성해서 작업 커밋에 포함 시키는걸로, 개발 도중에 어차피 파일 갱신및 생성이 이뤄짐으로 Action에서 수행할 필요는 없을것 같음, 물론 중복으로 한 번 더 해서 올리는것도 더블체크되고 좋기는 함, 커밋 신규로 서버측, 클라이언트측 생성해두고)



#todo
#draft

#개발일지/Go
#개발일지/gRPC


