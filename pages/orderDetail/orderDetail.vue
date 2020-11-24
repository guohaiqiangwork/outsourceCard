<template>
	<view>
		<view class="page_widthMoudel" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view @click="goDetail(item)" class="border_bottom padding_bottom3 padding_top3 uni-flex">
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
			</view>

			<view class="font_sise36 margin_top4">结算</view>
			<view class="uni-flex display_space margin_top3u">
				<view class="font_sise28">商品金额</view>
				<view class="font_sise34">{{ detailData.price }}元</view>
			</view>
			<view class="width70 margin_top1 font_color99" style="font-size: 18upx;">*你将购买的商品为虚拟内容服务，购买后不支持退换、转让、请斟酌确定</view>

			<view class="font_sise36 margin_top4 padding_bottom3">支付方式</view>
			<view class="uni-flex border_bottom padding_bottom3 padding_top3" v-for="(item, index) in payList" :key="index">
				<view class="uni-flex width60">
					<view class="width15 margin_top1"><image style="width: 40upx;height: 40upx;" :src="item.url" mode=""></image></view>
					<view class="font_sise30">{{ item.name }}</view>
					<view class="font_color99 margin_left3" style="font-size: 18upx;">随机立减</view>
				</view>
				<view class="text_right width30" @click="imgTab(item.falg)">
					<image v-if="payF == item.falg" style="width: 30upx;height: 30upx;" src="../../static/image/icon/20.png" mode=""></image>
					<image v-else style="width: 30upx;height: 30upx;" src="../../static/image/icon/19.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="bottm_btn2 uni-flex">
			<view class="left font_size44">
				{{ detailData.price }}
				<text class="font_size30">元</text>
			</view>
			<view class="right" @click="goPay">立即购买</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			detailData: '',
			payList: [{ url: '../../static/image/icon/17.png', name: '支付宝', falg: 'zfb' }, { url: '../../static/image/icon/18.png', name: '微信', falg: 'wx' }],
			payF: 'wx'
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.init();
	},
	methods: {
		init: function() {
			var data = {
				id: this.id
			};
			// 课程内容详情
			this.$http.get('/api/course/detail', data, true).then(res => {
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
		// 去支付
		goPay:function(){
			var data = {
				mbId: uni.getStorageSync('userId'),
				courseId: this.detailData.id
			};
			// 课程详情
			this.$http.post('/api/order/goodsOrder', data, true).then(res => {
				console.log(JSON.stringify(res));
				this.detailData = res.data.data;
			});
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
		width: 35%;
		color: #ffffff;
		font-size: 32upx;
		text-align: center;
		background-color: #2b65eb;
		line-height: 88upx;
	}
}
</style>
