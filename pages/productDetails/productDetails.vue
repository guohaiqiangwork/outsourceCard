<template>
	<view style="padding-bottom: 99upx;">
		<view class="top_moudel">
			<view class="uni-flex   font_weight700">
				<view class="font_size40 width15">银行</view>
				<view style="border-right: 1px solid #FF9D95;height: 26upx;width: 1upx;margin-top: 4%; "></view>
				<view class="font_size40 margin_left3">{{ detailData.bankName }}</view>
			</view>

			<view class="uni-flex">
				<view class="width50 text_center ">
					<view class=" font_size75 font_weight700">{{ detailData.maxAmount }}</view>
					<view class="font_size26">授信额度(元)</view>
				</view>
				<view class="" style="margin-top:7%; width: 1px;height: 140upx;opacity: 0.3;border-left: 1px solid #ffffff;"></view>
				<view class="width50 text_center margin_top6">
					<view class="uni-flex display_center">
						<view class="font_size24 margin_top2 width50">结算周期</view>
						<view class="font_size30 font_weight700 width50">{{ detailData.cycle }}</view>
					</view>
					<view class="uni-flex display_center margin_top8">
						<view class="font_size24 margin_top2 width50">授信期限</view>
						<view class="font_size30 font_weight700 width50">{{ detailData.creditPeriod }}</view>
					</view>
				</view>
			</view>
		</view>

		<view class="page_widthMoudel margin_top4u">
			<view class="moudel_list">
				<view class="font_size40 font_weight700 font_color22">申请攻略</view>
				<view class="font_size26 font_color22 margin_top3u text_hidden2">{{ detailData.raidersResult.name }}</view>
				<view @click="openMoudel" class="font_size26 font_colorf4 text_right margin_top3">查看攻略</view>
			</view>

			<view class="font_size40 font_weight700 margin_top6">佣金结算说明</view>
			<view class="font_size26 font_color99 margin_top3">按会员等级，阶梯返佣</view>

			<view class="uni-flex margin_top4u">
				<view class="width40 uni-flex" style="height:52upx;border-left: 1px solid #9eaadc;">
					<view class="font_sise28 margin_left3" style="color: #9EAADC;">{{ detailData.rebateRuleResult.itemResults[0].levelName }}</view>
					<view class="right_btn_one">当前</view>
				</view>
				<view class="width70 uni-flex" style="height: 52upx;border-left: 1px solid #d69c63;;">
					<view class="font_sise28 margin_left3" style="color: #D69C63;">{{ detailData.rebateRuleResult.itemResults[1].levelName }}</view>
					<view class="right_btn_one">当前</view>
				</view>
			</view>
			<view class="uni-flex ">
				<view class="width40 text_center font_colorff font_weight700" style="height:44upx;background-color: #d69c63;">
					{{ detailData.rebateRuleResult.itemResults[0].scale }}%
				</view>
				<view class="width70 text_center  font_colorff font_weight700" style="height: 44upx;background-color:  #9eaadc;;">
					{{ detailData.rebateRuleResult.itemResults[1].scale }}%
				</view>
			</view>

			<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
				<view class="font_size26 " style="color: #707277;">推荐新老户放款成功符合结算规则。</view>
				<!-- <view class="font_size26 margin_top3">平安银行快贷分为:“消费类贷款”“经营类贷款”</view> -->
				<view class="font_size26 margin_top3" style="  white-space: pre-line;">{{ detailData.settleDesc }}</view>
			</view>

			<view class="font_size40 font_weight700 margin_top3u">客户申请条件</view>

			<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
				<view class="font_size26 " style="white-space: pre-line;">{{ detailData.appConditions }}</view>
			</view>

			<view class="font_size40 font_weight700 margin_top3u">推广须知</view>

			<view class="margin_top3"><u-parse :content="detailData.promotionNotice" :loading="loading" @preview="preview" @navigate="navigate" /></view>
		</view>
		<view class="bottom_btn" @click="goPage">我要推广</view>

		<template v-if="moudelFalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size40 margin_top3u font_color22 text_center font_weight700">申请攻略</view>
					<view class="margin_top3">
						<u-parse :content="detailData.raidersResult.context" :loading="loading" @preview="preview" @navigate="navigate" />'
						</view>

					<view class="moudel_btn" @click="colseMoudel">我知道了</view>
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
			goodsId: '',
			moudelFalg: false,
			detailData: '',
			loading: false //开启loading不显示默认值
		};
	},
	onLoad(option) {
		console.log(option);
		this.goodsId = option.goodsId;
		this.getProduct(); //获取详情
	},
	methods: {
		getProduct: function() {
			var data = {
				goodsId: this.goodsId
			};
			this.$http.get('/api/goodsInfo/detail', data, true).then(res => {
				console.log(JSON.stringify(res));
				this.detailData = res.data.data;
				// this.discoveryData = res.data.data;
			});
		},

		openMoudel: function() {
			this.moudelFalg = true;
		},
		colseMoudel: function() {
			this.moudelFalg = false;
		},

		// 我要推广
		goPage: function() {
			uni.navigateTo({
				url: '../extension/extension?titel=' + '推广产品名称' + '&productId=' + this.detailData.id + '&billingCycle=' + this.detailData.billingCycle +'&cid1=' + this.detailData.cid1
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.top_moudel {
	height: 323upx;
	background: #f75349;
	padding: 50upx 40upx;
	padding-bottom: 0;
	color: #ffffff;
}
.right_btn_one {
	width: 54upx;
	height: 26upx;
	background: #f75349;
	border-radius: 8upx;
	text-align: center;
	line-height: 26upx;
	color: #ffffff;
	font-size: 18upx;
	margin-top: 2%;
	margin-left: 3%;
}
.bottom_btn {
	width: 100%;
	height: 88upx;
	background: #f75349;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	position: fixed;
	bottom: 0;
}

.product_content_block {
	background-color: #ffffff;
	border-radius: 20upx;
	position: absolute;
	top: 20%;
	max-height: 900upx;
	width: 600upx;
	margin-left: 75upx;
	padding-bottom: 40upx;
}
.moudel_btn {
	width: 90%;
	margin-left: 5%;
	height: 88upx;
	background: #f75349;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	font-size: 32upx;
	color: #ffffff;
	margin-top: 30upx;
}
</style>
