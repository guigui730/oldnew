<template>
  <section class="suggest" @click="gotoDetail">
      <section class="article-list">
          <section class="acticle-item">
              <div class="left-art">
                  <div class="title">{{suggest.title}}</div>
                  <div class="button-bar">
                      <div class="star" @click.stop="starOrNot">
                          <i class="iconfonts" :class="suggestCopy.isPraise ==1?'active':''"></i>
                          <span>{{suggestCopy.praiseNum}}</span>
                      </div>
                      <div class="collect" @click.stop="collectOrNot">
                          <i class="iconfont icon-shoucang_xuanzhongx" :class="suggestCopy.isCollect ==1?'active':''"></i>
                          <span>{{suggest.collectNum}}</span>
                      </div>
                  </div>
              </div>
              <!-- <transition name="sticky-fixed-show">
                <div class="star-animition" v-show="showAnimition">   
                  11111
                </div>
              </transition> -->
              <img v-lazy="imgUrl" :src="imgUrl" alt="">
          </section>
      </section>
  </section>
</template>

<script>
import {mapMutations} from 'vuex'
const EVENT_SELECT = 'select'


  export default {
    name: "suggest",
    data() {
      return {
          showAnimition:false
      }
    },
    mounted() {
      
    },
    props:{
      suggest:{
        type:Object,
        default:function() {
          return {}
        }
      },
      meedRefresh:{
        type:Boolean,
        default:false
      }
    },
    methods:{
      gotoDetail() {
        if(MtaH5){
            MtaH5.clickStat("gotoWeimai")
        }
        this.$router.push({name:'Detail',query:{data:this.suggest}})
      },
      starOrNot() {
        if (this.suggestCopy.isPraise == 0) {
          this.star()
        }else{
          this.unstar()
        }
      },
      collectOrNot(e) {
        if (this.suggestCopy.isCollect == 0) {
          this.$emit(EVENT_SELECT,e.target)
          this.collect()
        }else{
          this.uncollect()
        }
        
      },
      //  点赞
      star:async function() {
        let params = {newsId:this.suggest.newsId,token:localStorage.getItem('token')}
        const data = await this.$http.postNews('actMedicalNewsPraiseAdd.ext','request='+JSON.stringify(params))       
        if(data.code == 0) {
            this.suggestCopy.isPraise = 1
            this.suggestCopy.praiseNum++
            this.showAnimition = true
            if(this.meedRefresh) {
              this.setRefresh(true)
              setTimeout( ()=>{
                this.setRefresh(false)
              },20)
            }   
        }
      },
      // 取消点赞
      unstar:async function() {
        let params = {newsId:this.suggest.newsId,token:localStorage.getItem('token')}
        const data = await this.$http.postNews('actMedicalNewsPraiseDelete.ext','request='+JSON.stringify(params))       
        if(data.code == 0) {
            this.suggestCopy.isPraise = 0
            this.suggestCopy.praiseNum--
            this.showAnimition = false
            if(this.meedRefresh) {
              this.setRefresh(true)
              setTimeout( ()=>{
                this.setRefresh(false)
              },20)
            } 
        }
      },
      // 收藏
      collect:async function() {
        let params = {newsId:this.suggest.newsId,token:localStorage.getItem('token')}
        const data = await this.$http.postNews('actMedicalNewsColectAdd.ext','request='+JSON.stringify(params))       
        if(data.code == 0) {
            this.suggestCopy.isCollect = 1
            this.suggestCopy.collectNum++
            if(this.meedRefresh) {
              this.setRefresh(true)
              setTimeout( ()=>{
                this.setRefresh(false)
              },20)
            } 
        }
      },
      //取消收藏
      uncollect:async function() {
        let params = {newsId:this.suggest.newsId,token:localStorage.getItem('token')}
        const data = await this.$http.postNews('actMedicalNewsColectDelete.ext','request='+JSON.stringify(params))       
        if(data.code == 0) {
            this.suggestCopy.isCollect = 0
            this.suggestCopy.collectNum--
            this.$emit('uncollect')
            if(this.meedRefresh) {
              this.setRefresh(true)
              setTimeout( ()=>{
                this.setRefresh(false)
              },20)
            } 
        }
      },
      ...mapMutations({
        setRefresh: 'SET_COLLECTREFRESF'
      })
    },
    computed: {
      imgUrl:function() {
        if(this.suggest.themeImage) {
          if(this.suggest.themeImage.indexOf(',') == -1){
            return this.suggest.themeImage
          }else{
            let imgUrlLIST = this.suggest.themeImage
            return imgUrlLIST.split(',')[0]
          }
        }
        
      },
      suggestCopy:function () {
        return this.suggest
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.suggest
    background #fff   
    .article-list
      margin-left .3rem
      padding-right 0.3rem
      border-bottom 0.01rem solid #f0f0f0
      .acticle-item
        display flex
        width 100%
        padding 0.3rem 0 0.4rem 0
        box-sizing border-box
        .left-art
          flex 1
          display flex
          flex-direction column
          justify-content space-between
          max-width 3.76rem
          position relative
          .title
            width 3.76rem
            font-size 0.32rem
            height 1.2rem
            line-height 0.48rem
            color #333
            font-family:PingFangSC-Semibold;
            font-weight:600;
            word-break: break-all
            white-space pre-wrap
          .button-bar
            position absolute
            left -.36rem
            top 1.3rem
            display flex  
            align-items center
            color #919191
            .iconfont
              color #919191
              font-size 0.3rem
            .star
              display flex
              align-items center
              position relative
              padding-right 0.2rem 
              .iconfonts
                background: url(./../../static/img/web_heart_animation.png);
                background-position: left;
                background-repeat: no-repeat;
                height: 1.1rem;
                width: 1.1rem;
                cursor: pointer;
                background-size: 2900%;
                &.active                  
                  display: inline-block;
                  -webkit-animation-name: heartBlast;
                  animation-name: heartBlast;
                  -webkit-animation-duration: .8s;
                  animation-duration: .8s;
                  -webkit-animation-iteration-count: 1;
                  animation-iteration-count: 1;
                  -webkit-animation-timing-function: steps(28);
                  animation-timing-function: steps(28);
                  background-position: right;
              span 
                margin-left -.2rem   
            .collect
              padding .3rem
              .iconfont
                margin-right .1rem
                &.active
                  color #FF6067           
        img 
          flex 0 0 2.6rem
          width 2.6rem
          height 2rem
          margin-left 0.5rem 
  h3
    color #333333
    font-size 0.36rem
    font-weight bold
    padding 0.3rem 0.4rem 0 0.4rem  
.fademore-enter-active, .fademore-leave-active 
    transition: opacity 1.6s
.fademore-enter, .fademore-leave-to 
    opacity: 0  
@-webkit-keyframes heartBlast {
    0% {
	    background-position: left;
	}
	100% {
	    background-position: right;
	}
	}

	@keyframes heartBlast {
	    0% {
	    background-position: left;
	}
	100% {
	    background-position: right;
	}
	}
</style>    
