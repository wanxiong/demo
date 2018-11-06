<template>
    <div class="outer">
        <div class="headers">
            <img src="https://img.hzanchu.com/acimg/579b53077119b5498edb6ead47fb2d6b.png?x-oss-process=image/resize,l_800" width="100%"/>
        </div>
        <p class="text">{{copytext}}</p>
        <button class="share-btn" :data-clipboard-text="copytext" @click="copy()">复制邀请</button>
    </div>
</template>

<script>
    import Clipboard from 'clipboard';
    import {shareUrl } from '@/api/apiconfig'
    export default {
        name: 'promotion',
        data() {
            return {
                copytext: ''
            }
        },
        beforeMount() {
            document.title = this.$route.meta.title;
        },
        mounted() {
            this.getShareInfo();
        },
        methods: {
            getShareInfo() {
                let _this = this;
                _this.$http.get('/api/user/share').then((res) => {
                    let r = res.data;
                    if(r.code == 0) {
                        _this.copytext = shareUrl + r.data;
                    }
                    if(r.code == 403) {
                        _this.$router.push('/passlogin')
                    }
                })
            },
            copy() {
				var clipboard = new Clipboard('.share-btn')
				clipboard.on('success', e => {
					this.$toast('复制成功')
					// 释放内存
					clipboard.destroy()
				})
				clipboard.on('error', e => {
					// 不支持复制
					this.$toast('该浏览器不支持自动复制')
					// 释放内存
					clipboard.destroy()
				})
			},
        }
    }
</script>

<style scoped>
    .outer {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #fff;
    }
    .text {
        font-size: 0.3rem;
        padding: 0 0.26rem;
        line-height: 0.42rem;
        color: #3c3c3c;
        text-align: center;
        margin-top: 0.5rem;
    }
    .share-btn {
        width: 3.2rem;
        height: 0.76rem;
        border-radius: 1rem;
        background: #00B996;
        font-size: 0.32rem;
        color: #fff;
        text-align: center;
        line-height: normal;
        display: block;
        margin: 0.3rem auto 0;
    }
</style>