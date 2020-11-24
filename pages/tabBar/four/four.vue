<template>
	<view class="padding_bottom3">
		<view class="background_color2b" style="height: 630upx;">
			<view class="page_widthMoudel " style="padding-top: 5%;">
				<view class="display_space uni-flex">
					<view class="" @click="goToPage('setUp')"><image style="width: 35upx;height: 38upx;" src="../../../static/image/icon/set.png" mode=""></image></view>
					<view class="" @click="goToPage('newsMsg')"><image style="width: 38upx;height: 38upx;" src="../../../static/image/icon/msgF.png" mode=""></image></view>
				</view>
				<view class="uni-flex margin_top5">
					<view class="width25"><image style="width: 120upx;height: 120upx;border-radius: 50%;" :src="infoData.headImgurl" mode=""></image></view>
					<view class="width60">
						<view class="uni-flex">
							<view class="font_size34 font_weight700 font_colorff">{{infoData.nickName}}</view>
							<view class="margin_left3 margin_top2" @click="goToPage('upgradeInstructions')" v-if="infoData.levelName">
								<image style="width: 73upx;height: 28upx;" src="../../../static/image/icon/vip1.png" mode=""></image>
							</view>
							
						</view>
						<view class="uni-flex">
							<!-- ****{{ item.bankCard.substr(-4) }} -->
							<view class="font_sise28 font_colorff">ID:{{infoData.idCard}}</view>
							<view class="name_moudel" v-if="isVerified">未实名</view>
						</view>
					</view>
				</view>
				<view style="position: absolute;right: 0;margin-top: -15%;">
					<image style="width: 162upx;height: 60upx;" src="../../../static/image/icon/vipLog.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="my_moudel">
			<view class="font_size30 font_color22">总收入(元)</view>
			<view class="two_moudel uni-flex">
				<view class="width50 uni-flex" @click="goToPage('revenueRecords')">
					<view class="margin_top1"><image style="width: 24upx;height: 24upx;" src="../../../static/image/icon/myicon.png" mode=""></image></view>
					<view class="font_size26 font_color22 margin_left3">收入记录</view>
				</view>
				<view class="width50 uni-flex" @click="goToPage('withdrawalRecord')">
					<view class="margin_top1"><image style="width: 29upx;height: 26upx;" src="../../../static/image/icon/mymoney.png" mode=""></image></view>
					<view class="font_size26 font_color22 margin_left3">提现记录</view>
				</view>
			</view>

			<view class="font_size54 font_color22 border_bottom font_weight700 padding_bottom3 margin_top3">{{totalRevenue.totalRevenue}}</view>
			<view class="margin_top3">
				<view class="font_size30 font_color22">可提现(元)</view>
				<view class="uni-flex display_space border_bottom padding_bottom3 margin_top3 ">
					<view class="font_color22 font_size54 font_weight700 width80">{{totalRevenue.balance}}</view>
					<view class="uni-flex width20 margin_top3">
						<view @click="goToPage('withdrawal')" class="font_size22 font_color99 width80 margin_top2">去提现</view>
						<view class="width20  "><image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
					</view>
				</view>
			</view>
			<view class="margin_top3">
				<view class="font_size30 font_color22">今日订单(笔)</view>
				<view class="uni-flex display_space  padding_bottom3 margin_top3 ">
					<view class="font_color22 font_size54 font_weight700 width80">500.00</view>
					<view class="uni-flex width20 margin_top3">
						<view @click="goToPage('myOrder')" class="font_size22 font_color99 width80 margin_top2">查看订单</view>
						<view class="width20  "><image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
					</view>
				</view>
			</view>
		</view>

		<view class="page_widthMoudel margin_top3">
			<view class="moudel_list">
				<view class="font_size34 font_color22">我的团队</view>
				<view @click="goToPage(item.pageUrl)" class="display_inline text_center width25" v-for="(item, index) in homeList" :key="index">
					<view class=""><image :src="item.url" class="icon_width" mode=""></image></view>
					<view style="color: #656870;" class=" font_size26">{{ item.name }}</view>
				</view>
			</view>

			<view class="moudel_list margin_top3">
				<view
					@click="goToPage(item.pageUrl)"
					v-for="(item, index) in menuList"
					:key="index"
					:style="(index = 0 ? 'paddingTop:0' : '')"
					:class="index == menuList.length - 1 ? '' : 'border_bottom padding_bottom3'"
					class="uni-flex   display_space padding_top3"
				>
					<view class="font_size30 font_color22">{{ item.name }}</view>
					<view class=""><image style="width: 12upx;height: 20upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
				</view>
			</view>

			<view class="uni-flex margin_top8">
				<view class="bottom_btn uni-flex display_center" @click="getPhone">
					<view class="margin_top3"><image style="width: 26upx;height: 26upx;" src="../../../static/image/icon/getPhone.png" mode=""></image></view>
					<view class="margin_left3">联系客服</view>
				</view>
				<view class="bottom_btn uni-flex display_center" @click="openEr">
					<view class="margin_top5"><image style="width: 26upx;height: 26upx;" src="../../../static/image/icon/myF.png" mode=""></image></view>
					<view class="margin_left3">新手社群</view>
				</view>
			</view>

			<view class="uni-flex display_center margin_top5">
				<view class=""><image style="width: 26upx;height: 26upx;" src="../../../static/image/cs.png" mode=""></image></view>
				<view class="font_size26 margin_left3 font_weight700">汇创精选</view>
			</view>

			<view class="font_size22 font_color99 text_center">您的专业推广顾问，24小时贴心服务</view>
		</view>
		<!-- 社团 -->
		<template v-if="erFalg">
			<view class="moudel_content">
				<view class="er_moudel">
					<view class="uni-flex">
						<view class="font_size40 font_weight700 width60 text_right">新手社群</view>
						<view class="width35 text_right margin_top1" @click="colseEr">
							<image style="width: 30upx;height: 30upx;" src="../../../static/image/icon/close.png" mode=""></image>
						</view>
					</view>
					<view class="font_size26 font_color99 text_center margin_top3">新手专属社群，教你获得第一笔工资</view>
					<view class="margin_top3 text_center"><image style="width: 340upx;height: 340upx;" src="../../../static/image/cs.png" mode=""></image></view>
					<view class="font_size26 font_color99 text_center margin_top3">保存二维码到相册，并微信扫码添加</view>
					<view class="save_btn">保存至相册</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			erFalg: false,
			menuList: [
				{
					name: '我的专栏',
					pageUrl: 'myColumn'
				},
				{
					name: '我的优惠券',
					pageUrl: 'coupon'
				},
				{
					name: '推广海报',
					pageUrl: 'poster'
				},
				{
					name: '设置',
					pageUrl: 'setUp'
				}
			],

			homeList: [
				{
					url: '../../../static/image/icon/my1.png',
					name: '团队奖励',
					pageUrl: 'teamReward'
				},
				{
					url: '../../../static/image/icon/my2.png',
					name: '提成奖励',
					pageUrl: 'commissionAward'
				},
				{
					url: '../../../static/image/icon/my3.png',
					name: '团队成员',
					pageUrl: 'teamMembers'
				},
				{
					url: '../../../static/image/icon/my4.png',
					name: '绑定下级',
					pageUrl: 'binding'
				}
			],
			isVerified:true,//是否实名认证
			infoData:'',
			totalRevenue:''
		};
	},

	// onLoad() {
	// 	this.init()
	// },
	onShow() {
		// this.init();
	},
	methods: {
		// 初始化
		init: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/isVerified', data, true).then(res => {
				this.isVerified = res.data.data
			});
		
			this.$http.get('/api/member/info', data, true).then(res => {
				this.infoData = res.data.data
			});
			this.$http.get('/api/member/totalRevenue', data, true).then(res => {
				this.totalRevenue = res.data.data
			});
			
			// 
		},
		openEr: function() {
			this.erFalg = true;
		},
		colseEr: function() {
			this.erFalg = false;
		},
		goToPage: function(url) {
			uni.navigateTo({
				url: '../../' + url + '/' + url
			});
		},
		// 拨打电话
		getPhone: function() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: phone,
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
.name_moudel {
	// width: 86px;
	height: 36upx;
	background: #375cc7;
	border-radius: 18upx;
	text-align: center;
	line-height: 36upx;
	color: #d4def3;
	font-size: 22upx;
	margin-left: 20upx;
	margin-top: 2%;
}
.two_moudel {
	align-items: center;
	line-height: 84upx;
	height: 84upx;
	background: #f9fbfe;
	border-radius: 10upx;
	padding-left: 30upx;
	padding-right: 30upx;
	margin-top: 30upx;
}
.my_moudel {
	padding: 30upx 30upx 0upx 30upx;
	width: 84%;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	margin-left: 4%;
	margin-top: -42%;
}
.icon_width {
	width: 44upx;
	height: 44upx;
	margin-top: 40upx;
}
.bottom_btn {
	font-size: 26upx;
	color: #222222;
	height: 80upx;
	background: #ffffff;
	border-radius: 40upx;
	text-align: center;
	line-height: 80upx;
	align-items: center;
	width: 220upx;
	margin-left: 11%;
}
.er_moudel {
	background-color: #ffffff;
	width: 80%;
	margin-left: 6%;
	position: absolute;
	top: 20%;
	padding: 30upx;
}

.save_btn {
	width: 300upx;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	line-height: 88upx;
	text-align: center;
	font-size: 32upx;
	color: #ffffff;
	margin-top: 40upx;
	margin-left: 25%;
}
</style>
