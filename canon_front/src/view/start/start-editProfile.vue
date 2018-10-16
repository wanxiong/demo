<template>
	<div class="edit_box">
		<div class="edit_title">输入我的信息</div>
		<!-- 输入的内容部分 -->
		<div class="edit_content panel-body">
			<!-- 头像部分 -->
			<div class="head_img clearfix">
				<div class="default_img">
					<img class=""
						v-if="!previewUrl" 
						key="default_img" 
						src="./../../assets/img/no-avatar-default.jpg" 
						width="96" 
						height="96" />
					<div 
						v-if="previewUrl" 
						key="upload_img" 
						:style="{background:'url('+previewUrl+') no-repeat center/cover',height: '96px'}"
						>
						</div>
					<el-progress class="circle"
						v-if="percentage"
						:width="96"
						type="circle"
						:status="progressStatu"
						:stroke-width="3"
						:percentage="percentage">
					</el-progress>
				</div>
				<div class="default_img_txt">
					<span class="ng-binding">你可以上传jpg格式的文件，文件大小不能超过20M。</span><br>
					<div class="cm-fileUpload">
					    <!-- <span>上传头像</span> -->
						<el-upload
							ref="upload"
							accept="image/jpeg,image/jpg,image/png"
							:action="uploadUrl"
							:auto-upload="autoUpload"
							:on-change="uploadChange"
							:on-success="uploadOk"
							:on-error="uploadErr"
							:on-progress="uploadProgress"
							:before-upload="uploadBefore"
							:show-file-list="false"
							:limit="1"
							:data="uploadData"
							multiple
							>
							 <el-button size="small" type="primary">点击上传</el-button>
						</el-upload>
						<!-- <el-dialog :visible.sync="dialogVisible">
							<img width="100%" :src="dialogImageUrl" alt="">
						</el-dialog> -->
					</div>
					
				</div>
			</div>
			<!-- 赢家名号 -->
			<div class="input_name clearfix">
				<p><span>*</span>影家名号：</p>
				<div><input type="text" name="nickname" v-validate="'required'" placeholder="我的昵称（20字以内）" maxlength="20" v-model="userProfile.nickName">
				</div>
			</div>
			<!-- div error -->
			<div class="show_err"><span v-show="errors.has('nickname')" class="mobile_err">{{ errors.first('nickname')}}</span></div>
			<!-- 简介 -->
			<div class="input_name clearfix">
				<p>简介：</p>
				<div>
					<textarea placeholder="做个自我介绍吧（50字以内）例：一双乐于发现的眼睛，一颗执着于摄影的心，钟情马格南。热爱国家地理。这就是我，随手记录，随心留影" 
					maxlength="50" v-model="userProfile.description"
					></textarea>
				</div>
			</div>
			<!-- 性别 -->
			<div class="input_name clearfix init_radio ">
				<p>性别：</p>
				<div>
					<p><input type="radio" name="sex" v-model="userProfile.sex" value="1">男</p>
					<p><input type="radio" name="sex" v-model="userProfile.sex" value="2">女</p>
				</div>
			</div>
			<!-- 生日 -->
			<div class="input_name clearfix init_data ">
				<p>生日：</p>
				<div>
					<el-date-picker
				      v-model="userProfile.birthday"
				      type="date"
				      format="yyyy/MM/dd"
				      placeholder="选择日期">
				    </el-date-picker>
				</div>
			</div>
			<!-- 我的所在地 -->
			<div class="input_name clearfix provice_where">
				<p>我的所在地：</p>
				<div>
					<el-select v-model="userProfile.provinceCd" placeholder="请选择所在地"
					@change="change">
						<el-option
						v-for="item in provice"
						:key="item.code"
						:label="item.name"
						:value="item.code">
						</el-option>
					</el-select>
					<!-- 二级 -->
					<div style="float: right;width: 100px;">
						<el-select v-model="userProfile.areaCd" placeholder="---">
							<el-option
							v-for="item in proviceCity"
							:key="item.code"
							:label="item.name"
							:value="item.code">
							</el-option>
						</el-select>
					</div>
				</div>
			</div>
			<!-- 邮箱 -->
			<div class="input_name clearfix  ">
				<p>邮箱：</p>
				<div>
					<input type="text" v-validate="'email'" name="email" placeholder="xxxx@bb.cc" v-model="userProfile.email">
				</div>
			</div>
			<!-- div error -->
			<div class="show_err"><span v-show="errors.has('email')" class="mobile_err">{{ errors.first('email')}}</span></div>
		</div>
		<!-- 保存 -->
		<div class="save_btn input_name">
			<button @click="save">保存</button>
		</div>
	</div>
</template>
<script type="text/javascript">
	import {getProvince, setProfile} from '@/api/startApi'
	import {mapState, mapActions} from 'vuex'
	import {getGenTokenParam, getUploadUrl, getImageUrl} from '@/utils/lofterCfg'
	import {getLofterParams} from '@/api/commonApi'
	import {CUSTOM_upload} from '@/config/custom'
	export default {
		data() {
			return {
				route_params: {},
				provice: [],
				a:'',
				area: [],
				proviceCity: [],
				dialogImageUrl: '',
        		dialogVisible: false,
        		progressStatu: null, //上传状态
        		percentage: 0,
        		previewUrl: '',//回显图片URL
        		uploadUrl: '', //上传图片对应的URL地址
        		uploadData: {}, //上传图片携带的参数
        		autoUpload: false, //自动上传图片  
				userProfile: {
					provinceCd: '',
					areaCd: '',
					birthday: '',
					description: '',
					nickName: '',
					sex: '',
					photoUrl: '',
					fullUrl: '',
				},
			}
		},
		computed:{
			...mapState([
				'loginData',
				'uuid',
			])
		},
		created() {
			this.initProvince();
			this.route_params = this.$route.params;
		},
		methods: {
			initProvince() {
				let params = {
					token: this.loginData.accessToken,
					userId: this.loginData.userId,
				}
				getProvince(params).then(res => {
					this.provice = res.province;
					this.area = res.area;
					this.setAreaList(res);
				}).catch( err => {
					console.log(err)
				})
			},
			save() {
				this.$validator.validate('nickname').then( result => {
					if(!result) return Promise.reject();
				}).then( res => {
					if(this.previewUrl) {//有图片上传
						this.getLofterParams();
					} else {//无图片上传，直接提交
						let params = {
							token: this.loginData.accessToken,
							userId: this.loginData.userId,
							uuid: this.uuid,
							fullUrl: '',
							photoUrl: '',
						};
						params = Object.assign(this.userProfile, params);
						setProfile(params).then(res => {
							this.$router.push({name :"home.start.adviceFollow",
								params: {
									...this.route_params,
								}
							})
						}).catch(err => {
							//console.log(err);
						})
					}
				}).catch( err => {

				})
			},
			change(val) {
				this.userProfile.provinceCd = val;
				let areaArr = [];
				for( let i = 0 ; i < this.area.length ; i++) {
					if(val == this.area[i].code.substr(0,2)) {
						areaArr.push({
							...this.area[i],
						})
					}
				};
				this.proviceCity = areaArr.concat([]);
			},
			getLofterParams() {
				let params = {
					token: this.loginData.accessToken,
					userId: this.loginData.userId,
					...getGenTokenParam(),
				};
				getLofterParams(params).then( res => {
					this.uploadUrl = getUploadUrl(res.bucket_name);
					let imageUrl = getImageUrl(res.bucket_name, res.object_name)
					console.log()
					this.uploadData = {
						"Object": res.object_name,
						"x-nos-token": res.upload_token,
					}
				}).then( res => {
					this.uploadSubmit();
				}).catch( err => {
					console.log(err)
				})
			},
			uploadOk(response, file, fileList) { //上传文件成功的回调
				this.progressStatu = 'success';
				let params = {
					token: this.loginData.accessToken,
					userId: this.loginData.userId,
					uuid: this.uuid,
					fullUrl: this.previewUrl,
					photoUrl: this.previewUrl,
				};
				params = Object.assign(this.userProfile, params);
				setProfile(params).then(res => {
					this.$router.push({name :"home.start.adviceFollow",
						params: {
							...this.route_params,
						}
					})
				}).catch(err => {
					//console.log(err);
					this.$refs.upload.clearFiles();
					this.progressStatu = null;
					this.percentage = 0;
				})
			},
			uploadErr(err, file, fileList) { //上传文件失败的回调
				this.progressStatu = 'exception';
				this.previewUrl = null;
				
				this.$message.error(CUSTOM_upload.fileUploadErr)
			},
			uploadChange(file, fileList) {
				if(file.status == 'fail') {
					setTimeout( ()=> {
						this.$refs.upload.clearFiles();
						this.progressStatu = null;
						this.percentage = 0;
					},1000)
					return;
				}
				if(file.size >= CUSTOM_upload.fileSize ) {
					this.$message.error(CUSTOM_upload.fileSizeTxt)
					return;
				}
				if(CUSTOM_upload.fileType.indexOf(file.raw.type) == -1) {
					this.$message.error(CUSTOM_upload.fileTypeTxt);
					return;
				}
				this.previewUrl = file.url;
			},
			uploadProgress(event, file, fileList) { //上传进度
				this.percentage = parseInt(event.percent);
			},
			uploadBefore(file) { //上传文件之前
				//console.log('选取文件？')
			},
			uploadSubmit() {
				this.$refs.upload.submit()
			},
			...mapActions([
				'setAreaList',
			]),
		}
	}
</script>
<style scoped lang="scss">
	.edit_box{
		min-height: 600px;
	    padding-left: 15px;
		padding-right: 15px;
		background-color: #f5f5f5;
		box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	}
	.panel-body{
		margin-left:300px;
	}
	.edit_title{
	    color: #505050;
    	font-size: 18px;
    	background-color: #f5f5f5;
		border-color: #dddddd;
	    padding: 10px 15px;
	    border-right: 1px solid #cac8c8;
	    border-left: 1px solid #cac8c8;
	    border-bottom: 1px solid #cac8c8;
	    border-radius: 3px;
	    text-align: left;
        padding: 10px 15px;

	}
	.head_img{
		padding-top: 15px;
		.default_img{
			border-radius: 50%;
			overflow: hidden;
			width: 96px;
			height: 96px;
			display: block;
			float: left;
			position: relative;
			.circle{
				position: absolute;
				top: 0;
				left: 0;
				z-index: 990px;
				width: 100%;
				height: 100%;
			}
		}
		.default_img_txt{
			margin-left:15px;
			float: left;
		    width: 250px;
			text-align: left;
			> span{
				font-size: 14px;
			    font-family: "lucida grande", "lucida sans unicode", lucida, helvetica, "Hiragino Sans GB", "Microsoft YaHei", "WenQuanYi Micro Hei", sans-serif;
    			line-height: 160%;
			}
		}
	}
	.input_name{
		margin-top: 15px;
		font-size: 14px;
		> p {
			float: left;
			width: 96px;
			padding-top: 9px;
			text-align: right;
			span{
				color: red;
				font-size: 20px;
			    vertical-align: text-top;
			    display: inline-block;
			    margin-right: 5px;
			}
		}
		> div{
			float: left;
			margin-left: 15px;
		}
		input,textarea{
			text-rendering: auto;
		    letter-spacing: normal;
		    word-spacing: normal;
		    text-transform: none;
		    text-indent: 0px;
		    text-shadow: none;
		    text-align: start;
		    margin: 0em;
		    font: 400 13.3333px Arial;
   			cursor: text;
   			display: block;
		    width: 300px;
		    height: 34px;
		    padding: 0px 12px;
		    font-size: 14px;
		    line-height: 1.42857143;
		    color: #555555;
		    background-color: #ffffff;
		    background-image: none;
		    border: 1px solid #cccccc;
		    border-radius: 4px;
		    resize:none;
		}
		textarea{
			height: 60px;
			padding: 6px 12px;
			min-height: 65px;
		}
	}
	.init_radio {
		>div {
			margin-top: 9px;
			p {
				float: left;
				margin-right: 10px;
			}
			p:nth-of-type(2){
				margin-right: 0px;
				margin-left: 10px;
			}
		}
		input{
			width: 12px;
			height: 12px;
			display: inline-block;
			margin-right: 10px;
			cursor: pointer;
		}
	}
	.init_data{
		margin-top: 15px;
		> div{
			width: 326px;
			>div{
				width:100%;
				display: block;
			}
		}
	}
	.show_err{
	    padding-left: 111px;
	    text-align: left;
	    color: red;
	    line-height: 24px;
	}
	.provice_where{
		> div{
			width: 326px;
			text-align: left;
		}
	}
	.save_btn{
		button{
			color: #ffffff;
		    background-color: #b10a14;
		    border-color: #990911;
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
		    line-height: 1.42857143;
		    border-radius: 4px;
	        font-family: inherit;
	        display: inline-block;
	        padding: 6px 22px;
	        &:hover{
	        	color: #ffffff;
			    background-color: #81070f;
    			border-color: #5f050b;
	        }
		}
	}
</style>
<style type="text/css" lang="scss">
	.init_data .el-input__inner{
		height: 36px;
	}
	.init_data .el-input__icon{
		line-height: 36px;
	}
	.provice_where{
		.el-input__suffix-inner{
			i{
				color:#555555!important;
			}
		}
		input{
			height: 36px;
        }
		input::-webkit-input-placeholder{
            color:#555555!important;
        }
        input::-moz-placeholder{  
            color:#555555!important;
        }
        input:-moz-placeholder{   
            color:#555555!important;
        }
        input:-ms-input-placeholder{
            color:#555555!important;
        }
	}
	.default_img .el-progress__text{
		color: #fff;
	}
</style>