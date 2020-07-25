<template>
    <button :disabled="disabled"  :class="[size ,colors]" @click="onClick">{{name}}</button>
</template>

<script>
    export default {
        name: "ksbutton",
        props: {
            size:{
                type:String,
                default:'large'
            },
            name:{
                type:String,
                default:'登录'
            },
            colors: {
                type:String,
                default:'green'
            },
            disabled:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            onClick() {
                this.$emit('onClick')
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
button
    height 1rem
    line-height 1rem
    font-size 0.32rem
    border none 
    outline none 
    &.large
        width 100%
    &.primary
        width 4.8rem
    &.small
        width 1.28rem 
        height 0.52rem
        line-height 0.52rem
        border-radius 0.28rem
        font-size 0.3rem       
    &.blue   
        color #fff
        background: linear-gradient(to right,#446EF2 0%,#448FF2 100%);
        box-shadow  0 0 0.1rem rgba(67,143,242,0.2)    
    &.white
        color #333333
        background: #F8F8F8
        border:1px solid #DEDEDE;
    &.yellow
        color #ffffff
        background: linear-gradient(to right,#FFA006 0%,#FFD508  100%);
        box-shadow  0 0 0.1rem rgba(67,143,242,0.2) 
    &.green   
        color #fff
        background: #43ad7f
        box-shadow  0 0 0.1rem rgba(67,143,242,0.2)             
</style>
