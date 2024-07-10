import request from "./request.js";

// 歌手列表
export const getSingerList = (area, offset) => {
	return request({
		url: `/artist/list?type=1&area=${area}&offset=${offset}`
	})
}

// 歌手详情
export const getSingerDetails = (id) => {
	return request({
		url: `/artist/detail?id=${id}`
	})
}

// 歌手描述
export const getSingerDesc = (id) => {
	return request({
		url: `/artist/desc?id=${id}`
	})
}

// 歌手热门 50 首歌曲
export const getSingerTopSong = (id) => {
	return request({
		url: `/artist/top/song?id=${id}`
	})
}

// 歌手专辑
export const getSingerAlbum = (id, offset) => {
	return request({
		url: `/artist/album?id=${id}&offset=${offset}`
	})
}

// 歌手 MV
export const getSingerMv = (id) => {
	return request({
		url: `/artist/mv?id=${id}`
	})
}