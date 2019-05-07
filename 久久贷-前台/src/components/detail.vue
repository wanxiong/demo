<template>
	<transition  name="slide">
		<div class="detail">
			<p class="model_content_header" style="background-colo:#fff;"><i class="iconfont " @click="closeModel">&#xe64a;</i></p>
			<div class="product_title" style="background-color:#fff;border-top:1px solid #eaeaea;">
                <div class="product_icon" :style="{background: 'url('+ imgUrl + json.productUrl+') no-repeat center/cover'}"></div>
				  <div class="product_text">
				  	<span style="margin: 0px; font-size:16px;padding-top: 10px;display: block;" >{{json.productName}}</span>
				  	<p style="margin-top:8px;"><span style="font-size:16px;">{{json.loanCount || 0 + ' '}}</span>人已放款</p>
				  	<p style="margin-top:8px;color:#ccc;font-size:12px;"><span style="color:#999;">浏览量</span>&nbsp;<span style="color: #333;">{{json.accessNumber}}</span></p>
				  </div>
			</div>
            <section class="base-text">
                <div>基本信息</div>
            </section>
            <div class="applyDetail">
                <div>
                    <span>额度范围</span>
                    <span>{{json.productDescription}}元</span>
                </div>
                <div>
                    <span>期限范围</span>
                    <span>{{json.timeLimit}}天</span>
                </div>
                <div>
                    <span>利息范围</span>
                    <span >{{json.interestRange}}</span>
                </div>
                <div>
                    <span>审核时间</span>
                    <span >{{json.waitTime}}小时</span>
                </div>
            </div>
            <section class="borderbt8">
                <div>{{json.deatil}}</div>
            </section>
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
       						<input type="text" name="phone" v-model="phone"  lay-verify="required" placeholder="手机号" class="layui-input" maxlength="11">
 						</div>
                        <!-- <div class="layui-form-item">
                            <input type="password" name="phone" v-model="password"  lay-verify="required" placeholder="登录密码" class="layui-input">
                        </div> -->
                        <!-- <div class="layui-form-item">
                            <input type="text" name="phone" v-model="share"  lay-verify="required" placeholder="分享人邀请码" class="layui-input">
                        </div> -->
 						<div class="layui-layer-btn layui-layer-btn-c" @click="startApply"><a class="layui-layer-btn0">马上申请</a></div>
     				</div>
       		</div>
      </mt-popup>
		</div>
	</transition>
</template>
<script>
    import {imgUrl} from '@/api/apiconfig'
	export default {
		data() {
			return {
				popupVisible: false,
				name:'',
				phone:'',
                password: '',
                share: '',
                json: {
                }
			}
		},
        computed: {
            imgUrl: () => {
                return imgUrl;
            }
        },
		methods: {
			closeModel() {
				window.history.back();
			},
			join() {
                this.popupVisible = true;
				
            },
            init() {
                let uApi = 'api/product/get/' + this.$route.query.productId;
                this.$http.get(uApi).then((res) => {
                   this.json = res.data.data;
                }).catch( err => {
                    console.log(err)
                     this.$toast('未知错误');
                })
            },
            startApply() {
                var _this =this;
                if(_this.name == '') {
                    _this.$toast('请输入姓名');
                    return;
                }
                if(!(/^1[345678]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                let param = new URLSearchParams();
                param.append("name", _this.name);
                param.append("phone",  _this.phone);
                param.append("productId", this.$route.query.productId);
                param.append("shareCode",  this.$route.query.shareCode);
                //param.append("shareCode",  sessionStorage.getItem('share'));
                _this.$http.post('/api/user/productLogin', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        this.popupVisible = false;
                        if (r.data) {
                            window.location.href= this.json.productLink;
                        } else {
                            _this.$toast('产品已下架')
                        }
                    } else {
                        _this.$toast(r.message);
                    }
                }).catch( res => {

                })

            }
		},
		created() {
            console.log(this.$route)
            this.init()
		},
        mounted() {
            this.share = sessionStorage.getItem('share') || '';
        },
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
   height: 100%;
    z-index: 30;
    width: 100%;
    background-color: #f8f8f8;
    transition: all .3s linear;
    overflow-y: scroll;
	}
    .applyDetail{
        display: flex;
        padding: 15px 0;
        flex-wrap: wrap;
        text-align: left;
        background-color: #fff;
    }
    .applyDetail >div{
        width: 50%;
        padding-left: 15px;
        box-sizing: border-box;
        padding-top: 15px;
        padding-bottom: 15px;
    }
    .applyDetail >div > span{
        font-size: 14px;
        color: #999999;
    }
    .base-text{
        padding: 8px 15px  0;
        color: #999;
    }
    .base-text > div{
        border-bottom: 1px solid #eaeaea;
        padding-bottom: 10px;
    }
    .applyDetail >div > span:nth-of-type(2){
        display: block;
        text-align: left;
        font-size: 14px;
        color: #333;
        margin-top: 8px;
        font-weight: 500;
    }
    .ji_detailsTiL {
        padding: 10px;
        border-bottom: 1px solid #eee;
    }
    .ji_detailsTiL span {
        background: url() left center no-repeat;
        padding-left: 10px;
        background-size: 3px auto;
        font-size: 16px;
        color: #2e2e2e;
        position: relative;
        line-height: 22px;
    }
    .ji_detailsTiL span::after{
        position: absolute;
        display: block;
        width: 3px;
        height: 86%;
        background-color: #ffc600;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        content: "";
    }
    .shen_a {
        padding: 20px 10px;
        display: flex;
         flex-wrap: wrap;
    }
    .shen_a span {
        padding: 10px 5px;
        display: block;
        width: 30%;
        background: transparent;
        text-decoration: none;
        -webkit-tap-highlight-color: transparent;

    }
    .shen_a a {
        padding: 2px 5px;
        border: 1px solid #e1e1e1;
        color: #666;
        margin-right: 10px;
        font-size: 14px;
    }
    .ul_daklist {
        padding: 10px;
    }
	.model_content_header{
        height: 43px;
        width: 100%;
        z-index: 999;
        background: #f8f8f8;
        font-size: 16px;
        line-height: 43px;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        position: relative;
        color: #fff;
    }
    .model_content_header i{
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        font-size: 22px;
        padding:0 10px; 
        color: #ccc;
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
    .num{
        text-align: center;
        font-size: 14px;
        color: #666;
        margin-bottom: 10px;
    }
    .join{
    	width:90%;
        left: 5%;
    	height:40px;
    	color:#ffffff;
    	line-height:40px;
    	text-align: center;
    	font-size: 16px;
        background: #EE9C4D;
        margin: 0 auto;
        border-radius: 5px;
        position: fixed;
        bottom: 10px;
        z-index: 99;
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
    .borderbt8{
        background-color: #fff;
        padding: 0 15px;
    }
    .borderbt8 > div{
        border-top: 1px solid #eaeaea;
        padding: 10px 0;
        font-size: 18px;
        min-height: 100px;
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