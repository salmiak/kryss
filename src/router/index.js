import Vue from 'vue'
import VueRouter from 'vue-router'
import Grid from '../components/grid.vue'
import Input from '../components/input.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Hem',
    component: Input
},
  {
    path: '/404',
    name: 'Försök igen',
    component: Input
  },
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
