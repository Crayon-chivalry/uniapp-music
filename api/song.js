import request from "./request.js";

// 推荐新歌
export function getReNewSong() {
	return request({
		url: '/personalized/newsong'
	})
}