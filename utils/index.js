import store from '@/store/index.js'

// 获取登录状态
function checkLoginState() {
	return store.state.loginState
}

function tolink(url) {
	uni.navigateTo({
		url
	})
}

// 格式日期
function formatDate(timestamp) {
	let date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 确保月是两位数
	const day = String(date.getDate()).padStart(2, '0'); // 确保日是两位数
	return `${year}-${month}-${day}`;
}

// 格式化时间 1:00
function showDuration(milliseconds) {
	let totalSeconds = milliseconds / 1000;
	let minutes = Math.floor(totalSeconds / 60);
	let seconds = Math.floor(totalSeconds % 60);
	// 格式化秒数，确保显示两位数
	let formattedSeconds = seconds < 10 ? '0' + seconds : seconds;
	return minutes + ':' + formattedSeconds;
}

export {
	checkLoginState,
	tolink,
	formatDate,
	showDuration
}