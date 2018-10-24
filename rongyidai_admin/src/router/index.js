import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import home from '@/pages/home'
import setting from '@/pages/setting'
import bannerlist from '@/pages/bannerlist'
import productlist from '@/pages/productlist'
import userlist from '@/pages/userlist'
import count from '@/pages/count'
import noticelist from '@/pages/noticelist'
import login from '@/pages/login'
import group from '@/pages/group'

const router = new Router({
    mode: 'history',
    routes: [
        {path: '/bgm/home', name: 'home', component: home, meta: {title: '首页'}, children: [
            {path: '/bgm/setting', name: 'setting', component: setting, meta: {title: '基础设置'}},
            {path: '/bgm/bannerlist', name: 'bannerlist', component: bannerlist, meta: {title: '轮播图列表'}},
            {path: '/bgm/productlist', name: 'productlist', component: productlist, meta: {title: '产品列表'}},
            {path: '/bgm/userlist', name: 'userlist', component: userlist, meta: {title: '用户列表'}},
            {path: '/bgm/count', name: 'count', component: count, meta: {title: '销售统计'}},
            {path: '/bgm/noticelist', name: 'noticelist', component: noticelist, meta: {title: '公告'}},
            {path: '/bgm/group', name: 'group', component: group, meta: {title: '分组管理'}},
        ]},
        {path: '/bgm/login', name: 'login', component: login, meta: {title: '登陆'}},
    ]
})

router.beforeEach((to, from, next) => {
   
    next();
})
export default router;
