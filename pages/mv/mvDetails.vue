<template>
	<view class="mv" v-if="details">
		<view class="header">
			<uv-icon name="arrow-leftward" color="#fff" size="21" @click="back"></uv-icon>
		</view>
		
		<view class="content">
			<view class="play-wrap">
				<view @click="pauseVideo" v-show="playState || progress > 0">
					<video id="myVideo" :src="url" :controls="false" class="video" @timeupdate="timeupdate"></video>
				</view>
				<image :src="details.cover" mode="widthFix" class="cover-img" v-show="!playState && progress == 0"></image>
				<view class="play-mask" v-show="!playState" @click="playVideo">
					<uv-icon name="play-right-fill" color="#fff" size="40"></uv-icon>
				</view>
			</view>
		</view>
		
		<view class="stats">
			<view class="stats-item">
				<image src="../../static/img/mv/mv-like.svg" mode="widthFix" class="stats-icon"></image>
				<view>{{ stats.likedCount }}</view>
			</view>
			<view class="stats-item">
				<image src="../../static/img/mv/mv-comment.svg" mode="widthFix" class="stats-icon"></image>
				<view>{{ stats.commentCount }}</view>
			</view>
			<view class="stats-item">
				<image src="../../static/img/mv/mv-forward.svg" mode="widthFix" class="stats-icon"></image>
				<view>{{ stats.shareCount }}</view>
			</view>
			<view class="stats-item">
				<image src="../../static/img/mv/mv-collect.svg" mode="widthFix" class="stats-icon"></image>
				<view>收藏</view>
			</view>
		</view>
		
		<view class="footer">
			<view class="info">
				<view class="name">{{ details.name }}</view>
				<view class="time">{{ details.publishTime }}</view>
			</view>
			<uv-slider v-model="progress" disabled backgroundColor="#191919" activeColor="#fff" block-size="12"></uv-slider>
			<view class="input">
				<uv-input placeholder="发条评论结识有趣的人" border="none" v-model="content" color="#fff"></uv-input>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getMvDetail, getMvStats, getMvUrl } from '@/api/mv.js'
	
	import useMusic from '@/hooks/useMusic.js'
	
	const { pause } = useMusic()
	
	let details = ref(null)
	let stats = ref({})
	
	let videoContext = ref(null)
	let url = ref("")
	let playState = ref(false)
	let progress = ref(0)
	
	let content = ref("")
	
	onLoad(async (e) => {
		// 进入该页面暂停音乐的播放
		pause()
		
		let { data: { data } } = await getMvDetail(e.id)
		data.duration = data.duration / 1000
		details.value = data
		
		let { data: mvStats } = await getMvStats(e.id)
		stats.value =  mvStats
		
		let { data: { data: mvUrl } } = await getMvUrl(e.id)
		url.value = mvUrl.url
	})
	
	const back = () => {
		uni.navigateBack()
	}
	
	// 播放视频
	const playVideo = () => {
		playState.value = true
		videoContext.value = uni.createVideoContext('myVideo');
		videoContext.value.play()
	}
	
	// 暂停播放
	const pauseVideo = () => {
		videoContext.value.pause()
		playState.value = false
	}
	
	// 播放时间变化触发
	const timeupdate = (e) => {
		let { currentTime, duration } = e.detail
		if(!duration) return
		progress.value = currentTime / duration * 100
		if(progress.value == 100) {
			playState.value = false
		}
	}
</script>

<style scoped>
	.mv {
		position: relative;
		min-height: 100vh;
		background-color: #000;
	}
	
	.header {
		padding: 0 20rpx;
		height: 88rpx;
		display: flex;
		align-items: center;
	}
	
	.content {
		position: relative;
		padding-top: 40%;
	}
	
	.play-wrap {
		position: relative;
	}
	
	.cover-img {
		width: 100%;
	}
	
	.play-mask {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(0, 0, 0, .2);
		z-index: 10;
	}
	
	.footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 12rpx 0;
	}
	
	.footer :deep(.uv-input__content__field-wrapper__field) {
		height: 35px;
		line-height: 35px;
	}
	
	.input {
		padding: 0 20rpx;
	}
	
	.info {
		padding: 0 20rpx;
		color: #fff;
	}
	
	.name {
		font-size: 32rpx;
	}
	
	.time {
		margin-top: 12rpx;
		font-size: 26rpx;
		color: #999999;
	}
	
	.stats {
		position: absolute;
		right: 24rpx;
		bottom: 240rpx;
		z-index: 20;
	}
	
	.stats-item {
		margin-top: 40rpx;
		text-align: center;
		color: #fff;
		font-size: 26rpx;
	}
	
	.stats-icon {
		width: 60rpx;
	}
	
	.video {
		width: 100%;
	}
</style>
