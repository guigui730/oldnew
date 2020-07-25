<template>
  <div
    class="cube-tab"
    
    @click="handleClick">
    <slot name="icon">
      <i :class="icon"></i>
    </slot>
    <slot>
      <div :class="{'cube-tab_active': isActive}" v-html="label"></div>
    </slot>
  </div>
</template>
<script type="text/ecmascript-6">
  const COMPONENT_NAME = 'cube-tab'

  export default {
    name: COMPONENT_NAME,
    props: {
      label: {
        type: [String, Number],
        required: true
      },
      icon: {
        type: String,
        default: ''
      }
    },
    mounted () {
      this.$parent.addTab(this)
    },
    destroyed () {
      this.$parent.removeTab(this)
    },
    computed: {
      isActive () {
        return this.$parent.value === this.label
      }
    },
    methods: {
      handleClick (item) {
        this.$parent.trigger(this.label)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @require "../../common/stylus/variable.styl"

  .cube-tab
    flex: 1
    color: #888888
    text-align: center
    height 1rem
    line-height 1rem
    background #ffffff
    font-size 0.32rem
  .cube-tab_active
    color: #030303
    font-size 0.36rem
    font-weight bold
</style>
