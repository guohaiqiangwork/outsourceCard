<template>
	<view class="padding_bottom3" style="padding-bottom: 120upx;">
		<view class="background_color2b" style="height: 440upx;padding-top:calc( var(--status-bar-height))">
			<view class="page_widthMoudel " style="padding-top: 5%;">
				<view class="display_space uni-flex">
					<view class="" @click="goToPage('setUp')"><image style="width: 35upx;height: 38upx;" src="../../../static/image/icon/set.png" mode=""></image></view>
					<view class="">
						<image @click="goToPage('binding')" style="width: 38upx;height: 38upx;" src="../../../static/image/my/3.png" mode=""></image>
						<image @click="goToPage('newsMsg')" style="width: 38upx;height: 38upx;margin-left: 30rpx;" src="../../../static/image/icon/msgF.png" mode=""></image>
					</view>
				</view>
				<view class="uni-flex margin_top5">
					<view class="" style="width: 21%;"><image style="width: 120upx;height: 120upx;border-radius: 50%;" :src="infoData.headImgurl" mode=""></image></view>
					<view class="width60">
						<view class="uni-flex">
							<view class="font_size34 font_weight700 font_colorff">{{ infoData.nickName }}</view>
							<view class="name_moudel" v-if="!isVerified">未实名</view>
							<!-- <view class="margin_left3 margin_top2" @click="goToPage('upgradeInstructions')" v-if="infoData.levelName">
								<image style="width: 73upx;height: 28upx;" src="../../../static/image/icon/vip1.png" mode=""></image>
							</view> -->
						</view>
						<view class="uni-flex">
							<!-- ****{{ item.bankCard.substr(-4) }} -->
							<view class="font_sise28 font_colorff">推广码:{{ infoData.inviteCode }}</view>
						</view>
					</view>
				</view>
				<view v-if="!openVip" @click="goToPage('vipData')" style="position: absolute;right: 0;margin-top: -15%;">
					<image style="width: 162upx;height: 60upx;" src="../../../static/image/icon/vipLog.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="two_moudel1 uni-flex">
			<view class="left">
				<view class="uni-flex display_space" @click="goToPage('invitationNumber')">
					<view class="font_sise30">邀请用户(人)</view>
					<view class=""><image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
				</view>
				<view class="font_size54 font_weight700">{{ teamNumData.firstLevel }}</view>
			</view>
			<view class="right">
				<view class="uni-flex display_space" @click="goToPage('partnerTime')">
					<view class="font_sise30">合伙人团队(人)</view>
					<view class=""><image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
				</view>
				<view class="font_size54 font_weight700">{{ teamNumData.totalTeam }}</view>
			</view>
		</view>

		<!-- 总收入 -->
		<view class="page_widthMoudel">
			<view class="three_moudel">
				<view class="background_color2b padding_top3u padding_left3u padding_right3u padding_bottom3u" style="border-radius: 10upx 10upx 0upx 0upx;">
					<view class="font_size30 font_colorff">总收入(元)</view>
					<view class="uni-flex display_space">
						<view class="font_size54 font_colorff font_weight700">{{ totalRevenue.totalRevenue }}</view>
						<view class="uni-flex width40 display_right" @click="goToPage('revenueRecords')" style="margin-top: 40upx;">
							<view class="font_size22 font_colorff " style="margin-top: 8upx;">详情</view>
							<view class=" " style="margin-left: 8upx;">
								<image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/rightff.png" mode=""></image>
							</view>
						</view>
					</view>

					<view class="uni-flex display_space margin_top2">
						<view class="font_size22 font_colorff width50">
							可提现
							<text class="margin_left3 font_size26">{{ totalRevenue.balance }}</text>
						</view>
						<view class="ont_size22 font_colorff width50 text_right">
							今日收入
							<text class="margin_left3">{{ totalRevenue.todayIncome }}</text>
						</view>
					</view>
				</view>

				<view class="padding_left3u padding_right3u padding_top3u">
					<view class="uni-flex ">
						<view class="uni-flex width70">
							<view class="font_sise30 font_weight700">本月团队等级</view>
							<view class="margin_top2 margin_left3">
								<!-- <image src="../../../static/image/icon/tVip.png" style="width: 78upx;height: 32upx;" mode=""></image> -->
								<view class="img_bang">
									<text>{{ teamIncome.teamLevel }}</text>
								</view>
								<!-- <image v-if="teamIncome.teamLevel == 'V1'" style="width: 78upx;height: 32upx;" src="../../../static/image/icon/1vip.png" mode=""></image> -->
							</view>
						</view>
						<view class="uni-flex width30 display_right" @click="goToPage('teamLevel')">
							<view class="font_size22 " style="margin-top: 9upx;">详情</view>
							<view class="margin_left3"><image style="width: 9upx;height: 15upx;" src="../../../static/image/icon/right33.png" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex ">
						<view class="font_size26 margin_top1">当月总业绩(元)</view>
						<view class="font_size32 font_color2b margin_left3">{{ teamIncome.countMonth }}</view>
					</view>
					<view class="font_size22">还差{{ teamIncome.subtract }}元可升级至下一级</view>
				</view>
			</view>
		</view>

		<!-- 奖励规则 -->
		<view class="page_widthMoudel">
			<view class="four_moudel" @click="goToPage('rewardRules')">
				<view class="font_size50 font_color2b" style="position: absolute;margin-top: 330upx;margin-left: 15%;z-index: 2;">3%</view>
				<image src="../../../static/image/my/1.png" style="width: 100%;height: 524upx;" mode=""></image>
			</view>
		</view>

		<view class="page_widthMoudel margin_top3">
			<view class="uni-flex margin_top8">
				<view class="bottom_btn uni-flex display_center" style="margin-left: 15%;" @click="getPhone">
					<view class="margin_top3"><image style="width: 26upx;height: 26upx;" src="../../../static/image/icon/getPhone.png" mode=""></image></view>
					<view class="margin_left3">联系客服</view>
				</view>
				<view class="bottom_btn uni-flex display_center" style="margin-left: 5%;" @click="openEr">
					<view class="margin_top5"><image style="width: 26upx;height: 26upx;" src="../../../static/image/icon/myF.png" mode=""></image></view>
					<view class="margin_left3">新手社群</view>
				</view>
			</view>

			<view class="uni-flex display_center margin_top5">
				<view class=""><image style="width: 26upx;height: 26upx;" src="../../../static/image/my/log.png" mode=""></image></view>
				<view class="font_size26 margin_left3 font_weight700">慧伙</view>
			</view>

			<view class="font_size22 font_color99 text_center">您的专业推广顾问，24小时贴心服务</view>
		</view>

		<view class="bottom_m uni-flex">
			<view class="width50" @click="goEr('信贷服务推广', '4')"><image style="height: 110upx;width: 100%;" src="../../../static/image/my/4.png" mode=""></image></view>
			<view class="width50" @click="goEr('合伙人招募', '5')"><image style="height: 110upx;width: 100%;" src="../../../static/image/my/5.png" mode=""></image></view>
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
					<view class="margin_top3 text_center"><image style="width: 340upx;height: 340upx;" src="../../../static/image/erCode.png" mode=""></image></view>
					<view class="font_size26 font_color99 text_center margin_top3">长按保存二维码到相册，并微信扫码添加</view>
					<view class="save_btn" @click="saveImg">保存至相册</view>
				</view>
			</view>
		</template>

		<!-- 分享图片 -->
		<template v-if="shareaFalg">
			<view class="moudel_content_myE" style="background-color: #FFFFFF;">
				<view class="imgEr_moudel">
					<view class="" style="margin-top: 60upx;">
			
						<view class="text_right" style="width: 75%;padding-top:calc(30px +  var(--status-bar-height))">
							<image @click="colseMoudel" style="width: 30upx;height: 30upx;" src="../../../static/image/icon/close.png" mode=""></image>
						</view>
						<view class="font_colorf7 font_size28" style="margin-left: 180upx;">
							说明
							<text class="font_size32 font_weight700 ">长按图片</text>
							保存邀请二维码海报
						</view>
					</view>
					<view class="uni-flex" style="width: 750upx;padding-left: 10%;padding-right: 5%;">
						<scroll-view scroll-x="true" class="wrapper" >
							<view class="img_moudel" v-for="(item, index) in posterData" :key="index">
								<image @longpress="openSaveFenFalg(item)" :src="item" mode="" style="height: 800upx;width: 580upx;border-radius: 10upx;margin-left: 30upx;"></image>
							</view>
						</scroll-view>
					</view>
					<view class="font_size24 font_colorff " style="width: 434upx;margin-left: 220upx;">
						<view class="btn_m   width50 " @click="copyIosData">复制邀请链接</view>
					</view>
				</view>
			</view>
		</template>
	
		
		<!-- 保存还会分享 -->
		<template v-if="saveFenFalg">
			<view class="moudel_content">
				<view class="er_moudel">
					<image @click="colseSaveFenFalg" style="width: 30upx;height: 30upx;" src="../../../static/image/icon/close.png" mode=""></image>
					<view class="text_center font_size40 font_weight700">请选择贷款类型</view>
					<view class="moudel_btn_one" style="margin-top: 60upx;" @click="saveImgEr">保存图片</view>
					<view class="moudel_btn_one" style="background-color: #F75349;" @click="wxShare">微信分享</view>
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
			isVerified: true, //是否实名认证
			infoData: '',
			totalRevenue: '',
			teamNumData: '', //邀请人数
			teamIncome: '',
			shareaFalg: false,
			posterData: [],
			openVip: false,
			dataOne: '',
			copyIndex: 0,
			copyDataOne: '',
			saveImgData: '',
			saveFenFalg: false
		};
	},

	// onLoad() {
	// 	this.init()
	// },
	onShow() {
		this.init();
		this.getVip();
		this.memberData = this.$member.memberObj;
	},
	methods: {
		nihao: function(item) {
			// console.log(Math.ceil(item.detail.scrollLeft / 240)　);
			// console.log(this.dataOne[Math.ceil(item.detail.scrollLeft / 270) - 1])
			this.copyIndex = Math.ceil(item.detail.scrollLeft / 240) - 1;
			this.copyIndex < 0 ? (this.copyIndex = 0) : (this.copyIndex = this.copyIndex);
			console.log(this.copyIndex);
		},
		goShaer: function() {
			uni.navigateTo({
				url: '../../shareUrl/shareUrl?referrerId=' + uni.getStorageSync('userId') + '&flag=false'
			});
		},
		getVip: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			// 查询是否是vip
			this.$http.get('/api/member/openVip', data, true).then(res => {
				this.openVip = res.data.data;
			});
		},
		// 初始化
		init: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/info', data, true).then(res => {
				this.infoData = res.data.data;
			});
			this.$http.get('/api/member/isVerified', data, true).then(res => {
				this.isVerified = res.data.data;
			});

			// this.$http.get('/api/member/totalRevenue', data, true).then(res => {

			// 	this.totalRevenue = res.data.data;
			// });
			// 获取可提现金额
			this.$http.get('/api/member/totalRevenue', data, true).then(res => {
				this.totalRevenue = res.data.data;
			});
			//邀请用户
			this.$http.get('/api/member/teamNum', data, true).then(res => {
				this.teamNumData = res.data.data;
			});
			// b本人团队等级
			this.$http.get('/api/member/teamIncome', data, true).then(res => {
				this.teamIncome = res.data.data;
			});
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
		colseMoudel: function() {
			this.shareaFalg = false;
			uni.showTabBar(); //显示tab
		},
		// 复制
		copyData: function(content) {
			var _this = this;
			let goodsUrl = '';
			this.dataOne[this.copyIndex].goodsUrl ? (goodsUrl = this.dataOne[this.copyIndex].goodsUrl) : (goodsUrl = '');
			var url = 'https://www.hcselected.com/frontend/#/pages/shareUrl/shareUrl?referrerId=' + uni.getStorageSync('userId') + '&flag=1' + '&goodsUrl=' + goodsUrl;

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
		},
		copyIosData: function() {
			let goodsUrl = '';
			this.dataOne[this.copyIndex].goodsUrl ? (goodsUrl = this.dataOne[this.copyIndex].goodsUrl) : (goodsUrl = '');
			var url = 'https://www.hcselected.com/frontend/#/pages/shareUrl/shareUrl?referrerId=' + uni.getStorageSync('userId') + '&flag=1' + '&goodsUrl=' + goodsUrl;
			var _this = this;
			
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
			var data = {
				mbId: uni.getStorageSync('userId'),
				goodsUrl: goodsUrl,
				type: false,
				goodsId: ''
			};
			this.$http.get('/api/common/poster/shortUrl', data, true).then(res => {
				if (res.data.code == 200) {
					_this.copyDataOne = JSON.stringify(res.data.data);
						uni.setClipboardData({
							data: res.data.data,
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
				
				} else {
					uni.showToast({
						title: '复制失败,请重试',
						icon: 'none',
						duration: 2000,
						position: 'top'
					});
				}
			});
		
		
		},
		goEr: function(item, type) {
			this.shareaFalg = true;
			uni.hideTabBar(); //隐藏tab
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
				this.posterData = [];
				var typeData;
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
				}, 1000);
			});

			// uni.navigateTo({
			// 	url: '../../myEr/myEr?title=' + item + '&type=' + type
			// });
		},

		// 拨打电话
		getPhone: function() {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: '18857211566',
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		},

		saveImg: function() {
			console.log('99')
			uni.showLoading({
				title: '保存中'
			});
			var url ='https://www.ydlhuaxia.cn/image/share/h5/assers/img/erCode.png';
			uni.downloadFile({
				url: encodeURI(url), //图片地址
				success: res => {
					uni.hideLoading();
					console.log(JSON.stringify(res))
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
		
		// 长按图片
		openSaveFenFalg: function(item) {
			console.log(item);
			var _this = this;
			_this.saveImgData = item;
			_this.saveFenFalg = true;
		},
		colseSaveFenFalg: function() {
			var _this  = this;
			_this.saveFenFalg = false;
		},
		// 弹窗保存
		saveImgEr: function(item) {
			console.log(item);
			uni.showLoading({
				title: '保存中'
			});
			var _this = this;
			uni.downloadFile({
				url: _this.saveImgData, //图片地址
				success: res => {
					uni.hideLoading();
					if (res.statusCode === 200) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success: function() {
								_this.saveFenFalg = false;
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
		
		wxShare: function() {
			var _this = this ;
			let goodsId = '';
			let goodsUrl = '';
			this.dataOne[this.copyIndex].goodsUrl ? (goodsUrl = this.dataOne[this.copyIndex].goodsUrl) : (goodsUrl = '');
			this.dataOne[this.copyIndex].goodsId ? (goodsId = this.dataOne[this.copyIndex].goodsId) : (goodsId = '');
			// let goodsUrl = '';
			// this.dataOne[this.copyIndex].goodsUrl ? (goodsUrl = this.dataOne[this.copyIndex].goodsUrl) : (goodsUrl = '');
			var url =
				'https://www.hcselected.com/frontend/#/pages/shareUrl/shareUrl?referrerId=' +
				uni.getStorageSync('userId') +
				'&flag=2' +
				'&goodsId=' +
				goodsId +
				'&goodsUrl=' +
				goodsUrl;
			//分享到微信朋友
			console.log(url);
			uni.showLoading({
				title: '分享中'
			});
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href: url,
				title: '汇创精选',
				summary: '让   生   活    更   优   质 ',
				imageUrl: _this.saveImgData,
				success: function(res) {
					uni.hideLoading();
					_this.colseSaveFenFalg();
					if (res) {
						console.log('success:' + JSON.stringify(res));
					}
				},
				fail: function(err) {
					console.log('fail:' + JSON.stringify(err));
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
	width: 86upx;
	height: 36upx;
	background: #375cc7;
	border-radius: 18upx;
	text-align: center;
	line-height: 36upx;
	color: #d4def3;
	font-size: 22upx;
	margin-left: 20upx;
	margin-top: 10upx;
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
	margin-top: 10%;
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
	// margin-left: 11%;
}
.er_moudel {
	background-color: #ffffff;
	width: 80%;
	margin-left: 6%;
	position: absolute;
	top: 20%;
	padding: 30upx;
}
.imgEr_moudel {
	// background-color: #ffffff;
	// width: 80%;
	// margin-left: 6%;
	position: absolute;
	// top: 20%;
	// padding: 30upx;
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
.two_moudel1 {
	margin-top: -15%;
}

.left {
	width: 260upx;
	height: 140upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	padding: 30upx;
	margin-left: 30upx;
}
.right {
	width: 260upx;
	height: 140upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	padding: 30upx;
	margin-left: 50upx;
}
.three_moudel {
	width: 690upx;
	// height: 392upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	margin-top: 30upx;
	// padding: 30upx;
	padding-bottom: 30upx;
}
.four_moudel {
	width: 690upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	margin-top: 30upx;
}
.bottom_m {
	background-color: #ffffff;
	height: 110upx;
	position: fixed;
	width: 100%;
	/* #ifdef APP-PLUS */
	bottom: 0 !important;
	/* #endif */
	bottom: 6%;
	z-index: 9;
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
.img_bang {
	background: url('../../../static/image/icon/tVip.png') no-repeat;
	background-size: 100%;
	width: 78upx;
	height: 32upx;
	font-size: 18upx;
	color: red;
	text-align: center;
}
.img_bang text {
	color: #ffffff;
	margin-left: 10upx !important;
	margin-top: -20upx !important;
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

// 弹窗
.er_moudel {
	background-color: #ffffff;
	width: 80%;
	margin-left: 6%;
	position: absolute;
	top: 20%;
	padding: 30upx;
	border-radius: 20upx;
	padding-top: 60upx;
	padding-bottom: 60upx;
}
.moudel_btn_one {
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	width: 80%;
	margin-left: 10%;
	margin-top: 30upx;
}
</style>
