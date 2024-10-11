<template>
	<view class="page">
		<view class="tabs">
			<uv-tabs :list="tabs" :scrollable="false"></uv-tabs>
		</view>
		
		<view class="card" v-for="(item, index) in 10" :key="index">
			<view class="card-row">
				<image src="../../static/logo.png" mode="widthFix" class="avatar"></image>
				<view class="card-col">
					<view class="name">网抑云官方</view>
					<view class="label">根据你的常听推荐</view>
					<view class="msg">
						蝉鸣声不止的夏天 燥热的风伴随着整个盛夏 树
						荫下 光影斑驳 枝条也随着风轻轻晃动 在飞舞
						的尘粒中摇摆 在树荫下睡觉的小猫小狗 明媚的
						阳光和潺潺的溪水 冰凉的西瓜与阳光下飘着的
						彩色泡泡 就这样慢慢的 来到了九月 夏天要结
						束咯
					</view>
				</view>
			</view>
			<view class="operate">
				<view class="operate-item">
					<image src="../../static/img/song/link.svg" mode="widthFix" class="icon"></image>
					<view>2551</view>
				</view>
				<view class="operate-item">
					<image src="../../static/img/song/comment.svg" mode="widthFix" class="icon"></image>
					<view>153</view>
				</view>
				<view class="operate-item">
					<image src="../../static/img/song/share.svg" mode="widthFix" class="icon"></image>
					<view>20</view>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script setup>
	import { onShow } from '@dcloudio/uni-app'
	import { ref } from 'vue'
	import { checkLoginState } from '@/utils/index.js'
	
	import { getEvent } from '@/api/event.js'
	
	let tabs = [
		{name: '广场'},
		{name: '关注'}
	]
	
	let lasttime = ref(-1)
	let list = ref([])
	
	onShow(() => {
		// if(checkLoginState()) {
		// 	getEventList()
		// }
	})
	
	// 接口被限制了
	const getEventList = async () => {
		let { data } = getEvent(lasttime.value)
	}
</script>

<style scoped>
	.page {
		padding: 118rpx 30rpx 30rpx;
	}
	
	.tabs {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background-color: #fff;
		z-index: 9;
	}
	
	.card {
		margin-bottom: 40rpx;
	}
	
	.card:last-child {
		margin: 0;
	}
	
	.card-row {
		display: flex;
	}
	
	.card-col {
		flex: 1;
	}
	
	.avatar {
		margin-right: 12rpx;
		width: 70rpx;
		border-radius: 50%;
	}
	
	.name {
		font-weight: bold;
	}
	
	.label {
		font-size: 24rpx;
		color: gray;
	}
	
	.msg {
		margin-top: 12rpx;
		line-height: 50rpx;
	}
	
	.operate {
		margin-top: 20rpx;
		display: flex;
	}
	
	.operate-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: gray;
	}
	
	.icon {
		margin-right: 8rpx;
		width: 40rpx;
	}
</style>
