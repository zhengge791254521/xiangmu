<?php 
$filename=time()."teststream.jpg";//要生成的图片名字

//$xmlstr =  $GLOBALS[HTTP_RAW_POST_DATA];
$xmlstr = file_get_contents('php://input');

$jpg = $xmlstr;//得到post过来的二进制原始数据
var_dump($jpg);
$file = fopen("cache/".$filename,"w");//打开文件准备写入
fwrite($file,$jpg);//写入
fclose($file);//关闭