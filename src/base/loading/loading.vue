<template>
  <div class="loading">
    <img  src="./loading.gif">
    <p class="descse" :class="color" >{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在加载...'
      },
      color:{
        type: String,
        default: ''
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">

  .loading
    width: 100%
    text-align: center
    img
      width 0.8rem
      height 0.8rem
    .descse
      line-height: 0.3rem
      font-size: 0.24rem
      color: #666666
      &.white
        color #ffffff
</style>
