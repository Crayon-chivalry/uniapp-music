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
		
		<user-playlist 
			:list="playlist" 
			@moreClick="tolink('/pages/playlist/playlistUser')"
			@confirm="confirmAdd"
		>
		</user-playlist>
		
		<user-playlist title="收藏歌单" type="1" :list="[]" @moreClick="tolink('/pages/playlist/playlistCollect')"></user-playlist>
		
		<player :is-tab-bar="true" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onShow } from '@dcloudio/uni-app'
	
	import { getUserDetails } from '@/api/user.js'
	import { getPlaylistUser, createPlaylist } from '@/api/playlist.js'
	
	import { checkLoginState, tolink } from '@/utils/index.js'
	
	import UserPlaylist from './components/UserPlaylist.vue'
	
	let us = ref(null)
	
	let playlist = ref([])
	
	onLoad(() => {
		if(checkLoginState()) {
			getUserData()
		}
	})
	
	onShow(() => {
		if(checkLoginState()) {
			getPlaylistData()
		} else {
			us.value = null
			playlist.value = []
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
		// console.log(data)
		playlist.value = data.playlist
	}
	
	// 添加歌单
	const confirmAdd = async (e) => {
		let { data } = await createPlaylist(e.name, e.privacy)
		if(data.code == 200) {
			uni.showToast({
				title: '添加歌单成功',
				icon: 'none'
			})
			getPlaylistData()
		} else {
			uni.showToast({
				title: data.msg,
				icon: 'none'
			})
		}
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
	
	.banner {
		margin-top: 20rpx;
		display: block;
		width: 100%;
	}
</style>
