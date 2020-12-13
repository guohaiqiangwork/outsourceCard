<template>
	<view >
		<view class="">
			<image src="../../static/image/cs.png" style="width: 100%;height: 200upx;" mode=""></image>
		</view>
		
		<view class="page_widthMoudel margin_top3">
			<view class="font_size36 font_color22">
				新人奖
			</view>
			<view class="moudel_o  padding_top3">
				<view class="uni-flex padding_bottom3 border_bottom" v-for="(item,index) in [1,2,3,4]" :key="index">
					<view class="margin_top2 width15">
						<image style="width: 66upx;height: 66upx;" src="../../static/image/cs.png" mode=""></image>
					</view>
					<view class="width65">
						<view class="font_size30 " style="color: #FF5454;">
							奖励0.1元
						</view>
						<view class="font_size26 font_color22" style="line-height: 1 ;">
							分享海报到朋友圈
						</view>
					</view>
				
					<view class="width20">
						<view class="list_btn">
							去分享
						</view>
					</view>
				</view>
			</view>
			
			<view class="font_size36 font_color22">
				收单奖
			</view>
			<view class="uni-flex">
				<view class="moudel_t">
					
				</view>
				<view class="moudel_t1">
					
				</view>
			</view>
			
			<view class="font_size36 font_color22">
				团队奖
			</view>
			
			<view class="moudel_o  padding_top3">
				<view class="uni-flex padding_bottom3 border_bottom" v-for="(item,index) in [1,2,3,4]" :key="index">
					<view class="margin_top2 width15">
						<image style="width: 66upx;height: 66upx;" src="../../static/image/cs.png" mode=""></image>
					</view>
					<view class="width65">
						<view class="font_size30 " style="color: #FF5454;">
							奖励0.1元
						</view>
						<view class="font_size26 font_color22" style="line-height: 1 ;">
							分享海报到朋友圈
						</view>
					</view>
				
					<view class="width20">
						<view class="list_btn">
							去分享
						</view>
					</view>
				</view>
			</view>
			
			
			
			
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad(option) {
			uni.setNavigationBarTitle({
				title: option.title
			});
		},
		methods:{
			
		}
	}
</script>

<style lang="less">
.moudel_o{
	margin-top: 30upx;
	padding-left: 30upx;
	padding-right: 30upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 10upx 0upx #e7eaf2; 
}
.list_btn{
	width: 110upx;
	text-align: center;
	line-height: 44upx;
	height: 44upx;
	background: #2b65eb;
	border-radius: 22px;
	font-size: 24upx;
	color: #FFFFFF;
	margin-top: 30upx;
}
.moudel_t{
	width: 47%;
	height: 200upx;
	background: #d4e3f6;
	border-radius: 10upx;
	margin-top: 30upx;
}
.moudel_t1{
	width: 47%;
	height: 200upx;
	background: #fadac5;
	border-radius: 10upx;
	margin-top: 30upx;
	margin-left: 3%;
}
</style>
