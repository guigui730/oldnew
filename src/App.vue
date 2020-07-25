<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <van-tabbar v-model="active" route>
      <van-tabbar-item to="index" icon="wap-home">首页</van-tabbar-item>
      <van-tabbar-item to="order" icon="orders-o">订单</van-tabbar-item>
      <van-tabbar-item to="my" icon="manager-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template> 

<script>
import { Tabbar, TabbarItem } from 'vant';

export default {


  name: 'App',
  
  data() {
    return {
      active: 0,
    }
  },
  components:{
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  }
}
</script>

<style >

#app {
  font-family: PingFangSC-Regular, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  font-size: 0.32rem;
  background-color: #ffffff;
  touch-action: none;
}
.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
  }

.fade-enter, .fade-leave-to 
  {
    opacity: 0
  } 
.tabbar{
  width: 100%;
}

.action-sheet-fade-enter, .action-sheet-fade-leave-active{
    opacity: 0
}    
.action-sheet-fade-enter-active, .action-sheet-fade-leave-active {
    transition: all .3s ease-in-out
}
.action-sheet-move-enter, .action-sheet-move-leave-active {
    transform: translate3d(0, 100%, 0)
}    
.action-sheet-move-enter-active, .action-sheet-move-leave-active {
    transition: all .3s ease-in-out   
}
    
.router-slid-enter-active, .router-slid-leave-active {
  transition: all .8s;
}
.router-slid-enter, .router-slid-leave-active {
  transform: translate3d(2rem, 0, 0);
  opacity: 0;
}
</style>
