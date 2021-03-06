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
      title: "Loading…",
      gatherlink: undefined
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
      this.title = "Loading…"

      if (!this.$route.params.name) {
        this.cells = []
        this.width = 0
        this.gatherlink = undefined
        return this.title = this.$route.name
      }

      let publicPath = process.env.BASE_URL
      this.$http.get(`${publicPath}layouts/${this.$route.params.name}.json`).then((response) => {
        if (response.data) {
          this.cells = response.data.cells || []
          this.width = response.data.width || 0
          this.title = response.data.title || undefined
          this.gatherlink = response.data.gatherlink || undefined
        } else {
          this.title = "Något är paj"
        }
      }, () => {
        this.cells = []
        this.width = 0
        this.title = "Något gick snett"
        this.gatherlink = undefined
        this.$router.history.push('/404')
      })
    }
  }
}).$mount('#app')
