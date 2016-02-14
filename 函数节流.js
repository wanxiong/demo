window.onload=function(){
	//初始化ME的类名
		var timer=null;
		$('.me').parent().addClass('current1');

		timer=setTimeout(function(){$('.me').parent().addClass('current');}, 3000)

	$('audio')[0].play()
}
$(function(){

		var key=0
		var timer
		var flag=0
		var tiao=0
		$(document).mousewheel(function(event,num){
			//利用定时器来实现函数节流
			/*clearTimeout(timer)
			timer=setTimeout(function(){
					key=key-num;
				if(key>5){key=5}
				if(key<0){key=0}
				var s=-key*100+'%';
				$('.wrap').stop().animate({'top':s},500);

			},100);*/
			//利用回调函数来实现函数节流
			/*if(flag==0){
				flag=1;
				key=key-num;
				if(key>5){key=5}
				if(key<0){key=0}
				var s=-key*100+'%';
				$('.wrap').stop().animate({'top':s},1000,function(){
					flag=0;
				});
			}*/

			//利用is函数来实现函数节流
			if(!$('.wrap').is(':animated')){
				key=key-num;
				if(key>4){key=4}
				if(key<0){key=0}
				var s=-key*100+'%';
				$('.wrap').stop().animate({'top':s},1000);
				$('.smallNav li').eq(key).addClass('current').siblings().removeClass('current');
				//CS的类名添加
				if(key==4){
					$('.page5').addClass('current')
				}else{
					$('.page5').removeClass('current')
				}
				if(key==1){
					$('.page2').addClass('current')
				}else{
					$('.page2').removeClass('current')
				}
				if(key==2){
					$('.page3').addClass('current')
				}else{
					$('.page3').removeClass('current')
				}
				if(key==3){
					$('.page4').removeClass('current')
				}else{
					$('.page4').addClass('current')
				}
				if(key==0){
					$('.page1').addClass('current')
				}else{
					$('.page1').removeClass('current')
				}

			}

		});
		var dom=$('<span></span>');
		$('.smallNav li').append(dom);
		var arr = ['首页','作品集','主题','关于','联系'];
		$('.smallNav li span').each(function(index,el){
				$(el).html(arr[index]);
		});
		$('.smallNav li').bind({
			mouseover:function(){
				$(this).children('span').stop().fadeTo(1000,1);
			},
			mouseout:function(){
				$(this).children('span').stop().fadeTo(1000,0);
			},
			click:function(){
				key=$(this).index();
				var s=-key*100+'%';
				$(this).addClass('current').siblings().removeClass('current');
				$('.wrap').stop().animate({'top':s},1000);

				//CS滚动开始的类名添加特效
				if(key==4){
					$('.page5').addClass('current')
				}else{
					$('.page5').removeClass('current')
				}
				if(key==2){
					$('.page3').addClass('current')
				}else{
					$('.page3').removeClass('current')
				}
				if(key==1){
					$('.page2').addClass('current')
				}else{
					$('.page2').removeClass('current')
				}
				if(key==0){
					$('.page1').addClass('current')
				}else{
					$('.page1').removeClass('current')
				}


			}

		});
		//顶部的链接
		$('.head li').click(function(event) {
			 a=$(this).index();
			 key=a
		    y=-a*100+'%';
		$('.wrap').stop().animate({'top':y},1000);
		$('.smallNav li').eq(a).addClass('current').siblings().removeClass('current');
		if(a==4){
					$('.page5').addClass('current')
				}else{
					$('.page5').removeClass('current')
				}
				if(a==2){
					$('.page3').addClass('current')
				}else{
					$('.page3').removeClass('current')
				}
				if(a==1){
					$('.page2').addClass('current')
				}else{
					$('.page2').removeClass('current')
				}
				if(a==0){
					$('.page1').addClass('current')
				}else{
					$('.page1').removeClass('current')
				}


	});

});

$(function(){
	/*var num=0;
	var timer;
	var gundong=(function(){
				$('.banner ul li').eq(num).stop().fadeOut(1500);
				num++;
				var i=$(this).index();
				$(this).addClass('current').siblings().removeClass('current');
				$('.banner ul li').eq(i).stop().fadeIn(1500);
				num=i;
		});
	 $('.banner ol li').click(gundong);
	setInterval(function(){
		$('.banner ul li').eq(num).stop().fadeOut(2500);
		num++;
		if(num>2){num=0};
		$('.banner ol li').eq(num).addClass('current').siblings().removeClass('current');
		$('.banner ul li').eq(num).stop().fadeIn(2500);


	}, 3000)*/
//作品集方向感知
	$('.work .con li a').on('mouseenter mouseleave',function(event){
				//检测方向代码块
				//最终返回direction：
				//0：上方
				//1：右侧
				//2：下方
				//3：左侧
				var w=$(this).width();
				var h=$(this).height();
				var x=(event.pageX-$(this).offset().left-(w/2))*(w>h?(h/w):1);
				var y=(event.pageY-$(this).offset().top-(h/2))*(h>w?(w/h):1);
				var direction=Math.round((((Math.atan2(y, x)*(180/Math.PI))+180)/90)+3)%4;

				if(event.type=='mouseenter'){

					if(direction==0){
						//console.log('上方进入');
						//因为盒子默认的定位值是0，0，所以需要一瞬间让盒子到达-550PX的位置；
						//然后从-550到0过渡
						//为了不让后面的左移、右移动画改变的left值影响当前这个动画；
						//所以这里做一次left归零处理
						$(this).children('span').css({
							'top': -250,
							'left':0,
							'display': 'block'
						});
						$(this).children('span').stop().animate({'top':0}, 200);
					}else if(direction==1){
						//console.log('右侧进入');
						$(this).children('span').css({
							'left': 250,
							'top': 0,
							'display':'block'
						});
						$(this).children('span').stop().animate({'left':0}, 200);
					}else if(direction==2){
						//console.log('下方进入');
						$(this).children('span').css({
							'top': 250,
							'left':0,
							'display':'block'
						});
						$(this).children('span').stop().animate({'top':0}, 200);
					}else if(direction==3){
						//console.log('左侧进入');
						$(this).children('span').css({
							'left': -250,
							'top': 0,
							'display':'block'
						});
						$(this).children('span').stop().animate({'left':0}, 200)
					}

				}else{

					if(direction==0){
						//console.log('上方离开');
						$(this).children('span').stop().animate({'top':-250}, 200)
					}else if(direction==1){
						//console.log('右侧离开');
						$(this).children('span').stop().animate({'left':250}, 200)
					}else if(direction==2){
						//console.log('下方离开');
						$(this).children('span').stop().animate({'top':250}, 200);
					}else if(direction==3){
						//console.log('左侧离开');
						$(this).children('span').stop().animate({'left':-250}, 200)
					}

				}



	});

});

//3D旋转
$(function(){
		var imgL = $("div.pic img").size();
		var deg = 360 / imgL;
		var roY = 0, roX = -10;
		var xN = 0, yN = 0;
		var play = null;

		$("div.pic img").each(function(i){
			$(this).css({'transform':'rotateY('+i*deg+'deg) translateZ(300px)'});
			$(this).attr('ondragstart','return false'); //禁止对图片的拖拽
		});
		$(document).mousedown(function(ev){
			console.log('按下！');
			var x_ = ev.clientX;
			var y_ = ev.clientY;
			clearInterval(play);
			$(this).bind('mousemove',function(even){
				console.log('移动！');
				var x = even.clientX;  //鼠标距离左边的距离
				var y = even.clientY;  //鼠标距离右边的距离

				xN = x - x_;
				yN = y - y_;
				roY += xN * 0.2;
				roX -= yN * 0.1;
				//$('body').append('<div style="width: 5px;height: 5px;background: #f00;position: absolute;top: '+y+'px;left:'+x+'px;"></div>');
				$('div.pic').css({transform:'perspective(800px) rotateX('+roX+'deg) rotateY('+roY+'deg)'});
				x_ = even.clientX;
				y_ = even.clientY;
				return false
			});
		}).mouseup(function(){
			$(this).unbind('mousemove');
			var play = setInterval(function(){
				xN *= 0.95;
				yN *= 0.95;
				if(Math.abs(xN) < 1 && Math.abs(yN) < 1){
					clearInterval(play);
				}
				roY += xN * 0.2;
				roX -= yN * 0.1;
				$('div.pic').css({transform:'perspective(800px) rotateX('+roX+'deg) rotateY('+roY+'deg)'});
			}, 30);

		});
	});
//3d对应的图片
$(function() {
	$('.outBag').css({'display':'none','opacity':0});
	$('.page4 .pic img').click(function(event) {
		$('.outBag').css('display','block').stop().animate({'opacity':1},1000)

	});

	//点击关闭按钮
	$('.outBag .btns').click(function(event) {
		$('.outBag').stop().animate({'opacity':0},1000,function(){
			setTimeout(function(){
				$('.outBag').css('display','none')
			}, 1000)
		});
	});
	//呼吸效果的开始
	var num=0;
	$('.outBag .right').click(function(event) {
		$('.outBag .bag li').eq(num).stop().fadeOut(1500)
		num++;
		if(num>11){
			num=0
		}
		$('.outBag .bag li').eq(num).stop().fadeIn(1500)
	});
	$('.outBag .left').click(function(event) {
		$('.outBag .bag li').eq(num).stop().fadeOut(1500)
		num--;
		if(num<0){
			num=11
		}
		$('.outBag .bag li').eq(num).stop().fadeIn(1500);
	});


	var timer2=null;
	//banner的弹出效果
	// 初始开始的样式
	$('.zhanShi li').eq(0).css('width', 600);
	$('.work_banner:eq(0) span').click(function(event) {
		event.stopPropagation()
		$('.zhanShi').stop().show(1000);
	});
	//第四个展示
	$('.work_web:eq(0) span').click(function(event) {
		event.stopPropagation()
		$('.zhanShi1').stop().slideDown(1000);

	});
	//第三个展示
	$('.work_vi:eq(0)').click(function(event) {
		event.stopPropagation()
		$('.zhanShi2').stop().fadeIn(1000);
		timer2=setTimeout(function(){$('.zhanShi2').children('a').addClass('current');}, 1000);

	});

	$('.zhanShi li').hover(function() {
		$(this).stop().animate({'width':600}, 500).siblings('li').stop().animate({'width':100}, 500);

	});
	//
	$(document).click(function(event) {

		$('.zhanShi').stop().hide(1000);
		$('.zhanShi1').stop().slideUp(1000);
	});



	$(document).click(function(event) {
		$('.zhanShi2').children('a').removeClass('current');
		timer4=setTimeout(function(){$('.zhanShi2').stop().fadeOut(1000);},1000)




	});
});





