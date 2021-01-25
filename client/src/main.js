import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'
import router from './router'
import VueSocketIO from 'vue-socket.io'

Vue.use(VueResource);
Vue.config.productionTip = false

// https://www.digitalocean.com/community/tutorials/vuejs-vue-socketio
// https://medium.com/js-dojo/build-a-real-time-chat-app-with-vuejs-socket-io-and-nodejs-714c8eefa54e
// https://www.telerik.com/blogs/real-time-data-visualization-using-vue-and-socket.io

Vue.use(new VueSocketIO({
    debug: true,
    connection: 'localhost:3000',
    /* vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
    },*/
    options: {
      transports: ['websocket']
      //path: "/my-app/"
    } //Optional options
}))

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
