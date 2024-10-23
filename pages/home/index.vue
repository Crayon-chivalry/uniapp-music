<template>
	<view class="home">
		<view class="search" @click="tolink('/pages/search/index')">
			<uv-search placeholder="请输入搜索内容" v-model="searchVal" :showAction="false"></uv-search>
		</view>

		<view class="swiper">
			<uv-swiper :list="bannerList" keyName="pic" previousMargin="30" nextMargin="30" circular radius="5"
				bgColor="#ffffff"></uv-swiper>
		</view>
		
		<home-menu />
		
		<home-card title="推荐歌单" :list="songSheetList" @cardClick="(e) => tolink('/pages/playlist/playlistDetails?id=' + e)"
			@moreClick="tolink('/pages/playlist/index')" />
		<home-card title="推荐新曲" :list="newSongList" type="2" class="card-mt" @cardClick="(e) => toSongDetails(e)"
			@moreClick="tolink('/pages/song/dailyRecommend')" />
		<home-card title="推荐MV" :list="mvList" type="2" class="card-mt" @moreClick="switchTab('/pages/mv/index')" />
		
		<player :is-tab-bar="true" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { tolink, toSongDetails } from '@/utils/index.js'
	
	import { getBanner } from '@/api/home.js'
	import { getRePlaylist } from '@/api/playlist.js'
	import { getReNewSong } from '@/api/song.js'
	import { getNewMv } from '@/api/mv.js'
	
	import HomeMenu from './components/HomeMenu'
	import HomeCard from './components/HomeCard'

	let searchVal = ref("")
	let bannerList = ref([])
	let songSheetList = ref([])
	let newSongList = ref([])
	let mvList = ref([])

	onLoad(async () => {
		getBannerData()
		getPlaylist()
		getSong()
		getMv()
	})
	
	const switchTab = (url) => {
		uni.switchTab({
			url: url
		})
	}
	
	const getBannerData = async () => {
		let { data: { banners } } = await getBanner()
		bannerList.value = banners
	}
	
	const getPlaylist = async () => {
		let { data: { result } } = await getRePlaylist()
		result.forEach(item => item.title = item.name)
		songSheetList.value = result
	}
	
	const getSong = async () => {
		let { data: { result } } = await getReNewSong()
		result.forEach(item => item.title = item.name)
		newSongList.value = result
	}
	
	const getMv = async () => {
		let { data: { data } } = await getNewMv()
		data.forEach(item => {
			item.title = item.name
			item.picUrl = item.cover
		})
		mvList.value = data
	}
</script>

<style scoped>
	.home {
		padding-bottom: 30rpx;
	}
	
	.search {
		padding: 20rpx;
	}
	
	.swiper {
		margin-top: 20rpx;
	}
	
	.card-mt {
		margin-top: 60rpx;
	}
</style>