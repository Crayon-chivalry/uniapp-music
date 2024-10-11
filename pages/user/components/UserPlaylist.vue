<template>
	<view>
		<view class="card">
			<view class="card-header">
				<view class="card-title">{{ title }}</view>
				<view class="card-more" @click="$emit('moreClick')">
					<view>查看全部</view>
					<uv-icon name="arrow-right"></uv-icon>
				</view>
			</view>
			<view class="card-item" v-for="item in list" :key="item.id">
				<view class="card-row">
					<image :src="item.coverImgUrl" mode="widthFix" class="card-item-cover"></image>
					<view>
						<view>{{ item.name }}</view>
						<view class="count">{{ item.trackCount }}首</view>
					</view>
				</view>
				<uv-icon name="more-dot-fill" @click="actionSheet.open()"></uv-icon>
			</view>
			<view class="card-item" v-if="type == 0 && checkLoginState()" @click="popup.open()">
				<view class="card-row">
					<view class="add-cover">
						<uv-icon name="plus"></uv-icon>
					</view>
					<view>创建歌单</view>
				</view>
			</view>
			<uv-empty mode="data" icon="https://cdn.uviewui.com/uview/empty/data.png" text="暂无歌单" v-if="list.length == 0"></uv-empty>
		</view>
		
		<!-- 创建歌单 -->
		<uv-popup ref="popup" mode="bottom" round="10">
			<view class="popup">
				<view class="popup-header">
					<view @click="popup.close()">取消</view>
					<view @click="confirm">完成</view>
				</view>
				<view class="popup-form">
					<uv-input placeholder="请输入歌单名称" border="none" v-model="name"></uv-input>
				</view>
				<view class="check">
					<checkbox-group @change="checkChage">
						<label>
							<checkbox value="privacy" :checked="privacy == 10" style="transform:scale(0.7)" />设置隐私歌单
						</label>
					</checkbox-group>
				</view>
			</view>
		</uv-popup>
		
		<uv-action-sheet ref="actionSheet" :actions="actions" round="10"></uv-action-sheet>
		
	</view>
</template>

<script setup>
	import { ref, defineProps, defineEmits } from 'vue'
	
	import { checkLoginState } from '@/utils/index.js'
	
	defineProps({
		title: {
			type: String,
			default: "我的歌单"
		},
		type: {
			type: null,
			default: 0, // 0 我的歌单 1 收藏歌单 
		},
		list: {
			type: Array,
			default() {
				return []
			}
		}
	})
	
	const $emit = defineEmits(['moreClick', 'confirm'])
	
	const popup = ref(null)
	
	const actionSheet = ref(null)
	
	const actions = [
		{ name: '置顶' },
		{ name: '分享' },
		{ name: '编辑歌单信息' },
		{ name: '删除歌单' },
	]
	
	let name = ref("")
	let privacy = ref("")
	
	const checkChage = (e) => {
		if(privacy.value == '') {
			privacy.value = 10
		} else {
			privacy.value = ''
		}
	}
	
	const confirm = () => {
		uni.showToast({
			title: '接口限制暂无法添加，请前往网易云添加',
			icon: 'none'
		})
		// if(name.value == '') {
		// 	uni.showToast({
		// 		title: '请输入歌单名称',
		// 		icon: 'none'
		// 	})
		// }
		// $emit('confirm', {
		// 	name: name.value,
		// 	privacy: privacy.value
		// })
		// name.value = ''
		// popup.value.close()
	}
</script>

<style scoped>
	.card {
		margin-top: 24rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		background-color: #fff;
	}
	
	.card-header {
		margin-bottom: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-more {
		display: flex;
		align-items: center;
		color: gray;
		font-size: 24rpx;
	}
	
	.card-title {
		font-size: 32rpx;
		font-weight: bold;
	}
	
	.card-item {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.card-item-cover {
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
	
	.add-cover {
		margin-right: 20rpx;
		width: 90rpx;
		height: 90rpx;
		border-radius: 8rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		background-color: rgba(231, 231, 231, 0.8);
	}
	
	.popup {
		padding: 20rpx 30rpx 130rpx;
	}
	
	.popup-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 30rpx;
	}
	
	.popup-form {
		margin-top: 40rpx;
	}
	
	.check {
		margin-top: 30rpx;
		color: gray;
		font-size: 26rpx;
	}
	
	:deep(.uv-popup__content) {
		padding-bottom: 100rpx;
	}
</style>