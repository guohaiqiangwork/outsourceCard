<template>
	<view class="padding_top3">
		<!-- <view class="padding_top3 padding_bottom3 border_bottom page_widthMoudel ">
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
		</view> -->
		<!-- 分享海报 -->
		<template v-if="tabIndexT == 0">
			<view class="page_widthMoudel">
				<view class="">
					<view class="uni-swiper-msg ">
						<swiper class="imageContainer" circular autoplay>
							<block v-for="(item, index) in posterData" :key="index">
								<swiper-item @click="swiperClick(item)"><image class="itemImg" :src="item" lazy-load mode="scaleToFill"></image></swiper-item>
							</block>
						</swiper>
					</view>
					<!-- <image src="../../static/image/cs.png" style="width: 100%;" mode=""></image> -->
				</view>

				<view class="font_size30 text_center margin_top3 font_colorf7">长按分享</view>
				<!-- <view class="uni-flex padding_bottom3 " style="position: fixed;bottom: 0;width: 92%;">
					<view @click="goShare(item)" class="width25 text_center" v-for="(item, index) in imgList" :key="index">
						<view class=""><image style="width: 60upx;height: 60upx;" :src="item.url" mode=""></image></view>
						<view class="font_size26 margin_top2">{{ item.name }}</view>
					</view>
				</view> -->
			</view>
		</template>
		<!-- 分享素材 -->
		<template v-else>
			<view>
				<view class="page_widthMoudel">
					<view v-for="(item, index) in rebateData" :key="index" class="padding_top3 padding_bottom3 border_bottom">
						<view class="uni-flex">
							<view class="width15 margin_top2 text_center"><image style="width: 62upx;height: 62upx;border-radius: 6upx;" :src="item.picture" mode=""></image></view>
							<view class="width55">
								<view class="font_size30">{{ item.name }}</view>
								<view class="font_size22 font_color99">{{ item.createTime }}</view>
							</view>
							<view class="uni-flex width30 margin_top2">
								<view class="uni-flex width50" @click="copyData(item.content)">
									<view class="margin_top2"><image style="width: 24upx;height: 24upx;" src="../../static/image/icon/6.png" mode=""></image></view>
									<view class="font_sise24" style="margin-left: 10upx;">复制</view>
								</view>
								<view class="uni-flex width50 margin_left3">
									<view class="margin_top2"><image style="width: 24upx;height: 24upx;" src="../../static/image/icon/5.png" mode=""></image></view>
									<view class="font_sise24 " style="margin-left: 10upx;">分享</view>
								</view>
							</view>
						</view>

						<view class="font_size26 margin_top3 preL" style="margin-left: 15%;">{{ item.content }}</view>
						<view class="margin_top3" style="margin-left: 12%;">
							<view class="display_inline margin_left3 " v-for="(items, index) in item.pictureUrl" :key="index">
								<image class="" style="width: 180upx;height: 180upx;border-radius: 10upx;" :src="items" mode=""></image>
							</view>
						</view>
					</view>
				</view>
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
			cid1: ''
		};
	},
	onLoad(option) {
		console.log(option);
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.goodsId = option.productId;
		this.billingCycle = option.billingCycle;
		this.cid1 = option.cid1;
		this.getList();
		this.memberData = this.$member.memberObj;
	},
	methods: {
		// 获取列表
		getList: function() {
			var data = {
				goodsId: this.goodsId
			};
			this.$http.get('/api/goodsInfo/poster', data, true).then(res => {
				// this.posterData = res.data.data;
				let dataOne = res.data.data;
				uni.showLoading({
					title: '加载中'
				});
				for (let i = 0; i < dataOne.length; i++) {
					var a =
						this.memberData.hostUrl +
						'/api/common/poster/compose?mbId=' +
						uni.getStorageSync('userId') +
						'&goodsId=' +
						dataOne[i].goodsId +
						'&imgUrl=' +
						dataOne[i].posterUrl +
						'&type=true&goodsUrl=' +
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
		goShare: function() {
			this.shareFalg = true;
		},
		consoleMoudel: function() {
			this.shareFalg = false;
		},

		// 复制
		copyData: function(content) {
			console.log(content);
			uni.setClipboardData({
				data: content,
				success: function(data) {
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
	height: 88vh;
}

.itemImg {
	width: 100%;
	height: 88vh;
}
</style>
