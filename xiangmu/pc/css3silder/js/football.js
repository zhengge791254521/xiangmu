var football = (function (){
	var requestAnimFrame = (function(callback){
		return window.requestAnimFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback){
			setTimeout(callback,1000/60);
		}
	})();

	var canvas;
	var context;
	var image;
	var ball;

	function Ball(ballimage,options){
		this.width = options.width;
		this.height = options.height;
		this.x = options.left;
		this.y = options.top;
		this.image = ballimage;
		this.gravity = 0.4;
		this.vy = 0.8;
		this.vx = 4;
		this.vyAdjust = -15;
		this.vxAdjust = 0.25;
		this.factor = 0.65;
		this.end = false;
	}

	Ball.prototype.draw = function(){
		context.drawImage(this,ballimage,
			0,0,
			100,100,
			this.x,this.y,
			this.width,this.height
		)
	}

	Ball.prototype.hit = function(){
		this.vy = this.vyAdjust;
	}

	Ball.prototype.move = function(){
		this.y += this.vy
		this.vy += this.gravity

		if(this.vx > 0){
			this.x += this.vx
		}

		if((this.y + this.height) > canvas.height){
			this.hit()
			this.vyAdjust = (this.vyAdjust * this.factor)
			this.vx = this.vx - this.vxAdjust
		}

		if(this.vx < -0.1){
			this.end = true
		}
	}

	function clearCanvas(){
		context && context.clearRect(0,0,canvas.width,canvas.height)
	}

	function update(){
		clearCamvas();
		ball.move();
		ball.draw();
	}

	function loop(){
		update();

		if(!ball.end){
			requestAnimFrame(loop)
		}
		
	}

	function loadBall(){
			ball = new Ball(image,{
			width:100,
			height:100,
			left:0,
			top:0,
		});

		loop();
	}

	function init(){
		canvas = document.getElementById('football');
		context = canvas.getContext('2d');
		image = new Image();
		image.onload = loadBall;
		image.src = 'football.png';
	}

	var football = {
		play:function(){
			init();
		}
	}
	return football;
})()
