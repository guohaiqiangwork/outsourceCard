<template>
	<view>
		<view class="">
			<view class="moudel margin_top3u" v-for="(item,index) in [1,2,3,4,5,6]" :key="index">
				<view class="font_sise28 text_center">信帮手</view>
				<view class="font_colorf4 font_size54 font_weight700 text_center">
					20
					<text class="font_size24">元</text>
				</view>
				<view class="font_size22 font_color99 text_center">统一返</view>
				<view class=""><view class="list_one" v-for="(item, index) in [1, 2]" :key="index">T+1结</view></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {}
};
</script>

<style lang="less">
.moudel {
	width: 30%;
	background: #ffffff;
	border-radius: 10upx;
	padding: 30upx 0upx;
	font-size: 16upx;
	display: inline-block;
	margin-left: 2.5%;
}
.list_one {
	width: 30%;
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 8%;
	margin-top: 10upx;
}
</style>
