let BASEURL = 'http://127.0.0.1:3000'

const request = (config) => {
	return new Promise((resolve, reject) => {
		uni.request({
			url: BASEURL + config.url,
			method: config.method || 'GET',
			data: config.data,
			success(res) {
				resolve(res)
			},
			fail(err) {
				reject(err)
			}
		})
	})
}

export default request