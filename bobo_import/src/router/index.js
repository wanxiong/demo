import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '@/pages/home'
// import setting from '@/pages/setting'
// import bannerlist from '@/pages/bannerlist'
// import productlist from '@/pages/productlist'
import userlist from '@/pages/userlist'
// import count from '@/pages/count'
import importlist from '@/pages/importlist'
import login from '@/pages/login'

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/home', name: 'home', component: home, meta: {title: '首页'}, children: [
            // {path: '/home/setting', name: 'setting', component: setting, meta: {title: '基础设置'}},
            // {path: '/home/bannerlist', name: 'bannerlist', component: bannerlist, meta: {title: '轮播图列表'}},
            {path: '/home/import', name: 'importlist', component: importlist, meta: {title: '去重导入'}},
            {path: '/home/userlist', name: 'userlist', component: userlist, meta: {title: '用户列表'}},
            // {path: '/home/count', name: 'count', component: count, meta: {title: '销售统计'}},
            // {path: '/home/noticelist', name: 'noticelist', component: noticelist, meta: {title: '公告'}},
        ]},
        {path: '/login', name: 'login', component: login, meta: {title: '登陆'}},
        {path: '*', name: '404',redirect: {name: 'home'}},
     
    ]
})

router.beforeEach((to, from, next) => {
   
    next();
})
export default router;
