<template>
	<div class="app_download">
		<div class="qrcode_top">
			<img src="./../../assets/img/ios_qrcode.png">
			<img src="./../../assets/img/ios_link.png" @click="loadIos()">
		</div>
		<div class="qrcode_bot">
			<img src="./../../assets/img/android_qrcode.png">
			<img src="./../../assets/img/android_link.png" @click="loadAndroid()">
		</div>
	</div>
</template>
<script type="text/javascript">
	import {mapState} from 'vuex'
	export default {
		data() {
			return {

			}
		},
		created() {
		},
		computed:{
			...mapState([
				'initLinkDownload',
			])
		},
		methods:{
			loadIos() {
				window.open(this.initLinkDownload.appDownloadIos,'_blank');
			},
			loadAndroid() {
				window.open(this.initLinkDownload.appDownloadAndroid, '_blank')
			}
		}
	}
</script>
<style scoped lang="scss">
	.app_download{
		color:red;
		float: left;
		height:232px;
		width: 460px;
		padding:20px 0 0 40px;
		text-align:left;
	    vertical-align: top;
    	position: relative;
	    background-color: #fff;
	}
	.qrcode_top,.qrcode_bot{
		display:inline-block;
		img{
			width:120px;
			display:block;
			&:nth-of-type(1){
				margin-bottom:10px;
			}
			&:nth-of-type(2){
				cursor: pointer;
			}
		}
	}
	.qrcode_bot{
		margin-left:25px;
	}
</style>