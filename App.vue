<script>
	export default {
		onLaunch: function() {
			// 检测登录状态
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
