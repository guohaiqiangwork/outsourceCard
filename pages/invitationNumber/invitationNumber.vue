<template>
	<view>
		<view class="background_colorff padding_bottom3 padding_top3">
			<view class="display_inline width20" v-for="(item, index) in tabList" :key="index">
				<view class="margin_top3u" @click="tabSwichOne(index)" :class="tabIndex == index ? 'item_tab' : 'item_tabn'">{{ item.name }}</view>
				<view class="bottom_a" v-if="tabIndex == index"></view>
			</view>
		</view>

		<view class="margin_top3u page_widthMoudel padding_bottom3u">
			<view class="list_moudel_o" v-for="(item, index) in list" :key="index">
				<view class="uni-flex " :class="item.goodsName ? 'border_bottom padding_bottom3' : ''">
					<view class="width20 text_center margin_top2">
						<image style="width: 80upx;height: 80upx;border-radius: 50%;" :src="item.headImgurl" mode=""></image>
					</view>
					<view class="width60">
						<view class="font_size30">{{item.name}}</view>
						<view class="">{{item.mobile}}</view>
					</view>
					<view class="width20 text_center">
						<view class="font_size26 font_color2b" v-if="item.type == 1">待申请</view>
						<view class="font_size26 font_color2b" v-if="item.type == 2">待借款</view>
						<view class="font_size26 font_color2b" v-if="item.type == 3">已借款</view>
						<view class="font_size26 font_color99" v-if="item.type == 4">无效用户</view>
						<view class="margin_top2" @click="getPhone(item.mobile)"><image style="width: 44upx;height: 38upx;" src="../../static/image/my/2.png" mode=""></image></view>
					</view>
				</view>
				<view class="page_widthMoudel margin_top3" v-if="item.goodsName">
					<view class="uni-flex display_space">
						<view class="uni-flex width50">
							<view class="left_f margin_top3"></view>
							<view class="font_size30 font_color22 margin_left3 ">
								{{item.goodsName}}
							</view>
						</view>
						
						<view class="font_size22 font_color99">
							{{item.incomingTime}}
						</view>
					</view>
					<view class="uni-flex display_space">
						<view class="font_size26 margin_top3">
							借款额度
						</view>
						<view class="font_size40">
							{{item.amount}}
						</view>
					</view>
				</view>
			</view>

			<view class="text_center margin_top18" v-if="list.length == 0">
				<view class=""><image class="noImg" src="../../static/image/noData/2.png" mode=""></image></view>
				<view class="font_size30">暂无邀请用户</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [],
			tabList: [
				{
					name: '全部'
				},
				{
					name: '待申请'
				},
				{
					name: '待借款'
				},
				{
					name: '已借款'
				},
				{
					name: '无效用户'
				}
			],
			tabIndex: 0
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		tabSwichOne: function(item) {
			this.tabIndex = item;
			this.init()
		},
		init: function() {
			let type  =''
			this.tabIndex == 0 ?  ''  :  type = this.tabIndex ;
			var data = {
				mbId: uni.getStorageSync('userId'),
				type: type
			};
			this.$http.get('/api/member/usersList', data, true).then(res => {
				this.list = res.data.data
			});
		},
		// 拨打电话
		getPhone: function(item) {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: item,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
.item_tab {
	// display: inline-block;
	// width: 20%;
	text-align: center;
	color: #333333;
	font-size: 32upx;
	// height: 40upx;
	line-height: 40upx;
	padding-bottom: 20upx;
}

.item_tabn {
	// display: inline-block;
	// width: 20%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 20upx;
}
.bottom_a {
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-left: 30%;
}
.list_moudel_o {
	width: 670upx;
	// height: 140upx;
	background: #ffffff;
	border-radius: 10upx;
	margin-left: 10upx;
	padding-top: 30upx;
	margin-top: 30upx;
	padding-bottom: 30upx;
}
.left_f{
	width: 6upx;
	height: 30upx;
	background: #f75349;
	border-radius: 3upx;
}
</style>
