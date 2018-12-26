import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import '@/assets/css/base.css'
import Api from './assets/js/api';
import BaseComponents from "./components/base";
import store from "./store";
import router from './router'

Vue.config.productionTip = false
Vue.prototype.BASE_URL = process.env.BASE_URL;

Vue.use(BaseComponents)
Vue.use(Api)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
