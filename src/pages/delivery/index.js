// pages/delivery/index.js
const aes = require('../../utils/aes_util');
const fetch = require('../../utils/fetch');

let app = getApp();

Page({

	showInput: function () {
		this.setData({
			inputShowed: true
		});
	},
	hideInput: function () {
		this.setData({
			inputVal: "",
			inputShowed: false
		});
	},
	clearInput: function () {
		this.setData({
			inputVal: ""
		});
	},
	inputTyping: function (e) {
		this.setData({
			inputVal: e.detail.value
		});
	},
	data: {
		inputShowed: false,
		inputVal: "",
		// 列表
		isIphoneX: app.globalData.isIphoneX,
		requesting: false,
		end: false,
		emptyShow: false,
		page: app.globalData.pageStart,
		listData: [],
		hasTop: false,
		enableBackToTop: false,
		refreshSize: 90,
		bottomSize: 0,
		empty: false
	},
	getList(type, currentPage) {
		if(this.data.end) return;

		this.setData({
			requesting: true
		})

		wx.showNavigationBarLoading()

		let method = 'GET';
		let url = 'apiVendorDeliver/apiListForCreate?';
		let data = {
			vendorLoginName: app.globalData.loginUserName,
			pageNo: currentPage + 1,
			pageSize: app.globalData.pageSize
		}
		fetch(method, url, data).then(res => {
			let resCode = res.data.code;
			let resData = aes.Decrypt(res.data.data.list);
			const hasMore = (currentPage + 1) >= res.data.data.pages;
			if(resCode === '0') {
				this.setData({
					requesting: hasMore
				})
				wx.hideNavigationBarLoading()
				if (type === 'refresh') {
					this.setData({
						listData: resData,
						page: currentPage + 1
					})
				} else {
					this.setData({
						listData: this.data.listData.concat(resData),
						page: currentPage + 1,
						end: hasMore
					})
				}
				if(res.data.data.pages === 1) {
					this.setData({
						requesting: false,
						end: true
					})
				}
			} else {
				wx.hideNavigationBarLoading()
				this.setData({
					requesting: false,
					emptyShow: true,
				})
			}
		})
	},
	// 刷新数据
	refresh() {
		this.getList('refresh', app.globalData.pageStart);
		this.setData({
			empty: false
		})
	},
	// 加载更多
	more() {
		this.getList('more', this.data.page);
	},
	// 默认加载
	onLoad() {
		this.getList('refresh', app.globalData.pageStart);
	}
});
