import request from "./request.js";

// 排行榜
export const getToplist = () => {
	return request({
		url: '/toplist'
	})
}