<template>
	<div class="max-con">
	    <div class="panel-left-part  pull-left contain">
	    	<div class="nav-pills clearfix">
		        <ul class="nav nav-stacked ">
		            <li>
		            	<router-link tag="a" to="/start/regist">注册影家</router-link>
		            </li> 
		            <li>
		            	<router-link tag="a" :to="{path:'/start/login',params:links}">影家登录</router-link>
		            </li>
		            <li>
		            	<router-link tag="a" :to="{name:'start.appDownload',params:links}">APP下载</router-link>
		            </li>
		        </ul>
		        <!-- ui -->
		        <router-view></router-view>
		        <!-- 注册规则 -->
		        <div class="register">
		        	<div>
		        		<img src="./../../assets/img/product_bg.png">
		        	</div>
		        	<div class="register_award">
		        		<p>具体活动规则请登陆活动网站 http://dyj88c.lofter.com</p>
		        		<p>佳能（中国）热线电话 4006-222666转1</p>
		        		<div>
		        			<span class="check_yes" v-if="isShow" @click="checkImg('yes')"></span>
		        			<span class="check_no" v-if="!isShow" @click="checkImg('no')"></span>
		        			同意<span class="red_rule" @click="openRule()">活动规则</span>
		        		</div>
		        	</div>
		        	<!-- 点击活动规则的文字 start-->
		        	<div class="rule-box"  v-show="openrule">
		        		<div >
			            <div class="activity_rules">
			                <div class="rule-title">
			                    <h5 class="title">“大影家”注册有礼活动规则</h5>
			                    <img class="rule-close" src="./../../assets/img/close.png" alt="" width="20" height="20" @click="closeRule()">
			                </div>
			                <div class="place-box">
			                    <div class="model_box">
			                        <div class="model_item" style="width: 95%">

			                            <div class="model_scroll">
			                                <div class="sub-title">一、活动细则</div>

			                                <div class="default-text">
			                                    2018年1月1日到2018年12月31日期间（简称“活动期间”），凡在中华人民共和国大陆地区(香港、澳门及台湾地区除外)注册成为“大影家”用户（简称“注册用户*”），即有机会参与本次抽奖活动。该抽奖活动每季度进行一次，本年度共计4次。奖品数量共计220件，每季度产生55件（活动期间每季度产生55名中奖者，其中奖概率约为0.275%）。
			                                </div>

			                                <div class="pd15">
			                                    <span style="font-size: 12px; font-style: italic;">注：本次活动中奖概率计算方式：礼品数/预计季度注册人数。最终中奖概率数值会随实际注册情况有所有变动。</span>
			                                </div>

			                                <div>
			                                    奖品设置具体如下：
			                                </div>

			                                <div><span class="default-strong">一等奖：</span>RIMOWA行李箱(颜色以实物为准)</div>

			                                <div><span class="default-strong">系列：</span>Salsa air</div>

			                                <div><span class="default-strong">型号：</span>820.53.25.4</div>

			                                <div><span class="default-strong">尺寸：</span>21英寸</div>

			                                <div><span class="default-strong">主要材质：</span>聚碳酸酯</div>

			                                <div><span class="default-strong">市场参考价值：</span>人民币4800元/个</div>

			                                <div class="pgb15"><span class="default-strong ">奖品数量：</span>每季度1个，共计4个</div>

			                                <div><span class="default-strong">二等奖：</span>AUPRES/欧珀莱烈日防晒隔离液</div>

			                                <div><span class="default-strong">规格：</span>60ml</div>

			                                <div><span class="default-strong">市场参考价值：</span>人民币210元/个</div>

			                                <div class="pgb15"><span class="default-strong">奖品数量：</span>每季度4个，共计16个</div>

			                                <div><span class="default-strong">三等奖：</span>佳能相机帆布袋</div>

			                                <div><span class="default-strong">尺寸：</span>34cm（宽）×39cm（高）×13cm（厚)</div>

			                                <div><span class="default-strong">主要材质：</span>帆布+涤纶</div>

			                                <div><span class="default-strong">市场参考价值：</span>人民币168元/个</div>

			                                <div class="pgb15"><span class="default-strong">奖品数量：</span>每季度50个，共计200个</div>

			                                <h5> 1．“大影家”注册：</h5>
			                                <div class="line-width"> 1) 2018年1月1日至2018年12月31日活动期间，在“大影家”网站（
			                                    <span style="color: #CF1011;">http://dyj88c.lofter.com/</span>）或“大影家”APP进行注册的。
			                                </div>
			                                <div class="line-width"> 2) 仔细阅读并确认同意本活动规则后，点击“同意”按钮进入下一步注册程序。</div>
			                                <div class="pgb15"></div>

			                                <h5> 2．抽奖方式及抽奖结果公布方式：</h5>
			                                <div class="line-width" style="text-indent: 0; text-align: justify; word-break: break-all; margin-left: 23px;">
			                                    主办方将分别于2018年4月1日至4月29日、2018年7月1日至7月30日、2018年10月1日至10月30日、2019年1月1日至1月31日（以上各期间统称“活动抽奖期间”）内，主办方将统一收集注册用户信息，信息收集完毕后，主办方将采用电脑随机抽选的方式从满足上述条件的注册用户中抽选中奖者，由北京市长安公证处进行公证抽奖，产生中奖名单（每位注册用户仅有一次抽奖机会）。按前述规则完成抽奖程序的，且主办方对中奖者信息核实无误后，分别于2018年4月30日，2018年7月31日，2018年10月31日，2019年1月31日在活动网站（<span style="color: #CF1011;">http://dyj88c.lofter.com/</span>）上公布中奖者名单。
			                                    中奖者名单公布后，主办方将以手机短信形式通知中奖者并收集包括但不限于邮寄地址等相关信息（简称“个人信息”），本次活动事务局负责人即向中奖者邮寄发送奖品。
			                                </div>
			                                <div class="pgb15"></div>

			                                <h5> 3．奖品发放方式：</h5>
			                                <div class="line-width" style="text-indent: 0; text-align: justify; word-break: break-all; margin-left: 23px;">
			                                    奖品自公布期间（2018年4月30日-2018年5月31日，2018年7月31日-2018年8月31日，2018年10月31日-2018年11月30日，2019年1月31日-2019年2月28日）开始由本次活动事务局负责人向中奖者邮寄发送奖品。超过上述期限未提供个人信息的中奖者，视为中奖者放弃领取奖品。
			                                </div>
			                                <div class="pgb15"></div>

			                                <div class="sub-title"> 二、注意事项</div>
			                                <div class="line-width"><strong>1.</strong> 本活动规则详见本活动指定官网：</div>
			                                <div class="line-width1"><span style="color: #CE0908">http://dyj88c.lofter.com/</span></div>
			                                <div class="line-width1" style="font-size: 12px;">
			                                    注：本活动详情可拨打佳能全国统一热线电话<a href="tel:4006-222666" style="color: #CE0908">4006-222666</a> 转1（工作时间：周一至周五：08:30-20：00/周六、周日：9:00-18：00）进行咨询。
			                                </div>

			                                <div class="line-width"><strong>2.</strong> 凡参加本活动的注册用户即视为接受并同意活动规则的各项条款。</div>
			                                <div class="line-width"><strong>3.</strong> 本活动所有奖品均不得向活动主办方申请兑换现金。</div>
			                                <div class="line-width"><strong>4.</strong> 本活动奖品图片仅为示意，请以主办方提供的实物为准。</div>
			                                <div class="line-width">
			                                    <strong>5.</strong>
			                                    注册用户所填写的个人信息必须真实准确有效，如果因填写错误、填写不完整、信息变更等原因造成联系不畅而导致的后果（包括但不限于未能最终领取奖品），由注册用户自行承担。
			                                </div>
			                                <div class="line-width">
			                                    <strong>6.</strong>
			                                    主办方对注册用户提交的有关手机、地址等个人信息将仅使用于处理本规则下活动相关事宜的必要范围内。如果注册用户不能提供完整准确的个人信息时，主办方将不予发送奖品。主办方将根据适当的安全政策对相关个人信息进行管理。除以下情形外，主办方在没有取得注册用户同意的前提下，不会向第三方公开、提供相关个人信息：
			                                </div>
			                                <div class="indent50" style="text-indent: 0px; margin-left: 30px; text-align: justify;"> ① 为了实施上述目的，向委托业者进行必要委托的情形；</div>
			                                <div class="indent50"> ② 法律要求的情形；</div>
			                                <div class="indent50" style="text-indent: 0px; margin-left: 30px; text-align: justify;"> ③ 本活动结束后，主办方将以安全的方式对相关个人信息进行删除。</div>
			                                <div class="line-width"><strong>7.</strong> 未成年的注册用户申请参加本次活动的，提交材料时视为已经获得其法定监护人的同意，同意参加活动并遵守本活动规则。</div>
			                                <div class="line-width">
			                                    <strong>8.</strong>
			                                    注册用户、中奖者应遵守中华人民共和国大陆法律法规、公序良俗，保证其提供的信息均真实、有效、准确、完整，且不应侵犯包括主办方的他人的合法权益。注册用户、中奖者违反上述规则或/和承诺的，应被视为不具备活动参加和中奖资格。
			                                </div>
			                                <div class="pgb15"></div>

			                                <div class="sub-title"> 三、其他条款：</div>
			                                <div class="line-width"><strong>1.</strong> 本活动由佳能（中国）有限公司主办，由北京电通广告有限公司承办。</div>
			                                <div class="line-width"><strong>2.</strong> 活动全程由北京市长安公证处公证。</div>
			                                <div class="line-width"><strong>3.</strong> 本次活动未尽事宜，由佳能（中国）有限公司依诚信原则补充。</div>
			                                <div class="pgb15"></div>

			                                <div style="color: #CC0102; font-size: 16px; font-weight: bold; float: right"> 佳能（中国）有限公司</div>
			                                <div style="color: #CC0102; font-size: 16px; font-weight: bold; clear: both; float: right">
			                                    2018年1月1日
			                                </div>
			                            </div>

			                        </div>
			                    </div>
			                </div>
			            </div>
			        </div>
		        	</div>
		        	<!-- 点击活动规则的文字 end-->
		        </div>
	        </div>
	    </div>
	    <div v-bind:src="bgImg" class="bgImg" v-bind:style="{ 'background' : 'url('+bgImg+') no-repeat center/cover' }"></div>
	    <!-- 弹出层 同意 -->
		<loginText :showHasPhone="showHasPhone" @confim="confim"></loginText>

	</div>
</template>
<script type="text/javascript">
	import {darwin_initialize, darwin_splash_image_pc} from '@config/config'
	import {getDownloadLink } from '@api/startApi'
	import {mapState, mapActions} from 'vuex'
	import loginText from '@/components/modal/login_text'
	import Bus from '@/utils/bus'

	export default {
		data() {
			return {
				bgImg: '',
				links: {},
				isShow: false,
				openrule: false,
				showHasPhone: false, //账号已注册的弹出层
			}
		},
		created() {
			this.initializeImage();
			this.initDownloadLink();
			this.wacthModalHasPhone();
		},
		components: {
			loginText,
		},
		computed:{
			...mapState([
				'initLinkDownload',
			])
		},
		methods:{
			//监听注册页面发现用户已存在，派发的事件
			wacthModalHasPhone() {
				Bus.$on('openHasPhone', (data) => {
					this.showHasPhone = true ;
				})
			},
			initializeImage() {
				this.$axios.post(darwin_splash_image_pc, {}).then( res => {
					this.bgImg = res.results.url
				}).catch( err => {
					console.log(err)
				})
			},
			initDownloadLink() {
				getDownloadLink({version: '1.0.0'}).then((res) => {
					this.links.android = res.results.appDownloadAndroid;
					this.links.ios = res.results.appDownloadIos;
					this.setInitLinkDownload(res.results);
				}).catch((err) => {
					console.log(err)
				})
			},
			checkImg(choose) {
				if(choose == 'yes') {
					this.isShow = false;
				} else if (choose == 'no') {
					this.isShow = true;
				}
			},
			//跳转至登录界面
			confim(data) {
				this.showHasPhone = false ;
				this.$router.push({name: 'start.login'});
			},
			closeRule() {
				this.isShow = true;
				this.openrule = false;
			},
			openRule() {
				this.openrule = true;
			},
			...mapActions([
				'setInitLinkDownload'
			])
		}
	}	
</script>
<style scoped lang="scss">
	.bgImg{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		z-index: 10;
	}
	.max-con{
		height: 100%;
		//background:#fff url('./assets/img/1.jpg')no-repeat center;
		.contain{
			position: relative;
			z-index: 99;
			height: 100%;
			width: 100%;
		}
	}
	.nav-pills{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
	    box-shadow: -1px -1px 2px rgba(0,0,0,.1);
	    background:url('./../../assets/img/header_color_line.jpg') repeat-x left bottom;
	    width: 1050px;
	}
	.nav-pills a {
		display: inline-block;
		padding: 30px 40px;
		font-size: 18px;
		color: #fff;
		background-color: rgba(0, 0, 0, 0.4);
		width:100px;
		text-align:center;
	}
	a.router-link-active{
		background-color: #fff;
		color: #3b89b9;
	}
	.nav-stacked{
	    float: left;
	}
	.register{
		display: table-cell;
		background-color: #69A2D6;
		width: 450px;
		height: 240px;
    	vertical-align: top;
    	position: relative;
		> div{
			> img{
				width: 70%;
				display:block;
				margin: 20px auto;
			}
		}
		
	}
	.register_award{
	    position: absolute;
	    width: 100%;
	    bottom: 0;
	    left: 0;
	    background-color: #E5A755;
	    color: #fff;
	    font-size: 12px;
	    text-indent: 16px;
	    line-height: 18px;
	    text-align: left;
	    div{
    	    position: absolute;
		    right: 0;
		    display: inline-block;
		    width: 120px;
		    height: 100%;
		    top: 0;
		    background-color: #D1E6F4;
		    text-align: center;
		    line-height: 45px;
		    color: #474B4E;
		    font-size: 12px;
	    }
	}
	.check_yes{
		background: url('./../../assets/img/confirm.png') no-repeat center/cover;
		width: 12px;
		height: 12px;
		display: inline-block;
	}
	.check_no{
		background: url('./../../assets/img/confirm-grey.png') no-repeat center/cover;
		width: 12px;
		height: 12px;
		display: inline-block;
	}
	.red_rule{
		color: red;
		text-decoration: underline;
		cursor:pointer;
	}
	.rule-box{
		height: 100%;
		overflow-y: scroll;
		position:absolute;
		height: 100%;
		display:block;
		width:100%;
		top:0;
		left:0;
		z-index:9999;
		background-color: #fff;
		padding: 10px;
	    box-sizing: border-box;
	    text-align: left;
	    .title{
	    	text-align:center;
	    }
	    .rule-title{
	    	> img{
	    		position:absolute;
    		    right: 10%;
    			top: 5%;
	    	}
	    }
	}
</style>
<style type="text/css">
	.el-icon-loading{
		font-size: 70px !important;
		color: #fff !important;
	}
	.el-loading-text{
		font-size: 20px !important;
		color: #fff !important;
	}
</style>
