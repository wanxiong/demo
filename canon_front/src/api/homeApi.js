import {mustParams} from './commonApi'
import axios from 'axios'
import {
	darwin_member_timeline,
	darwin_member_status,
	darwin_member_gallery_list,
} 
from '@config/config'


//获取timeline首张超大图片--详细列表
export let getTimeline = (data = {}) => {
	data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_member_timeline, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}
//获取当前登录会员的相关状态
export let getMemberStatu = (data = {}) => {
	data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_member_status, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}
//获取主页个人图片信息列表
export let getMypageGallery = (data = {}) => {
	data = mustParams(data);
	return new Promise((resolve, reject) => {
		axios.post(darwin_member_gallery_list, data).then((res) => {
			resolve(res.results);
		}).catch((err) => {
			reject(err);
		})
	})
}