import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

import {
	http
} from './components/http/http.js'
Vue.prototype.$http = http;
import validCode from './components/validCode.vue'
Vue.component('validcode', validCode)
import {bankType} from './components/bankType.js' 
Vue.prototype.$bankType = bankType;





App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
