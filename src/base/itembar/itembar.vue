<template>
    <router-link class="item" :to="'/record/recordDetail?detail='+JSON.stringify(itemval)" >
        <img src="../../common/image/ic_cz_czxq.png" alt="">
                    <div class="right-content" :class="itemval.lineclass">
                        <div class="top-mes">
                            <span class="recharge">充值-{{itemval.cardno}}</span>
                            <span class="amount">{{money}}</span>
                        </div>
                        <div class="bottom-mes">
                            <span class="date-now">{{odate}}</span>
                            <span class="status" :class="'status'+itemval.ostate" v-html="status[itemval.ostate]"></span>
                        </div>
                    </div>
    </router-link>
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
                status:['等待付款','付款成功','付款失败','','','','申请退款','退款成功','退款失败','取消订单'],
            }
        },
        mounted() {
            
        },
        computed:{
            money:function() {
                return toDecimal2(this.itemval.ordermoney)
            },
            odate:function() {
                let date = this.itemval.odate
                return `${date.slice(4,6)}-${date.slice(6,8)} ${date.slice(8,10)}:${date.slice(10,12)}`
            }            
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    .item
        display flex
        width 100%
        height 1.4rem
        align-items center
        box-sizing border-box
        padding-left 0.3rem
        img 
            width 0.88rem
            height 0.88rem
            flex 0 0 0.88rem  
            margin-right 0.2rem 
        .right-content
            display flex
            flex-direction column
            justify-content center
            height 1.4rem
            box-sizing border-box
            border-bottom 0.01px solid #DEDEDE
            flex 1
            &.noline
                border-bottom none
            .top-mes ,.bottom-mes 
                display flex
                justify-content space-between
                padding-right 0.3rem
                box-sizing border-box
            .top-mes
                margin-bottom 0.2rem 
                .recharge
                    color #333333
                    font-size 0.32rem
                .amount
                    color #333333
                    font-size 0.34rem
                    font-weight bold 
            .bottom-mes
                align-items center
                .date-now
                    color #999999
                    font-size 0.24rem
                .status
                    color #4E8CEE
                    font-size 0.28rem
                    &.status1 
                        color #2BA728
                    &.status2
                        color #D0021B
                    &.status6
                        color  #FF6A00  
                    &.status7
                        color  #2BA728 
                    &.status8
                        color  #D0021B 
                    &.status9
                        color  #D0021B   
</style>
