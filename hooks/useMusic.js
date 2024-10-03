import { ref } from 'vue'
import { getSongUrl } from '@/api/song.js'

let innerAudioContext  = ref(null) // audio 上下文
let playState = ref(false) // 播放状态
let musicData = ref(null) // 播放信息

let timer = ref(null)
let currentTime = ref(0) // 当前播放时长，毫秒
let totalTime = ref(0) // 歌曲总时长
let progress = ref(0) // 播放进度

export default function useMusic() {
	// 保存音乐信息，并自动播放音乐
	async function setMusicData(e) {
		if(!innerAudioContext.value) {
			innerAudioContext.value = uni.createInnerAudioContext()
		}
		progress.value = 0
		currentTime.value = 0
		let { data : { data } } = await getSongUrl(e.id)
		totalTime.value = data[0].time
		innerAudioContext.value.src = data[0].url
		musicData.value = e
		musicData.value.src = data[0].url
		listen()
		play()
	}
	
	// 监听播放器事件
	function listen() {
		// 播放结束
		// innerAudioContext.value.onEnded(() => {
		// 	destroyTime()
		// })
		// 暂停
		innerAudioContext.value.onPause(() => {
			playState.value = false
			destroyTime()
		})
	}
	
	// 播放
	function play() {
		innerAudioContext.value.play()
		playState.value = true
		setPlayTime()
	}
	
	// 暂停
	function pause() {
		innerAudioContext.value.pause()
	}
	
	// 设置当前歌曲播放时长
	function setPlayTime() {
		destroyTime()
		timer.value = setInterval(() => {
			currentTime.value += 1000
			progress.value = currentTime.value / totalTime.value * 100
		}, 1000)
	}
	
	// 销毁定时器
	function destroyTime() {
		clearInterval(timer.value)
		timer.value = null
	}
	
	return {
		innerAudioContext,
		playState,
		musicData,
		currentTime,
		totalTime,
		progress,
		setMusicData,
		play,
		pause
	}
}
