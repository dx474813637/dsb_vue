import Vue from "vue";
import "normalize.css/normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import echarts from 'echarts';
import dx_utils from './untils/dx_untils.js'
// import Mock from 'mockjs'
// Mock.mock({
//   "list"
// })
Vue.config.productionTip = false;

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.$echarts = echarts;
Vue.prototype.$untils = dx_utils;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");