// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
axios.defaults.withCredentials = true;
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css';
 
Vue.prototype.$http = axios;
axios.defaults.baseURL = 'http://www.dxcqp.com:8083/';

Vue.config.productionTip = false

//在请求发出之前进行一些操作
axios.interceptors.request.use(config => {
	return config
})
axios.interceptors.response.use(response =>{
  // let r = response.data;
  // console.log(r.code, 'code')
  // if(r.code == 403) {
  //   router.push('/passlogin');
  // }
	return response;
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
