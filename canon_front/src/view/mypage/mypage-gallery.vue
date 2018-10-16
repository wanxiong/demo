<template>
	<div>
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
						<template v-if="photoList.length">
							<waterfall  :line-gap="376" :min-line-gap="150" :watch="changeWaterfall" :grow='[1,1,1]'>
							  <!-- each component is wrapped by a waterfall slot :key="item.id" 变更需要排序添加key绑定-->
						  		<waterfall-slot
								    v-for="(item, index) in photoList"
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
							    			<h4 v-if="item.challengeKbn == 1" class="ap-challenge-name1" >挑战{{item.challengeNo}}</h4>
											<h4 v-if="item.challengeKbn == 2" class="ap-challenge-name1" >限时挑战</h4>
											<h4 v-if="item.challengeKbn == 3" class="ap-challenge-name1" >{{item.specialTitle}}</h4>
							    			<p v-text="item.challengeName"></p>
											<div class="challenge_detail">
												<button @click="go_challenge_detail(item)">查看详情</button>
											</div>
							    		</div>
							    	</div>
							    </div>
							    <span v-text="item.challengeName"></span>
							    <div class="app_icon">
							    	
					    			<!-- <span v-text="item.nickname"></span> -->
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
		</div>
	</div>
</template>
<script type="text/javascript">
	import {getMypageGallery} from '@/api/homeApi'
	import {mapState} from 'vuex'
	import {CUSTOM_timeline} from '@/config/custom'
	import Scroll from '@/components/scroll/scroll'
	import Waterfall from 'vue-waterfall/lib/waterfall'
	import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot'
	export default {
		data() {
			return {
				start: 1,
				count: 20,
				rateLevel: 0,
				isloading: false,
				photoList: [],
				pullUpLoad:{//上拉加载更多，距离底部20PX的时候触发
					threshold: 20
				},
			}
		},
		created() {
			this.initMypageGallery();
		},
		computed: {
			...mapState([
				'loginData',
			])
		},
		methods: {
			initMypageGallery() {
				let par = {
					token: this.loginData.userInfo.accessToken,
					userId: this.loginData.userInfo.userId,
					targetUserId: this.loginData.userInfo.userId,
					start: 1,
					count: this.count,
				}
				getMypageGallery(par).then(res => {
					this.photoList = res.photo;
				}).catch( err => {

				})
			},
			//上拉加载
			pullup() {
				console.log('上拉加载');
			},
			//滚动
			scroll() {
				console.log('滚动加载');
			},
			/* 点击去详情
			* @params {Object photo } 照片相关信息对象
			*/
			go_challenge_detail(photo) {
				
			},
			//瀑布流变更
			changeWaterfall() {
				console.log('water fall change');

			},
		},
		components: {
			Waterfall,
			WaterfallSlot,
			Scroll,
		},
	}
</script>
<style type="text/css" scoped lang="scss">
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
				height: 10px;
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
</style>