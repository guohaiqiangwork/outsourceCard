<template>
	<view>
		<view class="page_widthMoudel" style="padding-bottom: 25%;">
			<view @click="goShareUrl(item)" class="moudel_list margin_top3u" v-for="(item, index) in goodsList" :key="index">
				<view class="uni-flex">
					<view class="left_fa"></view>
					<view class="font_size34 margin_left3">{{ item.goodsName }}</view>
				</view>
				<view class="uni-flex display_space margin_top3">
					<view class="width40 text_center">
						<view class="font_size75 font_weight700">{{ item.maxAmount }}</view>
						<view class="font_size26">授信额度(元)</view>
					</view>
					<view class="width60 margin_top3">
						<!-- 						<view class="uni-flex display_center">
							<view class="font_sise24">日利率</view>
							<view class="font_sise30 margin_left3 font_weight700">低至0.02%</view>
						</view> -->
						<view class=" font_sise30">{{ item.rate }}</view>
						<view class="uni-flex ">
							<view class="font_sise24">放款时限</view>
							<view class="font_sise30 margin_left3 font_weight700">{{ item.loanTime }}</view>
						</view>
						<view class="uni-flex ">
							<view class="font_sise24">授信期限</view>
							<view class="font_sise30 margin_left3 font_weight700">{{ item.creditPeriod }}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom_btn_one"><view @click="openMoudel" class="bottom_btnOne">推荐给客户拿返佣</view></view>
		<view v-if="moudelFalg" @click="colseMoudel">
			<view class="moudel_content" style="text-align: right;"><image style="width: 550upx;height: 582upx;" src="../../static/image/noData/share.png" mode=""></image></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			moudelFalg: false,
			falg: '',
			dataFalg: '',
			goodsList: []
		};
	},
	onLoad(option) {
		this.dataFalg = option.dataFalg;
		this.falg = option.falg;

		if (option.falg == 1) {
			this.getList();
		} else {
			this.getTwoList();
		}
	},
	methods: {
		// 去关系绑定
		goShareUrl:function(item){
			console.log(item)
			let urlFalg = '';
			this.falg == 1 ?  urlFalg = true : urlFalg = false;
			var urlData  = '../shareUrl/shareUrl?goodsUrl=' + item.thirdPartyUrl +'&goodsId=' + item.id +'&referrerId=' + uni.getStorageSync('userId') + '&flag=' + urlFalg
			console.log(urlData)
			uni.navigateTo({
				// url:'../shareUrl/shareUrl'
				 url:urlData
			})

		},
		
		openMoudel: function() {
			this.moudelFalg = true;
		},
		colseMoudel: function() {
			this.moudelFalg = false;
		},
		// 获取个人list
		getList: function() {
			var data = {
				uuid: this.dataFalg
			};
			this.$http.post('/api/common/loan/personalMatch', data, false).then(res => {
				if (res.data.data.length == 0) {
					uni.showToast({
						title: '没有适合您的产品',
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				} else {
					this.goodsList = res.data.data;
				}
			});
		},
		// 获取企业
		getTwoList: function() {
			console.log('我即那里');
			var data = {
				uuid: this.dataFalg
			};
			this.$http.post('/api/common/loan/companyMatch', data, true).then(res => {
				if (res.data.data.length == 0) {
					uni.showToast({
						title: '没有适合您的产品',
						icon: 'none',
						duration: 1500,
						position: 'center'
					});
				} else {
					this.goodsList = res.data.data;
				}
			});
		}
	}
};
</script>

<style lang="less">
.left_fa {
	width: 6upx;
	height: 35upx;
	background: #2b65eb;
	border-radius: 3upx;
	margin-top: 2%;
}
.bottom_btn_one {
	position: fixed;
	width: 100%;
	bottom: 0;
	background-color: #ffffff;
	padding-bottom: 20upx;
	padding-top: 10upx;
}
.bottom_btnOne {
	width: 92%;
	margin-left: 4%;
}
</style>
