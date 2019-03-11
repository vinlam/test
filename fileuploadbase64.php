<?php
/**
 * base64图片上传
 * @param $base64_img
 * @return array
 */
$base64_img = trim($_POST['img']);
$up_dir = './upload/';//存放在当前目录的upload文件夹下

if(!file_exists($up_dir)){
    mkdir($up_dir,0777);
}

if(preg_match('/^(data:\s*image\/(\w+);base64,)/', $base64_img, $result)){
    $type = $result[2];
    if(in_array($type,array('pjpeg','jpeg','jpg','gif','bmp','png'))){
        $new_file = $up_dir.date('YmdHis_').'.'.$type;
        if(file_put_contents($new_file, base64_decode(str_replace($result[1], '', $base64_img)))){
            $img_path = str_replace('../../..', '', $new_file);
            echo '图片上传成功</br>![](' .$img_path. ')';
        }else{
                    echo '图片上传失败</br>';

        }
    }else{
        //文件类型错误
    echo '图片上传类型错误';
    }
    
}else{
    //文件错误
    echo '文件错误';
}
?>