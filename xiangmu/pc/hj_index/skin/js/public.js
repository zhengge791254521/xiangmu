$(function(){

$('.hj-nav-content').children('li').hover(function() {
	$(this).find('.doormatmenu').show();
}, function() {
	$(this).find('.doormatmenu').hide();
});

$('#hj-list-box .hj-list-group').hover(function(event) {
	$(this).addClass('active').siblings().removeClass('active');
	var uid = $(this).attr('data-href');
	$('#'+uid).addClass('active').siblings().removeClass('active');
});

$('.hj-nav-dropdown').click(function(event) {
	/* Act on the event */
});
$('.hj-content').outerHeight($(window).height() - $('.hj-footer-box').innerHeight());

});
$('.BackToTop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});

// jQuery(function(){ 
//   jQuery(".fixedBox ul.fixedBoxList li.fixeBoxLi").hover(
// 	function (){
// 	  jQuery(this).find('span.fixeBoxSpan').addClass("hover");
// 	  jQuery(this).addClass("hover");
// 	},
// 	function () {
// 	 jQuery(this).find('span.fixeBoxSpan').removeClass("hover");
// 	  jQuery(this).removeClass("hover");
// 	}
//   );
//   jQuery('.BackToTop').click(function(){$('html,body').animate({scrollTop: '0px'}, 800);});
//   var oDate=new Date();
//   var iHour=oDate.getHours();
//   if(iHour>8 && iHour<22){
//     jQuery(".Service").addClass("startWork");
//     jQuery(".Service").removeClass("Commuting");
//   }else{
//     jQuery(".Service").addClass("Commuting");
//     jQuery(".Service").removeClass("startWork");
//   };
// });
