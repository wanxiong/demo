<template>
    <div class="outer">
        <div class="top">
            <span>{{name}}</span>
        </div>
        
        <div class="handle">
            <div v-for="item in list" @click="toLink(item)">
                <i class="iconfont" v-html="item.icon"></i>
                <p>{{item.name}}</p>
            </div>
            <!--<a href="tel:0571-87609063">
                <div style="margin-left:0.19rem;">
                    <i class="iconfont">&#xe687;</i>
                    <p>客服热线</p>
                </div>
            </a>-->
        </div>
        <p class="tel" v-if="phone != ''">联系方式：{{phone}}</p>
        <bottom></bottom>
    </div>
</template>

<script>
    import bottom from '../components/bottom';
    export default {
        name: 'mine',
        data() {
            return {
                list: [
                    {icon: '&#xe62f;', name: '申请记录', code: '1', path: '/applyfor'},
                    {icon: '&#xe68a;', name: '分享链接', code: '2', path: '/promotion'},
                    {icon: '&#xe611;', name: '个人信息', code: '3', path: '/mineinfo'},
                    {icon: '&#xeab6;', name: '我的下线', code: '4', path: '/wodexiaxian'},
                    // {icon: '&#xe615;', name: '我的佣金', code: '5', path: ''},
                    {icon: '&#xe687;', name: '客服热线', code: '6', path: ''},
                ],
                name: '',
                phone: '',
            }
        },
        components: {
			bottom,
		},
        mounted() {
            this.getInfo();
        },
        methods: {
            getInfo() {
                let _this = this;
                _this.$http.get('/api/website/get').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.name = r.data.webName;
                        _this.phone = r.data.serviceTel;
                    }
                    if(r.code == 403) {
                        _this.$router.push('/passlogin')
                    }
                })
            },
            toLink(item) {
                let _this = this;
                if(item.path == '' && item.code == '5') {
                    _this.$toast('敬请期待');
                    return;
                }
                if(item.path == '' && item.code == '6') {
                    _this.$toast('客服正忙，请稍后再试')
                }
                _this.$router.push(item.path);
            }   
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
    .top {
        width: 100%;
        background: url(https://img.hzanchu.com/acimg/1444d4339ef6d88e0e41a9b6957fb846.png?x-oss-process=image/resize,l_700) no-repeat;
        background-size: 100%;
        height: 3rem;
        overflow: hidden;
    }
    .top span {
        display: block;
        font-size: 0.36rem;
        color: #fff;
        line-height: 0.46rem;
        text-align: center;
        margin-top: 2rem;
    }
    .handle {
        overflow: hidden;
        padding: 0 0.26rem 1rem;
    }
    .handle div {
        float: left;
        width: 2.2rem;
        text-align: center;
        height: 1.6rem;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.08);
        margin: 0.2rem 0 0 0.19rem;
    }
    .handle div:nth-of-type(1) {
        margin-left: 0;
    }
    .handle div:nth-of-type(4) {
        margin-left: 0;
    }
    .handle div i {
        font-size: 0.6rem;
        color: #00B996;
        display: block;
        margin-top: 0.3rem;
    }
    .handle div p {
        font-size: 0.28rem;
        line-height: 0.38rem;
        color: #3c3c3c;
        margin-top: 0.2rem;
    }
    .tel {
        position: fixed;
        bottom: 1.3rem;
        font-size: 0.26rem;
        color: #656565;
        width: 100%;
        text-align: center;
        line-height: 0.38rem;
    }
</style>
