import request from "./request.js";

// 推荐 MV
export function getReMv() {
	return request({
		url: '/personalized/mv'
	})
}