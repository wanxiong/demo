<template>
    <div class="bottom-nav">
        <div @click="$router.push('/index')" :class="$route.path=='/index' ? 'is-select' : ''">
            <i class="iconfont">&#xe65d;</i>
            <p>首页</p>
        </div>
        <div @click="$router.push('/mine')" :class="$route.path=='/mine' ? 'is-select' : ''">
            <i class="iconfont">&#xe657;</i>
            <p>我的</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'bottom',
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
            
        }
    }
</script>

<style scoped>
    .bottom-nav {
        width: 100%;
        height: 1rem;
        background: #fff;
        display: flex;
        position: fixed;
        overflow: hidden;
        bottom: 0;
        border-top: 1px solid #ddd;
    }
    .bottom-nav div {
        float: left;
        width: 100%;
        text-align: center;
        overflow: hidden;
    }
    .bottom-nav div i {
        font-size: 0.36rem;
        color: #3c3c3c;
        margin-top: 0.2rem;
        display: inline-block;
    }
    .bottom-nav div p {
        font-size: 0.28rem;
        color: #3c3c3c;
        line-height: 0.38rem;
    }
    .bottom-nav .is-select i {
        color: #00B996;
    }
    .bottom-nav .is-select p {
        color: #00B996;
    }
</style>
