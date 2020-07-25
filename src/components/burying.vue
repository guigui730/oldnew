<template>
  <div @click="burying">
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
    id: {
        type: String,
        default: ''
      }
    },
    methods: {
      burying() {
        MtaH5.clickStat(this.id)
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
 
</style>