<template>
	<view>
		<view class="page_widthMoudel">
			<view class="moudel_list margin_top3u">
				<view
					class="border_bottom padding_bottom3 padding_top3"
					:style="index == [1, 2, 3, 4].length - 1 ? 'border:none' : ''"
					v-for="(item, index) in [1, 2, 3, 4]"
					:key="index"
				>
					<view class="uni-flex">
						<view class="width50">
							<view class="font_size54 font_weight700 font_colorf4">
								100
								<text class="font_size24">元</text>
							</view>
							<view class="font_size22 font_color99">最高反</view>
						</view>
						<view class="width50 margin_top3">
							<view class="font_size28 font_weight700 font_color22">中信信用卡面签版</view>
							<view class="font_size22 font_color99">
								<view class="list_one" >
									T+1结
								</view>
							</view>
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
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.list_one {
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
	margin-top: 10upx;
}
</style>
