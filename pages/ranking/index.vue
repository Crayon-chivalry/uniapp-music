<template>
	<view>
		<view class="list">
			<image :src="item.coverImgUrl" v-for="item in topList" :key="item.id" mode="widthFix" 
				class="cover" @click="tolink('/pages/playlist/playlistDetails?id=' + item.id)"></image>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { getToplist } from '@/api/ranking.js'
	import { tolink } from '@/utils/index.js'
	
	let topList = ref([])
	
	onLoad(async () => {
		let { data: { list } } = await getToplist()
		topList.value = list
	})
</script>

<style scoped>
	.list {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}
	
	.list::after {
		content: '';
		width: 31%;
	}
	
	.cover {
		margin-bottom: 20rpx;
		width: 31%;
		border-radius: 20rpx;
	}
</style>
