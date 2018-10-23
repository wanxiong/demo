<template>
    <div class="outer">
        <div class="banner">
            <div class="swiper-container2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="banner in bannerList">
                        <img :src="imgUrl+banner.bannerUrl" style="width:100%;height:5rem;" @click="toBanner(banner)"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="news">
            <div class="label">公告</div>
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="notice in noticelist">{{notice.content}}</div>
                </div>
            </div>
        </div>
        <div class="product">
            <div class="item" v-for="item in list" @click="toLink(item)">
                <img :src="imgUrl+item.productUrl"/>
                <div class="info">
                    <p>{{item.productName}}</p>
                    <p>{{item.productDescription || 0}}</p>
                    <p><span>{{item.accessNumber}}</span>人申请</p>
                </div>
            </div>
        </div>

        <mt-popup v-model="popupVisible" position="bottom" class="popup">
            <div class="content">
                <div><span>姓名：</span><input type="text" placeholder="填写姓名" v-model="name"/></div>
                <div><span>手机号：</span><input type="number" placeholder="填写手机号" v-model="phone"/></div>
                <div><span>密码：</span><input type="text" placeholder="填写密码" v-model="password"/></div>
                <button @click="submit()">前往</button>
            </div>
        </mt-popup>
        <bottom></bottom>
    </div>
</template>

<script>
    import { Swipe, SwipeItem } from 'mint-ui';
    import Vue from 'vue'
    import {imgUrl} from '@/api/apiconfig'
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    import bottom from '../components/bottom';
    export default {
        name: 'index',
        computed: {
            imgUrl: () => {
                return imgUrl;
            }
        },
        data() {
            return {
                list: [],
                bannerList: [],
                noticelist: [],
                name: '',
                phone: '',
                password: '',
                popupVisible: false,
            }
        },
        components: {
			bottom,
		},
        created() {
            if(this.$route.query.share) {
                sessionStorage.setItem('share', this.$route.query.share);
            }
        },
        mounted() {
            this.getInfo();
            this.getBanner();
        },
        methods: {
            getBanner() {
                let _this = this;
                _this.$http.get('/api/banner/list').then(function(res) {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.bannerList = r.data;
                        setTimeout(() => {
                            var mySwiper = new Swiper('.swiper-container2', {
                                autoplay: true,//可选选项，自动滑动
                                loop: true,
                            })
                        },200)
                        _this.getNotice();
                    }
                })
            },
            getNotice() {
                let _this = this;
                _this.$http.get('/api/notice/list').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.noticelist = r.data;
                        console.log(r, 'r')
                        setTimeout(() => {
                            var mySwiper = new Swiper('.swiper-container', {
                                autoplay: true,//可选选项，自动滑动
                                loop: true,
                                direction : 'vertical',
                                speed: 1000,
                            })
                        },200)
                    }
                })
            },
            getInfo() {
                let _this = this;
                _this.$http.get('/api/product/list').then(function(res) {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.list = r.data.items;
                    }
                })
            },
            toLink(item) {
                let _this = this;
                _this.$http.get('/api/user/getUserInfo').then((res) => {
                    if(res.data.code == 0) {
                        window.location.href = item.productLink;
                        let uApi = '/api/product/incr/' + item.id;
                        _this.$http.post(uApi).then((res) => {})
                    }
                    if(res.data.code == 403) {
                        _this.popupVisible = true;
                    }
                })
            },
            toBanner(banner) {
                let _this = this;
                _this.$http.get('/api/user/getUserInfo').then((res) => {
                    if(res.data.code == 0) {
                        window.location.href = banner.bannerLink;
                        let uApi = '/api/product/incr/' + banner.id;
                        _this.$http.post(uApi).then((res) => {})
                    }
                    if(res.data.code == 403) {
                        _this.popupVisible = true;
                    }
                })
            },
            submit() {
                let _this = this;
                if(_this.name.replace(/^\s*$/g, "") == '') {
                    _this.$toast('请填写姓名');
                    return;
                }
                if(!(/^1[345678]\d{9}$/.test(_this.phone))) {
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
                        _this.popupVisible = false;
                    } else {
                        _this.$toast(r.message)
                    }
                })
            }
        }
    }
</script>

<style>
    .outer {
        width: 100%;
        min-height: 100%;
        overflow: hidden;
        background: #fff;
    }
    .banner {
        height: 5rem;
    }
    .banner .swiper-container {
        height: 5rem;
    }
    .banner .swiper-container .swiper-slide img {
        width: 100%;
        height: 5rem;
    }
    
    .news {
        height: 0.6rem;
        overflow: hidden;
        margin-top: 0.16rem;
    }
    .news .label {
        float: left;
        width: 1rem;
        height: 0.4rem;
        color: #e02431;
        border: 1px solid #e02431;
        font-size: 0.24rem;
        line-height: 0.4rem;
        text-align: center;
        margin: 0.1rem 0 0 0.26rem;
        border-radius: 0.08rem;
    }
    .news .swiper-container {
        float: left;
        margin-left: 0.2rem;
    }
    .news .swiper-container .swiper-slide {
        float: left;
        height: 0.6rem;
        overflow: hidden;
        line-height: 0.6rem;
    }

    .product {
        padding: 0 0.26rem;
        overflow: hidden;
        margin-top: 0.1rem;
        padding: 0.1rem 0.26rem 1.4rem;
    }
    .product .item {
        width: 3.4rem;
        height: 1.6rem;
        box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.08);
        margin-bottom: 0.2rem;
    }
    .product .item img {
        width: 1rem;
        height: 1rem;
        float: left;
        margin: 0.3rem 0 0 0.1rem;
    }
    .product .item .info {
        float: left;
        margin-left: 0.12rem;
    }
    .product .item .info p:nth-of-type(1) {
        font-size: 0.3rem;
        color: #5b9df1;
        line-height: 0.36rem;
        margin-top: 0.26rem;
    }
    .product .item .info p:nth-of-type(2) {
        font-size: 0.24rem;
        color: #f0984c;
        line-height: 0.3rem;
        margin-top: 0.1rem;
    }
    .product .item .info p:nth-of-type(3) {
        font-size: 0.24rem;
        color: #f0984c;
        line-height: 0.32rem;
        margin-top: 0.06rem;
    }
    .product .item .info p:nth-of-type(3) span {
        font-size: 0.26rem;
        color: #e02431;
    }
    .product .item:nth-of-type(odd) {
        float: left;
    }
    .product .item:nth-of-type(even) {
        float: right;
    }

    .popup {
        width: 100%;
        height: 5rem;
    }
    .popup .content {
        overflow: hidden;
    }
    .popup .content div {
        padding: 0 0.26rem;
        height: 1rem;
        line-height: 1rem;
    }
    .popup .content div span {
        float: left;
        line-height: 1rem;
        width: 1.2rem;
        font-size: 0.3rem;
    }
    .popup .content div input {
        float: left;
        height: 1rem;
        line-height: normal;
        font-size: 0.3rem;
        width: 4rem;
    }
    .popup .content button {
        width: 4rem;
        height: 0.8rem;
        display: block;
        border-radius: 1rem;
        background: #5b9df1;
        margin: 0.3rem auto 0;
        text-align: center;
        line-height: normal;
        color: #fff;
        font-size: 0.3rem;
    }
</style>