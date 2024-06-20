import request from "./request.js";

// banner
export function getBanner() {
	return request({
		url: '/banner?type=2'
	})
}