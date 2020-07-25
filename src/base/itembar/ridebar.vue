<template>
     <div class="item" :class="itemval.lineclass">
        <div class="left-mes">
            <span class="bus">杭州-{{itemval.lineno}}</span>
            <span class="time">{{odate}}</span>
        </div>
        <div class="amount">-{{money}}</div>
    </div>
</template>

<script>
import { toDecimal2 } from 'common/helpers/util'

    export default {
        name: "itembar",
        props: {
            itemval:{}
           
        },
       
        data() {
            return {
                
            }
        },
        mounted() {
            
        },
        methods: {
           
        },
        computed:{
            money:function() {
                return toDecimal2(this.itemval.paid)
            },
            odate:function() {
                let date = this.itemval.ridingtime
                return `${date.slice(4,6)}-${date.slice(6,8)} ${date.slice(8,10)}:${date.slice(10,12)}`
            }     
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
                .item
                    display flex
                    width 100%
                    height 1.2rem                   
                    align-items center
                    justify-content space-between
                    box-sizing border-box
                    margin-left 0.3rem
                    padding-right 0.6rem
                    border-bottom 0.01rem solid #DEDEDE 
                    &.noline
                        border-bottom none
                    .left-mes
                        display flex
                        flex-direction column
                        .bus
                            color #333333
                            font-size 0.32rem
                            margin-bottom 0.15rem
                        .time
                            color #999999
                            font-size 0.24rem  
                    .amount
                        color #333333
                        font-size 0.34rem
                        font-weight bold 
</style>
