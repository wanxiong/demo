import * as types from './type'
//存储名字
export const setInitLinkDownload = ({commit}, params) => {
	commit(types.INITLINKDOWNLOAD, params);
}
//存储手机号区域列表
export const setCountrylist = ({commit}, list) => {
	commit(types.COUNTRYLIST, list);
}
//存储用户登录的信息
export const setLoginData = ({commit}, params) => {
	commit(types.LOGINDATA, params);
}

//清空用户登录的信息
export const clearLoginData = ({commit}) => {
	commit(types.CLEARLOGINDATA);
}
//存储SSO 返回的ticket 
export const setSsoTicket = ({commit}, ticket) => {
	commit(types.SSOTICKET, ticket);
}
//清空本地的所有状态
export const clearState = ({commit}, obj) => {
	commit(types.CLEARSTATE, obj);
}
//设置uuid 
export const setUuid = ({commit}, uuid) => {
	commit(types.UUID, uuid);
}

//保存省市区域
export const setAreaList = ({commit}, obj) => {
	commit(types.AREALIST, obj);
}