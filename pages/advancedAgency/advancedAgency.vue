<template>
	<view>
		<view class="page_widthMoudel" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view @click="goDetail(item)" v-for="(item, index) in listData" :key="index" class="border_bottom padding_bottom3 padding_top3 uni-flex">
				<view class="width30"><image style="width: 180upx;height: 180upx;" :src="item.pictureUrl" mode=""></image></view>
				<view class="width75">
					<view class="font_size30 font_size22 text_hidden font_weight700">{{ item.name }}</view>
					<view class="font_sise24 font_color99 text_hidden margin_top1">{{ item.title }}</view>
					<view class="uni-flex margin_top4">
						<view class="uni-flex width50 font_size22 font_color99">{{ item.unlockNum }}人已学习</view>
						<view class="uni-flex width50 display_right">
							<view class="font_size22 font_color99">已更新{{ item.periodsUpdateNum }}期</view>
							<view class="font_size22 font_color99 margin_left3">共{{ item.periodsNum }}期</view>
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
				id: this.id
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

<style></style>
