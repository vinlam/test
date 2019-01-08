function take_pic() {
    navigator.camera.getPicture(onPhotoDataSuccess, function(ex) {
        alert("Camera Error!");
    }, {
    //这里的更多设置参数参见官方文档
        quality : 50,
    targetWidth: 320,
    targetHeight: 240,
    //用data_url,而不用file_url的原因是,file_url在不同平台有差异
    //不好编写,而用data_url就可以不考虑这个,加上,拍张图片,不要太好的话,就几十k存到数据库里面也没多慢..
    destinationType:destinationType.DATA_URL
        });
}

function onPhotoDataSuccess(imageData) {
    console.log("* * * onPhotoDataSuccess");
    var cameraImage = document.getElementById('cameraImage');
    cameraImage.style.visibility = 'visible';
    //把图片存进数据库里面
    kset("image",imageData);
   cameraImage.src = "data:image/jpeg;base64," + imageData;
    
}