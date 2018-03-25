(function($){
	$.fn.colorTip=function(setting){
			
		//这就是个创建tig内容的类
		function Tip(content){
			this.content=content;
			this.shown=false;
		}
		Tip.prototype.generate=function(){
			var width=$(document).width();//读取屏幕宽度 用于自适应显示
			console.log(width);
			if(width>700){
				return this.tip||(this.tip=$("<span class='colorTig'>"+this.content+"</span>"));
			}
			else{
				return this.tip||(this.tip=$("<span class='scolorTig'>"+this.content+"</span>"));
			}
		}
		Tip.prototype.resize=function(setting){
			var width=$(document).width();
			if(setting.opacity){this.tip.css("opacity",setting.opacity);}
			if(setting.fontColor){this.tip.css("color",setting.fontColor);}
			if(setting.color){
				this.tip.removeClass();
				if(width>700){this.tip.addClass("colorTig");}
				else{this.tip.addClass("scolorTig");}
				this.tip.addClass(setting.color);
			}
		}
		Tip.prototype.show=function(){
			if(this.shown){return ;}
			else{
				this.tip.fadeIn('fast');
				this.shown=true;
			}
		}
		Tip.prototype.hide=function(){
			if(this.shown==false){return;}
			else{
				this.tip.fadeOut(1000);
				this.shown=false;
			}
		}
		
		//下面插件的代码实现
		var defaultColor={  //默认颜色
			color:"red",
			time:2000
		}
		
		supportSetting=["red","black","yellow","blue"]; //支持的颜色
		
		setting=$.extend(defaultColor,setting);
		
		var elem=$(this);
		
		//执行函数并显示
		elem.each(function(){
			var content=setting.content||$(this).attr("title");
			var tip=new Tip(content);
			$(this).children(".colorTig").remove();//一开始 先删掉所有的colorTip类 放置一个元素多次调用这个插件 从而导致混乱
			$(this).append(tip.generate());//创建
			tip.resize(setting);  //更改提示框样式
			tip.show();
			window.setTimeout(function(){tip.hide()},2000);
			
		});
		
	}
})(jQuery)


