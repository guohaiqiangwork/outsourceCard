<template>
	<view>
		<template>
			<view class="padding_top3   page_widthMoudel ">
				<view
					@click="tab(index)"
					:class="tabIndexOne == index ? 'item_tab_one' : 'item_tab_onen'"
					v-for="(item, index) in tabListTwo"
					:key="index"
					:style="index == 2 ? 'border:none' : ''"
				>
					<view>{{ item.name }}</view>
					<view :class="tabIndexOne == index ? 'bottom_tab' : ''"></view>
				</view>
			</view>
			<view class="page_widthMoudel margin_top5u">
				<view class=""><image src="../../static/image/cs.png" style="width: 100%;" mode=""></image></view>
				<view class="uni-flex padding_bottom3 " style="position: fixed;bottom: 0;width: 92%;">
					<view @click="goShare(item)" class="width25 text_center" v-for="(item, index) in shareList" :key="index">
						<view class=""><image style="width: 60upx;height: 60upx;" :src="item.img" mode=""></image></view>
						<view class="font_size26 margin_top2">{{item.name}}</view>
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
				tabListTwo:[
					{
						name: '邀请好友'
					},
					{
						name: '推有钱合伙人'
					}
				],
				tabIndexOne:0,
				shareList:[
					{name:'分享海报',img:'../../static/image/icon/fxh.png'},
					{name:'分享链接',img:'../../static/image/icon/fxlj.png'},
					{name:'保存海报',img:'../../static/image/icon/bcx.png'},
					{name:'复制链接',img:'../../static/image/icon/copylj.png'},
					
				],
			}
		},
		methods: {
			tab:function(index){
				this.tabIndexOne = index
			},
			init: function() {
				// var data = {
				// 	mbId: uni.getStorageSync('userId'),
				// 	type: 3
				// };
				this.$http.get('/api/member/promotionPoster', '', true).then(res => {
					this.moneyList = res.data.data;
				});
			}
			
		}
	}
</script>

<style lang="less">
.item_tab_one {
	display: inline-block;
	width: 50%;
	text-align: center;
	color: #2B65EB;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	font-weight: 700 !important;
	padding-bottom: 30upx;
}

.item_tab_onen {
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
	margin-left: 38%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}
</style>
