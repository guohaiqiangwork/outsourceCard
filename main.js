import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import {
	http
} from './components/http/http.js'
Vue.prototype.$http = http;
import validCode from './components/validCode.vue'
Vue.component('validcode', validCode)
import {
	bankType
} from './components/bankType.js'
Vue.prototype.$bankType = bankType;
import 'js_sdk/ican-H5Api/ican-H5Api.js'

import member from './common/common.js'
Vue.prototype.$member = member;



App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
