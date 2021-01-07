<template>
	<view>
		<view class="font_size46  margin_left4 margin_top3" style="color: #E14938;">贷款精选</view>
		<view class="title_border"></view>

		<view class=" padding_bottom3 border_bottom padding_top3">
			<view class="text_center width20 display_inline" v-for="(item, index) in twoList" :key="index" @click="tabOne(item.id)">
				<view :class="tabFalg == item.id ? 'tab_color' : 'tab_color1'">{{ item.name }}</view>
				<view class="bot_tab" v-if="tabFalg == item.id"></view>
			</view>
		</view>

		<view class="uni-flex page_widthMoudel padding_top3">
			<view class="width30 text_center"><view class="uni-input" @click="getLoanList('全国')">全国</view></view>
			<view class="width30 margin_left3">
				<picker @change="bindPickerChange1" :value="index1" :range="provinceList" range-key="label">
					<view class="uni-input text_hidden">
						{{ provinceData }}
						<!-- {{ provinceList[index1].label }} -->
					</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
			<view class="width30 margin_left3">
				<picker @change="bindPickerChange" :value="indexAre" :range="areaList" range-key="label">
					<view class="uni-input text_hidden">
						{{ cityData }}
						<!-- {{ areaList[indexAre].label }} -->
					</view>
				</picker>
				<view class="padding_top2"><image src="../../static/image/icon/homeDown.png" class="selsect_img" mode=""></image></view>
			</view>
		</view>

		<!-- <w-picker mode="region" :defaultVal="[4, 1, 1]" @confirm="onConfirm" ref="region" themeColor="#f00"></w-picker> -->

		<!-- 内容 -->
		<view class=" ">
			<view style="padding:30upx ">
				<!-- :style="index == [1, 2, 3, 4].length - 1 ? 'border:none' : ''" -->
				<view class="border_bottom padding_bottom3 padding_top3" @click="goToDetail(item)" v-for="(item, index) in loanSelectionList" :key="index">
					<view class="uni-flex">
						<view class=""><image style="width: 28upx;height: 28upx;" :src="item.logoUrl" mode=""></image></view>
						<view class="width20 margin_left1 text_hidden">{{ item.goodsName }}</view>
						<view v-if="item.cycle" class="list_one width20" style="margin-top: 0;">{{ item.cycle }}</view>
						<view v-if="item.rate" class="list_oneL  " style="margin-top: 0;">{{ item.rate }}</view>
					</view>
					<view class="uni-flex">
						<view class="width25">
							<view class="font_size54 font_weight700 font_colorf4">
								{{ item.highestReturn }}
								<!-- <text class="font_size24">%</text> -->
							</view>
							<view class="font_size22 font_colorf4">最高返佣</view>
						</view>
						<view class="width50 margin_top2 text_center">
							<view class="font_size38 font_weight700 font_color22">{{ item.maxAmount }}</view>
							<view class="font_size22 font_color99 margin_top4">最高贷款额度(元)</view>
						</view>
						<view class="width25  margin_top8"><view class="right_btn">立即推广</view></view>
					</view>
				</view>

				<view class="text_center" v-if="loanSelectionList.length == 0">
					<view class=""><image style="width: 380upx;height: 380upx;" src="../../static/image/noData/3.png" mode=""></image></view>
					<view class="margin_top3 font_sise30">暂无贷款</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabFalg: '',
			index: 0,
			index1: 0,
			typeId: '', //分类id
			loanSelectionList: '', //列表
			twoList: [],
			rebateRatioList: [{ name: '' }],
			billingCycleList: [{ name: '' }],
			area: '请选择市',
			provinceList: [{ label: '' }],
			areaList: [{ label: '' }],
			indexAre: 0,
			provinceData: '请选择',
			cityData: '请选择',
			typeCard:''
		};
	},
	onLoad(option) {
		// console.log(cityList)
		// citys:cityList[this.defaultVal[0]],
		console.log(option.typeId);
		this.typeId = option.typeId;
		if( option.type){
			this.typeCard = option.type;//判断是否全部
		}
		
		this.getTwoList();
		this.init();
		this.getAddressList(); //获取省市
	},
	methods: {
		tabOne: function(index) {
			this.tabFalg = index;
			this.getLoanList();
		},
		//
		init: function() {
			var data = {
				flag: 1
			};
			this.$http.get('/api/common/goodsInfo/rebateRatio', data, true).then(res => {
				this.rebateRatioList = res.data.data;
			});
			this.$http.get('/api/common/goodsInfo/billingCycle', data, true).then(res => {
				this.billingCycleList = res.data.data;
			});
		},
		// 获取省区
		getAddressList: function() {
			var data = {
				parentId: ''
			};
			this.$http.get('/api/common/area/list', data, true).then(res => {
				this.provinceList = res.data.data;
				this.getArea(this.provinceList[this.index1].value);
			});
		},
		bindPickerChange1: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.index1 = e.detail.value;
			var dataR = this.provinceList[this.index1].label;
			this.provinceData = dataR;
			this.getArea(this.provinceList[this.index1].value);
			this.cityData = '请选择';
			this.getLoanList();
		},

		// 获取区
		getArea: function(parentId) {
			var data = {
				parentId: parentId
			};
			this.$http.get('/api/common/area/list', data, true).then(res => {
				this.areaList = res.data.data;
			});
		},
		// 分类
		bindPickerChange: function(e) {
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
			this.indexAre = e.detail.value;
			this.cityData = this.areaList[this.indexAre].label;
			this.getLoanList();
		},

		// 获取二级分类
		getTwoList: function() {
			var data = {
				cid1: this.typeId
			};
			this.$http.get('/api/category/clazzTwo', data, true).then(res => {
				console.log('99');
				if (res.data.data.length > 0) {
					this.tabFalg = res.data.data[0].id;
					this.twoList = res.data.data;
				}
				this.getLoanList();
			});
		},
		// 地址
		keyArea: function(event) {
			plus.key.hideSoftKeybord();
			this.$refs['region'].show();
		},
		onConfirm: function(val) {
			this.area = val.checkArr[1];
			this.getLoanList();
		},
		// 获取列表
		getLoanList: function(e) {
			console.log(this.index + this.index1 + '我在这');
			let dataArea = this.area;
			dataArea == '请选择市' ? (dataArea = '') : (dataArea = this.area);
			let rebateRatio = this.rebateRatioList[this.index].name;
			rebateRatio == '全部' ? (rebateRatio = '') : (rebateRatio = this.rebateRatioList[this.index].name);
			let cycle = this.billingCycleList[this.index].name;
			cycle == '全部' ? (cycle = '') : (cycle = this.billingCycleList[this.index].name);
			if (this.typeCard == '全部') {
				var pData = '';
				var cData = '';
				this.provinceData == '请选择' ? (pData = '') : (pData = this.provinceData);
				this.cityData == '请选择' ? (cData = '') : (cData = this.cityData);
				
				console.log('8888')
				var data = {
					// cid1: this.typeId,
					cid2: this.tabFalg,
					area: pData + '_' + cData,
					rebateRatio: rebateRatio,
					cycle: cycle,
					whetherSelected: 1
				};
			} else {
				var pData = '';
				var cData = '';
				this.provinceData == '请选择' ? (pData = '') : (pData = this.provinceData);
				this.cityData == '请选择' ? (cData = '') : (cData = this.cityData);
				var data = {
					cid1: this.typeId,
					cid2: this.tabFalg,
					area: pData + '_' + cData,
					rebateRatio: rebateRatio,
					cycle: cycle,
					whetherSelected: 1
				};
			}

			this.$http.get('/api/goodsInfo/loanSelection', data, true).then(res => {
				this.loanSelectionList = res.data.data;
			});
		},

		goToDetail: function(item) {
			uni.navigateTo({
				url: '../productDetails/productDetails?goodsId=' + item.id
			});
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #ffffff;
}
.selsect_img {
	width: 15upx;
	height: 14upx;
	position: absolute;
	margin-left: 21%;
	margin-top: -6.5%;
}
.right_btn {
	width: 150upx;
	height: 54upx;
	background: #2b65eb;
	border-radius: 27upx;
	text-align: center;
	color: #ffffff;
	font-size: 26upx;
	line-height: 54upx;
	margin-left: 13%;
}
.uni-input {
	background-color: #f0f0fa;
	height: 60upx;
	border-radius: 40upx;
	padding-top: 0;
	line-height: 76upx;
}
.list_one {
	// width: 10%;
	line-height: 28upx;
	padding: 6upx;
	text-align: center;
	height: 28upx;
	background: #fff1e1;
	border-radius: 6upx;
	color: #cea984;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
	margin-top: 10upx;
}
.list_oneL {
	line-height: 28upx;
	padding: 6upx;
	text-align: center;
	height: 28upx;
	background: #ffd4d4;
	border-radius: 6upx;
	color: #f75349;
	font-size: 16upx;
	display: inline-block;
	margin-left: 3%;
	margin-top: 10upx;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.bot_tab {
	width: 55upx;
	height: 6upx;
	background: #e14938;
	border-radius: 3upx;
	margin-left: 30%;
	margin-top: 10upx;
}
.tab_color {
	font-size: 28upx;
	color: #e14938;
}
.tab_color1 {
	font-size: 28upx;
	color: #666666;
}
.cityMoudel {
	background-color: #f0f0fa;
	height: 72upx;
	border-radius: 40upx;
	padding-top: 0;
	line-height: 72upx;
	padding-left: 20upx;
}
.city_img {
	width: 15upx;
	height: 14upx;
	position: absolute;
	margin-left: 21%;
	margin-top: 30upx;
}
</style>
