import request from "./request.js";

// 推荐歌单
export const getRePlaylist = () => {
	return request({
		url: '/personalized'
	})
}

// 热门歌单分类
export const getHotPlaylistClass = () => {
	return request({
		url: '/playlist/hot'
	})
}

// 歌单
export const getPlaylist = (cat, offset) => {
	return request({
		url: `/top/playlist?cat=${cat}&offset=${offset}`
	})
}

// 歌单详情
export const getPlaylistDetails = (id) => {
	return request({
		url: `/playlist/detail?id=${id}`
	})
}

// 歌单详情动态
export const getPlaylistDynamic = (id) => {
	return request({
		url: `/playlist/detail/dynamic?id=${id}`
	})
}

// 获取用户歌单
export function getPlaylistUser(uid) {
  return request({
    url: `/user/playlist?uid=${uid}`
  })
}

// 添加歌单
export function createPlaylist(name, privacy) {
	return request({
	  url: `/playlist/create?name=${name}&privacy=${privacy}`
	})
}