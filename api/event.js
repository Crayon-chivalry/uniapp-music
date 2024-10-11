import request from "./request.js";

// 获取动态消息, (接口被限制)
export const getEvent = (lasttime = -1) => {
	return request({
		url: `/event?lasttime=${lasttime}`
	})
}