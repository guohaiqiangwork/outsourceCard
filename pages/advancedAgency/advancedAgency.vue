<template>
	<view>
		<view class="page_widthMoudel" >
			<view @click="goDetail(item)" v-for="(item, index) in listData" :key="index" class="border_bottom padding_bottom3 padding_top3 uni-flex">
				<view class="width30"><image style="width: 180upx;height: 180upx;border-radius: 10upx;" :src="item.pictureUrl" mode=""></image></view>
				<view class="width75">
					<view class="font_size30 font_size22 text_hidden font_weight700">{{ item.name }}</view>
					<view class="font_sise24 font_color99 text_hidden margin_top1">{{ item.title }}</view>
					<view class="uni-flex margin_top8">
						<view class="uni-flex width50 font_size22 font_color99">{{ item.unlockNum }}人已学习</view>
						<view class="uni-flex width50 display_right">
							<view class="font_size22 font_color99">已更新{{ item.periodsUpdateNum }}期</view>
							<view class="font_size22 font_color99 margin_left3">共{{ item.periodsNum }}期</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text_center" style="margin-top: 25vh;" v-if="listData.length == 0">
				<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/3.png" mode=""></image></view>
				<view class="margin_top3 font_sise30">暂无数据</view>
			</view>
		</view>
		
		
		
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			id: '',
			listData: []
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.init();
	},
	methods: {
		//
		init: function() {
			var data = {
				courseTypeId: this.id
			};
			this.$http.get('/api/course/list', data, true).then(res => {
				this.listData = res.data.data;
			});
		},
		goDetail: function(item) {
			console.log(item)
			uni.navigateTo({
				url: '../advancedDetail/advancedDetail?id=' + item.id
			});
		}
	}
};
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
</style>
