<template>
	<div class="achievement">
		<div>
			<div  class="achievementIcon" >
				<!-- 未得到勋章 --><!-- 得到勋章 getFlag == 1" -->
				<!-- :attr="item.iconId,item.getFlag | orderAchievement(item.iconId,item.getFlag)" -->
				<div 
					v-for="item in achievement " 
					class="" 
					:style="{'background':'url('+item.imgUrl+') no-repeat center/cover'}"
					>
					
					{{item.comment}}
				</div>
				
			</div>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	import {getMemberStatu} from '@/api/homeApi'
	export default {
		data() {
			return {
				iconList: [],
			}
		},
		computed: {
			...mapState([
				'loginData',
			]),
			achievement() {
				for(let a in this.iconList) {
					if(this.iconList[a].getFlag == '0') { //没有激活图标
			            this.iconList[a].imgUrl = 
			            	`../../static/achivement-icon/gray/${this.iconList[a].iconId}_${this.iconList[a].iconId}.png`;
			            this.iconList[a].tipComment = 1;
			        } else {  //激活图标
			           this.iconList[a].imgUrl = 
		           			`../../static/achivement-icon/${this.iconList[a].iconId}.png`;
			        }
				}
				return this.iconList;
			}

		},
		created() {
			this.initMemberStatu();
		},
		methods: {
			initMemberStatu() {
				let params = {
					token: this.loginData.userInfo.accessToken,
					userId: this.loginData.userInfo.userId,
				};
				getMemberStatu(params).then(res => {
					this.iconList = res.achivement;
					console.log(res.achivement);
				}).catch(err => {

				})
			}
		},

	}
</script>
<style type="text/css" scoped lang="scss">
	.achievementIcon{
		display: flex;
		flex-wrap: wrap;
		justify-content:space-between;
		> div{
			width: 10%;
			padding-top:10%;
			margin-right: 2%;
		}
	}
</style>