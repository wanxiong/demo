import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

import login from '@/components/login'
import passlogin from '@/components/passlogin'
import register from '@/components/signin'

import index from '@/components/index'
import mine from '@/components/mine'
import mineinfo from '@/components/mineinfo'
import applyfor from '@/components/applyfor'
import wodexiaxian from '@/components/wodexiaxian'
import promotion from '@/components/promotion'
import detail from '@/components/detail'

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/index', name: 'index', component: index, meta: {title: '越甲数据'}},
        {path: '/login', name: 'login', component: login, meta: {title: '登陆'}},
        {path: '/passlogin', name: 'passlogin', component: passlogin, meta: {title: '密码登陆'}},
        {path: '/register', name: 'register', component: register, meta: {title: '注册'}},
        {path: '/mine', name: 'mine', component: mine, meta: {title: '我的'}},
        {path: '/mineinfo', name: 'mineinfo', component: mineinfo, meta: {title: '个人信息'}},
        {path: '/applyfor', name: 'applyfor', component: applyfor, meta: {title: '邀请记录'}},
        {path: '/wodexiaxian', name: 'wodexiaxian', component: wodexiaxian, meta: {title: '我的下线'}},
        {path: '/promotion', name: 'promotion', component: promotion, meta: {title: '邀请函'}},
        {path: '/detail', name: 'detail', component: detail, meta: {title: '甲方详情'}},
    ]
});

router.beforeEach((to, from, next) => {
    
    // let token = localStorage.getItem('token');
    // if(!token) {
        
    //     if(to.path=='/login' || to.path=='/register' ){ //如果是登录页面路径，就直接next()
    //         next();
    //     } else { //不然就跳转到登录；
    //         next('/login');
    //     }

    // } else {
    //     next();
    // }
     next();
    
})
export default router;
