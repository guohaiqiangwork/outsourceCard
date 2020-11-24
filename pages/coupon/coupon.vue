<template>
	<view>
		<view class="page_widthMoudel">
			<view class="card_moudel" v-for="(item,index) in [1,2,3]" :key="index">
				<view class="uni-flex display_space">
					<view class="uni-flex width50">
						<view class="left_falg"></view>
						<view class="font_size26 font_color22 margin_left3">
							双11孵化营专属券
						</view>
					</view>
				
					<view class="font_color99 font_size22">
						有效期至2020-09-29
					</view>
				</view>
				
				<view class="font_size44 font_colorf7 margin_top6">
					100元 <text class="font_color22">无门槛券</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.card_moudel{
	background-image: url(../../static/image/cs.png);
	background-size: 100% 100%;
	height: 140upx;
	margin-top: 30upx;
	padding: 30upx;
}
.left_falg{
	width: 6upx;
	height: 26upx;
	background: #f75349;
	border-radius: 3upx;
	margin-top: 2%;
}
</style>
