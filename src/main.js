import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
//import layout from './layouts/xmas.json';

Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data() {
    return {
      cells: [],
      width: 1,
      title: "Loading"
    }
  },
  mounted() {
    this.$http.get('/layouts/xmas.json').then((response) => {
      this.cells = response.data.cells || []
      this.width = response.data.width || 1
      this.title = response.data.title || "Somthing is wrong"
    })
  }
}).$mount('#app')
