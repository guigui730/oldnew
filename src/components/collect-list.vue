<template>
  <div class="collect-list">
    <scroll
    ref="scroll"
    :data="list"
    :scroll-events="['scroll']"
    :options="options"
    @pulling-up="onPullingUp"
    >
        <section class="contain" v-if="list.length > 0">
            
                <suggest @uncollect="uncollect(index)" :meedRefresh="true" v-for="(item,index) in list" :key="index" :suggest="item"></suggest>
            
        </section>  
        <section class="nodata" v-else>
            <img src="./../common/image/nodata.png" alt="">
            <p>一点儿收藏也没有~</p>
            <p>最新资讯了解一下</p>
        </section>      
    </scroll>
  </div>
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Suggest from './suggest.vue'

  export default {
    props: {
        index:{
            type:Number,
            default:null,
        }
    },
    data() {
        return {
            list:[],
            page:1,
            rows:5,
            totalNum:null,
            //上拉加载配置
            pullUpLoad: true,
            pullUpLoadThreshold: 0,
            pullUpLoadMoreTxt: '上拉加载更多', 
            pullUpLoadNoMoreTxt: '您的收藏只有这些哦~'
        }
    },
    // activated() {
      
    // },
    mounted() {
        if(MtaH5){
            MtaH5.clickStat("footerSelect")
        }
        this.getThemeList()
    },
    methods: {
      getThemeList:async function() {
          if(!this.totalNum || this.totalNum>this.list.length) {
            let params = {page:this.page,rows:this.rows,token:localStorage.getItem('token')}
            const data = await this.$http.postNews('actMedicalNewsCollectList.ext','request='+JSON.stringify(params))
            //console.log(data)
            if(data.code == 0) {
                if(data.response.searchData) {
                    this.list = [...this.list,...data.response.searchData]
                    this.totalNum = data.response.totalNum
                }
                if(data.response.totalNum == 0) {
                    this.list = []
                    this.totalNum = null
                }
            }
          }else{
                //数据加载完毕
                this.$refs.scroll.forceUpdate()
                //this.pullUpLoad = false               
            }   
      },
      onPullingUp() {
        setTimeout(()=>{
            this.page = this.page + 1
            this.getThemeList()
        },400)  
      },
      uncollect(index) {
        this.list.splice(index,1)
      }
    },
    computed: {
        options() {
            return {
                pullUpLoad: this.pullUpLoadObj,
                scrollbar: true
            }
        },
        pullUpLoadObj: function() {
            return this.pullUpLoad ? {
                threshold: parseInt(this.pullUpLoadThreshold),
                txt: {
                more: this.pullUpLoadMoreTxt,
                noMore: this.pullUpLoadNoMoreTxt
                }
            } : false
        }
    },
    watch: {
        index: function (value) {
            
            if(value === 1) {
                this.page = 1
                this.totalNum = null
                this.list=[]
                this.getThemeList()
            }
        }
    },
    components:{Scroll,Suggest}
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.collect-list
    position absolute
    top 1rem
    left 0
    right 0
    bottom 0
    margin-bottom 1rem
    .nodata
        display flex
        flex-direction column
        align-items center  
        color #ADADAD
        font-size 0.32rem
        line-height 1.6
        margin-top 1.1rem
        img 
            width 3.44rem
            height 3.04rem
            margin-bottom 0.4rem
           
</style>