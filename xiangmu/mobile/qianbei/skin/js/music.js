// (function($){
// 	// Settings
// var audio = document.getElementById('audio');
// audio.addEventListener('ended', ended, false);
// 	function play(elem){
// 		audio.play();
// 	}

// 	function pause(elem){
// 		audio.pause();
// 		audio.currentTime = 0;
// 	}

// 	// 播放结束的时候调用,切换下一曲,或者根据设置当前循环
// 	function ended(){
// 		var $voice_Box = $('#message-content .qb-mess-voice'),
// 				len = $voice_Box.length -1;
// 		$voice_Box.each(function(index, el) {
// 			if($(this).hasClass('qb-playing')){
// 				$(this).removeClass('qb-playing');
// 				if(index == len){
// 					console.log('没有了');
// 					return false;
// 				}
// 				qbPlay($voice_Box.eq(index+1));
// 				return false;
// 			}
// 		});
// 	}

// 	var beforeLoad = function(){
// 		// alert('before')
// 	}

// 	// Fire when track loaded completely
// 	var afterLoad = function(){
// 		// alert('after')
// 	}

// 	// 创建播放器
// 	function loadMusic(voice){
//   //   var newaudio = $('<audio id="qb-audio">').html('<source src="'+voice.src+'">').appendTo('#player');
// 		// audio = newaudio[0];
// 		// audio = document.getElementById('qb-qudio');
// 		pause();
// 		audio.src = voice.src;
// 		// audio.addEventListener('progress', beforeLoad, false);
// 		// audio.addEventListener('durationchange', beforeLoad, false);
// 		// audio.addEventListener('canplay', afterLoad, false);
		
// 	}


// $('#message-content').on('click','.qb-mess-voice', function(){
// 		qbPlay($(this));
// 	});
// 	function qbPlay(elem){
// 		var src = elem.attr('data-src'),
// 				voice = {
// 					dom : elem,
// 					src : src
// 				}

// 		// $('audio').remove();
// 		if(!elem.hasClass('qb-playing')){
// 			//先把所有包含playing 的元素去掉播放样式
// 			$('#message-content').find('.qb-playing').removeClass('qb-playing');
			
// 			loadMusic(voice);
// 			play();
// 			elem.addClass('qb-playing');
// 		}else{
// 			elem.removeClass('qb-playing');
// 			pause();
// 		}
// 	}
// })(jQuery);



    //	播放音频
    var lastPlay,
    	isAutoPlay = true,
    	_audioPlayer = document.getElementById("audio"), 
    	$audioPlayer = $("#audio");
    
  // $('.qb-mess-voice').tap(function(){
	$(document).on("click",".qb-mess-voice",function(){
		// alert(13);
		playAudio($(this));
	});
	
	function playAudio(isme){
		var self = isme,
				src = self.attr('data-src');
		// self.addClass("isReaded");
		
		// rememberImReaded(self.parents("dd").attr("attr-id"));
		if(!self.hasClass("qb-playing")){
			isAutoPlay = true;
			stopAnime();
			self.addClass("qb-playing");
			$audioPlayer.attr("src",src);
			_audioPlayer.volume=1;
			_audioPlayer.play();
		}else{
			isAutoPlay = false;
			_audioPlayer.pause();
			stopAnime();
		}
	}
	
	function stopAnime(){
		if($(".qb-playing").length > 0){
			$(".qb-playing").removeClass("qb-playing");
		}
		
	}

	_audioPlayer.loop = false;
	_audioPlayer.addEventListener('ended', function () {  
		var self = $(".qb-playing");
		var $voice_Box = $('#message-content .qb-mess-voice');
		var playIndex = $voice_Box.index(self);
		if(playIndex < $voice_Box.length - 1 && isAutoPlay){
			playAudio($voice_Box.eq(playIndex+1));
		}else{
			stopAnime();
		}
	}, false);
	_audioPlayer.addEventListener('pause', function () { 
		var self = $(".qb-playing");
		setTimeout(function(){
			if(self.hasClass("qb-playing")){
				$(".qb-playing").removeClass("qb-playing");
			}
		},1000);
	}, false);
	
	/*
	记录已播放音频
	var recordReaded={};

	if(localStorage.getItem('recordReaded')){
		recordReaded=JSON.parse(localStorage['recordReaded']);
	}
	
	function imReaded(id){
		if(recordReaded[id]){
			$(".left_bubble[attr-id="+ id +"]").find(".recordingMsg").addClass("isReaded");
		}
	}
	
	function rememberImReaded(id){
		if(!recordReaded[id]){
			recordReaded[id] = new Date().getTime();
			localStorage.setItem('recordReaded',JSON.stringify(recordReaded));
		}
	}
	
	$("#speakBubbles .recordingMsg").each(function(){
		imReaded($(this).parents("dd").attr("attr-id"));
	});
*/
