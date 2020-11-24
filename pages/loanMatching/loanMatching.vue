<template>
	<view>
		<!-- 个人贷款 -->
		<template v-if="falg == 1">
			<view class="page_widthMoudel padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
				<view class="background_color2b padding_bottom3 padding_top3 padding_left3 padding_right3">
					<view class="uni-flex display_space">
						<view class="font_size32 font_colorff font_weight700">匹配贷款</view>
						<view class="margin_top1" @click="tabMoney(2)"><image style="width: 36upx;height: 36upx;" src="../../static/image/icon/colseM.png" mode=""></image></view>
					</view>
					<view class="uni-flex display_space">
						<view class="font_sise24 " style="color: #E7EAF2;">提高申请通过率</view>
						<view class="font_sise20 font_colorff">个人贷款</view>
					</view>
				</view>

				<view class="two_m">
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款人年龄</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款金额</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款人年龄</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">是否有实名制手机号</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">是否有逾期</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有芝麻分</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">芝麻分</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有信用卡</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有打卡工资</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有公积金</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有社保</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有微粒贷</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有淘宝账户</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有按揭房/抵押房</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否名下有车</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有营业执照</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">征信是否有逾期记录</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">征信逾期记录</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>
				</view>

				<view class="btn_ge">查看适合产品</view>
			</view>
		</template>
		<!-- 企业 -->
		<template v-if="falg == 2">
			<view class="page_widthMoudel padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
				<view class="background_color2b padding_bottom3 padding_top3 padding_left3 padding_right3">
					<view class="uni-flex display_space">
						<view class="font_size32 font_colorff font_weight700">匹配贷款</view>
						<view class="margin_top1" @click="tabMoney(1)"><image style="width: 36upx;height: 36upx;" src="../../static/image/icon/colseM.png" mode=""></image></view>
					</view>
					<view class="uni-flex display_space">
						<view class="font_sise24 " style="color: #E7EAF2;">提高申请通过率</view>
						<view class="font_sise20 font_colorff">企业贷款</view>
					</view>
				</view>

				<view class="two_m">
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款人年龄</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款金额</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业所在地</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款人身份</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">股东持股比例</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业成立时长(月)</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业年收入(万)</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业纳税时长</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业纳税是否有欠缴记录</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业纳税额(万)</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业税务评级</view>
						<view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业开票时长(月)</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业开票额度(万)</view>
						<view class="font_sise30 font_color99 text_right">
							<input type="text" value="" placeholder="请输入" />
							%
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 ">
						<view class="font_size32 font_color22 width50">企业与上一年相比是否 为上升状态</view>
						<view class="mwidth50 uni-flex">
							<view class="li_btn background_color2b">是</view>
							<view class="li_btn background_colordc">否</view>
						</view>
					</view>
				</view>

				<view class="btn_ge" @click="goMatching">查看适合产品</view>
			</view>
		</template>
	</view>
</template>

<script>
export default {
	data() {
		return {
			array: [
				{
					name: '全部类型全部类型',
					id: ''
				},

				{
					name: '达标奖励',
					id: '3'
				},
				{
					name: '津贴',
					id: '4'
				}
			],
			index: 0,
			falg: 2
		};
	},
	methods: {
		// 分类
		bindPickerChange: function(e) {
			this.index = e.detail.value;
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
		},
		tabMoney: function(item) {
			this.falg = item;
		},
		goMatching:function(){
			uni.navigateTo({
				url:'../matchingProducts/matchingProducts'
			})
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #fff;
}
.one_moudel {
	background: #f7f8fc;
	border-radius: 0upx 0upx 10upx 10upx;
}
.two_m {
	background: #f7f8fc;
	border-radius: 0upx 0upx 10upx 10upx;
	padding-left: 3%;
	padding-right: 3%;
}
.selsect_img {
	width: 12upx;
	height: 20upx;
	position: absolute;
	margin-top: -7%;
	right: 7%;
}
.li_btn {
	width: 110upx;
	height: 44upx;
	border-radius: 10upx;
	text-align: center;
	font-size: 24upx;
	color: #ffffff;
	line-height: 44upx;
	margin-left: 5%;
	margin-top: 2%;
}
.btn_ge {
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	margin-top: 30upx;
}
</style>
