---  
layout: post
title: Android WebView Error Handle and and Refresh
gh-repo: daattali/beautiful-jekyll
tags: [android, webview, error]
comments: true
---


# How to Handle Error and Redirect in Android WebView

I tried to handle an error and refresh it during managing the application, Android WebView.

<center><img width="50%;" src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5dd388de5c99101842e73c86/d73ec14de8e62a575c7b1d997c022acd/image.png" alt="img"></center>

Using ‘onRecevedError()’ Handle WebView error If an error is detected, WebView is loding local error page(in file://android_asset).

~~~
//MainActivity.java
    mWebView.setWebViewClient(new WebViewClient() {
      
      @SuppressWarnings("deprecation")
      @Override
      public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
        // Handle the error
        Log.e("error","ReceivedError on WebView. ERROR CODE is " + errorCode);
        Log.e("error","description is " + description);
        Log.e("error","failingUrl is " + failingUrl);
        try{
          view.loadUrl("file:///android_asset/www/error.html?errorCode=" + errorCode + "&errorDescription=" + description);
        }catch  (Exception e) {
          Log.e("error", e.toString());
        }
      }
      ...
~~~

This is a part of error.html file. I think this is incorrect but it works anyway. If user meets this page, he can use the refresh button and it will send users to the main page of the app.

~~~
<!-- app/src/main/assets/www/error.html  -->
<body>
<div class="errorText">
    <div id="error-customer-guide"></div>
    <p>새로 고침을 눌러 앱을 다시 불러올 수 있습니다.</p>
    <p id="error-code"></p>

</div>
<div class="refreshBtn">
   <a href="https://service-main-domain"><button>새로고침</button></a>
</div>

</body>

<script>
    let urlParams = new URLSearchParams(window.location.search);
    let errorCode = urlParams.get('errorCode');
    let errorDescription = urlParams.get('errorDescription');


    // 오류 코드에 맞춰 적절히 안내 문구를 작성해준다.
    switch(errorCode) {
        case '-2': // net::ERR_INTERNET_DISCONNECTED 오류인 경우
            document.getElementById('error-customer-guide').innerHTML = '인터넷 연결을 확인해주세요';
            break;
        default:
            document.getElementById('error-customer-guide').innerHTML = '오류가 발생했습니다 (' + errorCode + ')';
            break;
    }


</script>
~~~
