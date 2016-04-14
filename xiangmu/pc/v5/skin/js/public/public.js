window.onload = function(){
	// var wHeight = $(window).height(),
	// 	ftHeight = $('footer.oa-foot').outerHeight(),
	// 	docuHight = $(document).height(),
	// 	boxHeight = $('.user-container').outerHeight();

	// if(boxHeight+ftHeight+51 <= wHeight && wHeight>=docuHight){
	// 		$('.user-container').outerHeight(wHeight-ftHeight-51);
	// 	}else{
	// 		$('.user-container').outerHeight(boxHeight);
	// 	}
	// if($('.user-sidebar').height()
}
// alert($('.user-sidebar').height())
	//执行全屏显示 当盒子高度不足以撑开页面时使用
	//load 表示页面有js效果导致页面高度增加后给盒子适应文档的高度
	function resizeHeight(ele,load){
		var eleHeight = ele.outerHeight(),
				winWidth = $(window).width(),
				winHeight = $(window).height(),
				docuHight = $(document).height(),
				footHeight = $('footer.oa-foot').outerHeight();	
		if(eleHeight+footHeight+51 <= winHeight && winHeight>=docuHight){
			ele.outerHeight(winHeight-footHeight-51);
		}else{
			if(!load){
				ele.outerHeight(eleHeight);
			}else{
				ele.outerHeight(docuHight);
			}
			
		}
	};
	resizeHeight($('.user-container'));

	$('.am-topbar-nav > li').hover(function(){
		$(this).find('.oa-munu-pop').addClass('active');
	},function(){
		$(this).find('.oa-munu-pop').removeClass('active');
	});

	$(window).resize(function(event) {
		resizeHeight($('.user-container'));
	});
