<template>
	<view class="page">
		<view class="header">
			<uv-icon name="setting" class="head-icon" size="21" @click="userClick"></uv-icon>
			<uv-icon name="chat" class="head-icon" size="21"></uv-icon>
		</view>
		
		<view class="user">
			<view class="user-col" @click="userClick">
				<view class="user-row" v-if="us">
					<image :src="us.profile.avatarUrl" class="user-tx"></image>
					<view class="user-name">{{ us.profile.nickname }}</view>
				</view>
				<view class="user-row" v-else>
						<image src="../../static/logo.png" class="user-tx"></image>
						<view class="user-name">立即登录</view>
					</view>
				<uv-icon name="arrow-right" color="gray" size="18"></uv-icon>
			</view>
			<view class="total">
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">本地</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">收藏</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">下载</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">最近</view>
				</view>
			</view>
		</view>
		
		<image src="../../static/img/user/vip-banner.png" mode="widthFix" class="banner"></image>
		
		<view class="card">
			<view class="card-header">
				<view class="card-title">我的歌单</view>
				<view class="card-more" @click="tolink('/pages/playlist/playlistUser')">
					<view>查看全部</view>
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="card-item" v-for="item in playlist" :key="item.id">
				<view class="card-row">
					<image :src="item.coverImgUrl" mode="widthFix" class="card-item-cover"></image>
					<view>
						<view>{{ item.name }}</view>
						<view class="count">{{ item.trackCount }}首</view>
					</view>
				</view>
				<uv-icon name="more-dot-fill"></uv-icon>
			</view>
			<uv-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png" text="暂无歌单" v-if="playlist.length == 0"></uv-empty>
		</view>
		
		<view class="card">
			<view class="card-header">
				<view class="card-title">收藏歌单</view>
				<view class="card-more" @click="tolink('/pages/playlist/playlistCollect')">
					<view>查看全部</view>
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<uv-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png" text="暂无歌单"></uv-empty>
		</view>
		
		<player :is-tab-bar="true" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onShow } from '@dcloudio/uni-app'
	
	import { getUserDetails } from '@/api/user.js'
	import { getPlaylistUser } from '@/api/playlist.js'
	
	import { checkLoginState, tolink } from '@/utils/index.js'
	
	let us = ref(null)
	
	let playlist = ref([])
	
	onShow(() => {
		if(checkLoginState()) {
			getUserData()
			getPlaylistData()
		} else {
			us.value = null
			playList.value = []
		}
	})
	
	const userClick = () => {
		if(checkLoginState()) {
			tolink('./userSet')
		} else {
			tolink('./login')
		}
	}
	
	const getUserData = async () => {
		let { data } = await getUserDetails(uni.getStorageSync('id'))
		us.value = data
	}
	
	const getPlaylistData = async () => {
		let { data } = await getPlaylistUser(uni.getStorageSync('id'))
		playlist.value = data.playlist
	}
</script>

<style scoped>
	.page {
		padding: 20rpx;
		min-height: calc(100vh - 100rpx);
		box-sizing: border-box;
		background-color: #F5F5F5;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.head-icon {
		margin-left: 30rpx;
	}
	
	.user {
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.user-col {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.user-row {
		display: flex;
		align-items: center;
	}
	
	.user-tx {
		margin-right: 20rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
	.total {
		margin-top: 40rpx;
		display: flex;
	}
	
	.total-item {
		flex: 1;
		text-align: center;
	}
	
	.total-value {
		font-weight: bold;
	}
	
	.total-text {
		color: gray;
		font-size: 24rpx;
	}
	
	.card {
		margin-top: 24rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.card-header {
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-more {
		display: flex;
		align-items: center;
		color: gray;
		font-size: 24rpx;
	}
	
	.card-title {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.card-item {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-item-cover {
		margin-right: 20rpx;
		width: 90rpx;
		border-radius: 8rpx;
	}
	
	.card-row {
		display: flex;
		align-items: center;
	}
	
	.count {
		margin-top: 6rpx;
		font-size: 26rpx;
		color: gray;
	}
	
	.banner {
		margin-top: 20rpx;
		display: block;
		width: 100%;
	}
</style>
