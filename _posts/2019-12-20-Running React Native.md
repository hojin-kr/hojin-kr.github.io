---  
layout: post
title: Running React Native
gh-repo: daattali/beautiful-jekyll
tags: [react-native, app]
comments: true
---

# [Running React Native](https://facebook.github.io/react-native/docs)
신규 앱 개발에 리액트 네이티브를 적용하고자하여 스터디를 시작합니다.  
[React Native 공식 Docs 참고](https://facebook.github.io/react-native/docs)  
  
## Expo CLI Quickstart
Expo는 다양한 리엑트 툴을 미리 포함하고있어 처음 리액트 앱을 개발할 때 좋습니다. 
> Node 10 LTS 이상의 node.js가 설치되어있어야합니다.  

~~~
npm install -g expo-cli
~~~

초기 템플릿은 blank로 비어있는 상태를 선택합니다.

![choose a template](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/d0432cf0b3c9e30fc1aea32503285922/image.png)

템플릿을 선택하면 expo 초기 설정값을 지정합니다.   

![init value](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/122602c73be09790c5cf21d235eaa497/image.png)

expo name을 "helloWolrd"로 지정하면 Extracting project file...을 진행합니다.

![init name](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/120b716010b662b12a10cd2ca8694a9b/image.png)

init 작업이 완료되면 프로젝트 설치위치와 어플리케이션을 시작하는 명령어를 보여줍니다.

![init complete](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/a1eee79940d823ac0edc3e42e1c0b09e/image.png)

프로젝트 디렉토리로 이동하여 어플리케이션을 시작합니다. 
~~~
npm start
~~~

![npm start](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/eb8359ea9587bec42d43219687b5d847/image.png)

프로젝트가 시작되면 크롬창에 expo 환경이 열리며 탭에서 'Run on iOS device/emulator'를 선택하면 자동으로 시뮬레이터가 열리며 앱이 실행됩니다.

![npm start expo](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/658b9ed12d3349e7561c204c274785dc/image.png)  

***  
  
# Learn the Basics
React Native의 기본 컨셉을 이해하기 위해서는 JSX, components, state, props와 같은 몇가지 알고 들어갈 것이 있습니다. 만약에 React를 이미 알고 있다면 React Native의 특별한 몇가지만 파악한다면 쉽게 접근할 수 있습니다.   

## Hello World
항상 새로운 언어를 배울때는 인사를 먼저 배웁니다. React-Native와 인사를 합시다.  
프로젝트 디렉토리의 App.js에서 <Text>태그로 감싸진 "Open up App.js to start working on your app!"를 Hello Wolrd로 수정합니다.
 
~~~javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
~~~

![hello world](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/8ad6dc2a2fdc764c85b9f7323aeadaa0/image.png)

위 샘플코드에서  `<View><Text></Text></View>` 는 JSX 입니다. JavaScript에 포함된 XML 마크업 언어입니다. 마치 HTML 처럼 보이지만 웹의 `<div>` `<span>` 태그를 대신하는 React component입니다. `<Text>`는 React의 built-in component로 화면에 Text를 표시해줍니다. 그리고 `<View>`는 `<div>` 혹은 `<span>`과 같은 구역을 나누는 역활을 합니다.  

***  

## Props
대부분의 componet들은 각기 다른 parameter들로 개인화됩니다. 이때 전달되는 parameter들을 React Native에서는 properties를 줄여 props라고 칭합니다.  

### Props Basic Example `<Image>` Component
`<Image>`는 React Native의 기본 component입니다. 이미지를 화면에 표시하는 기능을 하며 props로 이미지의 uri 를 받습니다.
`source={pic}`와 같이 중괄호를 사용해서 javascript 변수 pic을 JSX에 포함시킬 수 있습니다.  
> 만약에 새로운 React Native app을 만든다면 수 많은 component를 만들게 될겁니다. 작성한 compoent를 표시하는데 필요한건 JSX를 반환하는 `render()` 함수를 호출하는것입니다.    
  
~~~javascript
import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';

export default class App extends Component {
  render() {
    let pic = {
      uri: 'https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dd74c34f23a198ed395694f/190d7c56cadb2b09f63c90242fbf6aa3/image.png'
    };
    return (
        <Image source={pic} style={styles.container}/>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
});

~~~  
  
![props image](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/6993b72638029ce8be3808a9e295cea6/image.png)

### Your own cmponents can also use props
앞으로 다양한 composnet를 만들게됩니다. 당연하게도 새롭게 만들어낸 Component 사이에도 Props를 전달하고 받을 수 있습니다. Props의 전달은 기본 Compoent와 마찬가지로 JSX를 통해 전달하며 받을 때는 render 함수안에서 `this.props`를 사용합니다.  


~~~javascript
import React, { Component } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';

class HelloEveryone extends Component {
  render() {
    return (
        <View>
          <Text>Hello {this.props.name}</Text>
        </View>
    );
  }
}

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <HelloEveryone name='hojin'/>
          <HelloEveryone name='sujin'/>
          <HelloEveryone name='apple'/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    top: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

~~~

![props your own](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/eed7bcfb60e8e791c833acfd45a5adb4/image.png)
