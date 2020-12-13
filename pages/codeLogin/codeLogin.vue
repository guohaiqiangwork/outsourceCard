<template>
	<view>
		<view class="">
			<!-- <image src="../../static/image/logB.png" mode="" class="image_width"></image> -->
			
			<view class="login_moudel">
				<view class="font_size50 font_weight700">
					欢迎登录汇创精选
				</view>
				<view class="font_size30 font_color99" style="margin-top: 80upx;">
					验证码发送至
				</view>
				<view class="margin_top3u" >
					<view class="uni-flex display_space">
						<view class="font_size40 font_color22">
							{{userPhone}}
						</view> 
						<view class="" @click="yzm_function">
							{{ countdown }}
						</view>
					</view>
				
					
					<view class="margin_top3 ">
							<validcode :maxlength="4" :isPwd="false" @finish="getPwd" ref="yzm"></validcode>
						<!-- <input class="phone_input" type="number" maxlength="11" @input="keyCode" placeholder="" placeholder-style="color:#484848" /> -->
					</view>
					
					<view class="font_sise24 font_colorf4 margin_top3">
						{{msgErr}}
					</view>
				</view>
			
				<view class="bottom_btn" @click="getPwd" :style="phoneCode.length == 4 ? 'background:#2b65eb':'background:#87A5EB'">登录/注册</view>
				
			
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			loginTitle: '登录',
			loginFalg: 1,
			inviteCode: '', //邀请码
			iosFalg: '',
			datan: '登录',
			countdown: '获取短信验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			msgErr: '',
			userPhone:'',
			phoneCode:'',
			


		};
	},
	onLoad(option) {
		this.userPhone = option.phone
		this.yzm_function();
	},
	methods: {
		getPwd:function(val){
			console.log(val)
			this.phoneCode = val;
			this.bingYCode()
		},
		// 手机号
		keyPhone: function(event) {
			this.userPhone = event.target.value;
		},
		// 验证码
		keyCode: function(e) {
			this.phoneCode = e.target.value;
		},
		// 获取验证码
		yzm_function: function() {
			var that = this;
			if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (this.timestatus == true) {
				uni.showToast({
					title: '请勿重复点击',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}
			that.disabled = true; //禁用点击
			var phoneData = {
				phone: that.userPhone
			};
			that.$http
				.get('/api/common/mb/sendCode', phoneData, false)
				.then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data));
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center'
						});
					}
				})
				.catch(err => {
					that.disabled = false; //获取失败开启点击
				});
		},
		// 倒计时
		countDown:function() {
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
		
		
		// 立即登录
		bingYCode: function() {
			// uni.switchTab({
			// 	url:'../tabBar/one/one'
			// });
			// return
			console.log(this.phoneCode)
			var loginData = {
				phone: this.userPhone,
				code: this.phoneCode
			};
			if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
				
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (this.phoneCode.length < 4 || this.phoneCode.length > 15) {
				uni.showToast({
					title: '验证码请输入不少于6位',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}
			this.$http
				.post('/api/common/mb/verifyCode', loginData)
				.then(res => {
					console.log('登录返回结果' + JSON.stringify(res));
					if (res.data.code == 200) {
						uni.setStorageSync('token', res.data.data.token);
						uni.setStorageSync('userId', res.data.data.mbId);
						uni.switchTab({
							url: '../tabBar/one/one'
						});
						// uni.navigateBack()
					} else if (res.data.code == 300) {
						uni.navigateTo({
							url: '../bindingCode/bindingCode?phone=' + this.userPhone
						});
					} else {
						this.msgErr = res.data.message;
					}
				})
				.catch(err => {
					uni.showToast({
						title: err.data.message,
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				});
		},
	
	
		// 去用户协议 去隐私协议
		goUserConter: function(page) {
			uni.navigateTo({
				url: '../' + page + '/' + page
			});
		},
		goToBack: function() {
			// uni.navigateBack()
			// if(uni.getStorageSync('userId')){
			// 	uni.navigateBack()
			// }else{
			uni.switchTab({
				url: '../tabBar/home/home'
			});
			// }
		},
		goWxLogin: function() {
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
								console.log('微信登录返沪' + JSON.stringify(res))
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
.code_btn{
	width: 620upx;
	height: 88upx;
	background: #87a5eb;
	border-radius: 44upx;
	line-height: 88upx;
	text-align: center;
	font-size: 32upx;
	color: #FFFFFF;
	margin-top: 60upx;
}
.phone_input {
	padding-left: 2%;
	height: 88upx;
	border-bottom: 1px solid #EEEEEE;
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
	border-radius: 50upx;
}

.image_width {
	position: absolute;
	width: 100%;
	height: 100%;
}

.login_moudel {
	position: relative;
	width: 88%;
	margin-left: 6%;
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


.img_1 {
	width: 30upx;
	height: 30upx;
}



.login_left {
	border-top: 1px solid #707070;
	width: 175upx;
	margin-top: 4%;
}
</style>
