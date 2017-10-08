<template>
    <div class="myorder">
      <div class="head">
        <router-link tag="span" :to="{path:'/entry/mine'}"><  返回</router-link>
        <p>我的订单</p>
        <router-link tag="span" class="icon iconfont icon-home" :to="{name:'home'}"></router-link>
      </div>
      <nav class="navbar">
            <router-link :to="{name:'myorder'}" tag="span" class="underline">全部</router-link>
            <router-link :to="{name:'myorder'}" tag="span">待付款</router-link>
            <router-link :to="{name:'myorder'}" tag="span">待发货</router-link>
            <router-link :to="{name:'myorder'}" tag="span">待收货</router-link>
            <router-link :to="{name:'myorder'}" tag="span">售后</router-link>
      </nav>
      <div class="main">
            <div class="show_myorder">
                <p v-if="has_order">
                    您还没有相关的订单
                </p>
                <div v-else class="all_order">
                    <div>订单一</div>
                    <div>订单二</div>
                    <div>订单三</div>
                </div>
            </div>

            <div class="hot">
                <h4>热门推荐</h4>
                <div class="hotCon">
                    <goods v-for="item in hotgoodslist" :key="item.id" :items="item"
                            :obj_data='item.obj_data' 
                            :goods_name='item.goods_name' 
                            :price='item.discount_price'
                            :id='item.goods_id'
                         >                   
                    </goods> 
                </div>
            </div>
      </div>
    </div>
</template>
<script>
import goods from "../../components/goods.vue"
export default {   
    data() {
        return {
            hotgoodslist: [],
            has_order:true
        }
    }, 
    components: {
        goods:goods
    },
    created() {
        this.$http.post('/mall/index/getGoodsChannel',{channel_id:1}).then((res)=>{
          //  console.log(res.data.data.data)
            this.hotgoodslist=[...res.data.data.data.data]
        })
    }
}
</script>
<style scoped>
.myorder {
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background:#eee 
}

.head{
    height: .88rem;
    line-height: .88rem;
    display: flex;
    justify-content: space-between;
    padding:0 10px;
    font-size: .36rem; 
    background:#fff;
    border-bottom: 1px solid #eee;
}
.head p{
    text-align: center;
    
}
.head span:nth-of-type(1) {
    font-size: .32rem;
}

.head span:nth-last-of-type(1) {
    font-size: .42rem;
}
.navbar {
    display: flex;
    height: .8rem;
    margin-top: 2px;
    background: #fff;
    border-bottom: 1px solid #eee;
}
.navbar span {
    width: 20%;
    font-size: .3rem;
    color:#666;
    line-height: .8rem;
    text-align: center;
}

.navbar .underline{
    color:#F38B8B;
    border-bottom:1px solid #F38B8B;
}

.main {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;
}

.show_myorder {
    background: #fff;
    line-height: 3rem;
    font-size: .3rem;
    color:#666;
    margin-bottom: .1rem;
}

.show_myorder p{
    text-align: center;
}

.all_order {
    line-height: 1.2rem;
    padding-left: 20px;
}

.hot h4{
    height: .7rem;
    line-height:.7rem;
    color: #333;
    text-align: center;
    font-weight: normal;
    font-size: .3rem;
    background:#fff;
    margin-bottom: .15rem;
}

  .hotCon {
    width:100%;
    display: flex;
    flex-wrap: wrap;
  }
 
  .hotCon dl{
       width:48%;       
       margin-left: 1%;
  }
  .hotCon dl dt{
       height: 3.6rem;
  }
  .hotCon dl dt img{
      width: 100%; 
     height: 100%;
  }
/*   .hotCon dl dd{
     height: 1.5rem;
}
.hotCon dl dd h5{
     font-weight: normal;
     width: 95%;
     padding-left: 2.5%; 
     height: .82rem;
     min-height: .82rem;
     display: box;
     display: -webkit-box;
     overflow: hidden;
     text-overflow: ellipsis;
     -webkit-line-clamp:2;
     -webkit-box-orient:vertical;
}
 .hotCon dl dd p{
    position: relative;
 }
.hotCon dl dd p span{
      color: red;
      font-size: .3rem;
      padding-left: 2.5%;
      padding-bottom: .2rem;
}
 .hotCon dl dd p i{
      position: absolute;
      right: .1rem;
      top:0;
 } */


</style>


