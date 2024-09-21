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

// 发送验证码
export const sentCaptcha = (phone) => {
	return request({
		url: `/captcha/sent?phone=${phone}`
	})
}

// 验证验证码
export const verifyCaptcha = (phone, captcha) => {
	return request({
		url: `/captcha/verify?phone=${phone}&captcha=${captcha}`
	})
}

// 注册(修改密码)
export const register = (e) => {
	return request({
		url: `/register/cellphone?phone=${e.phone}&password=${e.password}&captcha=${e.captcha}&nickname=${e.nickname}`
	})
}

// 登录
export const login = (phone, md5_password) => {
	return request({
		url: `/login/cellphone?phone=${phone}&md5_password=${md5_password}`
	})
}