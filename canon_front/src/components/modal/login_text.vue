<template>
	<div class="modal_has_phone">
		<el-dialog
			:visible.sync="showHasPhone"
			width="45%"
			title="提示消息"
			class="has_phone"
			:modal-append-to-body=false
			:close-on-click-modal=false
			:close-on-press-escape=false
			:show-close=false
			>

			<div class="content">您的手机号在佳能体系下<span>已存在</span>，请点击登录</div>
			<button @click="confirm">确定</button>
		</el-dialog>
	</div>	
</template>
<script type="text/javascript">
	export default {
		data() {
			return {
			}
		},
		props: {
          showHasPhone: {
          	type: Boolean,
          	default: false,
          }
        },
		methods: {
			confirm() {
				this.$emit('confim','close');
			}
		}
	}
</script>
<style scoped lang="scss">
	.modal_has_phone{
		width: 300px;
	}
	.has_phone{
		.content{
			font-size: 14px;
		    padding-top: 35px;
		    font-size: 14px;
		    color: #8c8c8c;
		    > span {
		    	color: red;
		    }
		}
		button {
			padding: 8px 30px;
			font-size: 18px;
			color: #ffffff;
    		background-color: #d9534f;
    		border-color: #d43f3a;
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
		    line-height: 1.42857143;
		    border-radius: 4px;
		    -webkit-user-select: none;
		    user-select: none;
	        font-family: inherit;
            text-transform: none;
            text-shadow: none;
            margin-top: 60px;
            &:hover{
        	    color: #ffffff;
    			background-color: #c9302c;
    			border-color: #ac2925;
            }
		}
	}
</style>
<style lang="scss">
	.has_phone{
		.el-dialog__header{
		    background-color: #cb5b6b !important;
		    font-size: 20px;
		    color: #fff;
		    text-align: center;
		    padding: 10px 0;
		    > span{
		    	color: #fff;
		    }
		}
	}
</style>