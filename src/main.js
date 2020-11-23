import Vue from 'vue'
import App from './App.vue'
import layout from './layouts/xmas.json';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data() {
    return layout
  }
}).$mount('#app')
