import request from "./request.js";

// 推荐新歌
export const getReNewSong = () => {
	return request({
		url: '/personalized/newsong'
	})
}

// 获取歌曲
export const getSong = (ids) => {
	return request({
		url: `/song/detail?ids=${ids}`
	})
}

// 获取歌曲 url 
export const getSongUrl = (id) => {
	return request({
		url: `/song/url?id=${id}`
	})
}