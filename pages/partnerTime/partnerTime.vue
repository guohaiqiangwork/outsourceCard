<template>
	<view>
		<view class="uni-flex padding_top3 padding_bottom3 background_colorff">
			<view class="uni-flex searce_moudel" style="width: 85%;background-color: #EEEEEE;">
				<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
				<view class="searce_right">
					<input
						@input="getKey"
						class="font_size28 padding_top3"
						maxlength="10"
						placeholder="请输入您的搜索内容"
						confirm-type="搜索"
						type="text"
						placeholder-style="color:#999999"
					/>
				</view>
			</view>
			<view class="width15 margin_top2 text_center" @click="getList">搜索</view>
		</view>
		<view class="page_widthMoudel">
			<view class="font_size36 margin_top4u" v-if="referrer">我的推荐人</view>

			<view class="list_moudel_o" style="height: 120upx;" v-if="referrer">
				<view class="uni-flex">
					<view class="width20 text_center margin_top2"><image style="width: 80upx;height: 80upx;border-radius: 50%;" :src="referrer.avatar" mode=""></image></view>
					<view class="width60">
						<view class="font_size30">{{ referrer.name.length > 0 ? referrer.name : referrer.nickName }}</view>
						<view class="">{{ referrer.mobile.substring(0, 3) }}****{{ referrer.mobile.substring(7, 11) }}</view>
					</view>
					<view class=" width15 margin_top3u">
						<view style="text-align: right;" class="" @click="getPhone(referrer.mobile)">
							<image style="width: 44upx;height: 38upx;" src="../../static/image/my/2.png" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<view class="uni-flex display_space margin_top3u">
				<view class="font_size36">我的团队</view>
				<view class="font_sise24 font_color2b" @click="tabFalg('yes')" v-if="falgType == ''">查看有业绩下级</view>
				<view class="font_sise24 font_color2b" v-else @click="tabFalg('')">查看所有下级</view>
			</view>

			<view class="margin_top3u" style="padding-bottom: 40upx;">
				<view class="" style="box-shadow: 0upx 4upx 14upx 0upx #e2e5ef; ">
					<view class="background_color2b padding_top3 padding_bottom3" style="border-radius: 10upx 10upx 0upx 0upx;">
						<view class="uni-flex ">
							<view class="width45 margin_left3">
								<view class="font_size28 font_colorff">合伙人团队</view>
								<view class="font_size40 font_colorff">{{ myTeam.countNum }}</view>
								<view class="font_size25 font_colorff">一级合伙人{{ myTeam.firstLevel }}人</view>
							</view>
							<view class="width45">
								<view class="font_size28 font_colorff">本月团队总业绩</view>
								<view class="font_size40 font_colorff">{{ myTeam.countMonth }}</view>
								<view class="font_size25 font_colorff">上月团队总业绩{{ myTeam.countFirstMonth }}元</view>
							</view>
						</view>
					</view>

					<view class="uni-flex border_bottom padding_bottom3 padding_top3 background_colorff">
						<view
							class="display_inline text_center"
							:style="index == 0 ? '' : 'marginLeft: 4%;'"
							:class="typeFalg == item.id ? 'tabOne' : 'tabOne_two'"
							v-for="(item, index) in typeData"
							:key="index"
							@click="tabType(item)"
						>
							{{ item.name }}
						</view>
					</view>

					<view class="background_colorff padding_bottom3 padding_top2 " v-for="(item, index) in teamList" :key="index">
						<view class="list_moudel_o" style="margin-top: 0;">
							<view class="uni-flex">
								<view class="width20 text_center margin_top2">
									<image style="width: 80upx;height: 80upx;border-radius: 50%;" :src="item.headImgurl" mode=""></image>
								</view>
								<view class="width60">
									<view class="uni-flex">
										<view class="font_size30 text_hidden " style="max-width: 50%;">{{ item.name.length > 0 ? item.name : item.nickName }}</view>
										<view class="margin_top2 margin_left2" v-if="item.label == 2">
											<image src="../../static/image/1.png" style="width: 77upx;height: 30upx;" mode=""></image>
										</view>
										<view class="margin_top2 margin_left2" v-if="item.label == 1">
											<image src="../../static/image/2.png" style="width: 77upx;height: 30upx;" mode=""></image>
										</view>
									</view>
									<view class="" v-if="item.label == 1">{{ item.mobile.substring(0, 3) }}****{{ item.mobile.substring(7, 11) }}</view>
								</view>
								<view class="width15" v-if="item.label == 1">
									<view v-if="item.mobile" class="text_right " @click="getPhone(item.mobile)">
										<image style="width: 44upx;height: 38upx;" src="../../static/image/my/2.png" mode=""></image>
									</view>
								</view>
							</view>
						</view>

						<view class="page_widthMoudel" style="background-color: #f7f8fc;border-radius: 10upx;padding-bottom: 20upx;">
							<view class="uni-flex padding_top3 " style="">
								<view class="font_sise28 width45 margin_left3">个人业绩:{{ item.selfIncome }}元</view>
								<view class="font_sise28 width45">团队业绩:{{ item.teamIncome }}元</view>
							</view>
							<view class="font_size22 fonnt_color99 margin_left3">加入时间：{{ item.createTime }}</view>
							<view class="font_size22 font_color99 margin_left3">团队人数：{{ item.coutnNum }}</view>
						</view>
					</view>

					<view class="text_center background_colorff padding_bottom3u" style="padding-top: 100upx;" v-if="teamList.length == 0">
						<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/2.png" mode=""></image></view>
						<view class="margin_top3 font_sise30">暂无成员</view>
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
			list: [1],
			referrer: '',
			myTeam: '',
			falg: '',
			falgType: '',
			keyword: '',
			teamList: [],
			typeFalg: 0,
			typeData: [
				{
					name: '全部',
					id: 0
				},
				{
					name: '直推团队',
					id: 1
				},
				{
					name: '越级团队',
					id: 2
				}
			]
		};
	},
	onLoad() {
		this.init(); //初始化
	},
	methods: {
		// 处理
		tabType: function(item) {
			this.typeFalg = item.id;
			this.getList()
		},
		// 获取数据
		getKey: function(e) {
			this.keyword = e.detail.value;
		},
		init: function() {
			var data = {
				mbId: uni.getStorageSync('userId')
			};
			// 我的推荐人
			this.$http.get('/api/member/referrer', data, true).then(res => {
				this.referrer = res.data.data;
			});
			// 我的团队数据
			this.$http.get('/api/member/myTeam', data, true).then(res => {
				this.myTeam = res.data.data;
			});

			// 查询我的列表
			this.getList();
		},
		getList: function() {
			var data = {
				mbId: uni.getStorageSync('userId'),
				flag: this.falg,
				keyword: this.keyword,
				label:this.typeFalg == 0 ? '' : this.typeFalg
			};
			// 我的推荐人
			this.$http.get('/api/member/teamList', data, true).then(res => {
				this.teamList = res.data.data;
			});
		},
		tabFalg: function(item) {
			this.falgType = item;
			item == 'yes' ? (this.falg = 'yes') : (this.falg = '');
			console.log(this.falg);
			this.getList(); //获取列表
		},

		getPhone: function(phone) {
			uni.makePhoneCall({
				// 手机号
				phoneNumber: phone,
				// 成功回调
				success: res => {
					console.log('调用成功!');
				},
				// 失败回调
				fail: res => {
					console.log('调用失败!');
				}
			});
		}
	}
};
</script>

<style lang="less">
.list_moudel_o {
	width: 690upx;
	// height: 140upx;
	background: #ffffff;
	border-radius: 10upx;
	// margin-left: 10upx;
	padding-top: 20upx;
	margin-top: 20upx;
	padding-bottom: 20upx;
}
.tabOne {
	color: #2b65eb;
	font-size: 30upx;
	width: 30%;
	font-weight: 700;
}
.tabOne_two {
	width: 30%;
	color: #999999;
	font-size: 30upx;
}
</style>
