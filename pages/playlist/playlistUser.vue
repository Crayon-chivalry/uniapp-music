<template>
	<view>
		<view class="card" v-for="item in playlist" :key="item.id">
			<view class="card-row">
				<image :src="item.coverImgUrl" mode="widthFix" class="card-cover"></image>
				<view>
					<view>{{ item.name }}</view>
					<view class="count">{{ item.trackCount }}首</view>
				</view>
			</view>
			<uv-icon name="more-dot-fill" @click="actionSheet.open()"></uv-icon>
		</view>
		
		<uv-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png" text="暂无歌单" v-if="playlist.length == 0"></uv-empty>
	
		<uv-action-sheet ref="actionSheet" :actions="actions" round="10"></uv-action-sheet>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { checkLoginState } from '@/utils/index.js'
	import { getPlaylistUser } from '@/api/playlist.js'
	
	const actionSheet = ref(null)
	
	const actions = [
		{ name: '置顶' },
		{ name: '分享' },
		{ name: '编辑歌单信息' },
		{ name: '删除歌单' },
	]
	
	let playlist = ref([])
	
	onLoad(() => {
		if(checkLoginState()) {
			getPlaylistData()
		}
	})
	
	const getPlaylistData = async () => {
		let { data } = await getPlaylistUser(uni.getStorageSync('id'))
		playlist.value = data.playlist
	}
</script>

<style scoped>
	.card {
		padding: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card:last-child {
		border: none;
	}
	
	.card-cover {
		margin-right: 20rpx;
		width: 90rpx;
		border-radius: 8rpx;
	}
	
	.card-row {
		display: flex;
		align-items: center;
	}
	
	.count {
		margin-top: 6rpx;
		font-size: 26rpx;
		color: gray;
	}
</style>
