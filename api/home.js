import request from "./request.js";

// banner
export const getBanner = () => {
	return request({
		url: '/banner?type=2'
	})
}