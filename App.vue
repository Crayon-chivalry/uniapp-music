<script>
	import { nextTick } from 'vue'
	import { useStore } from 'vuex'
	
	export default {
		onLaunch: function() {
			// 检测登录状态
			
			// 暂
			if(uni.getStorageSync('token')) {
				const store = useStore()
				store.commit('setLoginState', true)
			}
		}
	}
</script>

<style>
	:root {
		--main-color: #456AFF;
	}
	
	body {
		font-size: 28rpx;
	}
	
	.row {
		display: flex;
	}
	
	.items-center {
		align-items: center;
	}
	
	.col {
		flex: 1;
	}
	
	.m-btn {
		height: 80rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #fff;
		background-color: var(--main-color);
		border-radius: 99rpx;
	}
</style>
