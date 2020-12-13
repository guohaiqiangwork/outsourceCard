<template>
	<view>
		<!-- 个人贷款 -->
		<template v-if="falg == 1">
			<view class="page_widthMoudel padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
				<view style="border-top-left-radius: 10upx;border-top-right-radius: 10upx;" class="background_color2b padding_bottom3 padding_top3 padding_left3 padding_right3">
					<view class="uni-flex display_space">
						<view class="font_size32 font_colorff font_weight700">匹配贷款</view>
						<view class="margin_top1 text_center width15" @click="tabMoney(2)">
							<image style="width: 36upx;height: 36upx;" src="../../static/image/icon/qh.png" mode=""></image>
						</view>
					</view>
					<view class="uni-flex display_space">
						<view class="font_sise24 " style="color: #E7EAF2;">提高申请通过率</view>
						<view class="font_sise20 font_colorff">个人贷款</view>
					</view>
				</view>

				<view class="two_m">
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 ">借款人身份证号码</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getIdCard" type="text" :value="idCard" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款人居住地</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getAddress" type="text" :value="address" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">是否有实名制手机号</view>
						<view class="mwidth50 uni-flex">
							<view @click="getPhone('有')" class="li_btn" :class="phone == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getPhone('无')" class="li_btn" :class="phone == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
						<!-- <view class="font_sise30 font_color99 text_right ">
							<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
								<view class="uni-input" style="background-color: #F7F8FC;">{{ array[index].name }}</view>
							</picker>
							<view class="padding_top2"><image src="../../static/image/icon/right99.png" class="selsect_img" mode=""></image></view>
						</view> -->
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">是否有逾期</view>
						<view class="mwidth50 uni-flex">
							<view @click="getOverdue('有')" class="li_btn" :class="overdue == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getOverdue('无')" class="li_btn" :class="overdue == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>

					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有芝麻分</view>
						<view class="mwidth50 uni-flex">
							<view @click="getSesame('有')" class="li_btn" :class="sesame == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getSesame('无')" class="li_btn" :class="sesame == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>

					<!-- <view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">芝麻分</view>
						<view class="font_sise30 font_color99 text_right"><input type="text" value="" placeholder="请输入" /></view>
					</view> -->
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有信用卡</view>
						<view class="mwidth50 uni-flex">
							<view @click="getCreditCard('有')" class="li_btn" :class="creditCard == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getCreditCard('无')" class="li_btn" :class="creditCard == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有打卡工资</view>
						<view class="mwidth50 uni-flex">
							<view @click="getCheckSalary('有')" class="li_btn" :class="checkSalary == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getCheckSalary('无')" class="li_btn" :class="checkSalary == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有公积金</view>
						<view class="mwidth50 uni-flex">
							<view @click="getProvidentFund('有')" class="li_btn" :class="providentFund == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getProvidentFund('无')" class="li_btn" :class="providentFund == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有社保</view>
						<view class="mwidth50 uni-flex">
							<view @click="getSocialSecurity('有')" class="li_btn" :class="socialSecurity == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getSocialSecurity('无')" class="li_btn" :class="socialSecurity == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有微粒贷</view>
						<view class="mwidth50 uni-flex">
							<view @click="getMicroLoan('有')" class="li_btn" :class="microLoan == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getMicroLoan('无')" class="li_btn" :class="microLoan == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有淘宝账户</view>
						<view class="mwidth50 uni-flex">
							<view @click="getTaobaoAccount('有')" class="li_btn" :class="taobaoAccount == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getTaobaoAccount('无')" class="li_btn" :class="taobaoAccount == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有按揭房/抵押房</view>
						<view class="mwidth50 uni-flex">
							<view @click="getMortgage('有')" class="li_btn" :class="mortgage == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getMortgage('无')" class="li_btn" :class="mortgage == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否名下有车</view>
						<view class="mwidth50 uni-flex">
							<view @click="getCar('有')" class="li_btn" :class="car == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getCar('无')" class="li_btn" :class="car == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">是否有营业执照</view>
						<view class="mwidth50 uni-flex">
							<view @click="getBusinessLicense('有')" class="li_btn" :class="businessLicense == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getBusinessLicense('无')" class="li_btn" :class="businessLicense == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">征信是否有逾期记录</view>
						<view class="mwidth50 uni-flex">
							<view @click="getOverdueRecords('有')" class="li_btn" :class="overdueRecords == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getOverdueRecords('无')" class="li_btn" :class="overdueRecords == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
				</view>

				<view class="btn_ge" @click="getPersonalMatch">查看适合产品</view>
			</view>
		</template>
		<!-- 企业 -->
		<template v-if="falg == 2">
			<view class="page_widthMoudel padding_bottom3" style="padding-top:calc(30upx +  var(--status-bar-height))">
				<view style="border-top-left-radius: 10upx;border-top-right-radius: 10upx;" class="background_color2b padding_bottom3 padding_top3 padding_left3 padding_right3">
					<view class="uni-flex display_space">
						<view class="font_size32 font_colorff font_weight700">匹配贷款</view>
						<view class="margin_top1 text_center width15" @click="tabMoney(1)">
							<image style="width: 36upx;height: 36upx;" src="../../static/image/icon/qh.png" mode=""></image>
						</view>
					</view>
					<view class="uni-flex display_space">
						<view class="font_sise24 " style="color: #E7EAF2;">提高申请通过率</view>
						<view class="font_sise20 font_colorff">企业贷款</view>
					</view>
				</view>

				<view class="two_m">
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">借款人年龄</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getAge" type="text" :value="age" placeholder="请输入借款人年龄" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业名称</view>
						<view class="font_sise30 font_color99 text_right">
							<input @input="getEnterpriseName" type="text" :value="enterpriseName" placeholder="请输入企业名称" />
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业所在地</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getEnterpriseAddress" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">借款人身份</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getIdentity" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">借款人姓名</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getName" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">借款人身份证</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getQIdCard" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业成立时长</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getFoundTime" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业年收入</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getAnnualIncome" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业纳税时长</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getTaxTime" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业纳税是否有交款记录</view>
						<view class="mwidth50 uni-flex">
							<view @click="getTaxPayMentRecord('有')" class="li_btn" :class="taxPayMentRecord == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getTaxPayMentRecord('无')" class="li_btn" :class="taxPayMentRecord == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业纳税额度</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getTaxAmount" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业税务评级</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getTaxRating" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业开票时长</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getInvoicingTime" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">企业开票额度</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getInvoicingQuota" type="text" value="" placeholder="请输入" /></view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业与上一年相比是否为上升状态</view>
						<view class="mwidth50 uni-flex">
							<view @click="getRisingState('有')" class="li_btn" :class="risingState == '有' ? 'background_color2b' : 'background_colordc'">是</view>
							<view @click="getRisingState('无')" class="li_btn" :class="risingState == '无' ? 'background_color2b' : 'background_colordc'">否</view>
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22 width50">预借款金额</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getLoanAmount" type="text" value="" placeholder="请输入" /></view>
					</view>

					<!-- 	
					
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">借款金额</view>
						<view class="font_sise30 font_color99 text_right">
							<input @input="getEnterpriseName" type="text" value="" placeholder="请输入" />
						</view>
					</view>
					<view class="uni-flex display_space padding_bottom3 padding_top3 border_bottom">
						<view class="font_size32 font_color22">企业所在地</view>
						<view class="font_sise30 font_color99 text_right"><input @input="getEnterpriseAddress" type="text" value="" placeholder="请输入" /></view>
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
		 -->
				</view>

				<view class="btn_ge" @click="getCompanyMatch">查看适合产品</view>
			</view>
		</template>

		<!-- 初始化弹窗 -->
		<template v-if="moudelOne">
			<view class="moudel_content">
				<view class="er_moudel">
					<view class="text_center font_size40 font_weight700">请选择贷款类型</view>
					<view class="moudel_btn_one" style="margin-top: 60upx;" @click="moudelTab(1)">个人贷款</view>
					<view class="moudel_btn_one" style="background-color: #F75349;" @click="moudelTab(2)">企业贷款</view>
				</view>
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
			falg: 1,
			idCard: '', //身份证号
			address: '', //居住地址
			phone: '无', //是否有实名手机号
			overdue: '无', //是否有逾期
			sesame: '无', //是否有芝麻分
			creditCard: '无', //是否有信用卡
			checkSalary: '无', //是否有打卡工资
			providentFund: '无', //是否有公积金
			socialSecurity: '无', //是否有社保
			microLoan: '无', //是否有微粒贷款
			taobaoAccount: '无', //是否有淘宝账户
			mortgage: '无', //是否有贷款房
			car: '无', //是否有车
			businessLicense: '无', //是否有营业
			overdueRecords: '无', //征信是否有逾期

			age: '', //企业处理
			enterpriseName: '', //企业名称
			enterpriseAddress: '', //企业地址
			identity: '', //借款人身分
			qName: '', //借款人姓名
			qIdcard: '', //借款人身份证
			foundTime: '', //成立时常
			annualIncome: '', //企业年收入
			taxTime: '', //纳税时长
			taxPayMentRecord: '无', //企业纳税是否有交款记录
			taxAmount: '', //企业纳税额度
			taxRating: '', // 企业税务评级
			invoicingTime: '', //企业开票时长
			invoicingQuota: '', //企业开票额度
			risingState: '无', //企业与上一年相比是否为上升状态
			loanAmount: '', //预借款金额

			moudelOne: true
		};
	},
	methods: {
		// 获取身份证
		getIdCard: function(e) {
			this.idCard = e.detail.value;
		},
		// 获取居住地址
		getAddress: function(e) {
			this.address = e.detail.value;
		},
		// 是否有实名电话
		getPhone: function(e) {
			this.phone = e;
		},
		// 是否有逾期
		getOverdue: function(e) {
			this.overdue = e;
		},
		// 是否有芝麻分
		getSesame: function(e) {
			this.sesame = e;
		},
		// 是否有信用卡
		getCreditCard: function(e) {
			this.creditCard = e;
		},
		// 是否有打卡工资
		getCheckSalary: function(e) {
			this.checkSalary = e;
		},
		//是否有公积金
		getProvidentFund: function(e) {
			this.providentFund = e;
		},
		//是否有社保
		getSocialSecurity: function(e) {
			this.socialSecurity = e;
		},

		//是否有微粒贷款
		getMicroLoan: function(e) {
			this.microLoan = e;
		},
		//是否有淘宝账户
		getTaobaoAccount: function(e) {
			this.taobaoAccount = e;
		},
		//是否有贷款房
		getMortgage: function(e) {
			this.mortgage = e;
		},
		//是否有车
		getCar: function(e) {
			this.car = e;
		},
		//是否有营业
		getBusinessLicense: function(e) {
			this.businessLicense = e;
		},
		//征信是否有逾期
		getOverdueRecords: function(e) {
			this.overdueRecords = e;
		},

		// 个人贷款匹配
		getPersonalMatch: function() {
			if (!this.idCard || !this.address) {
				uni.showToast({
					title: '请检查填写内容',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
				return;
			}
			var data = {
				idcard: this.idCard,
				address: this.address,
				phone: this.phone,
				overdue: this.overdue,
				sesame: this.sesame,
				creditCard: this.creditCard,
				CheckSalary: this.checkSalary,
				providentFund: this.providentFund,
				socialSecurity: this.socialSecurity,
				microLoan: this.microLoan,
				taobaoAccount: this.taobaoAccount,
				mortgage: this.mortgage,
				car: this.car,
				businessLicense: this.businessLicense,
				overdueRecords: this.overdueRecords
			};
			this.$http.post('/api/loan/personalParam', data, true).then(res => {
				if (res.data.code == 200) {
					uni.navigateTo({
						url: '../matchingProducts/matchingProducts?dataFalg=' + res.data.data + '&falg=1'
					});
				}
				console.log(res.data.data);
			});
		},

		// 企业
		// 年龄
		getAge: function(e) {
			this.age = e.detail.value;
		},
		// 名称
		getEnterpriseName: function(e) {
			this.enterpriseName = e.detail.value;
		},
		// 地址
		getEnterpriseAddress: function(e) {
			this.enterpriseAddress = e.detail.value;
		},
		// 借款人身份
		getIdentity: function(e) {
			this.identity = e.detail.value;
		},
		// 借款人姓名
		getName: function(e) {
			this.qName = e.detail.value;
		},
		// 借款人生份证
		getQIdCard: function(e) {
			this.qIdcard = e.detail.value;
		},
		// 成立日长
		getFoundTime: function(e) {
			this.foundTime = e.detail.value;
		},
		// 企业年收入
		getAnnualIncome: function(e) {
			this.annualIncome = e.detail.value;
		},
		//纳税时长
		getTaxTime: function(e) {
			this.taxTime = e.detail.value;
		},
		//企业纳税是否有交款记录
		getTaxPayMentRecord: function(e) {
			this.taxPayMentRecord = e;
		},
		//企业纳税额度
		getTaxAmount: function(e) {
			this.taxAmount = e.detail.value;
		},
		// 企业税务评级
		getTaxRating: function(e) {
			this.taxRating = e.detail.value;
		},
		// 企业开票时长
		getInvoicingTime: function(e) {
			this.invoicingTime = e.detail.value;
		},
		//企业开票额度
		getInvoicingQuota: function(e) {
			this.invoicingQuota = e.detail.value;
		},
		// 企业与上一年相比是否为上升状态
		getRisingState: function(e) {
			this.risingState = e;
		},
		// 预借款金额
		getLoanAmount: function(e) {
			this.loanAmount = e.detail.value;
		},

		// 企业贷款匹配
		getCompanyMatch: function() {
			if (!this.idCard || !this.address) {
				uni.showToast({
					title: '请检查填写内容',
					icon: 'none',
					duration: 1500,
					position: 'center'
				});
			}
			var data = {
				age: this.age, //企业处理
				enterpriseName: this.enterpriseName, //企业名称
				address: this.enterpriseAddress, //企业地址
				identity: this.identity, //借款人身分
				name: this.qName, //借款人姓名
				idcard: this.qIdcard, //借款人身份证
				foundTime: this.foundTime, //成立时常
				annualIncome: this.annualIncome, //企业年收入
				taxTime: this.taxTime, //纳税时长
				taxPayMentRecord: this.taxPayMentRecord, //企业纳税是否有交款记录
				taxAmount: this.taxAmount, //企业纳税额度
				taxRating: this.taxRating, // 企业税务评级
				invoicingTime: this.invoicingTime, //企业开票时长
				invoicingQuota: this.invoicingQuota, //企业开票额度
				risingState: this.risingState, //企业与上一年相比是否为上升状态
				loanAmount: this.loanAmount //预借款金额
			};
			this.$http.post('/api/loan/enterpriseParam', data, true).then(res => {
				if (res.data.code == 200) {
					uni.navigateTo({
						url: '../matchingProducts/matchingProducts?dataFalg=' + res.data.data + '&falg=2'
					});
				}
			});
		},

		// 分类
		bindPickerChange: function(e) {
			this.index = e.detail.value;
			console.log('picker发送选择改变，携带值为：' + e.detail.value);
		},
		tabMoney: function(item) {
			(this.idCard = '请输入'), (this.assress = '请输入');
			this.falg = item;
		},
		moudelTab: function(item) {
			this.moudelOne = false;
			this.falg = item;
		}
		// goMatching: function() {
		// 	uni.navigateTo({
		// 		url: '../matchingProducts/matchingProducts'
		// 	});
		// }
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

// 弹窗
.er_moudel {
	background-color: #ffffff;
	width: 80%;
	margin-left: 6%;
	position: absolute;
	top: 20%;
	padding: 30upx;
	border-radius: 20upx;
	padding-top: 60upx;
	padding-bottom: 60upx;
}
.moudel_btn_one {
	height: 88upx;
	background: #2b65eb;
	border-radius: 44upx;
	text-align: center;
	line-height: 88upx;
	color: #ffffff;
	font-size: 32upx;
	width: 80%;
	margin-left: 10%;
	margin-top: 30upx;
}
</style>
