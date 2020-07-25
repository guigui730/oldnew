// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import store from './store'
import 'common/stylus/index.styl'
import 'common/js/resize.js'
import http from './utils/http'
import VueClipboard from 'vue-clipboard2'
import notify from 'base/notify'

Vue.use(notify);
Vue.use(VueClipboard)
Vue.prototype.$http=http;

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    fastclick.attach(document.body);
  }, false);
}

Vue.use(VueLazyload, {
  lazyComponent: true,
  loading: require('common/image/default.png')
})

// const ua = navigator.userAgent.toLowerCase()


//const routerConfig = ['netError','index','card','help','rideRecord'] 

router.beforeEach((to, from, next) => {
  document.title = to.meta.title 
  // let error = sessionStorage.getItem('error')
  // if( error == 'networkError') {
  //   if(routerConfig.includes(to.name))  {
  //     next()
  //   }else{
  //     next({name:'netError'})
  //   }    
  // }else{
  //   next()
  // }
  next()
})




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
