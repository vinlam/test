<?php
  //获取文件名
  $name = $_POST["name"];
  //获取大小
  $size = $_POST["size"];
  //获取文件类型
  $type= $_POST["type"];
  //获取文件最后修改时间
  $lastModifiedDate= $_POST["lastModifiedDate"];
  //获取分片总数
  $chunks= $_POST["chunks"];
  //获取当前分片索引
  $chunk= $_POST["chunk"];
 
  // 文件保存路径
  $upload = $_SERVER["DOCUMENT_ROOT"]."/uploadFiles";
 
  // 临时文件保存路径（分片）
  $tmp = $_SERVER["DOCUMENT_ROOT"]."/uploadFiles/tmp";
 
  // 判断文件夹是否存在，不存在则创建
  if (!is_dir($tmp)){ mkdir($tmp, 0777, true); }
 
  //如果不分片的话直接保存
  if (!isset($chunks)) {
    //将上传的文件保存到指定目录下
    move_uploaded_file($_FILES["file"]["tmp_name"], $upload."/".$name);
 
    //输出信息
    echo "--- 文件上传完毕 ---\n";
    echo "文件名：".$name."\n";
    echo "文件大小：".$size."\n";
    echo "文件类型：".$type."\n";
    echo "文件最后修改时间：".$lastModifiedDate;
  } else {
    // 如果分片的话先把分片存储到tmp文件夹下
    move_uploaded_file($_FILES["file"]["tmp_name"], $tmp."/".$name.".tmp".$chunk);
    echo "--- 分片上传完毕 ---\n";
 
    // 判断所有分片是否都上传完毕了
    $complete = true;
    for($i = 0; $i < $chunks; $i++) {
      if(!file_exists($tmp."/".$name.".tmp".$i)){
        $complete = false;
        break;
      }
    }
 
    //如果所有分片都有的话就开始合并
    if ($complete) {
      $fp = fopen($upload."/".$name, "ab");
      for($i = 0; $i < $chunks; $i++) {
        $tmp_file = $tmp."/".$name.".tmp".$i;
        $handle = fopen($tmp_file, "rb");
        fwrite($fp, fread($handle, filesize($tmp_file)));
        fclose($handle);
        unset($handle);
        unlink($tmp_file);//合并完毕的文件就删除
      }
      echo "--- 文件合并完毕 ---\n";
    }
  }
?>