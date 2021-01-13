<template>
	<view class="">
		<!-- 1475 -->
		<template>
			<view style="padding-bottom: 99upx;">
				<view class="top_moudel" v-if="flag == 2">
					<view class="uni-flex display_space  font_weight700">
						<view class="width70 uni-flex">
							<view class="font_size34 ">{{ detailData.bankName }}</view>
						</view>

						<view class="font_size20 font_colorff width30 text_right margin_top3" v-if="detailData.promotion">已推广{{ detailData.promotion }}人</view>
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

				<view v-if="flag == 2" class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
					<view class="uni-flex border_bottom padding_bottom3 ">
						<view class="font_sise26 width30">本人姓名</view>
						<view class=""><input type="text" value="" @input="getName" /></view>
					</view>
					<view class="uni-flex border_bottom padding_bottom3 margin_top3u ">
						<view class="font_sise26 width30 ">本人身份证号</view>
						<view class=""><input type="text" value="" @input="getIdCard" /></view>
					</view>
					<view class="uni-flex border_bottom padding_bottom3 margin_top3u">
						<view class="font_sise26 width30">常用手机号码</view>
						<view class=""><input type="text" value="" @input="getPhone" /></view>
					</view>
					<view class="uni-flex border_bottom padding_bottom3  margin_top3u" >
						<view class="font_sise26 width30">短信验证码</view>
						<view class=""><input type="text" value="" @input="getCode" /></view>

						<view class="yzm_moudel" @click="yzm_function">
							{{ countdown }}
							<text v-show="timestatus" class="forgetpwd2">秒重获</text>
						</view>
					</view>
					<view class="uni-flex border_bottom padding_bottom3 margin_top3u" v-if="detailData.types == 2">
						<view class="font_sise26 width30">企业名称</view>
						<view class=""><input type="text" value="" @input="getCompanyName" /></view>
					</view>
				</view>

				<view class="page_widthMoudel" v-if="flag == 1">
					<view class="four_moudel" @click="goToPage('rewardRules')">
						<view class="font_size50 font_color2b" style="position: absolute;margin-top: 330upx;margin-left: 15%;z-index: 2;">3%</view>
						<image src="../../static/image/my/1.png" style="width: 100%;height: 524upx;" mode=""></image>
					</view>
					<view class="font_size44  margin_top3u">立即加入合伙人</view>

					<view class=" margin_top3u">
						<view class="">
							<view class="font_size26 font_color99">姓名</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getName" /></view>
						</view>
						<view class="margin_top6">
							<view class="font_size26 font_color99">手机号</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getPhone" /></view>
						</view>
						<view class="margin_top6">
							<view class="font_size26 font_color99">本人身份证号</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getIdCard" /></view>
						</view>
						<view class="border_bottom">
							<view class="uni-flex display_space margin_top6">
								<view class="font_size26 font_color99">验证码</view>
								<view class="yzm_moudel" @click="yzm_function">
									{{ countdown }}
									<text v-show="timestatus" class="forgetpwd2">秒重获</text>
								</view>
							</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getCode" /></view>
						</view>
					</view>
				</view>

				<view class="page_widthMoudel" style="padding-bottom: 100upx;">
					<view class="" v-if="false">
						<view class="font_size40 font_weight700 margin_top3u">申请条件</view>

						<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
							<view class="font_size26 " style="white-space: pre-line;">{{ detailData.appConditions }}</view>
						</view>
						<view class="font_size40 font_weight700 margin_top3u">注意事项</view>

						<view class="moudel_list margin_top3u" style="background-color: #f7f7ff;">
							<view class="font_size26 " style="white-space: pre-line;">{{ detailData.appConditions }}</view>
						</view>
						<view class="font_size40 font_weight700 margin_top3u">申请人信息</view>
					</view>
				</view>

				<view class="bottom_btn " @click="openMoudel">立即申请</view>

				<template v-if="moudelFalg">
					<view class="moudel_content">
						<view class="product_content_block">
							<view class="font_size40 margin_top3u font_color22 text_center font_weight700">申请攻略</view>
							<view class="margin_top3"><u-parse :content="detailData.raidersResult.context" :loading="loading" @preview="preview" @navigate="navigate" /></view>

							<view class="moudel_btn" @click="colseMoudel">我知道了</view>
						</view>
					</view>
				</template>
			</view>
		</template>

		<template v-if="false">
			<view style="padding-bottom: 99upx;">
				<view class="page_widthMoudel" v-if="flag == 1">
					<view class="four_moudel" @click="goToPage('rewardRules')">
						<view class="font_size50 font_color2b" style="position: absolute;margin-top: 330upx;margin-left: 15%;z-index: 2;">3%</view>
						<image src="../../static/image/my/1.png" style="width: 100%;height: 524upx;" mode=""></image>
					</view>
					<view class="font_size44  margin_top3u">立即加入合伙人</view>

					<view class=" margin_top3u">
						<view class="">
							<view class="font_size26 font_color99">姓名</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getName" /></view>
						</view>
						<view class="margin_top6">
							<view class="font_size26 font_color99">手机号</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getPhone" /></view>
						</view>
						<view class="margin_top6">
							<view class="font_size26 font_color99">本人身份证号</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getIdCard" /></view>
						</view>
						<view class="">
							<view class="uni-flex display_space margin_top6">
								<view class="font_size26 font_color99">验证码</view>
								<view class="yzm_moudel" @click="yzm_function">
									{{ countdown }}
									<text v-show="timestatus" class="forgetpwd2">秒重获</text>
								</view>
							</view>
							<view class=" border_bottom padding_bottom3 margin_top6"><input type="text" value="" @input="getCode" /></view>
						</view>

						<!-- <view class="uni-flex border_bottom padding_bottom3 margin_top3u ">
							<view class="font_sise26 width30 ">本人身份证号</view>
							<view class=""><input type="text" value="" @input="getIdCard" /></view>
						</view> -->
						<!-- <view class="uni-flex border_bottom padding_bottom3 margin_top3u">
							<view class="font_sise26 width30">常用手机号码</view>
							<view class=""><input type="text" value="" @input="getPhone" /></view>
						</view>
						<view class="uni-flex   margin_top3u">
							<view class="font_sise26 width30">短信验证码</view>
							<view class=""><input type="text" value="" @input="getCode" /></view>

							<view class="yzm_moudel" @click="yzm_function">
								{{ countdown }}
								<text v-show="timestatus" class="forgetpwd2">秒重获</text>
							</view>
						</view> -->
					</view>
				</view>

				<view class="bottom_btn " @click="openMoudel">立即申请</view>
				<template v-if="moudelFalg">
					<view class="moudel_content">
						<view class="product_content_block">
							<view class="font_size40 margin_top3u font_color22 text_center font_weight700">申请攻略</view>
							<view class="margin_top3"><u-parse :content="detailData.raidersResult.context" :loading="loading" @preview="preview" @navigate="navigate" /></view>

							<view class="moudel_btn" @click="colseMoudel">我知道了</view>
						</view>
					</view>
				</template>
			</view>
		</template>

		<!-- 解绑微信 -->
		<template v-if="wxFalg">
			<view class="moudel_content">
				<view class="product_content_block_new">
					<view class="font_size34 text_center font_size40 font_weight700">请确认申请人信息</view>
					<view class="font_size30 margin_top3u">姓名：{{ name }}</view>
					<view class="font_size30 margin_top2">手机：{{ phone }}</view>
					<view class="font_size30 border_bottom padding_bottom3u margin_top2">身份证：{{ idCard }}</view>

					<view class="font_size28 font_weight700 margin_top3u">重要提示</view>
					<view class="font_size28">
						后续填写的表单信息需要与此处填写的
						<text class="font_colorf4">信息一致，</text>
						后续填写的表单信息需要与此处填写的信
					</view>

					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closeWx">取消</view>
						<view class="rightbtn" @click="bindPersonal">确认申请</view>
					</view>
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
			moudelFalg: false,
			detailData: '',
			loading: false, //开启loading不显示默认值
			countdown: '获取验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			name: '',
			idCard: '',
			phone: '',
			code: '',
			goodsId: '', //产品
			goodsUrl: '', //第三方链接
			referrerId: '', //分享人ID
			flag: '', //true 产品 false个人
			appid: 'wx46d808b929c79829',
			redirect_url: 'https://www.hcselected.com/frontend',
			wxFalg: false
		};
	},
	onLoad(option) {
		// 新增内容
		if (JSON.stringify(option) != '{}') {
			if (option.flag) {
				uni.setStorageSync('flag', option.flag);
				this.flag = option.flag;
			}
			if (option.referrerId) {
				uni.setStorageSync('referrerId', option.referrerId);
				this.referrerId = option.referrerId;
			}
			if (option.goodsId) {
				uni.setStorageSync('goodsId', option.goodsId); //产品ID
				this.goodsId = uni.getStorageSync('goodsId'); //产品ID
				this.getProduct(); //获取详情
			}
		}

		//结束
		if (uni.getStorageSync('flag') == 2) {
			this.flag = uni.getStorageSync('flag'); //true 产品 false个人
			this.referrerId = uni.getStorageSync('referrerId'); //分享人ID
			if (uni.getStorageSync('goodsId')) {
				this.goodsId = uni.getStorageSync('goodsId'); //产品ID
				this.goodsUrl = uni.getStorageSync('goodsUrl'); //跳转
				this.getProduct(); //获取详情
			}
		} else {
			this.flag = uni.getStorageSync('flag'); //true 产品 false个人
			this.referrerId = uni.getStorageSync('referrerId'); //分享人ID
			if (uni.getStorageSync('goodsId')) {
				uni.setStorageSync('goodsId', option.goodsId);
				uni.setStorageSync('goodsUrl', option.goodsUrl);
			}
		}
		var a = 'https://www.hcselected.com/frontend/#/pages/shareUrl/shareUrl';
		this.redirect_url = a;
		setTimeout(this.getWxCode(), 5000);
	},
	methods: {
		//打开
		openMoudel: function() {
			if (!this.name || !this.phone || !this.code) {
				uni.showToast({
					title: '请检查输入内容',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			}
			if (this.flag == 1) {
				this.bindPersonal();
			} else {
				this.wxFalg = true;
			}
		},
		closeWx: function() {
			this.wxFalg = false;
		},
		getWxCode: function() {
			// 截取地址中的code，如果没有code就去微信授权，如果已经获取到code了就直接把code传给后台获取openId
			let code = this.getUrlCode('code');
			if (code === null || code === '') {
				window.location.href =
					'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +
					this.appid +
					'&redirect_uri=' +
					encodeURIComponent(this.redirect_url) +
					'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect';
			} else {
				this.getOpenidAndUserinfo(code);
			}
		},

		getUrlCode: function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ''])[1].replace(/\+/g, '%20')) || null;
		},

		isWechat: function() {
			return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === 'micromessenger';
		},

		getOpenidAndUserinfo: function(code) {
			console.log(JSON.stringify(code) + this.memberData);
			uni.request({
				url: 'https://www.hcselected.com/service/api/common/wx/oauth2getAccessToken',
				data: {
					code: code
				},
				method: 'GET',
				dataType: 'json',
				success: res => {
					console.log('通过code获取openid和accessToken', +JSON.stringify(res));
					if (res.data.code === 200) {
						// uni.setStorageSync('token', res.data.data.token);
						// uni.setStorageSync('userId', res.data.data.mbId);
						// uni.switchTab({
						// 	url: '../tabBar/one/one'
						// });

						uni.setStorageSync('openId', res.data.data.openid);
					} else {
						console.log(res);
						uni.setStorageSync('nickname', res.data.data.nickname);
						uni.setStorageSync('openId', res.data.data.openId);
						uni.setStorageSync('headImgUrl', res.data.data.headImgUrl);
						// uni.navigateTo({
						// 	url: '../bindPhone/bindPhone'
						// });
					}
				}
			});
		},
		goToPage: function(url) {
			uni.navigateTo({
				url: '../' + url + '/' + url
			});
		},
		// 获取名字
		getName: function(e) {
			this.name = e.detail.value;
		},
		// 生份证
		getIdCard: function(e) {
			this.idCard = e.detail.value;
		},
		// 手机号
		getPhone: function(e) {
			this.phone = e.detail.value;
		},
		// 验证码
		getCode: function(e) {
			this.code = e.detail.value;
		},
		// 获取企业名称
		getCompanyName:function(e){
			this.companyName = e.detail.value;
		},
		// 获取验证码
		yzm_function: function() {
			var that = this;
			if (!/^1[3456789]\d{9}$/.test(this.phone)) {
				uni.showToast({
					title: '请输入正确的11位手机号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			} else if (this.timestatus == true) {
				uni.showToast({
					title: '请勿重复点击',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}
			that.disabled = true; //禁用点击
			var phoneData = {
				phone: that.phone
			};
			that.$http
				.get('/api/common/mb/sendCode', phoneData, false)
				.then(res => {
					if (res.data.code == 200) {
						that.countdown = 60;
						that.timestatus = true;
						that.clear = setInterval(that.countDown, 1000);
						console.log(JSON.stringify(data));
					} else {
						that.disabled = false; //获取失败开启点击
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center'
						});
					}
				})
				.catch(err => {
					that.disabled = false; //获取失败开启点击
				});
		},
		// 倒计时
		countDown: function() {
			var that = this;
			if (!that.countdown) {
				that.disabled = false;
				that.timestatus = false;
				that.countdown = '获取验证码';
				clearInterval(that.clear);
			} else {
				--that.countdown;
			}
		},

		// 获取产品
		getProduct: function() {
			var data = {
				goodsId: uni.getStorageSync('goodsId')
			};
			this.$http.get('/api/common/goodsInfo/detail', data).then(res => {
				// console.log(JSON.stringify(res));
				this.detailData = res.data.data;
				// this.discoveryData = res.data.data;
			});
		},
		// 绑定关系  个人 企业
		bindPersonal: function() {
			if (!this.name || !this.phone || !this.code) {
				uni.showToast({
					title: '请检查输入内容',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			}
			// 企业
			console.log(this.flag);
			if (this.flag == 2) {
				// 1个人 2 企业
				if (this.detailData.types == '1') {
					var data = {
						referrerId: this.referrerId,
						name: this.name,
						phone: this.phone,
						idcard: this.idCard,
						openid: uni.getStorageSync('openId'),
						code: this.code,
						goodsId: this.goodsId || ''
					};
					this.$http.post('/api/common/member/bindPersonal', data, false).then(res => {
						if (res.data.code == 200) {
							this.wxFalg = false;
							uni.removeStorageSync('flag');
							uni.removeStorageSync('referrerId');
							uni.removeStorageSync('goodsId');
							uni.removeStorageSync('goodsUrl');

							window.location.href = this.detailData.thirdPartyUrl;
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center'
							});
						}
					});
				} else {
					var data = {
						referrerId: this.referrerId,
						name: this.name,
						phone: this.phone,
						idcard: this.idCard,
						openid: uni.getStorageSync('openId'),
						code: this.code, 
						companyName:this.companyName,//企业名称
						goodsId: this.goodsId || ''
					};
					this.$http.post('/api/common/member/bindCompany', data, false).then(res => {
						if (res.data.code == 200) {
							this.wxFalg = false;
							console.log(this.detailData.thirdPartyUrl);
							uni.removeStorageSync('flag');
							uni.removeStorageSync('referrerId');
							uni.removeStorageSync('goodsId');
							uni.removeStorageSync('goodsUrl');

							window.location.href = this.detailData.thirdPartyUrl;
						} else {
							uni.showToast({
								title: res.data.message,
								icon: 'none',
								duration: 1500,
								position: 'center'
							});
						}
					});
				}
			} else {
				// 个人
				var data = {
					referrerId: this.referrerId,
					name: this.name,
					phone: this.phone,
					idcard: this.idCard,
					openid: uni.getStorageSync('openId'),
					code: this.code,
					goodsId: this.goodsId || ''
				};
				this.$http.post('/api/common/member/bindPersonal', data, false).then(res => {
					// uni.switchTab({
					// 	url: '../tabBar/one/one'
					// });
					if (res.data.code == 200) {
						this.wxFalg = false;
						uni.removeStorageSync('flag');
						uni.removeStorageSync('referrerId');
						uni.removeStorageSync('goodsId');
						uni.removeStorageSync('goodsUrl');

						window.location.href = 'https://www.hcselected.com/frontend';
					} else {
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 1500,
							position: 'center'
						});
					}
				});
			}
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.top_moudel {
	// height: 323upx;
	background: #f75349;
	padding: 50upx 40upx;
	padding-bottom: 20upx !important;
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
.yzm_moudel {
	width: 184upx;
	height: 68upx;
	line-height: 68upx;
	font-size: 26upx;
	text-align: center;
	border-radius: 10upx;
	color: #2b65eb;
	// background: linear-gradient(to right, #edcb80, #a58747);
}
// 询问弹窗
.product_content_block_new {
	background-color: #ffffff;
	border-radius: 20upx;
	position: absolute;
	top: 20%;
	// height: 362upx;
	width: 600upx;
	margin-left: 50upx;
	padding: 30upx;
}

.leftbtn {
	width: 220upx;
	height: 78upx;
	border: 1px solid #2b65eb;
	border-radius: 80upx;
	text-align: center;
	color: #2b65eb;
	line-height: 78upx;
	margin-left: 45upx;
}

.rightbtn {
	width: 220upx;
	height: 78upx;
	background: #2b65eb;
	border-radius: 80upx;
	color: #ffffff;
	text-align: center;
	line-height: 78upx;
	margin-left: 45upx;
}
.four_moudel {
	width: 690upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e2e5ef;
	margin-top: 30upx;
}
</style>
