import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './action'
import VuexPersistence from 'vuex-persist'
import * as getters from './getter'
import {state} from './state'
import mutations from './mutation'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'
//此方法应用于页面刷新====导致vuex数据被清空的问题
const vuexLocal = new VuexPersistence({
	strictMode: true,
    storage: window.localStorage,
    //就保存某一部分不被清空
     reducer: state => ({
	     initLinkDownload: state.initLinkDownload,
	     loginData: state.loginData,
	 }),
	 //filter: (mutation) => return false 
})
mutations.RESTORE_MUTATION = vuexLocal.RESTORE_MUTATION

//https://github.com/championswimmer/vuex-persist
//本地数据不会被清除，若想清楚，可考虑 sessionStorage,页面关闭时,清除缓存
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	plugins:[vuexLocal.plugin],
	//strict: debug,
})
