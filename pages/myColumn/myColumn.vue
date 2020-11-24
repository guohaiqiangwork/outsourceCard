<template>
	<view>
		<view class="page_widthMoudel">
			<view  v-for="(item,index) in courseList" :key="index" class="border_bottom padding_bottom3 padding_top3 uni-flex">
				<view class="width30"><image style="width: 180upx;height: 180upx;" :src="item.picture" mode=""></image></view>
				<view class="width75">
					<view class="font_size30 font_size22 text_hidden font_weight700">
						{{item.courseName}}
					</view>
					<view class="font_sise24 font_color99 text_hidden margin_top1">
						{{item.courseTitle}}
					</view>
					<view class="font_size22 font_color99 margin_top6">
						{{item.unlockNum}}人已学习
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
				courseList:[]
			}
		},
		onLoad() {
		this.init();	
		},
		methods: {
			init: function() {
				var data = {
					mbId: uni.getStorageSync('userId'),	
				};
				this.$http.get('/api/goodsOrder/courseList', data, true).then(res => {
					this.courseList = res.data.data
				});
			},
		}
	}
</script>

<style>

</style>
