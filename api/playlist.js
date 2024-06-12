import request from "./request.js";

// 推荐歌单
export function getRePlaylist() {
	return request({
		url: '/personalized'
	})
}

// 热门歌单分类
export function getHotPlaylistClass() {
	return request({
		url: '/playlist/hot'
	})
}

// 歌单
export function getPlaylist(cat, offset) {
	return request({
		url: `/top/playlist?cat=${cat}&offset=${offset}`
	})
}

// 歌单详情
export function getPlaylistDetails(id) {
	return request({
		url: `/playlist/detail?id=${id}`
	})
}

// 歌单详情动态
export function getPlaylistDynamic(id) {
	return request({
		url: `/playlist/detail/dynamic?id=${id}`
	})
}