import md5 from 'js-md5';
import {apiCfg } from '@/config/apiCfg'

export function genAuthCd (postUrl, postUserId) {
    var apiKey = apiCfg['api_key'];
    var apiId = apiCfg['api.' + postUrl.split('.')[0]];
    var userId = postUserId || "";
    var validateStr = apiId + ":" + userId + ":" + apiKey;
    return md5(validateStr);
};