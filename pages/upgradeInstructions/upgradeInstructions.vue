<template>
	<view>
		<view class="">
			<u-parse :content="gradeDesc.upgradeDesc" :loading="loading" @preview="preview" @navigate="navigate" />
			<!-- <image src="../../static/image/cs.png" style="width: 100%;height: 100vh;" mode=""></image> -->
		</view>
		<view class="bottom_btn_y" @click="goT">
			邀请团队成员
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
				gradeDesc:'',
				loading: false //开启loading不显示默认值
			}
		},
		onLoad() {
			this.getGradeDesc()
		},
		methods: {
			goT:function(){
				uni.navigateTo({
					url:'../extension/extension'
				})
			},
			getGradeDesc: function() {
			
				this.$http.get('/api/member/gradeDesc', '', true).then(res => {
					this.gradeDesc = res.data.data;
				});
			}
		}
	}
</script>

<style lang="less">
.bottom_btn_y{
	width: 92%;
	height: 90upx;
	background: #2154df;
	border-radius: 45px;
	font-size: 30upx;
	color: #FFFFFF;
	text-align: center;
	line-height: 90upx;
	position: fixed;
	bottom: 5%;
	margin-left: 4%;
}
</style>
