<template>
	<view>
		<view class="" v-if="detailData.videod">
			<video style="height: 420upx;width: 100%;" src="" controls></video>
		</view>
		<view class="" v-else>
			<image style="height: 420upx;width: 100%;" :src="detailData.pictureVideoUrl" mode=""></image>
		</view>
		<view class="page_widthMoudel">
			<view class="font_size36 font_color22 font_weight700 margin_top3u">
				{{detailData.name}}
			</view>
			<view class="font_sise24 font_color99">
				{{detailData.title}}
			</view>
			<view class="text_right font_size22" v-if="detailData.duration">
				时长 {{detailData.duration}}
			</view>
			<view class="font_size36 font_color22 font_weight700 margin_top3u" >
				简介
			</view>
			<view class="" style="padding-bottom: 120upx;">
				<u-parse :content="detailData.context" :loading="loading" />
			</view>
		</view>
		<view @click="goOrder" class="bottm_btn" v-if="!openVip" >
			VIP免费畅看
			<!-- v-if="!detailData.whetherTry" -->
		</view>
	</view>
</template>

<script>
import uParse from '../../components/feng-parse/parse.vue'; //富文本展示
export default {
	components: {
		uParse
	},
		data() {
			return {
				id:'',
				detailData:'',
				loading: false, //开启loading不显示默认值
				openVip:false
			}
		},
		onLoad(option) {
			this.id = option.id
			this.init()
				this.getVip()
		},
		methods: {
			getVip:function(){
				var data = {
					mbId:uni.getStorageSync('userId')
				}
				// 查询是否是vip
				this.$http.get('/api/member/openVip', data, true).then(res => {
					this.openVip = res.data.data
					
				});
			},
			init:function(){
				
				var data = {
					id:this.id
				};
				// 课程内容详情  /api/course/detail
				this.$http.get('/api/courseContent/detail', data, true).then(res => {
					console.log(JSON.stringify(res))
					this.detailData = res.data.data
				});
				
			},
			goOrder: function() {
				uni.navigateTo({
					url: '../orderDetail/orderDetail?id='  + this.id
				});
			},
		}
	}
</script>

<style lang="less">
.bottm_btn{
	width: 100%;
	height: 88upx;
	background: #f75349;
	font-size: 32upx;
	text-align: center;
	line-height:88upx;
	position: fixed;
	bottom: 0;
	color: #FFFFFF;
}
</style>
