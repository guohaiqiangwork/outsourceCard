<template>
	<view>
		<view class="font_size46 font_colore1 margin_left4 margin_top3">信用卡精选</view>
		<view class="title_border" style="background-color: #E14938;"></view>
		
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
		<!-- 	<view class="width30 margin_left3">
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{ array[index].name }}</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view> -->
		
		</view>
		
		<view class="page_widthMoudel margin_top3u">
			<view class="">
				<view
					class="border_bottom padding_bottom3 padding_top3"
					:style="index == cardList.length - 1 ? 'border:none' : ''"
					v-for="(item, index) in cardList"
					:key="index"
				>
					<view class="uni-flex">
						<view class="width50">
							<view class="font_size54 font_weight700 font_colorf4">
								{{item.highestReturn}}
								<text class="font_size24">元</text>
							</view>
							<view class="font_size22 font_color99">最高反</view>
						</view>
						<view class="width50 margin_top3">
							<view class="font_size28 font_weight700 font_color22">{{item.goodsName}}</view>
							<view class="font_size22 font_color99">
								<view class="list_one" >
									{{item.cycle}}
								</view>
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
				cardList:[]//信用卡
			}
		},
		onLoad(option) {
			
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
					this.cardList =res.data.data
				});
			},
			// 分类
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为：' + e.detail.value);
			}
		}
	}
</script>

<style lang="less">
.list_one {
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

.selsect_img {
	width: 15upx;
	height: 14upx;
	position: absolute;
	margin-left: 21%;
	margin-top: -6.5%;
}

.uni-input {
	background-color: #f0f0fa;
	height: 60upx;
	border-radius: 40upx;
	padding-top: 0;
	line-height: 70upx;
}
</style>
