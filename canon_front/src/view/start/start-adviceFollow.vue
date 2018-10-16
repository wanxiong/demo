<template>
	<div>
		<div class="start_advice">
			<!-- title content -->
			<div class="title clearfix">
				<el-col :span="8">关注你喜欢的影家（15人以上）</el-col>
  				<el-col :span="16">
  					<el-row type="flex" class="row-bg" justify="end">
  						<el-col :span="3" class="button" style="padding:6px 0;" >
  							<div @click="refresh"><i class="el-icon-refresh"></i><span>换一批</span>
  							</div>
						</el-col>
  						<el-col :span="2" class="button active" @click="confim()">
  							<div @click="confim">确定</div>
						</el-col>
  						<el-col :span="2" class="button">
  							<div @click="skip">跳过</div>
						</el-col>
  					</el-row>
  				</el-col>
			</div>
			<!-- 内容列表 -->
			<div class="start_advice_content clearfix">
				<el-col :span="12">
					<div class="friends" v-if="friendData.friends.length">
						<p class="kbn-title">发现老友</p> <!-- friends -->
						<advice-follow :data="friendData.friends" :dataName="'friends'"></advice-follow>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="friends" v-if="friendData.likesUsers.length">
						<p class="kbn-title">人气影家</p> <!-- likesUsers -->
						<advice-follow :data="friendData.likesUsers" :dataName="'likesUsers'"></advice-follow>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="friends" v-if="friendData.sameUsers.length">
						<p class="kbn-title">同期影友</p> <!-- sameUsers -->
						<advice-follow :data="friendData.sameUsers" :dataName="'sameUsers'"></advice-follow>
					</div>
				</el-col>
				<el-col :span="12">
					<div class="friends"  v-if="friendData.recommendUsers.length">
						<p class="kbn-title">活跃影家</p> <!-- recommendUsers -->
						<advice-follow :data="friendData.recommendUsers" :dataName="'recommendUsers'"></advice-follow>
					</div>
				</el-col>
			</div>
		</div>
	</div>
		
</template>
<script type="text/javascript">
	import {getRecommendFriend, setSkipRecommend} from '@/api/startApi'
	import {mapState, mapActions} from 'vuex'
	import adviceFollow from '@/components/home/start-adviceFollow-template'
	import {getSsoVerifyTicket} from '@/api/ssoApi'
 	export default {
		data() {
			return {
				friendData: {
					friends: [],
					likesUsers: [],
					sameUsers: [],
					recommendUsers:[]
				},
				route_params: {},
			}
		},
		computed: {
			...mapState([
				'loginData',
				'uuid',
			])
		},
		created() {
			this.initRecommendFriend()
			this.route_params = this.$route.params;
		},
		components: {
			adviceFollow
		},
		methods: {
			refresh() {
				this.initRecommendFriend();
			},
			confim() {
				this.initRecommendFriend();
			},
			skip() {
				console.log(this.route_params);
				let params = {
					moduleKbn: '1',
					verifyCode: this.route_params.verifyCode,
					token: this.loginData.accessToken,
					userId: this.loginData.userId,

				}
				setSkipRecommend(params).then(res => {
					console.log(res)
					let logindata = this.loginData
					logindata.registerStatus = res.registerStatus;
					this.setSsoTicket(res.ticket);
					this.setLoginData(logindata);
					let params = {
						ticket: res.ticket,
					}
					//this.$router.push({name: 'home'})
					getSsoVerifyTicket(params).then(res => {
						if(res.code == 1) {
							this.$router.push({name: 'home'})
						}
					}).catch(err => {
						console.log(err);
					});
					
				}).catch(err => {
					console.log('err')
				})
			},
			initRecommendFriend() {
				let params = {
					groupUserCount: 20,  // 推荐关注用户每组取得数
					token: this.loginData.accessToken,
					userId: this.loginData.userId,
					userPhotoCount: 3,  // 关注用户照片数
					uuid: this.uuid,
				}
				getRecommendFriend(params).then(res => {
					this.friendData = res;
					console.log( res.friends.length)
				}).catch( err => {
					console.log(err);
				})
			},
			...mapActions([
				'setSsoTicket',
				'setLoginData',
			]),
		}
	}
</script>
<style scoped lang="scss">
	.start_advice{
		padding: 0 30px;
		margin: 0 auto;
		max-width: 1168px;
		background-color: #f5f5f5;
		.title{
	    	color: #505050;
    		font-size: 18px;
    		text-align: left;
    		padding: 10px 15px;
		}
		.button{
		    color: #333333;
			background-color: #ffffff;
			display: inline-block;
		    margin-bottom: 0;
		    font-weight: normal;
		    text-align: center;
		    vertical-align: middle;
		    touch-action: manipulation;
		    cursor: pointer;
		    white-space: nowrap;
		    padding: 6px 24px;
		    font-size: 14px;
		    border-radius: 4px;
	        border: 1px solid #e4e4e4;
	        margin-right: 5px;
	        width: 84px;
	        float: right;
	        &.active{
        	    color: #ffffff;
			    background-color: #b10a14;
			    border-color: #990911;
	        }
	        &:hover{
        	    color: #333333;
			    background-color: #e6e6e6;
			    border-color: #adadad;
	        }
	        &.active:hover{
	        	color: #ffffff;
			    background-color: #81070f;
			    border-color: #5f050b;
	        }
	        
		}
		.start_advice_content{
		    line-height: 350%;
		    font-size: 17px;
		    text-align: left;
		    background-color: #fff;
		}
	}
</style>