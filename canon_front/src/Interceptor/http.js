// 封装请求的api
import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'
import {genAuthCd } from './../utils/apiParams'
import store from '@/vuex/index'
import {CLEARLOGINDATA} from '@/vuex/type'
import Router from '@/router/index'
import {Message, Loading} from 'element-ui'
//import { Indicator } from 'mint-ui';  
//import { Toast } from 'mint-ui'; 

// const postData=JSON.stringify(this.formCustomer);
// 'Content-Type':'application/json'}

// const postData=Qs.stringify(this.formCustomer);//过滤成？&=格式
// 'Content-Type':'application/xxxx-form'}
//开发

axios.defaults.baseURL = process.env.API_HOST;
axios.defaults.timeout = 10000;
//axios.defaults.baseURL = 'http://api.stg-darwin.lofter.com/';
//axios.defaults.baseURL = 'http://20150915.team-lab.cn/api/';
//axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
let loadingInstance ;
// http request 请求拦截器，有token值则配置上token值
axios.interceptors.request.use(
    config => {
        config.data.authCd = genAuthCd(config.url,config.data.userId);
        config.data.isPcFlag = true;
        config.data.device = 1;
        // config.data = qs.stringify(config.data)
        config.data = qs.stringify(config.data);
        loadingInstance = Loading.service({
            lock: true,
            text: 'Loading...',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.5)',
        });
        var token = '';
        if (token) {  // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
            config.headers.Authorization = token;
        }
        return config;
    },
    err => {
        loadingInstance.close();
        return Promise.reject(err);
});


// http response 服务器响应拦截器，这里拦截401错误，并重新跳入登页重新获取token
axios.interceptors.response.use(
    response => {
        loadingInstance.close();
        let data = response.data;
        if(data.results) {
            if(data.results.resultCd == '1') {
                Message({
                    showClose:false,
                    message: data.errorMsg,
                    duration:2500,
                    type: 'error',
                });
                return Promise.reject(data);
            } else {
                return Promise.resolve(data);
            }
            
        } else if(data.status == '401') {//没有访问的权限
            Message({
                showClose:false,
                message: data.errorMsg,
                duration:2500,
                type: 'error',
            });
            store.commit(CLEARLOGINDATA);
            Router.push({name: 'start'});
            return Promise.reject(data);
        }
        
    },
    error => {
        loadingInstance.close();
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 这里写清除token的代码
                    Router.replace({
                        path: 'login',
                        query: {redirect: Router.currentRoute.fullPath}   //登录成功后跳入浏览的当前页面
                    })
            }
        }
        return Promise.reject(error.response.data) 
    });




export default axios;