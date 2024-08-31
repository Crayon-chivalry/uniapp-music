<template>
	<view class="page">
		<view class="header">
			<uv-icon name="setting" class="head-icon" size="21"></uv-icon>
			<uv-icon name="chat" class="head-icon" size="21"></uv-icon>
		</view>
		
		<view class="user">
			<view class="user-col">
				<view class="user-row">
					<image src="../../static/logo.png" class="user-tx"></image>
					<view class="user-name">123</view>
				</view>
				<uv-icon name="arrow-right" color="gray" size="18"></uv-icon>
			</view>
			<view class="total">
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">本地</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">收藏</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">下载</view>
				</view>
				<view class="total-item">
					<view class="total-value">0</view>
					<view class="total-text">最近</view>
				</view>
			</view>
		</view>
		
		<view class="card">
			<view class="card-header">
				<view class="card-title">我的歌单</view>
				<view class="card-more">
					<view>查看全部</view>
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="card-item" v-for="item in 4" :key="item">
				<view class="card-row">
					<view class="card-item-cover"></view>
					<view>
						<view>默认收藏</view>
						<view>310首</view>
					</view>
				</view>
				<uv-icon name="more-dot-fill"></uv-icon>
			</view>
		</view>
		
		<view class="card">
			<view class="card-header">
				<view class="card-title">收藏歌单</view>
				<view class="card-more">
					<view>查看全部</view>
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="card-item" v-for="item in 4" :key="item">
				<view class="card-row">
					<view class="card-item-cover"></view>
					<view>
						<view>默认收藏</view>
						<view>310首</view>
					</view>
				</view>
				<uv-icon name="more-dot-fill"></uv-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style scoped>
	.page {
		padding: 20rpx;
		background-color: #F5F5F5;
	}
	
	.header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	
	.head-icon {
		margin-left: 30rpx;
	}
	
	.user {
		margin-top: 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.user-col {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.user-row {
		display: flex;
		align-items: center;
	}
	
	.user-tx {
		margin-right: 20rpx;
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}
	
	.total {
		margin-top: 40rpx;
		display: flex;
	}
	
	.total-item {
		flex: 1;
		text-align: center;
	}
	
	.total-value {
		font-weight: bold;
	}
	
	.total-text {
		color: gray;
		font-size: 24rpx;
	}
	
	.card {
		margin-top: 24rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.card-header {
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-more {
		display: flex;
		align-items: center;
		color: gray;
		font-size: 24rpx;
	}
	
	.card-title {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.card-item {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-item-cover {
		margin-right: 20rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 8rpx;
		background-color: grey;
	}
	
	.card-row {
		display: flex;
		align-items: center;
	}
</style>
