 
 let filters = {
 	input: val => {
 		console.log('input')
 	},
 	clear: val => {
 		console.log('input')
 	},
 	homeBanner: str => {
 		return str + '?stripmeta=0&imageView&type=jpg&thumbnail=1170y300&axis=5';
 	},
 	leveNeedNum: (nextLevelNeedClear, nextLevelCleared) => {
 		let num = nextLevelNeedClear - nextLevelCleared;
 		let leveNeedStr = "";
 		if (num < 1) {
            leveNeedStr = "已过关";
        } else {
            leveNeedStr = "还需" + num + "次挑战即可升入下一级";
        }
        return leveNeedStr;
 	},
 	precent: (nextLevelNeedClear, nextLevelCleared) => {
 		let num = nextLevelNeedClear - nextLevelCleared ;
 		let progress = "";
 		if (num < 1) {
			progress = "100%";
        } else {
        	
    		progress = nextLevelCleared / nextLevelNeedClear;
        }
        return progress;
 	},
    orderAchievement: (iconid,flg) => {
        if(flg == '0') { //没有激活图标
            return `/achivement-icon/gray${iconid}_${iconid}.png`;
        } else {  //激活图标
            return `/achivement-icon/${iconid}.png`;
        }
    }
 }
 
 export default filters