<template>
	<view>
		<view class="padding_top3 padding_bottom3  page_widthMoudel ">
			<view
				@click="tabSwich(index)"
				:class="tabIndexT == index ? 'item_tab_three' : 'item_tab_threen'"
				v-for="(item, index) in tabList1"
				:key="index"
				:style="index == 2 ? 'border:none' : ''"
			>
				<view>{{ item.name }}</view>
				<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
			</view>
		</view>

		<view class="page_widthMoudel padding_bottom3">
			<view class="margin_top3u" @click="tabSwichOne(index)" v-for="(item, index) in tabList" :key="index" :class="tabIndex == index ? 'item_tab' : 'item_tabn'">
				{{ item.name }}
			</view>

			<view class="uni-flex margin_top3u">
				<view class="uni-flex searce_moudel" @inpnt="search" style="width: 85%;">
					<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!-- @confirm="search" -->
						<input class="font_size28 padding_top3" maxlength="10" placeholder="请输入您的搜索内容" confirm-type="搜索" type="text" placeholder-style="color:#999999" />
					</view>
				</view>
				<view @click="goPage('newsMsg')" class="width15 margin_top2 text_center">搜索</view>
			</view>

			<view class="font_size20 font_colorf7 margin_top2">该订单列表为用户识别二维码产品记录，不能视为官方收益数据作为结算记录</view>

			<view class="moudel_list margin_top3u" v-for="(item, index) in [1, 2, 3]" :key="index">
				<view class="uni-flex display_space border_bottom padding_bottom3 padding_top3">
					<view class="uni-flex width50">
						<view class="left_fa"></view>
						<view class="font_size30 font_color22 margin_left3 margin_top2">平安银行快贷</view>
					</view>
					<view class="font_sise22 font_color99">2020-09-29 10:00</view>
				</view>

				<view class="uni-flex margin_top3u">
					<view class="width65">
						<view class="font_sise22 font_color22">姓名：王二狗</view>
						<view class="font_sise22 font_color22">手机号：18401320024</view>
						<view class="font_sise22 font_color22">订单编号：16847667700044</view>
					</view>
					<view class="width35 ">
						<view @click="getPhone" class="right_btn uni-flex display_center" style="margin-top: 35%;">
							<view class="margin_top1"><image style="width: 30upx;height: 26upx;" src="../../static/image/icon/phone.png" mode=""></image></view>
							<view class="font_sise24 font_colorff">电话聊</view>
						</view>
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
			tabList1: [
				{
					name: '贷款'
				},
				{
					name: '信用卡'
				}
			],
			tabIndexT: 0,
			tabList:[
				{
					name:'更新中'
				},{
					name:'已结算'
				},{
					name:'未通过'
				}
			],
			tabIndex:0
		}
	},
	methods: {
		tabSwich:function(index){
			var _this = this
			this.tabIndexT = index
		
			var a = [
				{
					name:'更新中'
				},{
					name:'已结算'
				},{
					name:'未通过'
				}
			] ;
			var b =[
				{
					name:'全部'
				},{
					name:'进行中'
				},{
					name:'已结算'
				},{
					name:'已失效'
				},{
					name:'待申诉'
				}
			] 
			this.tabIndexT == 0  ? _this.tabList= a : _this.tabList=b;
			
		},
		tabSwichOne:function(index){
			var _this = this
			this.tabIndex = index;
			
			
		},
		search:function(){

		},
		getPhone:function(){
			uni.makePhoneCall({
				// 手机号
				phoneNumber: phone,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		}
	}
}
</script>

<style lang="less">
.item_tab_three {
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #0c0c0c;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #333333;
	font-weight: 700 !important;
	padding-bottom: 30upx;
}

.item_tab_threen {
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 30upx;
}
.bottom_tab {
	margin-left: 42%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}

.item_tab {
	display: inline-block;
	width: 20%;
	text-align: center;
	color: #2b65eb;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	padding-bottom: 30upx;
}

.item_tabn {
	display: inline-block;
	width: 20%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 30upx;
}
.left_fa {
	width: 6upx;
	height: 35upx;
	background: #f75349;
	border-radius: 3upx;
	margin-top: 3%;
}
.right_btn {
	width: 160upx;
	height: 54upx;
	background: #2b65eb;
	border-radius: 27upx;
	margin-left: 20%;
}
</style>
