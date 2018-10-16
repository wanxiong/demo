<template>
	<div class="app_start_register">
		<div class="progressBar progress_1">
			<div class="icon-bar">
				<span class="default_border"></span>
				<span class="default_radius"></span>
				<span class="default_radius"></span>
				<span class="default_radius"></span>
				<span></span>
				<span></span>
			</div>
			<div class="start-txt-bar">
				<ul>
					<li class="verify">验证手机号</li>
					<li class="setup" >设置密码</li>
					<li class="finish">完成</li>
				</ul>
			</div>
		</div>
		<!--  -->
		<div>
			<!-- 手机号  区号 -->
			<div class="register">
				<div>
					<el-select class="country" v-model="user.countryCd" filterable placeholder="请选择" >
						<el-option
						v-for="item in countryList"
						:key="item.countryName"
						:label="item.countryCd"
						:value="item.countryName">
							<span style="float: left">{{ item.countryCd }}</span>
      						<span style="float: right; color: #8492a6; font-size: 13px">{{ item.countryName }}</span>
						</el-option>
					</el-select>
					<div class="el-select phone_input width70">
						<input class="el-input__inner" v-validate="'required|mobile'" v-model="user.mobilephone" type="text" id="email" name="mobile" placeholder="手机号">
					</div>
				</div>
				<span v-show="errors.has('mobile')" class="mobile_err">{{ errors.first('mobile')}}</span>
			</div>
			<!-- 图形验证码 -->
			<div class="imgVerifyBox">
				<div class="el-select phone_input imgVerify">
					<input class="el-input__inner" type="text" maxlength="4" v-validate="'required|imageVerify'" placeholder="请输入图形校验码" name="imageVerify" v-model="user.imageVerifyCode">
				</div>
				<div @click="refreshImgCode()" class="el-select bg-image-code" :style="{background:'#fff url('+ imageCode +') no-repeat center'}">
					<!-- <img :src="imageCode" @click="refreshImgCode"> -->
					<!-- <div class="" v-lazy:background-image="imageCode" @click="refreshImgCode"></div> -->
				</div>
				<div>
					<span v-show="errors.has('imageVerify')" class="mobile_err">{{ errors.first('imageVerify')}}</span>
				</div>
			</div>
			<!-- 短信验证码 -->
			<div class="verifyCode">
				<div class="el-select phone_input imgVerify">
					<input class="el-input__inner" type="text" maxlength="6" v-validate="'required|verifyCode'" placeholder="请输入图形校验码" name="verifyCode" v-model="user.verifyCode">
				</div>
				<div class="el-select verify_btn" >
					<button @click="verifyCode()" type="button" >{{verifyCodeMsg}}</button>
				</div>
				<div>
					<span v-show="errors.has('verifyCode')" class="mobile_err">{{ errors.first('verifyCode')}}</span>
				</div>
				<!-- 点击下一步 -->
				<div class="register_next">
					<button @click="next_register">下一步</button>
				</div>
			</div>
		</div>

	</div>

</template>

<script type="text/javascript">
	import {mapActions, mapState} from 'vuex'
	import {getImageVerifyCode, getEncodePhone, getVerifyCode} from '@api/commonApi'
	import {makeRandomId, baseImage, getValidateCode} from '@/utils/index'
	import {checkVerifyCode} from '@/api/startApi'
	import Bus from '@/utils/bus'
	export default {
		data() {
			return {
				countrylist: [],
				user: {countryCd: "86"},
				imageCode:'',
				countDownTime: 60,
				defaultVerifyCodeMsg: "获取验证码",
				verifyCodeMsg: "获取验证码",
				countDwonVerifyCodeMsg:"重新发送验证码",
				verifyCodeFlg:true,
				inter:null, //定时器
			}
		},
		created() {
			//console.log(this.countryList)
			this.initImageVerifyCode();
		},
		computed: {
			...mapState([
				'countryList',
				'initLinkDownload',
				'uuid',
			])
		},
		methods: {
			refreshImgCode() {
				this.initImageVerifyCode();
			},
			initImageVerifyCode() {
				getImageVerifyCode({state:'login'}).then((data) => {
					this.imageCode = baseImage(data.imageVerifyCode)
				}).catch((err) => {
					console.log(err);
				})
			},
			/*倒计时
			*@params { Boolean clearInter} 是否情况定时器
			*/
			countDown(clearInter = false) {
				if(clearInter) {
					window.clearInterval(this.inter);
					this.inter = null;
					this.verifyCodeMsg = this.defaultVerifyCodeMsg;
					this.verifyCodeFlg = true;
					return false ;
				}
				this.inter = window.setInterval(() => {
					console.log(this)
					let t = this.countDownTime--;
					if(t <= 0) {
						window.clearInterval(this.inter);
						this.inter = null;
						this.verifyCodeMsg = this.defaultVerifyCodeMsg;
						this.verifyCodeFlg = true;
					} else {
						this.verifyCodeMsg = this.countDwonVerifyCodeMsg + ' ' + t;
					}
				}, 1000)

				
			},
			//账号存在显示的弹出层
			dialogSucRegister() {
				Bus.$emit('openHasPhone');
			},
			verifyCode() {
				// 请求类别 1：注册或更换手机号
				let requestType = '1';
				let uuid = this.uuid;
				let validateCode = getValidateCode('sms_validate_code',this.initLinkDownload.configList);
				let params = {
					...this.user,
					requestType,
					validateCode,
				};
				this.$validator.validate('mobile').then((result) => {//手机号验证
					console.log(result)
					if(!result) return Promise.reject('err');
				}).then((result) => {//图形验证码
					return this.$validator.validate('imageVerify').then((result) => {
						return result;
					})
				}).then((result) => {
					if(!result) return; //验证不通过
					if(!this.verifyCodeFlg) return; //60s不准重复发送
					getVerifyCode(params).then((res) => {
						this.$message({message: '验证码发送成功', type: 'success'});
						this.verifyCodeFlg = false;
						this.countDown()
					}).catch((err) => {
						if(err.errorType == '30004') { //"账号已存在"
							this.dialogSucRegister();
							//this.$router.push({name: 'start.login'})
						} else if(err.errorType == '30012' || err.errorType == '30013') { 
							//验证码过期   验证码无效  重置验证码
							this.$message({message: err.errorMsg, type: 'error'});
							this.initImageVerifyCode();
						} else if (err.errorType == '30018' || err.errorType == '30019') {
							//用户未授权且只有一组密码  用户未授权且有多组密码  半用户
						} else {
							this.initImageVerifyCode();
						}
					});
				}).catch((result) => {
					console.log(result)
				})
			},
			// 点击下一步按钮的操作
			next_register() {
				this.$validator.validateAll().then((result) => {
					if(result) {//验证完成
						// 请求类别 1：注册或更换手机号
						let requestType = '1';
						let validateCode = getValidateCode('sms_validate_code',this.initLinkDownload.configList);
						let params = {
							...this.user,
							requestType,
							validateCode,
							uuid: this.uuid,
						};
						checkVerifyCode(params).then((res) => {
							//注册下一步
							this.countDown(true);
							this.$router.push({name: 'start.register_step', 
								params:{
									mobilephone: this.user.mobilephone,
									countryCd: this.user.countryCd,
									verifyCode: this.user.verifyCode,
								}
							});
						}).catch((err) => {
							this.initImageVerifyCode();
							this.countDown(true);
							
						})
					}
				})
			},
		}
	}
</script>

<style  scoped lang="scss">
	.app_start_register{
	    float: left;
		max-height:200px;
		overflow-y: auto;
		width: 460px;
		padding:30px 40px 20px 40px;
		text-align:left;
	    background-color: #fff;
	}
	.icon-bar{
		position: relative;
		.default_border{
		    height: 5px;
		    border-radius: 32px;
		    background: #cacaca;
		    width: 100%;
		    display: block;
		}
		.default_radius{
			background: #cacaca;
			width:32px;
			height:32px;
			display:inline-block;
			border-radius:50%;
		}
		span:nth-of-type(2){
		    position: absolute;
		    border-radius: 50%;
		    top: 50%;
		    transform: translateY(-50%);
		    z-index: 99;
		}
		span:nth-of-type(3){
		    position: absolute;
		    border-radius: 50%;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%, -50%);
		    z-index: 99;
		}
		span:nth-of-type(4){
		    position: absolute;
		    border-radius: 50%;
		    top: 50%;
		    transform: translateY(-50%);
		    right:0;
		    z-index: 99;
		}
	}
	.start-txt-bar{
		height:40px;
		ul {
			display: flex;
			color: #898989;
		    position: relative;
		    top: 25px;
			li {
				flex: 1;
				text-align: center;
			}
			li:nth-of-type(1){
				text-align: left;
			}
			li:nth-of-type(3){
				text-align: right;
			}
		}
	}
	.progress_1{
		ul {
			li:nth-of-type(1){
				color: #569bc5;
			}
		}
		.icon-bar{
			span:nth-of-type(2){
			    background: url('./../../assets/img/icon-finish.png') no-repeat center;
			}
		}
	}
	.country{
		width:30%;
	}
	.phone_input{
		> input{
			height:36px;
			font-size: 14px;
		}
	}
	.width70{
		width: 70%;
		float: right;
	}
	.register{
		margin-top: 20px;

	}
	.register,.imgVerifyBox,.verifyCode{
		width: 80%;
	}
	.imgVerifyBox,.verifyCode{
		position: relative;
		margin-top: 10px;
		.imgVerify{
			width: 48%;
			input{
				padding-right: 15px;
			}
		}
		&:nth-of-type(2){
			img{
				height: 36px;
				margin-left: 5px;
				vertical-align: middle;
			}	
		}
	}
	.bg-image-code{
		width: 43%;
		height: 36px;
		margin-left: 24px;
		vertical-align: top;
		> div{
			width: 100%;
	    	background-size: cover;
    		background-position: center;
		    height: 100%;
		    background-repeat: no-repeat;
		}
	}
	.verify_btn{
		width: 43%;
		button{
			border-radius: 5px;
		    background: -webkit-gradient(linear, 0% 0%, 0% 100%, from(#ffffff), to(rgba(115, 115, 115, 0.3)));
    		color: #636363;
		    display: block;
    		width: 100%;
		    outline: none;
		    color: #333333;
    		background-color: #ffffff;
    		border-color: #cccccc;
    		display: inline-block;
		    margin-bottom: 0;
		    font-weight: normal;
		    text-align: center;
		    vertical-align: middle;
		    touch-action: manipulation;
		    cursor: pointer;
		    background-image: none;
		    border: 1px solid #d2d2d2;
		    white-space: nowrap;
		    padding: 6px 12px;
		    font-size: 14px;
		    height: 36px;
		    border-radius: 4px;
		    user-select: none;
		    margin-left: 24px;
		    &:hover{
		    	color: #333333;
    			background-color: #e6e6e6;
    			border-color: #adadad;
		    }
		}
	}
	.mobile_err{
	    font-size: 14px;
    	letter-spacing: 1px;
    	line-height: 30px;
    	color: red;
	}
	.register_next{
		position: absolute;
		top: 50%;
		right: -20px;
		transform: translate(100%, -50%);
		> button{
		    color: #ffffff;
    		background-color: #b10a14;
    		border-color: #990911;
		    display: inline-block;
		    margin-bottom: 0;
		    font-weight: normal;
		    text-align: center;
		    vertical-align: middle;
		    touch-action: manipulation;
		    cursor: pointer;
		    background-image: none;
		    border: 1px solid transparent;
		    white-space: nowrap;
		    padding: 6px 12px;
		    font-size: 14px;
		    line-height: 1.42857143;
		    border-radius: 4px;
		    user-select: none;
		    text-transform: none;
	        min-width: 82px;
	        &:hover{
        	    color: #ffffff;
    			background-color: #81070f;
    			border-color: #5f050b;
	        }
		}
	}
</style>
<style lang="scss">
	.country{
		width:30%;
		i{
	    	display: none !important;
		}
		.el-input__inner{
			height:36px !important;
		}
		input{
			padding-right: 20px !important;
		}
		
	}
</style>