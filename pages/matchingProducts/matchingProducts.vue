<template>
	<view>
		<view class="page_widthMoudel">
			<view class="moudel_list margin_top3u" v-for="(item,index) in [1,2,2]" :key="index">
				<view class="uni-flex">
					<view class="left_fa"></view>
					<view class="font_size34 margin_left3">小花钱包</view>
				</view>
				<view class="uni-flex display_space margin_top3">
					<view class="width50 text_center">
						<view class="font_size75 font_weight700">10000</view>
						<view class="font_size26">授信额度(元)</view>
					</view>
					<view class="width50 margin_top3">
						<view class="uni-flex display_center">
							<view class="font_sise24">日利率</view>
							<view class="font_sise30 margin_left3 font_weight700">低至0.02%</view>
						</view>
						<view class="uni-flex display_center">
							<view class="font_sise24">放款时限</view>
							<view class="font_sise30 margin_left3 font_weight700">最快15分钟</view>
						</view>
						<view class="uni-flex display_center">
							<view class="font_sise24">授信期限</view>
							<view class="font_sise30 margin_left3 font_weight700">3\6\9个月</view>
						</view>
					</view>
				</view>
			</view>
			<view @click="openMoudel" class="bottom_btnOne" style="position: absolute;bottom: 3%;width: 92%;">推荐给客户拿返佣</view>
		</view>
		
		<view v-if="moudelFalg" @click="colseMoudel">
			<view class="moudel_content">
				<image src="../../static/image/cs.png" mode=""></image>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			moudelFalg:false
		};
	},
	methods: {
		openMoudel:function(){
			this.moudelFalg = true
		},
		colseMoudel:function(){
			this.moudelFalg = false
		}
	}
};
</script>

<style lang="less">
.left_fa {
	width: 6upx;
	height: 35upx;
	background: #2b65eb;
	border-radius: 3upx;
	margin-top: 2%;
}
</style>
