<template>
	<view>
		<view class="">
			{{gradeDesc}}
			<!-- <image src="../../static/image/cs.png" style="width: 100%;height: 100vh;" mode=""></image> -->
		</view>
		<view class="bottom_btn_y" @click="goT">
			邀请团队成员
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gradeDesc:''
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
