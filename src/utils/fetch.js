
const apiUrlTable = {
	dev: 'http://10.168.11.171:8088',
	release: 'https://weixin2.sinoprof.com:8443',
};
const apiUrl = apiUrlTable.release;

module.exports = (url, data) => {
	return new Promise((resolve, reject ) => {
		wx.request({
			url: apiUrl + '/' + url,
			data: data,
			success: resolve,
			fail: reject
		})
	})
}
