<template>
	<view v-if="innerAudioContext && musicData">
		<view class="player" :class="{'player-tabbar': isTabBar}">
			<view class="player-row" @click="tolink('/pages/song/songDetails?id=' + musicData.id)">
				<image :src="musicData.picUrl ? musicData.picUrl : musicData.al.picUrl " class="player-cover"></image>
				<view class="player-name">{{ musicData.name }}</view>
			</view>
			<image src="../static/img/song/play.svg" mode="widthFix" class="play-icon" @click="playChange" v-if="playState"></image>
			<image src="../static/img/song/pause.svg" mode="widthFix" class="play-icon" @click="playChange" v-else></image>
		</view>
		
		<view class="placeholder"></view>
		<uv-safe-bottom></uv-safe-bottom>
	</view>
</template>

<script setup>
	import { defineProps } from 'vue'
 	import { tolink } from '@/utils/index.js'
	
	import useMusic from '@/hooks/useMusic.js'
	
	defineProps({
		isTabBar: {
			type: Boolean,
			default: false
		}
	})
	
	const { musicData, playState, play, pause, innerAudioContext } = useMusic()
	
	const playChange = () => {
		if(playState.value) {
			pause()
		} else {
			play()
		}
	}
</script>

<style scoped>
	.player {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 100rpx;
		padding: 0 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		z-index: 9;
		border-top: 1px solid rgba(223, 215, 215, 0.6);
	}
	
	.player-cell {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.player-row {
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	.player-cover {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		animation: rotate 16s linear infinite;
	}
	
	.player-name {
		flex: 1;
		padding: 0 30rpx 0 20rpx;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}
	
	.play-icon {
		width: 50rpx;
	}
	
	@keyframes rotate {
	  from {
	    transform: rotate(0deg);
	  }
	  to {
	    transform: rotate(360deg);
	  }
	}
	
	.placeholder {
		height: 100rpx;
	}
	
	.player-tabbar {
		bottom: 100rpx;
	}
</style>