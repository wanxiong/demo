<template>
	<transition  name="slide">
		<div class="detail">
			<p class="model_content_header" >贷款详情<i class="iconfont " @click="closeModel">&#xe64a;</i></p>
			<div class="product_title">
					<div class="product_icon" :style="{background: 'url('+bgUrl+') no-repeat center/cover'}"></div>
				  <div class="product_text">
				  	<span style="margin: 0px; font-size:20px;padding-top: 10px;display: block;" v-text="proName"></span>
				  	<p style="margin-top:8px;">{{intro}}</p>
				  	<p style="margin-top:8px;color:#ccc;font-size:12px;"><span style="color:#ccc;">通过率</span>&nbsp;<span style="color: #3399FF;">{{passRate}}%</span></p>
				  </div>
			</div>
            <div class="applyDetail">
                <div>
                    <span>额度(元)</span>
                    <span>{{description}}</span>
                </div>
                <div>
                    <span>借款期限</span>
                    <span>{{timeLimit}}</span>
                </div>
                <div>
                    <span>日费率</span>
                    <span style="color: #00a2ff;">{{dailyRate}}%</span>
                </div>
            </div>
            <section class="borderbt8"></section>
            <section>
                <section class="ji_detailsTiL">
                    <span>下款攻略</span>
                </section>
                <ul class="ul_daklist">
                </ul>
            </section>
            <section class="borderbt8"></section> 
            <section>
                <section class="ji_detailsTiL">
                    <span>申请条件</span>
                </section>
                <section class="shen_a clearfix">
                    <span><a href="javascript:void(0);">快借1000</a></span>
                    <span><a href="javascript:void(0);">超低利率</a></span>
                    <span><a href="javascript:void(0);">高通过率</a></span>
                    <span><a href="javascript:void(0);">最新平台</a></span>
                    <span><a href="javascript:void(0);">秒放款</a></span>
                </section>
            </section>
            <section>
                <section class="ji_detailsTiL">
                    <span>所需材料</span>
                </section>
                <section class="shen_a clearfix">
                    <span style="width:32%;"><a href="javascript:void(0);" >身份证认证</a></span>
                    <span><a href="javascript:void(0);">手机认证</a></span>
                </section>
            </section>
          <section style="text-align:right;margin-top:-35px;">
              <img src="../assets/img/shen_img.png" style="width: 75px;">
          </section>
          <p class="num">
            申请人数<label style="color:#00a2ff;">{{num}}</label><label>人</label>
            </p>
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
                        <div class="layui-form-item">
                            <input type="password" name="phone" v-model="password"  lay-verify="required" placeholder="登录密码" class="layui-input">
                        </div>
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
	export default {
		data() {
			return {
				popupVisible: false,
				name:'',
				phone:'',
                password: '',
                share: '',
			}
		},
        computed: {
            bgUrl() {
                return this.$route.query.url;
            },
            proName() {
                return this.$route.query.name;
            },
            num() {
                return this.$route.query.num;
            },
            link() {
                return this.$route.query.link;
            },
            description() {
                return this.$route.query.description;
            },
            id() {
                return this.$route.query.id;
            },
            timeLimit() {
                return this.$route.query.timeLimit;
            },
            passRate() {
                return this.$route.query.passRate;
            },
            intro() {
                return this.$route.query.intro;
            },
            dailyRate() {
                return this.$route.query.dailyRate;
            }
        },
		methods: {
			closeModel() {
				window.history.back();
			},
			join() {
                let uApi = '/api/product/incr/' + this.id;
                this.$http.post(uApi).then((res) => {
                    if(res.data.code == 200) {
                        window.location.href= this.link;
                    } else {
                        this.popupVisible = true;
                    }
                }).catch( err => {
                    console.log(err)
                })
				
			},
            startApply() {
                var _this =this;
                if(_this.name == '') {
                    _this.$toast('请输入姓名');
                    return;
                }
                if(!(/^1[34578]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                if(_this.password == '') {
                    _this.$toast('请输入密码');
                    return;
                }
                 let param = {
                    phone: _this.phone,
                    password: _this.password,
                    name: _this.name,
                    shareCode: _this.share
                }
                //param.append("shareCode",  sessionStorage.getItem('share'));
                _this.$http.post('/api/auth/registLogin', param).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        this.popupVisible = false;
                        _this.$toast(r.message)
                        localStorage.setItem('token',r.data);
                        window.location.href= this.link;
                    } else {
                        _this.$toast(r.message);
                    }
                }).catch( res => {

                })

            }
		},
		created() {
            console.log(this.$route)
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
    background-color: #fff;
    transition: all .3s linear;
    overflow-y: scroll;
	}
    .applyDetail{
        display: flex;
        padding: 15px 0;
    }
    .applyDetail >div{
        width: 33.3%;
    }
    .applyDetail >div > span{
        display: block;
        text-align: center;
        font-size: 14px;
        color: #999999;
    }
    .applyDetail >div > span:nth-of-type(2){
        display: block;
        text-align: center;
        font-size: 16px;
        color: #2e2e2e;
        margin-top: 8px;
        font-weight: 600;
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
        background: #00a2ff;
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
        color: #fff;
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
    	height:40px;
    	color:#ffffff;
    	line-height:40px;
    	text-align: center;
    	font-size: 16px;
        background: #039ef7;
        margin: 0 auto;
        border-radius: 20px;
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
        height: 8px;
        background: #f7f7f7;
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