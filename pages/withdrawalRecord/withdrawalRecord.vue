<template>
	<view style="padding-top:calc(30upx +  var(--status-bar-height))">
		<view class="page_widthMoudel">
			<view v-for="(item,index) in moneyList" :key="index" class="uni-flex display_space border_bottom padding_bottom3 padding_top3">
				<view class="">
					<view class="font_size30 font_color22">
						京东金条
					</view>
					<view class="font_size22 font_color99">
						京东金条
					</view>
				</view>
				<view class="font_size40 font_color22">
					+60
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				moneyList:[],
				tradeNo:''
			}
		},
		onLoad(option) {
			this.tradeNo = option.payId
			this.getList();
		},
		methods: {
			getList: function() {
				var data = {
					tradeNo: this.tradeNo,
				};
				this.$http.get('/api/withdraw/result', data, true).then(res => {
					console.log(res)
					// this.moneyList = res.data.data;
				});
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #FFFFFF;
}
</style>
