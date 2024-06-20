<template>
	<view class="desc">
		<view class="card">
			<view class="title">基本信息</view>
			<view class="cell">
				艺人别名：
				<text v-for="item in detail.artist.alias">{{ item }}</text>
			</view>
			<view class="cell">音乐身份：{{ detail.identify.imageDesc }}</view>
			<view v-if="detail.user">
				<view class="cell">性别：{{ detail.user.gender == 0 ? '女' : '男' }}</view>
				<view class="cell">生日：{{ formatDate(detail.user.birthday) }}</view>
				<view class="cell">个人简介：{{ detail.user.signature }}</view>
			</view>
		</view>

		<view class="card" v-if="desc">
			<view class="title">艺人简介</view>
			<view class="brief-desc">{{ desc.briefDesc }}</view>
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

	defineProps({
		detail: Object,
		desc: null,
	})
</script>

<style scoped>
	.desc {
		padding: 20rpx;
	}

	.card {
		margin-top: 20rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}

	.card:first-child {
		margin: 0;
	}

	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #333;
	}

	.brief-desc {
		margin-top: 20rpx;
		font-size: 26rpx;
		color: gray;
		line-height: 40rpx;
	}

	.cell {
		margin-top: 20rpx;
		color: gray;
		font-size: 26rpx;
	}
</style>