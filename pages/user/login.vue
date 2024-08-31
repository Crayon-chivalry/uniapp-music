<template>
	<view class="page">
		<image src="../../static/logo.png" mode="widthFix" class="logo-icon"></image>
		
		<view class="title">欢迎来到网抑云</view>
		
		<view class="form">
			<view class="form-item">
				<uv-input placeholder="请输入手机号" border="bottom" v-model="value"></uv-input>
			</view>
			<view class="form-item">
				<uv-input placeholder="请输入密码" border="bottom" v-model="value"></uv-input>
			</view>
		</view>
		
		<view class="tips">还没有账号？<text>立即注册</text></view>
	
		<view class="m-btn btn">登录</view>
		
		<view class="operate">
			<view class="operate-active">手机快捷登录</view>
			<view class="operate-line">|</view>
			<view>忘记密码?</view>
		</view>
		
		<view class="other">
			<view class="other-title">第三平台登录</view>
			<view class="other-row">
				<image src="../../static/img/user/qq-login.svg" mode="widthFix" class="other-icon"></image>
				<image src="../../static/img/user/wx-login.svg" mode="widthFix" class="other-icon"></image>
				<image src="../../static/img/user/wb-login.svg" mode="widthFix" class="other-icon"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
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
		margin-top: 30rpx;
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
		bottom: 8%;
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
		width: 90rpx;
	}
</style>
