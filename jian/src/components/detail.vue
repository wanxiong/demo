<template>
	<transition  name="slide">
		<div class="detail">
			<p class="model_content_header">随便详情<i class="iconfont " @click="closeModel">&#xe64a;</i></p>
			<div class="product_title">
					<div class="product_icon"></div>
				  <div class="product_text">
				  	<span style="margin: 0px; font-size:20px;">随心花</span>
				  	<p style="color: #3399FF;margin-top:5px;">588<span style="color:#ccc;">人已放款</span></p>
				  	<p style="color: #ccc;font-size:12px;margin-top:5px;"><span style="color:#ccc;">浏览量</span>&nbsp;145</p>
				  </div>
			</div>
		  <div class="product_base">
				  <p> 基本信息</p>
				  <ul>
				  	<li>
				  		<div>
				  			<span style="color:#666;">额度范围</span>
				  			<p style="color:#111;margin-top:5px;">1000-5000元</p>
				  		</div>
				  		<div>
				  			<span style="color:#666;">期限范围</span><br>
                <p style="color:#111;margin-top:5px;">7天-14天</p>
				  		</div>
				  	</li>
				  	<li>
				  		<div>
				  			<span style="color:#666;">利息范围</span>
				  			<p 0.03%</p>
				  			<p style="color:#111;margin-top:10px;">0.03%</p>
				  		</div>
				  		<div>
				  			<span style="color:#666;">审核时间</span><br>
                <p style="color:#111;margin-top:10px;">1小时</p>
				  		</div>
				  	</li>
				  </ul>
		  </div>
		  <p style="height:15px;"></p>
		  <div class="product_detail">
		  	<h1>机构介绍</h1>
		  	<p>1.中国大陆公民；2.18-39岁；3.有固定收入来源；4.手机号码实名制6个月；5.芝麻分≥550；6.首次注册下款</p>
		  </div>
		  <!--  -->
		  <div>
			  	<div @click="join" class="join" >立即申请</div>
		  </div>
		  <!--  -->
		  <mt-popup
          class="model_Contactus model_reject"
        v-model="popupVisible"
        popup-transition="popup-fade"
        >
       		<div class="model_contain">
       			<div style="padding: 20px; line-height: 22px;border-radius:5px; background-color: #FFF; color: #333; font-weight: 300;">
       					<div class="layui-form-item">
       						<input type="text" name="name"  v-model="name" lay-verify="required" placeholder="姓名" autocomplete="off" class="layui-input">
       					</div>
       					<div class="layui-form-item">
       						<input type="text" name="phone" v-model="phone"  lay-verify="required" placeholder="手机号" class="layui-input">
     						</div>
     						<div class="layui-layer-btn layui-layer-btn-c"><a class="layui-layer-btn0">马上申请</a></div>
     				</div>
       		</div>
      </mt-popup>
		</div>
	</transition>
</template>
<script>
	export default {
		data() {
			return {
				popupVisible: false,
				name:'',
				phone:'',
			}
		},
		methods: {
			closeModel() {
				window.history.back();
			},
			join() {
				this.popupVisible = true;
			}
		},
		created() {

		}
	}
</script>
<style scoped>
	.slide-enter-active , .slide-leave-active{
		opacity: 1;
	}
	.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  transform: translateX(100%)
	}
	.detail{
	  position: fixed;
	    left: 0;
	    top: 0;
	    bottom: 48px;
	    z-index: 30;
	    width: 100%;
	    background-color: #fff;
	    transition: all .3s linear;
	}
	.model_content_header{
        height: 43px;
        width: 100%;
        z-index: 999;
        background: #f8f8f8;;
        font-size: 16px;
        color: #fff;
        line-height: 43px;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        position: relative;
        color: #666;
    }
    .model_content_header i{
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        font-size: 22px;
        padding:0 10px; 
        color: #666;
    }
    .product_icon{
    	width: 80px;
    	height: 80px;
    	display: inline-block;
    	background-color: #666;
    }
    .product_title{
    	padding: 10px 25px;
    	display: flex;
    }
    .product_text{
    	margin-left: 15px;
    }
    .product_base{

    }
    .product_base > P{
    	font-size: 14px;
    	color: #666;
    	padding: 10px 25px;
    	border-bottom: 1px solid #ccc;
    }
    .product_base > ul > li {
    	padding: 30px 25px 15px;
    	display: flex;
    	font-size: 14px;

    }
    .product_base li > div{
    	width: 50%;
    }
    .product_detail{
    	padding: 10px 25px;
    	border-top: 1px solid #ccc;
    }
    .product_detail h1{
    	margin-bottom: 10px;
    }
    .product_detail p{
    	font-size: 14px;
    	line-height: 22px;
    }
    .join{
    	width:90%;
    	height:40px;
    	background:#EE9C4D;
    	left:5%;
    	color:#ffffff;
    	line-height:40px;
    	text-align: center;
    	border-radius:5px;
    	position:fixed;
    	bottom:10px;
    	z-index:999999;
    	font-size: 16px;
    }
    .model_contain{
	    width: 100%;
      background-color: #fff;
      border-radius: 2px;
  	  box-shadow: 1px 1px 50px rgba(0,0,0,.3);
   
    }
    .model_Contactus{
    	width: 80%;
    }
    .layui-input, .layui-select{
	    height: 38px;
	    line-height: 1.3;
	    line-height: 38px;
	    border-width: 1px;
	    border-style: solid;
	    background-color: #fff;
	    border-radius: 2px;
	        border-color: #e6e6e6;
    }
    .layui-input, .layui-textarea {
	    display: block;
	    width: 100%;
	    padding-left: 10px;
	}
	.layui-form-item{
		margin-bottom: 15px;
    clear: both;
	}
	.layui-layer-btn .layui-layer-btn0{
    border-color: #1E9FFF;
    background-color: #1E9FFF;
    color: #fff;
    display: block;
    text-align: center;
	}
	.layui-layer-btn a {
    padding: 0 15px;
    border: 1px solid #dedede;
    background-color: #fff;
    color: #333;
    border-radius: 2px;
    font-weight: 400;
    cursor: pointer;
    line-height: 40px;
    text-decoration: none;
    font-size: 14px;
  }
</style>