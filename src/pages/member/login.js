// pages/delivery/detail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		countries: ["中国", "美国", "英国"],
		countryIndex: 0,
		date: "2016-09-01",
		// input默认是1
		num: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled'
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	},

	bindCountryChange: function(e) {
		console.log('picker country 发生选择改变，携带值为', e.detail.value);

		this.setData({
			countryIndex: e.detail.value
		})
	},


})
