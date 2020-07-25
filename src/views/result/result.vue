<template>
    <div class="result-wrapper">
        <van-icon size="85px" :name="iconType[status].name" :color="iconType[status].color"  />
        <p class="text">{{iconType[status].text}}</p>
    </div>
</template>

<script>
    import { Icon,Button } from 'vant';

    export default {
        name: "result",
        data() {
            return {
                type:{
                    '01':'success',
                    '02':'error',
                    '03':'dealing'
                },
                iconType:{
                    success:{
                        name:'checked',
                        color:'#43AD7F',
                        text:'支付成功'
                    },
                    dealing:{
                        name:'clock',
                        color:'#41A9FF',
                        text:'支付处理中'
                    },
                    error:{
                        name:'clear',
                        color:'#FD5A6E',
                        text:'支付超时'
                    }              
                },
               status:'success',
               orderNo:''
            }
        },
        created(){
            let query = this.$route.query
            const { status,orderNo } = query
            this.status = this.type[status]
            this.orderNo = orderNo
        },
        mounted(){
            setTimeout( ()=> {
                this.gotoPage()
            },2000)
        },
        methods:{
            gotoPage() {
                this.$router.replace({path:'/detail',query:{orderNo:this.orderNo}})
            }
        },
        activated() {
            //  setTimeout(() => {
            //     this.$refs.slider && this.$refs.slider.refresh()
            // }, 20)
        },
        components: {
            [Icon.name]: Icon ,
            [Button.name]:Button
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.result-wrapper
  width 100%
  padding-top 70px
  text-align center   
  .text
    color  #333
    font-weight bold 
    margin 10px 0 20px 0
</style>    
