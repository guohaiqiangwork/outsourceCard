<template>
	<view style="padding-top:calc(30upx +  var(--status-bar-height))">
		<view class="page_widthMoudel background_colorff">
			<view class="moudel_list">
				<view class="font_size30">提现金额</view>
				<view class="uni-flex border_bottom margin_top6">
					<view class="font_size50">¥</view>
					<view class="margin_left3 margin_top3"><input type="text" value="" /></view>
				</view>
				<view class="font_size26 font_color99 margin_top3">
					可提现金额￥1,0000.00
					<text class="font_color33 margin_left3">全部提现</text>
				</view>
				<view class="uni-flex border_bottom margin_top6 display_space padding_bottom3">
					<view class=""><input type="text" value="" placeholder="请输入验证码" /></view>
					<view class=""><view class="yz_m">5T78</view></view>
				</view>

				<view class="uni-flex border_bottom margin_top6 display_space padding_bottom3">
					<view class=""><input type="text" value="" /></view>
					<view class="font_color2b font_size30" @click="yzm_function">{{ countdown }}</view>
				</view>
			</view>
		</view>
		<view class="page_widthMoudel">
			<view class="padding_top3">
				<view class="moudel_list margin_top3u" v-for="(item, index) in [1, 2]" :key="index">
					<view class="uni-flex">
						<view class="width15 text_center"><image style="width: 70upx;height: 70upx;border-radius: 50%;" src="../../static/image/cs.png" mode=""></image></view>
						<view class="width70">
							<view class="font_size30">中国工商银行</view>
							<view class="font_size28">储蓄卡</view>
							<view class="font_size22">**** **** **** 6241</view>
						</view>
						<view class="width15 text_center">
							<view class="">
								<image style="width: 30upx;height: 30upx;" src="../../static/image/icon/check.png" mode=""></image>
								<!-- <image style="width: 30upx;height: 30upx;" src="../../static/image/icon/checko.png" mode=""></image> -->
							</view>
							<view class="" style="margin-top: 70upx;"><image style="width: 30upx;height: 32upx;" src="../../static/image/cs.png" mode=""></image></view>
						</view>
					</view>
				</view>
			</view>

			<view class="add_card" @click="goAddCard">添加银行卡</view>
			<view class="tx_btn" @click="goR">提现</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '获取验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			setFalg: true
		};
	},
	onShow() {
		this.init();//初始化数据
	},
	methods: {
		goAddCard: function() {
			uni.navigateTo({
				url: '../addCard/addCard'
			});
		},
		// 初始化数据
		init:function(){
			// 查银行卡列表
			var data ={
				mbId: uni.getStorageSync('userId'),
			}
			this.$http.post('/api/bank/list',data, true).then(res => {
				console.log(JSON.stringify(res))
			});
		},
		// 提现结果
		goR: function() {
			var data = {
				mbId: uni.getStorageSync('userId'),
				bankId: 1,
				amount: '',
				code: ''
			};
			this.$http.post('/api/withdraw/apply', '', true).then(res => {
				// uni.navigateTo({
				// 	url:'../withdrawalResults/withdrawalResults'
				// })
			});
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
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
.yz_m {
	width: 116upx;
	height: 44upx;
	background: #e7eaf2;
	text-align: center;
	line-height: 44upx;
	font-size: 34upx;
}
.add_card {
	width: 220upx;
	height: 64upx;
	border: 1px solid #2b65eb;
	border-radius: 32upx;
	text-align: center;
	line-height: 64upx;
	font-size: 28upx;
	color: #2b65eb;
	margin-top: 30upx;
	margin-left: 35%;
}
.tx_btn {
	width: 590upx;
	height: 90upx;
	background: #2154df;
	border-radius: 50upx;
	color: #ffffff;
	font-size: 30upx;
	text-align: center;
	line-height: 90upx;
	margin-left: 8%;
	margin-top: 145upx;
	margin-bottom: 5%;
}
</style>
