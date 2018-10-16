<template>
	<ul>
	<li class="clearfix" v-for="dataItem,index in data">
		<el-row :gutter="20">
			<el-col :span="6" class="icon_ava" >
				<span @click="choose($event, index, dataName)" index="1">
					<i class="el-icon-success"></i>
				</span>
				<div 
				:class="'user-icon-stage'+ dataItem.stageId"
				:style="{background: '#2f2f2f url('+ dataItem.userPhotoUrl+ '?stripmeta=0&imageView&type=jpg&thumbnail=130y80&axis=5) no-repeat center/cover'}">
				</div>
			</el-col>
			<el-col :span="17" class="init_col_pad">
				<div class="repeat_img">
					<!-- <div v-for="photoList in dataItem.photo"  class="" v-lazy:background-image="photoList.photoUrl"
					style="background-size: cover;background-position: center;"></div> -->
					<div 
					v-for="photoList in dataItem.photo" 
					:style="{background: '#2f2f2f url('+ photoList.photoUrl+'?stripmeta=0&imageView&type=jpg&thumbnail=130y80&axis=5) no-repeat center/cover'}">
					</div>
					<!-- 无任何图片的时候，显示特殊图片 -->
					<div v-if="!dataItem.photo.length" style="padding-top: 0;">
						<img src="./../../assets/img/friends-noimage.jpg" style="width: 100%;display: block;">
					</div>
					
				</div>
				<div class="sub_title" v-text="dataItem.nickName"></div>
				<div class="sub_text omg" v-text="dataItem.description"></div>
			</el-col>
		 </el-row>
	</li>
	</ul>
</template>
<script type="text/javascript">
	export default {
		data() {
			return {

			}
		},
		props:{
			data: {
          		type: Array,
          		default: [],
          	},
          	dataName: {
          		type: String,
          		default: '',
          	}
		},
		methods: {
			/* 点击小图标的icon
			* @params {Event e} 		触发的event事件
			* @params {Number index}    当前点击的数据列表
			* @params {String dataName} 数据名字
			*/ 
			choose(e, index, dataName) {
				if(e.target.nodeName.toLowerCase() == 'i') {
					e.target.style.display = 'none';
					e.target.parentNode.setAttribute('index',2);
				} else if(e.target.nodeName.toLowerCase() == 'span') {
					e.target.children[0].style.display = 'block';
					e.target.setAttribute('index',1);
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	ul{
		padding: 5px;
	}
	li{
		padding-top: 10px;
		height: 148px;
		overflow: hidden;
	}
	.repeat_img{
    	display: flex;
		> div{
			width: 30%;
			margin-right:3%;
    		padding-top: 19%;
    	}
    }
    .kbn-title{
    	border-bottom: solid 1px #d8d8d8;
	    color: #737373;
        text-indent: 15px;
        line-height: 50px;
			padding-top: 15px;
    }
    .sub_title{
	    font-weight: bold;
		color: black;
		white-space: nowrap;
	    text-overflow: ellipsis;
	    margin: 0px;
	    font-size: 14px;
	    line-height: 30px;
    }
    .sub_text{
	    color: #737373;
	    font-size: 14px;
	    line-height: 30px;
	    width: 80%;
    }
    .repeat_img{
    	display: flex;
		> div{
			width: 30%;
			margin-right:3%;
    		padding-top: 19%;
    	}
    }
    .init_col_pad{
    	padding-top: 20px;
    }
    .friends {
    	margin-bottom: 10px;
		ul{
    		padding: 5px;
    	}
    	li{
    		padding-top: 10px;
    		height: 148px;
    		overflow: hidden;
    	}
    }
    .icon_ava{
    	overflow: hidden;
    	display: flex;
    	justify-content: center;
    	padding-top: 20px;
    	> span{
    		width: 12px;
    		height: 12px;
    		background-color: #fff;
    		border: 4px solid #afa7a7;
    		margin-right: 10px;
    		border-radius: 50%;
    		position: relative;
    		margin-top:40px;
    	}
    	> div{
    		width: 70px;
    		height: 70px;
    		border-radius: 50%;
    	}
    	.el-icon-success{
		    font-size: 20px;
		    color: #90C33C;
		    position: absolute;
		    top: 50%;
		    left: 50%;
		    transform: translate(-50%,-50%);
    	}
    }
</style>