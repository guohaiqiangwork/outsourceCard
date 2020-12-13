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
						<view class="">￥{{result.amount}}</view>
						<view class="font_size22 font_color99">(税费{{result.taxes}}/% 手续费{{result.handFee}}/%)</view>
					</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">实际到账金额</view>
					<view class="font_size30">￥{{result.actualAmount}}</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">到账银行卡</view>
					<view class="font_size30">{{result.fromTo}}</view>
				</view>
				<view class="uni-flex margin_top3">
					<view class="width30 font_size30 font_color66">提现时间</view>
					<view class="font_size30">{{result.createTime}}</view>
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
			tradeNo:'',
			result:''
		};
	},
	onLoad(option) {
		this.tradeNo= option.payId;
		this.init()
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
			this.$http.get('/api/withdraw/result',data,true).then(res => {
				this.result = res.data.data
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
