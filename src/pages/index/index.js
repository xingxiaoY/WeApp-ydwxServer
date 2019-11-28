// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //首页list页面入口
    zlts:[
      {
        img:'/image/home/home-ico6.png',
      title:'工程建设',
      tsnum:'2',
      wdnum:'23'
      }, {
        img: '/image/home/home-ico7.png',
        title: '工程合规性',
        tsnum: '1',
        wdnum: '23'
      }, {
        img: '/image/home/home-ico8.png',
        title: '服务履约',
        tsnum: '1',
        wdnum: '23'
      }, {
        img: '/image/home/home-ico9.png',
        title: '相关建议',
        tsnum: '1',
        wdnum: '23'
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
