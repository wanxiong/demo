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
//axios.defaults.baseURL = 'http://www.beamzhou.com/';
//http://www.beamzhou.com/api/auth/login
Vue.config.productionTip = false

//在请求发出之前进行一些操作
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token');
  if(token) config.headers['Authorization'] = token;
  
	return config
})
axios.interceptors.response.use(response =>{
   let r = response.data;
   if(r.code == 401) {
    Mint.Toast({
      message: `没有权限`,
      iconClass: 'icon icon-success'
    });
     localStorage.removeItem('token');
     router.push({name: 'login'});
   }
	return response;
}, err => {
  if (err.response.data.code == 401) {
   
    if(err.response.config.url.indexOf('api/product/incr') != -1) {
    } else{
       Mint.Toast({
        message: `请登录`,
        iconClass: 'icon icon-success'
      });
      localStorage.removeItem('token');
      router.replace('/login');
    }
  } else {
    Mint.Toast({
      message: `服务器异常`,
      iconClass: 'icon icon-success'
    });
    localStorage.removeItem('token');
    //router.replace('/login');
  }
  return Promise.resolve(err.response)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
