<template>
	<view class="mv">
		<view class="mv-item" v-for="item in list" :key="item.id">
			<view class="cover-wrap">
				<image :src="item.imgurl" mode="widthFix" class="cover"></image>
				<view class="duration">{{ showDuration(item.duration) }}</view>
			</view>
			<view class="col">
				<view class="mv-name">
					<text class="mv-label">MV</text>
					{{ item.name }}
				</view>
				<view class="mv-time">{{ item.publishTime }}</view>
				<view class="mv-count">{{ item.playCount }}万</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'
	import {
		formatDate
	} from '@/utils/index.js'
	
	import { showDuration } from '@/utils/index.js'

	defineProps({
		list: {
			type: Array,
			default () {
				return []
			}
		}
	})
</script>

<style scoped>
	.mv {
		padding: 20rpx 30rpx;
	}

	.mv-item {
		margin-bottom: 30rpx;
		display: flex;
	}

	.mv-item:last-child {
		margin: 0;
	}

	.cover-wrap {
		position: relative;
	}

	.cover {
		margin-right: 20rpx;
		width: 260rpx;
		border-radius: 12rpx;
	}

	.duration {
		position: absolute;
		right: 30rpx;
		bottom: 20rpx;
		color: #fff;
		font-size: 24rpx;
	}

	.mv-name {
		font-size: 30rpx;
	}

	.mv-desc {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
	}

	.mv-label {
		padding: 2rpx 8rpx;
		color: var(--main-color);
		border: 1px solid var(--main-color);
		font-size: 20rpx;
		border-radius: 8rpx;
	}

	.mv-time {
		margin-top: 20rpx;
		color: gray;
	}

	.mv-count {
		margin-top: 8rpx;
		color: gray;
	}
</style>