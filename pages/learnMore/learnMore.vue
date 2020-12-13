<template>
	<view>
		<view class="page_widthMoudel">
		<view class="" v-for="(item,index) in  list" :key="index">
			<view class="uni-flex border_bottom padding_bottom3 padding_top3">
				<view class="left_fa"></view>
				<view class="font_size30 font_color22 margin_left3 margin_top2">{{item.name}}</view>
			</view>
			<view class=" border_bottom padding_bottom3 padding_top3" v-for="(items,index) in item.detailResults" :key="index">
				<view class="uni-flex display_space" @click="openImg(items.id)">
					<view class="font_size30 font_color22">{{index + 1}} {{items.title}}</view>
					<view class=""><image style="width: 20upx;height: 12upx;" src="../../static/image/icon/down99.png" mode=""></image></view>
				</view>
				<view class="" v-if="imgFalg == items.id">
					<u-parse :content="items.content" :loading="loading" @preview="preview" @navigate="navigate" />
					
				</view>
			</view>
					
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
			imgFalg: '',
			list: [],
			loading: false, //开启loading不显示默认值
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		init: function() {
			// 获取常见问题
			this.$http.get('/api/commonProblem/list', '', true).then(res => {
				this.list = res.data.data;
			});
		},
		openImg: function(item) {
			this.imgFalg  == item ? this.imgFalg  = '':this.imgFalg = item;
		}
	}
};
</script>

<style lang="less">
.left_fa {
	width: 6upx;
	height: 35upx;
	background: #2b65eb;
	border-radius: 3upx;
	margin-top: 3%;
}
</style>
