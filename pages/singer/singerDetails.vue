<template>
	<view class="detail" v-if="detail">
		<uv-navbar :title="detail.artist.name" fixed="" :bgColor="navbarBg" @leftClick="back"></uv-navbar>
		
		<view class="cover" :style="coverStyle"></view>
		
		<view class="info">
			<view class="info-name">{{ detail.artist.name }}</view>
			<view class="info-label">
				<text v-for="item in detail.artist.alias">{{ item }}</text>
			</view>
			<view class="info-label">{{ detail.user?.description }}</view>
			<view class="info-btn">关注</view>
		</view>
		
		<view class="tabs">
			<uv-tabs :list="tabs" :scrollable="false" @change="change"></uv-tabs>
		</view>
		
		<singer-detail-desc :detail="detail" :desc="desc" v-show="active == 0" />
		<singer-top-song :list="songList" v-show="active == 1" />
		<singer-album :list="albumList" v-show="active == 2" :status="albumStatus" />
		<singer-mv :list="mvList" v-show="active == 3" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onPageScroll, onReachBottom } from '@dcloudio/uni-app'
	import { 
		getSingerDetails, 
		getSingerDesc, 
		getSingerTopSong, 
		getSingerAlbum, 
		getSingerMv ,
	} from '@/api/singer.js'
	
	import SingerDetailDesc from './components/SingerDetailDesc.vue'
	import SingerTopSong from './components/SingerTopSong.vue'
	import SingerAlbum from './components/SingerAlbum.vue'
	import SingerMv from './components/SingerMv.vue'
	
	let id = ref("")
	let detail = ref(null)
	let desc = ref(null)
	let songList = ref([])
	let mvList = ref([])
	
	let albumList = ref([])
	let albumOffset = ref(0)
	let albumStatus = ref('loadmore')
	
	let coverStyle = ref("")
	let navbarBg = ref("transparent")
	let stickyBg = ref("transparent")
	let pageBg = ref("#F5F5F5")
	
	let tabs = [
		{name: '主页'},
		{name: '歌曲'},
		{name: '专辑'},
		{name: '视频'}
	]
	let active = ref(0)
	
	onLoad(async (e) => {
		id.value = e.id
		
		let { data: { data } } = await getSingerDetails(e.id)
		detail.value = data
		coverStyle.value = `background: url(${data.artist.cover}) center center/cover`
		
		let { data : _desc }  = await getSingerDesc(e.id)
		desc.value = _desc
		
		let { data: { songs } } = await getSingerTopSong(e.id)
		songList.value = songs
		
		let { data: { mvs } } = await getSingerMv(e.id)
		mvs.forEach(item => item.playCount = (item.playCount / 10000).toFixed(2))
		mvList.value = mvs
		
		getHotAlbums()
	})
	
	onPageScroll((e) => {
		// 顶部导航栏颜色
		if(e.scrollTop > 22) {
			navbarBg.value = "#fff"
		} else {
			navbarBg.value = "transparent"
		}
		// 吸顶颜色
		if(e.scrollTop > 345) {
			stickyBg.value = "#fff"
		} else {
			stickyBg.value = "transparent"
		}
	})
	
	onReachBottom(() => {
		// 专辑的上拉加载
		if(active.value == 2 && albumStatus.value == 'loadmore') {
			albumOffset.value += 30
			getHotAlbums()
		}
	})
	
	function change(e) {
		active.value = e.index
		if(e.index == 0) {
			pageBg.value = '#F5F5F5'
		} else {
			pageBg.value = '#fff'
		}
	}
	
	function back() {
		uni.navigateBack()
	}
	
	// 获取专辑
	async function getHotAlbums() {
		albumStatus.value = 'loading'
		let { data: { hotAlbums } } = await getSingerAlbum(id.value, albumOffset.value)
		albumStatus.value = hotAlbums.length == 0 ? 'nomore' : 'loadmore'
		albumList.value.push(...hotAlbums)
	}
</script>

<style scoped>
	.detail {
		background-color: v-bind(pageBg);
		transition: background-color 0.3s ease;
	}
	
	.cover {
		position: relative;
		padding-top: 54px;
		width: 100%;
		height: 400rpx;
		overflow-x: hidden;
	}
	
	.cover::after {
		position: absolute;
		left: -15%;
		top: 0;
		width: 130%;
		height: 400rpx;
		content: '';
		z-index: -1;
		border-radius: 0 0 50% 50%;
	}
	
	.cover-img {
		width: 100%;
	}
	
	.info {
		position: relative;
		margin: -60rpx 20rpx 0;
		padding: 40rpx;
		border-radius: 20rpx;
		background-color: #fff;
		box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
		z-index: 9;
		text-align: center;
	}
	
	.info-name {
		font-size: 40rpx;
		font-weight: bold;
		color: #333333;
	}
	
	.info-label {
		margin-top: 12rpx;
		color: gray;
		font-size: 26rpx;
	}
	
	.info-btn {
		margin: 20rpx auto 0;
		padding: 12rpx 0;
		width: 30%;
		color: #fff;
		border-radius: 99rpx;
		background-color: var(--main-color);
	}
	
	.tabs {
		margin-top: 20rpx;
		position: sticky;
		top: 44px;
		background-color: v-bind(stickyBg);
		z-index: 9;
	}
</style>
