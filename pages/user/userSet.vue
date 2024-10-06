<template>
	<view class="page">
		<view class="card" v-if="us">
			<view class="cell">
				<view>头像</view>
				<image :src="us.profile.avatarUrl" class="avatar"></image>
			</view>
			<view class="cell">
				<view>昵称</view>
				<view class="cell-value">{{ us.profile.nickname }}</view>
			</view>
			<view class="cell">
				<view>性别</view>
				<view class="cell-value" v-if="us.profile.gender == 0">保密</view>
				<view class="cell-value" v-if="us.profile.gender == 1">男性</view>
				<view class="cell-value" v-if="us.profile.gender == 2">女性</view>
			</view>
			<view class="cell">
				<view>等级</view>
				<view class="cell-value">{{ us.level }}</view>
			</view>
			<view class="cell">
				<view>创建时间</view>
				<view class="cell-value">{{ formatDate(us.createTime) }}</view>
			</view>
			<view class="cell">
				<view>网抑云天数</view>
				<view class="cell-value">{{ us.createDays }}天</view>
			</view>
		</view>
		
		<!-- 有个 "用户签名未知" -->
		<view class="tips">*需要更改信息的请前往网易云进行更改</view>
		
		<view class="m-btn btn" @click="logout">退出登录</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { useStore } from 'vuex'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { formatDate, tolink, checkLoginState } from '@/utils/index.js'
	import { getUserDetails } from '@/api/user.js'
	
	let us = ref(null)
	
	const store = useStore()
	
	onLoad(() => {
		if(checkLoginState()) {
			getUserData()
		}
	})
	
	const getUserData = async () => {
		let { data } = await getUserDetails(uni.getStorageSync('id'))
		us.value = data
	}
	
	const logout = () => {
		uni.showModal({
			title: '提示',
			content: '确定要退出吗？',
			success: function (res) {
				if (res.confirm) {
					store.commit('setLoginState', false)
					uni.removeStorageSync('userid')
					uni.removeStorageSync('id')
					uni.removeStorageSync('token')
					tolink('./login')
				}
			}
		});
	}
</script>

<style scoped>
	.page {
		padding: 20rpx;
		min-height: calc(100vh - 100rpx);
		box-sizing: border-box;
		background-color: #F5F5F5;
	}
	
	.card {
		padding: 0 20rpx;
		border-radius: 12rpx;
		background-color: #fff;
	}
	
	.cell {
		padding: 28rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 1px solid rgba(223, 215, 215, 0.4);
	}
	
	.cell:last-child {
		border: none;
	}
	
	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}
	
	.cell-value {
		color: gray;
	}
	
	.btn {
		margin-top: 40rpx;
	}
	
	.tips {
		margin-top: 30rpx;
		text-align: center;
		font-size: 24rpx;
		color: grey;
	}
</style>
