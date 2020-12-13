<template>
	<view>
		<view class="">
			<view class="">
				<image style="width: 120upx;height: 120upx;border-radius: 50%;position: absolute;top: 2%;left: 42%;z-index: 9;" :src="infoData.headImgurl" mode=""></image>
			</view>
			<view class="" @click="goPay"><image src="../../static/image/my/6.png" style="width: 100%;height: 2800upx;" mode=""></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			infoData:''
		};
	},
	onLoad() {
		this.init()
	},
	methods: {
		init:function(){
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/info', data, true).then(res => {
				this.infoData = res.data.data;
			});
		},
		goPay:function(){
			uni.navigateTo({
				url:'../orderDetail/orderDetail'
			})
		}
	}
};
</script>

<style lang="less">
page{
	background-color: #333333;
}
</style>
