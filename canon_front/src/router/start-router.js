// const Foo = resolve => {
// Indicator.open();
//   require.ensure(['./Foo.vue'], () => {
//     resolve(require('./Foo.vue'))
//     Indicator.close()
//   })
// }


const start = r => require.ensure([], () => r(require('@/view/start/start.vue')), 'start')
const app_download = r => require.ensure([], () => r(require('@/view/start/app_download.vue')), 'app_download')
const login = r => require.ensure([], () => r(require('@/view/start/login.vue')), 'login')
const register = r => require.ensure([], () => r(require('@/view/start/register.vue')), 'register')
const register_step = r => require.ensure([], () => r(require('@/view/start/register-step-1.vue')), 'register_step')





export default [{
        name: 'start.login',
        path: '/start/login',
        component: login,
        meta:{
            label:"大赢家-登录"
        },
    }, {
        name: 'start.regist',
        path: '/start/regist',
        component: register,
        meta:{
            label:"大赢家-注册第一步"
        },
    }, {
        name: 'start.appDownload',
        path: '/start/appDownload',
        component: app_download,
        meta:{
            label:"大赢家-下载"
        },
    }, {
        name: 'start.register_step',
        path: '/start/regist/step',
        component: register_step,
        meta:{
            label:"大赢家-注册第二步"
        },
    },
]