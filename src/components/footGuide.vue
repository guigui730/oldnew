<template>
  <section class="footer-wrapper">
        <div class="left-icon">
          <div class="img-wrapper" :class="index===0?'active':''" @click="clickHendle(0) ">
            <i class="iconfont icon-sousuoleimu_fillx"></i>
          </div>         
        </div>
        <div class="right-icon">
          <div class="img-wrapper" :class="index===1?'active':''" @click="clickHendle(1)">
            <i class="iconfont icon-shoucang_xuanzhongx"></i>
          </div> 
          <div class="img-wrapper" :class="index===2?'active':''" @click="clickHendle(2)">
            <i class="iconfont icon-bangzhuxuanzhongx"></i>
          </div>
          <div class="img-wrapper" :class="index===3?'active':''" @click="clickHendle(3)">
            <i class="iconfont icon-dingdan_xuanzhongx"></i>
          </div>  
          <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index">
              <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                  <i class="iconfont icon-shoucang_xuanzhongx inner-hook" ></i>
                </div>
              </transition>
            </div>
          </div>                
        </div>
        
  </section>
</template>

<script type="text/ecmascript-6">
import {mapGetters} from 'vuex'


  export default {
    data() {
        return {
            balls: [
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              },
              {
                show: false
              }
            ],
            dropBalls: [],
        }
    },
    props:{
      index:{
        type:Number,
        default:null
      }
    },
    methods: {
      clickHendle(index) {
          this.$emit('footerClick',index)
      },
      drop(el) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.el = el;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeDrop(el) {
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect();
            let x = window.innerWidth-rect.left-40 ;
            let y = -(window.innerHeight - rect.top - 22);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(-${x}px,0,0)`;
            inner.style.transform = `translate3d(-${x}px,0,0)`;
          }
        }
      },
      dropping(el, done) {
        /* eslint-disable no-unused-vars */
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
          el.addEventListener('transitionend', done);
        });
      },
      afterDrop(el) {
        let ball = this.dropBalls.shift();
        if (ball) {
          ball.show = false;
          el.style.display = 'none';
        }
      }
    },
    // watch:{
    //   drops:function(value) {
    //     console.log(value)
    //     if(this.drops !== value) {
    //       console.log(value)
    //       this.drop(value)
    //     }
    //   }
    // },
    computed:{
      ...mapGetters([
        'drops'
      ])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.footer-wrapper
    position fixed
    left 0
    right 0
    bottom 0
    height 1rem
    background #ffffff
    z-index 99
    display flex
    justify-content space-between
    align-items center
    padding 0 0.12rem 
    .left-icon
        .iconfont 
            color #909090
            font-size 0.4rem
    .right-icon
        .iconfont 
            color #909090
            font-size 0.4rem
    .img-wrapper
        padding 0.26rem 0.28rem 
        &.active   
          .iconfont     
            color #43ad7f
    .right-icon
        display flex 
    .ball-container
      .ball
        position: fixed
        right: 0.60rem
        bottom: 0.22rem
        z-index: 200
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
        .iconfont
          display inline-block
          width: 0.32rem
          height: 0.32rem
          color #FF6067 
          transition: all 0.6s linear       
</style>


