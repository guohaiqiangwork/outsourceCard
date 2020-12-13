<template>
	<view style="padding-top:calc(30upx +  var(--status-bar-height))">
		<view class="page_widthMoudel background_colorff">
			<view class="moudel_list">
				<view class="font_size30">提现金额</view>
				<view class="uni-flex border_bottom margin_top6">
					<view class="font_size50">¥</view>
					<view class="margin_left3 margin_top3"><input @input="getAmount" type="number" :value="amount" /></view>
				</view>
				<view class="font_size26 font_color99 margin_top3">
					可提现金额￥{{ handFeeTax.balance }}
					<text class="font_color33 margin_left3" @click="overMoney">全部提现</text>
				</view>
				<view class="font_size26 font_color99 margin_top3">
					税费：￥{{ handFeeTax.taxes }}/%
					<text class=" margin_left3">手续费：￥{{ handFeeTax.handFee }}/%</text>
				</view>
				<!-- <view class="uni-flex border_bottom margin_top6 display_space padding_bottom3">
					<view class=""><input type="text" value="" placeholder="请输入验证码" /></view>
					<view class=""><view class="yz_m">5T78</view></view>
				</view> -->

				<view class="uni-flex border_bottom margin_top6 display_space padding_bottom3">
					<view class="width50"><input maxlength="4" @input="getCode" type="text" value="" placeholder="请输入验证码" /></view>
					<view class="width50 text_right font_color2b font_size30" @click="yzm_function">{{ countdown }}</view>
				</view>
			</view>
		</view>
		<view class="page_widthMoudel">
			<view class="padding_top3" style="max-height: 40vh;height: 20vh;">
				<view class="moudel_list margin_top3u" v-for="(item, index) in list" :key="index">
					<view class="uni-flex">
						<view class="width15 text_center"><image style="width: 70upx;height: 70upx;border-radius: 50%;" :src="item.imgUrl" mode=""></image></view>
						<view class="width70">
							<view class="font_size30">{{ item.bankName }}</view>
							<view class="font_size28">{{ item.bankType }}</view>
							<view class="font_size22">****{{ item.bankCard.substr(-4) }}</view>
						</view>
						<view class="width15 text_center">
							<view class="" @click="checkB(index)">
								<image v-if="item.oneChecked" style="width: 30upx;height: 30upx;" src="../../static/image/icon/check.png" mode=""></image>
								<image v-else style="width: 30upx;height: 30upx;" src="../../static/image/icon/checko.png" mode=""></image>
							</view>
							<view class="" style="margin-top: 70upx;" @click="delectBack(item.id)">
								<image style="width: 30upx;height: 32upx;" src="../../static/image/icon/d.png" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="add_card" @click="goAddCard">添加银行卡</view>
			<view class="tx_btn" @click="goR">提现</view>
		</view>

		<!-- 解绑微信 -->
		<template v-if="cardFalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">确定删除银行卡吗？</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closeWx">取消</view>
						<view class="rightbtn" @click="okWx">确认</view>
					</view>
				</view>
			</view>
		</template>
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
			setFalg: true,
			list: [], //银行列表
			infoData: '',
			code: '',
			handFeeTax: '',
			amount: '',
			cardFalg: false,
			bankId: ''
		};
	},
	onShow() {
		this.init(); //初始化数据
	},
	methods: {
		goAddCard: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/isVerified', data, true).then(res => {
				console.log(res + 'jlkjsj s');
				if (res.data.data) {
					uni.navigateTo({
						url: '../addCard/addCard'
					});
				} else {
					uni.navigateTo({
						url: '../realName/realName'
					});
				}
			});
		},
		// 选择银行卡
		checkB: function(index) {
			this.list[index].oneChecked = !this.list[index].oneChecked;
			this.$forceUpdate();
		},
		getCode: function(e) {
			this.code = e.detail.value;
		},
		getAmount: function(e) {
			this.amount = e.detail.value;
		},
		// 全部提现
		overMoney: function() {
			this.amount = this.handFeeTax.balance;
		},
		// 初始化数据
		init: function() {
			// 查银行卡列表
			var _this = this;
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/bank/list', data, true).then(res => {
				if (res.data.code == '200') {
					_this.list = res.data.data;
					for (let item of _this.list) {
						console.log(item);
						item.oneChecked = false;
						switch (item.bankCode) {
							case 'ICBC':
								item.imgUrl = '../../static/image/bank/gsy.png';
								break;
							case 'ABC':
								item.imgUrl = '../../static/image/bank/nyy.png';
								break;
							case 'CCB':
								item.imgUrl = '../../static/image/bank/jsy.png';
								break;
							case 'BOC':
								item.imgUrl = '../../static/image/bank/zgy.png';
								break;
							case 'COMM':
								item.imgUrl = '../../static/image/bank/jty.png';
								break;
							case 'PSBC':
								item.imgUrl = '../../static/image/bank/yzy.png';
								break;
							case 'SPDB':
								item.imgUrl = '../../static/image/bank/qty.png';
								break;
							case 'CMB':
								item.imgUrl = '../../static/image/bank/zsy.png';
								break;
							default:
								item.imgUrl = '../../static/image/bank/qty.png';
								break;
						}
					}
				}
			});
			// 获取用户信息
			this.$http.get('/api/member/info', data, true).then(res => {
				this.infoData = res.data.data;
			});
			this.$http.get('/api/member/handFeeTax', data, true).then(res => {
				this.handFeeTax = res.data.data;
			});
		},
		// 提现结果
		goR: function() {
			var bankId = '';
			for (let i in this.list) {
				if (this.list[i].oneChecked) {
					bankId = this.list[i].id;
				}
			}
			console.log('44');
			if (!bankId) {
				uni.showToast({
					title: '请选择要提现的银行卡',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			} else if (!this.amount) {
				uni.showToast({
					title: '请填写金额',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			} else if (!this.code) {
				uni.showToast({
					title: '请填写验证码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			} else if (this.amount > this.money) {
				uni.showToast({
					title: '请填写验证码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			}
			var data = {
				mbId: uni.getStorageSync('userId'),
				bankId: bankId,
				amount: this.amount,
				code: this.code
			};
			this.$http.post('/api/withdraw/apply', data, true).then(res => {
				if (res.data.code == '200') {
					uni.navigateTo({
						url: '../withdrawalResults/withdrawalResults?payId=' + res.data.data
					});
				}
			});
		},
		delectBack: function(bankId) {
			this.bankId = bankId;
			this.cardFalg = true;
		},

		closeWx: function() {
			this.cardFalg = false;
		},
		// 删除银行卡
		okWx: function(bankId) {
			this.cardFalg = false;
			var data = {
				bankId: this.bankId
			};
			this.$http.get('/api/bank/untie', data, true).then(res => {
				if (res.data.code == '200') {
					uni.showToast({
						title: '删除成功',
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
					setTimeout(this.init());
				}
			});
		},

		// 获取验证码
		yzm_function: function() {
			var that = this;
			if (!/^1[3456789]\d{9}$/.test(this.infoData.mobile)) {
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
				phone: that.infoData.mobile
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
.product_content_block {
	background-color: #ffffff;
	border-radius: 20upx;
	position: absolute;
	top: 20%;
	height: 362upx;
	width: 600upx;
	margin-left: 75upx;
}

.leftbtn {
	width: 220upx;
	height: 78upx;
	border: 1px solid #2b65eb;
	border-radius: 80upx;
	text-align: center;
	color: #2b65eb;
	line-height: 78upx;
	margin-left: 45upx;
}

.rightbtn {
	width: 220upx;
	height: 78upx;
	background: #2b65eb;
	border-radius: 80upx;
	color: #ffffff;
	text-align: center;
	line-height: 78upx;
	margin-left: 45upx;
}
</style>
