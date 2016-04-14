$(function(){
		
		$('#fa-th').click(function(){
			$('.test-box1').css('display','block');
			$('.big').css('display','block');
			$('.return').click(function(){
				$('.test-box1').css('display','none');	
				$('.big').css('display','none');
				});
			});
	/*考试*/
	$("input[type='checkbox']").click(function(){
		   
			if($(this).prop('checked')){
				
			}else{
				$('#chtext').css('color','#999');
				$('.kaishi3').css('background-color','#999');	
			}
		});
	$(".t11").click(function(){
			$('.t11').removeClass('t12');
			$(this).addClass("t12");
		})
	//下拉和底部的冲突
	function chongtu(){
	$('.a-select').click(function(){
		alert("1");
		});
	}
});



