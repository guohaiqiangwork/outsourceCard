<template>
	<view>
		<view class="page_widthMoudel margin_top6 padding_bottom3">
			<view class="font_sise22 font_colorf7">*当月总返佣，次月清算，奖励也于次月统一发放</view>
			<view class="moudel_list margin_top4u">
				<view class="uni-flex display_space border_bottom padding_bottom3 padding_top3">
					<view class="font_size30 margin_top3">本月团队等级</view>
					<view class="font_size54 font_weight700 font_color22">v1</view>
				</view>
				<view class="border_bottom padding_bottom3 padding_top3">
					<view class="font_size30">本月总返佣(元)</view>
					<view class="font_size54 font_weight700">10,000.00</view>
				</view>
				<view class="uni-flex margin_top4 border_bottom padding_bottom3">
					<view class="width50 ">
						<view class="font_size30">我的返佣</view>
						<view class="font_size54 font_weight700 font_color22">7,000.00</view>
					</view>
					<view class="width50 ">
						<view class="font_size30">成员返佣</view>
						<view class="font_size54 font_weight700 font_color22">7,000.00</view>
					</view>
				</view>
			</view>
			
			<view class="margin_top6 font_size36">
				历史团队奖励
			</view>
			<view class="font_size30 margin_top3">
				团队总奖励
			</view>
			<view class="font_size54 margin_top3 font_color22 font_weight700 border_bottom padding_bottom3">
				9,000.00
			</view>
			
			<view class="margin_top3 moudel_list" v-for="(item,index) in [1,2]" :key="index">
				<view class="font_size30 font_color99">
					2020-05
				</view>
				<view class="uni-flex display_space">
					<view class="font_size30">
						团队奖励
					</view>
					<view class="font_size44 font_color22 font_weight700">
						4,000.00
					</view>
				</view>
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
	page{background-color: #FFFFFF;}
</style>
