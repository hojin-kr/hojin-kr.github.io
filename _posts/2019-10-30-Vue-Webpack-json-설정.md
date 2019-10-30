---  
layout: post
title: npm vue webpack json 설정
gh-repo: daattali/beautiful-jekyll
tags: [npm, vue, node, webpack]
comments: true
---  

### package.json
package.json은 해당 앱의 빌드 설정 및 의존성을 관리합니다. npm install 을 사용하여 새로운 패키지를 설치하면 package.json에 추가되며 이후에 다른 환경에서 동일 패키지 환경을 구성할 수 있습니다.

~~~
{
  "name": "codeigniter-webpack",
  "version": "1.0.0",
  "description": "webpack project for codeigniter",
  "main": "index.js",
  "scripts": {
    "build": "webpack --mode production",
    "build-dev": "webpack --mode development"
  },
  "author": "janghojin",
  "license": "ISC",
  "devDependencies": {
    "vue-loader": "^15.7.1",
    "vue-template-compiler": "^2.6.10",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.9",
    "webpack-dev-server": "^3.8.2"
  },
  "dependencies": {
    "css-loader": "^3.2.0",
    "hooper": "^0.3.4",
    "style-loader": "^1.0.0",
    "vue": "^2.6.10"
  }
}
~~~


### webpack.config.js
빌드 될 파일의 시작지점, webpack에서 사용할 모듈을 정의합니다. npm install로 특정 패키지를 설치하더라도 mudile의 rules을 확인하고 추가해주어야합니다. 주로 발생하는 에러로는 xxxx.css Unexpected token 과 같이 css 파일을 webpack에서 해석하지 못하여 빌드를 실패하는 경우가 있습니다.

~~~
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: {
    '../../js/vue/buildVue': './src/main.js'
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
    ]
  },

  resolve: {
    alias: {
      'vue$':'vue/dist/vue.esm.js'
    }
  },

  plugins: [
    new VueLoaderPlugin()
  ]
}
~~~


#### CodeIgniter 환경 내부에 적용 wepack + vue 

![directory](https://trello-attachments.s3.amazonaws.com/5db8f4ec38c7480da1157f2f/344x170/6945def226a7599c32d1921049a85ed6/image.png)

webpack.config.json에서 entry: 를 변경하여 codeigniter에서 js를 관리하는 폴더로 빌드 파일을 생성하도록 수정하였음

~~~
/+
  entry: {
    '../../js/vue/buildVue': './src/main.js'
  },

~~~

### 스타일 로드 에러

{: .box-error}
/node_modules/hooper/dist/hooper.css Unexpected token (1:0) You may need an appropriate loader to handle this file type.

'''
npm install style-loader
'''
로 패키지를 설치하였지만 다음과 css 를 해석하지 못한다는 에러가 표시된다면 webpack.config.json, webpack 설정 파일을 확인합니다.

webpack에서 css 를 로드할 수 있도록 모듈 추가

~~~
npm install style-loader
npm install css-loader
~~~

~~~
//webpack.config.json
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }
~~~

