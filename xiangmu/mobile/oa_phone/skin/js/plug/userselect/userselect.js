;(function($,window,document,undefined){
    var SelectUser = function(ele,opt){
    	
    	var self = this;
		this.$ele = ele,
		this.id = this.$ele.attr('id'),
		//已被选中的人员数组
		this.values = [],
		this.selValues = [],
		this.options = $.extend(true, {}, SelectUser.defaults, opt),
		//所有人员的数组集合,先剔除无用的值
		this.type = this.options.type,

		//判断是否有多选限制
		this.maxSize = this.options.maximumSelectionSize ? parseInt(this.options.maximumSelectionSize) :false;
		// console.log(this.maxSize)
		//名称拼音首字母列表
		this.surname = [];

		this.selDepartment = Ewos.data.get("department");
		this.selPosition = Ewos.data.get("position");

		if (jQuery.trim(this.$ele.val())) {
			this.values = this.$ele.val().split(",");
		}

		if(!this.$stylebox){
			this.$stylebox = document.createElement('style');
			jQuery('body').before(this.$stylebox);
		}

		this.dataUser = this._cleanData(this.options.data);
	
		console.log(this.selValues);

		

		this._init();
        // this._createBox();
    }

    SelectUser.prototype = {
    	_init:function(){
    		var self = this;
    		this.$selectBox = this._createDome();

    		//点击
    		this.$selectBox.click(function(){
    			self._createBox();
    		})


    	},
    	_createDome:function(){
    		var dome = '<div id="useritem_'+this.id+'" class="sel-useritem"></div>';
    		this.$ele.hide().before(dome);
    		this.$selDome = jQuery('#useritem_'+this.id);

    		return this._setDomeValue();
    	},
    	_setDomeValue:function(){
    		var text = [],
    			uid = [];

    		jQuery.each(this.selValues,function(i,item){
    			text.push(item.text);
    			uid.push(item.id);
    		});

    		this.$ele.val(uid.join(','));
    		if(text.length == 0){
    			this.$selDome.html('<span style="color:#999;">点此处进行选择</span>');
    			return this.$selDome;
    		}
    		this.$selDome.html(text.join(' / '));
    		return this.$selDome
    	},
    	//创建选人的大盒子
    	_createBox:function(){
    		var self = this;
    		if(!this.$selBox){
	    		var box =  '<div id="selectBox_'+this.id+'" class="userselect">'+
								'<header class="mui-bar mui-bar-nav">'+
									'<button class="mui-btn mui-btn-link mui-pull-left oa-text-skyblue" id="selClose_'+this.id+'" data-status="true">取消</button>'+
									'<h1 class="mui-title" id="selNum_'+this.id+'">请选择</h1>';
					if(this._isMaxSize()){				
							box	+=	'<button class="mui-btn mui-btn-link mui-pull-right oa-text-skyblue" id="selAgree_'+this.id+'">确定</button>';
					}

						box	+=	'</header>'+
								'<div class="mui-content">';

					if(this._isMaxSize()){
							box	+=	'<ul class="sel-double-box" id="selDouble_'+this.id+'">'+
										'<li class="sel-addremove-box">'+
											'<div class="sel-adduser"><span class="mui-icon mui-icon-plus"></span></div>'+
											'<div class="sel-removeuser"><span class="mui-icon mui-icon-minus"></span></div>'+
										'</li>'+
									'</ul>';
					}			
							box +=	'<div id="selCont_'+this.id+'" class="sel-content-box active">';
							//只有选择人员的时候 才能使用按照部门筛选
							if(self._isType('user')){
								box +=  '<div class="sel-ress-name">'+
											'<button class="mui-btn mui-pull-right oa-text-skyblue sel-ress-btn" id="selChange_'+this.id+'"><span class="mui-icon mui-icon-bars"></span></button>'+
											'<div class="mui-ellipsis sel-title" id="selType_'+this.id+'">所有人</div>'+
										'</div>';
							}
								box +=	'<div id="list_'+this.id+'" class="mui-indexed-list">'+
											'<div class="mui-indexed-list-search mui-input-row mui-search">'+
												'<input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="请输入查找内容">'+
											'</div>'+
											'<div class="mui-indexed-list-bar" id="reg_'+this.id+'">'+
											'</div>'+
											'<div class="mui-indexed-list-alert"></div>'+
											'<div class="mui-indexed-list-inner">'+
												'<div class="mui-indexed-list-empty-alert">没有数据</div>'+
												'<ul class="mui-table-view" id="selGroup_'+this.id+'">'+
												'</ul>'+
											'</div>'+
										'</div>'+
									'</div>'+
								'</div>'+
				    		'</div>';
				jQuery('body').append(box);

				this.$selBox = jQuery('#selectBox_'+this.id);
				this.$selCont = jQuery('#selCont_'+this.id);
				this.$selList = jQuery('#list_'+this.id);
				this.$selReg = jQuery('#reg_'+this.id);
				this.$selGroup = jQuery('#selGroup_'+this.id);
				this.$selAgree = jQuery('#selAgree_'+this.id);
				this.$selClose = jQuery('#selClose_'+this.id);
				this.$muiSelList = document.getElementById('list_'+this.id);

				if(this._isMaxSize()){
					this.$selDouble = jQuery('#selDouble_'+this.id);
					this.$selAdd = this.$selDouble.find('.sel-adduser');
					this.$selRemove = this.$selDouble.find('.sel-removeuser');
					this.$selAddRemove = this.$selDouble.find('.sel-addremove-box');
					//用于保存多选过渡页面中有操作的值
					this.selDouVal = this.selValues;

					//用于在过渡页面删除数据时保存已经删除的值
					// this.selcheckVal = this.selValues;
				}

				if(this._isType('user')){
					this.$typeName = jQuery('#selType_'+this.id);
					this.$typeBtn = document.getElementById('selChange_'+this.id);
				}

				//将已经选中的人员放进	this.$selDouble 中
				// this._setSelDouble();

				//创建选人内部的列表
				this._createList();

				//将选中的数据在列表中展示出来
				this._setSelValuesCheck();

				//添加相应事件
				this._bindEvent();
			}
			//将已经选中的人员放进	this.$selDouble 中
			this._setSelDouble();

			if(this._isMaxSize() && this.selValues.length > 0){
				this.$selCont.removeClass('active');
			}

			this.$selBox.addClass('active');

    	},

    	//创建选人内部的列表
    	_createList: function(){
    		var self = this,
    			zimu = '',
    		    list = '';
    		jQuery.each(this.surname,function(i,elem){
    			zimu +='<a>'+elem+'</a>';
    			list +='<li data-group="'+elem+'" class="mui-table-view-divider mui-indexed-list-group">'+elem+'</li>';
    			jQuery.each(self.dataUser,function(index, el) {
    				if(elem == el.reg.substr(0,1)){
    					//判断是否是多选 
						if(!self._isMaxSize()){
							list +='<li data-value="'+el.reg+'" data-tags="'+el.tag+'" data-department="'+el.department+'" data-position="'+el.position+'" class="mui-table-view-cell mui-indexed-list-item mui-radio mui-left"><input name="sel_'+self.id+'" type="radio" data-id="'+el.id+'" data-name="'+el.text+'" />';
						}else{
							list +='<li data-value="'+el.reg+'" data-tags="'+el.tag+'" data-department="'+el.department+'" data-position="'+el.position+'"  class="mui-table-view-cell mui-indexed-list-item mui-checkbox mui-left"><input name="sel_'+self.id+'" type="checkbox" data-id="'+el.id+'" data-name="'+el.text+'" />';
						}
						//判断type是否是 user
						if(self._isType('user')){
							list +=el.text+'<span class="mg-l-sm mui-h5">'+el.dpName+'</span></li>';
						}else{
							list +=el.text+'</li>';
						}
    				}
    			}); 
    		});
    		// console.log(list)
    		
    		this.$selReg.html(zimu);
    		this.$selGroup.html(list);

    		//给盒子添加高度
    		this._setBoxHeight();
    		
    		this.$muiBox = new mui.IndexedList(this.$muiSelList);
    		
    	},
    	/**
    	 * [_bindEvent 给插件添加相应的事件]
    	 * @return {[type]} [description]
    	 */
    	_bindEvent:function(){
    		var self = this;
    		//user选择 部门或者 职位分类
    		if(this._isType('user') && this.$typeBtn){
    			
    			var typeData = this._createTypeData();
    			var departPicker = new mui.PopPicker({
						layer: 2
					});
				departPicker.setData(typeData);
				this.$typeBtn.addEventListener('tap', function(event) {
					departPicker.show(function(items) {
						self._departfuc(items[1].id,items[1].iconSkin);
						self.$typeName.html(items[0].text +' > '+ items[1].text);
						// cityResult.innerText = "你选择的城市是:" + items[0].text + " " + items[1].text;
						//返回 false 可以阻止选择框的关闭
						//return false;
					});
				}, false);
    		}

    		if(this._isMaxSize()){
    			this.$selAdd.click(function(event) {
	    			self.$selDouble.removeClass('sel-remove');
	    			self.$selCont.addClass('active');
	    			self._setSelValuesCheck(true);

	    		});

	    		this.$selRemove.click(function(event) {
	    			if(self.$selDouble.hasClass('sel-remove')){
	    				self.$selDouble.removeClass('sel-remove');
	    			}else{
	    				self.$selDouble.addClass('sel-remove');
	    			}
	    			
	    		});

	    		this.$selDouble.on('click','.sel-agreeuser',function(){
	    			if(!self.$selDouble.hasClass('sel-remove')){
	    				return false;
	    			}
	    			jQuery(this).remove();
	    		})

    		}

    		//点击取消按钮
    		this.$selClose.click(function(event) {
    			if(!self._isMaxSize()){
    				self.$selBox.removeClass('active');
    				return;
    			}
    			if(self._isMaxSize() && self.selValues.length != 0 && self.$selCont.hasClass('active')){
    				self.$selCont.removeClass('active');
    				return;
    			}
    			self.selValues = self.selDouVal;
    			self.$selBox.removeClass('active');
    		});

    		//点击确定按钮
    		this.$selAgree.click(function(event) {
    			if(self._isMaxSize() && self.$selCont.hasClass('active')){
    				self._getChecked(true);
    				self._setSelDouble();
    				self.$selCont.removeClass('active');
    				return;
    			}
    			if(self._getChecked(false)){
    				self._setDomeValue();
    			}
    			self.$selDouble.removeClass('sel-remove');
    			
    			self.$selBox.removeClass('active');
    		});

    		if(!this._isMaxSize()){
	    		this.$selGroup.on('change','input:radio',function(){
	    			console.log(self.selValues)
	    			if(self._getChecked()){
	    				self._setDomeValue();
	    			}
	    			self.$selBox.removeClass('active');
	    		})
	    	}
    		
    	},
    	/**
    	 * [_getChecked description]
    	 * @param  {[type]} opt [true:表示从选人列表点的确定， false 表示从过渡页面点的确定]
    	 * @return {[type]}     [description]
    	 */
    	_getChecked:function(opt){
    		var self = this,
    			arr = [],
    			str;
    		if(!this._isMaxSize()){
    				str = this.$selGroup.find('input:radio:checked');
    		}else{
    			if(opt){
					str = this.$selGroup.find('input:checkbox:checked');
	    			
	    		}else{
	    			str = this.$selAddRemove.nextAll('li')
	    		}
    		}
    		str.each(function(index, el) {
    			var that = jQuery(this);
    			arr.push({id:that.data('id'), text:that.data('name')})
    		});
    		this.selValues = arr;
    		
    		if(this.selDouVal && !opt){
    			this.selDouVal = arr;
    		}
    		return this.selValues;
    	},
    	_departfuc:function(id,opt){
    		var self = this;

			this.$stylebox.innerText = '#list_'+this.id+' .mui-indexed-list-inner li{position: relative;visibility: visible;}';
			//如果是显示全部人员 则不进行筛选
			if(id == 'all'){
				return;
			}

			//groupIndex 表示上一个字母标题的index ，itemCount表示 在两个标题(如 C - D) 之间被selectorBuffer数组添加进去的li 有多少个
			var groupIndex = -1,
				itemCount = 0,
				selectorBuffer = [],
				liArray = jQuery('#list_'+this.id+' .mui-indexed-list-inner li'),
				itemTotal = liArray.length;
			var selGroup = function(currentIndex, last) {
				//通过判断 两个标题之间 被选中的数量 >= 总共数量 来判断是否全部选择。若全部被选中 择表示 上个标题下 没有符合要求的人员，所以上一个标题也纳入隐藏数组中

				// console.log(itemCount,currentIndex,groupIndex,itemCount >= currentIndex - groupIndex - (last ? 0 : 1))
				if (itemCount >= currentIndex - groupIndex - (last ? 0 : 1)) {
					//此处也必须使用self
					selectorBuffer.push('#list_'+self.id+' .mui-indexed-list-inner li:nth-child(' + (groupIndex + 1) + ')');
				};
				//处理完成后 将当前标题的index 覆盖掉上一个标题的index itemCount 清空
				groupIndex = currentIndex;
				itemCount = 0;
			}
			//判断 id 是否 在dep中存在，这里是为了找出同时有几个部门的user
			var isOfId = function(dep){
				var arr = dep.split(','),
					wrong = false;
				jQuery.each(arr,function(index, el) {
					if(id == el){
						wrong = true;
					}
					return;
				});
				return wrong;
			}

			jQuery.each(liArray,function(index, item) {
				var that = jQuery(this);
				var dep = that.data(opt);
				//如果是带字母标题的li，则筛选出没有内容的标题
				if(that.hasClass('mui-indexed-list-group')){
					selGroup(index, false);
				}else{
					//先找出不属于选择分类的人员, 只要添加进一个 itemCount就自增一个
					if(!dep || !isOfId(dep)){
						selectorBuffer.push('#list_'+self.id+' .mui-indexed-list-inner li:nth-child(' + (index + 1) + ')');
						itemCount++;
					}
					if (index >= itemTotal - 1) {
						selGroup(index, true);
					}
				}
			});

			if(id != 'all'){
				//全部处理完成后 将数组中的值赋值到样式中
				this.$stylebox.innerText = selectorBuffer.join(', ') + '{position: absolute;visibility: hidden;}';
			}
		},
    	_createTypeData:function(){
    		var typeData = [{
				text: "全部人员",
				value: "all",
				children: [{text:"全部人员",value:"all",id:'all'}]
    		},
    		{
    			text: "按部门",
				value: "department",
				children: this.selDepartment
    		},
    		{
    			text: "按职位",
				value: "position",
				children: this.selPosition
    		}];
    		return typeData;

    	},
    	/**
    	 * [_setSelValuesCheck 根据选中的id 在列表页面展示出来]
    	 * @param {[type]} opt [true:表示从过渡页面点击增加按钮]
    	 */
    	_setSelValuesCheck:function(opt){
    		var self = this;
    		var arr = [];
    		if(opt){
    			this.$selAddRemove.nextAll('li').each(function(index, el) {
    				arr.push({id:jQuery(this).data('id')});
    			});
    		}else{
    			arr = this.selValues;
    		}
    		
    		if(this._isMaxSize()){
    			this.$selGroup.find('input:checkbox').prop('checked',false);
    		}

    		jQuery.each(arr,function(index, el) {
				self.$selGroup.find('input[data-id="'+el.id+'"]').prop('checked',true);
			});
    	},
    	/**
    	 * [_setSelDouble 将已经选中的人员放进	this.$selDouble 中]
    	 */
    	_setSelDouble:function(){
    		if(!this.$selDouble){
    			return false;
    		}
    		this.$selDouble.removeClass('sel-remove');
    		var li = '';
    		jQuery.each(this.selValues,function(index, el) {
    			li += '<li class="sel-agreeuser" data-id="'+el.id+'" data-name="'+el.text+'">'+el.text+'<p><span class="mui-icon mui-icon-closeempty"></span></p></li>';
    		});
    		this.$selAddRemove.nextAll('li').remove();
    		this.$selAddRemove.after(li);
    		return true;
    	},
    	_setBoxHeight:function(){
    		this.winH = jQuery(window).height();
    		this.$selBox.outerHeight(this.winH);

    		// var listH = this.winH - this.$selList.position().top;
    		this.$selList.outerHeight(this.winH - this.$selList.position().top);
    	},

    	//判断当前是单选还是多选 true 为多选 false为单选
    	_isMaxSize:function(){
    		if(!this.maxSize || this.maxSize > 1){
    			if(this.maxSize){
    				return this.maxSize;
    			}
    			return true;

    		}else if(this.maxSize && this.maxSize == 1){
    			return false;
    		}
    	},
    	//判断是否是当前的type
    	_isType:function(type){

    		if(type == this.type){
    			return true
    		}else{
    			return false;
    		}
    	},
    	/**
    	 * [_cleanData 清理数据中ID 为空 以及 错误数据]
    	 * @param  {[type]} data [description]
    	 * @return {[type]}      [description]
    	 */
    	_cleanData: function(data){
			var ret = [],
				self = this;
			if(!data || !data.length) {
				return ret;
			} else {
				// if(this.options.type == 'user'){
					for(var i = 0,len = data.length; i < len; i++) {
						if(data[i] != null && data[i].id != '') {
							//先将已经存在的用户名加入列表，并获取名字
							jQuery.each(this.values,function(ix, it){
								if(it == data[i].id){
									var selValue = {id:it,text:data[i].name};
									self.selValues.push(selValue);
								}
							});
							this.surname.push(codefans_net_CC2PY(data[i].name).substr(0,1));
							//在数据中加入名字拼音
							var newData = this._joinReg(data[i]);
							if(self._isType('user')){
								newData = this._joinDepart(newData);
							}
							ret.push(newData)
						}
					}
				
			}
			this.surname = this._unique(this.surname);
			return ret;
		},
		/**
		 * [_joinReg 在数据中加入名字拼音]
		 * @param  {[type]} data [description]
		 * @return {[type]}      [description]
		 */
		_joinReg:function(data){
			var tag = codefans_net_CC2PY(data.name);
			var reg = '';
			
			for(var n=0;n<tag.length;n++){
				var c=tag.charAt(n);
				if(c>='A' && c<='Z'){
					reg+=c;
				}
			}
			data.tag = tag;
			data.reg = reg;
			return data;
		},
		/**
		 * [_joinDepart 在数据中加入部门职位]
		 * @return {[type]} [description]
		 */
		_joinDepart:function(data){

			var eachDepartPosition = function(did,depo){
				var text ='';
				jQuery.each(depo,function(index, el) {
					if(did == el.id && el.name){
						text = el.name;
						return;
					}
				});
				return text;
			}

			data.dpName = eachDepartPosition(data.department,this.selDepartment);
			data.psName = eachDepartPosition(data.position,this.selPosition);
			return data;
		},
		/**
		 * [_unique A-Z去重复排序]
		 * @param  {[type]} array [description]
		 * @return {[type]}       [description]
		 */
		_unique:function(array) {
			var ret = [];
			var o = {};
			for(var i=0, len=array.length; i<len; ++i){
				if(!o[array[i]]){ 
					ret.push(array[i]); 
					o[array[i]] = array[i]; 
				}
			}
			return ret.sort(); 
		}
	}

    $.fn.userSelect = function(options){
        var argu = Array.prototype.slice.call(arguments, 1);
        return this.each(function() {
            var $el = $(this),
                data = $el.data("userSelect");
            if (!data) { 
                $el.data("userSelect", data = new SelectUser($el, $.extend({}, $.fn.userSelect.defaults, options)));
            }
            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options].apply(data, argu)
            }
        })
    }
    $.fn.userSelect.Constructor = SelectUser;
    $.fn.userSelect.defaults = {
        contact: '',
        data: [],
        multiple: true,
        clearable: true
    }
})(jQuery,window,document);