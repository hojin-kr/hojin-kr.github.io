---  
layout: post
title: Github Action Artifact Remove 스케쥴링으로 제거
tags: [CI/CD, 개발일지]
---

# Github Action Artifact Remove 스케쥴링으로 제거
### 이슈
Artifact Storage 의 저장 한도를 초과하는 경우 새로운 Artifact를 생성할 수 없다는 애러 발생

```
Error: Create Artifact Container failed: Artifact storage quota has been hit. Unable to upload any new artifacts
```

### 해결
Setting/Action 에 Artifact and log retention 으로 보관 기한을 설정 할 수 있지만 명시적로 필요 없는 Artifact를 제거

[GitHub - c-hive/gha-remove-artifacts: GitHub Action to customize artifact cleanup](https://github.com/c-hive/gha-remove-artifacts)

cron 스케쥴 작성 방식으로 원하는 주기, 혹은 workflow 통해서 Artifact 제거 작업을 수행하도록하고 수행 시 Webhook을 통해 SNS(Discord)로 noti를 받음

```
name: Remove old artifacts
on:
  schedule:
    # Every day at 1am
    - cron: '0 1 * * *'
  workflow_dispatch:
jobs:
  remove-old-artifacts:
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
    - name: Remove old artifacts
      uses: c-hive/gha-remove-artifacts@v1
      with:
        age: '3 day'
        # Optional inputs
        # skip-tags: true
        # skip-recent: 5

    # webhook noti
    - name: webhook noti
      run: |- 
        curl -d '{"content":"buildTest1 Remove old artifacts ... "}' -H "Content-Type: application/json" -X POST https://discord.com/api/webhooks/${WEBHOOK_KEY}

```

#개발일지/CICD

