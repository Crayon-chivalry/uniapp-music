<template>
	<view>
		<view class="tabs">
			<uv-tabs :list="tabs" :scrollable="false"></uv-tabs>
		</view>
		
		<view class="list">
			<view class="card" v-for="item in list" :key="item.id">
				<image :src="item.cover" mode="widthFix" class="cover"></image>
				<view class="card-name">{{ item.name }}</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getAllMv } from '@/api/mv.js'
	
	let list = ref([])
	
	let offset = ref(0)
	let area = ref("全部")
	let tabs = ref([
		{name: '全部'},
		{name: '内地'},
		{name: '港台'},
		{name: '欧美'},
		{name: '日本'},
		{name: '韩国'}
	])
	
	onLoad(async () => {
		let { data: { data } } = await getAllMv(area.value, offset.value)
		list.value = data
		console.log(data)
	})
</script>

<style scoped>
	.list {
		padding: 20rpx;
	}
	
	.card {
		margin-bottom: 40rpx;
	}
	
	.card:last-child {
		margin: 0;
	}
	
	.card-name {
		margin-top: 12rpx;
	}
	
	.cover {
		width: 100%;
		border-radius: 20rpx;
	}
</style>
