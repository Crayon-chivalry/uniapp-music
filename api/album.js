import request from "./request.js";

// 获取专辑内容
export const getAlbum = (id) => {
	return request({
		url: `/album?id=${id}`
	})
}