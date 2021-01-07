<template>
	<view>
		<view class=" top_moudel">
			<view class="" style="font-size: 44upx;margin-top: 50upx;">
				关于
			</view>
			<view class="uni-flex margin_top3u">
				<view class="">
					<image style="width: 88upx;height: 88upx;border-radius: 10upx;" src="../../static/image/my/log.png" mode=""></image>
				</view>
				<view class="font_color99 font_size26 margin_left3 margin_top3">版本号 v1.0.0</view>
			</view>
		</view>
		<view class="center_moudel">
			<view class="uni-flex list_one display_space" @click="goUserConter('userAgreement')">
				<view class="font_color33 font_size30 font_weight500">用户协议</view>
				<view class=""><image src="../../static/image/icon/right99.png" style="width: 14upx;height: 24upx;" mode=""></image></view>
			</view>
			<view class="uni-flex list_one display_space" style="border: none;" @click="goUserConter('userPrivacy')">
				<view class="font_color33 font_size30 font_weight500">隐私政策</view>
				<view class=""><image src="../../static/image/icon/right99.png" style="width: 14upx;height: 24upx;" mode=""></image></view>
			</view>
		</view>
		<view class="font_size22 font_color99 text_center" style="position: fixed; bottom :3%;width:100%">@慧伙 版权所有</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			VCode: '1.0.0'
		};
	},
	onLoad() {
		// this.getV(); //获取版本号
	},
	methods: {
		goUserConter(page) {
			uni.navigateTo({
				url: '../' + page + '/' + page
			});
		},
		// 获取版本号  {version}
		getV() {
			this.$http
				.get('/api/common/android/number')
				.then(res => {
					if (res.data.code == 200) {
						this.VCode = res.data.data;
					} else {
						//有误
						uni.showToast({
							title: res.data.message,
							icon: 'none',
							duration: 2000,
							position: 'center'
						});
					}
				})
				.catch(err => {});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f4f4f4;
}

.top_moudel {
	// text-align: center;
	background-color: #ffffff;
	padding-top: 5%;
	padding-bottom: 7%;
	padding-left: 4%;
}

.center_moudel {
	width: 100%;
	background-color: #ffffff;
}

.list_one {
	width: 92%;
	margin-left: 4%;
	border-bottom: 1px solid #eeeeee;
	padding-top: 3%;
	padding-bottom: 3%;
}
</style>
