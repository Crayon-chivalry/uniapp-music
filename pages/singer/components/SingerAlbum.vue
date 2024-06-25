<template>
	<view class="album">
		<view class="card">
			<view class="album-item" v-for="item in list" :key="item.id">
				<image :src="item.blurPicUrl" mode="widthFix" class="cover"></image>
				<view>
					<view class="album-name">{{ item.name }}</view>
					<view class="album-desc">{{ formatDate(item.publishTime) }} {{ item.size }}首</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue'
	import { formatDate } from '@/utils/index.js'
	
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
	.album {
		padding: 20rpx;
	}
	
	.card {
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.album-item {
		position: relative;
		margin-bottom: 40rpx;
		display: flex;
		align-items: center;
	}
	
	.album-item:last-child {
		margin: 0;
	}
	
	.album-item::after {
		content: "";
		position: absolute;
		top: -16rpx;
		left: 1px;
		width: 140rpx;
		height: 140rpx;
		border-radius: 50%;
		background-color: #000;
	}
	
	.cover {
		position: relative;
		margin-right: 20rpx;
		width: 140rpx;
		border-radius: 12rpx;
		z-index: 2;
		border: 1px solid rgba(199, 193, 193, .5);
	}
	
	.album-name {
		font-size: 30rpx;
	}
	
	.album-desc {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
	}
</style>