const aes = require('../../utils/aes_util');
const fetch = require('../../utils/fetch');

let app = getApp();

Page({
	data: {
		duration: 300,  // swiper-item 切换过渡时间
		showPage: -1, // 控制列表空状态的显示时机
		categoryCur: 0,
		categoryMenu: ["全部", "待发货", "待接收", "投诉建议"],
		categoryData: [
			{
				name: "推荐",
				requesting: false,
				end: false,
				emptyShow: false,
				page: app.globalData.pageStart,
				listData: [],
				type: 0
			},
			{
				name: "待发货",
				requesting: false,
				end: false,
				emptyShow: false,
				page: app.globalData.pageStart,
				listData: [],
				type: 1
			},
			{
				name: "待接收",
				requesting: false,
				end: false,
				emptyShow: false,
				page: app.globalData.pageStart,
				listData: [],
				type: 2
			},
			{
				name: "投诉建议",
				requesting: false,
				end: false,
				emptyShow: false,
				page: app.globalData.pageStart,
				listData: []
			}
		]
	},
	getList(type, currentPage) {
		var userInfo = wx.getStorageSync('userInfo');
		var userLoginName = userInfo.userLoginName;
		let pageData = this.getCurrentData();
		if(pageData.end) return;
		pageData.requesting = true;
		this.setCurrentData(pageData);
		wx.showNavigationBarLoading();

		let method = 'GET';
		let url = 'apiVendorDeliver/getAgentList?';
		let data = {
			curLoginName: userLoginName,
			type: pageData.type,
			pageNo: currentPage + 1,
			pageSize: app.globalData.pageSize
		}
		console.log(data)
		fetch(method, url, data).then(res => {
			let resCode = res.data.code;
			console.log(resCode)
			if(resCode === '0') {
				let resData = aes.Decrypt(res.data.data.list);
				console.log(resData)
				const hasMore = (currentPage + 1) >= res.data.data.pages;
				pageData.requesting = hasMore;
				wx.hideNavigationBarLoading();
				if (type === 'refresh') {
					pageData.listData = resData;
					pageData.end = hasMore;
					pageData.page = currentPage + 1;
				} else {
					pageData.listData = pageData.listData.concat(resData);
					pageData.end = hasMore;
					pageData.page = currentPage + 1;
				}
				if(res.data.data.pages <= 1) {
					pageData.requesting = false;
					pageData.end = true;
				}
				if(res.data.data.pages === 0) {
					pageData.emptyShow = true;
				}
				const restype = res.data.type;
				if(res.data.type == this.data.categoryCur){
					pageData.listData = pageData.listData;
					// console.log(pageData.type)
				}

			} else {
				wx.hideNavigationBarLoading();
				pageData.requesting = false;
				pageData.emptyShow = true;
			}
			this.setCurrentData(pageData);
		})
	},
	// 顶部tab切换事件
	toggleCategory(e) {

		this.setData({
			duration: 0
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.index
			});
		}, 0);
	},
	// 页面滑动切换事件
	swipeChange(e) {
		this.setData({
			duration: 300
		});
		setTimeout(() => {
			this.setData({
				categoryCur: e.detail.current
			});
			this.loadData()
		}, 0);
	},
	// 更新页面数据
	setCurrentData(pageData) {
		let categoryData = this.data.categoryData
		categoryData[this.data.categoryCur] = pageData
		this.setData({
			categoryData: categoryData
		})
	},
	// 获取当前激活页面的数据
	getCurrentData() {
		return this.data.categoryData[this.data.categoryCur]
	},
	// 判断是否为加载新的页面,如果是去加载数据
	loadData() {
		let pageData = this.getCurrentData();
		if (pageData.listData.length === 0) {
			this.getList('refresh', app.globalData.pageStart);
		}
	},
	// 刷新数据
	refresh() {
		this.getList('refresh', app.globalData.pageStart);
	},
	// 加载更多
	more() {
		this.getList('more', this.getCurrentData().page);
	},
	onLoad() {
		// 第一次加载延迟 350 毫秒 防止第一次动画效果不能完全体验
		setTimeout(() => {
			this.getList('refresh', app.globalData.pageStart);
		}, 350);
	}
});
