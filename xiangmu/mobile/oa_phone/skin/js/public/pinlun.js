// ;(function($) {
// $.init();
//mui.init();

//默认操作的用户
//var user = '杨璐'	,
//	userId = 'u_4',
//	userImg = '../skin/images/bg.jpg';

	//点击页面上的文本回复
	jQuery('#pinlun-btn').click(function(){
		var self = jQuery(this),
		 	value = jQuery('#pinlun-text').val();

		//判断是否有值
		if(!isValue(value)){
				return false;
			};
		//创建相应的列表	
		var str = createSmboxP(jQuery('#pinlun-text').val(), true);
//		if(ajaxFnc()){
//			return false;
//		}
		
		self.closest('.z-pinlun-group').append(str);
		jQuery('#pinlun-text').val('');
	})

	mui('body').on('tap','.z-pinlun-smbox p',function(){
		var self = jQuery(this),
		 	uid = self.data('uid'),
			name = self.data('user');
		
		//你回复你自己的干嘛
		if(uid == userId){
			return false;
		}
		
		var btn = createMask(self);
		btn.click(function(){
			
			if(!isValue(jQuery('#z-pinlun-input_num_'+uid).val())){
				return false;
			};
			var str = createSmboxP(jQuery('#z-pinlun-input_num_'+uid).val(), false, name);
			jQuery(this).closest('.oa-mask-box').remove();
//		if(ajaxFnc()){
//			return false;
//		}
			
			self.closest('.z-pinlun-smbox').append(str);
			
		})
		
	})
	
	mui('body').on('tap','.z-pinglun-span',function(){
		var self = jQuery(this),
		 	uid = self.data('uid'),
			name = self.data('user');
		
		var btn = createMask(self);
		btn.click(function(){
			
			if(!isValue(jQuery('#z-pinlun-input_num_'+uid).val())){
				return false;
			};
			var str = createSmboxP(jQuery('#z-pinlun-input_num_'+uid).val(), false, name);
			
			jQuery(this).closest('.oa-mask-box').remove();
			
			var body = self.closest('.z-pinlun-body');
			if(body.find('.z-pinlun-smbox').length == 0){
				body.append('<div class="z-pinlun-smbox">'+str+'</div>');
			}else{
				body.find('.z-pinlun-smbox').append(str);
			}

//		if(ajaxFnc()){
//			return false;
//		}
			
		})
		
	})
	
	//判断是否是空值
	function isValue(value){
		if(value.length == 0 ){
			layer.open({
                content: '先填写内容再提交哦！',
                style: 'background-color:rgba(0,0,0,0.6); color:#fff; border:none;text-align: center;',
                time:3
            })
			
			return false;
		}
		return true;
	}
	
	/**
	 * 创建相应的回复页面 
	 * @param {Object} value ：回复的内容
	 * @param {Object} opt ：true表示一级回复，false表示二级回复
	 * @param {Object} name ：回复的对象名称
	 */
	function createSmboxP(value, opt, name){
		var str = '';
		if(opt){
			str += '<div class="mui-input-row">'+
						'<div class="z-pinlun-box">'+
							'<a><img src="'+userImg+'"></a>'+
							'<div class="z-pinlun-body">'+
								'<div class="z-pinlun-body-title">'+
//									'<span data-user="'+user+'" data-uid="'+userId+'" class="z-pinglun-span"><i class="mui-icon mui-icon-chat"></i>回复</span>'+
									'<h4 class="mui-ellipsis">'+user+'</h4>'+
								'</div>'+
								'<span class="mui-h6 mui-ellipsis">12-15 14:20</span>'+
								'<p>'+value+'</p>'+
							'</div>'+
						'</div>'+
					'</div>';
		}else{
			str += '<p data-user="'+user+'" data-uid="'+userId+'"><span>'+user+'</span> 回复 <span>'+name+'</span>：'+value+'</p>';
		}
		return str;
	}
	
	function createMask(item){
		var uid = item.data('uid'),
			name = item.data('user');
		
		var str = '<div class="oa-mask-box">'+
					'<div class="oa-mask"></div>'+
					'<div class="z-pinlun">'+
						'<button data-name="'+name+'" class="mui-btn mui-btn-primary btn-mask" id="z-pinlun-btn_'+uid+'">回复</button>'+
						'<div class="z-pinlun-input">'+
							'<input type="text" placeholder="回复：'+name+'" class="mui-input-clear" id="z-pinlun-input_num_'+uid+'" />'+
						'</div>'+
					'</div>'+
				'</div>';
				
		jQuery('body').append(str);
		jQuery('#z-pinlun-input_num_'+uid).focus();
		return jQuery('#z-pinlun-btn_'+uid);
	}
	
	/**
	 * ajax 方法 
	 * @param {Object} url ：地址
	 * @param {Object} uid : 评论对象的uid
	 * @param {Object} value ：评论的内容
	 * @param {Object} type ： 评论的类型,比如一级评论或者只是 二级的回复
	 */
	function ajaxFnc(url, uid, value, type){
		
	}

	mui('body').on('tap','.oa-mask',function(){
		var self = jQuery(this);
		self.closest('.oa-mask-box').remove();
	});

// })(mui);