<template>
    <div class="checkbox" >
        <div class="icon-wrap" @click="checkFn(isDefault)" >
            <i class="iconfont icon-oval" v-if="!isDefault"></i>
            <i class="iconfont icon-gouxuan" v-else></i>
        </div>
       
    </div>
</template>

<script>
    export default {
        name: "checkbox",
        data() {
            return {
                isDefault: false
            }
        },
        methods: {
            checkFn(isDefault) { 
                this.isDefault = !this.isDefault
                this.$emit('onClick',this.isDefault)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.checkbox
    display inline-block
    .icon-wrap
        .iconfont
            color #979797
            font-size 0.28rem
        .icon-gouxuan
            color  #14B681
        
</style>
