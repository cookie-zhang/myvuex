import Vue from 'vue'
import App from './App.vue'
import store from './store'
import HelloWorld from './components/HelloWorld'

Vue.config.productionTip = false
Vue.component('quanjucom', HelloWorld)
new Vue({
  el: '#app',
  store,
  // 这里的 h 是 createElement 方法
  render: h => h(App)
})
// .$mount('#app')
