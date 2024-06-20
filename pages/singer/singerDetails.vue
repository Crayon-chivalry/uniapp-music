<template>
	<view class="detail" v-if="detail">
		<view class="cover" :style="coverStyle"></view>
		
		<view class="info">
			<view class="info-name">{{ detail.artist.name }}</view>
			<view class="info-label">
				<text v-for="item in detail.artist.alias">{{ item }}</text>
			</view>
			<view class="info-label">{{ detail.user?.description }}</view>
			<view class="info-btn">关注</view>
		</view>
		
		<view class="tabs">
			<uv-tabs :list="tabs" :scrollable="false" @change="change"></uv-tabs>
		</view>
		
		<singer-detail-desc :detail="detail" :desc="desc" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getSingerDetails, getSingerDesc } from '@/api/singer.js'
	
	import SingerDetailDesc from './components/SingerDetailDesc.vue'
	
	let coverStyle = ref("")
	let detail = ref(null)
	let desc = ref(null)
	
	let tabs = [
		{name: '主页'},
		{name: '歌曲'},
		{name: '专辑'},
		{name: '视频'}
	]
	
	onLoad(async (e) => {
		let { data: { data } } = await getSingerDetails(e.id)
		detail.value = data
		coverStyle.value = `background: url(${data.artist.cover}) center center/cover`
		console.log(detail.value)
		
		let { data : _desc }  = await getSingerDesc(e.id)
		desc.value = _desc
	})
	
	function change() {
		
	}
</script>

<style scoped>
	.detail {
		background-color: #F5F5F5;
	}
	
	.cover {
		position: relative;
		width: 100%;
		height: 400rpx;
	}
	
	.cover::after {
		position: absolute;
		left: -15%;
		top: 0;
		width: 130%;
		height: 400rpx;
		content: '';
		z-index: -1;
		border-radius: 0 0 50% 50%;
	}
	
	.cover-img {
		width: 100%;
	}
	
	.info {
		position: relative;
		margin: -60rpx 20rpx 0;
		padding: 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		z-index: 9;
		text-align: center;
	}
	
	.info-name {
		font-size: 40rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.info-label {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
	}
	
	.info-btn {
		margin: 20rpx auto 0;
		padding: 12rpx 0;
		width: 30%;
		color: #fff;
		border-radius: 99rpx;
		background-color: var(--main-color);
	}
</style>
