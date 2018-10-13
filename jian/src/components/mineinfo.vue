<template>
    <div class="outer">
        <div class="userinfo">
            <span>姓名</span>
            <input type="text" v-model="content.name"/>
        </div>
        <div class="userinfo">
            <span>手机号</span>
            <p>{{content.phone}}</p>
        </div>
        <div class="userinfo">
            <span>支付宝</span>
            <input type="text" v-model="content.alipayAccount"/>
        </div>
        <div class="userinfo">
            <span>微信号</span>
            <input type="text" v-model="content.wechatAccount"/>
        </div>
        <div class="userinfo">
            <span>修改密码</span>
            <input type="text" v-model="content.password"/>
        </div>
        <button class="submit" @click="submit()">保存</button>
    </div>
</template>

<script>
    import qs from 'qs';
    export default {
        name: 'mineinfo',
        data() {
            return {
                content: '',
            }
        },
        beforeMount() {
            document.title = this.$route.meta.title;
        },
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                _this.$http.get('/api/user/getUserInfo').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.content = r.data;
                        console.log(_this.content, 'con')
                    }
                    if(r.code == 403) {
                        _this.$router.push('/passlogin')
                    }
                })
            },
            submit() {
                let _this = this;
                let param = new URLSearchParams();
                param.append("phone", _this.content.phone);
                param.append("name",  _this.content.name);
                param.append("alipayAccount", _this.content.alipayAccount);
                param.append("wechatAccount", _this.content.wechatAccount);
                param.append("password", _this.content.password || '');
                _this.$http.post('/api/user/update', param).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.$toast('保存成功');
                    }
                    if(r.code == 403) {
                        _this.$router.push('/passlogin')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        height: 100%;
        background: #fff;
        position: relative;
    }
    .userinfo {
        height: 1rem;
        line-height: 1rem;
        border-bottom: 1px solid #ddd;
        padding: 0 0.26rem;
        color: #3c3c3c;
        font-size: 0.3rem;
    }
    .userinfo span {
        float: left;
    }
    .userinfo p {
        float: right;
    }
    .userinfo input {
        float: right;
        height: 1rem;
        font-size: 0.28rem;
        line-height: normal;
        text-align: right;
        outline: none;
        width: 4rem;
    }
    .submit {
        position: fixed;
        width: 100%;
        height: 0.9rem;
        font-size: 0.32rem;
        outline: none;
        text-align: center;
        line-height: normal;
        color: #fff;
        background: #00B996;
        bottom: 0;
    }
</style>