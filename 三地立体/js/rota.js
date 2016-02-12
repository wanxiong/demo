/*window.onload = function(){*/
$(function() {
		
	
	var music = $('.music img');
	var kai = true ;
	var num = 0 ;
	music.click(function(event) {
		//event.stopPropagation()
		if( kai ){
			music.css('animation','none');
			$('audio')[0].pause()
			kai = false;
		}
		else{
			music.css('animation','music 1.5s infinite linear');
			$('audio')[0].play()
			kai = true;
		}
	})
	//直接给第一页加类名动画
	$('.page:nth-of-type(1) ul').addClass('current');
	/*$(document).click(function(event) {
		$('.box').addClass('current')
	});*/
	//初始折叠位置
	var screenH = $('.page').height()/2 + 'px' ;
	var screenW = $('.page').width()/2 + 'px' ;
	
	$('.page').css({
		'transform': 'rotateX(-90deg) translateZ('+screenH+') translateY('+screenW+')',
		'-webkit-transform': 'rotateX(-90deg) translateZ('+screenH+') translateY('+screenW+')',
	});
	$('.page:eq(1)').css({'transform':'rotateX(0) translateZ(0) translateY(0)'})
	//翻转折叠
   $(document).on('touchstart',function(event){
		event.preventDefault();
		var moveY;
		var endY;
		//var startY = event.originalEvent.changedTouches[0].pageY;
		var startY = event.changedTouches[0].pageY

		$(document).on('touchmove',function(event){

			moveY = event.changedTouches[0].pageY

			//moveY = event.originalEvent.changedTouches[0].pageY
			console.log(event)
		})
		$(document).on('touchend',function(event){

			endY = event.changedTouches[0].pageY
			//endY = event.originalEvent.changedTouches[0].pageY
			//endY = event.targetTouches[0].pageY;
			 
			if( startY > endY + 10){//上滑
				num++
				num > $('.page').length-1 ? num = $('.page').length-1 : '';
				$('.page:eq('+(num-1)+')').css({
				/*$('.page:nth-of-type('+(num-1)+')').css({*/
					'transform': 'rotateX(90deg) translateY(-'+screenH+') translateZ('+(screenW)+')',
				});
				$('.page:eq('+num+')').css({
				/*$('.page:nth-of-type('+num+')').css({*/
					'transform': 'rotateX(0) translateY(0) translateZ(0)'
				});

			}else if( startY < endY - 10 ){              //下滑
				num--
				num < 0 ? num = 0 : '';
				$('.page:eq('+(num+1)+')').css({
					/*$('.page:nth-of-type('+num+1+')').css({*/
					'transform': 'rotateX(-90deg) translateY('+screenW+') translateZ('+(screenH)+')',
					'-webkit-transform': 'rotateX(-90deg) translateY('+screenW+') translateZ('+(screenH)+')',
				});
				$('.page:eq('+num+')').css({
					/*$('.page:nth-of-type('+num+')').css({*/
					'transform': 'rotateX(0deg) translateZ(0) translateY(0)',
					'-webkit-transform': 'rotateX(0deg) translateZ(0) translateY(0)',
				});
				
				
			}
			//切断 阻止连续发生事件
			$(document).off('touchend')
			$(document).off('touchmove')
		})

	});
	//第二页的模拟
	$('.page:nth-of-type(2) ul').addClass('current')

});
/*};*/









