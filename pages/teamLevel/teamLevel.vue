<template>
	<view>
		<view class="page_widthMoudel ">
			<view class="margin_top4u uni-flex">
				<view class="font_size36">本月团队等级</view>
				<view class="margin_top2 margin_left3">
					<image v-if="teamIncome.teamLevel == 'V1'" style="width: 88upx;height: 36upx;" src="../../static/image/icon/1vip.png" mode=""></image>
				</view>
			</view>

			<view class="">
				<view class="background_color2b padding_top3 padding_bottom3 margin_top3u" style="border-radius: 10upx 10upx 0upx 0upx;">
					<view class="font_size28 font_colorff margin_left3">当月总业绩(元)</view>
					<view class="font_size60 font_weight700 margin_left3 font_colorff">{{teamIncome.countMonth}}</view>
				</view>
				<view class="background_colorff">
					<view class="uni-flex padding_top3">
						<view class="width45 margin_left3">
							<view class="font_size28">个人业绩(元)</view>
							<view class="  font_size50 font_color2b font_weight700">{{teamIncome.countSelf}}</view>
						</view>
						<view class="width45 margin_left3">
							<view class="font_size28">团队业绩(元)</view>
							<view class="  font_size50 font_color2b font_weight700">{{teamIncome.countTeam}}</view>
						</view>
					</view>

					<view class="page_widthMoudel padding_bottom3">
						<view class="text_center font_size22 " style="background-color:  #f7f8fc;color: #8791A8;height: 56upx;border-radius: 10upx;line-height: 56upx;">
							还差{{teamIncome.subtract}}元可升级至下一级
						</view>
					</view>
				</view>
			</view>

			<view class="font_size36 margin_top4u">等级规则</view>
			<view class="text_center margin_top3u">
				<view class="">
					<image src="../../static/image/noData/6.png" style="width: 348upx;height: 348upx;" mode=""></image>
				</view>
				<view class="font_size30 margin_top3u">
					正在升级中
				</view>
			</view>
			
		<!-- 	<view class="margin_top3u background_colorff padding_left3 padding_right3 padding_bottom3 padding_top3">
				<view class="font_size26">每月团队等级根据当月总业绩按照下表确定得出。 总业绩越高团队等级越高</view>
				<view class="margin_top3u"><image src="../../static/image/cs.png" style="width: 100%;" mode=""></image></view>
			</view> -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			teamIncome:''
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			// 我的推荐人
			this.$http.get('/api/member/teamIncome', data, true).then(res => {
				this.teamIncome = res.data.data;
				
			});
		}
	}
};
</script>

<style></style>
