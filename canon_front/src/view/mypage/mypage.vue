<template>
	<div class="mypage_box">
		<!-- 顶部 -->
		<div :class="'mypage ap-stage-bg-'+userStatus.stageId">
			<div class="mypage_left">
				<div class="head_icon">
					<img src="./../../assets/img/no-avatar-default.jpg" >
				</div>
				<div class="userName" v-text="loginData.userInfo.nickName">
				</div>
				<div class="share">
					<span><i class="el-icon-share"></i>分享</span>
				</div>
			</div>
			<div class="mypage_right">
				<div>{{userStatus.stageName}} 
					<span>{{ (userStatus.nextLevelNeedClear,userStatus.nextLevelCleared) | leveNeedNum(userStatus.nextLevelNeedClear,userStatus.nextLevelCleared)}}</span>
				</div>
				<div class="status_border">
					<span :class="'ap-stage-complete-bg-'+userStatus.stageId" :style="{'width':precent(userStatus.nextLevelNeedClear,userStatus.nextLevelCleared)}"></span>
				</div>
				<ul>
					<li>
						0/100
						<p>挑战</p>
					</li>
					<li>
						0
						<p>关注</p>
					</li>
					<li>
						0
						<p>粉丝</p>
					</li>
				</ul>
			</div>
		</div>
		<!-- 我的设备 影集 切换 -->
		<div :class="'switch_tab switch_tab_'+ userStatus.stageId">
			<router-link tag="a" :to="{name: 'home.mypage.gallery'}">我的影集</router-link>
			<router-link tag="a" :to="{name: 'home.mypage.achievement'}">我的勋章</router-link>
			<router-link tag="a" :to="{name: 'home.mypage.equipment'}">我的摄影装备</router-link>
			<!-- <span class="active">我的影集</span>
			<span>我的勋章</span>
			<span>我的摄影装备</span> -->
		</div>
		<!-- ui-view -->
		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	import {getMemberStatu} from '@/api/homeApi'
	export default {
		data() {
			return {
				userStatus: {},
			}
		},
		created() {
			console.log(this.loginData)
			this.initMemberStatu();
		},
		computed: {
			...mapState([
				'loginData',
			])
		},
		methods: {
			//获取会员状态
			initMemberStatu() {
				let params = {
					token: this.loginData.userInfo.accessToken,
					userId: this.loginData.userInfo.userId,
				};
				getMemberStatu(params).then(res => {
					console.log(res)
					this.userStatus = res.userStatus;
				}).catch(err => {

				})
			},
			//挑战的进度百分比
			precent: (nextLevelNeedClear, nextLevelCleared) => {
		 		let num = nextLevelNeedClear - nextLevelCleared ;
		 		let progress = "";
		 		if (num < 1) {
					progress = "100%";
		        } else {
		        	
		    		progress = nextLevelCleared / nextLevelNeedClear;
		        }
		        return progress;
		 	},
		},
		
	}
</script>
<style  scoped lang="scss">
	.mypage_box{
		font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
		padding:0 15px;
		max-width: 1280px;
		margin: 10px auto 0;
	}
	.mypage{
		display: flex;
		justify-content:space-between;
		padding:15px;
		.mypage_left,.mypage_right{
			width: 50%;
		}
	}
	.mypage_left{
		display: flex;
		.head_icon{
			width: 90px;
			height: 90px;
			border-radius: 50%;
			overflow: hidden;
			margin-right: 15px;
			img{
				width: 100%;
			}
		}
		.userName{
    		font-size: 24px;
		    margin-top: 10px;
	        margin-right: 20px;
		}
		.share{
			font-size: 18px;
			margin-top: 10px;
			i{
				margin-right: 5px;
			}
			span{
				cursor: pointer;
			    margin-left: 5px;
			    float: left;
			    width: 83px;
			    height: 28px;
			    text-align: center;
			    border: solid 1px #fff;
			    border-radius: 3px;
			    color: #FAFAFA;
			    &:hover{
		    	    background-color: #e6e6e6;
				    color: #333333;
				    border: solid 1px #adadad;
			    }
			}
		}
	}
	.mypage_right{
	    max-width: 300px;
	    margin-right: 20px;
	    > div:nth-of-type(1){
	    	font-size: 18px;
	    	text-align: left;
	    	margin-bottom: 10px;
	    	span{
	    		font-size: 14px;
	    		float: right;
	    	}
	    }
		.status_border{
			height:10px;
			background-color: #fff;
			border-radius: 2px;
			margin-bottom: 10px;
			text-align:left;
			span {
				display: inline-block;
				width: 0;
				transition: all 1s ;
				height: 100%;
				background-color:red;
			}
		}
		> ul{
			display:flex;
			font-size: 20px;
			letter-spacing: 2px;
			li{
				flex:1;
				cursor: pointer;
				border-right: 1px solid #fff;
				p{
					font-size: 16px;
				}
				&:nth-of-type(1) {
					text-align: left;
				}
				&:last-child{
					border-right: none;
				}
			}
		}
	}
	.switch_tab{
		text-align: center;
		margin: 10px 0;
		> a{
			cursor: pointer;
			font-size: 16px;
			display: inline-block;
			padding: 5px 15px;
			color: #666;
			position: relative;
			padding-bottom: 10px;
			&.router-link-active::after{
				position: absolute;
				content: "";
				width: 110%;
				display: inline-block;
				height: 3px;
				background-color: #666;
				bottom: -5px;
				left: 50%;
				transform: translate(-50%);

			}
		}
	}
	.switch_tab_1 a.router-link-active::after{
		background-color: #616161 !important;
	}
	.switch_tab_2 a.router-link-active::after{
		background-color: #90caf9 !important;
	}
	.switch_tab_3 a.router-link-active::after{
		background-color: #a5d6a7 !important;
	}
	.switch_tab_4 a.router-link-active::after{
		background-color: #ce93d8 !important;
	}
	.switch_tab_5 a.router-link-active::after{
		background-color: #ffe082 !important;
	}
	.switch_tab_6 a.router-link-active::after{
		background-color: #ef9a9a !important;
	}
</style>