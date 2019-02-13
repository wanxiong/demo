import Vue from 'vue'
import Router from 'vue-router'
import axios from 'axios'

Vue.use(Router)

import login from '@/components/login'
import passlogin from '@/components/passlogin'
import signin from '@/components/signin'

import index from '@/components/index'
import mine from '@/components/mine'
import mineinfo from '@/components/mineinfo'
import applyfor from '@/components/applyfor'
import wodexiaxian from '@/components/wodexiaxian'
import promotion from '@/components/promotion'

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/index', name: 'index', component: index, meta: {title: '人人贷'}},
        {path: '/login', name: 'login', component: login, meta: {title: '登陆'}},
        {path: '/passlogin', name: 'passlogin', component: passlogin, meta: {title: '密码登陆'}},
        {path: '/signin', name: 'signin', component: signin, meta: {title: '注册'}},
        {path: '/mine', name: 'mine', component: mine, meta: {title: '我的'}},
        {path: '/mineinfo', name: 'mineinfo', component: mineinfo, meta: {title: '个人信息'}},
        {path: '/applyfor', name: 'applyfor', component: applyfor, meta: {title: '邀请记录'}},
        {path: '/wodexiaxian', name: 'wodexiaxian', component: wodexiaxian, meta: {title: '我的下线'}},
        {path: '/promotion', name: 'promotion', component: promotion, meta: {title: '邀请函'}},
    ]
})

router.beforeEach((to, from, next) => {
    console.log(to, 'to')
    if(to.name == 'index') {
        axios.get('/api/website/get').then((res) => {
            let r = res.data;
            if(r.code == 0) {
                document.title = r.data.webName;
            }
            next()
        })
    }
    next();
})
export default router;
