import request from "./request.js";

export function getSingerList(area, offset) {
	return request({
		url: `/artist/list?type=1&area=${area}&offset=${offset}`
	})
}