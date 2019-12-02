---
layout: post
title: [버그리포트] Android App CalledFromWrongThreadException
gh-repo: daattali/beautiful-jekyll
tags: [android, bug, app]
comments: true
---    


# [버그리포트] Android App CalledFromWrongThreadException

<center><img src="https://trello-attachments.s3.amazonaws.com/5db8f4b864493b4c6f0c56bd/5de4b8e5e2f36558f8f103b9/cc321ff293f8d81b5882d56e0b035d07/image.png"></center>

~~~
Fatal Exception: android.view.ViewRootImpl$CalledFromWrongThreadException: Only the original thread that created a view hierarchy can touch its views.
       at android.view.ViewRootImpl.checkThread(ViewRootImpl.java:7820)
       at android.view.ViewRootImpl.invalidateChildInParent(ViewRootImpl.java:1349)
       at android.view.ViewGroup.invalidateChild(ViewGroup.java:5446)
       at android.view.View.invalidateInternal(View.java:14755)
       at android.view.View.invalidate(View.java:14719)
       at android.view.View.invalidate(View.java:14703)
       at android.widget.ImageView.setImageDrawable(ImageView.java:514)
       at android.support.v7.widget.AppCompatImageView.setImageDrawable(AppCompatImageView.java:99)
       at android.support.v7.widget.AppCompatImageHelper.setImageResource(AppCompatImageHelper.java:89)
       at android.support.v7.widget.AppCompatImageView.setImageResource(AppCompatImageView.java:93)
       at xxxxxxx.IntroActivity$1.run(IntroActivity.java:66)
       at java.util.TimerThread.mainLoop(Timer.java:555)
       at java.util.TimerThread.run(Timer.java:505)
~~~

일부 안드로이드 기기에서 앱이 실행되지 않고 바로 죽는 문제가 발생했습니다. firebase Crashlytics 로그를 보니 앱의 스플래쉬스크린을 담당하는 IntroActivity에서 심각한 에러가 발생하여 
앱이 죽는걸로 확인됩니다. 
표시해주는 로그로 어떤 것이 문제인지 확인합니다. UI를 바로 다루려 접근하여 발생한 에러로 확인됩니다. [안드로이드는 UI Thread를 통해서만 UI 자원접근가능](https://itmining.tistory.com/6)

## 에러 발생 부분
~~~
      @Override
      public void run() {
        counter++;

        if (counter > 30) {
          Intent mainActivity = MainActivity.getStartIntent(mActivity);
          startActivity(mainActivity);
          finish();
          cancel();

        } else {
          if (counter < 15) {
            mSplashImageView.setImageResource(splashImages[counter]);
          }
        }
      }
    };
~~~

## 수정
runOnUiTread()를 통해서 UI Thread를 사용해 접근하도록 조치합니다. 

~~~
    final TimerTask timerTask = new TimerTask() {
        @Override
        public void run() {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    counter++;

                    if (counter > 30) {
                        Intent mainActivity = MainActivity.getStartIntent(mActivity);
                        startActivity(mainActivity);
                        finish();
                        cancel();

                    } else {
                        if (counter < 15) {
                            mSplashImageView.setImageResource(splashImages[counter]);
                        }
                    }
                }
            });

        }
    };
~~~
