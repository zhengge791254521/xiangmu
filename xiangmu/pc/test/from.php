<?php

// echo '<pre>';
// print_r($_POST);
// echo '</pre>';
$val = array(
			'username' => $_POST['username'],
			'password' => $_POST['password'],
			'email' => $_POST['email'],
			'tel' => $_POST['tel']
	);
$data = array(
			'sendtime' => date('Y-m-d H:i:s'),
			'val'		=> $val
			);
		//是否成功写入数据库
		if(1==1){
			$data['status'] = true;
			
		}else{
			$data['status'] = false;
			
		}
echo json_encode($data);
// echo '<pre>';
// print_r($_POST);
// echo '</pre>';


?>