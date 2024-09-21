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
				<uv-form-item label="" prop="password">
					<view class="form-item">
						<uv-input placeholder="请输入密码" border="none" type="password" v-model="form.password"></uv-input>
					</view>
				</uv-form-item>
			</uv-form>
		</view>
		
		<view class="tips">还没有账号？<text @click="tolink('./register')">立即注册</text></view>
	
		<view class="m-btn btn" @click="submit">登录</view>
		
		<view class="operate">
			<view class="operate-active">手机快捷登录</view>
			<view class="operate-line">|</view>
			<view>忘记密码?</view>
		</view>
		
		<view class="other">
			<view class="other-title">第三平台登录{{$store.state.loginState}}</view>
			<view class="other-row">
				<image src="../../static/img/user/qq-login.svg" mode="widthFix" class="other-icon"></image>
				<image src="../../static/img/user/wx-login.svg" mode="widthFix" class="other-icon"></image>
				<image src="../../static/img/user/wb-login.svg" mode="widthFix" class="other-icon"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { reactive, ref } from 'vue'
	import { useStore } from 'vuex'
	import { tolink } from '@/utils/index.js'
	import { md5 } from 'js-md5';
	
	import { login } from '@/api/user.js'
	
	const store = useStore()
	
	const formRef = ref(null)
	
	let form = reactive({
		phone: '',
		password: ''
	})
	
	const rules = {
		'phone': {
			type: 'string',
			required: true,
			message: '请输入手机号',
			trigger: ['blur', 'change']
		},
		'password': {
			type: 'string',
			required: true,
			message: '请输入密码',
			trigger: ['blur', 'change']
		}
	}
	
	const submit = () => {
		formRef.value.validate().then(async () => {
			let { data } = await login(form.phone, md5(form.password))
			if(data.code != 200) {
				uni.showToast({
					title: data.msg,
					icon: 'none'
				})
				return
			}
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
</style>
