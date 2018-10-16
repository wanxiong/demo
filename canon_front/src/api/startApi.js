import apiCfg from '@config/apiCfg'
import {mustParams} from './commonApi'
import axios from 'axios'
import {darwin_initialize,
		darwin_splash_image_pc,
 		darwin_country,
 		darwin_cas_auth_login,
 		darwin_cas_verify_sms_code,
 		darwin_member_register2,
 		darwin_area,
 		darwin_member_profile_new2,
 		darwin_follow_recommend,
 		darwin_follow_add2,
} 
from '@config/config'
//获取下来IOS or android 链接
export let getDownloadLink = (data = {}) => {
	return new Promise((resolve, reject) => {
		axios.post(darwin_initialize, data).then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		})
	})
}

//获取手机区号数据
export let getDarwinCountry = (data = {}) => {
	return new Promise((resolve, reject) => {
		axios.post(darwin_country, data).then((res) => {
			resolve(res.results);	
		}).catch((err) => {
			reject(err);
		})
	})
}

//登录接口
export let getLogin = (data = {}) => {
	return new Promise((resolve, reject) => {
		axios.post(darwin_cas_auth_login, data).then((res) => {
			resolve(res.results);	
		}).catch((err) => {
			reject(err);
		})
	})
}

//验证手机号和验证码
export let checkVerifyCode = (data = {}) => {
	var data = Object.assign({state: 'register'}, data);
	data = mustParams(data);
	console.log(data)
	return new Promise((resolve, reject) => {
		axios.post(darwin_cas_verify_sms_code, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

//注册第二步，输入密码
export let getRegisterStepTwo = (data = {}) => {
	return new Promise((resolve, reject) => {
		axios.post(darwin_member_register2, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
		
	})
}

//获取区域省级列表
export let getProvince = (data = {}) => {
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_area, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

//注册个人信息填写
export let setProfile = (data = {}) => {
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_member_profile_new2, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}

//获取lofter好友
export let getRecommendFriend = ((data = {}) => {
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_follow_recommend, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
})

//好友推荐跳过
export let setSkipRecommend = ((data = {}) => {
	var data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_follow_add2, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
})