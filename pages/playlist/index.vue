<template>
	<view>
		<view class="tabs">
			<uv-tabs :list="tagsList" @change="change"></uv-tabs>
		</view>
		
		<view class="list">
			<view class="item" v-for="item in list" :key="item.id" @click="tolink('./playlistDetails?id=' + item.id)">
				<uv-image :src="item.coverImgUrl" mode="widthFix" width="100%" radius="10"></uv-image>
				<view class="name">{{ item.name }}</view>
			</view>
		</view>
		
		<uv-load-more :status="status" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad, onReachBottom } from '@dcloudio/uni-app'
	import { tolink } from '@/utils/index.js'
	
	import { getHotPlaylistClass, getPlaylist } from '@/api/playlist.js'
	
	let tagsList = ref([])
	
	let list = ref([])
	let cat = ref('全部')
	let offset = ref(0)
	let status = ref("loadmore")
	
	onLoad(async () => {
		let { data: { tags } } = await getHotPlaylistClass()
		tags.unshift({name: '全部'})
		tagsList.value = tags
		getList()
	})
	
	onReachBottom(() => {
		if(status.value == 'loadmore') {
			offset.value += 50
			getList()
		}
	})
	
	const change = (e) => {
		cat.value = e.name
		offset.value = 0
		list.value = []
		getList()
	}
	
	const getList = async () => {
		status.value = 'loading'
		let { data: { playlists } } = await getPlaylist(cat.value, offset.value)
		status.value = playlists.length == 0 ? 'nomore' : 'loadmore'
		list.value.push(...playlists)
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
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	
	.list::after {
		content: '';
		width: 30%;
	}
	
	.item {
		margin-top: 30rpx;
		width: 30%;
		text-align: center;
	}
	
	.name {
		margin-top: 8rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
</style>
