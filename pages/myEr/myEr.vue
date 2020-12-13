<template>
	<view class="padding_top3">
		<!-- 分享海报 -->
		<template>
			<view class="page_widthMoudel">
				<view class="">
					<view class="uni-swiper-msg ">
						<swiper class="imageContainer" circular autoplay @change="handleChange">
							<block v-for="(item, index) in posterData" :key="index">
								<swiper-item @click="swiperClick(item)"><image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image></swiper-item>
							</block>
						</swiper>
					</view>
					<!-- <image src="../../static/image/cs.png" style="width: 100%;" mode=""></image> -->
				</view>
				<!-- 	<view class="uni-flex padding_bottom3 " style="position: fixed;bottom: 0;width: 92%;">
					<view @click="goShare(item)" class="width25 text_center" v-for="(item, index) in imgList" :key="index">
						<view class=""><image style="width: 60upx;height: 60upx;" :src="item.url" mode=""></image></view>
						<view class="font_size26 margin_top2">{{ item.name }}</view>
					</view>
				</view> -->
				<view class="font_size30 text_center margin_top3 font_colorf7">长按分享</view>
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
					name: '分享海报'
				},
				{
					name: '分享素材'
				}
			],
			imgList: [
				{ url: '../../static/image/icon/1.png', name: '分享图片' },
				{ url: '../../static/image/icon/2.png', name: '分享链接' },
				{ url: '../../static/image/icon/3.png', name: '保存海报' },
				{ url: '../../static/image/icon/4.png', name: '复制链接' }
			],
			tabIndexT: 0,
			shareFalg: false,
			posterData: [],
			rebateData: [],
			billingCycle: '',
			cid1: '',
			memberData: '',
			imgIndex: 0
		};
	},
	onLoad(option) {
		console.log(option);
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.type = option.type;
		this.getList();
		this.memberData = this.$member.memberObj;
		console.log(this.memberData);
	},
	methods: {
		handleChange: function(e) {
			this.imgIndex = e.detail.current;
		},
		// 获取列表
		getList: function() {
			var data = {
				type: this.type
			};
			this.$http.get('/api/shareMaterisal/promotionPoster', data, true).then(res => {
				var dataOne = res.data.data;
				uni.showLoading({
					title: '加载中'
				});
				var typeData;
				this.type == 4 ? (typeData = true) : (typeData = false);
				for (let i = 0; i < dataOne.length; i++) {
					var a =
						this.memberData.hostUrl +
						'/api/common/poster/compose?mbId=' +
						uni.getStorageSync('userId') +
						'&imgUrl=' +
						dataOne[i].poster +
						'&type=' +
						typeData +
						'&goodsUrl=' +
						dataOne[i].goodsUrl;
					this.posterData.push(a);
				}
				setTimeout(function() {
					uni.hideLoading();
				}, 3000);
			});
		
		
		},
		// 获取素材
		getRebate: function() {
			var data = {
				cid1: this.cid1,
				billingCycle: this.billingCycle
			};
			this.$http.get('/api/goodsInfo/rebate', data, true).then(res => {
				this.rebateData = res.data.data;
			});
		},
		tabSwich: function(e) {
			this.tabIndexT = e;
			this.tabIndexT == 0 ? this.getList() : this.getRebate();
		},
		// 分享
		goShare: function(item) {
			console.log(item);
			// let filePath =  item.url;
			// if(item.name == '复制链接'){
			// 	this.copyData()
			// }
			switch (item.name) {
				case '复制链接':
					this.copyData();
					break;
				case '保存海报':
					this.saveImg();
					break;
			}
		},
		// 保存到相册
		saveImg: function() {
			console.log(this.posterData[this.imgIndex]);
			uni.downloadFile({
				url: this.posterData[this.imgIndex], //图片地址
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

		consoleMoudel: function() {
			this.shareFalg = false;
		},

		// 复制
		copyData: function(content) {
			console.log(content);
			uni.setClipboardData({
				data: '我要成功',
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
		},

		// 分享功能块
		// 截取链接换取签名
		// #ifndef H5
		getIndexData: function() {
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
}

.itemImg {
	width: 100%;
	height: 70vh;
	border-radius: 10upx;
}
</style>
