<template>
	<div id="start_sns_page" class="panel panel-default">
		<div class="panel-heading">
			<h4>注册成功，进入你的大影家世界！</h4>
		</div>
		<div class="panel-body">
			<div class="title">
				<h4>绑定其他社交媒体，快速进入大影家！</h4>
				<p>以后也可设定</p>
			</div>

			<div class="sns-area">
				<div class="social-icon">
					<ul class="list-inline social-icon">
						<li>
							<a href="" ng-click="snsAuthorize('weixin')">
	  							<img alt="" src="./../../assets/img/weixin.png">
	  							<p>微信</p>
							</a>
						</li>
						<li>
							<a href="" ng-click="snsAuthorize('qq')">
	  							<img alt="" src="./../../assets/img/qq.png">
	  							<p>QQ</p>
							</a>
						</li>
						<li>
							<a href="" ng-click="snsAuthorize('weibo')">
	  							<img alt="" src="./../../assets/img/weibo.png">
	  							<p>新浪微博</p>
							</a>
						</li>
						<li>
							<a href="" ng-click="snsAuthorize('lofter')">
	  							<img alt="" src="./../../assets/img/lofter.png">
	  							<p>LOFTER</p>
							</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="panel-footer text-center">
			<button class="btn btn-default btn-skip" @click="skip()">跳过</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
				route_params: {},
			}
		},
		created() {
			console.log(this.$route);
			this.route_params = this.$route.params;
		},
		methods: {
			skip() {
				this.$router.push({name: 'home.start.editProfile',
					params: {
						...this.route_params,
					}
				});
			}
		},
	}
</script>
<style scoped lang="scss">
	#start_sns_page{
	    padding: 50px;
    	min-width: 800px;
    	background-color: #f5f5f5;
    	border: 1px solid transparent;
    	min-height: 600px;
    	border-radius: 4px;
    	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
		.panel-heading{
			background-color: #f5f5f5;
    		border-color: #dddddd;
		    color: #505050;
    		font-size: 18px;
		    padding: 10px 15px;
    		border-bottom: 1px solid transparent;
    		border-top-right-radius: 3px;
    		border-top-left-radius: 3px;
    		h4{
    			text-align: left;
			    font-weight: 200;
    		}
		}
		.panel-body{
			padding: 15px;
			background-color: #fff;
		    padding-top: 60px;
    		padding-bottom: 60px;
    		font-size: 18px;
		    color: inherit;
		    border: 1px solid #e6e6e6;
    		h4{
		      	margin-top: 10px;
    			margin-bottom: 10px;
			    font-weight: 200;
			    color: inherit;
    		}
    		p{
    			font-size: 14px;
    		}
		}
		.social-icon{
		    margin: 10px auto;
		    box-sizing: border-box;
	        color: #737373;
	        ul{
	        	list-style-type: none;
    			color: #8a8a8a;
    			margin: 10px auto;
    			padding-top: 40px;
    			li{
				    display: inline-block;
				    padding-left: 5px;
    				padding-right: 5px;
    				p{	
    					color: #8a8a8a;
					    font-size: 14px;
    				}
    				img{
					    width: 50px;
    					height: 50px;
    				}
    			}
	        }
		}
		.panel-footer{
		    padding: 10px 15px;
		    background-color: #f5f5f5;
		    border-top: 1px solid #dddddd;
		    border-bottom-right-radius: 3px;
		    border-bottom-left-radius: 3px;
		    button{
		    	color: #333333;
			    background-color: #ffffff;
			    min-width: 82px;
			    display: inline-block;
			    margin-bottom: 0;
			    font-weight: normal;
			    text-align: center;
			    vertical-align: middle;
			    touch-action: manipulation;
			    cursor: pointer;
			    background-image: none;
			    border: 1px solid #cccccc;;
			    white-space: nowrap;
			    padding: 6px 12px;
			    font-size: 14px;
			    line-height: 1.42857143;
			    border-radius: 4px;
			    user-select: none;
			    font-size: 14px;
			    &:hover{
			    	color: #333333;
				    background-color: #e6e6e6;
				    border-color: #adadad;
			    }

		    }
		}
	}
</style>