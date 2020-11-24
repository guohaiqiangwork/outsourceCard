<template>
	<view>
		<view class="background_color2b" style="height: 200upx;"></view>

		<view class="margin_top3">
			<swiper class="imageContainer" @change="handleChange" circular autoplay>
				<block v-for="(item, index) in lunBo" :key="index">
					<swiper-item><image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image></swiper-item>
				</block>
			</swiper>
		</view>

		<view class="page_widthMoudel margin_top6">
			<view @click="goTab(item)" class="width33  text_center display_inline" v-for="(item, index) in typeData" :key="index">
				<view class=""><image style="width: 60upx;height: 60upx;" :src="item.icon" mode=""></image></view>
				<view class="font_size26 margin_top2">{{ item.name }}</view>
			</view>

			<view class="margin_top6 backgroud_imgOne" @click="goPage('advancedDetail')">
				<view class="uni-flex   " style="width: 95%;border-radius: 30upx 0 0 30upx;">
					<view class="width35 background_colorff" style="">
						<!-- popularData -->
						<image :src="popularData.pictureUrl" style="width: 180upx;height: 180upx;margin-top: 3%;margin-left: 3%;" mode=""></image>
					</view>
					<view class="width65 background_colorff padding_right3">
						<view class="font_size28 margin_top3">{{popularData.name}}</view>
						<view class="font_size24 font_color99 text_hidden margin_top2">{{popularData.title}}</view>
						<view class="uni-flex display_space font_sise22 font_color99 margin_top2">
							<view class="">
								已更新
								<text>{{popularData.periodsUpdateNum}}</text>
								期
							</view>
							<view class="">
								共
								<text>{{popularData.periodsNum}}</text>
								期
							</view>
						</view>
					</view>
				</view>

				<!-- <image src="../../../static/image/cs.png" style="width: 100%;height: 328upx;" mode=""></image> -->
			</view>
			<view class="" v-if="startedData.length > 0">
				<view class="font_size36 font_color22">新手必备</view>
				<view class="">
					<view @click="goPage('advancedDetail')" class="width45 margin_top3u  text_center display_inline margin_left3" v-for="(item, index) in startedData" :key="index">
						<view class=""><image style="height: 180upx;width: 100%;" :src="item.pictureUrl" mode=""></image></view>
						<view class="font_size30 text_center margin_top2">{{ item.name }}</view>
						<view class="uni-flex  font_color99 display_right">
							<view class="font_sise22">已更新{{ item.periodsUpdateNum }}期</view>
							<view class="margin_left3 font_sise22">共{{ item.periodsNum }}期</view>
						</view>
					</view>
				</view>
			</view>

			<view class="margin_top6">
				<view class="padding_top3 padding_bottom3  page_widthMoudel ">
					<view
						@click="tabSwich(index)"
						:class="tabIndexT == index ? 'item_tab_three' : 'item_tab_threen'"
						v-for="(item, index) in tabList1"
						:key="index"
						:style="index == 2 ? 'border:none' : ''"
					>
						<view>{{ item.name }}</view>
						<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
					</view>
				</view>

				<view @click="goDetail(item)" v-for="(item, index) in verifiedData" :key="index" class="border_bottom padding_bottom3 padding_top3 uni-flex">
					<view class="width30"><image style="width: 180upx;height: 180upx;" :src="item.pictureVideoUrl" mode=""></image></view>
					<view class="width75">
						<view class="font_size30 font_size22 text_hidden font_weight700">{{ item.name }}</view>
						<view class="font_sise24 font_color99 text_hidden margin_top1">{{ item.title }}</view>
						<view class="uni-flex margin_top4">
							<view class="uni-flex width50">
								<view class="font_color99 font_sise24">10-17</view>
								<view class="list_moudel">个人信贷</view>
							</view>
							<view class="uni-flex width50 display_right">
								<view class=""><image style="width: 32upx;height: 24upx;" src="../../../static/image/icon/15.png" mode=""></image></view>
								<view class="font_sise24 font_color99 margin_left3">4344</view>
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
			lunBo: ['../../../static/image/cs.png'],
			tabList: [{ name: '代理进阶', url: 'advancedAgency' }, { name: '小白必备' }, { name: '营销推广' }],
			tabList1: [
				{
					name: '最新线报'
				},
				{
					name: '代理都在看'
				}
			],
			tabIndexT: 0,
			verifiedData: [],
			startedData: [], //新手
			popularData: '' ,//热门
			typeData:[]
		};
	},
	onLoad() {
		this.getNewData(); //最新线报
		this.init();
	},
	methods: {
		tabSwich: function(index) {
			this.tabIndexT = index;
		},
		goPage: function(url) {
			uni.navigateTo({
				url: '../../' + url + '/' + url
			});
		},
		// goDetail:function(){
		// 	uni.navigateTo({
		// 		url: '../../' + url + '/' + url
		// 	});
		// },
		init: function() {
			// 新手必备
			this.$http.get('/api/course/started', '', true).then(res => {
				this.startedData = res.data.data;
			});
			// 热门专栏
			this.$http.get('/api/course/popular', '', true).then(res => {
				this.popularData = res.data.data;
			});
			//获取列表
			this.$http.get('/api/course/type', '', true).then(res => {
				this.typeData = res.data.data;
			});
		},
		goTab:function(item){
			uni.navigateTo({
				url:'../../advancedAgency/advancedAgency?id=' + item.id
			})
		},
		// 最新线报
		getNewData: function() {
			var data = {
				agentNews: this.tabIndexT 
			};
			this.$http.get('/api/course/agentNews', data, true).then(res => {
				console.log(JSON.stringify(res));
				this.verifiedData = res.data.data;
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
// 轮播
.imageContainer {
	width: 100%;
	height: 200upx;
	margin-left: 4%;
	margin-top: -160upx;
}

.itemImg {
	width: 92%;
	height: 200upx;
}
.item_tab_three {
	display: inline-block;
	width: 50%;
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
	width: 50%;
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
.backgroud_imgOne {
	background: url(../../../static/image/icon/16.png)  no-repeat;
	height: 328upx;
	// width: 100%;
	background-size: 100%;
	padding-top: 110upx;
	padding-left: 30upx;
}
</style>
