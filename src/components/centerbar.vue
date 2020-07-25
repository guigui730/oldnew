<template>
    <div class="centerbar">
        <h2 class="centerinfo-title">{{centerInfo.subName}}</h2>
        <nav class="nav-list" >                    
            <div  class="nav-item" @click="buryingAlinkss(item,index)"  v-for="(item,index) in centerInfo.applys" :key="index">
                <figure>
                    <img :src="item.icon" v-if="item.icon">
                    <figcaption class="name">{{item.appName}}</figcaption>
                </figure>
            </div>
        </nav>
    </div>          
</template>

<script>

    export default {
        props:{
            centerInfo:{
                type:Object,
                default:function() {
                    return {}
                }
            }
        },
        methods:{
            buryingAlinkss(item,index) {
                if(MtaH5) {
                    MtaH5.clickStat(`hot${item.appbh}`)
                }      
                if(item.threshold === 'bind') {
                    let isshiming = sessionStorage.getItem('isshiming')
                    if(isshiming == 'false'){
                        location.href = 'smkapp://userRealName'
                        return false
                    }
                }          
                if(this.centerInfo.applys.length === index+1) {
                    location.href = `${item.destination}?token=${localStorage.getItem('token')}`
                }else{
                    location.href = item.destination
                }
                
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .centerbar
        padding 0.4rem 0 0.2rem 0
        background #ffffff
        margin-bottom 0.2rem
        .centerinfo-title
            height 0.4rem
            line-height 0.4rem
            padding-left 0.3rem
            color #333333
            font-size 0.36rem
            font-weight bold         
        .nav-list
            display flex
            flex-wrap wrap
            margin-bottom 0.2rem
            .nav-item
                flex 1
                min-width 25%
                max-width 25%
                height 1.4rem 
                box-sizing border-box
                padding-top 0.3rem
                text-align center
                &.notActive
                    opacity 0.5
                img 
                    width 0.45rem
                    height 0.45rem
                    margin-bottom 0.15rem    
                .name
                    color #333333
                    font-size 0.26rem                          
</style>    
