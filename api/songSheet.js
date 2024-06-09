import request from "./request.js";

// 推荐歌单
export function getPersonalized() {
	return request({
		url: '/personalized'
	})
}