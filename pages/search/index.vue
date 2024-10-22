<template>
	<view>
		<view class="header">
			<uv-icon name="arrow-left" class="back-icon" @click="back"></uv-icon>
			<uv-search :placeholder="showKeyword" v-model="keyword" @search="search" @custom="search" @change="inputChange"></uv-search>
		</view>
		
		<!-- 搜索历史 -->
		<view class="container" v-if="keyword == '' && !resultData">
			<view v-if="searchList.length > 0">
				<view class="cell">
					<view class="title">搜索历史</view>
					<uv-icon name="trash" size="20" @click="allDel"></uv-icon>
				</view>
				<view class="tag" v-for="(item, index) in searchList" :key="index" @click="tagClick(item)">
					<uv-tooltip :text="item" :showCopy="false" :buttons="['删除']" overlay @click="onDel(index)"></uv-tooltip>
				</view>
			</view>
		</view>
		
		<!-- 搜索建议 -->
		<view class="suggest" v-if="suggest.length > 0 && !resultData">
			<view class="suggest-item" v-for="item in suggest" :key="item.id" @click="search">
				<uv-icon name="search" class="search-icon"></uv-icon>
				<view>{{ item.name }}</view>
			</view>
		</view>
		
		<!-- 搜索结果 -->
		<search-result :data="resultData" @tabsChange="tabsChange" @scrolltolower="scrolltolower" v-if="resultData" />
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getKeyword, getSuggest, getSearch } from '@/api/search.js'
	
	import SearchResult from './components/SearchResult.vue'
	
	let keyword = ref("")
	let showKeyword = ref("请输入搜索内容")
	let searchList = ref([])
	
	let suggest = ref([]) // 搜索建议
	
	let type = ref(1)
	let limit = ref(30)
	let resultData = ref(null)
	
	onLoad(() => {
		searchList.value = uni.getStorageSync('searchRecord') || []
		getKeywordData()
	})
	
	const back = () => {
		uni.navigateBack()
	}
	
	// 搜索结果组件 tabs 发送变化
	const tabsChange = (e) => {
		type.value = e
		limit.value = 30
		getSearchData()
	}
	
	// 搜索结果组件滚动地板
	const scrolltolower = () => {
		limit.value += 30
		getSearchData()
	}
	
	// 搜索记录点击
	const tagClick = (e) => {
		keyword.value = e
		search()
	}
	
	// 清空记录
	const allDel = () => {
		uni.showModal({
			title: '提示',
			content: '确定清空全部历史记录？',
			success: function (res) {
				if (res.confirm) {
					searchList.value = []
					uni.removeStorageSync('searchRecord')
				}
			}
		});
	}
	
	// 记录长按删除
	const onDel = (e) => {
		searchList.value.splice(e, 1)
		uni.setStorageSync('searchRecord', searchList.value)
	}
	
	// 输入框发生变化
	const inputChange = () => {
		uni.$uv.debounce(async () => {
			if(keyword.value != '') {
				let { data: { result } } = await getSuggest(keyword.value)
				suggest.value = []
				if(result.playlists) suggest.value.push(...result.playlists)
				if(result.songs) suggest.value.push(...result.songs)
				if(result.artists) suggest.value.push(...result.artists)
			} else {
				suggest.value = []
			}
		}, 500)
		resultData.value = null
		limit.value = 30
		type.value = 1
	}
	
	// 搜索
	const search = () => {
		let findex = searchList.value.findIndex(item => item == keyword.value)
		if(findex != -1) searchList.value.splice(findex, 1)
		searchList.value.unshift(keyword.value)
		uni.setStorageSync('searchRecord', searchList.value)
		getSearchData()
	}
	
	// 默认关键词
	const getKeywordData = async () => {
		let { data } = await getKeyword()
		showKeyword.value = data.data.showKeyword
	}
	
	// 获取搜索结果
	const getSearchData = async () => {
		let { data: { result } } = await getSearch(keyword.value, type.value, limit.value)
		if(result) resultData.value = result
	}
</script>

<style scoped>
	.header {
		padding: 20rpx;
		display: flex;
		align-items: center;
	}
	
	.back-icon {
		margin-right: 20rpx;
	}
	
	.container {
		padding: 20rpx;
	}
	
	.title {
		font-size: 32rpx;
		font-weight: bold;
		color: #283248;
	}
	
	.cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.tag {
		margin: 20rpx 12rpx 0 0;
		padding: 12rpx 30rpx;
		display: inline-block;
		border-radius: 99rpx;
		background-color: rgba(231, 231, 231, 0.4);
		font-size: 26rpx;
	}
	
	:deep(.uv-tooltip__wrapper__popup__list__btn) {
		min-width: 60rpx;
		text-align: center;
	}
	
	.suggest-item {
		padding: 20rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid rgba(228, 222, 222, 0.3);
	}
	
	.search-icon {
		margin-right: 12rpx;
	}
</style>
