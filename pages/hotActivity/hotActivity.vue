<template>
	<view>
		<view class="page_widthMoudel">
			<view class="one_list_moudel" @click="goDetail(item)" v-for="(item,index) in queryPageData" :key="index">
				<view class="">
					<image :src="item.pictureUrl" style="width: 100%;height: 200upx;" mode=""></image>
				</view>
				<view class="uni-flex margin_left3">
					<view class="font_size30 width70 font_color22 font_weight700 text_hidden">
						{{item.title}}
					</view>
					<view class="width30">
						<view class="one_list background_color2b" v-if="item.task == 0">
							<!-- :class="" -->
							进行中 
						</view>
						<view class="one_list background_colordc" v-if="item.task == 1">
							已结束
						</view>
					</view>
				</view>
				<view class="font_sise22 font_color99 margin_top3 margin_left3">
					{{item.createTime}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				queryPageData:[]
			}
		},
		onLoad() {
			this.getHor()
		},
		methods: {
			goDetail:function(item){
				uni.navigateTo({
					url:'../hotDetail/hotDetail?id=' + item.id
				})
			},
			getHor:function(){
				//获取热门活动
				this.$http.get('/api/hotActivity/queryPage', '', true).then(res => {
					this.queryPageData = res.data.data;
				}); 
			}
		}
	}
</script>

<style lang="less">
.one_list_moudel{
	padding-bottom: 3%;
	margin-top: 30upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 10upx 0upx #e7eaf2; 
}
.one_list{
	width: 40%;
	padding: 2upx;
	height: 28upx;

	border-radius: 6upx;
	text-align: center;
	font-size: 18upx;
	line-height: 28upx;
	color: #FFFFFF;
	margin-top: 3%;
}
</style>
