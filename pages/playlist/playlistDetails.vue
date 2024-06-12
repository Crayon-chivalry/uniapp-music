<template>
	<view>
		<view class="header">
			<uv-navbar title="歌单" placeholder bgColor="transparent" @leftClick=""></uv-navbar>
			<image :src="playlist.coverImgUrl" mode="widthFix" class="header-bg"></image>
			<view class="info">
				<view class="row">
					<image :src="playlist.coverImgUrl" mode="widthFix" class="cover"></image>
					<view class="col">
						<view class="playlist-name">{{ playlist.name }}</view>
						<view class="creator">
							<image :src="playlist.creator.avatarUrl" mode="widthFix" class="avatar"></image>
							<view>{{ playlist.creator.nickname }}</view>
						</view>
						<view class="tag">
							<view class="tag-item">{{ playlist.score }}</view>
							<view class="tag-item" v-for="(item, index) in playlist.algTags" :key="index">{{ item }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getPlaylistDetails } from '@/api/playlist.js'
	
	let playlist = ref({})
	
	onLoad(async (e) => {
		let { data } = await getPlaylistDetails(e.id)
		playlist.value = data.playlist
		console.log(data.playlist)
	})
</script>

<style scoped>
	.header {
		position: relative;
	}
	
	.header-bg {
		width: 100%;
		filter: blur(100rpx) brightness(0.5);
	}
	
	.info {
		position: absolute;
		top: 88rpx;
		left: 0;
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		color: #fff;
	}
	
	.cover {
		margin-right: 20rpx;
		width: 240rpx;
		border-radius: 20rpx;
	}
	
	.playlist-name {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.creator {
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		color: #ccc;
	}
	
	.avatar {
		margin-right: 12rpx;
		width: 60rpx;
		border-radius: 50%;
	}
	
	.tag {
		margin-top: 16rpx;
		display: flex;
	}
	
	.tag-item {
		margin-right: 12rpx;
		padding: 4rpx 20rpx;
		border-radius: 8rpx;
		font-size: 24rpx;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(20rpx);
	}
</style>
