import originJsonp from 'jsonp'
import {makeRandomId } from '@/utils/index'
import VueCookies from 'vue-cookies'
/*
* jsonp
* @params { String  url } 
* @params { Object  data } 
* @params { Object  option } 
*/
export default function jsonp(url, data = {}, option) {
  //必须参数
  var data  = mustParams(data);
  //可选参数
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, option, (err, data) => {
      if (!err) {
        resolve(data);
      } else {
        reject(err);
      }
    })
  })
}
//生成随机串&&存储本地cookie
export function makeRandom(len) {
  let str = makeRandomId(len);
  VueCookies.set('sessionId', str);
  return str;
}
//参数序列化 ?a=1&b=2
export function param(data) {
  let url = ''
  for (var k in data) {
    let value = data[k] !== undefined ? data[k] : '';
    url += '&' + k + '=' + encodeURIComponent(value);
  }
  return url ? url.substring(1) : '';
}

//特定情况下需要额外添加的参数
let mustParams = (data = {}) => {
  let session = VueCookies.get('sessionId') || makeRandom(32);
  data.sessionid = session;
  data.app_id = data.app_id ? data.app_id : 'Darwin';
  return data;
}