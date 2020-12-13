<template>
	<view style="padding-top:calc(30upx +  var(--status-bar-height))">
		<view class="display_inline width33 text_center">
			<view class="font_size44 font_color2b font_weight700">{{teamNum.firstLevel}}</view>
			<view class="font_size30">团队总数(个)</view>
		</view>
		<view class="display_inline width33 text_center">
			<view class="font_size44 font_color2b font_weight700">{{teamNum.totalTeam}}</view>
			<view class="font_size30">团队总人数(人)</view>
		</view>
		<view class="display_inline width33 text_center">
			<view class="font_size44 font_color2b font_weight700">{{teamNum.month}}</view>
			<view class="font_size30">当月新增(个)</view>
		</view>
		
		<view class="page_widthMoudel">
			<view class="uni-flex margin_top4u">
				<view class="uni-flex searce_moudel" @click="goSearch" style="width: 85%;">
					<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!-- @confirm="search" -->
						<input
							class="font_size28 padding_top3"
							maxlength="10"
							placeholder="请输入您的搜索内容"
							confirm-type="搜索"
							type="text"
							@input="geyValue"
							placeholder-style="color:#999999"
						/>
					</view>
				</view>
				<view  class="width15 margin_top1 text_center font_size30">搜索</view>
			</view>
			
			
			<view class="list" v-for="(item,index) in [1,2,3]" :key="index">
					<view class="uni-flex">
						<view class="width20 ">
							<view class="">
								<image style="width: 100upx;height: 100upx;" src="../../static/image/cs.png" mode=""></image>
							</view>
							<view class="" style="margin-top: -26upx;margin-left: 10%;">
								<image style="height: 28upx;width: 73upx;" src="../../static/image/icon/vip1.png" mode=""></image>
							</view>
						</view>
						<view class="width80">
							<view class="uni-flex display_space ">
								<view class="uni-flex width80">
									<view class="font_size30 font_weight700 ">
										张三
									</view>
									<view class="left_btn ">
										出师
									</view>
								</view>
								<view class="font_sise34 font_weight700  text_center width30">
									2
								</view>
														
							</view>
							<view class="uni-flex display_space ">
								<view class="font_size30 font_color99">
									2020-05-09
								</view>
								
								<view class="font_sise26 font_color99 width30 text_center">
									团队人数
								</view>
														
							</view>
							
						</view>
						
					</view>
					
					<view class="text_right">
						<view class="display_inline margin_top3u btn_list" v-for="(item,index) in [1,2]" :key="index">
							<view class="uni-flex display_center">
								<view class="margin_top1">
									<image class=" " style="width: 30upx;height: 26upx;" src="../../static/image/icon/13.png" mode=""></image>
								</view>
								<view class="margin_left3">
									微信号
								</view>
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
			keyword:'',
			teamNum:''
		};
	},
	onLoad() {
		this.init()
	},
	methods: {
		init:function(){
			var data={
				mbId:uni.getStorageSync('userId'),
			}
			this.$http.get('/api/member/teamNum','data', true).then(res => {
				this.teamNum = res.data.data
			});
			this.getList()
		},
		getList:function(){
			var data={
				mbId:uni.getStorageSync('userId'),
				keyword:this.keyword
			}
			this.$http.get('/api/member/teamList','data', true).then(res => {
				this.homeList = res.data.data;
			});
			
		},
		
		geyValue:function(e){
			this.keyword =e.detail.value
		}
	}
};
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
	.list{
		// width: 690px;
		// height: 230px;
		background: #f7f8fc;
		border-radius: 10upx;
		padding: 30upx;
		margin-top: 30upx;
	}
	.left_btn{
		width: 77upx;
		height: 30upx;
		background: #2b65eb;
		border-radius: 15upx;
		line-height: 30upx;
		text-align: center;
		font-size: 22upx;
		color: #F2F4F9;
		margin-left: 3%;
		margin-top: 10upx;
	}
	.btn_list{
		width: 160upx;
		height: 54upx;
		// background: #1bc77c;
		background-color: #2B65EB;
		border-radius: 27upx;
		text-align: center;
		align-items: center;
		color: #FFFFFF;
		font-size: 24upx;
		line-height: 54upx;
		margin-left: 5%;

	}
</style>
