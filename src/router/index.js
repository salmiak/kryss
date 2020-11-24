import Vue from 'vue'
import VueRouter from 'vue-router'
import Grid from '../components/grid.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/:name',
    name: 'Kryssa',
    component: Grid
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})

export default router
