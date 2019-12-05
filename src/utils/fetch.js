
const apiUrlTable = {
	dev: 'http://10.168.11.171:8088',
	server: 'http://weixin2.sinoprof.com:8088',
	release: 'https://weixin2.sinoprof.com:8443',
};
const apiUrl = apiUrlTable.release;

module.exports = (method, url, data) => {
	return new Promise((resolve, reject ) => {
		wx.request({
			url: apiUrl + '/' + url,
			data: data,
			method: method,
			header: {
				'content-type': method == 'GET'?'application/json':'application/x-www-form-urlencoded',
				'Accept': 'application/json'
			},
			dataType: 'json',
			success: resolve,
			fail: reject
		})
	})
}
