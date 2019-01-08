function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
}

var onDeviceReady = function() {
    console.log("deviceready event fired");
     
 // api-camera  Photo URI
    pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
    //这里是初始化主页,如果,已经有头像的话,就加载
    var saveImage = kget("image");
    if(saveImage){
         //console.log("have image"+saveImage);
          var cameraImage = document.getElementById('cameraImage');
          cameraImage.style.visibility = 'visible';
          cameraImage.src = "data:image/jpeg;base64," + saveImage;
          
    }
    //系统的事件,按需求实现自己的回调方法,这里就默认了..
    document.addEventListener("searchbutton", onSearchKeyDown, false);  
    document.addEventListener("menubutton", onMenuButtonDown, false);
    document.addEventListener("pause", onEventFired, false);
    document.addEventListener("resume", onEventFired, false);
    document.addEventListener("online", onEventFired, false);
    document.addEventListener("offline", onEventFired, false);
    document.addEventListener("backbutton", onEventFired, false);
    document.addEventListener("batterycritical", onEventFired, false);
    document.addEventListener("batterylow", onEventFired, false);
    document.addEventListener("batterystatus", onEventFired, false);
    document.addEventListener("startcallbutton", onEventFired, false);
    document.addEventListener("endcallbutton", onEventFired, false);
    document.addEventListener("volumedownbutton", onEventFired, false);
    document.addEventListener("volumeupbutton", onEventFired, false);
};