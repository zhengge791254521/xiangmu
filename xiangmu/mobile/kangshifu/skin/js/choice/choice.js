$(function(){
	//按钮文字的居中
    // var W = $('.choice-btn > p').width()/2;
    // var H = $('.choice-btn').height();
    // $('.choice-btn > p').css({'marginLeft':-W + 'px','lineHeight':H + 'px'});

    //学校的切换
    $('.choice-btn').each(function(i){
    	$(this).click(function(i){
    		var e = $(this).index();
    		$(this).siblings('.choice-btn').children('.choice_jiantou').hide();
    		$(this).children('.choice_jiantou').show();
    		$('.school-name').hide();
    		$('.school-name').eq(e).show();
    	});
    });

    //传参
    $('.school-name > li').each(function(index){
    	$(this).click(function(){
    		alert($(this).attr('id'));
    	});
    });
});