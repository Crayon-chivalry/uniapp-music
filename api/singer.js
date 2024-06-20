import request from "./request.js";

// 歌手列表
export function getSingerList(area, offset) {
	return request({
		url: `/artist/list?type=1&area=${area}&offset=${offset}`
	})
}

// 歌手详情
export function getSingerDetails(id) {
	return request({
		url: `/artist/detail?id=${id}`
	})
}

// 歌手描述
export function getSingerDesc(id) {
	return request({
		url: `/artist/desc?id=${id}`
	})
}