<template>
	<div class="oa_login">
		<div class='login_form'>
			<h2>用户登录</h2>
			<div class="loginInfo" @keyup.enter="login()">
				<el-input placeholder="用户名" :maxlength='16' v-model="username" style="width:320px;margin: 20px 0 15px 0;" class="inputs"></el-input><br />
				<el-input placeholder="密码" :maxlength='16' v-model="password" type="password" style="width:320px;" class="inputs"></el-input>
				<!--<p>
					<i class="remeberMe" v-bind:class="{remPwActive:inputSign.rememberPwSign}" @click="remPw(inputSign.rememberPwSign)"></i>记住密码
				</p>-->
				<button :disabled="disabled" :class="[disabled==false ? 'login-btn' : 'is-disabled']" @click="login()">登 录</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'oa_login',
		data() {
			return {
                username: '',
                password: '',
                disabled: false,
			}
		},
		created(){
			
		},
		methods: {
			login() {
                let _this = this;
                let param = {
                	username: _this.username,
                	password: _this.password,
                }
                _this.$http.post('/api/auth/login', param).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                    	localStorage.setItem('token',r.data);
                    	_this.$message({
                    		message:r.message,
                    		type: 'success'
                    	});
                        _this.$router.push({name: 'home'});
                    } else {
						_this.$message(r.message);
					}
                })
            }
		}
	}
</script>


<style scoped>
	.login-btn {
		width: 87%;
		height: 40px;
		background: #59cac2;
		border-radius: 6px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
        margin-top: 40px;
	}
    .is-disabled {
        width: 87%;
		height: 40px;
		background: #d8d8d8;
		border-radius: 6px;
		color: #fff;
		font-size: 16px;
		cursor: pointer;
        margin-top: 40px;
    }
	
	.remeberMe {
		display: inline-block;
		font-size: 12px;
		width: 14px;
		height: 14px;
		border: 1px solid #898989;
		border-radius: 3px;
		margin: 0 10px 0 25px;
		cursor: pointer;
	}
	
	.remPwActive {
		background: #19b282;
	}
	
	.oa_login {
		height: 100%;
		display: -webkit-box;
		-webkit-box-align: center;
		-webkit-box-pack: center;
		background: #f8f8f8;
	}
	
	.oa_login .login_form {
		width: 370px;
		height: 270px;
		background: #fff;
		text-align: center;
	}
	
	.oa_login .login_form p {
		overflow: hidden;
		height: 36px;
		display: flex;
		font-size: 14px;
		margin: 5px 0 10px;
		align-items: center;
	}
	
	.oa_login .login_form h2 {
		background: #f8f8f8;
		font-weight: 100;
		color: #333;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		border: 1px solid #ddd;
		border-bottom: none;
	}
	
	.oa_login .login_form .loginInfo {
		border: 1px solid #ddd;
		height: 228px;
	}
	
	input:-webkit-autofill {
		-webkit-box-shadow: 0 0 0 1000px white inset !important;
	}
</style>