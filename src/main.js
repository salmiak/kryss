import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'

Vue.use(VueResource);
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  data() {
    return {
      cells: [],
      width: 0,
      title: "Loading…"
    }
  },
  router,
  mounted() {
    this.loadLayout()
  },
  watch: {
    $route (){
      this.loadLayout()
    }
  },
  methods: {
    loadLayout() {
      let publicPath = process.env.BASE_URL
      this.$http.get(`${publicPath}layouts/${this.$route.params.name}.json`).then((response) => {
        if (response.data) {
          this.cells = response.data.cells || []
          this.width = response.data.width || 0
          this.title = response.data.title || "Somthing is wrong"
        } else {
          this.title = "Somthing is wrong"
        }
      }, () => {
        this.cells = []
        this.width = 0
        this.title = "Somthing is wrong"
      })
    }
  }
}).$mount('#app')
