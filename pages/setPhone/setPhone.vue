<template>
	<view>
		<view  class="page_widthMoudel" style="padding-top:calc(30upx +  var(--status-bar-height));">
			<template v-if="setFalg">
				<view class="font_sise36 margin_top5">
					已绑定手机号
				</view>
				<view class="uni-flex display_space margin_top3">
					<view class="font_size60">
						184****0024
					</view>
					<view class="font_sise28 font_color2b margin_top5" @click="yzm_function">
						{{countdown}}
					</view>
				</view>
				
				<view class="margin_top8 ">
						<validcode :maxlength="4" :isPwd="false" @finish="getPwd" ref="yzm"></validcode>
				</view>
				<view class="font_sise24 font_color99 margin_top4u">
					该手机号将用于接受汇创精选业务的短信通知
				</view>
				<view class="btn_phone" @click="setP">
					更换手机号
				</view>
					
			</template>
				
				
			<template v-else>
				<view class="font_size44 margin_top5">
					请输入新的手机号
				</view>
				<view style="padding-bottom: 8%;" class=" border_bottom margin_top8">
					<input type="text" value=""  placeholder="手机号"/>
				</view>
				
				<view class="btn_phone" style="position: initial;margin-top: 140upx;" @click="savePhone">
					确认
				</view>
			</template>
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
				setFalg:true
			}
		},
		methods: {
			getPwd:function(val){
				console.log(val)
			},
			// 手机号
			keyPhone: function(event) {
				this.userPhone = event.target.value;
			},
			// 验证码
			keyCode: function(e) {
				this.phoneCode = e.target.value;
			},
			
			// 跟换手机
			setP:function(){
				this.setFalg = false
			},
			savePhone:function(){
				var data = {
					mbId: uni.getStorageSync('userId'),
					mobile:'',
					code:''
				};
				this.$http.get('/api/member/updateMobile', data, true).then(res => {
					
				});
			},
			// 获取验证码
			yzm_function: function() {
				var that = this;
				if (!/^1[3456789]\d{9}$/.test(this.userPhone)) {
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
					phone: that.userPhone
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
page{
	background-color: #FFFFFF;
}
.btn_phone{
	// width: 600px;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	line-height: 88upx;
	text-align: center;
	color: #FFFFFF;
	position: absolute;
	bottom: 10%;
	width: 92%;
	font-size: 32upx;
}
</style>
