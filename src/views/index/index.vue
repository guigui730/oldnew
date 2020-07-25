<template>
  <div class="index">
    <form class="search-warp" action="/">
      <span class="address">上城区</span>
      <van-search 
        class="search" 
        v-model="value" 
        shape="round"
        placeholder="搜索你需要的商品热门关键词" 
      />
    </form>
    <van-tabs :ellipsis="false">
      <van-tab v-for="item in selesctBar" :key="item" :title="item" >
        <div class="list" v-if="selesctBar.length">
          <shop v-for="item in selesctBar" :key="item" />
        </div>
        <van-empty v-else description="没有找到相关商品/店铺" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Shop from './../../components/shop.vue'

import {
  Search ,
  Tab,
  Tabs ,
  Empty
} from 'vant';
export default {
  components: {
    [Search.name]:Search,
    [Tabs.name]:Tabs,
    [Tab.name]:Tab,
    [Empty.name]:Empty,
    Shop
  },
  created() {
    
  },
  mounted() {
   
  },
  data() {
    return{
      value:'',
      selesctBar:['全部','个人移动辅具','个人生活自理及防护辅具','矫形器','沟通和信息生活类辅具','生活辅助']
    }
  },
  methods: {
 
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.index
  .search-warp
    display flex
    align-items center
    .search
      flex 1
    .address
      width 50px
      font-size:12px;
      color:rgba(51,51,51,1);
      text-align center

</style>