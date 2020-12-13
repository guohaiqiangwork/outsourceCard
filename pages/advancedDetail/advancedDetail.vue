<template>
	<view style="padding-bottom: 110upx;">
		<view class="" v-if="openVip">
			<view class=""><image style="width: 100%;height: 420upx;" :src="detailData.pictureUrl" mode=""></image></view>
			<view class="page_widthMoudel " style="margin-top: 20upx;">
				<view class="font_size36 font_weight700 ">{{ detailData.name }}</view>
				<view class="font_sise24 font_color99">{{ detailData.title }}</view>
				<view class="font_color99 font_sise22 text_right margin_top3">
				已更新{{ detailData.periodsNum }}期
					<text class="margin_left3">共{{ detailData.periodsUpdateNum }}期</text>
				</view>
				
				<view class="font_size36 font_color22 font_weight700 margin_top6">内容</view>
				<view class="margin_top3 padding_left3 padding_right3" style="background-color: #f7f7ff;border-radius: 10upx;">
					<view v-for="(item, index) in detailData.courseContentResults" :key="index" @click="goTovideo(item)" class="">
						<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
							<view class="font_size28 font_color22 text_hidden">{{ item.name }}({{ item.title }})</view>
							<view class=""><image style="width: 20upx;height: 12upx;" src="../../static/image/icon/down33.png" mode=""></image></view>
						</view>
			
						<view class="margin_top3u padding_bottom3u">
							<u-parse :content="item.context" :loading="loading" @preview="preview" @navigate="navigate" />
						</view>
					</view>
				</view>
			
				<view class="font_size36 font_color22 font_weight700 margin_top6">简介</view>
			</view>
			<view class="margin_top3u padding_left3u"><u-parse :content="detailData.introduction" :loading="loading" @preview="preview" @navigate="navigate" /></view>
			
		</view>
	
		<!-- <view class="uni-flex display_center bottm_twobtn" @click="goOrder">>
			<view class="right" v-if="!openVip">
				VIP免费畅看
			</view>
			
		</view> -->
		<view class="right_bnn " @click="goOrder" v-if="!openVip">
			VIP免费畅看
		</view>

		<!-- t弹窗 -->
		<template v-if="!openVip">
			<view class="moudel_content">
				<view class="er_moudel">
					<view class="text_center font_size40 font_weight700">是否开通会员</view>
					<view class="uni-flex">
						<view class="moudel_btn_one" style="margin-left: 5%;background-color: #F75349;" @click="goHome">取消</view>
						<view class="moudel_btn_one" style="" @click="goOrder">确认</view>
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
			cardMoudel: true,
			id: '',
			detailData: '',
			loading: false ,//开启loading不显示默认值
			openVip:false
		};
	},
	onLoad(option) {
		this.id = option.id;
		this.init();
		this.getVip()
	},
	methods: {
		init: function() {
			console.log('我在纠结')
			var data = {
				id: this.id
			};
			// 课程详情
			this.$http.get('/api/course/detail', data, true).then(res => {
				console.log(JSON.stringify(res));
				this.detailData = res.data.data;
			});
		},
		getVip:function(){
			var data = {
				mbId:uni.getStorageSync('userId')
			}
			// 查询是否是vip
			this.$http.get('/api/member/openVip', data, true).then(res => {
				this.openVip = res.data.data
				
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
		},
		goHome:function(){
			uni.switchTab({
				url:'../tabBar/one/one'
			})
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
	// margin-left: -3%;

	// .left {
	// 	width: 30%;
	// 	background-color: #f75349;
	// 	line-height: 88upx;
	// }
	.right {
		width: 100%;
		line-height: 88upx;
		background: #F75349;
		line-height: 88upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 32upx;
	}
}
.card_o {
	background-color: #ffffff;
	width: 100%;
	position: absolute;
	bottom: 0;
	padding: 30upx;
}
.right_bnn{
	height: 88upx;
	line-height: 88upx;
	position: fixed;
	bottom: 0;
	width: 100%;
	text-align: center;
	color: #FFFFFF;
	font-size: 32upx;
	background-color: #f75349;
	padding-left: 5upx;
}
.er_moudel {
	background-color: #ffffff;
	width: 80%;
	margin-left: 6%;
	position: absolute;
	top: 20%;
	padding: 30upx;
	border-radius: 20upx;
	padding-top: 60upx;
	padding-bottom: 60upx;
}
.moudel_btn_one {
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	width: 80%;
	margin-right:5%;
	margin-top: 60upx;
}
</style>
