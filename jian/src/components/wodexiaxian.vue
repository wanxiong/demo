<template>
    <div class="outer">
        <div>
            <p class="model_content_header">我的下线<i class="iconfont " @click="back">&#xe64a;</i></p>
        </div>
        <div class="content" v-if="isEmpty == false"
          v-infinite-scroll="loadMore"
          infinite-scroll-distance="10"
        >
            <div class="item" v-for="item in list">
                <p>
                    <span>{{item.name}}</span>
                    <span>{{item.phone}}</span>
                </p>
                <p>{{item.createTime}}</p>
            </div>
        </div>
        <!-- <ul
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <li v-for="item in list">{{ item }}</li>
        </ul> -->
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
                page: 1,
                size: 15,
                flag:false
            }
        },
        beforeMount() {
            document.title = this.$route.meta.title;
        },
        mounted() {
            
        },
        methods: {
            getInfo() {
                let _this = this;
                let params = {
                    size: this.size,
                    page: this.page
                }
                let url =`/api/user/referrer?page=${this.page}&size=${this.size}`
                _this.$http.get(url).then((res) => {
                    let r = res.data;
                    if(r.code == 200) {
                        let arr = r.data.items
                        _this.list =  _this.list.concat(arr);
                        if(r.data.total > (this.size*this.page)) {
                            this.page +=1;
                            this.flag = false;
                        } else {

                        }
                        _this.list.length == 0 ? _this.isEmpty = true : _this.isEmpty = false;
                    }
                    if(r.code == 401) {
                        _this.$router.replace('/login')
                    }
                })
            },
            back() {
                window.history.back();
            },
            loadMore() {
                if(this.flag) {
                    return
                }
                this.flag = true;
                this.getInfo();
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
    .model_content_header{
        height: 43px;
        width: 100%;
        z-index: 999;
        background: #00a2ff;
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
</style>