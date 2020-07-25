<template>
  <div class="confirm">
    <van-card
        :num="num"
        :price="price[cardType]"
        desc="48小时尊享卡可免费领取伴手礼一份"
        :title="`苏州转转卡-${type[cardType]}`"
        :thumb="imageURL[cardType]"
      />
    <van-submit-bar
        :loading="loading"
        :price="price[cardType] * num * 100"
        button-text="提交订单"
        @submit="onClickButton"
      />
  </div>
</template>

<script>
import {
  Card,
  SubmitBar,
} from 'vant';
import img1 from '../../../static/img/detail1.png';
import img2 from '../../../static/img/detail2.png';

export default {
  components: {
    [Card.name]: Card,
    [SubmitBar.name]: SubmitBar,
  },
  data() {
    return {
      num:1,
      loading:false,
      price:{
        Z1:200,
        Z2:318
      },
      type:{
        Z1:'24小时卡',
        Z2:'48小时卡',
      },
      cardType:'Z1',
      imageURL:{
        Z1:img1,
        Z2:img2
      }
    };
  },
  created() {
    let params = this.$route.params
    const { num,cardType } = params
    
    this.num = num
    this.cardType = cardType

    Analyze({
      env_type:'live',
      business_id:'Y31mk',
      event_type:"show",
      element_id:'M32d5',
      element_type:'page',
      element_content:'M32d5',
      current_page_name:document.title,
      current_page_url:location.href,
    });
  },
  destroyed(){
    this.loading = false
  },
  methods:{
    onClickButton:async function () {
      this.loading = true
      let params = {
        cardType:this.cardType,
        num:this.num,
        token:localStorage.getItem('token')
      }  
      const res = await this.$http.post('ext/sz/cardOrder/createOrder',params)
      if(res.code === 0){
        let info = res.response.orderInfo
        location.replace(`https://mobilepay.96225.com/exthtml/smkpay-h5/index.html#!/externalWapPay.html?smk_pay=${info}`)
      }else{
        this.$alert({
          content:res.msg
        })
        this.loading = false
      }
      Analyze({
        env_type:'live',
        business_id:'Y31mk',
        event_type:"click",
        element_id:'M32d6',
        element_type:'button',
        element_content:'M32d6',
        current_page_name:document.title,
        current_page_url:location.href,
      });
    } 
  }
};
</script>

<style lang="stylus" scoped>
.confirm
  background #F6F6F6
  min-height 100%
.van-card
  background #fff
  .card__footer {
    padding-top: 10px;
  }
  .card__tags {
    .van-tag {
      margin-right: 5px;
    }
  }
.van-button--danger {
  background-color: #43AD7F;
  border: 1px solid #43AD7F
}  
</style>