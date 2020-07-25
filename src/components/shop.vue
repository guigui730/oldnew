 <template>
  <div class='shop-item van-hairline--bottom'>
    <img src="" alt="">
    <div class="container">
        <h2>拐杖个人生活自理及防护辅具，标题最多显示2行，显示不下…</h2>
        <h3>适用于下肢肌力减弱或平衡能力略差的…</h3>
        <van-tag color="#E95A27">使用期限2年</van-tag>
        <div class="line">
            <div><span class="tx">150</span>元/支</div>
            <van-icon name="cart-circle" size="24px" color="#0E77FF" />
        </div>
        <router-link class="link" to="/#">
            <van-icon name="shop-o" />
            <span>海王星辰健康药房-春江名苑店铺</span>
            <van-icon name="arrow" />
        </router-link>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import { Tag,Icon } from 'vant';
  export default {
    props: {
        
    },
    methods: {
      
    },
    components:{
      [Tag.name]:Tag ,
      [Icon.name]:Icon ,
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.shop-item
    display flex
    justify-content space-between
    padding .3rem 
    background #fff
    img   
        width 2rem
        height 2rem
        margin-right .3rem
    .container
        h2
            font-size:16px;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height:22px;
            margin-bottom 4px
        h3
            font-size:12px;
            color:rgba(153,153,153,1);
            margin-bottom 4px
        .line
            display flex
            justify-content space-between
            color #999
            font-size:12px;
            margin 8px 0
            .tx
                font-weight:bold;
                font-size:20px;
                color:rgba(255,59,48,1);
        .link
            display flex
            align-items center
            font-size:12px;
            color #999
</style>