<template>
	<view>
		<view class="">
			<image src="../../static/image/logB.png" mode="" class="image_width"></image>
			<view class="login_moudel">
				<view class="font_color22 font_weight700 font_size50">绑定手机号</view>
				<view class="font_size30 font_color99">未注册的手机号验证通过后将自动注册</view>
				<view class="font_size30 font_color99" style="margin-top: 100upx;">请输入手机号码</view>
				<view class="uni-flex" style="margin-top: 80upx;">
					<view class="margin_top3 " style="width: 100%;">
						<input class="phone_input" type="number" :value="userPhone" maxlength="11" @input="keyPhone" placeholder="" placeholder-style="color:#484848" />
					</view>
					<view v-if="userPhone.length == 11 " @click="closePhone" class="" style="position: absolute;right: 3%;margin-top:5%">
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
			userPhone: ''
		};
	},
	onLoad() {
		// this.getIos();
	},
	methods: {
		// 手机号
		keyPhone: function(event) {
			this.userPhone = event.target.value;
		},
		// 获取验证码
		yzm_function: function() {
			uni.navigateTo({
				url: '../codeLogin/codeLogin?phone=' + this.userPhone
			});
		},
		closePhone:function(){
			this.userPhone =''
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
