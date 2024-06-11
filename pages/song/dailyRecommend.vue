<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in newSongList">
				<image :src="item.picUrl" mode="widthFix" class="pice"></image>
				<view class="item-content">
					<view class="name">{{ item.name }}</view>
					<view class="singer">
						<text class="singer-name" v-for="singer in item.song.artists">{{ singer.name }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getReNewSong } from '@/api/song.js'
	
	let newSongList = ref([])
	
	onLoad(async () => {
		let { data: {result: newSong } } = await getReNewSong()
		newSongList.value = newSong
		console.log(newSong)
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
		width: 100rpx;
		border-radius: 8rpx;
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
