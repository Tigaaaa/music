import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import {icon} from 'element-ui'

Vue.use(VueRouter)
router.afterEach(()=>window.scrollTo(0,0))

Vue.use(VueLazyload)

Vue.use(icon)

Vue.config.productionTip = false

Vue.filter('currentTime',(time)=>{
  if(!time) return '00:00';
  let interval=Math.floor(time);
  let minute=(Math.floor(interval/60).toString().padStart(2,'0'));
  let second=(interval%60).toString().padStart(2,'0');
  return `${minute}:${second}`;
})
Vue.filter('numFil',(num)=>{
  if(num>=10000) return Math.round(num/10000)+'万';
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
