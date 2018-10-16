<template>
	<div class="app_start_login">
		 <!-- 手机 -->
		<div class="form-group">
			<!-- 手机号  区号 -->
			<div>
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
						<input class="el-input__inner" v-validate="'required|mobile'" v-model="user.mobilephone" type="text" id="email" name="" placeholder="手机号">
					</div>
				</div>
				<span v-show="errors.has('mobile')" class="mobile_err">{{ errors.first('mobile')}}</span>
			</div>
			<!-- 密码 -->
			<div class="el-select phone_input password_box">
				<input class="el-input__inner " type="password" name="" placeholder="密码" v-model="user.password" v-validate="'required|password'">
				<div class="mgt10">
					<span v-show="errors.has('password')" class="password_err ">{{ errors.first('password')}}</span>
				</div>
			</div>
			<!-- 图形验证码 -->
			<div class="imgVerifyBox">
				<div class="el-select phone_input imgVerify">
					<input class="el-input__inner" type="text" maxlength="4" v-validate="'required|imageVerify'" placeholder="图形码" name="imageVerify" v-model="user.imageVerify">
				</div>
				<div class="el-select bg-image-code">
					<img :src="imageCode" @click="refreshImgCode">
					<!-- <div class="" v-lazy:background-image="imageCode" @click="refreshImgCode"></div> -->
				</div>
				<div>
					<span v-show="errors.has('imageVerify')" class="mobile_err">{{ errors.first('imageVerify')}}</span>
				</div>
			</div>
			
			<!-- 忘记密码 -->
			<div class="forget_password">
				<span>忘记密码?</span>
				<span>密码规则变更通知</span>
			</div>
			<!-- 登录按钮 -->
			<div class="btn_submit_contain">
				 <el-button class="btn_submit" @click="login()">登录</el-button>
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import {getDarwinCountry, getLogin} from '@api/startApi'
	import {getImageVerifyCode, getEncodePhone} from '@api/commonApi'
	import {makeRandomId, baseImage} from '@/utils/index'
	import {isSafair} from '@/utils/common'
	import {getSsoLogin, getSsoVerifyTicket, getRedirectUrl, getSsoVisit} from '@api/ssoApi'
	import md5 from 'js-md5'
	import {mapActions, mapState} from 'vuex'

	export default {
		data() {
			return {
				user: {countryCd: 86},
				countryList:[],
				imageCode:'',
			}
		},
		computed:{
			...mapState([
				'loginData',
			])
		},
		created() {
			this.setSessionId();
			this.initCountry();
			this.initImageVerifyCode();
			this.initSsoVisit();
		},
		methods:{
			initCountry() {
				getDarwinCountry().then((data) => {
					this.countryList = data.countryList;
					this.setCountrylist(data.countryList);
				}).catch((err) => {
					console.log(err);
				})
			},
			initImageVerifyCode() {
				getImageVerifyCode({state:'login'}).then((data) => {
					this.imageCode = baseImage(data.imageVerifyCode)
				}).catch((err) => {
					console.log(err);
				})
			},
			setSessionId() {
				let str = makeRandomId(32);
				this.$cookies.set('sessionId',str);
			},
			refreshImgCode() {
				this.initImageVerifyCode();
			},
			initSsoVisit() {
				getSsoVisit('login_')
			},
			login() {
				this.$validator.validateAll().then((result) => {
					if(result) { //校验通过
						getEncodePhone({
							mobilephone:this.user.mobilephone,
							countryCd:this.user.countryCd
						}).then((data) => {
							let phone = data.key;
							return phone;
						}).then((phone) =>{
							let params = {
								state: 'auth',
								account: phone,
								country_code: this.user.countryCd,
								password: md5(this.user.password),
								verify_code: this.user.imageVerify,
							}
							return getSsoLogin(params).then((data) => {
								if(data.code == '1') {//登录成功
									return data;
								} else {
									if(data.code == '30012'){//验证码过期
										
									} else if(data.code == '20002' ) {//密码错误
										
									} else if(data.code == '20001' ) {//账号不存在
										setTimeout(() => { this.$router.push({name: 'start.regist'})} ,100)
									}
									this.refreshImgCode();
									this.$message.error(data.message);
									return 'cancel promise'
								}
							})
						}).then((data) => {//调用验证ticket接口
							if(data == 'cancel promise') throw new Error('cancel promise');
							let params = {
								ticket: data.ticket,
								state: 'login_',
							}
							return getSsoVerifyTicket(params).then((data) => {
								console.log(data)

								if(data.code == '1' && data.authorized != '0') {//同步后台
									return data
								}
								return 'cancel promise' 
							})
						}).then((previousData) => {//同步后台
							if(previousData == 'cancel promise') throw new Error('cancel promise');
							let params = {
								countryCd: this.user.countryCd,
								mobilephone: this.user.mobilephone,
								stateType: '',
								password: this.user.password,
							};
							getLogin(params).then((data) => {
								this.setLoginData(data);
								return previousData;
							}).then((previousData) => {
								if( isSafair() ) { //是否safari
									getRedirectUrl(previousData.ticket);
								} else {
									this.$message({message: '登录成功', type: 'success'});
									this.$router.push({name: 'home'})
								}
							}).catch((err) => {
								console.log(err);
							});
						}).catch((err) => {
							console.log(err);
						})
					} else {
						console.log(this.$validator.events)
					}
				})
			},
			...mapActions([
				'setLoginData',
				'setCountrylist',
			])
		}
	}
</script>
<style scoped lang="scss">
	.app_start_login{
		color:red;
	    float: left;
		max-height:210px;
		overflow-y: auto;
		width: 460px;
		padding:20px 20px 20px 40px;
		text-align:left;
	    background-color: #fff;
	}
	.country{
		width:30%;
	}
	.form-group{
		margin-right: 140px;
	}
	.phone_input{
		> input{
			height:36px;
			font-size: 14px;
		}
	}
	.mobile_err{
	    font-size: 14px;
    	letter-spacing: 1px;
    	line-height: 30px;
	}
	.password_err{
		font-size: 14px;
    	letter-spacing: 1px;
    	line-height: 20px;
	}
	.imgVerifyBox{
		margin-top: 10px;
		.imgVerify{
			width: 30%;
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
	.width70{
		width: 70%;
		float: right;
	}
	.password_box{
		margin-top: 10px;
		width: 100%;
	}
	.mgt10{
		margin-top: 5px;
	}
	.forget_password{
	    color: #a7a7a7;
	    text-align: left;
	    position: relative;
	   	span{
	   		cursor: pointer;
	   		padding: 5px 0;
	   		font-size: 14px;
	   	}
	   	span:nth-of-type(2){
	   		color: red;
    		text-decoration: underline;
    		cursor: pointer;
	   	}
	   	span:nth-of-type(1){
	   		position: absolute;
	   		right: 0;
	   		top: 50%;
	   		transform: translateY(-50%);
    		
	   	}
	   	
	}
	.btn_submit{
		color: #ffffff;
		width: 100%;
    	background-color: #b10a14;
    	border-color: #990911;
    	&:hover{
		    color: #ffffff;
    		background-color: #81070f;
    		border-color: #5f050b;
    	}
	}
	.btn_submit_contain{
		margin-top: 10px;
	}
	.bg-image-code{
		width: 64%;
		height: 36px;
		margin-left: 10px;
		vertical-align: top;
		> div{
			width: 100%;
	    	background-size: cover;
    		background-position: center;
		    height: 100%;
		    background-repeat: no-repeat;
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