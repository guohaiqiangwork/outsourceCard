<template>
	<view style="padding-bottom: 99upx;">
		<view class="top_moudel">
			<view class="uni-flex   font_weight700">
				<view class="font_size40 width15">银行</view>
				<view style="border-right: 1px solid #FF9D95;height: 26upx;width: 1upx;margin-top: 4%; "></view>
				<view class="font_size40 margin_left3">平安银行快贷</view>
			</view>

			<view class="uni-flex">
				<view class="width50 text_center ">
					<view class=" font_size75 font_weight700">500000</view>
					<view class="font_size26">授信额度(元)</view>
				</view>
				<view class="" style="margin-top:7%; width: 1px;height: 140upx;opacity: 0.3;border-left: 1px solid #ffffff;"></view>
				<view class="width50 text_center margin_top6">
					<view class="uni-flex display_center">
						<view class="font_size24 margin_top2 width50">结算周期</view>
						<view class="font_size30 font_weight700 width50">自动结算</view>
					</view>
					<view class="uni-flex display_center margin_top8">
						<view class="font_size24 margin_top2 width50">授信期限</view>
						<view class="font_size30 font_weight700 width50">6个月</view>
					</view>
				</view>
			</view>
		</view>

		<view class="page_widthMoudel margin_top4u">
			<view class="font_size40 font_weight700 margin_top3u">申请条件</view>

			<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
				<view class="font_size26 ">
					1.消费贷:新老户放款成功符合结算规则 2.经营贷:放款成功后，需要贷满30天，方符合结算规 则;贷款1 80天内提前还款后再次申请，不再结算佣金。
				</view>
			</view>

			<view class="font_size40 font_weight700 margin_top3u">注意事项</view>

			<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;"><view class="font_size26 ">查上征信</view></view>

			<view class="font_size40 font_weight700 margin_top3u">申请人信息</view>

			<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;margin-bottom: 5%;">
				<view class="uni-flex border_bottom padding_top3 padding_bottom3">
					<view class="font_size26 width30">本人姓名</view>
					<view class=""><input @input="keyName" type="text" value="" /></view>
				</view>
				<view class="uni-flex border_bottom padding_top3 padding_bottom3">
					<view class="font_size26 width30">本人身份证号</view>
					<view class=""><input @input="keyIdCard" type="text" value="" /></view>
				</view>
				<view class="uni-flex border_bottom padding_top3 padding_bottom3">
					<view class="font_size26 width30">常用手机号码</view>
					<view class=""><input @input="keyPhone" type="text" value="" /></view>
				</view>
				<view class="uni-flex  padding_top3 ">
					<view class="font_size26 width30">短信验证码</view>
					<view class="width40"><input @input="keyCode" type="text" value="" /></view>
					<view class="font_colorf4 width30 text_center" @click="yzm_function">{{ countdown }}</view>
				</view>
			</view>
		</view>
		<view class="bottom_btn" @click="goPage">立即申请</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			productId: '',
			countdown: '获取验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			name:'',
			idCard:'',
			userPhone:'',
			code:''
		};
	},
	onLoad(option) {
		console.log(option);
		// this.productId = option.id;
	},
	methods: {
		// 姓名
		keyName: function(event) {
			this.name = event.target.value;
		},
		// 身份证
		keyIdCard:function(event){
			this.idCard = event.target.value;
		},
		// 电话
		keyPhone:function(event){
			this.userPhone = event.target.value;
		},
		// 验证妈
		keyCode:function(event){
			this.code = event.target.value
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
		
		// 我要推广
		goPage: function() {
			uni.navigateTo({
				url: '../extension/extension?titel=' + '推广产品名称'
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.top_moudel {
	height: 323upx;
	background: #f75349;
	padding: 50upx 40upx;
	padding-bottom: 0;
	color: #ffffff;
}
.right_btn_one {
	width: 54upx;
	height: 26upx;
	background: #f75349;
	border-radius: 8upx;
	text-align: center;
	line-height: 26upx;
	color: #ffffff;
	font-size: 18upx;
	margin-top: 2%;
	margin-left: 3%;
}
.bottom_btn {
	width: 100%;
	height: 88upx;
	background: #f75349;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	position: fixed;
	bottom: 0;
}

.product_content_block {
	background-color: #ffffff;
	border-radius: 20upx;
	position: absolute;
	top: 20%;
	max-height: 900upx;
	width: 600upx;
	margin-left: 75upx;
	padding-bottom: 40upx;
}
.moudel_btn {
	width: 90%;
	margin-left: 5%;
	height: 88upx;
	background: #f75349;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	font-size: 32upx;
	color: #ffffff;
	margin-top: 30upx;
}
</style>
