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

// 歌手热门 50 首歌曲
export function getSingerTopSong(id) {
	return request({
		url: `/artist/top/song?id=${id}`
	})
}

// 歌手专辑
export function getSingerAlbum(id, offset) {
	return request({
		url: `/artist/album?id=${id}&offset=${offset}`
	})
}

// 歌手 MV
export function getSingerMv(id) {
	return request({
		url: `/artist/mv?id=${id}`
	})
}