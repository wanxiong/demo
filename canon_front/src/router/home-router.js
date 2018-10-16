




const start_sns = r => require.ensure([], () => r(require('@/view/start/start-sns.vue')), 'start_sns');
const start_editProfile = r => require.ensure([], () => r(require('@/view/start/start-editProfile.vue')), 'start_editProfile');
const start_adviceFollow = r => require.ensure([], () => r(require('@/view/start/start-adviceFollow.vue')), 'start_adviceFollow')
const home_timeline = r => require.ensure([], () => r(require('@/view/home/home-timeline.vue')), 'home_timeline')

export default [{
	    name: 'home.start.sns',
	    path: '/home/start/sns',
	    component: start_sns,
	    meta:{
	        label:"大赢家-设置社交绑定"
	    },
    }, {
        name: 'home.start.editProfile',
        path: '/home/start/editProfile',
        component: start_editProfile,
        meta:{
            label:"大赢家-个人资料输入"
        },
    }, {
        name: 'home.start.adviceFollow',
        path: '/home/start/adviceFollow',
        component: start_adviceFollow,
        meta:{
            label:"大赢家-好友推荐"
        },
    }, {
        name: 'home.timeline',
        path: '/home/timeline',
        component: home_timeline,
        meta:{
            label:"大赢家-大赢家"
        },
    },
]