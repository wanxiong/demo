<template>
    <div class="outer">
        <p class="top">我的下线</p>
        <div class="content" v-if="isEmpty == false">
            <div class="item" v-for="item in list">
                <p>
                    <span>{{item.name}}</span>
                    <span>{{item.phone}}</span>
                </p>
                <p>{{item.createTime}}</p>
            </div>
        </div>
        
        <div class="is-empty" v-if="isEmpty == true">您还没有邀请记录哦~</div>
    </div>
</template>

<script>
    export default {
        name: 'wodexiaxian',
        data() {
            return {
                list: [],
                isEmpty: false,
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
                _this.$http.get('/api/user/referrals').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.list = r.data.items;
                        _this.list.length == 0 ? _this.isEmpty = true : _this.isEmpty = false;
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
        min-height: 100%;
        background: #fff;
        overflow: hidden;
        position: relative;
    }
    .top {
        position: fixed;
        top: 0;
        width: 100%;
        height: 0.8rem;
        line-height: 0.8rem;
        text-align: center;
        color: #fff;
        font-size: 0.36rem;
        background: #00B996;
    }
    .content {
        margin-top: 0.9rem;
        padding: 0 0.26rem;
        padding-bottom: 1rem;
    }
    .content .item {
        border-top: 1px solid #ddd;
        height: 1.2rem;
        overflow: hidden;
    }
    .content .item p:nth-of-type(1) {
        font-size: 0.3rem;
        color: #3c3c3c;
        line-height: 0.36rem;
        margin-top: 0.12rem;
        overflow: hidden;
    }
    .content .item p:nth-of-type(1) span:nth-of-type(1) {
        float: left;
    }
    .content .item p:nth-of-type(1) span:nth-of-type(2) {
        float: right;
    }
    .content .item p:nth-of-type(2) {
        font-size: 0.28rem;
        color: #656565;
        line-height: 0.36rem;
        margin-top: 0.3rem;
    }
    .is-empty {
        font-size: 0.36rem;
        color: #3c3c3c;
        line-height: 0.42rem;
        text-align: center;
        margin-top: 4rem;
    }
</style>