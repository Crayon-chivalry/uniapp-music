<template>
	<view>
		<view class="header">
			<uv-icon name="arrow-left" class="back-icon" @click="back"></uv-icon>
			<uv-search :placeholder="showKeyword" v-model="keyword"></uv-search>
		</view>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	
	import { getKeyword } from '@/api/search.js'
	
	let keyword = ref("")
	let showKeyword = ref("请输入搜索内容2")
	
	onLoad(() => {
		getKeywordData()
	})
	
	const back = () => {
		uni.navigateBack()
	}
	
	const getKeywordData = async () => {
		let { data } = await getKeyword()
		showKeyword.value = data.data.showKeyword
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
</style>
