//定义canvas的绘图类
function canvas(can,width,height){
	this.width=width||500; //canvas长
	this.height=height||500; //canvas宽
	this.eyes=0;//是否睁眼
	//左右眼的初始 （无法被改变）
	this.leftEyeX=168;
	this.leftEyeY=222;
	this.rightEyeX=278;
	this.rightEyeY=222;
	//眼睛的移动范围
	this.eRange=5;
	//眼神的移动次数
	this.eMoveNum=0;
	//是否眩晕
	this.isDizzy=0;
	//是否开机
	this.switch=0;
	//页面中 的canvas元素
	this.can=can||document.getElementById("canvas");
}
//绘制电视的外壳
canvas.prototype.drawShell=function(){
	var context=this.can.getContext("2d");
	//大框
	context.beginPath();
	context.save();
	context.moveTo(58,135);
	context.lineTo(392,135);
	context.lineTo(392,376);
	context.lineTo(58,376);
	context.lineTo(58,126);
	context.lineWidth=18;
	context.strokeStyle="rgb(69,69,69)";
	context.stroke();
	context.closePath();
	//小框
	context.beginPath();
	context.moveTo(92,173);
	context.lineTo(360,173);
	context.lineTo(360,344);
	context.lineTo(92,344);
	context.lineTo(92,164);
	context.lineWidth=18;
	context.strokeStyle="rgb(69,69,69)";
	context.stroke();
	context.closePath();
	//触角
	context.beginPath();
	context.moveTo(118,82);
	context.lineTo(222,134);
	context.lineWidth=18;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.stroke();
	context.closePath();
	context.beginPath();
	context.moveTo(346,49);
	context.lineTo(252,134);
	context.lineWidth=18;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.stroke();
	context.closePath();
	//底座
	context.beginPath();
	context.arc(128,376,22,0,Math.PI,false);
	context.lineWidth=16;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.stroke();
	context.closePath();
	context.beginPath();
	context.arc(326,376,22,0,Math.PI,false);
	context.lineWidth=16;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.stroke();
	context.closePath();
	//嘴巴
	context.beginPath();
	context.arc(204,270,22,Math.PI,2*Math.PI,true);
	context.arc(250,270,22,Math.PI,2*Math.PI,true);
	context.lineWidth=16;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.lineJoin="round";
	context.stroke();
	context.restore();
	context.closePath();
}
//电视闭眼
canvas.prototype.closeEyes=function(){
	var context=this.can.getContext("2d");
	context.save();
	context.beginPath();
	context.moveTo(128,246);
	context.lineTo(186,214);
	context.moveTo(248,210);
	context.lineTo(322,252);
	context.lineWidth=16;
	context.strokeStyle="rgb(69,69,69)";
	context.lineCap="round";
	context.lineJoin="round";
	context.stroke();
	context.closePath();
	context.restore();
}

//电视睁眼
canvas.prototype.openEyes=function(lex,ley,rex,rey){
	//睁眼
	var context=this.can.getContext("2d");
	context.save();
	context.beginPath();
	context.arc(168,222,20,0,2*Math.PI,true);
	context.moveTo(298,222);
	context.arc(278,222,20,0,2*Math.PI,true);
	context.lineWidth=5;
	context.strokeStyle="rgb(69,69,69)";
	context.stroke();
	context.closePath();
	context.beginPath();
	context.moveTo(lex,ley);
	context.arc(lex,ley,5,0,2*Math.PI,true);
	context.moveTo(rex,rey);
	context.arc(rex,rey,5,0,2*Math.PI,true);
	context.fillStyle="rgb(69,69,69)";
	context.fill();
	context.closePath();
	context.restore();
}

//电视眩晕
canvas.prototype.dizzy=function(){
	var context=this.can.getContext("2d");
	context.save();
	context.beginPath();
	//左眼
	context.arc(168,222,5,0.5*Math.PI,1.5*Math.PI,true);
	context.moveTo(168,237);
	context.arc(168,227,10,0.5*Math.PI,1.5*Math.PI,false);
	context.moveTo(168,237);
	context.arc(168,221,16,0.5*Math.PI,1.5*Math.PI,true);
	//context.moveTo(168,237);
	context.arc(168,229,24,1.5*Math.PI,0.5*Math.PI,true);
	//有眼
	context.moveTo(278,227);
	context.arc(278,222,5,0.5*Math.PI,1.5*Math.PI,true);
	context.moveTo(278,237);
	context.arc(278,227,10,0.5*Math.PI,1.5*Math.PI,false);
	context.moveTo(278,237);
	context.arc(278,221,16,0.5*Math.PI,1.5*Math.PI,true);
	context.arc(278,229,24,1.5*Math.PI,0.5*Math.PI,true);
	
	context.lineWidth=2;
	context.strokeStyle="rgb(69,69,69)";
	context.stroke();
	context.closePath();
	context.restore();
}


//眼睛的移动
canvas.prototype.moveEyes=function(x,y){ //这两个参数是鼠标的位置
	var lex;
	var ley;
	var rex;
	var rey;
	if(x>102&&x<360&&y>182&&y<344){
		//获得鼠标的移动距离
		var precentL=Math.sqrt(this.eRange*this.eRange/((x-this.leftEyeX)*(x-this.leftEyeX)+(y-this.leftEyeY)*(y-this.leftEyeY)));
		var precentR=Math.sqrt(this.eRange*this.eRange/((x-this.rightEyeX)*(x-this.rightEyeX)+(y-this.rightEyeY)*(y-this.rightEyeY)));
		var lx=Math.abs(x-this.leftEyeX)*precentL;
		var ly=Math.abs(y-this.leftEyeY)*precentL;
		var rx=Math.abs(x-this.rightEyeX)*precentR;
		var ry=Math.abs(y-this.rightEyeY)*precentR;
		//获得移动的方向
		lx=lx*(x>this.leftEyeX?1:-1);
		ly=ly*(y>this.leftEyeY?1:-1);
		rx=rx*(x>this.rightEyeX?1:-1);
		ry=ry*(y>this.rightEyeY?1:-1);
		//获得眼睛经过一次移动后最终的距离
		lex=this.leftEyeX+lx;
		ley=this.leftEyeY+ly;
		rex=this.rightEyeX+rx;
		rey=this.rightEyeY+ry;
	}
	else{
		lex=this.leftEyeX;
		ley=this.leftEyeY;
		rex=this.rightEyeX;
		rey=this.rightEyeY;
	}
	//重绘
	this.clearRect();
	this.drawShell();
	//是否眩晕
	if(this.eMoveNum==0){
		console.log(this.eMoveNum);
		this.t=window.setTimeout(function(){
			console.log(canvas.eMoveNum);
			if(canvas.eMoveNum>60){
				canvas.isDizzy=1;
				window.clearTimeout(canvas.t);
			}
			else{
				//console.log(canvas.eMoveNum);
				canvas.eMoveNum=0;
				window.clearTimeout(canvas.t);
			}
		},1000)
	}
	this.eMoveNum++;
	if(this.isDizzy==1){this.dizzy();}
	else{this.openEyes(lex,ley,rex,rey);}
}
//清屏
canvas.prototype.clearRect=function(){
	var context=this.can.getContext("2d");
	context.clearRect(0,0,this.width,this.height);
}

//点击开机事件
$("#canvas").bind("click",function(e){
	var e=e||window.event;
	if(e.offsetX>102&&e.offsetX<360&&e.offsetY>182&&e.offsetY<344){
		if(canvas.switch==0){
			$(".canvas").colorTip({
				color:"red",
				opacity:1,
				fontColor:"black",
				content:"开机成功"
			});
		}
		canvas.switch=1;
		$( "#canvas" ).effect( "shake" );
		//开机后马上执行鼠标移动真眼事件
		$("#canvas").mouseenter();
	}
})


//睁眼闭眼事件
$("#canvas").bind("mouseenter",function(){
	if(canvas.switch){
		canvas.eyes=1;
		//解除眩晕锁定s
		canvas.isDizzy=0;
		canvas.eMoveNum=0;
		canvas.clearRect();
		canvas.drawShell();
		canvas.openEyes(canvas.leftEyeX,canvas.leftEyeY,canvas.rightEyeX,canvas.rightEyeY);
	}
});
$("#canvas").bind("mouseleave",function(){
	if(canvas.switch){
		canvas.eyes=0;
		canvas.clearRect();
		canvas.drawShell();
		canvas.closeEyes();
	}
});

//眼睛的移动事件
$("#canvas").bind("mousemove",function(e){
	if(canvas.switch){
		var e=e||window.event;
		canvas.moveEyes(e.offsetX,e.offsetY);
	}
})
$("#canvas").bind("touchmove",function(e){
	if(canvas.switch){
		var e=e||window.event;
		var touch=e.originalEvent.targetTouches[0];		
		canvas.moveEyes(touch.pageX,touch.pageY);
	}
})

//查看详情事件 关闭详情事件
$("#checkAll").bind("click",function(){
	if(canvas.switch){
		$(".canvas").Image({
			nowTemp:1,
			tarTemp:1,
			speed:1,
			expense:1,
			model:1,
			show:true
		});
	}
	else{
		$( "#canvas" ).effect( "shake" );
		$(".canvas").colorTip({
		color:"yellow",
			opacity:1,
			fontColor:"black",
			content:"点我开机"
		});
	}
});
$("#closeAll").bind("click",function(){
	$(".canvas").Image({
		hide:true,
	});
});

var canvas=new canvas(document.getElementById("canvas"),500,500);
canvas.drawShell();
canvas.closeEyes();
//弹出提示
$(".canvas").colorTip({
	color:"yellow",
	opacity:1,
	fontColor:"black",
	content:"点我开机"
});
//弹出想象图

