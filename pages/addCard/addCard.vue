<template>
	<view>
		<view class="background_colorff">
			<view class="page_widthMoudel">
				<view class="uni-flex padding_bottom3 padding_top3 border_bottom">
					<view class="font_size30 width20 ">持卡人</view>
					<view class=""><input type="text" value="" placeholder="请输入姓名" @input="getName" /></view>
				</view>
				<view class="uni-flex padding_bottom3 padding_top3 border_bottom">
					<view class="font_size30 width20 ">手机号</view>
					<view class=""><input type="text" value="" placeholder="请输入银行预留手机号" @input="getPhone" /></view>
				</view>
				<view class="uni-flex padding_bottom3 padding_top3 border_bottom">
					<view class="font_size30 width20 ">卡号</view>
					<view class=""><input type="text" value="" placeholder="请输入卡号" @input="getCard" /></view>
				</view>
				<view class="uni-flex padding_bottom3 padding_top3 border_bottom">
					<view class="font_size30 width20 ">银行</view>
					<view class="font_size30">{{bankName}}</view>
				</view>
				<view class="uni-flex padding_bottom3 padding_top3 border_bottom">
					<view class="font_size30 width20 ">卡类型</view>
					<view class="font_size30">{{bankType}}</view>
				</view>
			</view>
		</view>

		<view class="bottm_btn" @click="addCard">立即绑定</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			reservedMobile: '',
			bankCard: '',
			bankName: '',
			bankType: ''
		};
	},
	methods: {
		getName: function(e) {
			this.name = e.detail.value;
		},
		getPhone: function(e) {
			this.reservedMobile = e.detail.value;
		},
		getCard: function(e) {
			this.bankCard = e.detail.value;
			
			var bankType = this.$bankType(this.bankCard)
			console.log(bankType)
			this.bankName = bankType.bankName;
			this.bankType = bankType.cardTypeName
			this.bankCode =bankType.bankCode
		},
		addCard: function() {
			var data = {
				mbId: uni.getStorageSync('userId'),
				bankName: this.bankName,
				bankCard: this.bankCard,
				reservedMobile: this.reservedMobile,
				name: this.name,
				bankType: this.bankType,
				bankCode:this.bankCode
			};
			this.$http.post('/api/bank/save', data, true).then(res => {
				if(res.data.code == '200'){
					uni.showToast({
						title: '添加成功',
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
					setTimeout(uni.navigateBack(),1500)
					
				}
			});
		}
	}
};
</script>

<style lang="less">
.bottm_btn {
	position: absolute;
	bottom: 5%;
	width: 92%;
	margin-left: 4%;
	height: 90upx;
	background: #2154df;
	border-radius: 50px;
	font-size: 30upx;
	color: #ffffff;
	text-align: center;
	line-height: 90upx;
}
</style>
