<template>
  <page type="scroll-tab-view" title="ScrollTab">
    <div slot="content">
      <div class="left-panel">
        <scroll>
          <!-- <tab-bar v-model="selectedLabel" :data="tabs" @change="changeHandler"></tab-bar> -->
          <ul v-if="tabs">
            <li class="tab-item" @click="selectItem(index)" :class="selectIndex ===index ?'active':''" v-for="(item,index) in tabs" :key="item.label">
              <i class="icon-active" v-if="selectIndex ===index"></i>
              <span class="text">{{item.label}}</span>
            </li>
          </ul>
        </scroll>
      </div>
      <div class="right-panel" v-if="scrollData.applys">
        <scroll ref="scroll">        
          <nav class="nav-list" v-if="scrollData.applys.length>0">                    
            <div class="nav-item" @click="buryingAlinkss(item,index)"  v-for="(item,index) in scrollData.applys" :key="index">
                <figure>
                    <img :src="item.icon" v-if="item.icon">
                    <figcaption class="name">{{item.appName}}</figcaption>
                </figure>
            </div>         
          </nav>
          <section class="nodata" v-else>
            <img src="./../common/image/nodata.png" alt="">
            <p>正在抓紧上线中~</p>
          </section>
        </scroll>
      </div>
    </div>
  </page>
</template>

<script type="text/ecmascript-6">
  import Page from './page.vue'
  import TabBar from 'base/tab-bar/tab-bar.vue'
  import Scroll from 'base/scroll/scroll.vue'
  import Centerbar from './centerbar'
  import {mapGetters} from 'vuex'

  export default {
    data () {
      return {
        // selectedLabel: '0',
        scrollData: {},
        selectIndex:0        
      }
    },
    // mounted () {
    //   this.scrollData = [{name:'1',label:'11561'},{name:'0',label:'113211'},{name:'02',label:'112131'},{name:'03',label:'154611'},{name:'04',label:'1151'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'},{name:'5',label:'1131'},{name:'6',label:'1121'}]
    // },
    activated() {
      if(MtaH5){
        MtaH5.clickStat("footerSearch")
      }
    },
    methods: {
      // changeHandler (label) {
      //   // this.scrollData = DATA_MAP[label]
      //   this.$nextTick(() => {
      //     // reset better-scroll'postion
      //     this.$refs.scroll.scrollTo(0, 0)
      //     // you need to caculate scroll-content height when your dom has changed in nextTick
      //     this.$refs.scroll.refresh()
      //   })
      // }
      selectItem(index) {
        this.selectIndex = index
        this.scrollData = this.center.subStands[index]
      },
      buryingAlinkss(item,index) {
        // if(MtaH5) {
        //     MtaH5.clickStat(item.appbh)
        // }
        if(item.threshold === 'bind') {
            let isshiming = sessionStorage.getItem('isshiming')
            if(isshiming == 'false'){
                location.href = 'smkapp://userRealName'
                return false
            }
        }
        if(this.scrollData.applys.length === index+1) {
            location.href = `${item.destination}?token=${localStorage.getItem('token')}`
        }else{
            location.href = item.destination
        }
      }
    },
    computed:{
      ...mapGetters([
        'center'
      ]),
      tabs() {
        let ruselt = []
        if(this.center) {
          // console.log(this.center.subStands.slice(0,5))
          this.scrollData = this.center.subStands[0]
          this.center.subStands.forEach((item)=>{
          ruselt.push({'label':item.subName})
        })
          return ruselt
        }   
      },
    },
    components: {
      Page,Scroll,TabBar,Centerbar
    },
    // watch: {
    //   selectedLabel (newV) {
    //     console.log(newV)
    //   }
    // }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .cube-scroll-list-wrapper
    .cube-tab-bar
      flex-wrap: wrap
      .cube-tab
        width: 100%
        flex-basis: unset
        height: 40px
        line-height: 40px
        font-size: 14px
        color: #db8931
        transition: all .3s ease-in
        &.cube-tab_active
          color: #fff
          font-size: 16px
          background-color: #a74b00

  .left-panel
    position: absolute
    top: 1rem
    left: 0
    bottom: 0
    width: 2.8rem
    background-color: #ffffff
    .tab-item
      display flex
      width 100%
      height 1rem
      line-height 1rem
      background #F7F7F7
      font-size 0.32rem
      color #333333
      align-items center
      &.active
        background #ffffff
        color #43ad7f        
      .icon-active
        flex 0 0 0.08rem
        display block
        width 0.08rem
        height 0.4rem
        margin-top -0.04rem
        background  #43ad7f  
      .text
        flex 1  
        text-align left 
        padding-left 0.4rem
  .right-panel
    position: absolute
    top:  1rem
    left: 2.8rem
    right: 0
    bottom: 0
    background-color: #ffffff
    .nav-list
      display flex
      flex-wrap wrap
      margin-bottom 0.2rem
      .nav-item
          flex 1
          min-width 50%
          max-width 50%
          height 1.8rem 
          box-sizing border-box
          padding-top 0.3rem
          text-align center
          &.notActive
              opacity 0.5
          img 
              width 0.45rem
              height 0.45rem
              margin-bottom 0.2rem    
          .name
              color #333333
              font-size 0.26rem  
    .nodata 
      text-align center
      padding-top 1rem
      font-size 0.32rem
      color #333333
      img 
        width 2rem
        height 2rem   
        margin-bottom 0.4rem    
</style>
