import request from "./request.js";

// 推荐 MV
export const getReMv = () => {
	return request({
		url: '/personalized/mv'
	})
}

// 最新 MV
export const getNewMv = (limit = 10) => {
	return request({
		url: `/mv/first?limit=${limit}`
	})
}

// 全部 MV
export const getAllMv = (area, offset) => {
	return request({
		url: `/mv/all?area=${area}&offset=${offset}`
	})
}

// mv 详情
export const getMvDetail = (id) => {
	return request({
		url: `/mv/detail?mvid=${id}`
	})
}

// mv 点赞、评论、转发数据
export const getMvStats = (id) => {
	return request({
		url: `/mv/detail/info?mvid=${id}`
	})
}

// 获取mv地址
export const getMvUrl = (id) => {
	return request({
		url: `/mv/url?id=${id}`
	})
}