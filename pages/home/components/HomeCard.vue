<template>
	<view class="home-card">
		<view class="card-head">
			<view class="card-head-title">{{ title }}</view>
			<view class="card-head-text">
				{{ rightText }}
				<uv-icon name="arrow-right" size="14" color="gray"></uv-icon>
			</view>
		</view>

		<view class="card-content">
			<uv-swiper :list="list" keyName="picUrl" height="500rpx" next-margin="60" circular :autoplay="false" radius="10"
				bgColor="#fff" showTitle :titleStyle="titleStyle">
			</uv-swiper>
		</view>
	</view>
</template>

<script setup>
	import {
		defineProps
	} from 'vue'

	defineProps({
		title: {
			type: String,
			default: ''
		},
		rightText: {
			type: String,
			default: '查看更多'
		},
		list: {
			type: Array,
			default () {
				return []
			}
		}
	})
	
	let titleStyle = {
		padding: '8rpx 20rpx',
		fontSize: '30rpx',
		fontWeight: 'bold',
		backgroundColor: 'rgba(0, 0, 0, 0.4)',
		borderRadius: '0 0 30rpx 30rpx'
	}
</script>

<style scoped>
	.home-card {
		padding: 0 20rpx;
	}

	.card-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.card-head-title {
		font-size: 32rpx;
		font-weight: bold;
	}

	.card-head-text {
		font-size: 24rpx;
		color: gray;
		display: flex;
		align-items: center;
	}

	.card-content {
		margin-top: 30rpx;
	}

	.home-card :deep(.uv-swiper__wrapper__item__wrapper) {
		margin-right: 30rpx;
	}
</style>