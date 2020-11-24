<template>
	<view>
		<view class="page_widthMoudel margin_top3u">
			<view class="font_size34 font_weight700 text_hidden">
				{{detail.name}}
			</view>
			<view class="font_size26 font_color22 margin_top3u">
					<u-parse :content="detail.context" :loading="loading" @preview="preview" @navigate="navigate" />'
			</view>
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
				id:'',
				detail:'',
				loading: false //开启loading不显示默认值
			}
		},
		onLoad(option) {
			this.id = option.id
			uni.setNavigationBarTitle({
				title: option.title
			});
			this.init()
		},
		methods: {
			init:function(){
				var data ={
					id :this.id
				}
				this.$http.get('/api/raiders/detail', data, true).then(res => {
					this.detail = res.data.data
				});
			}
		}
	}
</script>

<style lang="less">
page{
	background-color: #FFFFFF;
}
</style>
