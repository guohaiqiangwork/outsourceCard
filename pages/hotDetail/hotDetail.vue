<template>
	<view>
		<view class="">
			<u-parse :content="hotDetail.detail" :loading="loading" @preview="preview" @navigate="navigate" />
			
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
			id: '',
			loading: false, //开启loading不显示默认值
			hotDetail: ''
		};
	},
	onLoad(option) {
		console.log(option.id);
		this.id = option.id;
		this.getDetail();
	},
	methods: {
		getDetail: function() {
			var data = {
				id: this.id
			};
			this.$http.get('/api/hotActivity/detail', data, true).then(res => {
				this.hotDetail = res.data.data;
			});
		}
	}
};
</script>

<style></style>
