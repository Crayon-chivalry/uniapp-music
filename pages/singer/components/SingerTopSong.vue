<template>
	<view class="top-song">
		<view class="song-list">
			<view class="song-item" v-for="(item,index) in list" :key="item.id" @click="toSongDetails(item)">
				<view class="song-number">{{ index + 1 }}</view>
				<view class="col">
					<view class="song-name">{{ item.name }}</view>
					<view class="song-author">{{ item.al.name }}</view>
				</view>
				<image src="@/static/img/playlist/playlist-more.svg" mode="widthFix" class="more-icon"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue'
	import { toSongDetails } from '@/utils/index.js'
	
	defineProps({
		list: {
			type: Array,
			default() {
				return []
			}
		}
	})
</script>

<style scoped>
	.top-song {
		padding: 20rpx;
	}
	
	.song-item {
		padding: 20rpx 0;
		display: flex;
		align-items: center;
	}
	
	.song-number {
		padding: 0 20rpx;
		width: 60rpx;
		color: gray;
		text-align: center;
		font-size: 30rpx;
	}
	
	.song-name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.song-author {
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
</style>