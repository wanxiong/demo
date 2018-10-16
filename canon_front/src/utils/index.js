export function isAndroid () {
    return u.indexOf('Android') > -1 || u.indexOf('linux') > -1
}

export function isIOS () {
    return !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
}
/* 创建随机数
* 	@params { String len } 生成的随机串的长度
*/
export function makeRandomId (len) {
	// 
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

/* base 图片拼接
*  @params {str String } base图片的尾部字符串 /9j/4AAQSkZ...
*/
export function baseImage (str) {
	if(!str)  return ;
	return `data:image/jpeg;base64,${str}`;
}

/* 查找系统配置的变量
* @parmas {Stirng keys} 查询的key
* @params {Array list} 查询的数组
*/
export function getValidateCode(keys, list) {
    let str = '';
    for(let item of list) {
        if(item.key == keys) {
            str = item.value;
            break;   
        }
    }
    return str;
}

/* 创建UUId
* @params null
*/
export function getUuid() {
    let S4 = function () {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}