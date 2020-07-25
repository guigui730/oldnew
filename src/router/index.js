import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const Index = () => import('views/index/index')
const Confirm = () => import('views/confirmOrder/index')
const Result = () => import('views/result/result')
const Center = () => import('views/center/center')
const Detail = () => import('views/detail/detail')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        title: '辅具商城',
        keepAlive: true 
      }
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: Confirm,
      meta: {
        title: '确认订单'
      }
    },
    {
      path: '/result',
      name: 'result',
      component: Result,
      meta: {
        title: '支付结果'
      }
    },
    {
      path: '/center',
      name: 'center',
      component: Center,
      meta: {
        title: '个人中心'
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail,
      meta: {
        title: '订单详情'
      }
    }
  ]
})
