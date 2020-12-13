<template>
	<view class="">
		<view class="padding_top3 padding_bottom3 border_bottom page_widthMoudel ">
			<view
				@click="tabSwich(item)"
				:class="tabIndexT == item.id ? 'item_tab_three' : 'item_tab_threen'"
				v-for="(item, index) in clazzOneData"
				:key="index"
			
			>
				<view>{{ item.name }}</view>
				<view :class="tabIndexT == item.id ? 'bottom_tab' : ''"></view>
			</view>
		</view>
		<!--  -->
		<template >
			<view class="page_widthMoudel">
				<view class="moudel_1" v-if="queryPageData.length > 0">
					<view class="border_bottom padding_bottom3 margin_top3" v-for="(item,index) in queryPageData" :key="index">
						<view class="uni-flex ">
							<view class="uni-flex width70">
								<view class="text_center width10" >
									<image style="width: 26upx;height: 26upx;" :src="item.logoUrl" mode=""></image>
								</view>
								<view class="font_size26 font_color22">
									{{item.name}}  
								</view>
								<view class="margin_left3">
									<view class="list_moudel">
										{{item.cycle}}
									</view>
								</view>
							</view>
							
							<view class="font_size22">
								 {{item.term}}
							</view>
						</view>
						<view class="font_size22 " v-if="item.rebateFactor">
							直推奖 <text class="margin_left3 font_colorf7">{{item.rebateFactor}}%</text>
						</view>
						<view class="uni-flex margin_top3">
							<view 
							:class="index == 0 ? '' :'margin_left3' "
							class="display_inline " v-for="(items,index) in item.itemResults" :key="index">
								<view class="uni-flex" v-if="items.levelName == '白银'">
									<view class="">
										<image style="width: 73upx;height: 27upx;" src="../../static/image/icon/vip1.png" mode=""></image>
									</view>
									<view class="font_size22 margin_left3" style="color: #F75349;">
										{{items.scale}}%
									</view>
								</view>
								<view class="uni-flex" v-if="items.levelName == '超凡'">
									<view class="">
										<image style="width: 73upx;height: 27upx;" src="../../static/image/icon/vip2.png" mode=""></image>
									</view>
									<view class="font_size22 margin_left3" style="color: #F75349;">
										{{items.scale}}%
									</view>
								</view>
							</view>
						
						</view>
										
					</view>
					
				</view>
				
				<view class="text_center" v-if="queryPageData.length == 0">
					<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/2.png" mode=""></image></view>
					<view class="margin_top3 font_sise30">暂无数据</view>
				</view>
			</view>
		
		</template>

	
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabList: [
				{
					name: '贷款'
				},
				{
					name: '信用卡'
				},
				{
					name: '更多'
				}
			],
			tabIndexT: '',
			clazzOneData:[],
			queryPageData:[]
		};
	},
	onLoad(option) {
		console.log(option);
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.init()
	},
	methods: {
		init:function(){
			// 查询分类；
			this.$http.get('/api/category/clazzOne','', true).then(res => {
				this.clazzOneData = res.data.data;
				this.tabIndexT = res.data.data[0].id;
				this.getList()
			});
			
		},
		getList:function(){
			var data = {
				categoryId: this.tabIndexT
			};
			// 代理攻略
			this.$http.get('/api/rebateRule/queryPage',data, true).then(res => {
				this.queryPageData = res.data.data;
			});
		},
		tabSwich: function(item) {
			this.tabIndexT = item.id;
			this.getList()
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.item_tab_three {
	display: inline-block;
	width: 33%;
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
	width: 33%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 30upx;
}

.bottom_tab {
	margin-left: 35%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}
.moudel_1{
	// width: 670px;
	// height: 1263px;
	padding: 30upx;
	background: #f7f8fc;
	border-radius: 10upx;
	margin-top: 30upx;
}
.list_moudel{
	width: 88upx;
	height: 28upx;
	background: #2b65eb;
	border-radius: 6upx;
	text-align: center;
	color: #FFFFFF;
	font-size: 18upx;
	line-height: 28upx;
	margin-left: 3%;
	margin-top: 3%;
	padding: 4upx;
}
</style>
