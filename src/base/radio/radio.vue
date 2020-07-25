<template>
    <div class="radio-wrapper" v-if="datas.options && datas.options.length > 0">
        <h4 v-if="datas.title">{{datas.title}}<span>*</span></h4>
        <div class="radio-list"  :class="types">
        <div class="content" v-for="(item,index) in datas.options" :key="index" >
            <div class="icon" @click="onClick(item,index)">
                <div class="i-check font_family" :class="{'icon-selected':isDefault==index && types ==''}">
                    <div class="circle"  :class="{'select':isDefault==index && types !=''}"></div>
                </div>
                <div class="labels">{{item}}</div>
            </div>
        </div>
        </div>
    </div>   
</template>

<script>
    export default {
        name: "radio",
        props:{

            types:{
                type:String,
                default:''
            },
            datas: {
                type:Object,
                default:function () {
                    return {}
                }
            },
        },
        data() {
            return {
                isDefault: -1
            }
        },
        created() {
            this.getInit()
        },
        methods:{
            onClick(item,index) {
               /* console.log(this.datas.options,this.datas.modelValue,this.isDefault) */ 
                if (this.isDefault == index) {
                    this.isDefault = -1
                    this.$emit('onClick','')
                    this.$emit('input','')
                }else {
                    this.isDefault = index
                    this.$emit('onClick',item)
                    this.$emit('input',item) 
                }                 
            },
            getInit() {
                if (this.datas.modelValue) {
                    this.isDefault = this.datas.options.indexOf(this.datas.modelValue) 
                }
                
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.radio-wrapper
  width 100%
  box-sizing border-box
  padding 0.1rem 0.3rem  
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
.radio-list
    display flex
    &.circle
        flex-wrap wrap
        .content
            flex 0 1 auto 
            line-height 2.6
            margin-right 0.24rem
            .i-check
                display flex
                border-radius 50%
                .circle
                    width 0.24rem
                    height 0.24rem
                    border-radius 50%
                    &.select
                        background-color #448FF2
                    
    .content        
        flex 1
        .icon
            display flex
            align-items center
            .i-check
                display flex
                justify-content center
                align-items center
                width 0.32rem
                height 0.32rem
                text-align center
                border: 1px solid #448FF2 
                margin-right 0.16rem
                &.icon-selected
                    background #448FF2
                    color #ffffff 
                    font-size 0.24rem 
            .labels
                font-size: 0.24rem;
                color: #38404A;                    
</style>
