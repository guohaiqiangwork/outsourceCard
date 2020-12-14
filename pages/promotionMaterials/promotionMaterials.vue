<template>
	<view class="padding_top3">
		<view class="padding_top3 padding_bottom3  page_widthMoudel ">
			<view
				@click="tabSwich(index)"
				:class="tabIndexT == index ? 'item_tab_three' : 'item_tab_threen'"
				v-for="(item, index) in tabList"
				:key="index"
				:style="index == 2 ? 'border:none' : ''"
			>
				<view>{{ item.name }}</view>
				<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
			</view>
		</view>
		<!-- 分享素材 -->
		<template v-if="tabIndexT == 10">
			<view class="padding_top3   page_widthMoudel ">
				<view
					:class="tabIndexOne == index ? 'item_tab_one' : 'item_tab_onen'"
					v-for="(item, index) in tabListOne"
					:key="index"
					:style="index == 2 ? 'border:none' : ''"
					@click="tabOne(index)"
				>
					<view>{{ item.name }}</view>
				</view>
			</view>

			<view class="background_colorff padding_top3 page_widthMoudel border_bottom padding_bottom3">
				<view class="uni-flex">
					<view class="uni-flex searce_moudel">
						<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
						<view class="searce_right">
							<!-- @confirm="search" -->
							<input
								class="font_size28 padding_top3"
								maxlength="10"
								placeholder="请输入您的搜索内容"
								confirm-type="搜索"
								type="text"
								@input="getValue"
								placeholder-style="color:#999999"
							/>
						</view>
					</view>
					<view @click="getImgList" class="width15 margin_top1 text_center">搜索</view>
				</view>
			</view>

			<view>
				<view class="page_widthMoudel">
					<view v-for="(item, index) in graphicData" :key="index" class="padding_top3 padding_bottom3 border_bottom">
						<view class="uni-flex">
							<view class="width15 margin_top2 text_center"><image style="width: 62upx;height: 62upx;border-radius: 6upx;" :src="item.logo" mode=""></image></view>
							<view class="width55">
								<view class="font_size30 text_hidden">{{ item.name }}</view>
								<view class="font_size22 font_color99">{{ item.createTime }}</view>
							</view>
							<view class="uni-flex width30 margin_top2">
								<view class="uni-flex width50" @click="copyData">
									<view class="margin_top2"><image style="width: 24upx;height: 24upx;" src="../../static/image/icon/6.png" mode=""></image></view>
									<view class="font_sise24" style="margin-left: 10upx;">复制</view>
								</view>
								<view class="uni-flex width50 margin_left3">
									<view class="margin_top2"><image style="width: 24upx;height: 24upx;" src="../../static/image/icon/5.png" mode=""></image></view>
									<view class="font_sise24 " style="margin-left: 10upx;">分享</view>
								</view>
							</view>
						</view>

						<view class="font_size26 margin_top3  text_hidden2" style="margin-left: 15%;">{{ item.content }}</view>
						<view class="margin_top3" style="margin-left: 12%;">
							<view class="display_inline margin_left3 " v-for="(items, index) in item.pictureUrl" :key="index">
								<image class="" style="width: 180upx;height: 180upx;border-radius: 10upx;" :src="items" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>

		<!-- 分享海报 -->
		<template v-if="tabIndexT == 0">
			<view class="padding_top3   page_widthMoudel ">
				<view
					:class="tabIndexTwo == index ? 'item_tab_one' : 'item_tab_onen'"
					v-for="(item, index) in tabListTwo"
					:key="index"
					:style="index == 2 ? 'border:none' : ''"
					@click="getTwo(index)"
				>
					<view>{{ item.name }}</view>
				</view>
			</view>
			<view class="page_widthMoudel">
				<view class="">
					<swiper class="imageContainer" circular autoplay @change="handleChange">
						<block v-for="(item, index) in promotionPosterData" :key="index">
							<swiper-item ><image @longpress="saveImgEr(item)" class="itemImg" :src="item" lazy-load mode="scaleToFill"></image></swiper-item>
						</block>
					</swiper>
				</view>
				<!-- <view class="uni-flex padding_bottom3 " style="position: fixed;bottom: 0;width: 92%;">
					<view @click="goShare(item)" class="width50 text_center" v-for="(item, index) in shareList" :key="index">
						<view class=""><image style="width: 60upx;height: 60upx;" :src="item.img" mode=""></image></view>
						<view class="font_size26 margin_top2">{{ item.name }}</view>
					</view>
				</view> -->
				<view class="font_size30 text_center margin_top3u font_colorf7">长按分享</view>
			</view>
		</template>

		<!-- 邀请好友 -->

		<template v-if="tabIndexT == 1">
			<view class="page_widthMoudel">
				<view class="">
					<swiper class="imageContainer" circular autoplay style="height: 75vh;border-radius: 10upx;" @change="handleChange">
						<block v-for="(item, index) in promotionPosterData" :key="index">
							<swiper-item >
								<image @longpress="saveImgEr(item)" style="height: 75vh;border-radius: 10upx;" class="itemImg" :src="item" lazy-load mode="scaleToFill"></image>
							</swiper-item>
						</block>
					</swiper>
				</view>
				<!-- <view class="uni-flex padding_bottom3 " style="position: fixed;bottom: 0;width: 92%;">
					<view @click="goShare(item)" class="width50 text_center" v-for="(item, index) in shareList" :key="index">
						<view class=""><image style="width: 60upx;height: 60upx;" :src="item.img" mode=""></image></view>
						<view class="font_size26 margin_top2">{{ item.name }}</view>
					</view>
				</view> -->
				<view class="font_size30 text_center margin_top3u font_colorf7">长按分享</view>
			</view>
		</template>

		<!-- 分享 -->
		<template v-if="shareFalg">
			<view class="uni-flex padding_bottom3 background_colorff padding_top3" style="position: fixed;bottom: 0;width: 100%">
				<view @click="myshare" class="width25 text_center" v-for="(item, index) in [1, 2, 3, 4]" :key="index">
					<view class=""><image style="width: 60upx;height: 60upx;" src="../../static/image/icon/home3.png" mode=""></image></view>
					<view class="font_size26 margin_top2">分享海报</view>
				</view>
			</view>
		</template>
	</view>
</template>

<script>
// #ifdef H5
var jweixin = require('jweixin-module');
// #endif

export default {
	data() {
		return {
			tabList: [
				{
					name: '推广海报'
				},
				{
					name: '邀请好友'
				}
			],
			tabIndexT: 0,
			tabListOne: [
				{
					name: '按时间排序'
				},
				{
					name: '按热度排序'
				}
			],
			tabIndexOne: 0,
			shareList: [{ name: '分享海报', img: '../../static/image/icon/fxh.png' }, { name: '保存海报', img: '../../static/image/icon/bcx.png' }],
			tabListTwo: [
				{
					name: '推广信用卡'
				},
				{
					name: '推广贷款'
				}
			],
			tabIndexTwo: 0,
			shareFalg: false,
			keyword: '', //关键词
			graphicData: [],
			promotionPosterData: [],
			currentIndex: 0,
			currentIndexOne: '',
			memberData: '',
			keywordData:''
		};
	},
	onLoad(option) {
		console.log(option);
		uni.setNavigationBarTitle({
			title: option.title
		});
		// this.getImgList();
		this.getList();
		this.memberData = this.$member.memberObj;
	},
	methods: {
		tabOne: function(index) {
			this.tabIndexOne = index;
			// this.getImgList();
		},
		// 推广素材
		getTwo: function(item) {
			this.tabIndexTwo = item;
			this.getList();
		},
		// 获取输入值
		getValue: function(e) {
			console.log(e);
			this.keyword = e.detail.value;
		},
		// 获取精美图文
		getImgList: function() {
			var data = {
				sort: this.tabIndexOne + 1,
				keyword: this.keyword
			};
			// 代理攻略
			this.$http.get('/api/shareMaterisal/graphic', data, true).then(res => {
				this.graphicData = res.data.data;
			});
		},
		// 获取图
		getList: function() {
			var data = {
				type: this.tabIndexTwo + 1
			};
			this.$http.get('/api/shareMaterisal/promotionPoster', data, true).then(res => {
				let dataOne = res.data.data;
				uni.showLoading({
					title: '加载中'
				});
					this.promotionPosterData =[];
					var typeData;
					this.tabIndexTwo + 1 == 3 ? typeData = false :typeData = true; 
				for (let i = 0; i < dataOne.length; i++) {
					var a =
						this.memberData.hostUrl +
						'/api/common/poster/compose?mbId=' +
						uni.getStorageSync('userId') +
						'&goodsId=' +
						'&imgUrl=' +
						dataOne[i].poster +
						'&type=' + typeData + '&goodsUrl=' +
						dataOne[i].goodsUrl;

					this.promotionPosterData.push(a);
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
				// this.promotionPosterData = res.data.data;
			});
		},

		tabSwich: function(e) {
			this.tabIndexT = e;
			if(this.tabIndexT == 1){
				this.tabIndexTwo = 2
			}else if(this.tabIndexT == 0){
				this.tabIndexTwo = 0
			}
			// this.tabIndexT == 2 ? (this.tabIndexTwo = 2) : '';
			this.getList();
			// this.tabIndexT == 0 ? this.getImgList() : this.getList();
		},
		// 轮播邀请好友
		handleChange: function(e) {
			this.currentIndex = e.detail.current;
		},

		// handleChange1: function(e) {
		// 	this.currentIndexOne = e.detail.current;
		// },
		// 分享
		goShare: function(item) {
			console.log(this.tabIndexT + this.currentIndex);
			if (item.name == '保存海报') {
				console.log(this.promotionPosterData[this.currentIndex]);
				var _this = this;
				uni.downloadFile({
					url: _this.promotionPosterData[this.currentIndex], //图片地址
					success: res => {
						if (res.statusCode === 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: '保存成功',
										icon: 'none'
									});
								},
								fail: function() {
									uni.showToast({
										title: '保存失败',
										icon: 'none'
									});
								}
							});
						}
					}
				});
				// 	uni.downloadFile({
				// 		url: this.promotionPosterData[this.currentIndex].poster,
				// 		success: res => {
				// 			if (res.statusCode === 200) {
				// 				uni.saveImageToPhotosAlbum({
				// 					filePath: res.tempFilePath,
				// 					success: function() {
				// 						uni.showToast({
				// 							title: '保存成功',
				// 							icon: 'none'
				// 						});
				// 					},
				// 					fail: function() {
				// 						uni.showToast({
				// 							title: '保存失败，请稍后重试',
				// 							icon: 'none'
				// 						});
				// 					}
				// 				});
				// 			}
				// 		}
				// 	});
			}
			// this.shareFalg = true;
		},
		consoleMoudel: function() {
			this.shareFalg = false;
		},

		// 复制
		copyData: function() {
			uni.setClipboardData({
				data: this.recommendData.wxNumber,
				success: function(data) {
					uni.showToast({
						title: '复制成功',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
					_this.moudelFalg = false;
				},
				fail: function(err) {},
				complete: function(res) {}
			});
		},
		
		saveImgEr:function(item){
			uni.downloadFile({
				url: item, //图片地址
				success: res => {
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								uni.showToast({
									title: '保存成功',
									icon: 'none'
								});
							},
							fail: function() {
								uni.showToast({
									title: '保存失败',
									icon: 'none'
								});
							}
						});
					}
				}
			});
		},
		// 分享功能块
		// 截取链接换取签名
		// #ifdef H5
		getIndexData() {
			uni.request({
				url: app.appUrl + 'Index/index',
				method: 'GET',
				// 把当前的地址传给后台，后台拿着这个地址去请求微信返回签名
				data: { url: window.location.href },
				success: res => {
					if (res.data.status) {
						this.shareobj = res.data.jsapi;
						if (this.shareobj.url) {
							this.shareurl(); //调用分享方法
						}
					}
				}
			});
		},

		// 分享
		shareurl() {
			var that = this;
			console.log(this.shareobj);
			// var ppid
			// if(this.userinfo.id) {
			//     ppid = this.userinfo.id
			// }else {
			//     ppid = ""
			// }
			jweixin.config({
				debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
				appId: this.shareobj.appId, // 必填，公众号的唯一标识
				timestamp: this.shareobj.timestamp, // 必填，生成签名的时间戳
				nonceStr: this.shareobj.nonceStr, // 必填，生成签名的随机串
				signature: this.shareobj.signature, // 必填，签名
				jsApiList: ['checkJsApi', 'onMenuShareTimeline', 'onMenuShareAppMessage']
			});
			jweixin.ready(function() {
				//获取“分享给朋友”按钮点击状态及自定义分享内容接口（即将废弃）
				console.log(that.setting);
				jweixin.onMenuShareAppMessage({
					title: that.setting.title, // 分享标题
					desc: that.setting.intro, // 分享描述
					link: window.location.origin + '/pages/index/index?ppid=' + ppid, // 分享链接
					imgUrl: that.setting.logo, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {}
				});
				jweixin.onMenuShareTimeline({
					title: that.setting.title, // 分享标题
					desc: that.setting.intro, // 分享描述
					link: window.location.origin + '/pages/index/index?ppid=' + ppid, // 分享链接
					imgUrl: that.setting.logo, // 分享图标
					type: '', // 分享类型,music、video或link，不填默认为link
					dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
					success: function() {}
				});
			});
		}

		// #endif
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
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
.item_tab_one {
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #2b65eb;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	font-weight: 700 !important;
	padding-bottom: 30upx;
}

.item_tab_onen {
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
	margin-left: 40%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}

// 轮播
.imageContainer {
	width: 100%;
	height: 70vh;
	border-radius: 10upx;
}

.itemImg {
	width: 100%;
	height: 70vh;
	border-radius: 10upx;
}
</style>
