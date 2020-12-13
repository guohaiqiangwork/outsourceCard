<template>
	<view>
		<view class="background_colorff padding_top3 " style="padding-top:calc(30upx +  var(--status-bar-height))">
			<view class="uni-flex">
				<view class="uni-flex searce_moudel" style="width: 85%;">
					<view class="searce_left"><image src="../../static/image/icon/ss.png" class="searce_width" mode=""></image></view>
					<view class="searce_right">
						<!--  -->
						<input
							class="font_size28 padding_top3"
							maxlength="10"
							placeholder="请输入您的搜索内容"
							confirm-type="搜索"
							type="text"
							
							@input="search"
							:value="inputValue"
							placeholder-style="color:#999999"
						/>
						<!-- @confirm="search" -->
					</view>
				</view>
				<view @click="goSearchList" class="width15 margin_top1 font_size30 text_center">搜索</view>
			</view>
			
			
			<view class="page_widthMoudel margin_top5">
				
				<view class="uni-flex ">
					<view class="font_size30 font_weight700">
						热门搜索
					</view>
					<view class="margin_top1">
						<image style="width: 56upx;height: 28upx;" src="../../static/image/icon/hot.png" mode=""></image>
					</view>
				</view>
				<view @click="getValue(item.label)" class="display_inline width45 font_sise28 margin_top3"  v-for="(item, index) in hotList" :key="index">
					{{item.label}}
				</view>
				
				
				<view class="font_size30 font_weight700 margin_top6" v-if="searchAll.length > 0">
					历史搜索
				</view>
				
				<view 
				:class="index == searchAll.length - 1 ? '': 'border_bottom' "
				v-for="(item, index) in searchAll" :key="index" class="uni-flex display_space padding_bottom3 padding_top3 ">
					<view class="width50" @click="getValue(item)">
						{{item}}
					</view>
					<view class="" @click="delectItem(index)">
						<image style="width: 30upx;height: 30upx;" src="../../static/image/icon/colseM.png" mode=""></image>
					</view>
				</view>
				
			</view>
				
		
		</view>
		
		
	
	</view>
</template>

<script>
export default {
	data() {
		return {
			inputValue:'',//输入值
			searchAll: [], // 搜索记录
			hotList:[]
		};
		
	},
	onShow() {
		const than = this; // 注意this的指向
		uni.getStorage({
			key: 'searchAll_key',
			success(res) {
				than.searchAll = res.data;
				console.log(than.searchAll);
			}
		});
		this.getHotList()
	},
	methods: {
		// 获取热门搜索
		getHotList:function(){
			this.$http.get('/api/common/hotSearch/list', '', true).then(res => {
				this.hotList = res.data.data;
			});
		},
		// 获取输入框值
		search: function(e) {
			console.log(e.detail.value);
			this.inputValue = e.detail.value;
			
		},
		// 去搜索页面
		goSearchList:function(){
			if (this.inputValue != '') {
				// 输入框的值不为空时
				if (this.searchAll.length == 10) {
					const than = this;
					this.searchAll.splice(9,1);
					this.searchAll.unshift(this.inputValue);
					uni.setStorage({
						key: 'searchAll_key',
						data: than.searchAll,
						success: function() {}
					});
				} else {
					const than = this;
					for (var i = 0; i < this.searchAll.length; i++) {
						if (this.searchAll[i] == this.inputValue) {
							this.searchAll.splice(i, 1);
						}
					}
					this.searchAll.unshift(this.inputValue.replace(/[ ]/g, '')); // 将输入框的值添加到搜索记录数组中存储
					uni.setStorage({
						key: 'searchAll_key',
						data: than.searchAll,
						success: function() {}
					});
				}
				
				
			
				// 去搜索页
				uni.navigateTo({
					url:'../searchResult/searchResult?searchName=' + this.inputValue
				})
			}else{
				uni.showToast({
					title: '请输入内容',
					icon: 'none',
					duration: 1500,
					position: 'center',
				});
			}
			
		},
		// 删除历史记录
		delectItem:function(index){
			var than  = this;
			than.searchAll.splice(index, 1);
			uni.setStorage({
				key: 'searchAll_key',
				data: than.searchAll,
				success: function() {}
			});
		},
		//输入框
		getValue:function(item){
			this.inputValue = item
		}
	}
};
</script>

<style lang="less"></style>
