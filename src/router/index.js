import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import GlobalData from '../views/GlobalData.vue'
// import IndustryData from '../views/IndustryData.vue'
// import CpyDataList from '../views/CpyDataList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/data/globalData',
    name: 'GlobalData',
    component: () => import(/* webpackChunkName: "globalData" */ '../views/GlobalData.vue'),
    children: [
      {
        path: '/data/globalData/:id',
        name: 'GlobalId',
        component: () => import(/* webpackChunkName: "globalData" */ '../views/GlobalData.vue'),
      }
    ]
  },
  {
    path: '/data/industryData/:name',
    name: 'IndustryData',
    component: () => import(/* webpackChunkName: "industryData" */ '../views/IndustryData.vue')
  },
  {
    path: '/data/cpyDataList/:id',
    name: 'CpyDataList',
    component: () => import(/* webpackChunkName: "cpyDataList" */ '../views/CpyDataList.vue')
  }
]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // console.log(from)
  // console.log(to)
  next()
})


export default router
