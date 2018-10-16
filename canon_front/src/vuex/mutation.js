import * as types from './type'
import {resetState} from './state'


let mutations = {
	[types.INITLINKDOWNLOAD](state, params) {
    	state.initLinkDownload = params;
	},
	[types.COUNTRYLIST](state, list) {
		state.countryList = list;
	},
	[types.LOGINDATA](state, params) {
		state.loginData = params;
	},
	[types.SSOTICKET](state, ticket) {
		state.ssoTicket = ticket;
	},
	[types.UUID](state, uuid) {
    	state.uuid = uuid;
  	},
  	[types.AREALIST](state, obj) {
  		state.areaList = obj;
  	},
  	[types.CLEARSTATE](state, _this) {
    	_this.$store.replaceState(resetState);
  	},
  	[types.CLEARLOGINDATA](state) {
		state.loginData = {};
  	},

}

export default mutations;