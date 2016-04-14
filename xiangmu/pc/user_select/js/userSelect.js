;(function($,window,document,undefined){
	var SelectUser = function(element,opt){
		var self = this;

		this.$element = element,
		this.uid = this.$element.attr('id'),
		//用于存放已经选择的人员数组
		this.values = [],
		//存放右侧选中的人员的数组
		this.selValues = [],
		this.defaults = {
		},
		this.options = $.extend({},this.defaults,opt),
		//所有人员的数组集合,先剔除无用的值
		this.dataUser = this._cleanData(this.options.data),
		//先将对象input隐藏，增加插件的样式，返回box
		this.$SelectBox = this._createSelectBox(),
		this.$userBtn = this.$SelectBox.find('.operate-user'),
		this.$userDelete = this.$SelectBox.find('.operate-delete'),
		this.$PopBox = null;


		//选择人员
		this.$userBtn.click(function(event) {
			self._createPopBox();
		});

		//清空人员
		this.$userDelete.click(function(event) {
			self._clearUser();
		});

		//点击删除
		this.$SelectBox.on('click','.userselect-search-choice-close',function(){
			
			self._deleteUer($(this));
		})
	}
	SelectUser.prototype = {

		//创建选择人员弹窗
		_createPopBox: function(){
			var selectBoxTpl;
			if (!this.$PopBox) {
				$('body').append('<div id="userSelect_'+this.uid+'" class="pop-box"></div>');
				this.$PopBox = $('#userSelect_'+this.uid);
				this.selectBoxTpl = [
				'<div class="pop-mask"></div>',
				'<div class="pop-box-popup">',
					'<div class="user-select-box">',
						'<div class="user-select-title">请选择人员',
						' <div class="pop-close"></div>',
						'</div>',
						'<div class="user-select-body">',
						'	<div class="box-container">',
						'		<div class="select-box-group">',
						'			<div class="sbox-title">',
						'				<ul class="title-type-group">',
						'					<li class="title-type-list active"  data-type="user_all"><a href="javascript:;">全部</a></li>',
						// '					<li class="title-type-list"  data-type="user_area"><a href="javascript:;">按区域</a></li>',
						'					<li class="title-type-list"  data-type="user_work"><a href="javascript:;">按职位</a></li>',
						'				</ul>',
						'			</div>',
						'			<div class="sbox-body">',
						'				<div class="sbox-item user_all active" id="user_all" data-type="user_all"></div>',
						// '				<div class="sbox-item user_area" id="user_area" data-type="user_area">区域</div>',
						'				<div class="sbox-item user_work" id="user_work" data-type="user_work"></div>',
						'			</div>',
						'		</div>',
						'		<div class="select-box-gather">',
						'			<div class="gather-title">选择添加的人员',
						'				<div class="checkbox-box title-checked pull-right">',
						'		  		<input type="checkbox" value="1" all" class="checkbox-input" id="checkall-'+self.uid+'" data-type="checkall" />',
						'			  	<label for="checkall-'+self.uid+'"></label>',
						'		  	</div>',
						'			</div>',
						'			<div class="gather-body">',
						'			</div>',
						'		</div>',
						'	</div>',
						'</div>',
						'<div class="user-select-footer text-right">',
						'	<button class="btn btn-primary add-user" type="button">确认添加</button>',
						'</div>',
					'</div>',
				'</div>'
				].join("");
				this.$PopBox.append(this.selectBoxTpl);
				this._initPopBox();
			}else{
				this._showPopBox();
			}
			return this;
		},
		//初始化选择人员弹窗
		_initPopBox:function(){
			var self = this;
			this.$PopMask = this.$PopBox.find('.pop-mask');
			this.$PopView = this.$PopBox.find('.pop-box-popup');
			this.$PopClose = this.$PopView.find('.pop-close');
			this.$PopLeftGroup = this.$PopView.find('.select-box-group');
			this.$PopRightGather = this.$PopView.find('.select-box-gather');
			this.$PopLeftTitle = this.$PopLeftGroup.find('.title-type-list');

			this.$PopLeftBody = this.$PopView.find('.sbox-body');
			this.$PopRightBody = this.$PopRightGather.find('.gather-body');
			this.$PopRightCheck = this.$PopRightGather.find('[data-type="checkall"]');
			this.$PopAddUser 	= this.$PopView.find('.add-user');
			//点击左边的头部区域 显示相应的板块
			this.$PopLeftTitle.click(function(event) {
				var dataType = $(this).attr('data-type');
				$(this).addClass('active').siblings().removeClass('active');
				self.$PopLeftBody.find('#'+dataType).addClass('active').siblings().removeClass('active');
			});
			
			//创建板块下的内容
			this._createModule();
			//显示和隐藏弹出框
			this._showPopBox();
			this._closePopBox();

		},
		//创建板块下的内容
		_createModule:function(){
			var self = this;
			this.$PopLeftBody.find('.sbox-item').each(function(index, el){
				var userType = $(this).attr('data-type');
				//全部人员
				if(userType == 'user_all'){
					var sel_all = '<div class="user-all-btn"><span class=pull-left>全部添加</span><div class="checkbox-box title-checked pull-right"><input type="checkbox" value="1" id="select-all-'+self.uid+'" class="checkbox-input" name="" data-type="select-all" /><label for="select-all-'+self.uid+'"></label></div></div>',
						sel_li = '<div class="sel-div"><ul class="sel-userall-ul">';
					$(this).append(sel_all);
					$.each(self.dataUser,function(index, item) {
						sel_li += '<li class="sel-li"><a data-id="'+item.id+'"><b></b>'+item.text+'<span class="user-information">'+item.city+'/'+item.dist+'</span></a></li>';
					});
					sel_li +='</ul></div>';
					$(this).append(sel_li);
				}

				//按职位
				if(userType == 'user_work'){
					var sel_work = '<div class="sel-div"><ul class="sel-userwork-ul"><li class="sel-li"><a data-id="1"><b></b>普通会员</a></li><li class="sel-li"><a data-id="2"><b></b>产品顾问</a></li><li class="sel-li"><a data-id="3"><b></b>渠道经理</a></li><li class="sel-li"><a data-id="4"><b></b>执业合伙人</a></li><li class="sel-li"><a data-id="5"><b></b>经销商</a></li></ul></div>';
					$(this).html('').append(sel_work);
				}
				//按地区
				if(userType == 'user_area'){
					var sel_area_array = self._createArea(),
							sel_area = '';

							// area_array = function(data){
							// 	$.each(data,function(index, el) {
									
							// 	});

							// }
					
				}
			});
	
			this._selLeftCreateRight();		
		},
		//点击左边列表将数据添加右侧列表
		_selLeftCreateRight:function(){
			var self = this;
			this.$PopLeftBody.on('change','[data-type="select-all"]',function(){
				if($(this).is(':checked')){
					$(this).closest('.sbox-item').find('a').each(function(index, el) {
						$(this).click();
					});
				}
			});
			this.$PopLeftBody.find('a').click(function(event) {
				var uid = $(this).closest('.sbox-item').attr('id');
				var sid = self.$PopRightBody.attr('data-id');
				if(sid != uid){
					self.$PopRightBody.attr('data-id',uid).html();
				}
				if(uid == 'user_all'){
						var id = $(this).attr('data-id'),
								name = self._findUser(id),
								gather_li = '';

						if(self.$PopRightBody.find('.gather-ul').length <=0){
							self.$PopRightBody.append('<ul class="gather-ul"></ul>');
						}
						//先判断点击的人在右侧是否已经存在，然后判断是否已经是选中的人
						if(!self._judgeValExistRight(id)){
							gather_li +='<li class="gather-li"><a class="gather-user" data-id="'+id+'"><b></b>'+name.text+'</a><div class="checkbox-box title-checked pull-right">';
								if(self._judgeValExist(id)){
									gather_li +='<input type="checkbox" value="1" id="gather-list-'+id+'" checked class="checkbox-input" data-id="'+id+'" />';
								}else{
									gather_li +='<input type="checkbox" value="1" id="gather-list-'+id+'" class="checkbox-input" data-id="'+id+'" />';
								}
						  		
							gather_li += '<label for="gather-list-'+id+'"></label></div></li>';
							self.selValues.push(id);
						}
						self.$PopRightBody.find('.gather-ul').append(gather_li);
						// self._judgeValExist(id);
				}

				if(uid == 'user_work'){
					var groupid = $(this).attr('data-id'),
							name = self._findUser(groupid,'groupid'),
					 		sel_group = '';
			 		if(self.$PopRightBody.find('.gather-ul').length <=0){
						self.$PopRightBody.append('<ul class="gather-ul"></ul>');
					}
					 	self.selValues.length = 0;
					$.each(name,function(i,item){
						// if(groupid == item.groupid){
							//先判断点击的人在右侧是否已经存在，然后判断是否已经是选中的人
							if(!self._judgeValExistRight(item.id)){
								sel_group +='<li class="gather-li"><a class="gather-user" data-id="'+item.id+'"><b></b>'+item.text+'</a><div class="checkbox-box title-checked pull-right">';
									if(self._judgeValExist(item.id)){
										sel_group +='<input type="checkbox" value="1" id="gather-list-'+item.id+'" checked class="checkbox-input" data-id="'+item.id+'" />';
									}else{
										sel_group +='<input type="checkbox" value="1" id="gather-list-'+item.id+'" class="checkbox-input" data-id="'+item.id+'" />';
									}
							  		
								sel_group += '<label for="gather-list-'+item.id+'"></label></div></li>';
								self.selValues.push(item.id);
							}
						// }
						// console.log(sel_group);
					});
					self.$PopRightBody.find('.gather-ul').html('').append(sel_group);
				}
			});

			this._selectRightVal();
		},
		//判断选列表中点击的值是否在右侧存在
		_judgeValExistRight:function(val){
			var self = this;
			var sta = false;
			$.each(this.selValues,function(index, el) {
				if(val == el){
					sta = true;
				}
			});
			return sta;
		},
		//判断选列表中点击的值是否已经选中
		_judgeValExist:function(val){
			var self = this;
			var sta = false;
			$.each(this.values,function(index, el) {
				if(val == el.id){
					sta = true;
				}
			});
			return sta;
		},
		_selectRightVal:function(){
			var self = this;
			this.$PopRightBody.on('change','input[type="checkbox"]',function(event) {
				self._refreshCheckbox($(this));
			});
			this.$PopRightCheck.change(function(event) {
				if($(this).is(':checked')){
					self.$PopRightBody.find('input[type="checkbox"]').each(function(key,item) {
						$(this).prop({'checked':true});
						self._refreshCheckbox($(this));
					});
				}else{
					self.$PopRightBody.find('input[type="checkbox"]').each(function(key, item) {
						$(this).prop({'checked':false});
						self._refreshCheckbox($(this));
					});
				}
			});


			//点击确定选择按钮
			this.$PopAddUser.on('click',function(event){
				self._addUserTrue();
			})

		},
		_refreshCheckbox:function(check){
			var id = check.attr('data-id');
				if(check.is(':checked')){
					this._addRemoveValues(id,'add');
				}else{
					this._addRemoveValues(id,'remove');
				}
		},
		//向选择数组中增添数组
		_addRemoveValues:function(id,status){
			var self = this;
			
			if(status == 'add'){
				// alert(id);
				var tf = true;
				$.each(this.values,function(index, el) {
					
					if(id == el.id){
						tf = false;
					}
					// console.log(id+','+el.id+','+tf);
				});
				if(tf){
					var val = this._findUser(id);
					this.values.push(val);
				}
			}
			if(status == 'remove'){
				var num =0;
						// selNum = 0;
				// $.each(this.selValues,function(index, el) {
				// 	if(id==el){
				// 		selNum = index;
				// 	}
				// });
				
				$.each(this.values,function(index, el){
					if(id==el.id){
						num = index;
					}
				});
				// self.selValues.splice(selNum,1);
				self.values.splice(num,1);
			}
			
		},
		_deleteUer:function(that){
			var id = that.attr('data-id');
			if(this._judgeValExist(id)){
				this._addRemoveValues(id,'remove');
				if(this._judgeValExistRight(id)){
					var num = 0;
					$.each(this.selValues,function(index, el){
						if(id==el.id){
							num = index;
						}
					});
					this.selValues.splice(num,1);
					this.$PopRightBody.find('input[type="checkbox"][data-id="'+id+'"]').prop({'checked':false});

				}
				that.closest('li').remove();
				var val_str = '';
				$(this.$element.val().split(",")).each(function(e,item) {
					if(item != id){
						val_str+=item+',';
					}
				});
				//剔除删除的字符后重新添加
				this.$element.val(val_str.substring(0,val_str.length-1));
			}
		},
		//清空已选择人员
		_clearUser:function(){
			this.$element.prev().find('.userselect-choices .userselect-operate').nextAll().remove();
			this.$element.val('');
			// alert(this.values.length);
			this.values.length =0;
			this.selValues.length =0;
			// alert(this.values.length);
			this._closeCheckAll();
			this._closeSelectAll();
			this.$PopRightBody.html('');
		},
		//点击确认添加
		_addUserTrue:function(){
			var value = '',
				userselect_li='';
			$.each(this.values,function(index, el) {
				value +=el.id+',';
				userselect_li += '<li class="userselect-search-choice"><span><i class="userselect-icon-user"></i>'+el.text+'</span><a class="userselect-search-choice-close" tabindex="-1" href="javascript:;" data-id="'+el.id+'"></a></li>';
			});
			value = value.substring(0,value.length-1);
			this.$element.prev().find('.userselect-choices .userselect-operate').nextAll().remove();
			this.$element.prev().find('.userselect-choices .userselect-operate').after(userselect_li);

			this.$element.val(value);

			this.$PopClose.click();
		},
		//划分出省市
		_createArea:function(){
			var self = this;
			var sel_area =[];
			$.each(this.dataUser,function(i, item) {
				var area = item.provice,
						num = false;
						$.each(sel_area,function(index, el) {
							if(sel_area[index].provice == area){
								num =true;
							}
						});
					if(!num){
						sel_area.push({'provice':item.provice});
					}
			});
			
			$.each(sel_area,function(i, item) {
				var pro = item.provice;
				var cy = [];
				$.each(self.dataUser,function(index, el) {
					if(pro != el.provice){
						return;
					}
					var city = el.city,
						num = false;
						$.each(cy,function(key,val) {
							if(cy[key].city == city){
								num =true;
							}
						});
					if(!num){
						cy.push({'city':el.city});
					}
				});
				$.each(cy,function(i, item) {
					var ct = item.city,
							dt = [];
					$.each(self.dataUser,function(index, el) {
						if(ct != el.city){
							return;
						}
						var dist = el.dist,
							num = false;
							$.each(dt,function(key,val) {
								if(dt[key].dist == dist){
									num =true;
								}
							});
						if(!num){
							dt.push({'dist':el.dist});
						}
						
					});
					item.dist = dt;
				});
				item.city = cy;

			});
			return sel_area;
		},
		//右侧全选按钮恢复
		_closeCheckAll:function(){
			this.$PopRightCheck.prop({'checked':false});
		},
		//右侧全选按钮恢复
		_closeSelectAll:function(){
			this.$PopLeftBody.find('[data-type="select-all"]').prop({'checked':false});
		},
		//关闭弹出框
		_closePopBox:function(){
			var self = this;
			this.$PopMask.bind('click',function(event) {
				closeBox();
				// self.$PopMask.unbind('click');
				// self.$PopClose.unbind('click');
			});
			this.$PopClose.bind('click',function(event) {
				closeBox();
				// self.$PopClose.unbind('click');
				// self.$PopMask.unbind('click');
			});

			closeBox = function(){
				if(self.$PopView.is(":animated") || self.$PopBox.is(":animated")){
					return;
				}
				var winWidth = $(window).width(),
				winHeight = $(window).height();
				self.$PopBox.fadeIn();

				var topLen = (winHeight-470)/2;
					self.$PopView.animate({
								marginLeft:-100,
								width:200
							}).animate({
								top:-winHeight
							})
					self.$PopBox.fadeOut();
			}
		},
		//显示弹出框
		_showPopBox:function(){
			var winWidth = $(window).width(),
				winHeight = $(window).height();

			
			this.$PopBox.fadeIn();

			var topLen = (winHeight-470)/2;
			this.$PopView.css({
							top:-winHeight
							}).animate({
								top:topLen
							}).animate({
								marginLeft:-600/2,
								width:600
							});
		},
		//判断获取的数据值，剔除其中无值或者值为null的数据
		_cleanData: function(data){
			var ret = [];
			if(!data || !data.length) {
				return ret;
			} else {
				for(var i = 0; i < data.length; i++) {
					if(data[i] != null && data[i].id != '') {
						ret.push(data[i])
					}
				}
			}
			return ret;
		},
		//先将对象input隐藏，增加插件的样式
		_createSelectBox:function(){
			var self = this;
			// alert(this.$element.val().toString().split(",")[0]);
			$(this.$element.val().split(",")).each(function(e,item) {
				// 将字符串对象转为原始类型
				var id = item,
					text = '';
				self.values.push({
					id: id,
					text: text
				});
			});

			var user = this._matchingArray(),
				userselect_box ='<div class="userselect-box"><ul class="userselect-choices"><li class="userselect-operate"><a class="operate-btn operate-user" href="javascript:;"><i class=""></i></a><a class="operate-btn operate-delete" href="javascript:;"><i class=""></i></a></li></ul></div>',
				userselect_li = '';

			$.each(user,function(index, el) {
				userselect_li += '<li class="userselect-search-choice"><span><i class="userselect-icon-user"></i>'+el.text+'</span><a class="userselect-search-choice-close" tabindex="-1" href="javascript:;" data-id="'+el.id+'"></a></li>';
			});
			
			//隐藏默认的input并添加新增的样式
			this.$element.hide().before(userselect_box);
			var userBox = this.$element.prev();
			userBox.find('.userselect-choices').append(userselect_li);


			return userBox;
		},

		//根据id值从原始数组中获取值
		_findUser:function(id,gid){
			if (gid) {
				var group=[];
				$.each(this.dataUser,function(key, item) {
						if(id == item.groupid){
							group.push(item);
						}
					});

				return group;
			}
			var val='';
			$.each(this.dataUser,function(key, item) {
					if(id == item.id){
						val = item;
					}
				});

			return val;
		},
		//匹配选中数组在原始数组中的id，获取相应内容
		_matchingArray:function(){
			var self =this;
			this.values = this._cleanData(this.values);
			if(this.values.length ==0){
				return [];
			}
			$.each(this.values,function(index, el) {
				var id = el.id;
				$.each(self.dataUser,function(key, val) {
					if(id == val.id){
						self.values[index] = val;
					}
				});
			});
			return this.values;
		}
	}
	$.fn.userSelect = function(options){
		var userselect = new SelectUser(this,options);

		return userselect;
	}
})(jQuery,window,document);