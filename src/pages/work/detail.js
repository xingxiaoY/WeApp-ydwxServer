// pages/work/detail.js
const util = require('../../utils/util');
const aes = require('../../utils/aes_util');
const fetch = require('../../utils/fetch');

let app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		headerId: 0,
		showZeroQty: '',		//查询送货行时， 显示/不显示送货数量为0的数据'
		shipmentHeaderId: '',
		projectName: '',
		poSegment1: '',
		creationDate: '',
		segment1: '',
		orgName: '',
		transer: '',
		vendorContractName: '',
		vendorContractPhone: '',
		rcvContractAddress: '',
		rcvContractName: '',
		rcvContractPhone: '',
		poAmountTax: '',
		totalQuantity: '',
		// 收货日期
		date: "",
		calendarShow: false,
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
		bottomSize: 120,
		empty: false
	},
	// 收货日期
	select({ detail }) {
		console.log(detail.text)
		this.setData({ date: detail.text });
		this.offCalendar();
	},
	openCalendar() {
		this.setData({ calendarShow: true });
	},
	offCalendar() {
		this.setData({ calendarShow: false });
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let method = 'GET';
		let url = 'apiVendorDeliver/getApiVendorDeliver?';
		let data = {
			headerId: options.headerId
		}
		fetch(method, url, data).then(res => {
			let resCode = res.data.code;
			let resData = aes.Decrypt(res.data.data);
			console.log(res)
			console.log(resCode)
			console.log(resData)
			if(resCode === '0') {
				this.setData({
					headerId: options.headerId,
					projectName: resData.projectName,
					poSegment1: resData.poSegment1,
					segment1: resData.segment1,
					orgName: resData.orgName,
					transer: resData.transer,
					vendorContractName: resData.vendorContractName,
					vendorContractPhone: resData.vendorContractPhone,
					rcvContractAddress: resData.rcvContractAddress,
					rcvContractName: resData.rcvContractName,
					rcvContractPhone: resData.rcvContractPhone,
					poAmountTax: resData.poAmountTax,
					totalQuantity: resData.totalQuantity,
					showZeroQty: resData.showZeroQty,
					shipmentHeaderId: resData.shipmentHeaderId,
				})
				// 发货单产品清单
				this.getList('refresh', app.globalData.pageStart);
			} else {

			}
		})
	},
	getList(type, currentPage) {
		if(this.data.end) return;

		this.setData({
			requesting: true
		})

		wx.showNavigationBarLoading()

		let method = 'GET';
		let url = 'apiVendorDeliver/getApiLines?';
		let data = {
			headerId: this.data.headerId,
			pageNo: currentPage + 1,
			pageSize: app.globalData.pageSize
		}
		fetch(method, url, data).then(res => {
			let resCode = res.data.code;
			let resData = aes.Decrypt(res.data.data.list);
			const hasMore = (currentPage + 1) >= res.data.data.pages;
			/*console.log(resCode)
			console.log(resData)*/
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
	/*refresh() {
		this.getList('refresh', app.globalData.pageStart);
		this.setData({
			empty: false
		})
	},*/
	// 加载更多
	more() {
		this.getList('more', this.data.page);
	},
	formSubmit: function (e) {
		var userInfo = wx.getStorageSync('userInfo');
		var userLoginName = userInfo.userLoginName;
		let type = e.detail.target.dataset.type;
		let newObj = {};
		let postVal = e.detail.value;
		let postData = {
			curLoginName: userLoginName,
			headerId: this.data.headerId,
			authorizationStatus: type,
			actuallyArriveDate: '',
			segment1: this.data.segment1,
			transer: this.data.transer,
			contractName: this.data.vendorContractName,
			contractPhone: this.data.vendorContractPhone,
		}
		newObj  = {...postVal, ...postData};						//ES6 对象生成一个新对象
		let method = 'POST';
		var data = newObj;
		console.log(data)
		console.log(1111111111111111111111)
		var url = 'apiVendorDeliver/apiSubmit?';
		if(type === '') {
			wx.showModal({
				title: "信息提示",
				content: "处理失败"
			});
		}
		fetch(method, url, data).then(res => {
			console.log(res)
			let resCode = res.data.code;
			let resData = aes.Decrypt(res.data.data);
			console.log(resCode)
			console.log(resData)
			if(resCode === '0') {
				wx.showToast({
					title: res.data.message,
					icon: 'success',
					duration: 1500,
					success:function(){
						setTimeout(function () {
							if (type === 'IN PROCESS') {
								wx.navigateTo({
									url: '/pages/work/index'
								})
							}
						}, 1000) //延迟时间
					}
				})
			}
		})
	}

})
