import apiCfg from '@config/apiCfg'
import axios from 'axios'
import {
	darwin_cas_image_verify_code,
	darwin_cas_auth_data,
	darwin_cas_sms_code,
	darwin_lofer_gen_token,
}
from '@config/config'
import {makeRandomId } from '@/utils/index'
import VueCookies from 'vue-cookies'

//获取图形验证码 
export let getImageVerifyCode = (data = {}) => {
	//特定情况下需要额外添加的参数
	var data = mustParams(data);
	console.log(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_cas_image_verify_code, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

//获取加密手机号
export let getEncodePhone = (data ={}) => {
	//特定情况下需要额外添加的参数
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_cas_auth_data, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

//验证短信验证码
export let getVerifyCode = (data = {}) => {
	//特定情况下需要额外添加的参数
	var data = Object.assign({state: 'register'}, data);
	data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_cas_sms_code, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

// lofter上传图片的URL的相关参数
export let getLofterParams = (data = {}) => {
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_lofer_gen_token, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}


//特定情况下需要额外添加的参数
export let mustParams = (data = {}) => {
  let session = VueCookies.get('sessionId') || makeRandomId(32);
  data.sessionId = session;
  return data;
}

