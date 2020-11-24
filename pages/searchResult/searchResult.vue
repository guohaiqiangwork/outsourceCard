<template>
	<view>
		<!-- tab切换 -->
		<view class="background_colorff padding_top3 padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view class="uni-flex">
				<view class="uni-flex searce_moudel" style="width: 85%;">
					<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!--  -->
						<input
							class="font_size28 padding_top3"
							maxlength="10"
							placeholder="请输入您的搜索内容"
							confirm-type="搜索"
							type="text"
							@confirm="search"
							:value="keywords"
							placeholder-style="color:#999999"
						/>
					</view>
				</view>
				<view @click="goS" class="width15 margin_top1 font_size30 text_center">搜索</view>
			</view>

			<view class="margin_top1">
				<view class="padding_top3 padding_bottom3">
					<view
						@click="tabSwich(index)"
						:class="tabIndex == index ? 'item_tab_three' : 'item_tab_threen'"
						v-for="(item, index) in tabList"
						:key="index"
						:style="index == 2 ? 'border:none' : ''"
					>
						<view>{{ item.name }}</view>
						<view :class="tabIndex == index ? 'bottom_tab' : ''"></view>
					</view>
				</view>
			</view>
		</view>

		<!-- 内容 -->

		<template v-if="tabIndex == 0">
			<view class="page_widthMoudel margin_top3u padding_bottom3">
				<view class="uni-flex">
					<view class="left_falg"></view>
					<view class="font_size32 margin_left3">信用卡产品</view>
				</view>

				<view class="">
					<view class="moudel margin_top3u" v-for="(item, index) in [1, 2]" :key="index">
						<view class="font_sise28 text_center">信帮手</view>
						<view class="font_colorf4 font_size54 font_weight700 text_center">
							20
							<text class="font_size24">元</text>
						</view>
						<view class="font_size22 font_color99 text_center">返</view>
						<view class=""><view class="list_one" v-for="(item, index) in [1, 2]" :key="index">T+1结</view></view>
					</view>
				</view>
				
				
				<view class="uni-flex margin_top3u">
					<view class="left_falg"></view>
					<view class="font_size32 margin_left3">贷款产品</view>
				</view>
				
				<view class="moudel_list margin_top3u">
					<view
						class=" padding_bottom3 padding_top3"
						:class="index == [1, 2, 3, 4].length -1 ? '' : 'border_bottom'"
						v-for="(item, index) in [1, 2, 3, 4]"
						:key="index"
						@click="goToDetail"
					>
						<view class="uni-flex">
							<view class="">网乐贷</view>
							<view class="list_one" style="margin-top: 0;width: 10%;margin-left: 3%;">T+1结</view>
						</view>
						<view class="uni-flex">
							<view class="width25">
								<view class="font_size54 font_weight700 font_colorf4">
									0.33
									<text class="font_size24">%</text>
								</view>
								<view class="font_size22 font_color99">最高反</view>
							</view>
							<view class="width50 margin_top2">
								<view class="font_size38 font_weight700 font_color22">10000-300000</view>
								<view class="font_size22 font_color99">贷款额度(元)</view>
							</view>
							<view class="width25 margin_top8"><view class="right_btn">立即推广</view></view>
						</view>
					</view>
								
				</view>
			
			</view>
		</template>
		
		<template v-else>
			<view class="page_widthMoudel margin_top3u">
				<view class="moudel_list" style="border-radius: 20upx;">
					<view
					:class="index == [1,2,3].length -1 ? '' :'border_bottom'"
					v-for="(item,index) in [1,2,3]" :key="index"
					 class="padding_bottom3 padding_top3 uni-flex ">
						<view class="width35">
							<image style="width: 180upx;height: 182upx;" src="../../static/image/cs.png" mode=""></image>
						</view>
						<view class="width80">
							<view class="text_hidden2">
								平安银行快贷：全国按揭房无平安银行快贷：全国按揭房无
								死角产品，内部操作流程点...
							</view>
							<view class="uni-flex margin_top3u" >
								<view class="uni-flex width50">
									<view class="font_sise24 font_color99 margin_top2">
									10-17	
									</view>
									<view class="list_one_mou">
										口子情报
									</view>
								</view>
								<view class="uni-flex width50 display_right">
									<view class="">
										<image style="width: 32upx;height: 24upx;" src="../../static/image/icon/colseM.png" mode=""></image>
									</view>
									<view class="font_sise24 font_color99 margin_left3">
										2309
									</view>
								</view>
							</view>
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
			tabList: [
				{
					name: '产品'
				},
				{
					name: '内容'
				}
			],
			tabIndex: 0,
			inputValue: '',
			keywords:''//输入框值
		};
	},
	onLoad(option) {
		this.keywords = option.searchName;
		this.goSearchList();//获取数据
	},
	methods: {
		search: function(e) {
			this.inputValue = e.target.value;
		},
		goS:function(){
			this.tabIndex == 0 ? this.goSearchList() : this.goSearchListT()
		},
		// 产品搜索
		goSearchList: function() {
			var data = {
				keywork:this.keywords
			}
			this.$http.get('/api/goodsInfo/search', data, true).then(res => {
				console.log(JSON.stringify(res))
			});
		},
		// 内容搜索
		goSearchListT: function() {
			var data = {
				keywork:this.keywords
			}
			this.$http.get('/api/raiders/search', data, true).then(res => {
				console.log(JSON.stringify(res))
			});
		},
		tabSwich: function(e) {
			this.tabIndex = e;
			this.tabIndex == 0 ? this.goSearchList() : this.goSearchListT()
		},
		goToDetail:function(){
			uni.navigateTo({
				url:'../productDetails/productDetails'
			})
		}
	}
};
</script>

<style lang="less">
.item_tab_three {
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #0c0c0c;
	font-size: 30upx;
	height: 40upx;
	line-height: 40upx;

	color: #000000;

	font-weight: 700 !important;
}

.item_tab_threen {
	display: inline-block;
	width: 50%;
	text-align: center;
	font-size: 30upx;
	height: 40upx;
	line-height: 40upx;
	color: #666666;
}

.bottom_tab {
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-left: 42%;
	margin-top: 2%;
}

.left_falg {
	width: 8upx;
	height: 30upx;
	background: #2b65eb;
	border-radius: 4upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
	margin-top: 2%;
}

.moudel {
	width: 40%;
	background: #ffffff;
	border-radius: 10upx;
	padding: 30upx 0upx;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
}
.list_one {
	width: 30%;
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 8%;
	margin-top: 10upx;
}
.right_btn {
	width: 150upx;
	height: 54upx;
	background: #2b65eb;
	border-radius: 27upx;
	text-align: center;
	color: #ffffff;
	font-size: 26upx;
	line-height: 54upx;
}
.list_one_mou {

	// width: 30%;
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #CEA984;
	font-size: 18upx;
	display: inline-block;
	margin-left: 5%;
	margin-top: 3%;
}
</style>
