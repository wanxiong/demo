<template>
	<transition  name="slide">
		<div class="detail">
			
		</div>
	</transition>
</template>
<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		},
		created() {

		}
	}
</script>
<style scoped>
	.slide-enter-active , .slide-leave-active{
		opacity: 1;
	}
	.slide-enter, .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
	  transform: translateX(100%)
	}
	.detail{
	  position: fixed;
	    left: 0;
	    top: 0;
	    bottom: 48px;
	    z-index: 30;
	    width: 100%;
	    background-color: red;
	    transition: all .3s linear;
	}
</style>