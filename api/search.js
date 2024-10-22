import request from "./request.js";

// 获取搜索关键词
export const getKeyword = () => {
	return request({
		url: '/search/default'
	})
}

// 搜索建议
export const getSuggest = (keywords) => {
	return request({
		url: `/search/suggest?keywords=${keywords}`
	})
}

// 搜索
export const getSearch = (keywords, type = 1, limit = 30) => {
	return request({
		url: `/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}`
	})
}