<template>
    <div class="outer">
        <div>
            <p class="model_content_header">登录<i class="iconfont " @click="back">&#xe64a;</i></p>
        </div>
        <div>
            <div class="login_banner"></div>
        </div>
        <div>
            <div style="margin:20px 10px; margin-bottom:15px;" class="hui-form" id="form1">
                <div class="hui-form-items">
                    <div class="hui-form-items-title">手机号</div>
                    <input type="text" id="account" class="hui-input hui-input-clear" placeholder="请输入手机号码" autofocus="autofocus" v-model="phone">
                </div>
                <div class="hui-form-items">
                    <div class="hui-form-items-title">密码</div>
                    <input type="password" v-model="password" id="pasw1" class="hui-input hui-pwd-eye" placeholder="请输入登录密码">
                </div>
            </div>
        </div>
        <div style="padding:10px; padding-top:10px;">
            <input type="button" style="bakground:#EE9C4D!important;" @click="submit()" class="hui-button hui-button-large hui-primary" value="立即登录">
        </div>
        <div class="forget">
            <span @click="register">免费注册</span>
            <!-- <span @click="forgetPassword">忘记密码</span> -->
        </div>
    </div>
</template>

<script>
    import { getQueryString } from '@/api/load.js'
    export default {
        name: 'login',
        data() {
            return {
                phone: '',
                password: '',
                popup: false,
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
                if(!(/^1[34578]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                if(_this.password == '') {
                    _this.$$toast('请输入密码');
                    return;
                }

                let param = {
                    phone: _this.phone,
                    password: _this.password
                }
                //param.append("shareCode",  sessionStorage.getItem('share'));
                _this.$http.post('/api/auth/login', param).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        _this.$toast(r.message)
                        localStorage.setItem('token',r.data);
                        this.$router.replace('/index')
                    } else {
                        _this.$toast(r.message);
                        _this.$router.replace('/index');
                    }
                }).catch( res => {

                })
            },
            
            back() {
                window.history.back()
            },
            register() {
                this.$router.push({name: 'register'});
            },
            forgetPassword() {

            }
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        background: #F0EFF5;
        position: relative;
        font-size: 15px;
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
        width: 22%;
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
    }
    .forget > span{
        display: inline-block;
        padding: 5px 0;
    }
    .forget > span:nth-of-type(1){
        display: inline-block;
        margin-right: 15px;
    }
</style>