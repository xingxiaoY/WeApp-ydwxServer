import WxValidate from '../../utils//WxValidate'

const App = getApp()

Page({
	data: {
		form: {
			userLoginName: '',
			mobile: '',
		},
	},
	onLoad() {
		this.initValidate()
		// console.log(this.WxValidate) /*输出用户基本信息*/
	},
	showModal(error) {
		wx.showModal({
			content: error.msg,
			showCancel: false,
		})
	},
	submitForm(e) {
		const params = e.detail.value;
		// console.log(params);
		const tel = e.detail.value.tel;
		// console.log(tel);/*输出用户输入手机号*/
		// 传入表单数据，调用验证方法
		if (!this.WxValidate.checkForm(params)) {
			const error = this.WxValidate.errorList[0]
			this.showModal(error)
			return false
		}else{
			wx.request({
				url: 'https://weixin2.sinoprof.com:8443/api/minipro/loginTest',
				header: {
					"Content-Type": "application/x-www-form-urlencoded"
				},
				method: "post",
				data:{mobile:tel},
				// data:{mobile:e.detail.value.tel,userLoginName:e.detail.value.userLoginName},
				success: function(res) {
					const message = res.data.message; //打印出手机号匹配成功
					if(message=='请求成功'){
						// console.log(res.data.data.userLoginName);
						wx.setStorage({
							key:"userLoginName",
							data:res.data.data.userLoginName
						})
						wx.reLaunch({
							url:'../index/index',
							success(res) {
								// 打开成功
							}
						})
					}else{
						wx.showToast({
							title: res.data.message,//打印出登录成功
							icon: 'success',
							duration: 1500,
							success:function(){
								const message = res.data.message; //打印出手机号是否匹配


							},//接口调用成功
						})

					}
				}
			})
		}
	},
	initValidate() {
		// 验证字段的规则
		const rules = {
			text: {
				required: true,
			},
			tel: {
				required: true,
				tel: true,
			},

		}

		// 验证字段的提示信息，若不传则调用默认的信息
		const messages = {
			text: {
				required: '请输入登录名',
			},
			tel: {
				required: '请输入手机号',
				tel: '请输入正确的手机号',
			},
		}

		// 创建实例对象
		this.WxValidate = new WxValidate(rules, messages)
	},

	onShow:function(){

	}
})
