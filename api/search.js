import request from "./request.js";

// 获取搜索关键词
export const getKeyword = () => {
	return request({
		url: '/search/default'
	})
}