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
        path: ':id',
        name: 'GlobalId',
        component: () => import(/* webpackChunkName: "globalData" */ '../views/GlobalData.vue'),
      }
    ]
  },
  {
    path: '/data/industryData',
    name: 'IndustryData',
    component: () => import(/* webpackChunkName: "industryData" */ '../views/IndustryData.vue'),
    children: [
      {
        path: ':id/:value',
        name: 'IndustryId',
        component: () => import(/* webpackChunkName: "industryData" */ '../views/IndustryData.vue'),
      }
    ]
  },
  {
    path: '/data/investData/:id/:value',
    name: 'investData',
    component: () => import(/* webpackChunkName: "investData" */ '../views/investData.vue'),
    // children: [
    //   // {
    //   //   path: ':id',
    //   //   name: 'investId',
    //   //   component: () => import(/* webpackChunkName: "investData" */ '../views/investData.vue'),
    //   // },
    //   {
    //     path: ':id/:value',
    //     name: 'investId',
    //     component: () => import(/* webpackChunkName: "investData" */ '../views/investData.vue'),
    //   }
    // ]
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
const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}

export default router
