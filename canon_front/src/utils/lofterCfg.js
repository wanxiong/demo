import md5 from 'js-md5'
/* 取得上传Url
*	param: bucketName 桶名
*/
export let getUploadUrl = function(bucketName) {
	return 'https://nos.netease.com/' + bucketName;
}

/* 取得图片Url
*	param: bucketName 桶名
*  	   objectName 对象名
*/
export let getImageUrl = function(bucketName, objectName) {
	return 'http://' + bucketName + '.nos.netease.com/' + objectName;
}

// 创建随机数
export let  makeRandomId = function(len) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < len; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

// 取得调用GenToken时需要的参数
export let getGenTokenParam = function() {
	var dynamicCode = makeRandomId(9);
	return {
		dynamicCode : dynamicCode,
		verifyCode : md5(dynamicCode + 'UK36w9TFB6p8TN3BQ2HbSaFfx'),
		callback : 'genToken'
	}
}

