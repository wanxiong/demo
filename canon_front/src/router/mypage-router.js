
const home_mypage = r => require.ensure([], () => r(require('@/view/mypage/mypage.vue')), 'home_mypage')
const mypage_gallery = r => require.ensure([], () => r(require('@/view/mypage/mypage-gallery.vue')), 'mypage_gallery')
const mypage_equipment = r => require.ensure([], () => r(require('@/view/mypage/mypage-equipment.vue')), 'mypage_equipment')
const mypage_achievement = r => require.ensure([], () => r(require('@/view/mypage/mypage-achievement.vue')), 'mypage_achievement')
export default [
	{
		name: 'home.mypage',
	    path: '/home/mypage',
	    component: home_mypage,
	    redirect: {name: 'home.mypage.gallery'},
	    children: [
	    	{
	    		name: 'home.mypage.gallery',
	    		path: '/home/mypage/gallery',
	    		component: mypage_gallery,
	    		meta:{
			        label:"大赢家-我的影集"
			    }
	    	},
	    	{
	    		name: 'home.mypage.equipment',
	    		path: '/home/mypage/equipment',
	    		component: mypage_equipment,
	    		meta:{
			        label:"大赢家-我的勋章"
			    }
	    	},
	    	{
	    		name: 'home.mypage.achievement',
	    		path: '/home/mypage/achievement',
	    		component: mypage_achievement,
	    		meta:{
			        label:"大赢家-我的摄影装备"
			    }
	    	},
	    ],
	    meta:{
	        label:"大赢家-我的主页"
	    },
	}
]