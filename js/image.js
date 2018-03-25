//想象图代码实现
(function($){
	$.fn.Image=function(content){
			
		//这就是个创建tig内容的类
		function Image(content){
			this.content={
				nowTemp:"当前温度为:"+content.nowTemp,
				tarTemp:"目标温度为:"+content.tarTemp,
				speed:"当前风速为:"+content.speed,
				expense:"当前费用为:"+content.expense,
				model:"当前工作模式为:"+content.model
			}
			this.shown=false;
			this.image1;
			this.image2;
			this.image3;
			this.image4;
		}
		
		Image.prototype.generate=function(){
			this.image1=this.image1||$("<div class='image1'></div>");
			this.image2=this.image2||$("<div class='image2'></div>");
			this.image3=this.image3||$("<div class='image3'></div>");
			this.image4=this.image4||$("<div class='image4'></div>");
			this.image4.append($("<p>"+this.content.nowTemp+"</p>"));
			this.image4.append($("<p>"+this.content.tarTemp+"</p>"));
			this.image4.append($("<p>"+this.content.speed+"</p>"));
			this.image4.append($("<p>"+this.content.expense+"</p>"));
			this.image4.append($("<p>"+this.content.model+"</p>"));
		}
		
		Image.prototype.show=function(){
			if(this.shown&&this.image1&&this.image2&&this.image3&&this.image4){return ;}
			else{
				this.image1.delay(0).fadeIn(500);
				this.image2.delay(500).fadeIn(500);
				this.image3.delay(1000).fadeIn(500);
				this.image4.delay(1500).fadeIn(500);
				this.image4.children("p").eq(0).delay(2500).fadeIn(500);
				this.image4.children("p").eq(1).delay(3000).fadeIn(500);
				this.image4.children("p").eq(2).delay(3500).fadeIn(500);
				this.image4.children("p").eq(3).delay(4000).fadeIn(500);
				this.image4.children("p").eq(4).delay(4500).fadeIn(500);
				this.shown=true;
			}
		}
		Image.prototype.hide=function(){
			if(this.shown==false){return;}
			else{
				this.image1.fadeOut(500);
				this.image2.fadeOut(500);
				this.image3.fadeOut(500);
				this.image4.fadeOut(500);
			}
		}
		
		//下面插件的代码实现
		var elem=$(this);
		
		//执行函数并显示
		if(content.show){
			elem.each(function(){
				$(this).children("[class^=image]").remove();//这里先要删除 以前留下的
				var image=new Image(content);
				image.generate();
				$(this).append(image.image1);
				$(this).append(image.image2);
				$(this).append(image.image3);
				$(this).append(image.image4);
				image.show();
			});
		}
		else if(content.hide){
			$(this).children("[class^=image]").fadeOut(500,function(){$(this).remove();});
		}
		
	}
})(jQuery)


