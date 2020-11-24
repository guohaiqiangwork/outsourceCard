<template>
	<view>
		<view class="page_widthMoudel " style="padding-top: 80upx;">
			<view class="font_size44">绑定上下级</view>
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
				<view class="font_sise28 font_color2b">{{ countdown }}</view>
			</view>

			<view class="margin_top5u border_bottom"><input type="text" value="" @input="getCode" /></view>

			<view class="font_sise26 font_color99" style="margin-top: 50upx;">推荐人手机号</view>
			<view class="margin_top5u border_bottom"><input type="text" value="" @input="getPhone" /></view>

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
			var data = {
				phone: this.phone,
				code:this.yzm_code,
				referrerPhone:this.phoneOne
			};
			this.$http.post('/api/member/bindSubord', '', true).then(res => {
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
			if(this.userPhone.length != 11){

				uni.showToast({
					title:'请输入手机号',
					icon:'none',
					duration:2000,
					position:'top'
				})
				 return
			}

			uni.navigateTo({
				url: '../codeLogin/codeLogin?phone=' + this.userPhone
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
