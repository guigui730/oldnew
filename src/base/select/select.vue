<template>
  <div class="select-wrapper">
    <h4>{{datas.title}}<span>*</span></h4>
    <div class="cube-select" :class="{ 'cube-select_active': active, 'cube-select_disabled': disabled }" @click="showPicker">
    <span v-if="selectedText" class="cube-select-text">{{ selectedText }}</span>
    <span v-else class="cube-select-placeholder">{{ datas.placeholder }}</span>
    <i class="cube-select-icon"></i>
    
    <cube-picker ref="picker"  :title="title" :data="adaptOptions" :selectedIndex="selectedIndex" cancelTxt="取消" confirmTxt="确定"
     @select="selectHandler"
     @cancel="hided"
     @touchmove.prevent>
     </cube-picker>
  </div>
  </div>
  
</template>


<script>
  import { findIndex } from '../../common/helpers/util'
  import CubePicker from '../picker/picker.vue'
  const COMPONENT_NAME = 'cube-select'
  const EVENT_CHANGE = 'change'
  const EVENT_INPUT = 'input' // only used for v-modal
  const EVENT_PICKER_SHOW = 'picker-show'
  const EVENT_PICKER_HIDE = 'picker-hide'
  import {mapMutations} from 'vuex'
  export default {
    name: COMPONENT_NAME,
    data() {
      return {
        active: false
      }
    },
    props: {
      datas: {
        type: Object,
        default() {
          /* istanbul ignore next */
          return {}
        }
      },
      value:  null,

      autoPop: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      },
      title: {
        type: String,
        default: '请选择'
      }
    },
    computed: {
      adaptOptions() {
        return [this.datas.options.map(item => {
          if (typeof item !== 'object') {
            item = {
              value: item,
              text: item
            }
          }
          return item
        })]
      },
      valueIndex() {
        const val = this.value
        const index = findIndex(this.adaptOptions[0], (item) => {
          return item.value === val
        })
        this.$refs.picker && this.$refs.picker.setData(this.adaptOptions, index !== -1 ? [index] : [0])
        return index
      },
      selectedIndex() {
        return this.valueIndex !== -1 ? [this.valueIndex] : [0]
      },
      selectedText() {
        return this.valueIndex !== -1 ? this.adaptOptions[0][this.valueIndex].text : ''
      }
    },
    created() {
      /* this.picker = this.$createPicker({
        $props: {
          title: 'title',
          data: 'adaptOptions',
          selectedIndex: 'selectedIndex',
          cancelTxt: 'cancelTxt',
          confirmTxt: 'confirmTxt'
        },
        $events: {
          select: 'selectHandler',
          cancel: this.hided
        }
      }) */
      this.autoPop && this.showPicker()
    },
    methods: {
      showPicker() {
        if (this.disabled) {
          return
        }
        this.setPopuState(true)
        this.$refs.picker.show()
        this.active = true
        this.$emit(EVENT_PICKER_SHOW)
      },
      hided() {
        this.active = false
        this.setPopuState(false)
        this.$emit(EVENT_PICKER_HIDE)
      },
      selectHandler(selectedVal, selectedIndex, selectedText) {
        this.hided()    
        this.setPopuState(false)    
        if (selectedVal[0] !== this.value) {
          this.$emit(EVENT_INPUT, selectedVal[0])
          this.$emit(EVENT_CHANGE, selectedVal[0], selectedIndex[0], selectedText[0])
        }
      },
      ...mapMutations({
        setPopuState: 'SET_POPUPSTATE'
      })
    },
    components:{
      CubePicker
    }
  }
</script>
<style lang="stylus">
  @require "../../common/stylus/variable.styl"
  @require "../../common/stylus/mixin.styl"
.select-wrapper
  width 100%
  box-sizing border-box
  padding 0 0.3rem  
  background-color #ffffff
  h4
    height 0.6rem
    line-height 0.6rem
    font-size: 0.28rem;
    color: #2F4050;
    text-align left 
    padding-top  0.2rem
    span 
      color #F63550
  .cube-select
    position: relative
    box-sizing: border-box
    padding: 10px 20px 10px 10px
    border-radius: 2px
    font-size: $fontsize-medium
    line-height: 1.429
    color: $select-color
    text-align left 
    background-color: $select-bgc
    border-1px($select-border-color, 2px)
    > span
      display: inline-block
  .cube-select_active
    border-1px($select-border-active-color)
    .cube-select-icon
      transform: translate(0, -50%) rotate(180deg)
  .cube-select_disabled
    color: $select-disabled-color
    background-color: $select-disabled-bgc
    cursor: not-allowed
  .cube-select-placeholder
    color: $select-placeholder-color
  .cube-select-icon
    position: absolute
    right: 8px
    top: 50%
    transform: translate(0, -50%)
    border-style: solid
    border-color: $select-icon-color transparent transparent transparent
    border-width: 4px 4px 0 4px
    transition: transform .3s ease-in-out
</style>