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
			<!-- 新密码   -->
			<div class="register">
				<div>
					<div class="el-select phone_input width70">
						<input class="el-input__inner" v-validate="'required|password'" v-model="user.password" type="password" name="password" placeholder="请设置密码">
					</div>
				</div>

				<span v-show="errors.has('password')" class="mobile_err">{{ errors.first('password')}}</span>
			</div>
			<!-- 确认密码 -->
			<div class="register">
				<div>
					<div class="el-select phone_input width70">
						<input class="el-input__inner" v-validate="'required|password'" v-model="user.confirmPassword" type="password" name="confirmPassword" placeholder="请确认新密码">
					</div>
				</div>
				<span v-show="errors.has('confirmPassword')" class="mobile_err">{{ errors.first('confirmPassword')}}</span>
			</div>
			<!-- 规则 -->
			<div class="form-group" style="margin-bottom:5px;">
				<div class="checkbox">
					<label>
						<input type="checkbox" v-model="user.useStatute"  class="">
						已阅读并同意<a href="javascript:;">《大影家使用规则》</a>
					</label>
				</div>
			</div>
			<!-- 详细规则 -->
			<div class="rule_text">
				<p>
					<input type="checkbox" v-model="text_ok" class="">
					感谢您对佳能的关注，为提升佳能的用户体验，佳能现推出全新的统一注册登录服务。
					授权之后, 您在当前网站注册的账户和密码可以同时登录佳能（中国）有限公司的其他相关服务平台，
					目前包括佳能俱乐部官方网站、佳画廊官方网站、大影家官方网站。
				</p>
			</div>
			<!-- 点击下一步 -->
			<div class="verifyCode">
				
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
	import {checkVerifyCode, getRegisterStepTwo} from '@/api/startApi'
	import Bus from '@/utils/bus'
	export default {
		data() {
			return {
				countrylist: [],
				user: {useStatute: false},
				passwordText: "两次输入的密码不一致",
				text_ok: false,
				route_params: null, //上个界面传递过来的参数
			}
		},
		created() {
			//console.log(this.countryList)
			this.route_params = this.$route.params;
		},
		computed: {
			...mapState([
				'initLinkDownload',
				'uuid',
			])
		},
		methods: {
			//验证密码是否一致
			checkPassword() {
				if(this.user.password != this.user.confirmPassword) {
					this.$message.error(this.passwordText);
					return false;
				}
				return true;
			},
			// 点击下一步按钮的操作
			next_register() {
				if(!this.checkPassword()) return ;
				this.$validator.validateAll().then((result) => {
					if(result) {//验证完成
						if(!this.user.useStatute || !this.text_ok) return ;
						let params = {
							...this.user,
							...this.route_params,
							uuid: this.uuid,
						};
						params.useStatute = 1 ;
						getRegisterStepTwo(params).then( res => {
							res = Object.assign(res, {
								mobilephone: this.route_params.mobilephone,
								countryCd: this.route_params.countryCd,
							})
							this.setLoginData(res);
							this.$router.push({name: 'home.start.sns',
								params: {
									...this.route_params,
								}
							});
						}).catch( err => {
							this.$message.error(err.errorMsg);
						})
					}
				})
			},
			...mapActions([
				'setLoginData',
			]),
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
		    position: relative;
		    &::after{
		    	position: absolute;
		    	content:"";
		    	display: block;
		    	height: 100%;
		    	width: 50%;
		    	left: 0;
		    	top: 0;
		    	background-color: #6dbbe8;
		    }
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
			span:nth-of-type(3){
			    background: url('./../../assets/img/icon-finish.png') no-repeat center;
			}
		}
	}
	.phone_input{
		> input{
			height:36px;
			font-size: 14px;
		}
	}
	.width70{
		width: 100%;
	}
	.register{
		margin-top: 20px;

	}
	.register,,.verifyCode{
		width: 80%;
	}
	.verifyCode{
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
	.form-group{
		min-height: 27px;
		padding-top: 7px;
		font-size: 14px;
		position: relative;
		label{
			min-height: 20px;
		    padding-left: 20px;
		    margin-bottom: 0;
		    font-weight: normal;
		    cursor: pointer;
		    input{
	    	    margin: 4px 0 0;
	    	    position: absolute;
    			margin-left: -20px;
		    }
		    a{
		    	color: #337ab7;
		    }
		}
	}
	.rule_text{
		width: 80%;
		position: relative;
		p{
			position:absolute;
			background-color: #f2dedf;
		    padding: 5px 10px 10px 10px;
		    color: #a2283f;
		    font-size: 12px;
		    text-align: justify;
		    border-radius: 5px;
		}
		
	}
	.mobile_err{
	    font-size: 14px;
    	line-height: 20px;
    	color: red;
    	margin-top: 3px;
    	display: inline-block;
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
			padding-right: 15px !important;
		}
		
	}
</style>