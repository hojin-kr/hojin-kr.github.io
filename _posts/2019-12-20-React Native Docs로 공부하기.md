---  
layout: post
title: Running React Native
gh-repo: daattali/beautiful-jekyll
tags: [react-native, app]
comments: true
---

# [Running React Native](https://facebook.github.io/react-native/docs/getting-started)
신규 앱 개발에 리액트 네이티브를 적용하고자하여 [React Native 공식 Docs](https://facebook.github.io/react-native/docs/getting-started)를 통해 스터디를 진행합니다.   

  
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
  
`HelloEveryone` component로 name props를 보내고 `HelloEveryon` component는 name을 받아 문장을 만들어 화면에 표시합니다. 

~~~javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

우리는 이제 component그리고 props를 사용해서 앱의 정적인 화면을 구성할 수 있습니다. 이제 상태에 따라 바귀는 앱을 구성하기 위해 `State`에 대해서 배웁니다.

***

## State
React Native는 Component를 관리하는 props와 state 두가지 타입의 데이터를 가집니다. props는 부모가 component에 전달하는 정적 값입니다. 그리고 data에 변화를 주기위해서는 state를 사용합니다. 일반적으로 생성자에서 state를 선언하고 변화가 필요할때 setState를 호출하여 사용합니다.   

### State Example
Blink는 깜빡이는 텍스트를 표시합니다. Blink가 호출될때 한 번 props로 텍스트를 받아와서 설정하고 `this.setState`로 state를 변경하여 component의 텍스트가 시간에 따라 보여졌다가 안보여졌다가 하도록합니다.  `setState`가 호출될때 React Native는 App Component를 re-render 합니다. 결과적으로 매 초에 마다 component는 re-render 됩니다.

실제 서비스에서는 앱이 복잡할 수록 component간 props및 state의 의존관계가 복잡해지기 때문에  공통의 데이터에 대해 효율적으로 관리할 수 있도록 React Native는 Redux나 Mobx와 같이 데이터 흐름을 관리하는 라이브러리를 가지고 있습니다. 

~~~javascript
import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class Blink extends Component {
  componentDidMount() {
    // 매 초마다 state를 toggle합니다.
    setInterval(() => (
        this.setState(previousState => (
            { isShowingText: !previousState.isShowingText }
        ))
    ), 1000);
  }

  //state 객체
  state = { isShowingText: true };

  render() {
    if (!this.state.isShowingText) {
      return null;
    }

    return (
        <Text>{this.props.text}</Text>
    );
  }
}

export default class App extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Blink text='Hello World blink' />
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

## Style
React Native이 가지는 대부분의 중심 component는 style props를 가집니다. 그리고 style의 값은 대부분의 CSS 와 일치합니다. 또한, React Native에서 CSS 속성값의 네이밍 방식은 CamelCase를 따릅니다.  
~~~javascript
const styles = StyleSheet.create({
  container: {
    top: 100,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
~~~

styles은 StyleSheet.create를 사용하여 정의합니다. 이렇게 정의한 styles는 component의 style props의 값으로 사용합니다.

***

## Height and Width
각 요소에 width, height style을 지정함으로써 높이와 너비 크기를 지정할 수 있습니다. 독특한 점은 React Native의 모든 크기는 단위를 가지지 않고 desnsity-independent pixels로 표현됩니다. 높이와 너비 정의는 Fixed와 Flex로 나눌 수 있습니다. 

### Fixed
Fixed 방식은 width와 height에 정확한 수치를 주어 해당 높이와 너비로 보여지게합니다. 이 방식으로 크기를 표현할 경우 화면 크기에 상관없이 항상 정확하게 같은 크기로 표현합니다.

~~~javascript
import React, { Component } from 'react';
import { StyleSheet, View} from 'react-native';

export default class App extends Component {
  render() {
    return (
        <View>
          <View style={styles.containerFirst}/>
          <View style={styles.containerSecond}/>
          <View style={styles.containerThird}/>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  containerFirst: {
    width: 50,
    height: 50,
    backgroundColor: 'powderblue',
  },
  containerSecond: {
    width: 100,
    height: 100,
    backgroundColor: 'skyblue',
  },
  containerThird: {
    width: 150,
    height: 150,
    backgroundColor: 'steelblue',
  },
});
~~~

![fixed dimension](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/583496623eeb01b85199037026331959/image.png)

### Flex
Flex 로 화면을 구성할 경우 component의 크기를 사용가능한 공간에 동적으로 확장및 축소합니다. 보통 `flex: 1`로 설정하면 component가 사용가능한 전체 공간을 차지합니다. 

~~~javascript
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class App extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerFirst}/>
                <View style={styles.containerSecond}/>
                <View style={styles.containerThird}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerFirst: {
        flex: 1,
        backgroundColor: 'powderblue',
    },
    containerSecond: {
        flex: 2,
        backgroundColor: 'skyblue',
    },
    containerThird: {
        flex: 3,
        backgroundColor: 'steelblue',
    },
});
~~~

![flex dimension](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/02e01ba7a19c45ef0dd21c5f8fccd41b/image.png)

***

## Layout with Flexbox
component의 layout은 Flexbox를 통해서 구성할 수 있습니다. Flexbox는 각기 다른 화면에 대응하기 위해 디자인됬습니다. 보통 `flexDirecrtion`, `alignItems`, `justifyContent`의 조합으로 React Native의 화면을 구성합니다.  

### Flex
flex는 화면에서 사용 가능한 공간을 어떻게 구성하는지 정의합니다. 공간은 각 요소의 flex 속성에 따라 나뉩니다. view에 각 요소를 `flex: 1`, `flex: 2`, `flex: 3` 으로 정의했다면 각 flex 속성 값의 합(1+2+3=6)에 따라서 `flex: 1`을 정의한 요소는 전체중에 1/6의 공간을 차지하고 `flex: 2`는 2/6의 공간, `flex: 3`은 3/6의 공간을 차지합니다.  

![flex dimension](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/02e01ba7a19c45ef0dd21c5f8fccd41b/image.png)

#### Flex Direction
> 이하 단순 이미지 예시와 설명이 많아서 flex 관련 아래 이미지는 [React Native docs](https://github.com/facebook/react-native-website)애서 가져왔습니다.

[`flexDirection`](https://facebook.github.io/react-native/docs/layout-props#flexdirection) 는 flex에 포함되는 자식들의 배치 방향을 결정합니다. 

- `row` 자식 요소들이 왼쪽에서 오른쪽으로 정렬됩니다.

- `column` (**default value**) 자식 요소들이 위에서 아래로 정렬됩니다.

- `row-reverse` 자식 요소들이 오른쪽에서 왼쪽으로 정렬됩니다.

- `column-reverse` 자식 요소들이 아래에서 위로 정렬됩니다.

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

export default class FlexDirectionBasics extends Component {
  render() {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

![Flex Direction](https://cdn-images-1.medium.com/max/800/1*rA7IbuUsJWsx6evKAsabVw.png)

#### Justify Content

[`justifyContent`](https://facebook.github.io/react-native/docs/layout-props#justifycontent) 자식들이 기본 축에서 어떻게 정렬될지를 정의합니다.

- `flex-start`(**default value**) 컨테이너의 자식을 컨테이너의 시작에 지점에 맞춥니다.

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

export default class JustifyContentBasics extends Component {
  render() {
    return (
      // Try setting `justifyContent` to `center`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

![Justify Content](https://cdn-images-1.medium.com/max/800/1*i5TVlme-TisAVvD5ax2yPA.png)

#### Align Items

[`alignItems`](https://facebook.github.io/react-native/docs/layout-props#alignitems) `justifyContent`와 유사하지만 교차축에 대해서 정렬이 적용됩니다. 

- `stretch` (**default value**) container의 height와 일치할 때까지 자식 요소를 늘립니다.

```javascript
import React, { Component } from 'react';
import { View } from 'react-native';

export default class AlignItemsBasics extends Component {
  render() {
    return (
      // Try setting `alignItems` to 'flex-start'
      // Try setting `justifyContent` to `flex-end`.
      // Try setting `flexDirection` to `row`.
      <View style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
      }}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{height: 50, backgroundColor: 'skyblue'}} />
        <View style={{height: 100, backgroundColor: 'steelblue'}} />
      </View>
    );
  }
};
```

![Align Items](https://cdn-images-1.medium.com/max/800/1*evkM7zfxt-9p-HJ1M0Bh2g.png)

### Align Self

[`alignSelf`](https://facebook.github.io/react-native/docs/layout-props#alignself) `alignItems`와 같은 효과를 줍니다. 하지만 `alignSelf`는 container 내부 요소에 대해서 각각 지정할 수 있습니다. `alignSelf`는 `alignItems`를 오버라이드합니다.

![Align Self](https://cdn-images-1.medium.com/max/800/1*J1JCoKwLCokX9JXVBvP71g.png)

### Align Content

![Align Content](https://cdn-images-1.medium.com/max/800/1*cC2XFyCF_igp20Ombt4wBw.png)

### Flex Wrap

![Flex Wrap](https://cdn-images-1.medium.com/max/800/1*_7v4uQhSsuCn1cfeOMVfrA.png)

### Absolute & Relative Layout

![Absolute & Relative Layoutp](https://cdn-images-1.medium.com/max/800/1*NlPeRQCQK3Vb5nyjL0Mqxw.png)

***

## Handling Text Input  
`TextInput`은 유저의 텍스트 입력을 받는 기본 component 입니다. `onChangeText` props로 텍스트가 바뀔때 마다 호출되며 `onSubmitEditing` props는 텍스트가 submit될 때 호출 됩니다.

다음 예제는 TextInput으로 입력받은 값을 state에 저장하고 text로 다시 출력합니다.
  
~~~javascript
import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {text: ''};
    }

    render() {
        return (
            <View style={{padding: 50}}>
                <TextInput
                    style={{height: 40}}
                    placeholder="Type here to translate!"
                    onChangeText={(text) => this.setState({text})}
                    value={this.state.text}
                />
                <Text style={{padding: 10, fontSize: 42}}>
                    {this.state.text}
                </Text>
            </View>
        );
    }
}
~~~

![text input](https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dfc24d987d9e38d7571251f/1bdf9a5bb8017b017142614bfb953491/image.png)

***

## Handling Touches
버튼을 tapping, 리스트를 scrolling, 지도를 zooming 하는것 처럼 모바일 앱은 다양한 터치 방식의 조합으로 작동합니다. React Native는 모든 표준 터치 방식을 지원합니다.  

### 기본 button 표시하기
Button은 모든 플랫폼에서 지원하는 기본 component입니다. 

~~~javascript
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default class ButtonBasics extends Component {
  _onPressButton() {
    alert('You tapped the button!')
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            onPress={this._onPressButton}
            title="Press Me"
            color="#841584"
          />
        </View>
        <View style={styles.alternativeLayoutButtonContainer}>
          <Button
            onPress={this._onPressButton}
            title="This looks great!"
          />
          <Button
            onPress={this._onPressButton}
            title="OK!"
            color="#841584"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: 'center',
  },
  buttonContainer: {
    margin: 20
  },
  alternativeLayoutButtonContainer: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

~~~

***

## ScrollView 사용하기
React Native에서 ScrollView는 매우 간단하게 구현할 수 있습니다. `<ScrollView>` component로 감싸주기만 하면 됩니다.  

~~~javascript
import React, { Component } from 'react';
import { ScrollView, Image, Text } from 'react-native';

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
    render() {
        return (
            <ScrollView>
                <Text style={{fontSize:96}}>Scroll me plz</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>If you like</Text>
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Image source={{uri: "https://facebook.github.io/react-native/img/tiny_logo.png", width: 64, height: 64}} />
                <Text style={{fontSize:96}}>Scrolling down</Text>
            </ScrollView>
        );
    }
}
~~~

***
 
## List views 사용하기
React Native는 데이터 리스트를 표현하기 위해 `FlatList`와 `SectionList`를 제공합니다.  

FlatList는 ScrollView와는 다르게 현재 화면에 표시되는 요소만을 render 합니다. 또한 data와 renderItem 두 props를 가집니다. data는 리스트의 값 목록이고 renderItem은 각각의 값이 render될 component 형식을 나타냅니다.
