// pages/home/index.js

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

		zlts:[
			{
				img:'/image/home/home-ico6.png',
				title:'工程建设',
				tsnum:'',
				wdnum:''
			}, {
				img: '/image/home/home-ico7.png',
				title: '工程合规性',
				tsnum: '',
				wdnum: ''
			}, {
				img: '/image/home/home-ico8.png',
				title: '服务履约',
				tsnum: '',
				wdnum: ''
			}, {
				img: '/image/home/home-ico9.png',
				title: '相关建议',
				tsnum: '',
				wdnum: ''
			}
		],

		index_index_navs_tmpl:{
			navs: [
				{
					image: '/image/home/home-ico1.png',
					text: '订单查询',
					url:''
				},
				{
					image: '/image/home/home-ico2.png',
					text: '送货查询',
					url: ''
				},
				{
					image: '/image/home/home-ico3.png',
					text: '物流跟踪',
					url: ''
				},
				{
					image: '/image/home/home-ico4.png',
					text: '结算付款',
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
					sessionKey:res.data.sessionKey,
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
		wx.showTabBarRedDot({
			index: 1
		})
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
