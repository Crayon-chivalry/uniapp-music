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
		
		<home-card title="推荐歌单" :list="songSheetList" @cardClick="(e) => tolink('/pages/playlist/playlistDetails?id=' + e)" />
		<home-card title="推荐新曲" :list="newSongList" type="2" class="card-mt" />
		<home-card title="推荐MV" :list="mvList" type="2" class="card-mt" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { tolink } from '@/utils/index.js'
	
	import { getBanner } from '@/api/home.js'
	import { getRePlaylist } from '@/api/playlist.js'
	import { getReNewSong } from '@/api/song.js'
	import { getReMv } from '@/api/mv.js'
	
	import HomeMenu from './components/HomeMenu'
	import HomeCard from './components/HomeCard'

	let searchVal = ref("")
	let bannerList = ref([])
	let songSheetList = ref([])
	let newSongList = ref([])
	let mvList = ref([])

	onLoad(async () => {
		let { data: { banners } } = await getBanner()
		bannerList.value = banners
		
		let { data: { result: songSheet } } = await getRePlaylist()
		songSheet.forEach(item => item.title = item.name)
		songSheetList.value = songSheet
		
		let { data: {result: newSong } } = await getReNewSong()
		newSong.forEach(item => item.title = item.name)
		newSongList.value = newSong
		
		let { data: {result: mv } } = await getReMv()
		mv.forEach(item => item.title = item.name)
		mvList.value = mv
	})
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