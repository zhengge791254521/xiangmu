$(function(){
	$('.oa-head-img').tap(function(event) {
		var sidebar = $(this).data('sidebar');
		if(!sidebar){
			$('.oa-mask').show();
			$('.oa-personal-left').addClass('active');
			$(this).attr('data-sidebar','true');
		}
		
	});
	$('.oa-mask').tap(function(event) {
		$('.oa-mask').hide();
		$('.oa-personal-left').removeClass('active');
		$('.oa-head-img').attr('data-sidebar','false');
	});
})