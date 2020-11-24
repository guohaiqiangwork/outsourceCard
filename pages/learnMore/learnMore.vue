<template>
	<view>
		<view class="page_widthMoudel">
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="left_fa"></view>
				<view class="font_size30 font_color22 margin_left3 margin_top2">
					新人必知
				</view>
			</view>
			<view class=" border_bottom padding_bottom3 padding_top3">
				<view class="uni-flex display_space" @click="openImg">
					<view class="font_size30 font_color22">
						1.什么是汇创精选
					</view>
					<view class="">
						<image style="width: 20upx;height: 12upx;" src="../../static/image/icon/down99.png" mode=""></image>
					</view>
				</view>
				<view class="" v-if="imgFalg == 1">
					<image style="width: 100%;height: 744upx;" src="../../static/image/cs.png" mode=""></image>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgFalg:0
			}
		},
		methods: {
			openImg:function(){
				this.imgFalg = 1
			}
		}
	}
</script>

<style lang="less">
.left_fa {
	width: 6upx;
	height: 35upx;
	background: #2b65eb;
	border-radius: 3upx;
	margin-top: 3%;
}
</style>
