import request from "./request.js";

// 重复昵称检测
export const getNicknameCheck = (nickname) => {
	return request({
		url: `/nickname/check?nickname=${nickname}`
	})
}

// 重复手机号检测
export const getPhoneCheck = (phone) => {
	return request({
		url: `/cellphone/existence/check?phone=${phone}`
	})
}