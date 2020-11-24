<template>
	<view class="padding_top3">
		<view class="margin_top3 page_widthMoudel">
			<view class="font_size30">{{content.title}}</view>
			<view class="font_size22 font_color99 margin_top3u border_bottom padding_bottom3">{{content.createTime}}</view>

			<view class="font_size26 margin_top3u">
{{content.content}}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			msgId:'',
			content:''
		};
	},
	onLoad(option) {
		console.log(option);
		this.msgId =option.msgId
		uni.setNavigationBarTitle({
			title: option.title
		});
		this.getContent()
	},
	methods:{
		getContent:function(){
			var data = {
			id:this.msgId
			}
			this.$http.get('/api/message/detail',data,true).then(res => {
				this.content = res.data.data
			})
		}
	}
	
};
</script>

<style lang="less">
	page{
		background-color: #FFFFFF;
	}
</style>
