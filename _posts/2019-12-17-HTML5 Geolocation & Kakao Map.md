---  
layout: post
title: HTML5 Geolocation & Kakao Map
gh-repo: daattali/beautiful-jekyll
tags: [map, html, geolocation]
comments: true
---

position_set() 메소드를 호출하면 Geolocation 사용 가능여부 및 권한을 확인합니다.
그리고 현재 위치를 지도의 가운데로 이동하고 좌표에 해당하는 주소를 출력합니다.
```javascript
    //현재 중심 좌표의 주소를 반환
    var callback = function (result, status) {
        if (status === daum.maps.services.Status.OK) {
            $("#yourForm").val(result[0].address.address_name);
        }
    };

   //HTML5 API를 사용하여 현재위치를 지도 중심으로 이동
    function position_set() {
        //지오로케이션 사용 가능 여부 확인
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (location) {
                //센터로 이동 후 주소를 표시
                moveCenter(location)
                    .then(function(location) {
                            geocoder.coord2Address(location.coords.longitude, location.coords.latitude, callback);
                    });
            }, function(e) {
                if (e.code === 1){
                    alert("내 위치 찾기는 GPS 권한이 필요합니다")
                }
            });
        } else {
            /* 지오로케이션 사용 불가능 */
            alert("이 기기는 내위치 찾기를 지원하지 않습니다.");
        }
    }

    function moveCenter(location){
        return new Promise(function(resolve, reject){
            let moveLatLon = new daum.maps.LatLng(location.coords.latitude, location.coords.longitude);
            map.panTo(moveLatLon);
            resolve(location);
        });
    }
```
