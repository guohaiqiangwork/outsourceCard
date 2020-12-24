<template>
	<view>
		<view class="background_color2b font_colorff padding_top3 padding_left3 padding_right3 padding_bottom3">
			<view class="font_sise30">可提现（元）</view>
			<view class="uni-flex display_space">
				<view style="font-size: 60upx ;" class="font_weight700">{{totalRevenue.balance}}</view>
				<view class="" @click="goToPage()"><view class="btnleft">提现</view></view>
			</view>
		</view>
		<view class="page_widthMoudel">
			<view class="moudel_tab" style="height: 60vh;">
				<view class="uni-flex padding_bottom3" >
					<view @click="tab('0')" :class="tabIndex == 0 ? 'tabOneA' : 'tabOne'">
						<view class="">收入记录</view>
						<view class="botom_tab" v-if="tabIndex == 0"></view>
					</view>
					<view @click="tab('2')"  :class="tabIndex == 2? 'tabOneA' : 'tabOne'">
						<view class="">提现记录</view>
						<view class="botom_tab" v-if="tabIndex == 2"></view>
					</view>
				</view>
			
				<view class="margin_top3u page_widthMoudel" v-if="tabIndex == 0">
					<view v-for="(item, index) in moneyList" :key="index" class="uni-flex display_space border_bottom padding_bottom3 padding_top3  ">
						<view class="">
							<view class="font_size30 font_color22">{{item.goodsName}}</view>
							<view class="font_size22 font_color99">{{item.createTime.substring(0,16)}}</view>
						</view>
						<view class="font_size40 font_color22">+{{item.amount}} <text class="font_size28 ">元</text> </view>
					</view>
				</view>
				<view class="margin_top3u page_widthMoudel" v-else>
					<view v-for="(item, index) in moneyList" :key="index" class="uni-flex display_space border_bottom padding_bottom3 padding_top3 ">
						<view class="">
							<view class="font_size30 font_color22">{{item.remark}}</view>
							<view class="font_size22 font_color99">{{item.createTime.substring(0,16)}}</view>
						</view>
						<view class="">
							<view class="font_size40 font_color22">-{{item.actualAmount}} <text class="font_size28">元</text></view>
							<view class="font_size26 font_color99 text_center">{{item.state == 0 ? '受理中' : item.state == 1? '提现成功' : item.state == 2 ? '提现失败' : ''}}</view>
						</view>
						
						
					</view>
				</view>
				
				<view class="text_center" v-if="moneyList.length == 0">
					<view class="">
						<image style="width: 380upx;height: 380upx;" src="../../static/image/noData/1.png" mode=""></image>
					</view>
					<view class="margin_top3 font_sise30">
						暂无记录
					</view>
				</view>
			
			</view>
			
			
		
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			moneyList: [],
			tabIndex:0,
			totalRevenue:{
				balance:''
			}//提现数据
		};
	},
	onLoad() {
		this.getList();
		this.init()
	},
	methods: {
		init:function(){
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			// 获取可提现金额
			this.$http.get('/api/member/totalRevenue', data, true).then(res => {
				this.totalRevenue = res.data.data;
			});
		},
		tab:function(item){
			this.tabIndex = Number(item) ;
			this.getList();
		},
		// 收益记录
		getList: function() {
			var data = {
				mbId: uni.getStorageSync('userId'),
				type: this.tabIndex + 1
			};
			this.$http.get('/api/member/accountFlow',data, true).then(res => {
				this.moneyList = res.data.data;
			});
		},
		
		// 去提现
		goToPage:function(){
			// if(this.totalRevenue.balance == 0){
			// 	uni.showToast({
			// 		title: '暂无提现金额',
			// 		icon: 'none',
			// 		duration: 1500,
			// 		position: 'center',
			// 	});
			// 	return
			// }
			uni.navigateTo({
				url:'../withdrawal/withdrawal'
			})
		}
		
		
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.btnleft {
	width: 134upx;
	height: 58upx;
	background: #ffffff;
	border-radius: 29upx;
	text-align: center;
	line-height: 58upx;
	color: #2b65eb;
	font-size: 26upx;
}
.moudel_tab {
	width: 690upx;
	// height: 1170px;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 14upx 0upx #e7eaf2;
	margin-top: 30upx;
	padding-top: 40upx;
}
.botom_tab {
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-left: 40%;
}
.tabOne {
	width: 50%;
	display: inline-block;
	text-align: center;
	font-size: 30upx;
	color: #999999;
}
.tabOneA {
	width: 50%;
	display: inline-block;
	text-align: center;
	font-size: 30upx;
	color: #2b65eb;
}
</style>
