<template>
	<view class="">
		<view class="padding_top3 padding_bottom3 border_bottom page_widthMoudel ">
			<view
				@click="tabSwich(index)"
				:class="tabIndexT == index ? 'item_tab_three' : 'item_tab_threen'"
				v-for="(item, index) in tabList"
				:key="index"
				:style="index == 2 ? 'border:none' : ''"
			>
				<view>{{ item.name }}</view>
				<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
			</view>
		</view>
		<!--  -->
		<template>
			<view class="page_widthMoudel">
				<view @click="goDetail(item)" v-for="(item, index) in queryPageaData" :key="index" class="border_bottom padding_bottom3 padding_top3 uni-flex">
					<view class="width30"><image style="width: 180upx;height: 180upx;border-radius: 10upx;" :src="item.imageUrl" mode=""></image></view>
					<view class="width75">
						<view class="font_size30 font_size22 text_hidden font_weight700">{{ item.name }}</view>
						<view class="font_sise24 font_color99 text_hidden margin_top1">{{ item.title }}</view>
						<view class="uni-flex margin_top4">
							<view class="uni-flex width50">
								<view class="font_color99 font_sise24 text_hidden ">{{ item.createTime.substring(5).substring(0,6) }}</view>
								<!-- <view class="list_moudel width50">个人信贷</view> -->
							</view>
							<view class="uni-flex width50 display_right margin_top1">
								<view class="margin_top1"><image style="width: 32upx;height: 24upx;" src="../../static/image/icon/15.png" mode=""></image></view>
								<view class="font_sise24 font_color99 margin_left3">{{ item.num }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="text_center" v-if="queryPageaData.length == 0">
				<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/2.png" mode=""></image></view>
				<view class="margin_top3 font_sise30">暂无数据</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabList: [
				{
					name: '推广课堂'
				},
				{
					name: '贷款课堂'
				},
				{
					name: '信用卡课堂'
				}
			],
			tabIndexT: 0,
			queryPageaData: []
		};
	},
	onLoad(option) {
		console.log(option);
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.init();
	},

	methods: {
		tabSwich: function(e) {
			this.tabIndexT = e;
			this.init();
		},
		goDetail: function(item) {
			console.log(item.id)
			uni.navigateTo({
				url: './detail?id=' + item.id
			});
		},

		init: function() {
			var data = {
				type: this.tabIndexT + 1
			};
			// 培训课堂
			this.$http.get('/api/trainiClass/queryPage', data, true).then(res => {
				this.queryPageaData = res.data.data;
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.item_tab_three {
	display: inline-block;
	width: 33%;
	text-align: center;
	color: #0c0c0c;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #333333;
	font-weight: 700 !important;
	padding-bottom: 30upx;
}

.item_tab_threen {
	display: inline-block;
	width: 33%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 30upx;
}

.bottom_tab {
	margin-left: 35%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}
</style>
