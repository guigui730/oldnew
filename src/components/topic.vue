<template>
  <div class="topic">
    <h3 class="title-warp">
        <span class="topic-title">{{topic.title}}</span>
        <router-link v-if="shouAll" class="more" to="/topicList">
            <span>查看全部</span>
            <i class="iconfont icon-jiantoux1"></i>
        </router-link>
    </h3>
    <section class="topic-contain" @click.stop="gotoTopicList" >
        <img class="img-bc" v-lazy="topic.fastDfsUrl+topic.imgUrl" :src="topic.fastDfsUrl+topic.imgUrl" v-if="topic.fastDfsUrl && topic.fastDfsUrl">
        <img class="img-bc" v-else src="./../../static/img/topicImage.png" alt="">
        <section class="topic-desc">
            <p class="contain" v-if="topic.subTitle">{{'“'+topic.subTitle+'”'}}</p>
            <!-- <section class="bottom-main">
                <section class="star">
                    <img src="./../common/image/star.png" alt="">
                    <span>{{star}}</span>
                </section>
                <section class="collect">
                    <img src="./../common/image/collect.png" alt="">
                    <span>{{collect}}</span>
                </section>
            </section> -->
        </section>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">

  export default {
    props: {
        topic:{
            type:Object,
            default:function() {
                return {}
            }
        },
        shouAll:{
            type:Boolean,
            default:false
        }
    },
    methods: {
      gotoTopicList() {
            if(MtaH5){
                MtaH5.clickStat('topic')
            }
          this.$router.push({name:'topicDetail',query:{topic:this.topic}})
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

.topic
    width 100%
    background #fff
    padding-top .2rem
    margin-bottom .2rem
    .title-warp
        height 0.6rem
        line-height 0.6rem
        padding 0rem 0.3rem 0 0.3rem
        .topic-title
            color #333333
            font-size 0.36rem
            font-weight bold
        .more
            float right 
            color #888888
            font-size 0.32rem  
            .icon-jiantoux1
                font-size .32rem 
                color #888888  
    .topic-contain
        position relative
        margin  0.1rem 0.4rem 0 0.4rem
        padding-bottom .2rem
        .img-bc 
            width 100% 
            height 2.26rem        
            border-radius 0.12rem
            border-top-left-radius 0
            overflow hidden
        .topic-desc
            position absolute 
            top 0.2rem
            left 0   
            right 0
            bottom 0.24rem            
            .contain
                display flex
                height 100%
                flex-direction column
                justify-content center
                align-items center
                text-align center
                color #fff 
                font-size 0.4rem
                font-family PingFangSC-Semibold
                font-weight:600
                margin-bottom 0.4rem
            .bottom-main
                float right 
                .star, .collect
                    display inline-block
                    font-size 0.28rem
                    color #fff
                    font-weight bold
                    img 
                        width 0.3rem
                        height 0.3rem
                .star
                    margin-right 0.4rem  
                .collect
                    margin-right 0.3rem 
</style>