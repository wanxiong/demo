<template>
	<div class="timeline_home">
		<!-- 主banner -->
		<div class="timeline_banner">
			<div :style="{background: '#2f2f2f url('+timelineData.adviceChallenge[0].photoUrl +') no-repeat center/cover'}">
				<!-- 遮罩层级 -->
				<span class="black_modal"></span>
				<!-- 展示层 -->
				<div class="text">
					<div v-text="timelineData.adviceChallenge[0].challengeName"></div>
					<div>
						<span>挑战难度</span>
						<el-rate
						  v-model="rateLevel"
						  disabled
						  text-color="#00ff00"
						  void-color="#000000"
					      :colors=colors
					      :icon-classes=iconClass
						  disabled-void-color="rgba(255,255,255,.5)"
						  disabled-void-icon-class="rateColor el-icon-star-on"
						  class="rateBox"
						>
						</el-rate>
						<div>
							<button @click="go_start_challenge">开始挑战</button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="scroll_box">
			<scroll 
			:listenScroll="false"
			:probeType="2"
			:pullUpLoad="pullUpLoad"
			:bounce="true"
			:scrollbar="true"
			:mouseWheel="{}"
			@scroll="scroll"
			@pullingUp="pullup"
			ref="scrollObj"
			>
				<div>
					<!--  小图瀑布流 -->
					<div class="timeline_list">
						<template v-if="timeline.length">
							<waterfall  :line-gap="376" :min-line-gap="150" :watch="changeWaterfall" :grow='[1,1,1]'>
							  <!-- each component is wrapped by a waterfall slot :key="item.id" 变更需要排序添加key绑定-->
						  		<waterfall-slot
								    v-for="(item, index) in timeline"
								    :width="item.width"
								    :height="item.height"
								    :order="index"
								    :key="item.id"
								    class="waterfall_item zoomIn animated"
							  	>
							    <!--
							      your component
							    -->
							    <div class="list_bg_item "
							    	:style="{background: '#efefef url('+item.photoUrl+'?stripmeta=0&imageView&type=jpg&thumbnail=840y540&axis=5) no-repeat center/cover'}" >
							    	<div class="blank_modal">
							    		<div class="clearfix modal_con">
							    			<p v-text="item.challengeName"></p>
							    			<span>挑战难度</span>
											<el-rate
											  v-model="item.difficultyLevel - 0"
											  disabled
											  text-color="#00ff00"
											  void-color="#000000"
										      :colors=colors
										      :icon-classes=iconClass
											  disabled-void-color="rgba(255,255,255,.5)"
											  disabled-void-icon-class="rateColor el-icon-star-on"
											  class="rateBox"
											>
											</el-rate>
											<i></i>
											<div class="challenge_detail">
												<button @click="go_challenge_detail">查看详情</button>
											</div>
							    		</div>
							    	</div>
							    </div>
							    <span v-text="item.challengeName"></span>
							    <div class="app_icon">
							    	<!-- 无头像 -->
					    			<span class="app_icon_item" 
					    				v-if="!item.userPhotoUrl" 
					    				:class="'ap-stage-'+item.userStageId">
				    				</span>
				    				<!-- 有头像 -->
					    			<span class="app_icon_item" 
					    				v-if="item.userPhotoUrl" 
					    				:class="'ap-stage-'+item.userStageId"
					    				:style="{background: 'url('+item.userPhotoUrl+'?stripmeta=0&imageView&type=jpg&thumbnail=48y48&axis=5) no-repeat center/cover'}">
				    				</span>
					    			<span v-text="item.nickname"></span>
					    			<span v-if="item.photoStatus == 2" class="challengeState">完成了挑战</span>
					    			<span v-if="item.photoStatus == 1" class="challengeState">正在挑战中</span>
					    			<!-- 点赞 -->
					    			<div class="likes">
					    				<i class="el-icon-star-on" style="display:inherit;">{{item.photoLikes}}</i>
					    			</div>
			    				</div>
						  		</waterfall-slot>
							</waterfall>
						</template>
					</div>
				</div>
			</scroll>
			<!-- loading 层 -->
			<div v-if="isloading" class="loadFlg">
				<img src="../../assets/img/load.gif">
			</div>
		</div>
		
	</div>
</template>
<script type="text/javascript">
	import {getTimeline, getMemberStatu}from '@/api/homeApi'
	import {CUSTOM_timeline} from '@/config/custom'
	import {mapState, mapActions} from 'vuex'
	import Waterfall from 'vue-waterfall/lib/waterfall'
	import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
	import Scroll from '@/components/scroll/scroll'
	export default {
		data() {
			return {
				start: 1,
				count: 20,
				rateLevel: 0,
				colors:['#ffffff','#ffffff','#ffffff'],
				isloading: false,
				iconClass:['check-rate el-icon-star-on','check-rate el-icon-star-on','check-rate el-icon-star-on'],
				timelineData: {
					adviceChallenge: [{}],
				},
				timeline: [],
				pullUpLoad:{//上拉加载更多，距离底部20PX的时候触发
					threshold: 20
				},
			}
		},
		created() {
			this.getTimelineData();
			this.initMemberStatus();
		},
		mounted() {

		},
		computed: {
			...mapState([
				'loginData',
			]),
		},
		components: {
			Waterfall,
    		WaterfallSlot,
    		Scroll,
		},
		methods: {
			/* timeline加载图片
			*@parmas {Object qurey} 请求的参数
			*@parmas {Boolean duplication} 是否重复请求一个接口
			*/
			 async getTimelineData(qurey = {}, duplication = false) {
				let params = {
					token: this.loginData.userInfo.accessToken,
					userId: this.loginData.userInfo.userId,
					myCount: CUSTOM_timeline.myCount,
					count: this.count,
					start: this.start,
					myUploadTime: CUSTOM_timeline.myUploadTime,
				}
				//合并自定义参数
				Object.assign(params, qurey);
				/*getTimeline(params).then(res => {
					if(duplication) {
						//let list = [...this.timeline, ...res.timeline];
						this.timeline = [...this.timeline, ...res.timeline];
						console.log('二次请求成功');

					} else {
						this.timelineData = res;
						this.timeline = res.timeline;
					}
				}).catch(err => {
					console.log(err);
				})*/
				try {
					let res = await getTimeline(params);
					if(duplication) {
						//let list = [...this.timeline, ...res.timeline];
						this.timeline = [...this.timeline, ...res.timeline];
						if(res.timeline.length < CUSTOM_timeline.allCount) {
							this.$message({message: '没有更多数据了哦'});
							return 1;
						}
					} else {
						this.timelineData = res;
						this.timeline = res.timeline;
					}
				} catch(err) {//还原参数
					this.start = this.start - CUSTOM_timeline.allCount;
				}
			},
			//获取会员状态
			async initMemberStatus() {
				console.log(this.$rootScope);
				try {
					let pra = {
						token: this.loginData.userInfo.accessToken,
						userId: this.loginData.userInfo.userId,
					};
					let res = await getMemberStatu(pra);
					//级别同步
					console.log(this.loginData);
					if( res.userStatus && res.userStatus.userId != this.loginData.userInfo.userId) {
						let copyData = JSON.parse(JSON.stringify(this.loginData))
						copyData.userInfo.userId = res.userStatus.userId;
						this.setLoginData(copyData);
					}
				} catch(err) {
				}
				
			},
			//开始挑战
			go_start_challenge() {
				// this.$router.push({name: "home.challenge",
				// 	params:{
				// 		challengeId:this.timelineData.adviceChallenge[0].challengeId,
				// 	}
				// })
			},
			//查看详情
			go_challenge_detail() {

			},
			//瀑布流变更
			changeWaterfall() {
				console.log('water fall change');

			},
			//滚动事件监听
			scroll(e) {
				console.log(e);
			},
			//上拉加载更多的回调
			async pullup() {
				this.isloading = true;
				this.start = this.start + CUSTOM_timeline.allCount;
				this.count = this.count;
				let pra = {
					start: this.start,
					count: this.count,
				}
				let ret = await this.getTimelineData(pra, true);
				console.log('加载完成' + ret);
				this.isloading = false;
				if(!ret) {//数据正常加载
					this.$refs['scrollObj'].finishPullUp();
				}
			},
			...mapActions([
				'setLoginData',
			])
		},
		watch: {
			timelineData(val, oldval) {
				if(val.adviceChallenge[0].photoUrl) {
					val.adviceChallenge[0].photoUrl += '?stripmeta=0&imageView&type=jpg&thumbnail=1170y300&axis=5';
					this.rateLevel = val.adviceChallenge[0].difficultyLevel - 0
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	.timeline_home{
		width: 1200px;
		margin: 0 auto;
	    box-sizing: border-box;
        color: #737373;
        font-size: 14px;
        padding:15px 0;
	}
	.timeline_banner{
	    margin-bottom: 30px;
	    height: 300px;
	    width: 100%;
	    transition:all .3s ease-in-out;
	    &:hover{
	    	transform: scale(1.03);
	    	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.2);
	    	.black_modal{
	    		display: block;
	    	}
	    }
	    > div{
	    	height: 100%;
	    	position: relative;
	    }
	    .black_modal{
	    	position: absolute;
	    	background-color: rgba(0,0,0,.3);
	    	width: 100%;
	    	height: 100%;
	    	display: none;
	    }
	    .rateBox{
	    	width: 130px;
	    	display: inline-block;
	    }
	    .text{
	    	color: #fff;
	    	font-size: 14px;
	    	position: relative;
	    	z-index: 99;
    	    top: 50%;
    		transform: translateY(-50%);
	    	> div:nth-of-type(1){
	    		font-size: 30px;
	    	}
	    	> div:nth-of-type(2){
	    		margin-top: 15px;
	    		> span{
    			    vertical-align: middle;
	    		}
	    	}
	    	button{
    		    color: #ffffff;
			    background-color: #b10a14;
			    border-color: #990911;
			    display: inline-block;
			    margin-bottom: 0;
			    font-weight: normal;
			    text-align: center;
			    vertical-align: middle;
			    touch-action: manipulation;
			    cursor: pointer;
			    background-image: none;
			    border: 1px solid transparent;
			    white-space: nowrap;
			    padding: 6px 12px;
			    font-size: 14px;
			    line-height: 1.42857143;
			    border-radius: 16px;
			    margin-top: 30px;
			    &:hover{
			    	color: #ffffff;
    				background-color: #81070f;
    				border-color: #5f050b;
			    }
	    	}
	    }
	}
	.timeline_list{
	    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
		.list_bg_item{
			height: 100%;
			width: 100%;
			position:relative;
			transition:all .3s ease-in-out;
			
			.blank_modal{
				background-color: rgba(0,0,0,.5);
				height: 100%;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				display: none;
				.modal_con{
	    			color: #fff;
	    			position: relative;
				    top: 40%;
				    transform: translateY(-50%);
				    .rateBox{
				    	display: inline-block;
				    }
				    > span{
				    	vertical-align: middle;
				    }
				    > i {
			    	    height: 1px;
					    background-color: #fff;
					    width: 90%;
					    display: block;
					    margin: 10px auto;
				    }
	    			> p {
	    				font-size: 26px;
	    				text-align: center;
    				    letter-spacing: 2px;
    				    margin-bottom: 5px;
	    			}
	    		}
			}
			&:hover > .blank_modal{
				display: block;
			}
			.challengeState{
				display: inline-block;
				margin-left: 15px;
			}
			.challenge_detail{
				button{
					font-size: 18px;
				    padding: 6px 20px;
    				margin: 0 5px;
				    border-radius: 16px;
				    display: inline-block;
				    margin-bottom: 0;
				    font-weight: normal;
				    text-align: center;
				    vertical-align: middle;
				    touch-action: manipulation;
				    cursor: pointer;
				    background-image: none;
				    border: 1px solid transparent;
				    white-space: nowrap;
				    font-size: 14px;
				    letter-spacing: 2px;
				   	&:hover{
					    color: #333333;
	    				background-color: #e6e6e6;
	    				border-color: #adadad;
	    			}
				}
			}
		}
		.waterfall_item{
			padding: 10px;
			overflow: hidden;
			&:hover{
				.app_icon{
					background-color: rgba(0,0,0,.3) !important;
					transform: scale(1.03);
				}
				.list_bg_item{
					transform: scale(1.03);
	    				box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.2);
				}
			}
			& > span{
			    background-color: rgba(255, 255, 255, 0.8);
		        color: rgb(48, 48, 48);
	            font-size: 12px;
                padding: 3px 7px;
    			border-radius: 10px;
    			position: absolute;
    			left: 20px;
    			top: 20px;

			}
			&:hover > span{ 
				display: none;
			}
			.app_icon{
				transition:all .3s ease-in-out;
				position: absolute;
				bottom: 10px;
				left: 10px;
				width: calc(100% - 20px);
				color: #333;
				text-align: left;
				padding: 10px 0px 20px 0;
				text-indent: 20px;
				background-color: rgba(0,0,0,0);
			}
			&:hover > .app_icon{
				color: #fff;
			}
			.likes{
			    background-color: #777777;
			    position: absolute;
			    right: 10px;
			    text-indent: 0;
			    border-radius: 5px;
			    padding: 5px 8px;
			    bottom: 10px;
			    color: #fff;
			    cursor: pointer;
			}
			.app_icon_item {
				width: 36px;
			    vertical-align: middle;
				height: 36px;
				display: inline-block;
				border-radius: 50%;
				overflow: hidden;
				margin-right: 15px;
				cursor: pointer;
				background: url('./../../assets/img/no-avatar-default.jpg') no-repeat center/cover;

			}
		}
	}
	.scroll_box{
		min-height: 700px;
		//overflow:scroll;
		position: relative;
		.scroll_box_compo{
			scroll_box_compo{
				position: relative;
				overflow: hidden;
			}
		}
	}
	.loadFlg{
		position: absolute;
	    bottom: 10px;
	    left: 50%;
	    transform: translateX(-50%);
	}
</style>
<style type="text/css" lang="scss">
	.timeline_home {
		.check-rate{
			font-size: 16px !important;
		}
		.rateColor{
			font-size: 16px !important;
		}
	}
</style>