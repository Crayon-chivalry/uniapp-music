<template>
	<view class="mv" v-if="details">
		<view class="header">
			<uv-icon name="arrow-leftward" color="#fff" size="21" @click="back"></uv-icon>
		</view>
		
		<view class="play-wrap">
			<image :src="details.cover" mode="widthFix" class="cover"></image>
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
			<uv-slider v-model="value" backgroundColor="#191919" activeColor="#fff" block-size="12"></uv-slider>
			<view class="input">
				<uv-input placeholder="发条评论结识有趣的人" border="none" v-model="content" color="#fff"></uv-input>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getMvDetail, getMvStats } from '@/api/mv.js'
	
	let details = ref(null)
	let stats = ref({})
	
	let content = ref("")
	
	onLoad(async (e) => {
		let { data: { data } } = await getMvDetail(e.id)
		details.value = data
		
		let { data: mvStats } = await getMvStats(e.id)
		stats.value =  mvStats
		console.log(mvStats)
	})
	
	const back = () => {
		uni.navigateBack()
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
	
	.play-wrap {
		padding-top: 40%;
	}
	
	.cover {
		width: 100%;
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
		z-index: 9;
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
</style>
