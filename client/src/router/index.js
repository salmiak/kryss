import Vue from 'vue'
import VueRouter from 'vue-router'
import Grid from '../components/grid.vue'
import Input from '../components/input.vue'
import ScriptGenerator from '../components/script-generator.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Ange kryssnamn',
    component: Input
  },
  {
    path: '/404',
    name: 'Fel kryssnamn, försök igen',
    component: Input
  },
  {
    path: '/manus-generator',
    name: 'Manusgenerator',
    component: ScriptGenerator
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
