<template>
	<div>
		<!-- 注册成功的头部 -->
		<home-header v-if="show_home_head"></home-header>
		<!-- 注册中的头部 -->
		<sns-header v-if="show_sns_head"></sns-header>
		<!-- ui -->
		<router-view></router-view>
		<!-- 版权 -->
		<home-footer v-if="show_home_head"></home-footer>
	</div>
</template>
<script type="text/javascript">
	import homeHeader from '@/components/home/home-header'
	import homeFooter from '@/components/home/home-footer'
	import snsHeader from '@/components/sns/sns-header'
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				show_home_head: false,
				show_sns_head: false,
			}
		},
		created() {
			console.log(this.loginData)
			this.initUi();
			
		},
		computed:{
			...mapState([
				'loginData',
			])
		},
		methods: {
			initUi() {
				if(!this.loginData.registerStatus) {//不存在缓存，去登录页面
					this.$router.push({name: 'start.login'});
				} else if(this.loginData && this.loginData.registerStatus == '1') { //注册没走完
					this.show_sns_head = true;
					this.show_home_head = false;
				} else if(this.loginData && this.loginData.registerStatus == '3') { //走完
					this.show_home_head = true;
					this.show_sns_head = false;
					//默认去timeline
					this.$router.push({name: 'home.timeline'});
				}
			},
			
		},
		components:{
			homeHeader,
			snsHeader,
			homeFooter,
		},
		watch: {
			'$route' (to, from) {
				//来自注册最后一步的话，画面重载
				if(from.name == 'home.start.adviceFollow' && to.name == 'home') { 
					this.initUi();
				}
			}
		},
	}
</script>
<style type="text/css" scoped>
	
</style>