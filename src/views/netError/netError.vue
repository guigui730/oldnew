<template>
    <div class="netError-wrapper">
        <scroll ref="scroll" >
            <section class="netError-container">
                <img src="../../common/image/netError.png" >
                <p class="text">网络不给力，请稍后再试~</p>
                <p class="refresh" @click="getUserIdByToken">重新加载</p>
            </section>               
        </scroll>  
        <!-- loading -->
        <popup v-show="showLoading" type="my-popup" >
            <loading color="white"></loading>    
        </popup>
    </div>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import Popup from 'base/popup/popup'
import Loading from 'base/loading/loading'

    export default {
        name: "netError",
        data() {
            return {
               showLoading:false
            }
        },
        methods:{
             // 根据token换取用户信息  ,并调用判断是否开卡
            getUserIdByToken: async function() {
                let that = this 
                this.showLoading = true
                let accessToken = localStorage.getItem('token')
                const userInfo = await this.$http.post('baseUser/getUserIdByToken.ext',JSON.stringify({accessToken}))
                this.showLoading = false
                if(sessionStorage.getItem('error') =='networkError'){                   
                   
                    return false
                }else{
                    this.$router.replace({name:'index'})
                }
                              
            }
        },
        activated() {
            //  setTimeout(() => {
            //     this.$refs.slider && this.$refs.slider.refresh()
            // }, 20)
        },
        components: {
            Scroll,Popup,Loading
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.netError-wrapper
    position: fixed
    top: 0
    left 0
    right 0
    bottom: 0
    width 100%
    z-index: 100
    background #F5F5F9
    .netError-container
        width 100%
        text-align center
        padding-top 2rem
        img 
            width 3.4rem
            height 3rem
            margin-bottom 0.5rem
        .text
            color #666666
            font-size 0.3rem
            margin-bottom 1.5rem
        .refresh
            color #2BA728
            font-size 0.4rem        
</style>    
