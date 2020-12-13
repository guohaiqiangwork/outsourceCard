<template>
	<view>
		<view class="page_widthMoudel" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<!-- 	<view @click="goDetail(item)" class="border_bottom padding_bottom3 padding_top3 uni-flex">
				<view class="width30"><image style="width: 180upx;height: 180upx;" :src="detailData.pictureUrl" mode=""></image></view>
				<view class="width75">
					<view class="font_size30 font_size22 text_hidden font_weight700">{{ detailData.name }}</view>
					<view class="font_sise24 font_color99 text_hidden margin_top1">{{ detailData.title }}</view>
					<view class="margin_top4"><view class="o_l">永久使用</view></view>
				</view>
			</view>
			<view class="border_bottom padding_bottom3">
				<view class="uni-flex btn_view ">
					<view class="width70 uni-flex left">
						<view class="margin_top2 margin_left3"><image style="width: 28upx;height: 26upx;" src="../../static/image/tab/threeZ.png" mode=""></image></view>
						<view class="  margin_left3">开通VIP会员免费畅看</view>
					</view>
					<view class="width30 right">去开通</view>
				</view>
			</view> -->

			<view class="margin_top3u font_size36">选择VIP付费类型</view>
			<view class="vip_m uni-flex ">
				<view class="width5 font_color33 margin_top3u font_size30 padding_left3">年度</view>
				<view class="font_size50 font_colorf7 font_weight700 margin_top1 margin_left3 ">{{ detailData.price }}元</view>
				<!-- <view class="" style="border-right: 1px solid #C2C9DC;height: 43upx;margin-top: 30upx;margin-left: 3%;">
					
				</view>
				<view class="width40 font_size26 margin_left3 margin_top3" style="color: #7485AE;">
					节省600元
				</view> -->
			</view>

			<view class="font_size36 margin_top4u">结算</view>
			<view class="uni-flex display_space margin_top3u">
				<view class="font_size28">商品金额</view>
				<view class="font_size34">{{ detailData.price }}元</view>
			</view>
			<view class="width70 margin_top1 font_color99" style="font-size: 18upx;">*你将购买的商品为虚拟内容服务，购买后不支持退换、转让、请斟酌确定</view>

			<view class="font_size36 margin_top4 padding_bottom3">支付方式</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3" v-for="(item, index) in payList" :key="index">
				<view class="uni-flex width70">
					<view class="width15 margin_top1"><image style="width: 40upx;height: 40upx;" :src="item.url" mode=""></image></view>
					<view class="font_size30">{{ item.name }}</view>
					<view class="font_color99 margin_left3 moudel_j">随机立减</view>
				</view>
				<view class="text_right width30" @click="imgTab(item.falg)">
					<image v-if="payF == item.falg" style="width: 30upx;height: 30upx;" src="../../static/image/icon/20.png" mode=""></image>
					<image v-else style="width: 30upx;height: 30upx;" src="../../static/image/icon/19.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="bottm_btn2 uni-flex">
			<view class="left font_size44 font_weight700">
				{{ detailData.price }}
				<text class="font_size30">元</text>
			</view>
			<view class="right" @click="goPay">立即购买</view>
		</view>
	</view>
</template>

<script>
var jweixin = require('jweixin-module');
export default {
	data() {
		return {
			id: '',
			detailData: '',
			payList: [
				// { url: '../../static/image/icon/17.png', name: '支付宝', falg: 'zfb' },
				{ url: '../../static/image/icon/18.png', name: '微信', falg: 'wx' }
			],
			payF: 'wx'
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.init();
	},
	methods: {
		init: function() {
			// 课程内容详情
			this.$http.get('/api/vip/setting', '', true).then(res => {
				console.log(JSON.stringify(res));
				this.detailData = res.data.data;
			});
		},
		goDetail: function() {
			uni.navigateTo({
				url: '../advancedDetail/advancedDetail'
			});
		},
		imgTab: function(item) {
			this.payF = item;
		},
		payRequest: function(item) {
			var self = this;
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: item.data.appId, // 必填，公众号的唯一标识
				timeStamp: item.data.timeStamp, // 必填，生成签名的时间戳
				nonceStr: item.data.nonceStr, // 必填，生成签名的随机串
				package: item.data.packageValue,
				signType: item.data.signType,
				paySign: item.data.paySign, // 必填，签名，见附录1
				jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
			});
			jweixin.ready(function() {
				jweixin.checkJsApi({
					jsApiList: ['chooseWXPay'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
					success: function(res) {
						console.log('checkjsapi Success');
						console.log(res);
					},
					fail: function(res) {
						console.log('res');
						console.log(res);
					}
				});
				jweixin.chooseWXPay({
					timestamp: item.data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
					nonceStr: item.data.nonceStr, // 支付签名随机串，不长于 32 位
					package: item.data.packageValue, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
					signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
					paySign: item.data.paySign, // 支付签名
					success: function(res) {
						// 支付成功后的回调函数

						console.log('paysuccess');
						console.log(res);
						// var route =  'payResult' + '?type=1'
						uni.navigateTo({
							url: '../payResult/payResult'
						});
					},
					cancel: function(r) {
						// var route =  'payResult' + '?type=2'
						uni.navigateTo({
							url: '../payResult/payResult'
						});
					},
					fail: function(res) {
						console.log('payfail');
						console.log(res);
						// var route =  'payResult' + '?type=0'
						uni.navigateTo({
							url: '../payResult/payResult?payFlag=' + JSON.stringify(res.data.data)
						});
					}
				});
			});

			jweixin.error(function(res) {
				console.log('error');
				console.log(res);
				uni.showToast({
					icon: 'none',
					title: '支付失败了',
					duration: 4000
				});
				// config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
				/*alert("config信息验证失败");*/
			});
		},

		// 去支付
		goPay: function() {
			// uni.showToast({
			// 	title: '功能正在赶来，敬请期待',
			// 	icon: 'none',
			// 	duration: 1500,
			// 	position: 'center'
			// });
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http
				.post('/api/order/openVip', data, true)
				.then(res => {
					if (res.data.code == 200) {
						var dataOne = {
							orderNo: res.data.data.orderNo
						};
						this.$http.post('/api/wx/opvipOrderUnifiedOrder', dataOne, true).then(res => {
							console.log(res);
							this.payRequest(res.data);
						});
					}
				})
				.catch(err => {});

			// return;
			// var data = {
			// 	mbId: uni.getStorageSync('userId'),
			// 	courseId: this.detailData.id
			// };
			// // 课程详情
			// this.$http.post('/api/order/goodsOrder', data, true).then(res => {
			// 	console.log(JSON.stringify(res));
			// 	this.detailData = res.data.data;
			// });
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.o_l {
	width: 128upx;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	text-align: center;
	line-height: 28upx;
	color: #cea984;
	font-size: 18upx;
	margin-top: 40upx;
}
.btn_view {
	color: #ffffff;
	font-size: 26upx;
	margin-top: 30upx;
	.left {
		align-items: center;
		height: 66upx;
		line-height: 66upx;
		border-radius: 33upx 0upx 0upx 33upx;
		background: linear-gradient(90deg, #f7ce9e, #ebbc89 35%, #d69c63 99%);
	}
	.right {
		height: 66upx;
		line-height: 66upx;
		background: #2b65eb;
		text-align: center;
		border-radius: 0upx 33upx 33upx 0upx;
	}
}
.bottm_btn2 {
	position: fixed;
	width: 100%;
	border-top: 1px solid #eeeeee;
	height: 88upx;
	padding-left: 40upx;
	bottom: 0;
	.left {
		width: 65%;
		color: #f75349;
		align-items: center;
	}
	.right {
		width: 30%;
		color: #ffffff;
		font-size: 32upx;
		text-align: center;
		background-color: #2b65eb;
		line-height: 88upx;
	}
}
.vip_m {
	width: 690upx;
	height: 100upx;
	background: #f7f8fc;
	border: 1upx solid #2b65eb;
	border-radius: 10upx;
	margin-top: 30upx;
}
.moudel_j {
	// width: 88px;
	height: 28upx;
	background: #f75349;
	border-radius: 6upx;
	font-size: 18upx;
	color: #ffffff;
	text-align: center;
	line-height: 28upx;
	margin-top: 2%;
	padding: 4upx;
}
</style>
