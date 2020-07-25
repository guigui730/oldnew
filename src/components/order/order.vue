<template>
    <div class="order-list" v-if="center">
        <nav class="nav-bar" v-if="center.subStands[4]">
            <div v-if="center.subStands[4].applys" :style="styles[index]" class="item" @click="gotoOtherPage(item,index)"  v-for="(item,index) in center.subStands[4].applys" :key="index">             
              <span class="mgr" :class="item.appName.length == 2?'magrless':''">{{item.appName}}</span>
            </div>
        </nav>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import navitem0 from './../../common/image/navitem1.png'
import navitem1 from './../../common/image/navitem2.png'
import navitem3 from './../../common/image/navitem3.png'
import navitem2 from './../../common/image/navitem4.png'
export default {
    data() {
        return {
          styles:[
              {
                  backgroundImage :`url(${navitem0})`
              },
              {
                  backgroundImage:`url(${navitem1})`
              },
              {
                  backgroundImage:`url(${navitem2})`
              },
              {
                  backgroundImage:`url(${navitem3})`
              }            
          ]
        }
    },
    activated() {
        if(MtaH5){
            MtaH5.clickStat("footerOrder")
        }
    },
    methods:{
        gotoOtherPage(item,index) {
            let isshiming = sessionStorage.getItem('isshiming')
            if(isshiming == 'false'){
                if(index == 2 || index == 3) {
                    location.href = 'smkapp://userRealName'
                }else{
                    location.href = item.destination
                }               
            }else{
                location.href = item.destination
            }
        }
    },
    computed:{
        ...mapGetters([
            'center'
        ])
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.order-list
    width 100%
    .nav-bar
        display flex 
        flex-wrap wrap
        padding 0.3rem 0.2rem
        width 100%
        background #fff
        box-sizing border-box
        margin-bottom 0.2rem
        .item
            flex 1  
            height 1.5rem
            line-height 1.4rem
            text-align right
            min-width 50% 
            font-size 0.32rem
            text-align center 
            color #ffffff
            font-weight bold
            background-repeat:no-repeat; 
            background-size:100% 100%;
            .mgr
               margin-left 0.8rem  
            .magrless
               margin-left 0.2rem               
</style>    
