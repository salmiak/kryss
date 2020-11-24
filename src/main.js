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
      if (!this.$route.params.name) {
        return this.title = "Ange kryssnamn i URL:en"
      }

      let publicPath = process.env.BASE_URL
      this.$http.get(`${publicPath}layouts/${this.$route.params.name}.json`).then((response) => {
        if (response.data) {
          this.cells = response.data.cells || []
          this.width = response.data.width || 0
          this.title = response.data.title || undefined
        } else {
          this.title = "Något är paj"
        }
      }, () => {
        this.cells = []
        this.width = 0
        this.title = "Något gick snett"
      })
    }
  }
}).$mount('#app')
