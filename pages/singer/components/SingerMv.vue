<template>
	<view class="mv">
		<view class="card">
			<view class="mv-item" v-for="item in list" :key="item.id">
				<image :src="item.imgurl" mode="widthFix" class="cover"></image>
				<view class="col">
					<view class="mv-name">{{ item.name }}</view>
					<!-- <view class="mv-desc">{{ formatDate(item.publishTime) }} {{ item.size }}首</view> -->
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
	.mv {
		padding: 20rpx;
	}
	
	.card {
		padding: 20rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.mv-item {
		margin-bottom: 30rpx;
		display: flex;
	}
	
	.mv-item:last-child {
		margin: 0;
	}
	
	.cover {
		margin-right: 20rpx;
		width: 260rpx;
		border-radius: 12rpx;
	}
	
	.mv-name {
		font-size: 30rpx;
	}
	
	.mv-desc {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
	}
</style>