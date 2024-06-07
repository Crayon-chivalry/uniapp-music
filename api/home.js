import request from "./request.js";

export function getBanner() {
	return request({
		url: '/banner?type=2'
	})
}