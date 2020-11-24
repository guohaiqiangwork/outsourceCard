<template>
	<view>
		<view class="font_size46  margin_left4 margin_top3" style="color: #E14938;">贷款精选</view>
		<view class="title_border"></view>

		<view class="uni-flex  padding_bottom3 border_bottom page_widthMoudel padding_top3">
			<view class="width30 ">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{ array[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			
			</view>
			<view class="width30 margin_left3">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{ array[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
			<view class="width30 margin_left3">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{ array[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
		
		</view>

		<!-- 内容 -->
		<view class=" ">
			<view style="padding:30upx " >
				<!-- :style="index == [1, 2, 3, 4].length - 1 ? 'border:none' : ''" -->
				<view
					class="border_bottom padding_bottom3 padding_top3"
					@click="goToDetail"
					v-for="(item, index) in loanSelectionList"
					:key="index"
				>
					<view class="uni-flex">
						<view class="">{{item.goodsName}}</view>
						<view class="list_one" style="margin-top: 0;">{{item.cycle}}</view>
					</view>
					<view class="uni-flex">
						<view class="width25">
							<view class="font_size54 font_weight700 font_colorf4">
								{{item.highestReturn}}
								<text class="font_size24">%</text>
							</view>
							<view class="font_size22 font_color99">最高反</view>
						</view>
						<view class="width50 margin_top2">
							<view class="font_size38 font_weight700 font_color22">{{item.minAmount}}-{{item.maxAmount}}</view>
							<view class="font_size22 font_color99">贷款额度(元)</view>
						</view>
						<view class="width25 margin_top8"><view class="right_btn">立即推广</view></view>
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
			array: [
				{
					name: '全部类型',
					id: ''
				},

				{
					name: '达标奖励',
					id: '3'
				},
				{
					name: '津贴',
					id: '4'
				}
			],
			index: 0,
			typeId:'',//分类id
			loanSelectionList:''//列表
		};
	},
	onLoad(option) {
		console.log(option.typeId)
		this.typeId = option.typeId;
		this.getLoanList()
	},
	methods: {
		// 获取列表
		getLoanList:function(){
			var data ={
				cid1:'',
				cid2:'',
				area:'',
				cid1:'1475'
			}
			this.$http.get('/api/goodsInfo/loanSelection', data, true).then(res => {
				this.loanSelectionList =res.data.data
			});
		},
		// 分类
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
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
.selsect_img {
	width: 15upx;
	height: 14upx;
	position: absolute;
	margin-left: 21%;
	margin-top: -6.5%;
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
.uni-input {
	background-color: #f0f0fa;
	height: 60upx;
	border-radius: 40upx;
	padding-top: 0;
	line-height: 70upx;
}
.list_one {
	width: 10%;
	line-height: 28upx;
	padding: 10upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
	margin-top: 10upx;
}
</style>
