import request from "./request.js";

// 推荐新歌
export const getReNewSong = () => {
	return request({
		url: '/personalized/newsong'
	})
}