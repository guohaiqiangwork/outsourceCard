<template>
	<view class="background_colorff padding_top3">
		<view class="page_widthMoudel ">
			<view 
			@click="goPage(item)"
			:class="magList.length - 1 == index ? '' :'border_bottom'"
			v-for="(item, index) in magList" :key="index" class="uni-flex display_space padding_top3 padding_bottom3 ">
				<view class="uni-flex width70">
					<view class=""><image class="left_img" :src="item.imgUrl" mode=""></image></view>
					<view class="font_size30 margin_top1 margin_left3">{{ item.name }}</view>
				</view>
				<view class="width30 text_right margin_top1"><image style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image></view>
			</view>
			
		
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			magList: [
				{
					imgUrl: '../../static/image/icon/msg4.png',
					name: '系统通知',
					id:'1'
				},
				{
					imgUrl: '../../static/image/icon/msg2.png',
					name: '订单通知',
					id:'2'
				},
				{
					imgUrl: '../../static/image/icon/msg1.png',
					name: '收入通知',
					id:'3'
				},
				{
					imgUrl: '../../static/image/icon/msg3.png',
					name: '团队通知',
					id:'4'
				}
			]
		};
	},
	onLoad() {
		this.init()
	},
	methods:{
		goPage:function(item){
			uni.navigateTo({
				url:'../newsContent/newsContent?title=' + item.name + '&typeId=' + item.id
			})
		},
		
		init:function(){
			// 消息查询
			// this.$http.get('/api/message/types','',true).then(res => {
			// 	this.magList = res.data.data
			// })
		}
	}
};
</script>

<style lang="less">
.left_img {
	width: 60upx;
	height: 60upx;
}
</style>
