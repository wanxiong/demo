<template>
    <div class="outer">
        <div class="item" v-for="item in list">
            <p>{{item.productName}}</p>
            <span>{{item.createTime}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'applyfor',
        data() {
            return {
                list: [],
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
                _this.$http.get('/api/apply/list', {
                    params: {
                        page: 1,
                        size: 1000,
                    }
                }).then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.list = r.data.items;
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
        width: 94%;
        min-height: 100%;
        overflow: hidden;
        background: #fff;
        padding: 0 3%;
    }
    .item {
        height: 1.5rem;
        border-bottom: 1px solid #ddd;
        overflow: hidden;
    }
    .item p {
        font-size: 0.3rem;
        color: #3c3c3c;
        margin-top: 0.3rem;
        line-height: 0.36rem;
    }
    .item span {
        font-size: 0.26rem;
        line-height: 0.32rem;
        margin-top: 0.3rem;
        color: #656565;
        float: left;
    }
</style>