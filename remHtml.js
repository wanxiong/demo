window.onload = function(){
	// 获取html标签
	var oHtml = document.documentElement;
	function getSize(){
		// 获取屏幕的宽度
		var screenWidth = oHtml.clientWidth;
    		if(screenWidth <= 320){
    			oHtml.style.fontSize = '23.5294px';
    		}else if(screenWidth >= 540){
    			oHtml.style.fontSize = '40px';
    		}else{
    			oHtml.style.fontSize = screenWidth/13.6+'px';//13.6是当前的设计图尺寸和设置的文字比列
    		}
	}
	// 当窗口发生改变的时候调用
	window.onresize = function(){
		getSize();
	}
 }