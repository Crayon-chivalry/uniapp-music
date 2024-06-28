import request from "./request.js";

// 排行榜
export function getToplist() {
	return request({
		url: '/toplist'
	})
}