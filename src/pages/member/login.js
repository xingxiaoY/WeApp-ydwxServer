import WxValidate from '../../utils//WxValidate'

const App = getApp()

Page({
	data: {
		form: {
			// userLoginName: '',
			mobile: '',
		},
	},
	onLoad() {
		this.initValidate()
		console.log(this.WxValidate)
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
		console.log(tel);
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

					if(res.data.status == 0){

						wx.showToast({

							title: res.data.code,

							icon: 'loading',

							duration: 1500

						})



					}else{
						console.log(res)
						wx.showToast({

							title: res.data.message,//这里打印出登录成功

							icon: 'success',

							duration: 1000

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



})
