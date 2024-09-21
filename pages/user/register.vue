<template>
	<view class="page">
		<image src="../../static/logo.png" mode="widthFix" class="logo-icon"></image>

		<view class="title">欢迎注册</view>

		<view class="form">
			<uv-form labelPosition="left" :model="form" :rules="rules" ref="formRef" labelWidth="0">
				<uv-form-item label="" prop="nickname">
					<view class="form-item">
						<uv-input placeholder="请输入昵称" border="none" v-model="form.nickname"></uv-input>
					</view>
				</uv-form-item>
				<uv-form-item label="" prop="phone">
					<view class="form-item">
						<uv-input placeholder="请输入手机号" border="none" v-model="form.phone"></uv-input>
					</view>
				</uv-form-item>
				<uv-form-item label="" prop="captcha">
					<view class="form-item">
						<uv-input placeholder="请输入验证码" border="none" v-model="form.captcha">
							<template #suffix>
								<view class="click-text" @click="send" v-if="!timer">获取验证码</view>
								<view class="countdown-text" v-else>{{ countdown }}秒后可重新发送</view>
							</template>
						</uv-input>
					</view>
				</uv-form-item>
				<uv-form-item label="" prop="password">
					<view class="form-item">
						<uv-input placeholder="请输入密码" border="none" type="password" v-model="form.password"></uv-input>
					</view>
				</uv-form-item>
			</uv-form>
		</view>

		<view class="tips">已有账号？<text @click="tolink('./login')">立即登录</text></view>

		<view class="m-btn btn" @click="submit">注册</view>

		<view class="footer">
			<checkbox-group>
				<label class="footer-row">
					<checkbox value="cb" :checked="checked" style="transform:scale(0.6)" color="var(--main-color)" />
					<text class="click-text">我已阅读并同意</text>
					<text>《隐私政策》</text>
					<text>和</text>
					<text class="click-text">《用户协议》</text>
				</label>
			</checkbox-group>
		</view>
	</view>
</template>

<script setup>
	import { onLoad, onHide } from '@dcloudio/uni-app'
	import { reactive, ref } from 'vue'
	import { tolink } from '@/utils/index.js'
	
	import { getNicknameCheck, getPhoneCheck, sentCaptcha, verifyCaptcha } from '@/api/user.js'
	
	const formRef = ref(null)
	
	let form = reactive({
		captcha: '',
		phone: '',
		password: '',
		nickname: ''
	})
	
	let rules = {
		'nickname': [
			{
				type: 'string',
				required: true,
				message: '请输入昵称',
				trigger: ['blur', 'change']
			},
			{
				asyncValidator: (rule, value, callback) => {
					if(!value) return
					// 验证昵称是否重复/规范
					getNicknameCheck(value).then((res) => {
						if(res.data.code != 200) 	callback(new Error(res.data.message))
					})
				},
				trigger: ['blur']
			}
		],
		'phone': [
			{
				type: 'string',
				required: true,
				message: '请输入手机号',
				trigger: ['blur', 'change']
			},
			{
				asyncValidator: (rule, value, callback) => {
					if(!uni.$uv.test.mobile(value)) return callback(new Error('请输入正确的手机号码'))
					// 验证手机号是否重复
					getPhoneCheck(value).then((res) => {
						if(res.data.exist != -1) callback(new Error('手机号码已注册'))
					})
				},
				trigger: ['blur']
			}
		],
		'captcha': [
			{
				type: 'string',
				required: true,
				message: '请输入验证码',
				trigger: ['blur', 'change']
			},
			{
				asyncValidator: (rule, value, callback) => {
					if(!value) return
					// 验证码验证
					verifyCaptcha(form.phone, value).then((res) => {
						if(res.data.code != 200) callback(new Error(res.data.message))
					})
				},
				trigger: ['blur']
			}
		],
		'password': {
			type: 'string',
			required: true,
			message: '请输入密码',
			trigger: ['blur', 'change']
		}
	}
	
	let checked = ref(false)
	
	let timer = ref(null)
	let countdown = ref(0)
	
	onHide(() => {
		stopTimer()
	})
	
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
			uni.showToast({ title: '请输入手机号码' })
			return
		}
		if(!uni.$uv.test.mobile(form.phone)) {
			uni.showToast({ title: '请输入正确的手机号码' })
			return
		}
		let { data } = await sentCaptcha(form.phone)
		if(data.code == 200) startTimer()
	})
	
	const submit = (() => {
		formRef.value.validate().then(res => {
			
		}).catch(() => {})
	})
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
	
	.footer {
		position: fixed;
		bottom: 3%;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: gray;
	}
	
	.footer-row {
		display: flex;
		align-items: center;
	}
	
	.click-text {
		color: var(--main-color);
	}
	
	.countdown-text {
		color: gray;
	}
</style>