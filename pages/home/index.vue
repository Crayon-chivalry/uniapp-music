<template>
	<view class="home">
		<view class="search">
			<uv-search placeholder="请输入搜索内容" v-model="searchVal" :showAction="false"></uv-search>
		</view>

		<view class="swiper">
			<uv-swiper :list="bannerList" keyName="pic" previousMargin="30" nextMargin="30" circular radius="5"
				bgColor="#ffffff"></uv-swiper>
		</view>
		
		<home-menu />
		
		<home-card title="推荐歌单" :list="songSheetList" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getBanner } from '@/api/home.js'
	import { getPersonalized } from '@/api/songSheet.js'
	
	import HomeMenu from './components/HomeMenu'
	import HomeCard from './components/HomeCard'

	let searchVal = ref("")
	let bannerList = ref([])
	let songSheetList = ref([])

	onLoad(async () => {
		let { data: { banners } } = await getBanner()
		bannerList.value = banners
		
		let { data: { result: songSheet } } = await getPersonalized()
		songSheet.forEach(item => item.title = item.name)
		songSheetList.value = songSheet
		console.log(songSheet)
		// console.log(banners)
	})
</script>

<style scoped>
	.search {
		padding: 20rpx;
	}
	
	.swiper {
		margin-top: 20rpx;
	}
</style>