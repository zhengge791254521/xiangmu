
function shanchu(num){
	var shanchu='<div class="panel panel-default shanchu_show">'+
        '<div class="panel-heading text-center">确认删除</div>'+
        '<div class="panel-body project-list row">'+
        '<div class="col-md-6 text-center">'+
        	'<button class="btn btn-primary shanchu_true" type="button">确认</button>'+
        '</div>'+
		'<div class="col-md-6 text-center">'+
        	'<button class="btn btn-primary shanchu_false" type="button">取消</button>'+
        '</div>'+
        '</div>'+
    '</div>'+
	'<div class="shanchu_zhezhao"></div>';
	$('body').append(shanchu);

	var shanchu_show = $('.shanchu_show');
	var height = shanchu_show.height();
	var width = shanchu_show.width();
	var win_height = $(window).height();
	var win_width = $(window).width();
	shanchu_show.css('left',(win_width - width)/2 );
	shanchu_show.css('top',(win_height - height)/2 );

	if(num == 1){
		shanchu_show.find('.panel-body').append('<div class="shanchu_waring col-md-12">此操作会删除大量数据！</div>')
	}
	
	shanchu_show.find('.shanchu_false').click(function(){
		$('.shanchu_zhezhao').remove();
		shanchu_show.remove();
		return false;
	})

}




$('.btn_all').click(function(){
	var xuanzhong = $(this).attr('xuanzhong');
	var project_list = $(this).closest('.project-list');
	if(xuanzhong == 0){
		project_list.find('.check_left').each(function(index, element) {
            $(this).children('div.icheckbox_square-green').addClass('checked');
			$(this).find('input[type="checkbox"]').prop('checked',true);
        });
		$(this).attr('xuanzhong',1);
		$(this).html('全部取消');
	}else{
		project_list.find('.check_left').each(function(index, element) {
            $(this).children('div.icheckbox_square-green').removeClass('checked');
			$(this).find('input[type="checkbox"]').prop('checked',false);
        });
		$(this).attr('xuanzhong',0);
		$(this).html('全部选中');
	}
	
});