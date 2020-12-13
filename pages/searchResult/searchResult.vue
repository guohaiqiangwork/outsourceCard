<template>
	<view>
		<!-- tab切换 -->
		<view class="background_colorff padding_top3 padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view class="uni-flex">
				<view class="uni-flex searce_moudel" style="width: 85%;">
					<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!--  -->
						<input
							class="font_size28 padding_top3"
							maxlength="10"
							placeholder="请输入您的搜索内容"
							confirm-type="搜索"
							type="text"
							:value="keywords"
							@input="getKey"
							placeholder-style="color:#999999"
						/>
					</view>
				</view>
				<view @click="goS" class="width15 margin_top1 font_size30 text_center">搜索</view>
			</view>

			<view class="margin_top1">
				<view class="padding_top3 " style="padding-bottom: 1%;">
					<view
						@click="tabSwich(index)"
						:class="tabIndex == index ? 'item_tab_three' : 'item_tab_threen'"
						v-for="(item, index) in tabList"
						:key="index"
						:style="index == 2 ? 'border:none' : ''"
					>
						<view>{{ item.name }}</view>
						<view :class="tabIndex == index ? 'bottom_tab' : ''"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 内容 -->

		<template v-if="tabIndex == 0">
			<view class="page_widthMoudel margin_top3u padding_bottom3">
				<view class="uni-flex" v-if="creditCardList.length > 0">
					<view class="left_falg"></view>
					<view class="font_size32 margin_left2">信用卡产品</view>
				</view>
				<view class="uni-flex">
					<scroll-view scroll-x="true" class="wrapper">
						<view :class="index != 0 ? 'margin_left3' : ''" class="card_moudel" @click="goToDetail(item)"  v-for="(item, index) in creditCardList" :key="index" >
							<view class="font_size26 text_center " style="color: #ABADB4; background-color: #F1F1F3;height: 44rpx;line-height: 44rpx;" >{{ item.bankName }}</view>
							<view class="text_hidden margin_top3">{{ item.goodsName }}</view>
							<view class="font_colorf4 font_size54 font_weight700 margin_top2">
								{{ item.highestReturn }}
								<text class="font_size24">元</text>
							</view>
							<view class="font_size22 font_color99">最高返</view>
							<view class="">
								<view class="list_one_ttt" v-if="item.cycle">{{ item.cycle }}</view>
								<view class="list_one_ttt" v-if="item.label">{{ item.label }}</view>
							</view>
						</view>
					</scroll-view>
				</view>

				<view class="uni-flex margin_top3u" v-if="productList.length > 0">
					<view class="left_falg"></view>
					<view class="font_size32 margin_left2">贷款产品</view>
				</view>

				<view class="moudel_list margin_top3" v-if="productList.length > 0">
					<view
						@click="goPage('productDetails', item)"
						class="border_bottom padding_bottom3 padding_top3"
						:style="index == productList.length - 1 ? 'border:none' : ''"
						v-for="(item, index) in productList"
						:key="index"
					>
						<view class="uni-flex">
							<view class="">
								<image style="width: 28upx;height: 28upx;" :src="item.logoUrl" mode=""></image>
							</view>
							<view class="">{{ item.goodsName }}</view>
							<view class="list_one_ttt"  v-if="item.cycle" style="margin-top: 10upx;">{{ item.cycle }}</view>
						</view>
						<view class="uni-flex">
							<view class="width25">
								<view class="font_size54 font_weight700 font_colorf4">
									{{ item.highestReturn }}
									<text class="font_size24">%</text>
								</view>
								<view class="font_size22 font_color99">最高反</view>
							</view>
							<view class="width50 margin_top2">
								<view class="font_size38 font_weight700 font_color22">{{ item.minAmount }}-{{ item.maxAmount }}</view>
								<view class="font_size22 font_color99 margin_top5">贷款额度(元)</view>
							</view>
							<view class="width25 margin_top8"><view class="right_btn">立即推广</view></view>
						</view>
					</view>
				</view>

				<view class="text_center" v-if="productList.length == 0 && creditCardList.length == 0">
					<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/5.png" mode=""></image></view>
					<view class="margin_top3 font_sise30">暂无记录</view>
				</view>
			</view>
		</template>

		<template v-else>
			<view class="page_widthMoudel margin_top3u">
				<view v-if="contentList.length > 0" class="moudel_list" style="border-radius: 20upx;">
					<view
						:class="index == contentList.length - 1 ? '' : 'border_bottom'"
						v-for="(item, index) in contentList"
						:key="index"
						class="padding_bottom3 padding_top3 uni-flex "
						@click="goPromotion('trainingDetail', '代理攻略', item)"
					>
						<view class="width35"><image style="width: 180upx;height: 182upx;border-radius: 10upx;" :src="item.imageUrl" mode=""></image></view>
						<view class="width80">
	
							<view class="text_hidden2 font_weight700" style="height: 110upx;">{{item.name}}</view>
							<view class="uni-flex margin_top3u">
								<view class="uni-flex width50">
									<view class="font_sise24 font_color99 margin_top2">{{item.times}}</view>
									<view class="list_one_mou">{{item.raidersTypeName}}</view>
								</view>
								<view class="uni-flex width50 display_right margin_top1">
									<view class="" style="margin-top: 1%;"><image style="width: 32upx;height: 24upx;" src="../../static/image/icon/15.png" mode=""></image></view>
									<view class="font_sise24 font_color99 margin_left3">{{item.num}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<view class="text_center" v-if="contentList.length == 0">
					<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/5.png" mode=""></image></view>
					<view class="margin_top3 font_sise30">暂无记录</view>
				</view>
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
					name: '产品'
				},
				{
					name: '内容'
				}
			],
			tabIndex: 0,
			inputValue: '',
			keywords: '', //输入框值
			creditCardList: [], //信用卡列表
			productList: [], //产品列表
			contentList: [] //内容列表
		};
	},
	onLoad(option) {
		this.keywords = option.searchName;
		this.goSearchList(); //获取数据
		// this.init();
	},
	methods: {
		// init: function() {
		// 	var data ={
		// 		keyword: this.keywords
		// 	}
		// 	this.$http.get('/api/index/featuredCreditCard', data, true).then(res => {
		// 		this.creditCardList = res.data.data;
		// 	});
		// },
		getKey:function(e){
			this.keywords = e.target.value;
		},
		// search: function(e) {
		// 	this.inputValue = e.target.value;
		// },
		goS: function() {
			this.tabIndex == 0 ? this.goSearchList() : this.goSearchListT();
		},
		// 产品搜索
		goSearchList: function() {
			var _this = this ;
			var data = {
				keyword: this.keywords
			};
			_this.creditCardList =[];
			_this.productList =[]
			this.$http.get('/api/goodsInfo/search', data, true).then(res => {
				// this.productList = res.data.data;
				// console.log('0')
				
				for(let item of  res.data.data){
					if(item.loanProducts != 1){
						_this.creditCardList.push(item)
					}else{
						_this.productList.push(item)
					}
				}
				
			});
		},
		// 内容搜索
		goSearchListT: function() {
			var data = {
				keyword: this.keywords || ''
			};
			this.$http.get('/api/raiders/search', data, true).then(res => {
				this.contentList = res.data.data;
			});
		},
		tabSwich: function(e) {
			this.tabIndex = e;
			this.tabIndex == 0 ? this.goSearchList() : this.goSearchListT();
		},
		goToDetail: function(item) {
			console.log('99')
			uni.navigateTo({
				url: '../productDetails/productDetails?goodsId=' + item.goodsId
			});
		},
		goPage: function(e, falg) {
			if (falg) {
				uni.navigateTo({
					url: '../' + e + '/' + e + '?goodsId=' + falg.id
				});
			} else {
				uni.navigateTo({
					url: '../' + e + '/' + e
				});
			}
		},
		// 去推广任务
		goPromotion: function(url, title, item) {
		console.log('99')
			if (item) {
				uni.navigateTo({
					url: '../' + url + '/' + url + '?title=' + title + '&id=' + item.id
				});
			} else if(url == 'outUrl'){
				window.location.href = 'https://h5mp.baihangcredit.com:8097/downloadpage.html';
			} else {
				uni.navigateTo({
					url: '../' + url + '/' + url + '?title=' + title
				});
			}
		},
	}
};
</script>

<style lang="less">
.item_tab_three {
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #0c0c0c;
	font-size: 30upx;
	height: 40upx;
	line-height: 40upx;

	color: #000000;

	font-weight: 700 !important;
}

.item_tab_threen {
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 30upx;
	height: 40upx;
	line-height: 40upx;
	color: #666666;
}

.bottom_tab {
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-left: 42%;
	margin-top: 2%;
}

.left_falg {
	width: 8upx;
	height: 30upx;
	background: #2b65eb;
	border-radius: 4upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-top: 2%;
}
.wrapper {
	width: 98%;
	white-space: nowrap;
	display: flex;
	margin-top: 2%;
}
.card_moudel {
	width: 210upx;
	padding: 10upx 15upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 2upx 14upx 0upx #e2e5ef;
	text-align: center;
	display: inline-block;
}
.list_one_ttt {
	line-height: 35upx;
	padding-left: 10upx;
	padding-right: 10upx;
	text-align: center;
	height: 30upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
}
.moudel {
	width: 40%;
	background: #ffffff;
	border-radius: 10upx;
	padding: 30upx 0upx;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
}
.list_one {
	width: 30%;
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 8%;
	margin-top: 10upx;
}
.right_btn {
	width: 150upx;
	height: 54upx;
	background: #2b65eb;
	border-radius: 27upx;
	text-align: center;
	color: #ffffff;
	font-size: 26upx;
	line-height: 54upx;
}
.list_one_mou {
	// width: 30%;
	line-height: 28upx;
	padding: 4upx;
	text-align: center;
	height: 24upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 20upx;
	display: inline-block;
	margin-left: 5%;
	margin-top: 4%;
}
</style>
