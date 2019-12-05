// pages/delivery/detail.js
const util = require('../../utils/util');
const aes = require('../../utils/aes_util');
const fetch = require('../../utils/fetch');

let app = getApp();

Page({
	/**
	 * 页面的初始数据
	 */
	data: {
		poSegment1: '',
		creationDate: '',
		orgName: '',
		rcvContractAddress: '',
		rcvContractName: '',
		rcvContractPhone: '',
		headerId: '',
		showZeroQty: '',		//查询送货行时， 显示/不显示送货数量为0的数据'
		shipmentHeaderId: '',	//入库单ID
		/*countries: ["中国", "美国", "英国"],
		countryIndex: 0,*/
		date: null,
		// input默认是1
		num: 1,
		// 使用data数据对象设置样式名
		minusStatus: 'disabled',
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

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		// 发货单详情
		let method = 'POST';
		let url = 'apiVendorDeliver/initApiVendorDeliver?';
		let data = {
			curLoginName: app.globalData.loginUserName,				//当前登录供应商登录名
			poHeaderId: options.poHeaderId,							//订单头id
			inventoryItemFlagDesc: options.inventoryItemFlagDesc,		//送货类型
			organizationId: options.organizationId,					//组织id
			rcvContractName: options.rcvContractName,					//收货联系人名称
			rcvContractId: options.rcvContractId,						//收货联系人id
			rcvContractPhone: options.rcvContractPhone,				//收货联系人电话
			rcvContractAddress: options.rcvContractAddress,			//收货联系人地址
			isDelivery: options.isDelivery,							//是否直发
			projectId: options.projectId,								//项目id
			headerId: options.headerId								//发货单headerid
		}
		fetch(method, url, data).then(res => {
			// console.log(res)
			var time = util.formatTime(new Date(),2);
			let resCode = res.data.code;
			let resData = aes.Decrypt(res.data.data);
			// console.log(resData)
			if(resCode === '0') {
				this.setData({
					date: time,
					poSegment1: resData.poSegment1,
					creationDate: resData.creationDate,
					orgName: resData.orgName,
					rcvContractAddress: resData.rcvContractAddress,
					rcvContractName: resData.rcvContractName,
					rcvContractPhone: resData.rcvContractPhone,
					headerId: resData.headerId,
					showZeroQty: resData.showZeroQty,
					shipmentHeaderId: resData.shipmentHeaderId,
				})
				// 发货单产品清单
				this.getList('refresh', app.globalData.pageStart);
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
			showZeroQty: this.data.showZeroQty != null ? this.data.showZeroQty : '',
			shipmentHeaderId: this.data.shipmentHeaderId != null ? this.data.shipmentHeaderId : '',
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

	/*bindCountryChange: function(e) {
		console.log('picker country 发生选择改变，携带值为', e.detail.value);
		this.setData({
			countryIndex: e.detail.value
		})
	},*/
	formSubmit: function (e) {
		console.log(e.detail.target.dataset.type)
		console.log('form发生了submit事件formSubmit，携带数据为：', e.detail.value)
	},
	/* 点击减号 */
	bindMinus: function() {
		var num = this.data.num;
		// 如果大于1时，才可以减
		if (num > 1) {
			num --;
		}
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num <= 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 点击加号 */
	bindPlus: function(e) {
		let val = e.currentTarget.dataset;
		console.log(e)
		var num = this.data.num;
		// 不作过多考虑自增1
		num ++;
		// 只有大于一件的时候，才能normal状态，否则disable状态
		var minusStatus = num < 1 ? 'disabled' : 'normal';
		// 将数值与状态写回
		this.setData({
			num: num,
			minusStatus: minusStatus
		});
	},
	/* 输入框事件 */
	bindManual: function(e) {
		var num = e.detail.value;
		// 将数值与状态写回
		this.setData({
			num: num
		});
	}

})
