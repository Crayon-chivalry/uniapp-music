<template>
	<view class="page">
		<image src="../../static/logo.png" mode="widthFix" class="logo-icon"></image>
		
		<view class="title">欢迎来到网抑云</view>
		
		<view class="form">
			<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="0">
				<uv-form-item label="" prop="phone">
					<view class="form-item">
						<uv-input placeholder="请输入手机号" border="none" v-model="form.phone"></uv-input>
					</view>
				</uv-form-item>
				<uv-form-item label="" prop="password" v-if="loginType == 0">
					<view class="form-item">
						<uv-input placeholder="请输入密码" border="none" type="password" v-model="form.password"></uv-input>
					</view>
				</uv-form-item>
				<uv-form-item label="" prop="captcha" v-if="loginType == 1">
					<view class="form-item">
						<uv-input placeholder="请输入验证码" border="none" v-model="form.captcha">
							<template #suffix>
								<view class="click-text" @click="send" v-if="!timer">获取验证码</view>
								<view class="countdown-text" v-else>{{ countdown }}秒后可重新发送</view>
							</template>
						</uv-input>
					</view>
				</uv-form-item>
			</uv-form>
		</view>
		
		<view class="tips">还没有账号？<text @click="tolink('./register')">立即注册</text></view>
	
		<view class="m-btn btn" @click="submit">登录</view>
		
		<view class="operate">
			<view class="operate-active" @click="loginType = 1" v-if="loginType == 0">手机快捷登录</view>
			<view class="operate-active" @click="loginType = 0" v-if="loginType == 1">手机密码登录</view>
			<view class="operate-line">|</view>
			<view @click="otherClick">忘记密码?</view>
		</view>
		
		<view class="other">
			<view class="other-title">第三平台登录</view>
			<view class="other-row">
				<image src="../../static/img/user/qq-login.svg" mode="widthFix" class="other-icon" @click="otherClick"></image>
				<image src="../../static/img/user/wx-login.svg" mode="widthFix" class="other-icon" @click="otherClick"></image>
				<image src="../../static/img/user/wb-login.svg" mode="widthFix" class="other-icon" @click="otherClick"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onHide } from '@dcloudio/uni-app'
	import { reactive, ref } from 'vue'
	import { useStore } from 'vuex'
	import { tolink } from '@/utils/index.js'
	import { md5 } from 'js-md5';
	
	import { login, sentCaptcha } from '@/api/user.js'
	
	const store = useStore()
	
	const formRef = ref(null)
	
	let loginType = ref(0) // 0 密码登录，1 验证码登录
	
	let form = reactive({
		phone: '',
		password: '',
		captcha: ''
	})
	
	const rules = {
		'phone': {
			type: 'string',
			required: true,
			message: '请输入手机号',
			trigger: ['blur', 'change']
		},
		'password': {
			validator: (rule, value, callback) => {
				if(loginType.value == 0 && value == '') {
					return false
				} else {
					return true
				}
			},
			message: '请输入密码',
			trigger: ['blur', 'change']
		},
		'captcha': {
			validator: (rule, value, callback) => {
				if(loginType.value == 1 && value == '') {
					return false
				} else {
					return true
				}
			},
			message: '请输入验证码',
			trigger: ['blur', 'change']
		}
	}
	
	let timer = ref(null)
	let countdown = ref(0)
	
	onHide(() => {
		stopTimer()
	})
	
	const otherClick = () => {
		uni.showToast({
			title: "暂未开放~",
			icon: 'none'
		})
	}
	
	// 开始倒计时
	const startTimer = (() => {
		countdown.value = 60
		timer.value = setInterval(() => {
			if(countdown.value == 0) {
				stopTimer()
			} else {
				countdown.value--
			}
		}, 1000)
	})
	
	// 停止倒计时
	const stopTimer = (() => {
		clearInterval(timer.value)
		timer.value = null
	})
	
	// 发生验证码
	const send = (async () => {
		if(form.phone == '') {
			uni.showToast({ title: '请输入手机号码', icon: 'none' })
			return
		}
		if(!uni.$uv.test.mobile(form.phone)) {
			uni.showToast({ title: '请输入正确的手机号码', icon: 'none' })
			return
		}
		let { data } = await sentCaptcha(form.phone)
		if(data.code == 200) startTimer()
	})
	
	const submit = () => {
		formRef.value.validate().then(async () => {
			let { data } = await login(form.phone, md5(form.password), form.captcha)
			if(data.code != 200) {
				uni.showToast({
					title: data.message,
					icon: 'none'
				})
				return
			}
			uni.setStorageSync('token', data.token)
			uni.setStorageSync('id', data.account.id)
			uni.setStorageSync('userid', form.phone)
			store.commit('setLoginState', true)
			uni.switchTab({
				url: '/pages/user/index'
			})
		}).catch(() => {})
	}
</script>

<style scoped>
	.page {
		padding: 80rpx 30rpx 0;
	}
	
	.logo-icon {
		width: 100rpx;
	}
	
	.title {
		margin-top: 30rpx;
		font-size: 40rpx;
	}
	
	.form {
		margin-top: 70rpx;
	}
	
	.form-item {
		flex: 1;
		padding: 20rpx;
		border-radius: 12rpx;
		background-color: #f6f8fa;
	}
	
	:deep(.uv-form-item__body) {
		padding: 12rpx 0;
	}
	
	.tips {
		margin-top: 40rpx;
		color: gray;
		font-size: 24rpx;
	}
	
	.tips text {
		color: var(--main-color);
	}
	
	.btn {
		margin-top: 60rpx;
	}
	
	.operate {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
		font-size: 24rpx;
		color: gray;
	}
	
	.operate-active {
		color: var(--main-color);
	}
	
	.operate-line {
		padding: 0 26rpx;
	}
	
	.other {
		position: fixed;
		bottom: 7%;
		left: 0;
		right: 0;
	}
	
	.other-title {
		color: gray;
		font-size: 24rpx;
		text-align: center;
	}
	
	.other-row {
		margin-top: 40rpx;
		display: flex;
		justify-content: center;
	}
	
	.other-icon {
		margin: 0 40rpx;
		width: 80rpx;
	}
	
	.click-text {
		color: var(--main-color);
	}
	
	.countdown-text {
		color: gray;
	}
</style>
