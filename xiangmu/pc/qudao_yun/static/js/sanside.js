$(function(){

$('.navbar-right .head-li').hover(function(event) {
    $(this).children('.menu_pop').slideDown(200);
},function(){
    $(this).children('.menu_pop').slideUp(200);
});

$('.cebian-right .cebian-box').hover(function(event) {
    $(this).children('p').show().siblings('.cebian-tanchu').show();
},function(){
    $(this).children('p').hide().siblings('.cebian-tanchu').hide();
});


})