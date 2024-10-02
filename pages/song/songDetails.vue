<template>
	<view v-if="song">
		<view class="header">
			<image src="../../static/img/song/down.svg" mode="widthFix" class="header-icon" @click="onback"></image>
			<image src="../../static/img/song/share.svg" mode="widthFix" class="header-icon"></image>
		</view>
		
		<view class="container">
			<view class="name">{{ song.name }}</view>
			<view class="ar">
				<text class="ar-span" v-for="(item, index) in song.ar" :key="index">
					<text v-if="index > 0"> / </text>{{ item.name }}
				</text>
			</view>
			<image :src="song.al.picUrl" mode="widthFix" class="cover"></image>
		</view>
		
		<view class="footer">
			<view class="footer-row">
				<image src="../../static/img/song/link.svg" mode="widthFix" class="footer-icon"></image>
				<image src="../../static/img/song/download.svg" mode="widthFix" class="footer-icon"></image>
				<image src="../../static/img/song/comment.svg" mode="widthFix" class="footer-icon"></image>
				<image src="../../static/img/song/more.svg" mode="widthFix" class="footer-icon"></image>
			</view>
			<view class="speed">
				<view>{{ showDuration(currentTime) }}</view>
				<view class="col">
					<uv-slider v-model="playProgress"></uv-slider>
				</view>
				<view>{{ showDuration(song.dt) }}</view>
			</view>
			<view class="footer-row">
				<image src="../../static/img/song/prve.png" mode="widthFix" class="footer-icon"></image>
				<image src="../../static/img/playlist/play.svg" mode="widthFix" class="play-icon"></image>
				<image src="../../static/img/song/next.png" mode="widthFix" class="footer-icon"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { onLoad } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	
	import { getSong } from '@/api/song.js'
	import { showDuration } from '@/utils/index.js'
	
	let song = ref(null)
	
	let playProgress = ref(0)
	let currentTime = ref(0)
	
	onLoad(async (e) => {
		let { data } = await getSong(e.id)
		song.value = data.songs[0]
		console.log(data)
	})
	
	const onback = () => {
		uni.navigateBack()
	}
</script>

<style scoped>
	.header {
		padding: 0 30rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.header-icon {
		width: 40rpx;
	}
	
	.container {
		padding: 20rpx 30rpx 0;
		min-height: calc(100vh - 440rpx);
		box-sizing: border-box;
	}
	
	.name {
		font-size: 36rpx;
		text-align: center;
		font-weight: bold;
	}
	
	.ar {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
		text-align: center;
	}
	
	.cover {
		margin-top: 30rpx;
		width: 100%;
		border-radius: 20rpx;
	}
	
	.footer {
		padding: 0 30rpx;
	}
	
	.footer-row {
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	
	.footer-icon {
		width: 50rpx;
	}
	
	.speed {
		padding: 40rpx 0;
		display: flex;
		align-items: center;
	}
	
	.play-icon {
		width: 80rpx;
	}
</style>
