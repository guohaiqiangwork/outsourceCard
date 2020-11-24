<template>
	<view>
		<view style="position: fixed;width: 100%;" class="background_colorff">
			<view class="padding_top3 padding_bottom3  page_widthMoudel ">
				<view
					@click="tabSwich(index)"
					:class="tabIndexT == index ? 'item_tab_three' : 'item_tab_threen'"
					v-for="(item, index) in tabList1"
					:key="index"
					:style="index == 2 ? 'border:none' : ''"
				>
					<view>{{ item.name }}</view>
					<view :class="tabIndexT == index ? 'bottom_tab' : ''"></view>
				</view>
				<view class="display_inline width33 uni-flex">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{ startDateOne }}</view>
					</picker>
				</view>
			</view>
		</view>

		<view class="page_widthMoudel" style="padding-top:160upx;">
			<view class="uni-flex display_space">
				<view class="font_Size28 margin_top2">2020年12月工资提成</view>
				<view class="font_size44 font_color2b font_weight700">3,000.00</view>
			</view>

			<view class="moudel_list margin_top3u" v-for="(item, index) in [1, 2, 3]" :key="index">
				<view class="uni-flex display_space">
					<view class="uni-flex width50">
						<view class=""><image style="width: 60upx;height: 60upx;border-radius: 50%;" src="../../static/image/cs.png" mode=""></image></view>
						<view class="font_size30 margin_left3">王二狗</view>
					</view>
					<view class="font_size40 font_color33 font_weight700">2000.00</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
function getDate(type) {
	const date = new Date();
	let year = date.getFullYear();
	let month = date.getMonth() + 1;
	let day = date.getDate();

	if (type === 'start') {
		year = year;
	} else if (type === 'end') {
		year = year;
	}
	month = month > 9 ? month : '0' + month;
	day = day > 9 ? day : '0' + day;

	return `${year}-${month}-${day}`;
}
export default {
	data() {
		return {
			tabList1: [
				{
					name: '出师成员'
				},
				{
					name: '越级成员'
				}
			],
			tabIndexT: 0,
			startDateOne: getDate('start'),
			date: getDate({
				format: true
			}),
			startDate: '1993-01-01',
			endDate: getDate('end')
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		tabSwich: function(index) {
			this.tabIndexT = index;
			this.init()
		},
		// 初始化数据
		init: function() {
			var data = {
				mbId: uni.getStorageSync('userId'),
				month: this.startDateOne,
				flag: this.tabIndexT + 1
			};
			this.$http.get('/api/member/commissionReward', data, true).then(res => {
				console.log(JSON.stringify(res));
			});
		},
		// 时间格式话
		formatDate: function(value) {
			var date = new Date(value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			var Y = date.getFullYear();
			var M = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
			var D = date.getDate();
			var h = date.getHours() + ':';
			var m = date.getMinutes() + ':';
			var s = date.getSeconds();
			return Y + '-' + M + '-' + D;
		},
		// 时间开始
		bindDateChange: function(e) {
			this.startDateOne = e.detail.value;
			console.log(this.startDateOne + '是佳龙空间');
			// this.dataStartDate = this.formatDate(this.startDateOne);
			// console.log(this.dataStartDate);
			this.init();
		}
	}
};
</script>

<style lang="less">
.item_tab_three {
	display: inline-block;
	width: 33%;
	text-align: center;
	color: #0c0c0c;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #333333;
	font-weight: 700 !important;
	padding-bottom: 30upx;
}

.item_tab_threen {
	display: inline-block;
	width: 33%;
	text-align: center;
	font-size: 32upx;
	height: 40upx;
	line-height: 40upx;
	color: #999999;
	padding-bottom: 30upx;
}
.bottom_tab {
	margin-left: 35%;
	margin-top: 2%;
	width: 60upx;
	height: 6upx;
	background: #2b65eb;
	border-radius: 3upx;
	box-shadow: 0upx 4upx 8upx 0upx #8dabef;
}
</style>
