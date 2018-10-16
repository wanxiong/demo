<template>
	<div class="wrapper" ref="wrapper">
		<slot></slot>
	</div>
</template>
<script type="text/javascript">
	import BScroll from 'better-scroll'

	export default {
		data() {
			return {

			}
		},
		props :{
			/**
	         * 1 滚动的时候会派发scroll事件，会截流。
	         * 2 滚动的时候实时派发scroll事件，不会截流。
	         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
	        */
			probeType: {
		        default: 2
	    	},
	    	/* 是否点击 */
		    click: {
		        type: Boolean,
		        default: true
		    },
		    /* 是否开启滚动条 */ 
		    scrollbar: {
		    	type: Boolean,
		    	default: false,
		    },
		    /* 是否开启鼠标滚动 */
		    mouseWheel: {
		    	type: Object,
		    	default: () => {
		    		return {
		    			speed: 20,
						invert: false,
						easeTime: 1000,
		    		}
		    	},
		    },
		    /* 是否派发滚动事件 */
		    listenScroll: {
		        type: Boolean,
		        default: false
		    },
		    /* 默认的数据 */
		    data: {
		        type: Array,
		        default: null
		    },
		    /*  是否派发滚动到底部的事件，用于上拉加载 */
		    pullup: {
		        type: Boolean,
		        default: true
		    },
		    /* 是否派发顶部下拉的事件，用于下拉刷新 */
	        pulldown: {
	        	type: Boolean,
	       		default: true
	        },
	        /*  是否派发列表滚动开始的事件 */
		    beforeScroll: {
		        type: Boolean,
		        default: false
		    },

		    /* 当数据更新后，刷新scroll的延时。*/
		    refreshDelay: {
		        type: Number,
		        default: 20
		    },
		    /* 是否开启弹力效果 */
		    bounce: {
		    	type: Boolean,
		    	default: false
		    },
		    /* 开启上拉加载  */
		    pullUpLoad: {
		    	type: Object,
		    	default: () => {
	    			return {
		    			threshold: 20,
		    		}
		    	}
		    },
		    /* 触发时机：滚动结束。 */ 
		    scrollEnd: {
		    	type: Boolean,
		    	default: false,
		    }

		},
		methods: {
			initScroll() {
				let wrapper = this.$refs['wrapper'];
				//节点不存在的时候  返回不初始化
				if( !wrapper ){
					return ;
				}
				console.log(this.pullUpLoad)
				this.scroll = new BScroll(wrapper,{
					probeType : this.probeType,
					click     : this.click,
					bounce    : this.bounce,
					pullUpLoad: this.pullUpLoad,
					scrollbar : this.scrollbar,
					mouseWheel: this.mouseWheel,

				})
				//是否绑定事件
				if( this.listenScroll ) {
					let _this = this
					_this.scroll.on('scroll',(pos) => {
						//pos 上拉加载 对应的Y轴值为负数   0 ~ 负无穷
						//pos 下拉更新  对应的值为正数     0 ~ 正无穷 
 						_this.$emit('scroll',pos);
					})
				}
				//是否上啦加载更更多
				if( this.pullup ) { 
					this.scroll.on('pullingUp', (pos) => {
						// this.scroll.finishPullUp();
						this.$emit('pullingUp');
					})
				}
				//监听滚动结束
				if(this.scrollEnd) {
					let _this = this
					_this.scroll.on('scrollEnd',(pos) => { //滚动结束
						//事件传递给父级
						_this.$emit('scrollEnd',pos);
					})
				}
				//是否添加在滚动之前增加事件
				if( this.beforeScroll ) {
					let _this = this
					_this.scroll.on('beforeScroll' , () => {
						_this.$emit('beforeScroll')
					})
				}
			},
			enable() {
  				// 代理better-scroll的enable方法
				this.scroll &&　this.scroll.enable()
			},
			disable() {
				 // 代理better-scroll的disable方法
				this.scroll &&　this.scroll.disable()
			},
			refresh() {
				// 代理better-scroll的refresh方法
				this.scroll &&　this.scroll.refresh()
			},
			scrollTo() {
				// 代理better-scroll的scrollTo方法
				//scrollTo(x, y, time, easing)
				this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
			},
			finishPullUp() {
				//代理better-scroll的finishPullUp方法
				this.scroll && this.scroll.finishPullUp();
			},
			scrollToElement() {
				// 代理better-scroll的scrollToElement方法
				//scrollToElement(el, time, offsetX, offsetY, easing)
				this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
			}
		},
		mounted() {
			this.$nextTick(() => {
				this.initScroll()
			})
		},
		watch: {
			data() {
				setTimeout(() => {
		          this.refresh()
		        }, this.refreshDelay)
			}
		}
	}
</script>
<style lang="scss" scoped>
	.wrapper{
		position:absolute;
		top: 0;
		width: 100%;
		height: 100%;
		// overflow-y: auto;
		overflow: hidden;
		z-index: 10;
	}
</style>