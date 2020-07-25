<template>
  <div class="center">
    <div class="top-head">
        <img src="../../../static/img/logo.png" alt="">
        <div class="right-head">
            <p>{{mobile}}</p>
            <van-button v-if="logoutIf" class="logoout" size="small" plain  round type="primary" @click="lougot">退出</van-button>
        </div>
    </div> 
    <van-tabs v-model="active" swipeable title-active-color="#43AD7F" color="#43AD7F">
        <van-tab title="全部订单" >
            <van-list
                v-model="list[0].loading"
                :finished="list[0].finished"
                finished-text="没有更多了"
                @load="getOrder('',0)"
                >
                <van-panel :class="item.status" :title="item.createTime"  v-for="item in list[0].items" :key="item.id" :status="status[item.status]">
                    <div @click="gotoDetail(item)">
                        <van-card
                            :num="item.num"
                            :price="item.money/100"
                            
                            :title="item.orderTitle"
                            :thumb="thumb[item.singlePrice]"
                        >
                            <div slot="footer" v-if="item.status === 'unpay'" >
                                <van-button size="small" type="primary" @click.stop="gotoRepay(item)">去支付</van-button>
                            </div>
                        </van-card>
                    </div>
                    
                </van-panel>
            </van-list>   
        </van-tab>
        <van-tab title="待支付" >
            <van-list
                v-model="list[1].loading"
                :finished="list[1].finished"
                finished-text="没有更多了"
                @load="getOrder('unpay',1)"
                >
                <van-panel :class="item.status" :title="item.createTime"  v-for="item in list[1].items" :key="item.id" :status="status[item.status]">
                    <div @click="gotoDetail(item)">
                        <van-card
                            :num="item.num"
                            :price="item.money/100"
                            
                            :title="item.orderTitle"
                            :thumb="thumb[item.singlePrice]"
                        >
                            <div slot="footer" v-if="item.status === 'unpay'" >
                                <van-button size="small" type="primary" @click.stop="gotoRepay(item)">去支付</van-button>
                            </div>
                        </van-card>
                    </div>
                    
                </van-panel>
            </van-list>  
        </van-tab>
        <van-tab title="支付成功" >
            <van-list
                v-model="list[2].loading"
                :finished="list[2].finished"
                finished-text="没有更多了"
                @load="getOrder('paysuccess',2)"
                >
                <van-panel :class="item.status" :title="item.createTime"  v-for="item in list[2].items" :key="item.id" :status="status[item.status]">
                    <div @click="gotoDetail(item)">
                        <van-card
                            :num="item.num"
                            :price="item.money/100"
                            
                            :title="item.orderTitle"
                            :thumb="thumb[item.singlePrice]"
                        />
                    </div>
                </van-panel>
            </van-list> 
        </van-tab>
        <van-tab title="退款" >
            <van-list
                v-model="list[3].loading"
                :finished="list[3].finished"
                finished-text="没有更多了"
                @load="getOrder('allRefundStatus',3)"
                >
                <van-panel :class="item.status" :title="item.createTime"  v-for="item in list[3].items" :key="item.id" :status="status[item.status]">
                    <div @click="gotoDetail(item)">
                        <van-card
                            :num="item.num"
                            :price="item.money/100"
                            
                            :title="item.orderTitle"
                            :thumb="thumb[item.singlePrice]"
                        />
                    </div>
                </van-panel>
            </van-list>    
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { Tabs,Tab, Row, Col, Icon, Cell, CellGroup,Panel,Button,Card,List  } from 'vant';
import img1 from '../../../static/img/detail1.png';
import img2 from '../../../static/img/detail2.png';
export default {
  components: {
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Panel.name]:Panel,
    [Button.name]:Button,
    [Card.name]:Card,
    [List.name]:List 
  },
  data() {
      return {
          list: [{
            items: [],
            loading: false,
            error: false,
            finished: false,
            page:1,
            rows:10,
        }, {
            items: [],
            loading: false,
            error: false,
            finished: false,
            page:1,
            rows:10,
        }, {
            items: [],
            loading: false,
            error: false,
            finished: false,
            page:1,
            rows:10,
        }, {
            items: [],
            loading: false,
            error: false,
            finished: false,
            page:1,
            rows:10,
        }],
        mobile:'',
        active:0,
        //searchData:[],
        status:{
            unpay:'待支付',
            paying:'支付处理中',
            paysuccess:'支付成功',
            refunding:'退款处理中',
            refundsuccess:'退款成功',
            close:'已取消',
            complete:'交易完成',
            partrefund:'部分退款'
        },
        thumb: {
            20000:img1,
            31800:img2
        },
        logoutIf:true
      }
  },
  created() {
      Analyze({
        env_type:'live',
        business_id:'Y31mk',
        event_type:"show",
        element_id:'M32d7',
        element_type:'page',
        element_content:'M32d7',
        current_page_name:document.title,
        current_page_url:location.href,
      });
  },
  mounted() {
      //this.getOrder('',0)
      if(localStorage.getItem('token')){
        this.getUserInfo(localStorage.getItem('token'))
      }
      if(navigator.userAgent.indexOf('smk') > -1){
          this.logoutIf = false
      }
  },
  methods:{
      getUserInfo:async function(token) {
      const res = await this.$http.post('ext/user/info/getUserInfoByToken',{token})
      if(res.code===0){
        this.mobile = res.response.mobile
      }
    },
      gotoDetail(item){
        this.$router.push({path:'/detail',query:{orderNo:item.orderNo}})
      },
      gotoRepay:async function(item) {
          let params = {
            orderNo:item.orderNo,
            token:localStorage.getItem('token'),
        }  
        const res = await this.$http.post('ext/mall/order/secondPay',params)
        if(res.code === 0){
            let info = res.response.orderInfo
            window.location.href=`https://mobilepay.96225.com/exthtml/smkpay-h5/index.html#!/externalWapPay.html?smk_pay=${res.response.orderInfo}`
        }
      
      }, 
      getOrder:async function (status,index) {
        const list = this.list[index]
          let params = {
            status,
            token:localStorage.getItem('token'),
            page:list.page,
            rows:list.rows
        }  
        const res = await this.$http.post('ext/sz/cardOrder/findPageListSzOrder',params)
        if(res.code === 0){
            
            list.loading = false;
            // show error info in second demo
            // if (list.items.length === 10 && !list.error) {
            //     list.error = true;
            // } else {
            //     list.error = false;
            // }
            if(res.response.searchData){
                list.items = [...list.items , ...res.response.searchData]
            }
            if(list.items.length>=res.response.totalNum){
                list.finished = true;
            }else{
                list.page ++;
            }
        } 
      },
      lougot() {
          localStorage.clear()
          this.$router.push('index')
      }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.center
    min-height 101%;
    overflow-y scroll;
.top-head
    display flex
    padding 30px 0 30px 20px
    img 
        width 65px
        height 65px
        margin-right 10px
    .right-head
        flex 1
        display flex   
        flex-direction column
        //align-items left 
        justify-content space-around 
        .logoout
            width 100px
.user {
  &-poster {
    width: 100%;
    height: 53vw;
    display: block;
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
.paysuccess, .refundsuccess ,.close
    .van-panel__header-value
        color #333333 !important

.van-panel__footer {
    text-align: right;
    .van-button {
    margin-left: 5px;
    }
}
.van-panel__content {
    padding: 20px;
}
.van-button--primary
    background-color #43AD7F
.van-button--plain.van-button--primary
    color #43AD7F
    border 1px solid #43AD7F
    background-color #fff !important
</style>