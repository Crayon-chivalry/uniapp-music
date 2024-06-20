<template>
	<view v-if="playlist">
		<view class="header">
			<uv-navbar title="歌单" placeholder :bgColor="navbarBg" @leftClick="back"></uv-navbar>
			
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
							<view class="tag-item" v-if="playlist.score">{{ playlist.score }}</view>
							<view class="tag-item" v-for="(item, index) in playlist.algTags" :key="index">{{ item }}</view>
						</view>
					</view>
				</view>
				<view class="describe">
					<view class="describe-text">{{ playlist.description }}</view>
					<uv-icon name="arrow-right" size="14" color="#CACACA"></uv-icon>
				</view>
				<view class="stat">
					<view class="stat-item">
						<image src="../../static/img/playlist/playlist-share.svg" mode="widthFix" class="stat-icon"></image>
						<view>{{ playlist.shareCount }}</view>
					</view>
					<view class="stat-item">
						<image src="../../static/img/playlist/playlist-comment.svg" mode="widthFix" class="stat-icon"></image>
						<view>{{ playlist.commentCount }}</view>
					</view>
					<view class="stat-item">
						<image src="../../static/img/playlist/playlist-like.svg" mode="widthFix" class="stat-icon"></image>
						<view>{{ playlist.subscribedCount }}</view>
					</view>
				</view>
			</view>
		</view>
		
		<view class="container">
			<view class="play-all-row">
				<image src="../../static/img/playlist/play.svg" mode="widthFix" class="play-icon"></image>
				<view>播放全部<text>({{ playlist.tracks.length }})</text></view>
			</view>
			<view class="list">
				<view class="item" v-for="(item,index) in playlist.tracks" :key="item.id">
					<view class="number">{{ index + 1 }}</view>
					<view class="col">
						<view class="item-name">{{ item.name }}</view>
						<view class="item-author">{{ item.al.name }}</view>
					</view>
					<image src="../../static/img/playlist/playlist-more.svg" mode="widthFix" class="more-icon"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll } from '@dcloudio/uni-app'
	
	import { getPlaylistDetails } from '@/api/playlist.js'
	
	let navbarBg = ref("transparent")
	let stickyBg = ref("transparent")
	let playlist = ref(null)
	
	onLoad(async (e) => {
		let { data } = await getPlaylistDetails(e.id)
		playlist.value = data.playlist
	})
	
	onPageScroll((e) => {
		// 顶部导航栏颜色
		if(e.scrollTop > 44) {
			navbarBg.value = "#fff"
		} else {
			navbarBg.value = "transparent"
		}
		// 吸顶颜色
		if(e.scrollTop > 230) {
			stickyBg.value = "#fff"
		} else {
			stickyBg.value = "transparent"
		}
	})
	
	function back() {
		uni.navigateBack()
	}
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
		margin-top: 20rpx;
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
		margin-top: 20rpx;
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
	
	.describe {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
	}
	
	.describe-text {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #CACACA;
	}
	
	.stat {
		margin-top: 30rpx;
		display: flex;
		justify-content: space-around;
	}
	
	.stat-item {
		padding: 16rpx 0;
		width: 30%;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 99rpx;
		background: rgba(255, 255, 255, 0.2);
		backdrop-filter: blur(20rpx);
	}
	
	.stat-icon {
		margin-right: 12rpx;
		width: 32rpx;
	}
	
	.container {
		position: relative;
		margin-top: -300rpx;
		border-radius: 40rpx 40rpx 0 0;
		background-color: #fff;
	}
	
	.item {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
	}
	
	.number {
		padding: 0 20rpx;
		width: 60rpx;
		color: gray;
		text-align: center;
		font-size: 30rpx;
	}
	
	.item-name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.item-author {
		font-size: 24rpx;
		color: gray;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.more-icon {
		margin: 0 20rpx;
		width: 30rpx;
		height: auto;
	}
	
	.play-icon {
		margin-right: 12rpx;
		width: 50rpx;
	}
	
	.play-all-row {
		position: sticky;
		top: 44px;
		display: flex;
		align-items: center;
		padding: 30rpx 30rpx 20rpx;
		font-size: 32rpx;
		font-weight: bold;
		color: #323232;
		background-color: v-bind(stickyBg);
		box-sizing: border-box;
		z-index: 9;
	}
	
	.play-all-row text {
		margin-left: 12rpx;
		font-size: 26rpx;
		color: gray;
		font-weight: normal;
	}
</style>
