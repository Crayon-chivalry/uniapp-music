import App from './App'
import uvUI from '@/uni_modules/uv-ui-tools'
import store from './store'
import Player from '@/components/Player'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
	app.component('Player', Player)
	app.use(store);
	app.use(uvUI);
  return {
    app
  }
}
// #endif