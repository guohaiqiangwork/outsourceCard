<template>
	<view>
		<!--  -->
		<view class="background_colorff " style="padding-top:calc(  var(--status-bar-height))">
			<!-- 公告栏 -->
			<view class="page_widthMoudel">
				<view class="uni-flex gong_g_m" v-if="msg.length > 0">
					<view class="img_cnter"><image src="../../../static/image/icon/notice.png" style="width: 28upx;height: 32upx;" mode=""></image></view>
					<!-- 公告内容 -->
					<view class="uni-swiper-msg margin_left2">
						<swiper class="swiper" vertical="true" autoplay="false" duration="500" interval="2000">
							<swiper-item @tap="notice(item)" v-for="(item, index) in msg" :key="index" class="swiper_item_font text_hidden">
								<view class="uni-flex display_space font_size26 font_color66">
									<view class="">{{ item.content }}</view>
									<!-- <view class="">名字</view> -->
								</view>
							</swiper-item>
						</swiper>
					</view>
				</view>
			</view>
		</view>

		<!-- 推广攻略 -->
		<view class="">
			<view class="font_size36 margin_top4u  margin_left3">推广攻略</view>
			<!-- <scroll-view scroll-x="true" class="wrapper">
				<view @click="goPromotion(item.url, item.name)" class="display_inline width25 margin_left3 text_center" v-for="(item, index) in promotionList" :key="index">
					<view class=""><image style="width: 60upx;height: 60upx;border-radius: 50%;" src="../../../static/image/cs.png" mode=""></image></view>
					<view class="font_sise24">{{ item.name }}</view>
				</view>
			</scroll-view> -->
			<view @click="goPromotion(item.url, item.name,'',item.value)" class="display_inline width25 text_center margin_top3u" v-for="(item, index) in promotionList" :key="index">
				<view class=""><image style="width: 60upx;height: 60upx;border-radius: 50%;" :src="item.img" mode=""></image></view>
				<view class="font_sise24">{{ item.name }}</view>
			</view>
		</view>

		<view class="page_widthMoudel margin_top6 padding_bottom3">
			<!--  热门活动-->
			<view class="uni-flex display_space">
				<view class="font_size36 font_color22  width50">热门活动</view>
				<view class="margin_top2 width50 uni-flex display_right" @click="goPage('hotActivity')">
					<view class="font_size26 font_color99">查看全部</view>
					<view class="margin_left3"><image style="width: 12upx;height: 20upx;" src="../../../static/image/icon/right99.png" mode=""></image></view>
				</view>
			</view>
			<view class="">
				<scroll-view scroll-x="true" class="wrapper" style="margin-top: 0;">
					<view
						@click="goHotDetail(item)"
						class="display_inline width70  text_center margin_top3"
						:class="index == 0 ? '' : 'margin_left3'"
						v-for="(item, index) in queryPageData"
						:key="index"
					>
						<view :class="index % 2 == 0 ? 'backgroud_img' : 'backgroud_img1'">
							<view class="font_size30 margin_top3 text_hidden text_left font_weight700">{{ item.name }}</view>
							<view class="font_size24 text_hidden" style="color: #3A4C68 ">{{ item.title }}</view>
							<view class="font_size20 margin_top3 text_hidden" style="color: #576371;">活动时间：{{ item.startTime }}-{{ item.endTime }}</view>
						</view>
					</view>
				</scroll-view>
			</view>

			<!--  了解慧伙-->
			<view class="font_size36 margin_top3 font_color22">了解慧伙</view>
			<view class="moudel_two" @click="goPromotion('learnMore')">
				<view class="backgroud_img2 padding_top3 padding_bottom3" style="border-top-left-radius: 10upx;border-top-right-radius: 10upx;">
					<view class="font_size30 font_colorff margin_left3">慧伙使用指南</view>
					<view class="uni-flex margin_top1 display_space margin_left3">
						<view class="font_size22 width50" style="color: #DAE3F8;">权威解读 了解慧伙</view>
						<view class="uni-flex width40 display_right " style="padding-right: 3%;">
							<view class="font_size22 margin_top2" style="color: #DAE3F8;">了解详情</view>
							<view class="margin_left3"><image style="width: 10upx;height: 18upx;" src="../../../static/image/icon/rightff.png" mode=""></image></view>
						</view>
					</view>
				</view>

				<view class="uni-flex margin_top3">
					<view class="uni-flex  width33 display_center" v-for="(item, index) in queryData" :key="index">
						<view class=""><image style="width: 8upx;height: 15upx;" src="../../../static/image/icon/rightb.png" mode=""></image></view>
						<view class="font_size26 margin_top1 margin_left3">{{ item.name }}</view>
					</view>
				</view>
			</view>

			<!--  代理攻略-->
			<view class="font_size36 font_color22  margin_top6">信贷攻略</view>
			<view class="">
				<scroll-view scroll-x="true" class="wrapper">
					<view
						class="display_inline   text_center  "
						:style="index == 0 ? '' : 'marginLeft: 4%;'"
						:class="typeFalg == item.id ? 'tabOne' : 'tabOne_two'"
						v-for="(item, index) in typeData"
						:key="index"
						@click="tabType(item)"
					>
						{{ item.name }}
					</view>
				</scroll-view>
			</view>
			<view class="margin_top2">
				<view
					@click="goPromotion('trainingDetail', '攻略', item)"
					v-for="(item, index) in agentData"
					:key="index"
					class="border_bottom padding_bottom3 padding_top3 uni-flex"
				>
					<view class="width30"><image style="width: 180upx;height: 180upx;border-radius: 10upx;" :src="item.imageUrl" mode=""></image></view>
					<view class="width75">
						<view class="font_size30 font_size22 text_hidden2 font_weight700" style="height: 110upx;">{{ item.name }}</view>
						<view class="uni-flex margin_top4">
							<view class="uni-flex width50">
								<view class="font_color99 font_sise24">{{ item.times }}</view>
								<view class="list_moudel">{{ item.raidersTypeName }}</view>
							</view>
							<view class="uni-flex width50 display_right">
								<view style="margin-top: 1.5%;"><image  style="width: 32upx;height: 24upx;" src="../../../static/image/icon/15.png" mode=""></image></view>
								<view class="font_sise24 font_color99 margin_left3">{{ item.num }}</view>
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
			msg: [],
			promotionList: [
				// { name: '现金任务', url: 'promotionTask' },
				{ name: '推广素材', url: 'promotionMaterials', img: '../../../static/image/icon/7.png' },
				{ name: '奖金明细', url: 'payroll', img: '../../../static/image/icon/8.png' },
				{ name: '贷款匹配', url: 'loanMatching', img: '../../../static/image/icon/10.png' },
				{ name: '百行征信', url: 'outUrl', img: '../../../static/image/icon/101.png',value:'https://h5mp.baihangcredit.com:8097/downloadpage.html' },
				{ name: '培训课堂', url: 'trainingKe', img: '../../../static/image/icon/9.png' },
				{ name: '征信中心', url: 'outUrl', img: '../../../static/image/icon/102.png',value:'https://ipcrs.pbccrc.org.cn/' },
				{ name: '中国执行', url: 'outUrl', img: '../../../static/image/icon/103.png' ,value:'http://zxgk.court.gov.cn/'},
				// { name: '热门活动', url: 'hotActivity' ,img:'../../../static/image/icon/1.png'}
			],
			tabList: [{ name: '推广赚钱' }, { name: '登录和提现' }, { name: '团队相关' }],
			tabOneList: [{ name: '#全部#' }, { name: '#个人信贷#' }, { name: '#企业票代#' }, { name: '#口子情报#' }, { name: '#企业票代#' }],

			queryPageData: [],
			typeData: [], //攻略类型
			typeFalg: '',
			agentData: [],
			queryData: []
		};
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '攻略'
		});
	},
	onLoad() {
		this.init();
		console.log('99');
		// var nums = [2, 7, 11, 15];
		// var target = 99;
		// console.log('00');
		// var obj = {};
		// for (let i = 0; i < nums.length; i++) {
		// 	console.log(nums[i]);
		// 	let num = nums[i];
		// 	console.log(num);
		// 	if (num in obj) {
		// 		console.log([obj[num], i]);
		// 	} else {
		// 		obj[target - num] = i;
		// 	}
		// }
		
	},
	methods: {
		// 初始化已完结
		init: function() {
			// 获取首页公告
			this.$http.get('/api/message/systemNotify', '', true).then(res => {
				this.msg = res.data.data;
			});
			//获取热门活动
			this.$http.get('/api/hotActivity/queryPage', '', true).then(res => {
				this.queryPageData = res.data.data;
			});
			// 获取攻略类型
			this.$http.get('/api/raiders/type', '', true).then(res => {
				this.typeData = res.data.data;
				this.typeFalg = this.typeData[0].id;
				this.getAgent();
			});
			// 获取常见问题类型
			this.$http.get('/api/commonProblem/queryPage', '', true).then(res => {
				console.log(res);
				this.queryData = res.data.data;
			});
		},
		// 去活动详情
		goHotDetail: function(item) {
			uni.navigateTo({
				url: '../../hotDetail/hotDetail?id=' + item.id
			});
		},
		// 代理攻略切换
		tabType: function(item) {
			this.typeFalg = item.id;
			this.getAgent(); //
		},
		// 代理攻略
		getAgent: function() {
			var data = {
				raidersTypeId: this.typeFalg
			};
			// 代理攻略
			this.$http.get('/api/raiders/agent', data, true).then(res => {
				this.agentData = res.data.data;
			});
		},
		// 去推广任务
		goPromotion: function(url, title, item,value) {
			// if(url== 'loanMatching'){
			// 	uni.showToast({
			// 		title: '功能正在路上。。。。',
			// 		icon: 'none',
			// 		duration: 2000,
			// 		position: 'top'
			// 	});
			// 	return
			// }
			console.log("00")
			if (item) {
				uni.navigateTo({
					url: '../../' + url + '/' + url + '?title=' + title + '&id=' + item.id
				});
			} else if(url == 'outUrl'){
				// console.log('99')
				plus.runtime.openURL(value);
				// window.location.href = value;
			} else {
				uni.navigateTo({
					url: '../../' + url + '/' + url + '?title=' + title
				});
			}
		},

		goPage: function(url) {
			uni.navigateTo({
				url: '../../' + url + '/' + url
			});
		},
		notice: function(item) {
			uni.navigateTo({
				url: '../../msgContent/msgContent?title=攻略公告&msgId=' + item.id
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f7f8fc;
}
.gong_g_m {
	height: 70upx !important;
	// margin-top: 3%;
	padding-top: 18upx;
}
.img_cnter {
	text-align: left;
	height: 40upx;
	width: 6%;
	margin-top: 2%;
}
.wrapper {
	width: 98%;
	white-space: nowrap;
	display: flex;
	margin-top: 3%;
}
.moudel_two {
	// width: 670upx;
	height: 258upx;
	margin-top: 20upx;
	background: #ffffff;
	border-radius: 10upx;
	box-shadow: 0upx 4upx 10upx 0upx #e7eaf2;
}
.tabOne {
	// width: 109px;
	height: 44ipx;
	border-radius: 6upx;
	font-size: 26upx;
	color: #FFFFFF;
	text-align: center;
	line-height: 44upx;
	padding-left: 14upx;
	padding-right: 14upx;
	background-color:  #2B65EB;
	
}
.tabOne_two {
	// width: 109px;
	height: 44ipx;
	border-radius: 6upx;
	font-size: 26upx;
	color: #5c6e95;
	text-align: center;
	line-height: 44upx;
	padding-left: 14upx;
	padding-right: 14upx;
	background-color: #DCE0EC;
}
.list_moudel {
	// width: 88upx;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	text-align: center;
	color: #cea984;
	font-size: 18upx;
	line-height: 28upx;
	// padding-top: 10upx;
	// padding-left: 15upx;
	// padding-right: 15upx;
	// padding-bottom: 10upx;
	padding: 6upx;
	margin-left: 3%;
	margin-top: 1%;
}

.backgroud_img {
	background-image: url(../../../static/image/icon/11.png);
	background-size: 100%;
	height: 200upx;
	border-radius: 10upx;
	background-repeat: no-repeat;
	padding: 30upx;
}
.backgroud_img1 {
	background-image: url(../../../static/image/icon/12.png);
	background-size: 100%;
	height: 200upx;
	border-radius: 10upx;
	background-repeat: no-repeat;
	padding: 30upx;
}
.backgroud_img2 {
	background-image: url(../../../static/image/icon/120.png);
	background-size: 100%;
	height: 100upx;
	border-top-left-radius: 10upx;
	border-top-right-radius: 10upx;
	background-repeat: no-repeat;
	padding: 30upx;
}
</style>
