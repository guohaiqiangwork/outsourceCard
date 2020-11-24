<template>
	<view>
		<view style="padding-top:calc(70upx +  var(--status-bar-height));" class="">
			<view class="page_widthMoudel">
				<view class="font_size44">完善身份信息</view>
				<view class="font_size26 font_color99 margin_top8">姓名</view>
				<view class="border_bottom margin_top3u"><input type="text" value="" @input="keyName" /></view>
				<view class="font_size26 font_color99 margin_top8">身份证号</view>
				<view class="border_bottom margin_top3u"><input type="text" value="" @input="keyCard"/></view>

				<view class="btn_phone" @click="okGo">确定</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			Name:'',
			Card:''
		};
	},
	methods: {
		keyName:function(e){
			console.log(e)
			this.Name =e.detail.value
		},
		keyCard:function(e){
			this.Card =e.detail.value
		},
		okGo:function(){
			var data = {
				mbId: uni.getStorageSync('userId'),
				name:this.Name ,
				idcard:this.Card
			};
			this.$http.get('/api/member/verified', data, true).then(res => {
				console.log(JSON.stringify(res))
			});
					
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.btn_phone {
	// width: 600px;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	line-height: 88upx;
	text-align: center;
	color: #ffffff;
	position: absolute;
	bottom: 10%;
	width: 92%;
	font-size: 32upx;
}
</style>
