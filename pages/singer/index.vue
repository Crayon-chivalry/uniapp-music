<template>
	<view>
		<view class="tabs">
			<uv-tabs :list="tabs" :scrollable="false" @change="change"></uv-tabs>
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id" @click="tolink('./singerDetails?id=' + item.id)">
				<view class="item-row">
					<uv-image :src="item.img1v1Url" mode="widthFix" width="110rpx" shape="circle"></uv-image>
					<view class="name">{{ item.name }}</view>
				</view>
				<view class="btn">关注</view>
			</view>
		</view>
		
		<uv-load-more :status="status" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import { tolink } from '@/utils/index.js'
	
	import { getSingerList } from '@/api/singer.js'
	
	let tabs = [
		{name: '全部', value: -1},
		{name: '华语', value: 7},
		{name: '欧美', value: 96},
		{name: '日本', value: 8},
		{name: '韩国', value: 16},
		{name: '其他', value: 0},
	]
	
	let list = ref([])
	let area = ref(-1)
	let offset = ref(0)
	let status = ref("loadmore")
	
	onLoad(() => {
		getList()
	})
	
	onReachBottom(() => {
		if(status.value == 'loadmore') {
			offset.value += 30
			getList()
		}
	})
	
	function change(e) {
		area.value = e.value
		offset.value = 0
		list.value = []
		getList()
	}
	
	async function getList() {
		status.value = 'loading'
		let { data: { artists } } = await getSingerList(area.value, offset.value)
		status.value = 'loadmore'
		list.value.push(...artists)
	}
</script>

<style scoped>
	.tabs {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 9;
		background-color: #fff;
	}

	/* #ifdef H5 */
	.tabs {
		top: 44px;
	}
	/* #endif */
	
	.list {
		padding: 88rpx 20rpx 20rpx;
	}
	
	.item {
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.item-row {
		display: flex;
		align-items: center;
	}
	
	.name {
		margin-left: 20rpx;
		font-size: 30rpx;
	}
	
	.btn {
		padding: 6rpx 40rpx;
		color: var(--main-color);
		border: 1px solid var(--main-color);
		border-radius: 99rpx;
		font-size: 24rpx;
	}
</style>