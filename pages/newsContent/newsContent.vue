<template>
	<view class="padding_top3 padding_bottom3">
		<view @click="goPage(item.id)" class="margin_top3" v-for="(item,index) in magList" :key="index">
			<view class="title_time">
				<!-- {{item.createTime.substring(5,11)}} -->
				{{item.createTime.substring(16,5)}}
			</view>
			<view class="margin_top3u background_colorff " style="padding: 30upx;">
				<view class="font_size30">
					{{item.title}}
				</view>
				<view class=" font_size26 font_color99 margin_top3 border_bottom padding_bottom3 ">
				{{item.content}}
				</view>
				<view class="uni-flex display_space padding_top3">
					<view class="font_size26 font_colorcc">
						查看详情
					</view>
					<view class="">
						<image style="width: 12upx;height: 20upx;" src="../../static/image/icon/right99.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
		
		<view class="text_center" style="margin-top: 200upx;" v-if="magList.length == 0">
			<view class="">
				<image style="width: 380upx;height: 380upx;" src="../../static/image/noData/4.png" mode=""></image>
			</view>
			<view class="margin_top3 font_sise30">
				暂无消息
			</view>
		</view>	
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:'',
				typeId:'',
				magList:[]
			};
		},
		onLoad(option) {
			console.log(option)
			this.title =option.title;
			this.typeId =option.typeId;
			uni.setNavigationBarTitle({
			　　title:option.title
			})
			this.getContent();//获取内容
		},
		methods:{
			goPage:function(id){
				uni.navigateTo({
					url:'../msgContent/msgContent?title=' + this.title +'&msgId=' +  id
				})
			},
			
			getContent:function(){
				var data = {
					mbId:uni.getStorageSync('userId'),
					typeId:this.typeId
				}
				this.$http.get('/api/message/list',data,true).then(res => {
					this.magList = res.data.data
				})
			}
		}
	}
</script>

<style lang="less">
.title_time{
	width: 20%;
	height: 36upx;
	background: #dfe2eb;
	border-radius: 4upx;
	text-align: center;
	line-height: 36upx;
	color: 22upx;
	font-size: 22upx;
	margin-left: 40%;
	color: #FFFFFF;
}
</style>
