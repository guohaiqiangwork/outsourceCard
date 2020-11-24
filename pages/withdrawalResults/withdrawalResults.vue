<template>
	<view>
		<view class="page_widthMoudel">
			<view class="moudel_list margin_top3u ">
				<view class="marign_top5 text_center margin_top8"><image style="width: 138upx;height: 138upx;" src="../../static/image/icon/dui.png" mode=""></image></view>
				<view class="font_sise32 font_weight700 text_center">提现受理中</view>
				<view class="font_sise32 font_weight700 text_center">预计2小时内到账</view>

				<view class="uni-flex margin_top8">
					<view class="width30 font_size30 font_color66">提现金额</view>
					<view class="font_size30">
						<view class="">￥200.00</view>
						<view class="font_size22 font_color99">(税费￥1.00 手续费￥1.00)</view>
					</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">实际到账金额</view>
					<view class="font_size30">￥200.00</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">到账银行卡</view>
					<view class="font_size30">工商银行(3202)</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">提现时间</view>
					<view class="font_size30">2019-08-09 12:30:15</view>
				</view>
			</view>

			<view class="btn_o" @click="goHome">完成</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tradeNo:''
		};
	},
	onLoad(option) {
		this.tradeNo= option.tradeNo
	},
	methods: {

		goHome:function(){
			uni.switchTab({
				url:'../tabBar/one/one'
			})
		},
		init:function(){
			var data={
				tradeNo:this.tradeNo
			}
			this.$http.get('/api/withdraw/result', data, true).then(res => {
				console.log(JSON.stringify(res))
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
.btn_o {
	width: 92%;
	height: 90upx;
	background: #2154df;
	border-radius: 45upx;

	line-height: 90upx;
	text-align: center;
	font-size: 30upx;
	color: #ffffff;
	position: absolute;
	bottom: 5%;
}
</style>
