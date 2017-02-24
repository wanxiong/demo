// 常用封装

	var util = {
			
		certiCodeReg : /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, 
		mobileReg : /^\d{11}$/, 
		loginPwdReg : /^[0-9A-Za-z]{6,20}$/, 
		payPwdReg : /^\d{6,8}$/,
		phoneLeng : /^\d{11}$/,
		usName : /^([\s\w\u4e00-\u9fa5]{2,8})$/,
		email:/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
		bankCard : /^(\d{16,19})$/,

		/* 华丽的分割线 ===================================                   一般验证     ============================================ */


		/*手机号长度*/
		phoneleng : function(value,debug) {
			var _this=this;
			var reg = _this.phoneLeng;
			if (reg.test(value) == false) {
				if(debug){
					console.log("请输入正确的手机号");
				}
				return false;
			}
			console.log("正确的手机号");
			return true;
		},

		/*银行卡的校验*/
		bankCardCheck : function(value,debug) {
			var _this=this;
			var reg = _this.bankCard;
			if (reg.test(value) == false) {
				if(debug){
					console.log("请输入正确的卡号");
				}
				return false;
			}
			console.log("正确的卡号");
			return true;
		},

		/*不能空校验*/
		isNotEmpty : function(value,msg,debug) {
			var _this=this;
			if (!value || value == null || value == "") {
				if(debug){
					console.log(msg+"不能为空");
				}
				return false;
			}
			console.log('不是空');
			return true;
		},

		/*姓名校验*/
		usNameCheck : function(value, debug) {
			var _this = this;
			var reg = _this.usName;
			if (reg.test(value) == false) {
				if (debug) {
					console.log("开户名的长度为2-8个字符");
				}
				return false;
			}
			console.log("姓名校验成功");
			return true;
		},

		/* 身份证校验 */
		certiCode : function(value, debug) {
			var _this = this;
			var reg = _this.certiCodeReg;
			if (reg.test(value) == false) {
				if (debug) {
					console.log("请输入有效的身份证信息");
				}
				return false;
			}
			console.log("身份证校验成功");
			return true;
		},

		/* 手机长度校验 */
		mobile : function(value, debug) {
			var _this = this;
			var reg = _this.mobileReg;
			if (!reg.test(value)) {
				if (debug) {
					console.log("请确认你的手机号码");
				}
				return false;
			}
			console.log("手机长度校验成功");
			return true;
		},

		/* 密码校验 */
		loginPassword : function(value, debug) {
			var _this = this;
			var reg =  _this.loginPwdReg;
			if (!reg.test(value)) {
				if (debug) {
					console.log("请输入6-20位数字或字母");
				}
				return false;
			}
			console.log("密码校验成功");
			return true;
		},

		/*
			验证码6位数
		 */
		ValidateCodeSix : function(value, debug) {
			var _this = this;
			var reg = /^([0-9]{6})$/
			if (!reg.test(value)) {
				if (debug) {
					console.log("验证码格式格式错误");
				}
				return false;
			}
			console.log("验证码格式成功");
			return true;
		},
		/* 确认密码 */
		againPassword:function(pwd,apwd,debug){
			var _this=this;
			if(pwd!=apwd){
				if(debug){
					console.log("确认密码错误");
				}
				return false;
			}
			console.log("确认密码正确");
			return true;
		},
		
		/**
		 * 邮箱校验
		 */
		isEmail : function(value, debug){
			var _this = this;
			var reg = _this.email;
			if (!reg.test(value)) {
				if (debug) {
					console.log("请输入正确的邮箱信息！");
				}
				return false;
			}
			console.log("邮箱校验成功");
			return true;
		},
		/**
		 * 是否为空 ，是否是数字
		 */
		isEmptyANum : function(value,msg,debug){
			var _this=this;
			//var msg = msg || "";
			if (!value || value == null || value == "") {
				if(debug){
						console.log(msg+"不能为空");
				}
				return false;
			}
			if(isNaN(value)){
				if(debug){
					console.log(msg+"不能包含非数字");
				}
				return false;
			}
			console.log("不为空的数字");
			return true;
		},
		/**
		 * 显示企业名
		 */
		showCN : function(str){
			if(!str || str == null || str == ''){
				return '';
			}
			return str.substr(0,2)+"*****";
		},





		/*   华丽的分割线     ===============================================================       浏览器操作          ================                   */
		

		/**
		 * 获取URL中的数据
		 */
		getParameter: function(name) {
			var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
			var r = window.location.search.substr(1).match(reg);
			if (r != null)
				return unescape(r[2]);
			return null;
		},





		/*  华丽的分割线        =============================================================     乱起八糟未归类     ===================== */
		
		//将金额以100,000.00的格式显示
		showMoney: function(data) {
			var data = data + '';
			var str = data.split('.')[0];
			var temp = '';
			if (str.length > 3) {
				while (str.length > 3) {
					if (temp == '') {
						temp = str.substr(str.length - 3, str.length);
					} else {
						temp = str.substr(str.length - 3, str.length) + ',' + temp;
					}
					str = str.substr(0, str.length - 3);
				}
				if (str != null || str != '') {
					temp = str + ',' + temp;
				}
			} else {
				temp = str;
			}
			if (data.split(".")[1] && data.split(".")[1] != null) {
				temp = temp + '.' + data.split(".")[1];
			} else {
				temp = temp + '.00';
			}

			return temp;
		},

		//显示手机号
		passMobile: function(tel) {
			if (tel != null) {
				return tel.substr(0, 3) + '****' + tel.substr(7, 11);
			}
			return null;
		},

		/* 分页的总页数 */	
		totalPage: function(total, pageSize) {
			var totalPage = 1;
			if (total != null && total != 0) {
				if (total % pageSize == 0) {
					totalPage = total / pageSize;
				} else {
					totalPage = parseInt(total / pageSize) + 1;
				}
			}
			return totalPage;
		},

		/**
		 * 去掉逗号
		 */
		removeComma: function(id) {
			id = id + "";
			var v;
			v = id.replace(/,/g, "");
			return Number(v);
		},
		/**
		 * 倒计时
		 */
		timer: function(button, timer, msg) {
			var time = 90;
			var t = setInterval(function() {
				if (time == 0) {
					$(button).removeAttr("disabled");
					clearInterval(t);
					time = 90;
					$(timer).html("获取验证码");
					if (msg) {
						$(timer).html(msg);
					}
				} else if (time > 0) {
					time = time - 1;
					$(timer).html("获取" + time + "秒");
				}
			}, 998);
		},

		/*   华丽的分割线  =====================================           时间操作        ======================================*/

		/**
		 * 毫秒转为yyyy.MM.dd HH:mm:ss格式
		 */
		dateFormat: function(millisecond) {
			if (millisecond == null || !millisecond || millisecond == '') {
				return '--';
			}
			var _this = this;
			var date = new Date(millisecond);
			var seperator1 = ".";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var temp_hours = date.getHours();
			var temp_minutes = date.getMinutes();
			var temp_seconds = date.getSeconds();
			if (temp_hours >= 0 && temp_hours <= 9) {
				temp_hours = "0" + temp_hours;
			}
			if (temp_minutes >= 0 && temp_minutes <= 9) {
				temp_minutes = "0" + temp_minutes;
			}
			if (temp_seconds >= 0 && temp_seconds <= 9) {
				temp_seconds = "0" + temp_seconds;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate + " " + temp_hours + seperator2 + temp_minutes + seperator2 + temp_seconds;
			return currentdate;

		},
		/**
		 * 毫秒转为yyyy-MM-dd 格式
		 */
		date2Format: function(millisecond) {
			if (millisecond == null || !millisecond || millisecond == '') {
				return "--";
			}
			var _this = this;
			var date = new Date(millisecond);
			var seperator1 = "-";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},
		/**
		 * 毫秒转为yyyy.MM.dd 格式
		 */
		date3Format: function(millisecond) {
			if (millisecond == 'null' || millisecond == null || !millisecond || millisecond == '') {
				return "----.--.--";
			}
			var _this = this;
			var date = new Date(millisecond);
			var seperator1 = ".";
			var seperator2 = ":";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
			return currentdate;
		},

		/**
		 * 毫秒转为MM月dd日 格式
		 */
		date4Format: function(millisecond) {
			if (millisecond == null || !millisecond || millisecond == '') {
				return "--";
			}
			var _this = this;
			var date = new Date(millisecond);
			var seperator1 = "月";
			var seperator2 = "日";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			var currentdate = month + seperator1 + strDate + seperator2;
			return currentdate;
		},
		/**
		 * 毫秒转为yyyy年MM月dd日格式
		 */
		date5Format: function(millisecond) {
			if (millisecond == null || !millisecond || millisecond == '') {
				return "--";
			}
			var _this = this;
			var date = new Date(millisecond.replace(/-/g,'/'));
			var seperator1 = "年";
			var seperator2 = "月";
			var seperator3 = "日";
			var month = date.getMonth() + 1;
			var strDate = date.getDate();
			if (month >= 1 && month <= 9) {
				month = "0" + month;
			}
			if (strDate >= 0 && strDate <= 9) {
				strDate = "0" + strDate;
			}
			var currentdate = date.getFullYear() + seperator1 + month + seperator2 + strDate + seperator3;
			return currentdate;
		},


		/*   华丽的分割线   ==================================   将图片转换为Base64格式 =================== */
		
		/*
		*@imgurl: 图片URL
		*@callback : 对应回调操作 
		*@ callback(url) ： 对应url为base64Url
		*/
		
		convertToBase : function(imgurl,callback) {
			var img = new Image();
				img.src = imgurl;
				img.onload = function(){

			        var canvas = document.createElement('canvas');
			        canvas.width = img.width;
			        canvas.height = img.height;

			        canvas.getContext('2d').drawImage(img,0,0);
			        baseUrl = canvas.toDataURL();

			        callback(baseUrl);
			     }
		    
		},
		//写cookies 
		setCookie:function(name,value) { 
		    var days = 1; 
		    var exp = new Date(); 
		    exp.setTime(exp.getTime() + days*24*60*60*1000); 
		    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString(); 
		}, 

		//读取cookies 
		readCookie: function (name) { 
		    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		    if(arr=document.cookie.match(reg)){
		        return unescape(arr[2]); 
		    }else{
		        return null;
		    }
		        
		} ,

		//删除cookies 
		delCookie:function (name) { 
		    var cval=readCookie(name); 
		    if(cval!=null){
		        document.cookie= name + "="+cval+";expires="+(new Date(0)).toGMTString();
		    }
		},
		//数组功能扩展
		each: function(fn){
		    fn = fn || Function.K;
		     var a = [];
		     var args = Array.prototype.slice.call(arguments, 1);
		     for(var i = 0; i < this.length; i++){
		         var res = fn.apply(this,[this[i],i].concat(args));
		         if(res != null) a.push(res);
		     }
		     return a;
		},

		//数组是否包含指定元素
		contains : function(suArr){
		    for(var i = 0; i < this.length; i ++){
		        if(this[i] == suArr){
		            return true;
		        }
		     }
		     return false;
		},
		//不重复元素构成的数组
		uniquelize : function(){
		     var ra = new Array();
		     for(var i = 0; i < this.length; i ++){
		        if(!ra.contains(this[i])){
		            ra.push(this[i]);
		        }
		     }
		     return ra;
		},
		//两个数组的补集
		complement : function(a, b){
		     return Array.minus(Array.union(a, b),Array.intersect(a, b));
		},
		//两个数组的交集
		intersect : function(a, b){
		     return a.uniquelize().each(function(o){return b.contains(o) ? o : null});
		},
		//两个数组的差集
		minus : function(a, b){
		     return a.uniquelize().each(function(o){return b.contains(o) ? null : o});
		},
		//两个数组并集
		union : function(a, b){
		     return a.concat(b).uniquelize();
		}
		
		
}
	//module.exports = util;






//  coffee.js写法   原生搭桥
// bridge = null

// ###
// Function for connection to Webview Javascript Bridge
// @callback: Native的回调函数
// ###
// connectWebViewJavascriptBridge = (callback) ->
//     if window.WebViewJavascriptBridge
//         #在webBridge意境链接的情况下
//         callback WebViewJavascriptBridge
//     else
//         #在webBridge没有链接的情况下
//         document.addEventListener 'WebViewJavascriptBridgeReady', (->
//             callback WebViewJavascriptBridge
//             return
//         ), false
//     return

// ###
// Function for connection to Webview Javascript Bridge
// @callback: Native的回调函数
// ###
// connectWebViewJavascriptBridge (bridge) ->
//     console.log 'got bridge'
//     bridge.init (message, responseCallback) ->
//         data = 'Javascript Responds': 'Wee!'
//         alert 'got bridge init'
//         responseCallback data
//         return

//     window.bridge = bridge
//         # bridge.callHandler 'testObjcCallback', { 'foo': 'bar' }, (response) ->
//             # log 'JS got response', response
//             # 
