<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in newSongList" :key="item.id" @click="toSongDetails(item)">
				<uv-image :src="item.picUrl" width="100rpx" height="100rpx" radius="8rpx" class="pice"></uv-image>
				<view class="item-content">
					<view class="name">{{ item.name }}</view>
					<view class="singer">
						<text class="singer-name" v-for="singer in item.song.artists">{{ singer.name }}</text>
					</view>
				</view>
			</view>
		</view>
	
		<player />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getReNewSong } from '@/api/song.js'
	import { toSongDetails } from '@/utils/index.js'
	
	let newSongList = ref([])
	
	onLoad(async () => {
		let { data: {result: newSong } } = await getReNewSong()
		newSongList.value = newSong
	})
</script>

<style scoped>
	.list {
		padding: 20rpx;
	}
	
	.item {
		margin-top: 30rpx;
		display: flex;
	}
	
	.item:first-child {
		margin: 0;
	}
	
	.item-content {
		flex: 1;
	}
	
	.pice {
		margin-right: 20rpx;
	}
	
	.name {
		font-size: 30rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.singer {
		margin-top: 6rpx;
	}
	
	.singer-name {
		margin-right: 12rpx;
		font-size: 26rpx;
		color: gray;
	}
</style>
