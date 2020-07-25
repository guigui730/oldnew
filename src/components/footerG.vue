<template>
  <section >
    <footGuide  ref="footGuide" @footerClick="footerClick" :index="index"></footGuide>
    <transition name="action-sheet-fade">
        <popup
        type="action-sheet"
        :center="false"
        :mask="true"     
        :z-index="zIndex"
        v-show="isVisible"
        @mask-click="maskClick">
        <transition name="action-sheet-move">
            <section class="popup-container" v-show="isVisible" @click.stop>
            <h3 class="popup-main-title">{{title}}</h3>
            <scroll-tab v-show="index === 0"></scroll-tab>
            <collect-list class="order-class" v-show="index === 1" :index="index"></collect-list>
            <help v-show="index === 2"></help>
            <order class="order-class" v-show="index === 3"></order>
            </section>
        </transition>
        </popup>
    </transition>      
  </section>
</template>

<script type="text/ecmascript-6">
import FootGuide from 'components/footGuide.vue'
import CollectList from 'components/collect-list'
import ScrollTab from 'components/scroll-tab.vue'
import Help from 'views/help/help.vue'
import Popup from 'base/popup/popup'
import Order from 'components/order/order.vue'
import {mapGetters} from 'vuex'

const titleName = ['搜索','收藏夹','常见问题','我的订单']

  export default {
    data() {
        return {
           index:null,
           isVisible:false,
           zIndex:88,
           title:'搜索',
        }
    },

    methods: {
        footerClick(index) {
            this.title = titleName[index]
            if(this.index == index) {     
                this.index = null    
                this.isVisible = !this.isVisible 
            }else{
                this.isVisible = true
                this.index = index
            }      
        },
        maskClick() {
            this.index = null
            this.isVisible = false
        },
        drop(el) {
            this.$refs.footGuide.drop(el)
        },
    },
    components:{
       FootGuide,ScrollTab,Help,Order,CollectList,Popup
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.popup-container {
  background: #ffffff;
  height: 9rem;
}
.popup-container .popup-main-title {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1rem;
  line-height: 1rem;
  font-size:0.36rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  padding-left: 0.3rem;
  color:#333333;
  z-index: 100;
  background: #ffffff;
}
.popup-container .order-class {
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
}           
</style>


