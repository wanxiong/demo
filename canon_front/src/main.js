// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'  //导入路由
import store from './vuex'    //导入vuex
import './validator'  //导入表单验证
import axios from './interceptor/http'  //拦截器
import './filters'     //过滤器
import VueCookies from 'vue-cookies'  //导入
import ElementUI from 'element-ui' 
import VueLazyload from 'vue-lazyload'  //加载图片懒加载

import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/index'  //导入css
// import "./commonCss/animate.css"
// import "./commonCss/reset.css"

//安装
Vue.use(VueCookies)
Vue.use(ElementUI);
Vue.use(VueLazyload, {
	//error: 'dist/error.png',//这个是请求失败后显示的图片
	loading: require('@/assets/img/img_load.png'),//这个是加载的loading过渡效果
	try: 2, // 这个是加载图片数量,
    // filter: {
    //   webp ({ src }) {
    //   	  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')
    //   	  console.log(src)
    //       return src
    //   }
    // }
  listenEvents: 'wheel',
})
Vue.config.productionTip = false
Vue.prototype.$axios = axios;



let vue = new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

export default vue;