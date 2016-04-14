$(function(){
	//下拉框 内容选择
	$('ul.wx-sel-ul a').click(function() {
		//获取选择的内容和value值
		var sel_text = $(this).text();
		var sel_val = $(this).attr('value');

		//将选择的内容添加到按钮和隐藏域中
		var wx_btn = $(this).closest('ul.wx-sel-ul').siblings('button.wx-sel-btn');
		wx_btn.children('span').text(sel_text);
		//先找到匹配的隐藏域
		var this_id = wx_btn.attr('id');
		var input_hid = $('#sel_'+this_id+':hidden');
		input_hid.val(sel_val);
		input_hid.attr('selval',sel_text);
	});

});