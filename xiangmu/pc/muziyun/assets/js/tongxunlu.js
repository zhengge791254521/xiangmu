
function juzhong(){
	 if($(window).width() > 768){
    	if($('.footer').css('left') == 0+'px'){
			$('.footer').css('left',220+'px');
		}
    }else{
    	if($('.footer').css('left') == 220+'px'){
			$('.footer').css('left',0+'px');
		}
    }
    var $whh = $('body').height();
    var $ww = $(window).width();
    var $hh = $(window).height();
    var $dw = $('.lic').width();
    var $dh = $('.lic').height();
   
  	var $dwww = $('.licc').width();
    var $dhhh = $('.licc').height();

  	$('.waic').css('height',$whh+'px');
  	$('.waicc').css('height',$whh+'px');
    
    $('.lic').css('top',($hh-$dh)/2+'px');
    $('.lic').css('left',($ww-$dw)/2+'px');
   
    $('.licc').css('top',($hh-$dhhh)/2+'px');
    $('.licc').css('left',($ww-$dwww)/2+'px');

    
  
  }
  juzhong();

  $(window).resize(function(){
    juzhong();

  });

    
    
  

$('.sss').click(function(event){
	if($(this).is(':visible')){
		alert('审核成功');
		$(this).hide();
		 event.preventDefault();
	}
	
})

// $('.sss').on('mouseenter',function(){
// 	if($(window).width() > 550){
// 		if($(this).children('.sh').is(":hidden")){
// 			$(this).children('.sh').fadeIn(500);
// 			$(this).removeAttr('title');
// 		}
// 	}else{
// 		$(this).attr('title','审核');
// 	}
// })
// $('.sss').on('mouseleave',function(){
// 	if($(window).width() > 550){
// 		if($(this).children('.sh').is(":visible")){
// 			$(this).children('.sh').fadeOut(500);

// 		}
// 	}
// })
// $('.uuu').on('mouseenter',function(){
// 	if($(window).width() > 550){
// 		if($(this).children('.dqyc').is(":hidden")){
// 			$(this).children('.dqyc').fadeIn(500);
// 			$(this).removeAttr('title');
// 		}
// 	}else{
// 			if($(this).attr('quxiao')==0){
// 				$(this).attr('title','对其隐藏');	
// 			}else{

// 				$(this).attr('title','取消隐藏');	
// 			}
			
		
// 	}
// })
// $('.uuu').on('mouseleave',function(){
// 	if($(window).width() > 550){
// 		if($(this).children('.dqyc').is(":visible")){
// 			$(this).children('.dqyc').fadeOut(500);
			
// 		}
// 	}
// })
// $('.uuu').on('click',function(){
// 	if($(this).attr('quxiao') == 0){
// 		alert('拉黑成功');
// 		$(this).html('<i class="fa fa-eye"></i><span class="dqyc" id="1"> 显示</span>');
// 		$(this).css('background','#898E94');
// 		$(this).css('border-color','#898E94');
// 		$(this).attr('quxiao',1);
		
// 	}else{
// 		alert('取消成功');
// 		$(this).html('<i class="fa fa-eye-slash"></i><span class="dqyc"> 隐藏</span>');
// 		$(this).attr('quxiao',0);
// 		$(this).css('background','#1AB394');
// 		$(this).css('border-color','#1AB394');
		
		
// 	}
// })
$('.gggg').click(function(event){
		
		alert('添加成功');
	
})
$('.llll button').click(function(){
		
		alert('添加成功,请继续添加');
	
})
$('.mmmm button').click(function(){
		
		alert('修改成功');
	
})
$('.oooo button').click(function(){

		// var $w = $('.qqqq .pppp:last-child .rrrr').attr('id');
		// $w++;
		var $cont = $('.kelong table tbody tr').clone();
			
		$('.qqqq .zhuang table tbody').append($cont);

		// $('.kelong .pppp .rrrr').attr('id',$w);
		// $('.qqqq .pppp:last-child .rrrr').attr('id',$w);
		// $('.qqqq .pppp:last-child .rrrr').attr('name','mu['+$w+']');
		if($('.zhuang tbody tr').length >= 1){
			$('.aaaaa').show();
			$('.siye').hide();
		}
})
$('.form-horizontal').on('click','.sc',function(){
	// var $a= $(this).siblings('input').attr('id');
	// if($(this).closest('.zhuang').children('.pppp').eq($a).is(':visible')){
		
	// 	alert($a);
	// 	$(this).closest('.zhuang').children('.pppp').eq($a).hide();
	// }
	var self = $(this);
    shanchu();
    var shanchu_true = $('.shanchu_show').find('.shanchu_true');
    shanchu_true.click(function() {
        self.closest('tr').remove();
        $('.shanchu_zhezhao').remove();
        $('.shanchu_show').remove();
        if($('.zhuang tbody tr').length == 0){
		$('.aaaaa').hide();
		$('.siye').show();
	}
    });
	if($('tbody tr').length == 0){
		$('.table-notd').show();
	}
	
	
})

$('.padi tbody tr').mouseenter(function(){
	$(this).children('.xgsj').children('.yincang').css('background','#F5F5F5');

})
$('.padi tbody tr').mouseleave(function(){
	$(this).children('.xgsj').children('.yincang').css('background','#fff');
})

$('.padi tbody .xgb').click(function(){
	$(this).parent('td').siblings('.xgsj').children('.qdqd').show();
	$(this).parent('td').siblings('.xgsj').children('input').attr('readonly',false);
	$(this).parent('td').siblings('.xgsj').children('input').removeClass('yincang');
	$(this).parent('td').siblings('.xgsj').children('input').removeClass('yinc1');
	$(this).parent('td').siblings('.xgsj').children('input').removeAttr('style');
	$(this).parent('td').siblings('.xgsj').children('input').focus();
})
$('.padi tbody .qdqd').click(function(){
	
	var $aa = $(this).siblings('input').val();
	$(this).siblings('input').attr('value',$aa);
	$(this).siblings('input').addClass('yincang');
	$(this).siblings('input').addClass('yinc1');
	$(this).siblings('input').css('background','#F5F5F5');
	$(this).siblings('input').attr('readonly',true);
	$(this).hide();
	$(this).closest('.padi').siblings('.xiugaitj').show();
})
$('.padi tbody .erku').click(function(){
	var self = $(this);
    shanchu();
    var shanchu_true = $('.shanchu_show').find('.shanchu_true');
    shanchu_true.click(function() {
        self.closest('tr').remove();
        $('.shanchu_zhezhao').remove();
        $('.shanchu_show').remove();
    });
	if($('tbody tr').length == 0){
		$('.xiugaitj').hide();
		$('.table-notd').show();
	}
})
$('.padi tbody .sanku').click(function(){
	var self = $(this);
    shanchu();
    var shanchu_true = $('.shanchu_show').find('.shanchu_true');
    shanchu_true.click(function() {
        self.closest('tr').remove();
        $('.shanchu_zhezhao').remove();
        $('.shanchu_show').remove();
    });
	if($('tbody tr').length == 0){
		$('.table-notd').show();
	}
})

// $('.aaaaa button').click(function(){
// 	$('.qqqq .pppp').each(function(){
// 		var $cont = $('.qqqq .pppp input').val();
// 		$('.qqqq .pppp input').attr('name','mu['+$cont+'][]');
// 	})
// })

// $('.hhhhh').on('click',function(){
// 	var $ss = $(this).parent('td').siblings('.xgsj').html();
// 	$(this).parent('td').siblings('.xgsj').html('<input type="text" name="xiugai" placeholder="'+$ss+'">');
// 	$(this).parent('td').siblings('.xgsj').children('input').focus();
// })
 // $(document).keypress(function(e) { 
 //    // 回车键事件 
 //       if(e.which == 13) { 
 //  		var aa = $('.zhuang1 .xgsj input').val();
 //  		$('.zhuang1 .xgsj input').parent('.xgsj').html(aa);
 //       } 
 //   }); 
 // $('.zhuang1 .xgsj').on('click',function(){
 	 
 // 	if($(this).is(':has(input)')){
 // 		var aa = $(this).children('input').val();
 //  		$(this).children('input').parent('.xgsj').html(aa);
 // 	}
 // })

$('.dianji').on('click',function(){
	
	$('.waic').fadeIn(1000);
    $('.lic').fadeIn(1000);
	
})
$('.waic').on('click',function(){
	
	$('.waic').fadeOut();
    $('.lic').fadeOut();
	
})
$('.cha').on('click',function(){
	
	$('.waic').fadeOut();
    $('.lic').fadeOut();
	
})

$('.nihaoba').on('click',function(){
	
	$('.waicc').fadeIn(1000);
    $('.licc').fadeIn(1000);
	
})
$('.waicc').on('click',function(){
	
	$('.waicc').fadeOut();
    $('.licc').fadeOut();
	
})
$('.cha').on('click',function(){
	
	$('.waicc').fadeOut();
    $('.licc').fadeOut();
	
})

$('.zuojiantou').show('slow',function(){
		$(this).show('slow',arguments.callee);
		$(this).animate({'left':-5+'px'},300)
				.animate({'left':0},300);

});

$('.navbar-minimalize').click(function(){
	
	if($(window).width() > 768){
		 if($('.footer').css('left') == 220+'px'){
		 	$('.footer').css('left',70+'px');
		 }else{
			$('.footer').css('left',220+'px');
		}
	}else{
		if($('.footer').css('left') == 0+'px'){
			$('.footer').css('left',70+'px');
		}else{
			$('.footer').css('left',0);
		}

	}
})

// $('.dianj').on('click',function(){
	
// 	$('.waicc').fadeIn(1000);
//     $('.licc').fadeIn(1000);
	
// })
// $('.waicc').on('click',function(){
	
// 	$('.waicc').fadeOut();
//     $('.licc').fadeOut();
	
// })
 



