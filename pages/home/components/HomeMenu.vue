<template>
	<view class="menu">
		<view class="menu-item" @click="tolink('/pages/song/dailyRecommend')">
			<image src="../../../static/img/home/recommend.svg" mode="widthFix" class="menu-icon"></image>
			<view>每日推荐</view>
		</view>
		<view class="menu-item" @click="tolink('/pages/songSheet/index')">
			<image src="../../../static/img/home/song-sheet.svg" mode="widthFix" class="menu-icon"></image>
			<view>歌单</view>
		</view>
		<view class="menu-item">
			<image src="../../../static/img/home/album.svg" mode="widthFix" class="menu-icon"></image>
			<view>数字专辑</view>
		</view>
	<!-- 	<view class="menu-item">
			<image src="../../../static/img/home/ranking.svg" mode="widthFix" class="menu-icon"></image>
			<view>排行榜</view>
		</view> -->
		<view class="menu-item">
			<image src="../../../static/img/home/recommend.svg" mode="widthFix" class="menu-icon"></image>
			<view>歌手</view>
		</view>
	</view>
</template>

<script setup>
	import { tolink } from '@/utils/index.js'
</script>

<style scoped>
	.menu {
		padding: 60rpx 0;
		display: flex;
	}
	
	.menu-item {
		flex: 1;
		text-align: center;
		font-size: 26rpx;
	}
	
	.menu-icon {
		width: 60rpx;
	}
</style>