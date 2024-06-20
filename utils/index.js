function tolink(url) {
	uni.navigateTo({
		url
	})
}

function formatDate(timestamp) {
	let date = new Date(timestamp);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0'); // 确保月是两位数
	const day = String(date.getDate()).padStart(2, '0'); // 确保日是两位数

	return `${year}-${month}-${day}`;
}

export {
	tolink,
	formatDate
}