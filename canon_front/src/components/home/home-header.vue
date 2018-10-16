<template>
	<div class="home-header">
		<ul class="home-header-left">
			<li>
				<img @click="changeHome" src="./../../assets/img/header_logo.png" width="121" height="39">
			</li>
			<li><a href="javascript:;">挑战晋级</a></li>
			<li><router-link tag="a" to="/home/mypage">我的主页</router-link></li>
			<li><a href="javascript:;">影家名师</a></li>
			
		</ul>
		<ul class="home-header-right">
			<li><a href="javascript:;"><i class="el-icon-search"></i></a></li>
			<li><a href="javascript:;"><i class="el-icon-upload"></i></a></li>
			<li><a href="javascript:;"><i class="el-icon-info"></i></a></li>
			<li class="hover_logout">
				<a href="javascript:;"><i class="el-icon-more init_more" ></i></a>
				<div class="logout">
					<p><a href="javascript:;">个人设置</a></p>
					<p @click="logout()">退出</p>
					<span class="sanjiao_icon"></span>
				</div>
			</li>
		</ul>
	</div>
</template>
<script type="text/javascript">
	import {getSsoLogout} from '@api/ssoApi'
	import {getEncodePhone} from '@api/commonApi'
	import {mapState, mapActions} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		computed:{
			...mapState([
				'loginData',
				'initLinkDownload',
			])
		},
		methods: {
			
			//登出接口
			logout() {
				let phone = this.loginData.mobilephone || this.loginData.userInfo.mobilephone ;
				let countryCd = this.loginData.countryCd || this.loginData.userInfo.countryCd ;
				this.$confirm('是否退出登录?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				})
				.then(() => {
					return '';
				})
				.catch((err)=> {
					console.log('取消');
					throw new Error('cancel promise')
				})
				.then((res) => {
					console.log('jiami')
					return getEncodePhone({
						mobilephone:phone,
						countryCd:countryCd,
					}).then((data) => {
						let phone = data.key;
						return phone;
					}).catch((err) => {
						throw new Error('cancel promise');
					})
					
				})
				.then((previousPhone) => {
					console.log('tui chu')
					return getSsoLogout({
						country_code: countryCd,
						account: previousPhone,
					}).then((data) => {
						this.$message({message: '退出成功', type: 'success'});
						this.clearLoginData();
						this.$router.push({"name": "start.login"});
					}).catch((err) => {
						this.$message.error(err.message);
					})

				})
				.catch((err) => {
					console.log(err);
				})
			},
			//点击主页 logo的
			changeHome() {
				if(this.$route.path != '/home/timeline') {
					this.$router.push({name: 'home.timeline'});
				}
			},
			...mapActions([
				'clearLoginData',
			])
		}
	}
</script>
<style  scoped lang="scss">
	.home-header{
	    padding: 20px 15px;
        min-height: 77px;
        background: #24292c url('./../../assets/img/header_color_line.jpg') repeat-x 0 top;
        display: flex;
        justify-content: space-between;
        > ul {
        	display: flex;
        	padding-top: 20px;
        	width: 500px;
        	> li {
        		position:relative;
        		width:25%;
        		> a{
    			    font-size: 14px;
				    color: #fff;
				    display: inline-block;
				    margin: 0 3px;
				    padding: 15px 23px;
    				cursor: pointer;
    				&:hover{
					    background-color: #1d2123;
				        border-radius: 25px;
    					outline: none;
    				}
    				&.active{
					    box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.3);
					    background-color: #1d2123;
				        border-radius: 25px;
    					outline: none;
    				}
        		}
        		.router-link-active{
        			box-shadow: inset 0 -1px 0 rgba(255, 255, 255, 0.3);
				    background-color: #1d2123;
			        border-radius: 25px;
					outline: none;
        		}
        	}
        }
        .home-header-left{
        	img{
        		margin-top: 6px;
        		cursor: pointer;

        	}
        }
        .home-header-right{
        	width: 300px;
        	i{
        		font-size: 26px;
        	}
        	.init_more{
        		transform: rotate(90deg);
        	}
        	.hover_logout:hover{
        		.logout{
    				display: block;
    			}
        	}	
        	.logout{
    		    position: absolute;
			    top: 100%;
			    display: none;
			    right: -5px;
		        background-color: #323b41;
			    z-index: 1000;
			    min-width: 140px;
			    padding: 5px 0;
			    margin: 2px 0 0;
			    list-style: none;
			    font-size: 14px;
			    text-align: center;
			    border: 1px solid #cccccc;
			    border: 1px solid rgba(0, 0, 0, 0.15);
			    border-radius: 4px;
			    -webkit-box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
			    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
			    background-clip: padding-box;
        		> p {
        			width: 110px;
        			padding: 0 20px;
        			line-height:24px;
        			&:hover{
    				    text-decoration: none;
					    color: #262626;
					    background-color: #f5f5f5;
        			}
        			a{
        				color: #fff;
        				text-decoration: none;
					    display: block;
					    &:hover{
    				        color: #262626;
    						background-color: #f5f5f5;
        				}
        			}
        			cursor: pointer;
        			color: #fff;
        		}
        		.sanjiao_icon{
        			position: absolute;
				    width: 0;
				    height: 0;
				    font-size: 0;
				    border: solid 8px;
				    border-color: #24292c #24292c #323b41 #24292c;
				    bottom: 100%;
				    right: 20%;
				    display: blcok;
        		}
        	}
        }
	}
	
</style>