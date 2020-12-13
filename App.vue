<script>
export default {
	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');

		var ua = navigator.userAgent.toLowerCase();
		var isWeixin = ua.indexOf('micromessenger') != -1;
		if (!isWeixin) {
			console.log('我是谁')
		 	// window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + this.$appid; // 自己的appid

			// 也可以跳转到自己写的错误页面
			// uni.reLaunch({
			// 	url:'/pages/address/address'
			// })
		}
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
@import './static/css/uni.css';
@import './static/css/public.css';
</style>
