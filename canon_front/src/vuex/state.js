
let state = {
	initLinkDownload: {},    //下载link的返回数据
	loginData: {}, 			//登录成功的返回数据
	ssoTicket: null,		//SSO返回登录状态的ticket标识
	countryList: [],
	areaList: [], 			//后台返回的省市区
	uuid: null,
}

// let resetState = {
// 	initLinkDownload: {},    //下载link的返回数据
// 	loginData: {}, 			//登录成功的返回数据
// 	ssoTicket: null,		//SSO返回登录状态的ticket标识
// 	countryList: [],
// };

let resetState = JSON.parse(JSON.stringify(state))

export  {state,
		resetState,}
