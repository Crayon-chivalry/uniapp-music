import request from "./request.js";

// 推荐 MV
export function getReMv() {
	return request({
		url: '/personalized/mv'
	})
}

// 全部 MV
export function getAllMv(area, offset) {
	return request({
		url: `/mv/all?area=${area}&offset=${offset}`
	})
}