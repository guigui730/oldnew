<template>
  <section class="card-topic">
    <section class="tip">
      <h4>
        <span class="bg"></span>
        <span class="titlename">温馨提示</span>
      </h4>
      <section class="contain">
        <p>1.适合主城区、余杭、萧山、富阳医保参保用户;</p>
        <p>2.在杭州市指定医院、药店出示二维码刷码使用;</p>
        <p>3.可使用医保付费</p>
      </section>
    </section>
    <section class="hospital">
      <h4>
        <span class="bg"></span>
        <span class="titlename">支持医院</span>
        <!-- <span class="search-all">查看全部</span> -->
      </h4>
      <section class="contain">
        <p>杭州市红十字会医院 </p>
        <p>杭州市环城东路208</p>
      </section>
    </section>
    <section class="medecine">
      <h4>
        <span class="bg"></span>
        <span class="titlename">支持药店</span>
        <!-- <span class="search-all">查看全部</span> -->
      </h4>
      <section class="contain">
        <p>九州大药房（九莲新村）</p>
        <p>文三路九莲新村1号2幢</p>
      </section>
    </section>
  </section>
</template>

<script type="text/ecmascript-6">
  name:'card-topic'

  export default {
    data() {
        return {
            
        }
    },
    methods: {
      
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.card-topic
  background #ffffff
  padding  0.5rem 0 0.4rem 0
  .tip ,.hospital, .medecine
    margin-bottom 0.4rem
    h4
      position relative
      height 0.44rem
      display flex
      align-items center
      padding-left 0.4rem
      margin-bottom 0.12rem
      .bg
        display inline-block
        width 0.08rem
        height 0.28rem
        margin-top -0.04rem
        margin-right 0.18rem
        background:#43ad7f
      .titlename
        color #333333
        font-weight bold
        font-size 0.32rem
      .search-all
        position absolute
        top 0.1rem
        right 0.4rem
        font-size 0.3rem
        color #096DD9
    .contain
      padding 0 0.3rem 0 0.4rem  
      color #333333
      font-size 0.32rem
      line-height 1.6
    
</style>


