<template>
	<view class="mv">
		<view class="header">
			<uv-search placeholder="请输入搜索内容" v-model="searchVal" :showAction="false"></uv-search>
			<uv-tabs :list="tabs" :scrollable="false" @change="tabsChange"></uv-tabs>
		</view>
		
		<view class="list">
			<view class="card" v-for="item in list" :key="item.id" @click="tolink('./mvDetails?id=' + item.id)">
				<view class="card-row">
					<!-- <image src="../../static/logo.png" mode="widthFix" class="avatar"></image> -->
					<view class="card-name">{{ item.name }}</view>
				</view>
				<view class="cover-wrap">
					<image :src="item.cover" mode="widthFix" class="cover"></image>
					<view class="play-icon">
						<uv-icon name="play-right-fill" color="rgba(255, 255, 255, .8)" size="40"></uv-icon>
					</view>
					<view class="play-data">
						<text>{{ showPlayCount(item.playCount) }}万次观看</text>
						<text>{{ showDuration(item.duration) }}</text>
					</view>
				</view>
			</view>
			<uv-load-more :status="status" />
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	
	import { showDuration, tolink } from '@/utils/index.js'
	import { getAllMv } from '@/api/mv.js'
	
	let searchVal = ref("")
	
	let list = ref([])
	let offset = ref(0)
	let status = ref("loadmore")
	
	let area = ref("全部")
	let tabs = ref([
		{name: '全部'},
		{name: '内地'},
		{name: '港台'},
		{name: '欧美'},
		{name: '日本'},
		{name: '韩国'}
	])
	
	onLoad(() => {
		getList()
	})
	
	onReachBottom(() => {
		if(status.value == 'loadmore') {
			offset.value += 30
			getList()
		}
	})
	
	const showPlayCount = (count) => {
		return (count / 10000).toFixed(2)
	}
	
	const tabsChange = (e) => {
		area.value = e.name
		offset.value = 0
		status.value = "loadmore"
		list.value = []
		getList()
	}
	
	const getList = async () => {
		status.value = 'loading'
		let { data: { data } } = await getAllMv(area.value, offset.value)
		status.value = data.length == 0 ? 'nomore' : 'loadmore'
		list.value.push(...data)
	}
</script>

<style scoped>
	.mv {
		padding-top: 184rpx;
		background-color: #F5F5F5;
	}
	
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		padding: 20rpx 20rpx 8rpx;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 9;
	}
	
	.list {
		padding-bottom: 8rpx;
	}
	
	.card {
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	
	.card:last-child {
		margin: 0;
	}
	
	.card-row {
		padding: 12rpx;
		display: flex;
		align-items: center;
	}
	
	.card-name {
		font-weight: 500;
	}
	
	.avatar {
		margin-right: 20rpx;
		width: 60rpx;
		border-radius: 50%;
	}
	
	.cover-wrap {
		position: relative;
	}
	
	.cover {
		display: block;
		width: 100%;
	}
	
	.play-icon {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.play-data {
		position: absolute;
		bottom: 12rpx;
		right: 20rpx;
		color: #fff;
		font-size: 26rpx;
	}
	
	.play-data text {
		margin-left: 20rpx;
	}
</style>
