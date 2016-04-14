<?php

/**
 * Jcrop image cropping plugin for jQuery
 * Example cropping script
 * @copyright 2008-2009 Kelly Hallman
 * More info: http://deepliquid.com/content/Jcrop_Implementation_Theory.html
 */

if ($_SERVER['REQUEST_METHOD'] == 'POST')
{
	$targ_w = $targ_h = 150;
	$jpeg_quality = 90;

	$src = 'demo_files/pool.jpg';
	$img_r = imagecreatefromjpeg($src);
	$dst_r = ImageCreateTrueColor( $targ_w, $targ_h );

	imagecopyresampled($dst_r,$img_r,0,0,$_POST['x'],$_POST['y'],
	$targ_w,$targ_h,$_POST['w'],$_POST['h']);

	header('Content-type: image/jpeg');
	imagejpeg($dst_r,null,$jpeg_quality);

	exit;
}

// If not a POST request, display page below:

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	
	<link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.4/css/bootstrap.min.css">

    <link href="../skin/css/public.css" rel="stylesheet" type="text/css">
    
    <script src="http://cdn.bootcss.com/jquery/1.11.2/jquery.min.js"></script>
    <script src="http://cdn.bootcss.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>

    <link rel="stylesheet" href="../skin/css/plug/swiper/swiper.min.css" type="text/css"/>
	<link rel="stylesheet" href="../skin/css/plug/jcrop/jquery.Jcrop.min.css" type="text/css"/>

    <link href="../skin/css/style.css" rel="stylesheet" type="text/css">
    <link href="../skin/css/postcard.css" rel="stylesheet" type="text/css">
	<title>弘金金融微信管理平台</title>
</head>

</head>  

<body style="background:#fff;">
    
<div class="postcard-ok" id="postcard">
    <div class="pc-left">
        <a href="" class="prev-btn"><img src="../skin/images/prev.png" class="img-responsive" alt="" /></a>
        <div class="card-upload-box">
            <img src="../skin/images/photoframe.png" alt="" class="img-responsive card-img" />
            
            <div class="card-div">
                <img class="card-photo" src="../skin/images/1111.jpg" alt="" />
            </div>
            <img class="card-pf img-responsive" src="../skin/images/photoframe/pf9.png" alt="" />
        </div>
    </div>
    <div class="pc-right">
        <div class="pc-youbian-box">
            <div class="pc-youbian pc-pop" data-type="pc-pop-cont">
                <div class="youbian-num pc-text" id="pc-youbian" data-value="">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>   
                </div>
                <div class="pc-contentinfo">
                    <div class="res-pad pc-text" id="pc-senduser" style="width:50%"></div>
                    <div class="res-pad"></div>
                    <div class="res-pad"></div>
                    <div class="pc-ress"></div>
                    <div class="pc-ress"></div>
                    <div class="youpiao-address">
                    	<div class="youpiao"><img src="../skin/images/youpiao.png" alt="" /></div>
                    	<p id="pc-cont" class="pc-text"></p>
                    </div>
                    
                </div>
            </div>
            
            
            
            <div class="pc-address">
            	<div class="noodles-logo">
            		<img src="../skin/images/ksf.png" class="img-responsive">
            	</div>
            	<div class="pc-addressinfo pc-pop" data-type="pc-pop-address">
            		<div class="pc-ress"></div>
                <div class="pc-ress"></div>
                <div class="pc-ress"></div>
                <div id="pc-oneself" style="margin-left:35%;" class="res-pad pc-text">郑哥哥</div>
                <p id="pc-address" class="pc-text">地方哈撒剪发卡减肥后开始东方航空减肥撒谎个咖啡豆和公开发第三个答复和可减肥会更健康的</p>
            	</div>
            </div>
            <div class="confirm-make">
            	<a class="make-true" id="make-true"><img src="../skin/images/make.png" class="img-responsive"></a>
            	<img class="make-bottom-logo" src="../skin/images/logo_right.png">
            </div>
        </div>
        <!-- <img src="../skin/images/pc-right.png" alt="" class="img-responsive" />
        <div class="pc-right-content">
            <p>地方哈撒剪发卡减肥后开始东方航空减肥撒谎个咖啡豆和公开发第三个答复和可减肥会更健康的</p>
        </div> -->
    </div>
</div>
<div class="pop-box" id="pop">
	<div class="pop-mask"></div>
	<div class="pop-pc-box">
		<form class="form-horizontal" action="postcard.php" method="post">
			<div class="form-group text-right">
				<button type="button" class="btn pc-close">关闭</button>
				<button type="button" class="btn pc-save">输入确认</button>
			</div>
			
		  <div class="form-pc-box pc-pop-cont" id="pc-pop-cont">
		  	<div class="form-group">
			      <input type="text" class="form-control" data-id="pc-youbian" name="youbian" placeholder="记得6位邮政编码哦" value="" maxlength="6" required>
			  </div>
			  <div class="form-group">
			      <input type="text" class="form-control" data-id="pc-senduser" name="senduser" placeholder="对谁发送呢" required>
			  </div>
			  <div class="form-group">
			      <textarea class="form-control" rows="3" data-id="pc-cont" name="zhufu" placeholder="输入你的美好祝福，请不要超过70字" maxlength="70" required></textarea>
			  </div>
		  </div>
		  <div class="form-pc-box pc-pop-address" id="pc-pop-address">
			  <div class="form-group">
			    <textarea class="form-control" data-id="pc-address" name="address" placeholder="对方的地址在哪里？不超过40字哦" maxlength="40" required></textarea>
			  </div>
			  <div class="form-group">
			    <input type="text" class="form-control" data-id="pc-oneself" name="oneself" placeholder="签署您的大名" required>
			  </div>
		  </div>

		  	<input type="hidden" id="x" name="x" />
			<input type="hidden" id="y" name="y" />
			<input type="hidden" id="w" name="w" />
			<input type="hidden" id="h" name="h" />
		</form>
	</div>
</div>
</body>

<script src="../skin/js/plug/jcrop/jquery.Jcrop.min.js"></script>
<script type="text/javascript">

$('#make-true').click(function(){
	var vali_true = true;
	$('.form-horizontal').find('.form-control').each(function(index, el) {
		if($(this).val() == ''){
			alert('先完善信息才能制作哦');
			vali_true =false;
			return false;
		}
	});
	if(vali_true){
		jiepin();
		alert($('#h').val())
		$('.form-horizontal').submit();
	}
	
});
//关闭弹出框，因为是取消所以如果有写入就恢复之前的
$('.pc-close').click(function(event) {
	var uid = $('.form-pc-box:visible').attr('id');
	createValue($('[data-type="'+uid+'"]'));
	$('.pop-box').fadeOut();
	$('.form-pc-box').hide();
});
$('.pc-pop').click(function(event) {
	var type = $(this).attr('data-type');
	$('.pop-box').fadeIn();
	$('.pop-box').find('#'+type).show().siblings('.form-pc-box').hide();

	createValue($(this));
});

$('.pc-save').click(function(){
	var valida = true;
	$('.form-pc-box:visible').find('[required]').each(function(index, el) {
		if(!requiredInput($(this))){
			alert('记得明信片信息要填写完哦!');
			$(this).focus();
			valida = false;
			return false;
		}
		if($(this).attr('name') == 'youbian'){
			if(!is_postcode($(this).val())){
				valida = false;
				alert('输入正确邮编哦');
			}
		}
	});

	if(valida){
			pop_cont();
	}

});
//将页面上的数据 放到弹出框里面
function createValue(self){
	self.find('.pc-text').each(function(index, el) {
		var pid = $(this).attr('id');
		var value = $(this).text();
		if(pid == 'pc-youbian'){
			value = $(this).attr('data-value');
		}
		$('.pop-pc-box').find('[data-id="'+pid+'"]').val(value)

	});
}
//将弹出框中写入的值放到页面上
function pop_cont(){
	$('.form-pc-box:visible').find('.form-control').each(function(index, el) {
		var pid = $(this).attr('data-id');
		var value = $(this).val();
		if(pid == 'pc-youbian'){
			$('#'+pid).attr('data-value',value);
			var span = '';
			$.each(value.split(""),function(index, el) {
				span+='<span>'+el+'</span>';
			});
			$('#'+pid).html(span);
			return;
		}
		$('#'+pid).text(value);
		$('.pop-box').fadeOut();
	});
}
function requiredInput(self){
	if(self.val()==''){
		return false;
	}
	return true;
}
function is_postcode(postcode) {  
    if ( postcode == "") {  
        return false;  
    } else {  
        if (! /^[0-9][0-9]{5}$/.test(postcode)) {  
            return false;  
        }  
    }  
    return true;  
}
// alert($('#postcard').width()+','+$('#postcard').height())
function jiepin(){
	
var c = {"x":0,"y":0,"x2":480,"y2":309,"w":480,"h":309};
$('#postcard').Jcrop({
	dragEdges:false,
	drawBorders:false,
	bgColor:'none',
	bgOpacity:0,
   	setSelect: [c.x,c.y,c.x2,c.y2],
   	onSelect:function(c){
		$('#x').val(c.x);
	    $('#y').val(c.y);
	    $('#w').val(c.w);
	    $('#h').val(c.h);
   	}
});
}
</script>
</html>