<template>
    <div class="outer">
        <h4>用户注册</h4>
        <div class="user-phone">
            <input type="text" placeholder="请输入姓名" v-model="name"/>
        </div>
        <div class="user-phone">
            <input type="number" name="tel" placeholder="请输入手机号" v-model="phone"/>
        </div>
        <div class="user-phone">
            <input type="text" placeholder="请输入密码" v-model="password"/>
        </div>
        <button :class="[password == '' ? 'read-only button' : 'submit button']" @click="submit()">注册</button>
        <div class="type">
            <span @click="$router.replace('/passlogin')">账号密码登陆>></span>
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
                if(!(/^1[34578]\d{9}$/.test(_this.phone))) {
                    _this.$toast('手机号格式不正确');
                    _this.phone = '';
                    return;
                }
                if(_this.password.replace(/^\s*$/g, "") == '') {
                    _this.$$toast('请填写密码');
                    return;
                }

                let param = new URLSearchParams();
                param.append("name", _this.name);
                param.append("phone",  _this.phone);
                param.append("password", _this.password);
                param.append("shareCode",  sessionStorage.getItem('share') || '');
                _this.$http.post('/api/user/registLogin', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$toast('注册成功啦');
                        _this.$router.replace('/index');
                    }
                })
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
    h4 {
        font-size: 0.54rem;
        font-family:PingFangSC-Regular;
        color:rgba(60,60,60,1);
        line-height: 0.6rem;
        margin: 2.3rem 0 0 0.5rem;
    }
    .user-phone {
        width: 6rem;
        height: 0.9rem;
        margin: 0.5rem auto 0;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .user-phone input {
        width: 100%;
        border: 0;
        height: 0.9rem;
        line-height: normal;
        font-size: 0.3rem;
        color: #3c3c3c;
        float: left;
        outline: none;
    }

    .code {
        width: 6rem;
        height: 0.9rem;
        margin: 0.5rem auto 0;
        overflow: hidden;
        border-bottom: 1px solid #ddd;
    }
    .code input {
        float: left;
        width: 4rem;
        height: 0.9rem;
        line-height: normal;
        color: #3c3c3c;
        font-size: 0.3rem;
        border: 0;
        outline: none;
    }
    .code span {
        float: left;
        width: 2rem;
        line-height: 0.9rem;
        font-size: 0.3rem;
        color: #59cac2;
        text-align: center;
    }

    .button {
        width: 6rem;
        height: 0.88rem;
        border-radius: 1rem;
        outline: none;
        font-size: 0.32rem;
        color: #fff;
        line-height: normal;
        text-align: center;
        margin: 0.5rem auto 0;
        display: block;
        border: 0;
    }
    .read-only {
        background: #f6f6f6;
    }
    .submit {
        background: #59cac2;
    }
    .type {
        position: absolute;
        bottom: 0.3rem;
        width: 100%;
        overflow: hidden;
    }
    .type span {
        float: right;
        margin-right: 0.36rem;
        font-size: 0.28rem;
        color: #59cac2;
        line-height: 0.4rem;
    }

    .warning {
        text-align: center;
        margin-top: 0.4rem;
        font-size: 0.3rem;
    }
    .warning span {
        color: #59cac2;
    }
    .dialog {
        width: 6rem;
        height: 8rem;
        border-radius: 0.1rem;
    }
    .dialog .content {
        width: 5.48rem;
        height: 7.2rem;
        margin: 0.4rem auto 0;
        overflow-y: scroll;
    }
    .dialog .content p {
        font-size: 0.28rem;
        line-height: 0.4rem;
    }
</style>