/** 
蒙版信息控件 
用法： 
1.引用 mask.css 
2.引用 mask.js 
3.调用方法 
var obj=new MaskControl(); 
//显示蒙版提示信息 
obj.show("显示的提示信息"); 
//隐藏蒙版提示信息 
obj.hide(); 
//显示提示信息，并隔timeOut(1000代表1秒)自动关闭 
obj.autoDelayHide=function(html,timeOut) 
*/
function MaskControl() {
	this.show = function(html) {
			var loader = $("#div_maskContainer");
			if (loader.length == 0) {
				loader = $("<div id='div_maskContainer'><div id='div_Mask' ></div><div id='div_loading' ></div></div>");
				$("body").append(loader);
			}
			self.loader = loader;
			var w = $(window).width();
			var h = $(window).height();
			var divMask = $("#div_Mask");
			divMask.css("top", 0).css("left", 0).css("width", w).css("height", h);
			var tipDiv = $("#div_loading");
			if (html == undefined)
				html = "";
			tipDiv.html(html);
			loader.show();
			var x = (w - tipDiv.width()) / 2;
			var y = (h - tipDiv.height()) / 2;
			tipDiv.css("left", x);
			tipDiv.css("top", y);
		},
		this.hide = function() {
			var loader = $("#div_maskContainer");
			if (loader.length == 0) return;
			loader.remove();
		},
		this.autoDelayHide = function(html, timeOut) {
			var loader = $("#div_maskContainer");
			if (loader.length == 0) {
				this.show(html);
			} else {
				var tipDiv = $("#div_loading");
				tipDiv.html(html);
			}
			if (timeOut == undefined) timeOut = 3000;
			window.setTimeout(this.hide, timeOut);
		}

}