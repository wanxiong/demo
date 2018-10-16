import jsonp from '@/utils/jsonp'
import {makeRandomId } from '@/utils/index'
import VueCookies from 'vue-cookies'
import {getLogin} from '@api/startApi'
import Router from '@/router/index'
import {isSafair} from '@/utils/common'
import store from '@/vuex/index'
import {LOGINDATA, CLEARLOGINDATA} from '@/vuex/type'
import {
	ssoUrl,
	sso_auth_visit,
	sso_auth_login,
	sso_auth_logout,
	sso_auth_verifyTicket,
} 
from '@config/config'
//验证当前用户状态
export let getSsoVisit = (state = '') => {
	let data = {};	
	data.state = state || 'validate';
	return new Promise((resolve, reject) => {
		jsonp(ssoUrl + sso_auth_visit, data).then((res) => {
			if(res.code == '1') {//登录状态
				let params = {ticket: res.ticket, state: res.state}
				getSsoVerifyTicket(params).then((res) => {
					switch (res.state) {
						case 'login_':
							if(res.authorized != '0'){
								let params = {
									countryCd: res.country_code,
									mobilephone: res.account,
									stateType: '1',
									password: 'null',
								};
								getLogin(params).then((data) => {
									store.commit(LOGINDATA, data);
									return res.ticket;
								}).catch((err) => {
									console.log(err);
								}).then((ticket) => {
									console.log('safari')
									if( isSafair() ) { //是否safari
										getRedirectUrl(ticket);
									} else {
										Router.push({name: 'home'});
									}
								}).catch((err) => {
									console.log(err);
								})
							}
							break;
						case 'validate':
							break;
					}
					
				}).catch((err) => {
					console.log(err);
				})
			} else {//不是登录状态
				if( window.location.href.indexOf('/home/start/editProfile') != -1 ||
        			window.location.href.indexOf('/home/start/sns') != -1 ||
        			window.location.href.indexOf('/home/start/adviceFollow') != -1
        		) {
            		resolve('')
            	} else {
        			store.commit(CLEARLOGINDATA);
        			resolve('')
        		}
			}
			
		}).catch((err) => {
			reject(err);
		})
	})
}

// SSO 登录接口
export let getSsoLogin = (data = {}) => {
	return new Promise((resolve, reject) => {
		jsonp(ssoUrl + sso_auth_login, data).then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		})
	})
}
//SSO 登出接口
export let getSsoLogout = ( data ={} ) => {
	return new Promise((resolve, reject) => {
		jsonp(ssoUrl + sso_auth_logout, data).then((res) => {
			if(res.code == 1) {
				resolve(res);	
			} else {
				reject(res);
			}
		}).catch((err) => {
			reject(err);
		})
	})
}

// SSO ticket校验接口
export let getSsoVerifyTicket = (data = {}) => {
	return new Promise((resolve, reject) => {
		jsonp(ssoUrl + sso_auth_verifyTicket, data).then((res) => {
			resolve(res);
		}).catch((err) => {
			reject(err);
		})
	})
}

/*SSO safari cookie redirect 登录写cookie
* @params {String ticket} 第三方SSO返回的ticket
* @params {String path }  需要跳转的页面URL
*/
export let getRedirectUrl = (ticket = '', path = '') => {
	let session = VueCookies.get('sessionId') || makeRandom(32);
	let url = ssoUrl + sso_auth_verifyTicket + `?app_id=Darwin&ticket=${ticket}&sessionid=${session}&state=login`  ;
	let local = location.origin + '/' + path ;
	let newUrl = url + '&redirect_uri=' + decodeURIComponent(local) ;
	alert(newUrl)
	window.location.href = newUrl ;
}