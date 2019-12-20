---  
layout: post
title: Running React Native
gh-repo: daattali/beautiful-jekyll
tags: [react-native, app]
comments: true
---

# [Running React Native](https://facebook.github.io/react-native/docs/getting-started)
신규 앱 개발에 리액트 네이티브를 적용하고자하여 [React Native 공식 Docs](https://facebook.github.io/react-native/docs/getting-started)를 참고하여 스터디를 시작합니다.  

  
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

[`flexDirection`](https://facebook.github.io/react-native/docs/layout-props#flexdirection) controls the direction in which the children of a node are laid out. This is also referred to as the _main axis_. The cross axis is the axis perpendicular to the main axis, or the axis which the wrapping lines are laid out in.

- `row` Align children from left to right. If wrapping is enabled then the next line will start under the first item on the left of the container.

- `column` (**default value**) Align children from top to bottom. If wrapping is enabled then the next line will start to the left first item on the top of the container.

- `row-reverse` Align children from right to left. If wrapping is enabled then the next line will start under the first item on the right of the container.

- `column-reverse` Align children from bottom to top. If wrapping is enabled then the next line will start to the left first item on the bottom of the container.

LEARN MORE [HERE](https://yogalayout.com/docs/flex-direction)

```SnackPlayer name=Flex%20Direction
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

### Layout Direction

Layout direction specifies the direction in which children and text in a hierarchy should be laid out. Layout direction also affects what edge `start` and `end` refer to. By default React Native lays out with LTR layout direction. In this mode `start` refers to left and `end` refers to right.

- `LTR` (**default value**) Text and children are laid out from left to right. Margin and padding applied the start of an element are applied on the left side.

- `RTL` Text and children are laid out from right to left. Margin and padding applied the start of an element are applied on the right side.

#### Justify Content

[`justifyContent`](https://facebook.github.io/react-native/docs/layout-props#justifycontent) describes how to align children within the main axis of their container. For example, you can use this property to center a child horizontally within a container with `flexDirection` set to `row` or vertically within a container with `flexDirection` set to `column`.

- `flex-start`(**default value**) Align children of a container to the start of the container's main axis.

- `flex-end` Align children of a container to the end of the container's main axis.

- `center` Align children of a container in the center of the container's main axis.

- `space-between` Evenly space of children across the container's main axis, distributing remaining space between the children.

- `space-around` Evenly space of children across the container's main axis, distributing remaining space around the children. Compared to `space-between` using `space-around` will result in space being distributed to the beginning of the first child and end of the last child.

- `space-evenly` Evenly distributed within the alignment container along the main axis. The spacing between each pair of adjacent items, the main-start edge and the first item, and the main-end edge and the last item, are all exactly the same.

LEARN MORE [HERE](https://yogalayout.com/docs/justify-content)

```SnackPlayer name=Justify%20Content
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

[`alignItems`](https://facebook.github.io/react-native/docs/layout-props#alignitems) describes how to align children along the cross axis of their container. Align items is very similar to `justifyContent` but instead of applying to the main axis, `alignItems` applies to the cross axis.

- `stretch` (**default value**) Stretch children of a container to match the `height` of the container's cross axis.

- `flex-start` Align children of a container to the start of the container's cross axis.

- `flex-end` Align children of a container to the end of the container's cross axis.

- `center` Align children of a container in the center of the container's cross axis.

- `baseline` Align children of a container along a common baseline. Individual children can be set to be the reference baseline for their parents.

> For `stretch` to have an effect, children must not have a fixed dimension along the secondary axis. In the following example, setting `alignItems: stretch` does nothing until the `width: 50` is removed from the children.

LEARN MORE [HERE](https://yogalayout.com/docs/align-items)

```SnackPlayer name=Align%20Items
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

[`alignSelf`](https://facebook.github.io/react-native/docs/layout-props#alignself) has the same options and effect as `alignItems` but instead of affecting the children within a container, you can apply this property to a single child to change its alignment within its parent. `alignSelf` overrides any option set by the parent with `alignItems`.

![Align Self](https://cdn-images-1.medium.com/max/800/1*J1JCoKwLCokX9JXVBvP71g.png)

### Align Content

[alignContent](https://facebook.github.io/react-native/docs/layout-props#aligncontent) defines the distribution of lines along the cross-axis. This only has effect when items are wrapped to multiple lines using `flexWrap`.

- `flex-start` (**default value**) Align wrapped lines to the start of the container's cross axis.

- `flex-end` Align wrapped lines to the end of the container's cross axis.

- `stretch` wrapped lines to match the height of the container's cross axis.

- `center` Align wrapped lines in the center of the container's cross axis.

- `space-between` Evenly space wrapped lines across the container's main axis, distributing remaining space between the lines.

- `space-around` Evenly space wrapped lines across the container's main axis, distributing remaining space around the lines. Compared to space between using space around will result in space being distributed to the begining of the first lines and end of the last line.

LEARN MORE [HERE](https://yogalayout.com/docs/align-content)

![Align Content](https://cdn-images-1.medium.com/max/800/1*cC2XFyCF_igp20Ombt4wBw.png)

### Flex Wrap

The [`flexWrap`](https://facebook.github.io/react-native/docs/layout-props#flexwrap) property is set on containers and controls what happens when children overflow the size of the container along the main axis. By default children are forced into a single line (which can shrink elements). If wrapping is allowed items are wrapped into multiple lines along the main axis if needed.

When wrapping lines `alignContent` can be used to specify how the lines are placed in the container. learn more [here](https://yogalayout.com/docs/flex-wrap)

![Flex Wrap](https://cdn-images-1.medium.com/max/800/1*_7v4uQhSsuCn1cfeOMVfrA.png)

### Flex Basis, Grow, and Shrink

- [`flexGrow`](https://facebook.github.io/react-native/docs/layout-props#flexgrow) describes how any space within a container should be distributed among its children along the main axis. After laying out its children, a container will distribute any remaining space according to the flex grow values specified by its children.

  flexGrow accepts any floating point value >= 0, with 0 being the default value. A container will distribute any remaining space among its children weighted by the child’s flex grow value.

- [`flexShrink`](https://facebook.github.io/react-native/docs/layout-props#flexshrink) describes how to shrink children along the main axis in the case that the total size of the children overflow the size of the container on the main axis. Flex shrink is very similar to flex grow and can be thought of in the same way if any overflowing size is considered to be negative remaining space. These two properties also work well together by allowing children to grow and shrink as needed.

  Flex shrink accepts any floating point value >= 0, with 1 being the default value. A container will shrink its children weighted by the child’s flex shrink value.

- [`flexBasis`](https://facebook.github.io/react-native/docs/layout-props#flexbasis) is an axis-independent way of providing the default size of an item along the main axis. Setting the flex basis of a child is similar to setting the `width` of that child if its parent is a container with `flexDirection: row` or setting the `height` of a child if its parent is a container with `flexDirection: column`. The flex basis of an item is the default size of that item, the size of the item before any flex grow and flex shrink calculations are performed.

LEARN MORE [HERE](https://yogalayout.com/docs/flex)

### Width and Height

The `width` property in Yoga specifies the width of the element's content area. Similarly height property specifies the `height` of the element's content area.

Both `width` and `height` can take following values:

- `auto` Is the **default Value**, React Native calculates the width/height for the element based on its content, whether that is other children, text, or an image.

- `pixels` Defines the width/height in absolute pixels. Depending on other styles set on the component, this may or may not be the final dimension of the node.

- `percentage` Defines the width or height in percentage of its parent's width or height respectively.

### Absolute & Relative Layout

The `position` type of an element defines how it is positioned within its parent.

`relative` (**default value**) By default an element is positioned relatively. This means an element is positioned according to the normal flow of the layout, and then offset relative to that position based on the values of `top`, `right`, `bottom`, and `left`. The offset does not affect the position of any sibling or parent elements.

`absolute` When positioned absolutely an element doesn't take part in the normal layout flow. It is instead laid out independent of its siblings. The position is determined based on the `top`, `right`, `bottom`, and `left` values.

![Absolute & Relative Layoutp](https://cdn-images-1.medium.com/max/800/1*NlPeRQCQK3Vb5nyjL0Mqxw.png)

#### Going Deeper

Check out the interactive [yoga playground](https://yogalayout.com/playground) that you can use to get a better understanding of flexbox.

We've covered the basics, but there are many other styles you may need for layouts. The full list of props that control layout is documented [here](./layout-props.md).

We're getting close to being able to build a real application. One thing we are still missing is a way to take user input, so let's move on to [learn how to handle text input with the TextInput component](handling-text-input.md).

See some examples from [Wix Engineers](https://medium.com/wix-engineering/the-full-react-native-layout-cheat-sheet-a4147802405c):

