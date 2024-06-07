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
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getBanner } from '@/api/home.js'
	
	import HomeMenu from './components/HomeMenu'

	let searchVal = ref("")
	let bannerList = ref([])

	onLoad(async () => {
		let { data: { banners } } = await getBanner()
		bannerList.value = banners
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