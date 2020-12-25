<template>
	<view>
		<view class="font_size46 font_colore1 margin_left4 margin_top3">信用卡精选</view>
		<view class="title_border" style="background-color: #E14938;"></view>

		<view class="uni-flex  padding_bottom3 border_bottom page_widthMoudel padding_top3">
			<view class="width30 " v-if="rebateRatioList.length == 0">
				<picker @change="bindPickerChange" :value="index" :range="rebateRatioList" range-key="name">
					<view class="uni-input">{{ rebateRatioList[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
			<view class="width30 margin_left3" v-if="rebateRatioList.length == 0">
				<picker @change="bindPickerChange1" :value="index" :range="billingCycleList" range-key="name">
					<view class="uni-input">{{ billingCycleList[index1].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
			<!-- 	<view class="width30 margin_left3">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{ array[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view> -->
		</view>

		<view class="page_widthMoudel margin_top3u">
			<view class="">
				<view
					@click="goToDetail(item)"
					class="border_bottom padding_bottom3 padding_top3"
					:style="index == cardList.length - 1 ? 'border:none' : ''"
					v-for="(item, index) in cardList"
					:key="index"
				>
					<view class="uni-flex">
						<view class="width50">
							<view class="font_size54 font_weight700 font_colorf4">
								{{ item.highestReturn }}
								<text class="font_size24">元</text>
							</view>
							<view class="font_size22 font_color99">最高返</view>
						</view>
						<view class="width50 margin_top3">
							<view class="font_size28 font_weight700 font_color22">{{ item.goodsName }}</view>
							<view class="font_size22 font_color99">
								<view class="list_one">{{ item.cycle }}</view>
							</view>
						</view>
					</view>
				</view>
			</view>

			<view class="text_center" v-if="cardList.length == 0">
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
			index: 0,
			index1: 0,
			cardList: [], //信用卡
			rebateRatioList: [{ name: '' }],
			billingCycleList: [{ name: '' }]
		};
	},
	onLoad(option) {
		this.init();
		this.getLoanList();
	},
	methods: {
		init: function() {
			var data = {
				flag: 2
			};
			this.$http.get('/api/common/goodsInfo/rebateRatio', data, true).then(res => {
				this.rebateRatioList = res.data.data;
			});
			this.$http.get('/api/common/goodsInfo/billingCycle', data, true).then(res => {
				this.billingCycleList = res.data.data;
			});
		},
		// 获取列表
		getLoanList: function() {
			var _this = this;
			var data = {
				rebateRatio: _this.rebateRatioList[_this.index].name || '',
				cycle: _this.billingCycleList[_this.index1].name || '',
				cid2: '',
				area: '',
				cid1: '1481'
			};
			this.$http.get('/api/goodsInfo/loanSelection', data, true).then(res => {
				this.cardList = res.data.data;
			});
		},
		// 分类
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.index = e.detail.value;
		},
		bindPickerChange1: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.index1 = e.detail.value;
		},
		goToDetail: function(item) {
			uni.navigateTo({
				url: '../productDetails/productDetails?goodsId=' + item.id
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.list_one {
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
	margin-top: 10upx;
}

.selsect_img {
	width: 15upx;
	height: 14upx;
	position: absolute;
	margin-left: 21%;
	margin-top: -6.5%;
}

.uni-input {
	background-color: #f0f0fa;
	height: 60upx;
	border-radius: 40upx;
	padding-top: 0;
	line-height: 70upx;
}
</style>
