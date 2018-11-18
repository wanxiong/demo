<template>
    <div class="index">
		<el-row class="header">
			<myHeader></myHeader>
		</el-row>
		<el-row class="content">
			<el-col :span='3' class="nav">
				<el-menu class="el-menu-vertical-demo" theme="dark" unique-opened style="background:#bfcbd9;">
                    <el-menu-item index="1" @click="$router.push('/bgm/setting')">
                        <span slot="title">基础设置</span>
                    </el-menu-item>
                    <el-menu-item index="2" @click="$router.push('/bgm/noticelist')">
                        <span slot="title">公告列表</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="$router.push('/bgm/bannerlist')">
                        <span slot="title">轮播图列表</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="$router.push('/bgm/productlist')">
                        <span slot="title">产品列表</span>
                    </el-menu-item>
                    <el-menu-item index="5" @click="$router.push('/bgm/userlist')">
                        <span slot="title">用户列表</span>
                    </el-menu-item>
                   <el-menu-item index="6" @click="$router.push('/bgm/count')">
                        <span slot="title">销售统计</span>
                    </el-menu-item> <!--
                    <el-menu-item index="7" @click="$router.push('/bgm/record')" disabled>
                        <span slot="title">记录</span>
                    </el-menu-item>-->
                </el-menu>
			</el-col>
			<el-col :span="21" class="view">
				<transition name="fade">
					<router-view></router-view>
				</transition>
			</el-col>
		</el-row>
	</div>
</template>

<script>
    import myHeader from '../components/myheader'
    export default {
        name: 'home',
        data() {
            return {
                
            }
        },
        components:{
			myHeader,
		},
        mounted() {

        },
        methods: {

        }
    }
</script>

<style scoped>
    .index{
		height: 100%;
		width: 100%;
    }
    .header{
        height: 70px;
    }
    .content{
        height: calc(100% - 70px);
        height: -moz-calc(100% - 70px);
        height: -webkit-calc(100% - 70px);
        background: #bfcbd9;
    }
    .nav, .view{
        height: 100%;
        background: #bfcbd9;
    }
    .view{
        overflow-y: scroll;
        padding:20px;
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        -o-box-sizing: border-box;
        -ms-box-sizing: border-box;
        box-sizing: border-box;
        background: #fff;
    }
	.fade-enter-active{
	  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
	}
	.fade-enter{
	  opacity: 0;
	}
</style>