<template>
	<view>
		<view class="background_colorff padding_top3 padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view class="uni-flex">
				<view class="uni-flex searce_moudel" @click="goSearch" style="width: 85%;margin-left: 4%;">
					<view class="searce_left"><image src="../../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!-- @confirm="search" -->
						<input class="font_size28 padding_top3" maxlength="10" placeholder="请输入您的搜索内容" confirm-type="搜索" type="text" placeholder-style="color:#999999" />
					</view>
				</view>
				<view @click="goPage('newsMsg')" class="width15 margin_top2 text_center">
					<image src="../../../static/image/icon/msg.png" style="width: 38upx;height: 38upx;" mode=""></image>
				</view>
			</view>

			<!-- 公告栏 -->
			<view class="page_widthMoudel">
				<view class="uni-flex gong_g_m" v-if="msg.length != 0">
					<view class="img_cnter"><image src="../../../static/image/icon/notice.png" style="width: 28upx;height: 32upx;" mode=""></image></view>
					<!-- 公告内容 -->
					<view class="uni-swiper-msg margin_left2">
						<swiper class="swiper" vertical="true" autoplay="false" duration="500" interval="2000">
							<swiper-item v-for="(item, index) in msg" :key="index" class="swiper_item_font text_hidden">
								<view class="font_size26 font_color66">{{ item.content }}</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>

			<!-- 公告栏end -->
		</view>

		<!-- 内容 -->
		<view class="page_widthMoudel padding_bottom3">
			<view class="margin_top3" v-if="lunList.length > 0">
				<!-- @change="handleChange" -->
				<swiper class="imageContainer" circular autoplay>
					<block v-for="(item, index) in lunList" :key="index">
						<swiper-item @click="swiperClick(item)"><image class="itemImg" :src="item.carouselUrl" lazy-load mode="scaleToFill"></image></swiper-item>
					</block>
				</swiper>
			</view>
			<!-- <view class="margin_top3u"><image src="../../../static/image/cs.png" style="height: 200upx;width: 100%;" mode=""></image></view> -->
			<!-- 操作栏-->
			<view class="font_size36 font_color22 margin_top5">产品分类</view>
			<view class="tab_moudel">
				<view class="margin_left2 margin_top3">
					<view @click="goHomeList(item)" class="display_inline text_center width25" v-for="(item, index) in homeList" :key="index">
						<view class=""><image :src="item.imageUrl" class="icon_width" mode=""></image></view>
						<view class=" font_size26">{{ item.name }}</view>
					</view>
				</view>
			</view>
		<!-- 	<view class="top_moudel">
				<view class="margin_left2 margin_top3">
					<view @click="goHomeList(item)" class="display_inline text_center width25" v-for="(item, index) in homeList" :key="index">
						<view class=""><image :src="item.imageUrl" class="icon_width" mode=""></image></view>
						<view class=" font_size26">{{ item.name }}</view>
					</view>
			
				</view>
			</view> -->
			<!-- 精选发现 -->
			<block v-if="discoveryData.length > 0">
				<view class="font_size36 font_color22 margin_top5">精选发现</view>
				<view class="margin_top3 " style="border-radius: 10upx;line-height: 0;overflow: hidden;box-shadow: 0upx 4upx 10upx 0upx #e7eaf2; ">
					<view @click="goToDetail(item)" style="line-height: 0;" class="width50 display_inline" v-for="(item, index) in discoveryData" :key="index">
						<image :src="item.imageUrl" class="img_width" mode=""></image>
					</view>
				</view>
			</block>
			
			<view class="" v-if="false">
				<!-- 精选信用卡 -->
				<view v-if="creditCardList.length > 0" class="font_size36 font_color22 margin_top5">精选信用卡</view>
				
				<view class="uni-flex">
					<scroll-view scroll-x="true" class="wrapper">
						<view :class="index != 0 ? 'margin_left3' : ''" class="card_moudel" @click="goToCard(item)" v-for="(item, index) in creditCardList" :key="index">
							<view class="font_size26 text_center " style="color: #ABADB4; background-color: #F1F1F3;height: 44rpx;line-height: 44rpx;">{{ item.bankName }}</view>
							<view class="text_hidden margin_top3">{{ item.goodsName }}</view>
							<view class="font_colorf4 font_size54 font_weight700 margin_top2">
								{{ item.highestReturn }}
								<text class="font_size24">元</text>
							</view>
							<view class="font_size22 font_color99">最高返</view>
							<view class="">
								<view class="list_one" v-if="item.cycle">{{ item.cycle }}</view>
								<view class="list_one" v-if="item.label">{{ item.label }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
				
				<!-- 热门资讯 -->
				<view class="font_size36 font_color22 margin_top5">热门资讯</view>
				<view  class="moudel_list uni-flex margin_top3u" @click="goHotDetail(item)" v-for="(item, index) in courseData" :key="index" style="padding-top: 30upx;padding-bottom: 15upx;">
					<view class="width33"><image :src="item.pictureUrl" style="width: 180upx;height: 180upx;border-radius: 10upx;" mode=""></image></view>
					<view class="width66">
						<view class="font_size30 font_color22 font_weight700">{{ item.name }}</view>
						<view class="font_size24 font_color99 text_hidden margin_top2">{{ item.title }}</view>
						<view class="uni-flex margin_top8 font_size22 font_color66 display_right">
							<view class="font_size22">
								已更新
								<text class="font_color33 font_size22">{{ item.periodsupdatenum }}</text>
								期
							</view>
							<view class="margin_left3 font_size22">
								共
								<text class="font_color33 font_size22">{{ item.periodsNum }}</text>
								期
							</view>
						</view>
					</view>
				</view>
						
			</view>
			
		
		
			<!-- 精选贷款 -->
			<view class="uni-flex  margin_top5" >
				<view class="font_size36 font_color22 width50">精选产品</view>
				<view class="uni-flex width50 display_right">
					<view class="font_size26 font_color99 " @click="goLoanM(featuredDiscovery[0].cid1)">查看全部</view>
					<view class="margin_left3"><image style="width: 12upx;height: 20upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
				</view>
			</view>
			<view class="moudel_list margin_top3">
				<view
					@click="goPage('productDetails', item)"
					class="border_bottom padding_bottom3 padding_top3"
					:style="index == featuredDiscovery.length - 1 ? 'border:none' : ''"
					v-for="(item, index) in featuredDiscovery"
					:key="index"
				>
					<view class="uni-flex">
						<view class="margin_top1">
							<image style="width: 30upx;height: 30upx;" :src="item.logoUrl" mode=""></image>
						</view>
						<view class="" style="margin-left: 10upx;">{{ item.goodsName }}</view>
						<view class="list_one" style="margin-top: 10upx;">{{ item.cycle }}</view>
					</view>
					<view class="uni-flex">
						<view class="width25">
							<view class="font_size54 font_weight700 font_colorf4">
								{{ item.highestReturn }}
								<!-- <text class="font_size24">%</text> -->
							</view>
							<view class="font_size22 font_color99">最高反</view>
						</view>
						<view class="width50 margin_top2">
							<view class="font_size38 font_weight700 font_color22">{{ item.minAmount }}-{{ item.maxAmount }}</view>
							<view class="font_size22 font_color99 margin_top4">贷款额度(元)</view>
						</view>
						<view class="width25 margin_top8"><view class="right_btn">立即推广</view></view>
					</view>
				</view>
			</view>
			
			
			<view class="uni-flex display_center margin_top5">
				<view class=""><image style="width: 26upx;height: 26upx;" src="../../../static/image/my/log.png" mode=""></image></view>
				<view class="font_size26 margin_left3 font_weight700">汇创精选</view>
			</view>
			
			<view class="font_size22 font_color99 text_center">您的专业推广顾问，24小时贴心服务</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msg: [],
			homeList: [],
			appid: 'wx5d7f40ad90aaa137',
			redirect_url: 'http://zhichengdapay.com/h5_web/index.html',
			lunList: [], //轮播
			creditCardList: [], //精选信用卡
			featuredDiscovery: [], //精选贷款
			courseData: '', //热门咨询
			discoveryData: [] //精选发现
		};
	},
	onShow() {
		this.init();
		// if (uni.getStorageSync('memberId')) {
		// 	this.init();
		// } else {
		// 	let code = uni.getStorageSync('weiXinCode');
		// 	let weiXinCode = this.getUrlCode('code');
		// 	// console.log(weiXinCode + '数据');
		// 	uni.setStorageSync('weiXinCode', weiXinCode);
		// 	// console.log(uni.getStorageSync('weiXinCode') + '获取看看');
		// 	if (code) {
		// 		this.getOpenidAndUserinfo();
		// 	} else {
		// 		this.getCode();
		// 	}
		// }
		// console.log('处理数据' + uni.getStorageSync('bingDId'));
	},
	methods: {
		swiperClick: function(item) {
			console.log(item);
			if (item.url == 'productDetails') {
				uni.navigateTo({
					url: '../../' + item.url + '/' + item.url + '?goodsId=' + item.linkId
				});
			} else {
				uni.navigateTo({
					url: '../../' + item.url + '/' + item.url + '?id=' + item.linkId
				});
			}
		},
		// 初始化已完结
		init: function() {
			// 获取首页公告
			this.$http.get('/api/index/board', '', true).then(res => {
				this.msg = res.data.data;
				// // 获取轮播
				this.$http.get('/api/index/carousel', '', true).then(res => {
					this.lunList = res.data.data;
				});
				// 热门咨询
				this.$http.get('/api/index/course', '', true).then(res => {
					// console.log(JSON.stringify(res))
					this.courseData = res.data.data;
				});
				
				// 产品推广
				this.$http.get('/api/index/productMarketing', '', true).then(res => {
					this.homeList = res.data.data;
				});
				// 精选贷款
				this.$http.get('/api/index/featuredDiscovery', '', true).then(res => {
					this.featuredDiscovery = res.data.data;
				});
				// // 精选信用卡
				this.$http.get('/api/index/featuredCreditCard', '', true).then(res => {
					this.creditCardList = res.data.data;
				});
				// 精选发现
				this.$http.get('/api/index/discovery', '', true).then(res => {
					this.discoveryData = res.data.data;
				});
						
						
			});
			
		},

		// 去详情
		goToDetail: function(item) {
			// console.log(JSON.stringify(item))
			uni.navigateTo({
				url: '../../productDetails/productDetails?goodsId=' + item.goodsId
			});
		},
		// 去热门咨询
		goHotDetail: function(item) {
			uni.navigateTo({
				url: '../../advancedDetail/advancedDetail?id=' + item.id
			});
		},
		goSearch: function() {
			uni.navigateTo({
				url: '../../search/search'
			});
		},
		goPage: function(e, falg) {
			if (falg) {
				// 邀请好友
				// uni.navigateTo({
				// 	url: '../../shareUrl/shareUrl?goodsId=' + falg.id
				// });
				uni.navigateTo({
					url: '../../' + e + '/' + e + '?goodsId=' + falg.id
				});
			} else {
				uni.navigateTo({
					url: '../../' + e + '/' + e
				});
			}
		},
		goToCard: function(item) {
			uni.navigateTo({
				url: '../../productDetails/productDetails?goodsId=' + item.id
			});
		},

		// 去精选贷款
		goLoanM: function(id) {
			uni.navigateTo({
				url: '../../loanMoney/loanMoney?typeId=' + id
			});
		},
		// 推广产品
		goHomeList: function(item) {

			if (!item.url) {
				uni.showToast({
					title: '功能正在路上。。。。',
					icon: 'none',
					duration: 2000,
					position: 'top'
				});
				return;
			} else {
				uni.navigateTo({
					url: '../../' + item.url + '/' + item.url + '?typeId=' + item.id
				});
			}
		},
		// 获取微信登录code
		getCode: function() {
			// console.log('234920-492- ');
			// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
			let code = this.getUrlCode('code');
			// console.log('进来了 ' + code);
			if (code === null || code === '') {
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					this.appid +
					'&redirect_uri=' +
					this.redirect_url +
					'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
			} else {
				this.getOpenidAndUserinfo(code);
			}
		},

		getUrlCode: function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},

		getOpenidAndUserinfo: function(code) {
			// var code = '011J2eXm0ck7en1t8pYm0kdilZ2J2eXy';
			// console.log(JSON.stringify(code) + '数据乐乐');
			uni.request({
				// url: 'http://127.0.0.1/api/wxLogin?code=' + code + '&state=state&appid=' + appid,
				url: 'http://manage.zhichengdapay.com/wx/oauth2getAccessToken?code=' + uni.getStorageSync('weiXinCode'),
				method: 'GET',
				success: res => {
					// console.log('通过code获取openid和accessToken', res);
					if (res.data.code === 200) {
						// console.log('通过code 换取存心' + res);
						// 登录成功，可以将用户信息和token保存到缓存中
						// uni.setStorageSync('weiXinCode',res.data.data.openId);
						// console.log('接口返回' + JSON.stringify(res));
						uni.setStorageSync('weiXinopenId', res.data.data.openid);
						uni.setStorageSync('memberId', res.data.data.mbId);
						// console.log('我在地' + uni.getStorageSync('bingDId'));
						// console.log('oppid' + uni.getStorageSync('weiXinopenId'));
						if (uni.getStorageSync('bingDId')) {
							var data = {
								parentId: uni.getStorageSync('bingDId'),
								openid: uni.getStorageSync('weiXinopenId')
							};
							this.$http.post('/mb/saveOpenId', data, true).then(res => {
								if (res.data.code == 200) {
									this.imgList = res.data.data;
								}
							});
						}
						this.init();
					}
				}
			});
		}
	}
};
</script>

<style lang="less">
.gong_g_m {
	height: 70upx !important;
	margin-top: 3%;
}
.img_cnter {
	text-align: left;
	height: 40upx;
	width: 6%;
	margin-top: 2%;
}
.icon_width {
	width: 60upx;
	height: 60upx;
	margin-top: 40upx;
	border-radius: 50%;
}
.tab_moudel {
	// height: 180upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	padding-bottom: 20upx;
}
.img_width {
	width: 100%;
	height: 200upx;
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
.list_one {
	line-height: 35upx;
	// padding: 10upx;
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
.right_btn {
	width: 150upx;
	height: 54upx;
	background: #2b65eb;
	border-radius: 27upx;
	text-align: center;
	color: #ffffff;
	font-size: 26upx;
	line-height: 54upx;
	margin-left: 5%;
}

// 轮播
.imageContainer {
	width: 100%;
	height: 200upx;
}

.itemImg {
	width: 100%;
	height: 200upx;
	border-radius: 10upx;
}
</style>
