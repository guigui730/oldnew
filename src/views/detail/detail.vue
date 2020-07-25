<template>
  <div class="detail-wp">
    <div class="top">
        <p class="status">
            <van-icon color="#ffffff" size="18px" :name="iconStatus[detail.status]" />
            <span class="text">{{status[detail.status]}}</span>
        </p>
        <p v-if="detail.status === 'unpay'" class="time">{{date}}</p>
    </div>
    <van-panel >
        <div>
            <van-card
                :num="detail.money/detail.singlePrice"
                :price="detail.singlePrice/100"
                :title="detail.orderTitle"
                :thumb="thumb[detail.singlePrice]"
                @click="gotopage"
            />
        </div>
        <div slot="header"></div>
    </van-panel>
    <van-panel >
        <div>
            <div class="cell cell-top">
                <div>商品总额</div>
                <div>¥{{detail.money/100}}</div>
            </div>
            <div class="cell">
                <div >领取方式</div>
                <div class="red">凭取件码至指定网点领取</div>
            </div>
        </div>
        <div slot="footer" class="footer-cell">
            订单总额：<span class="red">¥{{detail.money/100}}</span>
        </div>
        <div slot="header"></div>
    </van-panel>
    <van-cell-group>
        <van-cell title="订单信息" />
        <van-cell title="下单时间" :value="detail.createTime"  />
        <van-cell title="订单编号" :value="detail.orderNo"  />
        <van-cell v-for="(item,index) in childOrder" :key="item.id" :title="'子订单'+(index+1)" >
            <div slot="default">
                <div>
                    <span>{{item.orderDetailNo}}</span>
                    <span>{{cardStatus[item.status + item.cardStatus]}}</span>
                </div>
                <div class="right-value" v-if="item.cardStatus === 'paysuccess' || item.cardStatus === 'getcode'">
                    <van-button v-if="!item.cardCode" type="primary" size="small" round @click="getCode(item,index)">获取取件码</van-button>
                    <span class="code" v-if="item.cardCode">取件码{{item.cardCode}}</span>
                    <van-button type="default" size="small" round @click="backSure(item)">退款</van-button>
                </div>   
            </div>
        </van-cell>    
    </van-cell-group>
    <p class="tip">如有疑问请拨打96225</p>
    <van-row class="footer" v-if="detail.status==='unpay'">
        <van-col span="12">
            <van-button type="default"  square size="large" @click="closeOrderBefore(item)" >取消订单</van-button>
        </van-col>
        <van-col span="12">
            <van-button type="primary"  square size="large" @click.stop="gotoRepay(item)" >去支付</van-button>
        </van-col>
    </van-row>
  </div>
</template>

<script>
import { Tabs,Tab, Row, Col, Icon, Cell, CellGroup,Panel,Button,Card } from 'vant';
import img1 from '../../../static/img/detail1.png';
import img2 from '../../../static/img/detail2.png';
import { clearInterval, setTimeout } from 'timers';

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
    [Card.name]:Card
  },
  created(){
    this.getDetail()
  },
  mounted(){
        this.getChildOrder()     
        Analyze({
            env_type:'live',
            business_id:'Y31mk',
            event_type:"show",
            element_id:'M32d8',
            element_type:'page',
            element_content:'M32d8',
            current_page_name:document.title,
            current_page_url:location.href,
        });
  },
  destroyed(){
      if(this.timer){
        clearInterval(this.timer)   //这边有错误
      }
  },
  data() {
      return {
          date:'...',
          detail:{},
          childOrder:[],
          iconStatus:{
            unpay:'clock',
            paying:'clock',
            paysuccess:'checked',
            refunding:'checked',
            refundsuccess:'clear',
            close:'clear',
            complete:'checked',
            partrefund:'more'
          },
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
          cardStatus:{
            unpayunpay:'待支付',
            refundingrefund:'退款处理中',
            refundsuccessrefund:'已退款',
            completegetcard:'已领卡',
            paysuccessgetcode:'已获取码',
            paysuccesspaysuccess:'待领卡',
            closeclose:'已关闭',
            closeunpay:'已关闭',
          },
          active:0,
          thumb: {
            20000:img1,
            31800:img2
          }
      }
  },
  methods:{
      countdown(){
        
        let _this = this
        // 计算时分秒数
        let d = this.detail.payTime
        const end = (new Date(d.replace(/-/g,'/'))).getTime() + 45 * 60 * 1000
            // 当前时间戳
        const now = (new Date()).getTime()
            // 相差的毫秒数
        const msec = end - now  
        
        let day,hr,min,sec
        if (msec>=0) {  
                day = Math.floor(msec/1000/60/60/24);  
                hr = Math.floor(msec/1000/60/60%24);  
                min = Math.floor(msec/1000/60%60);  
                sec = Math.floor(msec/1000%60); 

                hr = hr > 9 ? hr : '0' + hr
                min = min > 9 ? min : '0' + min
                sec = sec > 9 ? sec : '0' + sec                    
        } else{
            hr = '00'
            min = '00'
            sec = '00'
            if(this.timer){
                this.getDetail()
            }      
        }
        // 控制台打印
        //console.log(`${day}天 ${hr}小时 ${min}分钟 ${sec}秒`)
        this.date = `00:${min}:${sec}`     
      },
      
      getChildOrder:async function() {
          let orderNo = this.$route.query.orderNo
          let params = {
            orderNo,
            token:localStorage.getItem('token'),
        }  
        const res = await this.$http.post('ext/sz/cardOrder/findListForSzOrderDetail',params)
        if(res.code === 0){
            this.childOrder = res.response
        }
      },
      getCode:async function(item,index) {
            let params = {
                detailNo:item.orderDetailNo,
                token:localStorage.getItem('token'),
            }  
            const res = await this.$http.post('ext/sz/cardOrder/getCardCodeFromSzCard',params)
            if(res.code === 0){
                let childOrder = this.childOrder
                childOrder[index].cardCode = res.response
                this.childOrder = [...childOrder]
                this.getDetail()
            }else{
                this.$alert({
                    content:res.msg
                })
                this.getDetail()
            }
      },
      backSure(item) {
        this.$confirm({
                content:`退款金额：¥${item.totalMoney/100}`,
                btnText:['取消','确定'],
                successCallBack:() => this.returnBack(item)
        })
      },
      returnBack:async function(item) {
          let params = {
                orderDetailNo:item.orderDetailNo,
                token:localStorage.getItem('token'),
            }  
            const res = await this.$http.post('ext/sz/cardOrder/refund',params)
            if(res.code === 0){
                this.$alert({
                    content:'退款成功！'
                })
                this.getDetail()
                this.getChildOrder()
            }else{
                this.$alert({
                    content:res.msg
                })
                this.getDetail()
                this.getChildOrder()
            }
      },
      gotoRepay:async function() {
          let params = {
            orderNo:this.detail.orderNo,
            token:localStorage.getItem('token'),
        }  
        const res = await this.$http.post('ext/mall/order/secondPay',params)
        if(res.code === 0){
            let info = res.response.orderInfo
            window.location.href=`https://mobilepay.96225.com/exthtml/smkpay-h5/index.html#!/externalWapPay.html?smk_pay=${res.response.orderInfo}`
        }else{
            this.$alert({
                content:res.msg
            })
            this.getChildOrder()
        }
      },
      closeOrderBefore() {
            this.$confirm({
                content:'取消订单？',
                btnText:['取消','确定'],
                successCallBack:() => this.closeOrder()
            })
      },
      closeOrder:async function() {
        let params = {
            orderNo:this.detail.orderNo,
            token:localStorage.getItem('token'),
        }  
        const res = await this.$http.post('ext/mall/order/closeOrder',params)
        if(res.code === 0){
            this.$alert({
                content:'取消订单成功！'
            })
            this.getDetail()
        }else{
            this.$alert({
                content:res.msg
            })
            this.getChildOrder()
        }
      },
      getDetail:async function(){
          let _this =this
          let orderNo = this.$route.query.orderNo
          let params = {
            orderNo,
            token:localStorage.getItem('token'),
        }  
        const res = await this.$http.post('ext/sz/cardOrder/loadSzOrderByOrderNo',params)
        if(res.code === 0){
            this.detail = res.response
            if(res.response.status !== 'unpay'){
                clearInterval(this.timer)
            }
            if(res.response.status === 'unpay'){
                this.timer = setInterval(() => {
                    _this.countdown()
                }, 1000)
            }
        }
      },
      gotopage(){
          this.$router.push({name:'index'})
      }
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.detail-wp{
    background #F6F6F6
    height 101%
    overflow-y scroll
    padding-bottom 40px
}
.top 
    background url("./top.png") no-repeat;
    background-size 100% auto;
    height 88px;
    text-align center
    color #fff
    font-size 16px
    display flex
    align-items center
    justify-content center
    flex-direction column
    .status
        display flex
        align-items center
        justify-content center
        font-weight bold
        .text
            margin-left 4px
    .time
        font-size 12px
        margin-top 8px        
.tip
    color #888888;
    font-size 14px
    text-align center
    margin-top 15px
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
.van-cell
    display inline-block
    .van-cell__title
        display inline-block
        width 30%
    .van-cell__value
        display inline-block
        width 70%    
.cell
    display flex
    justify-content space-between
    font-size 14px 
    color #111
    .red
        color #F5222D
.right-value
    margin-top 10px
    .code
        color #1890FF
        font-size 14px
        display inline-block
        padding 4px
        border-radius 4px
        background #F0F8FF
        margin-bottom 8px
.cell-top
    margin-bottom  20px
.footer-cell 
    padding 8px 0
    color #111
    font-size 16px
    .red
        color #F5222D
        font-weight bold
.footer 
    position fixed
    left 0
    right 0
    bottom 0
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
</style>