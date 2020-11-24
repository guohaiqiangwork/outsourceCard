<template>
	<view class="">
		<view class="background_colorff" style="padding-top:calc(70upx +  var(--status-bar-height));padding-bottom: 60upx;">
			<view class="page_widthMoudel">
				<view class="uni-flex display_space">
					<view class="width50" @click="openName">
						<view class="font_size34">
							{{infoData.nickName}}
							<image src="../../static/image/icon/14.png" class="margin_left3" style="width: 22upx;height: 22upx;" mode=""></image>
						</view>
						<view class="font_size32">ID:{{infoData.idCard}}</view>
					</view>
					<view class="width50 text_right"><image style="width: 120upx;height: 120upx;border-radius: 50%;" :src="infoData.headImgurl" mode=""></image></view>
				</view>
			</view>
		</view>

		<view class="background_colorff margin_top3u">

			<view class="page_widthMoudel uni-flex padding_bottom3 padding_top3 border_bottom display_space">
				<view class="font_size32 width30">手机号</view>
				<view class="font_size30 font_color99 width70 text_right" @click="setPhone">
					184****0024
					<image class="margin_left3" style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image>
				</view>
			</view>

			<view class="page_widthMoudel uni-flex padding_bottom3 padding_top3 border_bottom display_space">
				<view class="font_size32 width30">微信号</view>
				<view class="font_size30 font_color99 width70 text_right">
					YVN647478
					<image class="margin_left3" style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image>
				</view>
			</view>
<!-- 
			<view class="page_widthMoudel uni-flex padding_bottom3 padding_top3 border_bottom display_space">
				<view class="font_size32 width30">解绑微信</view>
				<view class="font_size30 font_color99 width70 text_right" @click="openWx">
					会捕鱼的猫
					<image class="margin_left3" style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image>
				</view>
			</view> -->

			<view class="page_widthMoudel uni-flex padding_bottom3 padding_top3  display_space">
				<view class="font_size32 width30">实名认证</view>
				<view class="font_size30 font_color99 width70 text_right" @click="goRealName">
					未实名认证
					<image class="margin_left3" style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image>
				</view>
			</view>
		</view>

		<view class="background_colorff margin_top3u">
			<view class="page_widthMoudel">
				<view class="uni-flex display_space padding_bottom3 padding_top3" @click="goAboutUs">
					<view class="font_size32  ">关于我们</view>
					<view class=""><image style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image></view>
				</view>
			</view>
		</view>

		<view class="background_colorff margin_top3u text_center font_sise32 padding_bottom3 padding_top3">安全退出</view>

		<!-- 修改名字 -->
		<template v-if="nameFalg">
			<view class="moudel_content">
				<view class="name_moudel">
					<view class="uni-flex">
						<view class="font_size40 font_weight700 width60 text_right">昵称</view>
						<view class="width35 text_right margin_top1" @click="colseName"><image style="width: 30upx;height: 30upx;" src="../../static/image/icon/close.png" mode=""></image></view>
					</view>
					<view class="margin_top5 padding_bottom3 border_bottom"><input placeholder="请输入新的昵称" type="text" value="" @input="getName"/></view>
					<view class="btn_name" @click="saveName">我知道了</view>
				</view>
			</view>
		</template>
		<!-- 解绑微信 -->
		<template v-if="wxFalg">
			<view class="moudel_content">
				<view class="product_content_block">
					<view class="font_size34 text_center" style="margin-top: 100upx;">
						确定解绑微信号吗？
					</view>
					<view class="uni-flex " style="margin-top: 80upx;">
						<view class="leftbtn" @click="closeWx">
							取消
						</view>
						<view class="rightbtn" @click="okWx">
							确认
						</view>
					</view>
				</view>
							
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			nameFalg: false,//名字
			wxFalg:false,
			infoData:''
		};
	},
	onLoad() {
		this.init()
	},
	methods: {
		init:function(){
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			this.$http.get('/api/member/info', data, true).then(res => {
				this.infoData = res.data.data
			});
		},
		// 名字
		openName: function() {
			this.nameFalg = true;
		},
		colseName:function(){
			this.nameFalg = false;
		},
		getName:function(e){
			this.nickName = e.detail.value
		},
		// 修改昵称
		saveName:function(){
			var data = {
				mbId: uni.getStorageSync('userId'),
				nickName:this.nickName ,
			};
			this.$http.get('/api/member/updateNickName', data, true).then(res => {
				this.wxFalg = false
			});
		},
		
		//修改手机号
		setPhone:function(){
			console.log('99')
			uni.navigateTo({
				url:'../setPhone/setPhone'
			})
		},
		// 解绑微信
		openWx:function(){
			this.wxFalg = true
		},
		closeWx:function(){
			this.wxFalg = false
		},
		// 去实名认证
		goRealName:function(){
			uni.navigateTo({
				url:'../realName/realName'
			})
		},
		// 去关于我们
		goAboutUs:function(){
			uni.navigateTo({
				url:'../aboutUs/aboutUs'
			})
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
.name_moudel {
	background-color: #ffffff;
	width: 76%;
	margin-left: 8%;
	position: absolute;
	top: 20%;
	padding: 30upx;
}
.btn_name {
	margin-top: 80upx;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	width: 92%;
	margin-left: 4%;
}

// 询问弹窗
	.product_content_block {
		background-color: #FFFFFF;
		border-radius: 20upx;
		position: absolute;
		top: 20%;
		height: 362upx;
		width: 600upx;
		margin-left: 75upx;
	}
	
	.leftbtn {
		width: 220upx;
		height: 78upx;
		border: 1px solid #2B65EB;
		border-radius: 80upx;
		text-align: center;
		color: #2B65EB;
		line-height: 78upx;
		margin-left: 45upx;
	}
	
	.rightbtn {
		width: 220upx;
		height: 78upx;
		background: #2B65EB;
		border-radius: 80upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 78upx;
		margin-left: 45upx;
	}
</style>
