// pages/login/index.js

const aes = require('../../utils/aes_util');
const fetch = require('../../utils/fetch');

let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		//首页list页面入口
		userLoginName:'',
		hiddenName:'',
		hiddenimg:true,
		numData:'',

		my_index_navs_tmpl:{
			navs: [
				{
					image: '/image/my/my-ico1.png',
					text: '订单',
					url:''
				},
				{
					image: '/image/my/my-ico2.png',
					text: '送货',
					url: ''
				},
				{
					image: '/image/my/my-ico3.png',
					text: '物流',
					url: ''
				},
				{
					image: '/image/my/my-ico4.png',
					text: '结算',
					url: ''
				}
			]
		}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		//缓存用户名信息
		wx.getStorage({
			key: 'userInfo',
			success: function(res) {
				console.log(res.data)
				that.setData({
					userLoginName:res.data.userLoginName,
					attr2:res.data.attr2,
					hiddenName:!that.data.hiddenName,
					hiddenimg:'',
				})
				//代办数量
				let method = 'GET';
				let url = 'apiVendorDeliver/getAgentNumber';
				let data = {
					curLoginName: res.data.userLoginName,               //当前代办数量
				}

				fetch(method, url, data).then(res => {
					// console.log(res); //返回参数
					let resCode = res.data.code;
					let resData = aes.Decrypt(res.data.data);
					// console.log(res.data)
					if(resCode === '0') {
						that.setData({
							numData: resData,
						})
					}
				})
			}
		});
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

	}
})
