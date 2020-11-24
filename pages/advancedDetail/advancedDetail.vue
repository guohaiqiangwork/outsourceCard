<template>
	<view>
		<view class=""><image style="width: 100%;height: 420upx;" :src="detailData.pictureUrl" mode=""></image></view>
		<view class="page_widthMoudel margin_top4">
			<view class="font_size36 ">{{ detailData.name }}</view>
			<view class="font_sise24 font_color99">{{ detailData.title }}</view>
			<view class="font_color99 font_sise22 text_right margin_top3">
				已更新{{ detailData.periodsNum }}期
				<text class="margin_left3">共{{ detailData.periodsUpdateNum }}期</text>
			</view>
			<!-- 
			<view @click="openm" class="uni-flex margin_top4 padding_bottom3 padding_top3 padding_left3 padding_right3 display_space" style="background-color: #f7f7ff;">
				<view class="uni-flex width40">
					<view class="margin_top1 "><image style="width: 34upx;height: 28upx;" src="../../static/image/cs.png" mode=""></image></view>
					<view class="font_sise28 font_color22 margin_left3">优惠券</view>
				</view>
				<view class=""><image style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image></view>
			</view> -->

			<view class="font_size36 font_color22 font_weight700 margin_top6">内容</view>
			<view class="margin_top3 padding_left3 padding_right3" style="background-color: #f7f7ff;">
				<view v-for="(item, index) in detailData.courseContentResults" :key="index" @click="goTovideo(item)" class="">
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size28 font_color22 text_hidden">{{ item.name }}({{ item.title }})</view>
						<view class=""><image style="width: 12upx;height: 20upx;" src="../../static/image/icon/homeDown.png" mode=""></image></view>
					</view>

					<view class="margin_top3u">
						<u-parse :content="item.context" :loading="loading" @preview="preview" @navigate="navigate" />
					</view>
				</view>
			</view>

			<view class="font_size36 font_color22 font_weight700 margin_top6">简介</view>
		</view>
		<view class="margin_top3u"><u-parse :content="detailData.introduction" :loading="loading" @preview="preview" @navigate="navigate" /></view>

		<view class="uni-flex bottm_twobtn" v-if="detailData.whetherTry != 3">
			<view class="left">{{ detailData.price }}元</view>
			<view class="right" @click="goOrder">VIP免费畅看</view>
		</view>

		<!-- t弹窗 -->
		<template v-if="cardMoudel">
			<view class="moudel_content">
				<view class="card_o">
					<view class="uni-flex">
						<view class="font_size34 width55 text_right">领取优惠券</view>
						<view @click="colsem" class="margin_top2 width35 text_right">
							<image style="width: 30upx;height: 30upx;" src="../../static/image/icon/close.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
import uParse from '../../components/feng-parse/parse.vue'; //富文本展示
export default {
	components: {
		uParse
	},
	data() {
		return {
			cardMoudel: false,
			id: '',
			detailData: '',
			loading: false //开启loading不显示默认值
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.init();
	},
	methods: {
		init: function() {
			var data = {
				id: this.id
			};
			// 课程详情
			this.$http.get('/api/course/detail', data, true).then(res => {
				console.log(JSON.stringify(res));
				this.detailData = res.data.data;
			});
		},
		openm: function() {
			this.cardMoudel = true;
		},
		colsem: function() {
			this.cardMoudel = false;
		},
		// 去支付
		goOrder: function() {
			uni.navigateTo({
				url: '../orderDetail/orderDetail?id='  + this.id
			});
		},
		goTovideo: function(item) {
			uni.navigateTo({
				url: '../advancedDetailvideo/advancedDetailvideo?id=' + item.id
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.bottm_twobtn {
	height: 88upx;
	position: fixed;
	bottom: 0;
	width: 100%;
	color: #ffffff;
	text-align: center;
	font-size: 32upx;

	.left {
		width: 30%;
		background-color: #f75349;
		line-height: 88upx;
	}
	.right {
		width: 70%;
		line-height: 88upx;
		background: linear-gradient(94deg, #d69c63 3%, #f7ce9e 97%);
	}
}
.card_o {
	background-color: #ffffff;
	width: 100%;
	position: absolute;
	bottom: 0;
	padding: 30upx;
}
</style>
