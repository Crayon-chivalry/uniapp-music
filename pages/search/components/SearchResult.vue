<template>
	<view>
		<uv-tabs :list="tabs" :scrollable="false" @change="tabsChange"></uv-tabs>
		
		<scroll-view scroll-y="true" class="scroll" @scrolltolower="scrolltolower" v-if="data">
			<!-- 歌曲 -->
			<view v-if="active == 0">
				<view class="item" v-for="item in list" :key="item.id" @click="toSongDetails(item)">
					<view class="col">
						<view class="name">{{ item.name }}</view>
						<view class="label">{{ item.al.name }}</view>
					</view>
					<image src="@/static/img/playlist/playlist-more.svg" mode="widthFix" class="more-icon"></image>
				</view>
			</view>
			<!-- 歌单 -->
			<view v-if="active == 1">
				<view class="item" v-for="item in list" :key="item.id" @click="tolink('/pages/playlist/playlistDetails?id=' + item.id)">
					<view class="row">
						<image :src="item.coverImgUrl" mode="widthFix" class="cover"></image>
						<view>
							<view>{{ item.name }}</view>
							<view class="label">{{ item.bookCount }}首 {{ item.creator.nickname }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 歌手 -->
			<view v-if="active == 2">
				<view class="item" v-for="item in list" :key="item.id" @click="tolink('/pages/singer/singerDetails?id=' + item.id)">
					<view class="row items-center">
						<image :src="item.picUrl" class="avatar"></image>
						<view>{{ item.name }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
	import { ref, defineProps, defineEmits, onMounted, watch } from 'vue'
	import { tolink, toSongDetails } from '@/utils/index.js'
	
	const props = defineProps({
		data: {
			type: null,
			default: null
		}
	})
	
	const $emit = defineEmits(['tabsChange', 'scrolltolower'])
	
	let active = ref(0)
	let tabs = [
		{name: '单曲', val: 1, key: 'songs'},
		{name: '歌单', val: 1000, key: 'playlists'},
		{name: '歌手', val: 100, key: 'artists'}
	]
	
	let list = ref([])
	let status = ref("loadmore")
	
	watch(() => props.data, (NewVal) => {
		setData()
	})
	
	onMounted(() => {
		setData()
	})
	
	const setData = () => {
		status.value = 'loading'
		let arr = props.data[tabs[active.value].key]
		if(arr && arr.length > 0) {
			list.value.push(...arr)
			status.value = 'loadmore'
		} else {
			status.value = 'nomore'
		}
	}
	
	const tabsChange = (e) => {
		active.value = e.index
		list.value = []
		$emit('tabsChange', e.val)
	}
	
	const scrolltolower = () => {
		if(status.value == 'loadmore') {
			$emit('scrolltolower')
		}
	}
</script>

<style scoped>
	.scroll {
		height: calc(100vh - 216rpx);
		margin-top: 20rpx;
		box-sizing: border-box;
	}
	
	.name {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.label {
		margin-top: 4rpx;
		font-size: 24rpx;
		color: gray;
	}
	
	.item {
		padding: 20rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.more-icon {
		margin: 0 20rpx;
		width: 30rpx;
		height: auto;
	}
	
	.cover {
		margin-right: 20rpx;
		width: 90rpx;
		height: auto;
		border-radius: 8rpx;
	}
	
	.avatar {
		margin-right: 20rpx;
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
	}
</style>