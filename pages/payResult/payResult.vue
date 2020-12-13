<template>
	<view>
		<view class="text_center " style="padding-top: 80upx;">
			<view class=""><image src="../../static/image/noData/7.png" style="width: 365upx;height: 394upx;" mode=""></image></view>
			<view class="font_size30 margin_top3u">支付成功</view>

			<view class="btn" @click="goHome">完成</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		goHome:function(){
			uni.switchTab({
				url:'../tabBar/one/one'
			})
		}
	}
};
</script>

<style lang="less">
.btn {
	width: 530upx;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 30upx;
	margin-left: 110upx;
	margin-top: 30%;
}
</style>
