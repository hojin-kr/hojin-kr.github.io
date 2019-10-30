---  
layout: post
title: npm vue webpack json 설정
gh-repo: daattali/beautiful-jekyll
tags: [npm, vue, node, webpack]
comments: true
---  

### package.json

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

### /node_modules/hooper/dist/hooper.css Unexpected token (1:0)
You may need an appropriate loader to handle this file type.

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

