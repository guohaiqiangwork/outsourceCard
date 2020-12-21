<template>
	<view class="">
		<!-- 1475 -->
		<template v-if="detailData.cid1 == '1475'">
			<view style="padding-bottom: 99upx;">
				<view class="top_moudel">
					<view class="uni-flex display_space  font_weight700">
						<view class="width70 uni-flex">
							<view class="font_size34 ">{{ detailData.bankName }}</view>
						</view>

						<view class="font_size20 font_colorff width30 text_right margin_top3" v-if="detailData.promotion">
							已推广{{ detailData.promotion }}人
						</view>
					</view>

					<view class="uni-flex">
						<view class="width40 text_center">
							<view class=" font_size50 font_weight700 ">{{ detailData.maxAmount }}</view>
							<view class="font_size22">授信额度(元)</view>
						</view>
						<view class="" style="margin-top:4%; width: 1px;height: 96upx;opacity: 0.3;border-left: 1px solid #ffffff;"></view>
						<view class="width60  margin_top1" style="margin-left: 40upx;">
							<view class="font_size22 font_colorff  margin_top3">
									<text style="color: #FEDCDA;" class="font_size22">授信期限</text>
									<text class="font_size22 margin_left3">{{ detailData.creditPeriod }}</text>
							</view>
							<view class="font_size22 font_colorff  margin_top3">
									<text style="color: #FEDCDA;">结算利率</text>
									<text class="font_size22 margin_left3">{{ detailData.rate }}</text>
							</view>

						</view>
					</view>
				</view>

				<view class="page_widthMoudel margin_top4u">
					<view class="moudel_list" v-if="detailData.raidersResult.name">
						<view class="font_size40 font_weight700 font_color22">申请攻略</view>
						<view class="font_size26 font_color22 margin_top3u text_hidden2">{{ detailData.raidersResult.name }}</view>
						<view @click="openMoudel" class="font_size26 font_colorf4 text_right margin_top3">查看攻略</view>
					</view>
					<view class="margin_top3u" @click="goToPage('rewardRules')" style="box-shadow: 0upx 4upx 14upx 0upx #e2e5ef; ">
						<view class="font_size50 font_color2b" style="position: absolute;margin-top: 310upx;margin-left: 15%;z-index: 2;">{{ detailData.highestReturn }}%</view>
						<image style="width: 100%;height: 418upx;" src="../../static/image/my/7.png" mode=""></image>
					</view>

					<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;box-shadow: none; ">
						<view class="font_size26 " style="color: #707277;">推荐新老户放款成功符合结算规则。</view>
						<!-- <view class="font_size26 margin_top3">平安银行快贷分为:“消费类贷款”“经营类贷款”</view> -->
						<view class="font_size26 margin_top3" style="  white-space: pre-line;">{{ detailData.settleDesc }}</view>
					</view>

					<view class="font_size40 font_weight700 margin_top3u">客户申请条件</view>

					<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;box-shadow: none;">
						<view class="font_size26 " style="white-space: pre-line;">{{ detailData.appConditions }}</view>
					</view>

					<view class="font_size40 font_weight700 margin_top3u">推广须知</view>

					<view class="margin_top3"><u-parse :content="detailData.promotionNotice" :loading="loading" @preview="preview" @navigate="navigate" /></view>
				</view>
				<view class="bottom_btn uni-flex">
					<view class="width50 text_center leftB" @click="goPage('1')">我要推广</view>
					<view class="width50 text_centern rightB" @click="goEr('合伙人招募', '5')">合伙人招募</view>
				</view>

				<template v-if="moudelFalg">
					<view class="moudel_content">
						<view class="product_content_block">
							<view class="font_size40 margin_top3u font_color22 text_center font_weight700">申请攻略</view>
							<view class="margin_top3 " style="max-height: 75vh;overflow-y:auto;padding-left: 20upx;padding-right: 20upx;">
								<u-parse :content="detailData.raidersResult.context" :loading="loading" @preview="preview" @navigate="navigate" />
							</view>
							<view class="moudel_bottom"><view class="moudel_btn" @click="colseMoudel">我知道了</view></view>
						</view>
					</view>
				</template>
			</view>
		</template>

		<template v-else>
			<view style="padding-bottom: 99upx;">
				<view class="top_moudel">
					<view class="uni-flex display_space  font_weight700">
						<view class="width70 uni-flex">
							<view class="font_size34 ">{{ detailData.bankName }}</view>
						</view>
				
						<view class="font_size20 font_colorff width30 text_right margin_top3" v-if="detailData.promotion">
							已推广{{ detailData.promotion }}人
						</view>
					</view>
				
					<view class="uni-flex">
						<view class="width40 text_center">
							<view class=" font_size50 font_weight700 ">{{ detailData.maxAmount }}</view>
							<view class="font_size22">授信额度(元)</view>
						</view>
						<view class="" style="margin-top:4%; width: 1px;height: 96upx;opacity: 0.3;border-left: 1px solid #ffffff;"></view>
						<view class="width60  margin_top1" style="margin-left: 40upx;">
							<view class="font_size22 font_colorff  margin_top3">
									<text style="color: #FEDCDA;" class="font_size22">授信期限</text>
									<text class="font_size22 margin_left3">{{ detailData.creditPeriod }}</text>
							</view>
							<view class="font_size22 font_colorff  margin_top3">
									<text style="color: #FEDCDA;">结算利率</text>
									<text class="font_size22 margin_left3">{{ detailData.rate }}</text>
							</view>
				
						</view>
					</view>
				</view>
				
				<!-- <view class="top_moudel" style="height: 240upx;">
					<view class="uni-flex   font_weight700">
						<view class="width70 uni-flex">

							<view class="font_size40 ">{{ detailData.bankName }}</view>
						</view>

						<view class="font_size20 font_colorff width30 text_right margin_top3" v-if="detailData.promotion">
							已推广{{ detailData.promotion }}人
					
						</view>
					</view>
					<view class="font_size24 font_colorff margin_top3">{{ detailData.goodsName }}</view>

					<view class="font_size24 font_colorff margin_top3u">
						结算利率
						<text class="font_size30 margin_left3">{{ detailData.rate }}</text>
					</view>
				</view> -->

				<view class="page_widthMoudel margin_top4u">
					<view class="moudel_list" v-if="detailData.raidersResult.name">
						<view class="font_size40 font_weight700 font_color22">申请攻略</view>
						<view class="font_size26 font_color22 margin_top3u text_hidden2">{{ detailData.raidersResult.name }}</view>
						<view @click="openMoudel" class="font_size26 font_colorf4 text_right margin_top3">查看攻略</view>
					</view>
					<view class="margin_top3u" @click="goToPage('rewardRules')" style="box-shadow: 0upx 4upx 14upx 0upx #e2e5ef; ">
						<view class="font_size50 font_color2b" style="position: absolute;margin-top: 310upx;margin-left: 15%;z-index: 2;">{{ detailData.highestReturn }}%</view>
						<image style="width: 100%;height: 418upx;" src="../../static/image/my/7.png" mode=""></image>
					</view>

					<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;box-shadow: none">
						<view class="font_size26 " style="color: #707277;">推荐新老户放款成功符合结算规则。</view>
						<!-- <view class="font_size26 margin_top3">平安银行快贷分为:“消费类贷款”“经营类贷款”</view> -->
						<view class="font_size26 margin_top3" style="  white-space: pre-line;">{{ detailData.settleDesc }}</view>
					</view>

					<view class="font_size40 font_weight700 margin_top3u">客户申请条件</view>

					<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;box-shadow:none">
						<view class="font_size26 " style="white-space: pre-line;">{{ detailData.appConditions }}</view>
					</view>

					<view class="font_size40 font_weight700 margin_top3u">推广须知</view>

					<view class="margin_top3"><u-parse :content="detailData.promotionNotice" :loading="loading" @preview="preview" @navigate="navigate" /></view>
				</view>
				<view class="bottom_btn uni-flex">
					<view class="width50 text_center leftB" @click="goPage('1')">我要推广</view>
					<view class="width50 text_centern rightB" @click="goEr('合伙人招募', '5')">合伙人招募</view>
				</view>
				<template v-if="moudelFalg">
					<view class="moudel_content">
						<view class="product_content_block">
							<view class="font_size40 margin_top3u font_color22 text_center font_weight700">申请攻略</view>
							<view class="margin_top3 " style="max-height: 75vh;overflow-y:auto;padding-left: 20upx;padding-right: 20upx;">
								<u-parse :content="detailData.raidersResult.context" :loading="loading" @preview="preview" @navigate="navigate" />
							</view>
							<view class="moudel_bottom"><view class="moudel_btn" @click="colseMoudel">我知道了</view></view>
						</view>
					</view>
				</template>
			</view>
		</template>
		<!-- 分享图片 -->
		<template v-if="shareaFalg">
			<view class="moudel_content_myE" style="background-color: #FFFFFF;">
				<view class="imgEr_moudel">
					<view style="width: 95%;" class="margin_top5u  background_colorfe text_right">
						<!-- <image  style="width: 30upx;height: 30upx;" src="../../static/image/icon/close.png" mode=""></image> -->
					</view>
					<view class="" style="">
						<view style="width: 75%;" class="text_right">
							<image @click="colseErMoudel" style="width: 30upx;height: 30upx;" src="../../static/image/icon/close.png" mode=""></image>
						</view>
						<view class="font_colorf7 font_size28" style="margin-left: 180upx;">
							说明
							<text class="font_size32 font_weight700 ">长按图片</text>
							保存邀请二维码海报
						</view>
						
						<!-- <view style="width: 434upx;margin-left: 180upx;" class=" font_size26 font_colorff text_center">
							点击右上角选择『发送给朋友』或『分享到朋友圈』，邀请朋友一起成为合伙人
						</view> -->
					</view>
					<view class="uni-flex" style="width: 750upx;padding-left: 10%;padding-right: 5%;">
						<scroll-view scroll-x="true" class="wrapper" @scroll="nihao">
							<view class="img_moudel" v-for="(item, index) in posterData" :key="index">
								<image :src="item" mode="" style="height: 800upx;width: 580upx;border-radius: 10upx;margin-left: 30upx;"></image>
							</view>
						</scroll-view>
					</view>
					<view class="font_size24 font_colorff " style="idth: 434upx;margin-left: 180upx;">
						<!-- <view class="">还可以长按保存或截屏分享</view> -->
						<view class="btn_m   width50 " @click="copyData">复制邀请链接</view>
					</view>
					<!-- 	<view class="font_size24 font_colorff " style="idth: 434upx;margin-left: 180upx;">
						<view class="">还可以长按保存或截屏分享</view>
						<view class="">
							<button type="default" @click="goShare">我要跳转</button>
						</view>
						<view class="font_size24 font_colorf7 width50 text_center" @click="copyData">复制推广码</view>
					</view> -->
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
			detailData: { raidersResult: { name } },
			loading: false, //开启loading不显示默认值
			shareaFalg: false,
			posterData: [],
			infoData: '',
			copyFalg: '',
			copyIndex: 0,
			dataOne: ''
		};
	},
	onLoad(option) {
		// console.log(option);
		this.memberData = this.$member.memberObj;
		this.goodsId = option.goodsId;
		this.getProduct(); //获取详情
		var data = {
			mbId: uni.getStorageSync('userId')
		};
		this.$http.get('/api/member/info', data, true).then(res => {
			this.infoData = res.data.data;
		});
	},
	methods: {
		nihao: function(item) {
			this.copyIndex = Math.ceil(item.detail.scrollLeft / 240) - 1;
			this.copyIndex < 0 ? (this.copyIndex = 0) : (this.copyIndex = this.copyIndex);
			console.log(this.copyIndex);
		},
		goShare: function() {
			uni.navigateTo({
				url: '../shareUrl/shareUrl?goodsId=' + this.goodsId + '&referrerId=' + uni.getStorageSync('userId') + '&flag=true'
			});
		},
		//
		colseErMoudel: function() {
			this.shareaFalg = false;
			// uni.showTabBar(); //显示tab
		},
		// 复制
		copyData: function(content) {
			// console.log(content);
			// this.copyFalg = 1 ?
			let goodsId = '';
			let goodsUrl = '';
			this.dataOne[this.copyIndex].goodsUrl ? (goodsUrl = this.dataOne[this.copyIndex].goodsUrl) : (goodsUrl = '');
			this.dataOne[this.copyIndex].goodsId ? (goodsId = this.dataOne[this.copyIndex].goodsId) : (goodsId = '');
			var url =
				'https://www.hcselected.com/frontend/#/pages/shareUrl/shareUrl?referrerId=' + uni.getStorageSync('userId') + '&flag=2' + '&goodsId=' + goodsId + '&goodsUrl=' + goodsUrl;
			
			if (uni.getSystemInfoSync().platform === 'ios'){
				uni.setClipboardData({
					data: url,
					success: function(data) {
						uni.showToast({
							title: '复制成功',
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					},
					fail: function(err) {
						uni.showToast({
							title: err,
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					},
					complete: function(res) {}
				});
				return
			}
			var _this = this;
			console.log('我在这')
			var data = {
				mbId:  uni.getStorageSync('userId'),
				goodsUrl:goodsUrl,
				type:true,
				goodsId:goodsId
				
			};
			this.$http.get('/api/common/poster/shortUrl', data, true).then(res => {
					if(res.data.code == 200){
						uni.setClipboardData({
							data: res.data.data,
							success: function(data) {
								console.log(data);
								uni.showToast({
									title: '复制成功',
									icon: 'none',
									duration: 2000,
									position: 'top'
								});
							},
							fail: function(err) {},
							complete: function(res) {}
						});
					}else{
						uni.showToast({
							title: '复制失败',
							icon: 'none',
							duration: 2000,
							position: 'top'
						});
					}
					
			});
			
			
		},
		goEr: function(item, type) {
			console.log('99');
			this.shareaFalg = true;
			this.copyFalg = type;
			// uni.hideTabBar(); //隐藏tab
			// uni.showTabBar(); //显示tab
			var data = {
				type: type
			};
			this.$http.get('/api/shareMaterisal/promotionPoster', data, true).then(res => {
				this.dataOne = res.data.data;
				console.log(this.dataOne);
				uni.showLoading({
					title: '加载中'
				});
				var typeData;
				this.posterData = [];
				this.type == 4 ? (typeData = true) : (typeData = false);
				for (let i = 0; i < this.dataOne.length; i++) {
					var a =
						this.memberData.hostUrl +
						'/api/common/poster/compose?mbId=' +
						uni.getStorageSync('userId') +
						'&imgUrl=' +
						this.dataOne[i].poster +
						'&type=' +
						typeData +
						'&goodsUrl=' +
						this.dataOne[i].goodsUrl;
					this.posterData.push(a);
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
			});
		},

		goToPage: function(url) {
			uni.navigateTo({
				url: '../' + url + '/' + url
			});
		},
		getProduct: function() {
			var data = {
				goodsId: this.goodsId
			};
			this.$http.get('/api/common/goodsInfo/detail', data, true).then(res => {
				// console.log(JSON.stringify(res));
				this.detailData = res.data.data;
				// this.discoveryData = res.data.data;
			});
		},
		// goEr: function(item, type) {
		// 	uni.navigateTo({
		// 		url: '../myEr/myEr?title=' + item + '&type=' + type
		// 	});
		// },
		openMoudel: function() {
			this.moudelFalg = true;
		},
		colseMoudel: function() {
			this.moudelFalg = false;
		},

		// 我要推广
		goPage: function(item) {
			this.shareaFalg = true;
			this.copyFalg = item;
			var data = {
				goodsId: this.detailData.id
			};
			this.posterData = [];
			this.$http.get('/api/goodsInfo/poster', data, true).then(res => {
				this.dataOne = res.data.data;
				uni.showLoading({
					title: '加载中'
				});
				for (let i = 0; i < this.dataOne.length; i++) {
					var a =
						this.memberData.hostUrl +
						'/api/common/poster/compose?mbId=' +
						uni.getStorageSync('userId') +
						'&goodsId=' +
						this.dataOne[i].goodsId +
						'&imgUrl=' +
						this.dataOne[i].posterUrl +
						'&type=true&goodsUrl=' +
						this.dataOne[i].goodsUrl;
					this.posterData.push(a);
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
			});

			// uni.navigateTo({
			// 	url:
			// 		'../extension/extension?titel=' +
			// 		'推广产品名称' +
			// 		'&productId=' +
			// 		this.detailData.id +
			// 		'&billingCycle=' +
			// 		this.detailData.billingCycle +
			// 		'&cid1=' +
			// 		this.detailData.cid1 +
			// 		'&type=' +
			// 		item
			// });
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.top_moudel {
	// height: 300upx;
	background: #f75349;
	padding: 30upx 40upx;
	padding-bottom: 10upx;
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
	background: #ffffff;
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
	top: 2vh;
	// max-height: 900upx;
	width: 100%;
	// margin-left: 75upx;
	padding-bottom: 40upx;
	// overflow-y: auto;
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
.leftB {
	height: 88upx;
	line-height: 88upx;
	text-align: center;
	font-size: 32upx;
	color: #ffffff;
	background-color: #f75349;
}
.rightB {
	height: 88upx;
	line-height: 88upx;
	text-align: center;
	font-size: 32upx;
	color: #ffffff;
	background-color: #2b65eb;
}
.moudel_bottom {
	position: fixed;
	width: 100%;
	background-color: #ffffff;
	padding-bottom: 20upx;
	border-bottom-left-radius: 20upx;
	border-bottom-right-radius: 20upx;
}

.moudel_content_myE {
	height: 100%;
	width: 100%;
	position: fixed;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 99;
	top: 0;
	left: 0;
}
.wrapper {
	width: 90%;
	white-space: nowrap;
	display: flex;
	margin-top: 30upx;
	overflow-x: auto;
	// margin-left: 10%;
}
.img_moudel {
	display: inline-block;
	// padding-right: 40upx;
}
.imgEr_moudel {
	position: absolute;
}
.btn_m {
	background-color: #f75349;
	text-align: center;
	height: 88upx;
	line-height: 88upx;
	border-radius: 10upx;
	color: #ffffff;
	font-size: 32upx;
	margin-top: 10upx;
	margin-left: 50upx;
}
</style>
