import Vue from 'vue'
import Router from 'vue-router'
import VueCookies from 'vue-cookies'  //导入
import startRoute from './start-router'
import homeRoute from './home-router'
import homeMypage from './mypage-router'

const start = r => require.ensure([], () => r(require('@/view/start/start.vue')), 'start')
const home = r => require.ensure([], () => r(require('@/view/home/home.vue')), 'home')
Vue.use(Router)

let router = new Router({
	mode: 'history',
	routes: [
        {
            name: 'home',
            path: '/home',
            component: home,
            children:[
                ...homeRoute,
                ...homeMypage,
            ]
        },
		{
            name:'start',
			path: '/',
    		component: start,
            redirect: '/start/login',
            children:[...startRoute]
		},
    	{
			name: '404',
				path: '*',
				component: start,
				meta: {
					breadName: '404找不到页面',
					title: '404找不到页面'
			}
		}
  	]
})

export default router

/**
* to          即将要进入的目标 路由对象
* from        当前导航正要离开的路由
* next()      进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
* next(false) 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
* next('/')   或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。
*/

import {getSsoVisit} from '@api/ssoApi'

router.beforeEach((to, from, next) => {//建议cookie判断是否登录状态
  var _this = this ;
  getSsoVisit().then((data) => {
    console.log(data);
  }).catch((err) => {

  })
  //to.meta.isAuth
  if ( VueCookies.get('token') ) {  // 判断该路由是否需要登录权限
        // next({
        //     path: '/login',
        //     query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
        // })
        //next()
        let token = VueCookies.get('token');
        	//重新刷新时间
    	VueCookies.set('token',token,'60s')
        if( to.path == '/login' ) { //
        	next({
		            path: '/readme'
		              // 将跳转的路由path作为参数，登录成功后跳转到该路由
		        })
        } else {
        	next()
        }
    }
    else {
    	if( to.path == '/login'){
    		next()
    	} else {
    		next()
    	}
    }
})