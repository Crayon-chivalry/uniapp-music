import request from "./request.js";

// 推荐歌单
export function getReSongSheet() {
	return request({
		url: '/personalized'
	})
}