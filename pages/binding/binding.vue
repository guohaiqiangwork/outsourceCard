<template>
	<view>
		<view class="page_widthMoudel " style="padding-top: 80upx;">
			<view class="font_size44">绑定下级</view>
			<view class="font_sise26 font_color99" style="margin-top: 100upx;">手机号</view>
			<view class="margin_top5u border_bottom"><input type="text" value="" @input="getPhone" /></view>
			<!-- <view class="font_sise26 font_color99" style="margin-top: 50upx;">
				微信号
			</view>
			<view class="margin_top5u border_bottom">
				<input type="text" value="" @input="getPhone"/>
			</view> -->
			<view class="uni-flex display_space" style="margin-top: 50upx;">
				<view class="font_sise26 font_color99 ">验证码</view>
				<view class="font_sise28 font_color2b" @click="yzm_function">{{ countdown }}</view>
			</view>

			<view class="margin_top5u border_bottom"><input type="text" value="" @input="getCode" /></view>

			<view class="font_sise26 font_color99" style="margin-top: 50upx;">推荐人手机号</view>
			<view class="margin_top5u border_bottom"><input type="text" value="" @input="getPhoneOne" /></view>

			<view class="btn_b" @click="getBindSubord">立即绑定</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			countdown: '获取验证码',
			disabled: false,
			timestatus: false,
			yzm_stuas: 0,
			yzm_code: '',
			timed: 59,
			phoneOne:'',
			phone:''

		}
	},
	methods: {
		getCode:function(e){
			console.log(e)
			this.yzm_code = e.detail.value
		},
		getPhone:function(e){
			console.log(e)
			this.phone = e.detail.value
		},
		getPhoneOne:function(e){
			console.log(e)
			this.phoneOne = e.detail.value
		},
		getBindSubord: function() {
			if (this.yzm_code.length != 4) {
				uni.showToast({
					title: '请输入正确的验证码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return false;
			}else if(!/^1[3456789]\d{9}$/.test(this.phoneOne)){
				uni.showToast({
					title: '请输入正确推荐人号码',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
			}
			var data = {
				phone: this.phone,
				code:this.yzm_code,
				referrerPhone:this.phoneOne
			};
			this.$http.post('/api/member/bindSubord', data, true).then(res => {
				// console.log(JSON.stringify(res))
				if(res.data.code ==200){
					uni.showToast({
						title:'绑定成功',
						icon:'none',
						duration:2000,
						position:'top'
					})

					setTimeout(
					uni.navigateBack()
					,2200)
				}
			});
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
		countDown:function() {
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
		
	}
}
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.btn_b {
	width: 600upx;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	font-size: 32upx;
	color: #ffffff;
	position: absolute;
	bottom: 5%;
	margin-left: 5%;
}
</style>
