<template>
	<view>
		<view class="">
			<image style="height: 100%;" src="../../static/image/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel" v-if="false">
				<view class="font_color00 font_size50 font_weight700">欢迎登录汇创精选</view>
				<view class="font_size30 font_color99">未注册的手机号验证通过后将自动注册</view>
				<view class="font_size30 font_color99" style="margin-top: 100upx;">请输入手机号码</view>
				<view class="uni-flex" style="margin-top: 60upx;">
					<view class="margin_top3 " style="width: 100%;">
						<input class="phone_input" type="number" :value="userPhone" maxlength="11" @input="keyPhone" placeholder="" placeholder-style="color:#484848" />
					</view>
					<view v-if="userPhone.length == 11" @click="closePhone" class="" style="position: absolute;right: 3%;margin-top:5%">
						<image style="width: 20upx;height: 20upx;" src="../../static/image/icon/close.png" mode=""></image>
					</view>
				</view>
				<view class="font_size22 font_color99 margin_top3u">
					输入手机号申请注册/登录即代表您同意
					<text @click="goUserConter('userAgreement')" class="font_color2b">《注册协议》</text>
					和
					<text @click="goUserConter('userPrivacy')" class="font_color2b">《隐私政策》</text>
				</view>
				<view @click="yzm_function" class="code_btn" :style="userPhone.length == 11 ? 'background:#2b65eb' : 'background:#87A5EB'">{{ countdown }}</view>

				<view class=" text_center wx_log_moudel">
					<view class="uni-flex display_center">
						<view class="login_left"></view>
						<view class="font_sise24 font_color99 margin_left3">第三方账号登录</view>
						<view class="login_left margin_left3"></view>
					</view>
					<!-- <view class="font_sise28 font_color00 ">第三方账号登录</view> -->
					<view class=""><image @click="goWxLogin" src="../../static/image/icon/wxf.png" class="img_log" mode=""></image></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			iosFalg: '',
			countdown: '获取短信验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			msgErr: '',
			userPhone: '',
			appid: 'wx46d808b929c79829',
			redirect_url: 'https://www.hcselected.com/frontend'
		};
	},
	onLoad() {
		this.getCode();

		// let code = this.getUrlCode('code');
		// console.log(code + '我是code');

		// if (code) {
		// 	this.getOpenidAndUserinfo(code);
		// }
	},
	onShow() {
		this.memberData = this.$member.memberObj;
	},
	methods: {
		getCode: function() {
			// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
			let code = this.getUrlCode('code');
			if (code === null || code === '') {
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					this.appid +
					'&redirect_uri=' +
					this.redirect_url +
					'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
			} else {
				this.getOpenidAndUserinfo(code);
			}
		},

		getUrlCode:function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},

		isWechat:function() {
			return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === 'micromessenger';
		},

		getOpenidAndUserinfo: function(code) {
			console.log(JSON.stringify(code) + this.memberData);

			uni.request({
				// url: 'http://127.0.0.1/api/wxLogin?code=' + code + '&state=state&appid=' + appid,
				url: 'https://www.hcselected.com/service/api/common/wx/oauth2getAccessToken',
				data: {
					code: code
				},
				method: 'GET',
				dataType: 'json',
				success: res => {
					console.log('通过code获取openid和accessToken', +JSON.stringify(res));
					if (res.data.code === 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.mbId);
						uni.switchTab({
							url: '../tabBar/one/one'
						});
					} else {
						uni.setStorageSync('nickname', res.data.data.nickname);
						uni.setStorageSync('openId', res.data.data.openId);
						uni.setStorageSync('headImgUrl', res.data.data.headImgUrl);
						uni.navigateTo({
							url: '../bindPhone/bindPhone'
						});
					}
				}
			});
		},

		// 手机号
		keyPhone: function(event) {
			this.userPhone = event.target.value;
		},
		// 获取验证码
		yzm_function: function() {
			if (this.userPhone.length != 11) {
				uni.showToast({
					title: '请输入手机号',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			}

			uni.navigateTo({
				url: '../codeLogin/codeLogin?phone=' + this.userPhone
			});
		},
		closePhone: function() {
			this.userPhone = '';
		},
		// 倒计时
		countDown: function() {
			var that = this;
			if (!that.countdown) {
				that.disabled = false;
				that.timestatus = false;
				that.countdown = '获取验证码';
				clearInterval(that.clear);
			} else {
				--that.countdown;
			}
		},

		// 去用户协议 去隐私协议
		goUserConter: function(page) {
			uni.navigateTo({
				url: '../' + page + '/' + page
			});
		},
		goToBack: function() {
			uni.switchTab({
				url: '../tabBar/home/home'
			});
		},
		goWxLogin: function() {
			// uni.showToast({
			// 	title:'进来了'
			// })
			// #ifdef H5
			this.getCode();
			// #endif

			// #ifndef APP-PLUS

			uni.showLoading({
				title: '加载中'
			});
			var self = this;
			uni.login({
				provider: 'weixin',
				success: res => {
					uni.hideLoading();
					uni.getUserInfo({
						provider: 'weixin',
						success: function(infoRes) {
							uni.showToast({
								title: '微信' + JSON.stringify(infoRes),
								icon: 'none',
								duration: 20000,
								position: 'center'
							});
							console.log(JSON.stringify(infoRes));
							let formdata = {
								nickName: infoRes.userInfo.nickName, //昵称
								avatarUrl: infoRes.userInfo.avatarUrl, //头像
								openId: infoRes.userInfo.openId //
							};
							var data = {
								openid: infoRes.userInfo.openId
							};
							self.$http.post('/api/common/mb/wx', data).then(res => {
								// console.log('微信登录返沪' + JSON.stringify(res))
								// uni.showToast({
								// 	title:JSON.stringify(res),
								// 	icon:'none',
								// 	duration:90000,
								// 	position:'top'
								// })
								if (res.data.code == 200) {
									uni.setStorageSync('token', res.data.data.token);
									uni.setStorageSync('userId', res.data.data.mbId);
									uni.switchTab({
										url: '../tabBar/home/home'
									});
								} else {
									uni.navigateTo({
										url: '../bindPhone/bindPhone?wxData=' + JSON.stringify(formdata)
									});
								}
							});
						}
					});
				},
				fail: err => {}
			});
			// #endif
		},

		getIos: function() {
			this.$http.get('/api/common/ios/switch').then(res => {
				console.log(JSON.stringify(res));
				uni.setStorageSync('iosFalgOne', res.data.data);
				this.iosFalg = res.data.data;
			});
		}
	}
};
</script>

<style lang="less">
.code_btn {
	width: 620upx;
	height: 88upx;
	background: #87a5eb;
	border-radius: 44upx;
	line-height: 88upx;
	text-align: center;
	font-size: 32upx;
	color: #ffffff;
	margin-top: 60upx;
}
.phone_input {
	padding-left: 2%;
	height: 88upx;
	border-bottom: 1px solid #eeeeee;
	border-radius: 10upx;
	line-height: 88upx;
}
.input_border {
	border: 1px solid #003d48;
	height: 88upx;
	line-height: 88upx;
	align-items: center;
	border-radius: 10upx;
}

.bottom_btn {
	height: 88upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	margin-top: 110upx;
	font-size: 32upx;
	border-radius: 20upx;
	background: #003d48;
	border-radius: 10upx;
}

.image_width {
	position: absolute;
	width: 100%;
	height: 100%;
}

.login_moudel {
	position: relative;
	width: 84%;
	margin-left: 8%;
	padding-top: 8%;
}

.img_log {
	width: 90upx;
	height: 90upx;
	border-radius: 50%;
	margin-top: 30upx;
}

.login_left {
	border-top: 1px solid #484848;
	width: 175upx;
	margin-top: 4%;
}

.goBack {
	width: 20upx;
	height: 36upx;
}

.login_moudel_width {
	width: 92%;
	margin-left: 4%;
}

// .yzm_moudel {
// 	width: 184upx;
// 	height: 68upx;
// 	line-height: 68upx;
// 	font-size: 26upx;
// 	text-align: center;
// 	border-radius: 10upx;
// 	color: #fbecdf;

// 	background: linear-gradient(to right, #edcb80, #a58747);
// }

.img_1 {
	width: 30upx;
	height: 30upx;
}

.login_left {
	border-top: 1px solid #707070;
	width: 175upx;
	margin-top: 4%;
}
.wx_log_moudel {
	margin-top: 15vh;
}
</style>
