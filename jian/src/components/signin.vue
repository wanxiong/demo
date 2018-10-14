<template>
    <div class="outer">
        <div>
            <p class="model_content_header">注册<i class="iconfont " @click="back">&#xe64a;</i></p>
        </div>
        <div>
            <div class="login_banner"></div>
        </div>
        <div style="margin:20px 10px; margin-bottom:15px;" class="hui-form" id="form1">
            <div class="hui-form-items">
                <div class="hui-form-items-title">姓名</div>
                <input type="text" name="name" id="name" class="hui-input hui-input-clear" placeholder="请输入姓名" autofocus="autofocus" v-model="name">
                
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">手机号</div>
                <input type="text" name="m" id="account" class="hui-input hui-input-clear" placeholder="请输入手机号码" autofocus="autofocus" v-model="phone">
                
            </div>
          <!--  <div class="hui-form-items">
                <div class="hui-form-items-title">验证码</div>
                <input type="text" class="hui-input" id="valert" name="v">
                    <img src="/register/verify" id="verifyImg" alt="刷新验证码" onclick="fleshVerify()">
            </div> -->
            <div class="hui-form-items">
                <div class="hui-form-items-title">手机验证</div>
                <input type="text" name="code" id="code" class="hui-input hui-input-clear" placeholder="请输入手机验证码" autofocus="autofocus" v-model="verifyCode">
                <input type="button" id="count" :class="verifyFlag ? 'verifyBtn' : 'verifyBtn un_verifyBtn'" style="" :value=verifyTxt
                @click="getVerifyCode">
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">密码</div>
                <input type="password" name="p" v-model="password" class="hui-input hui-pwd-eye" placeholder="请入登录密码">
            </div>
            <div class="hui-form-items">
                <div class="hui-form-items-title">确认密码</div>
                <input type="password" name="cp" v-model="confirmPassword" class="hui-input hui-pwd-eye" placeholder="请再次输入登录密码">
            </div>
            
        </div>
    
        <div style="padding:10px; padding-top:10px;">
            <input type="button" style="bakground:#EE9C4D!important;" @click="submit()" class="hui-button hui-button-large hui-primary" value="立即注册">
        </div>
         <div class="forget">
            <span @click="goLogin">已有账号？</span>
            <!-- <span @click="forgetPassword">忘记密码</span> -->
        </div>

    </div>
</template>

<script>
    export default {
        name: 'signin',
        data() {
            return {
                name: '',
                phone: '',
                password: '',
                confirmPassword:'',
                verifyCode:'',
                verifyTxt:'获取验证码',
                verifyFlag: true,
                waitTime: 60,
            }
        },
        beforeRouteLeave (to, from, next) {
            if(to.name == 'mine') {
                this.$router.replace('/index')
            }
            next();
        },
        beforeMount() {

        },
        methods: {
            submit() {
                let _this = this;
                if(_this.name.replace(/^\s*$/g, "") == '') {
                    _this.$toast('请填写姓名');
                    return;
                }
                if(!_this.phone) {
                    _this.$toast('请填写手机号');
                    return;
                }
                if(!(/^1[34578]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                if(!_this.verifyCode) {
                    _this.$toast('请填入短信验证码');
                    return;
                }
                if(_this.password.replace(/^\s*$/g, "") == '') {
                    _this.$toast('请填写密码');
                    return;
                }
                if(_this.confirmPassword.replace(/^\s*$/g, "") == '') {
                    _this.$toast('请填写确认密码');
                    return;
                }
                if(_this.confirmPassword.replace(/^\s*$/g, "") == '') {
                    _this.$toast('请填写确认密码');
                    return;
                }
                
                let param = {
                    phone: this.phone,
                    password: this.password,
                    name: this.name,
                    verifyCode: this.verifyCode,
                    shareCode:"",
                }
                //param.append("shareCode",  sessionStorage.getItem('share') || '');
                this.$http.post('/api/auth/regist', param).then((res) => {
                    let r = res.data;
                    this.$toast(r.message);
                    if(r.code == 200) {
                        localStorage.setItem('token',r.data);
                        this.$router.replace('/index');
                    }
                }).catch( res => {

                })
            },
            back() {
                window.history.back();
            },
            getVerifyCode() {
                if(!this.verifyFlag) {
                    this.$toast('请不要重复发生验证码');
                    return;
                }
                if(!this.phone) {
                    this.$toast('请填写手机号');
                    return;
                }
                if(!(/^1[34578]\d{9}$/.test(this.phone))) {
                    this.$toast('手机号格式不正确');
                    return;
                }
                let params = {
                    phone: this.phone,
                }
                this.$http.post('/api/sms/sendVerifyCode', params).then((res) => {
                    let r = res.data;
                    this.$toast(r.message);
                    if(r.code == 200) {
                        this.verifyFlag = false;
                        this.times()
                    } else {

                    }
                }).catch( res => {})
            },
            goLogin() {
                this.$router.push({name: 'login'});
            },
            //短信倒计时
            times() {
                let _this = this
                if(_this.waitTime == 0) {
                    this.verifyFlag = true;
                    //document.getElementById('sendCode').style.color = '#00B996';
                    _this.verifyTxt = '获取验证码'
                } else {
                    //document.getElementById('sendCode').style.color = '#8E8E8E';
                    _this.verifyTxt =  _this.waitTime + "s后重新获取";
                    _this.waitTime--;
                    setTimeout(function() {
                        _this.times()
                    },1000)
                }
            },
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        background: #fff;
        position: relative;
    }
    .model_content_header{
        height: 43px;
        width: 100%;
        z-index: 999;
        background: #dea167;
        font-size: 16px;
        color: #fff;
        line-height: 43px;
        margin: 0 auto;
        width: 100%;
        text-align: center;
        position: relative;
    }
    .model_content_header i{
        position: absolute;
        left: 0;
        transform: rotate(180deg);
        font-size: 22px;
        padding:0 10px; 
    }
    .login_banner{
        background: url('../assets/img/login.png') no-repeat center center/cover;
        padding-top: 40%;
    }
    .hui-form{
        background: #FFFFFF;
        font-size: 15px;
    }
    .hui-form-items{
        padding: 15px 10px;
        border-bottom: 1px solid #F3F4F5;
        position: relative;
        display: -webkit-flex;
        display: flex;
    }
    .hui-form-items-title{
        width: 25%;
        line-height: 22px;
        height: 22px;
        flex-shrink: 0;
    }
    .hui-form-items .hui-input{
        width: 100% !important;
    }
    .hui-input{
        height: 22px;
        line-height: 22px;
        color: #999;
        border: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 0;
        border: 0;
        background: #FFF;
        width: 100%;
        display: block;
        padding: 0px;
    }
    .hui-form-items:last-child {
        border: none;
    }
    .hui-primary{
        background: #EE9C4D;
        color: #FFFFFF;
        width: 100%;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border-radius: 3px;
        border: 0;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        display: block;
        font-size: 15px;
        height: 42px;
        line-height: 42px;
        outline: 0;
        overflow: hidden;
        position: relative;
        text-align: center;
        box-shadow: 0 0 1px #B8BBBF;
        padding: 0px 16px;
    }
    .forget{
        padding: 0 10px; 
        color: #999;
        font-size: 15px;
    }
    .forget > span{
        display: inline-block;
        padding: 5px 0;
    }
    .forget > span:nth-of-type(1){
        display: inline-block;
        margin-right: 15px;
    }
    .verifyBtn{
        width: 160px;
        height:25px;
        border:none;
        color:#FFF;
        background: #EE9C4D;
        padding: 7px 10px;
        border-radius: 3px;
    }
    .un_verifyBtn{
        background: #8E8E8E;
    }
</style>