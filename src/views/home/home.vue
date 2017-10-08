<template>
    <div>
        <header>
            <div class="header">
                <div class="logo717"></div>
                <i class="icon iconfont icon-search"></i>
                <input type="text" @focus="go_to_search" placeholder="请输入您要购买的商品">
                <div class="head-icon">
                    <div class="head-icon-shop">
                        <em class="icon iconfont icon-shop"></em>
                        <sub>我的店铺</sub>
                    </div>
                </div>
            </div>            
        </header>
        <main ref="main" @scroll="can_req && loading_more()">
            <div class="main_totle">
                <div class="banner">
                    <div class="swiper-container">
                        <ul class="swiper-wrapper">
                            <li class="swiper-slide"><img src="../../img/安全食品banner.png" alt=""></li>
                            <li class="swiper-slide"><img src="../../img/家乡味道.png" alt=""></li>
                            <li class="swiper-slide"><img src="../../img/安全食品banner.png" alt=""></li>
                            <li class="swiper-slide"><img src="../../img/家乡味道.png" alt=""></li>
                            <li class="swiper-slide"><img src="../../img/安全食品banner.png" alt=""></li>
                        </ul>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>       
                <div class="nav-list">
                    <ul class="pic-list">
                        <li><i></i><sub>家乡味道</sub></li>
                        <li><i></i><sub>进口食品</sub></li>
                        <li><i></i><sub>牛奶乳品</sub></li>
                        <li><i></i><sub>茶果冲引</sub></li>
                        <li><i></i><sub>休闲零食</sub></li>
                        <li><i></i><sub>米面粮油</sub></li>
                        <li><i></i><sub>调味调料</sub></li>
                        <li><i></i><sub>酒水新料</sub></li>                        
                    </ul>
                    <!-- <div class="news">
                        <div class="news-h">商城<br>动态</div>
                        <div class="news-list">
                            <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心 无公害 无污染 无添加 天然有机蔬菜源头吃的放心</p>
                        </div>
                    </div> -->
                    <div class="news">
                        <div class="news-h">商城<br>动态</div>
                        <div class="news-list">
                          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                            <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心 无公害 无污染 无添加 天然有机蔬菜源头吃的放心</p>
                            <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心 无公害 无污染 无添加 天然有机蔬菜源头吃的放心</p>
                            <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心 无公害 无污染 无添加 天然有机蔬菜源头吃的放心</p>
                            <p>绿色无公害 无污染 无添加 天然有机蔬菜源头吃的放心 无公害 无污染 无添加 天然有机蔬菜源头吃的放心</p>
                          </div> 
                        </div>                                             
                    </div>                    
                </div>           
                <div class="cont-list">
                    <div class="dayday">
                        <i class="icon iconfont icon-shop"></i>
                        <h1>天天特惠</h1>
                        <span>每天都有惊喜</span>
                        <b>更多 ></b>
                    </div>
                    <div class="daydayCon">
                        <div class="daydayCon_left">
                            <img src="../../img/1486717244775.jpg" alt="">
                        </div>
                        <div class="daydayCon_right">
                            <div class="daydayCon_righTop">
                                <img src="../../img/dayday1_03.png" alt="">
                            </div>
                            <div class="daydayCon_righBot">
                                  <img src="../../img/dayday2_03.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="hometown">
                        <h1> <i class="icon iconfont icon-shop"></i>家乡味道</h1>
                        <b>更多 ></b>
                    </div>
                    <div class="hometownCon">                        
                        <goods-comp v-for='item in goods_list' :key='item.id'
                            :obj_data='item.obj_data' 
                            :goods_name='item.goods_name' 
                            :price='item.discount_price'
                            :id='item.goods_id'
                            @tips-active="toShow"
                        >
                        </goods-comp>                            
                    </div>      
                    <div class="load_bottom">{{load_bottom}}</div>                   
                </div>
            </div>
        </main>
        <tips-comp :active="isShow">添加购物车成功</tips-comp>
    </div>
</template>
<script>
import axios from 'axios';
import goods from  '../../components/goods.vue'
import tips from '../../components/tips.vue'
//import '../../lib/swiper.css'
var infiniteScroll = require('vue-infinite-scroll');
var count=0;
export default {
    name: 'home',
    data() {
        return {
            goods_list:[],
            load_bottom:'loading...',
            can_req:true,
            channel_id:1,
            isShow:false,
            data: [],
            busy: false
        }
    },
    components:{
        'goods-comp':goods,
        'tips-comp':tips
    },
    directives: {infiniteScroll},
    created(){
        axios.post('/mall/index/getGoodsChannel',{channel_id:this.cha}).then((res)=>{
          //  console.log(res.data.data.data)
            this.goods_list=[...res.data.data.data.data]
        })
    },
    methods:{
        toShow(data){
            if(data){
                this.isShow=true
            }else{
                this.isShow=false
            }
        },
        go_to_search(){
            this.$router.push({name:'search'})
        },
        loading_more(){
            const main=this.$refs.main,
                  main_scrTop=main.scrollTop,
                  main_height=main.offsetHeight,
                  total_height=main.querySelector('.main_totle').offsetHeight;
                 
            if((total_height-main_height-main_scrTop)<20){
                this.can_req=false;
                if(this.channel_id>3){
                    this.load_bottom="我是有底线的"
                }else{               
                  setTimeout(()=>{
                      axios.post('/mall/index/getGoodsChannel',{channel_id:this.channel_id}).then((res)=>{
                          this.channel_id++;                       
                          this.goods_list=[...this.goods_list,...res.data.data.data.data]
                          //if this.channel_id>3 return ;
                          this.can_req=true;
                      })
                  },1500)    
                }            
            }
        },
        loadMore: function() {
          this.busy = true;
          setTimeout(() => {
            for (var i = 0, j = 10; i < j; i++) {
              this.data.push({ name: count++ });
            }
            this.busy = false;
          }, 1000);
        }
    },
    mounted:function(){
        new Swiper('.swiper-container',{
            autoplay:2000,
            pagination:'.swiper-pagination'          
        })
    }
}
</script>
<style scoped>
    .wrap{
        width:100%;height: 100%;overflow: hidden;
        display: flex; flex-direction: column;
        background: #eee;
    }
    a{
        color:#fff;
    }
    header{
        height: .88rem;
        padding-left: .1rem;
        background: #fff;
    }
    .header{ 
        height: 100%;
        display:flex;       
    }
    header input{
        flex:5;
        height: .5rem;
        outline: none;
        border:none;
        background: #F5F5F5;
        margin-top: .2rem;
        border-radius: 2px;
        padding-left: .6rem;
    }
    header i{
      position: absolute;
      left:1.8rem;
      top:.2rem;
    }
    .logo717{        
        flex:2;
        background:url(../../img/logo717.png) no-repeat 60% 60% ;
        background-size: contain;
    }
    .head-icon{
        margin-top: .06rem;
        margin-right: .2rem;
        margin-left: .1rem;
        //flex:3;
        display:flex;
    }
    .head-icon div{
        flex:1;
        display: flex;
        flex-direction: column;
        text-align: center;
        color:#FC4141;
    }
    .head-icon .icon{
        height: 0.5rem;
        line-height: 0.5rem;
        font-size:0.46rem;   
    }
    .head-icon sub{
        height: .3rem;
        line-height: .2rem;
        font-size:.14rem;
        overflow: hidden;
    }
    .banner{
        width:100%;
        margin-bottom: .1rem;
        height: 3.5rem;
    }
    .swiper-container{
        width:100%;
        height: 100%;
    }
    .swiper-slide{
        width:100%;
    }
    .swiper-slide img{
        width:100%;
        height: 100%;
    }
    .swiper-pagination{
        height: .1rem;
    }

 
    main{
        flex: 1;
        width:100%;
        overflow: hidden;
        overflow-y:scroll;
    }


    .nav-list{
        margin-bottom: .1rem;
        background: #fff;
        padding-top: .1rem;
    }
    .pic-list{
        display: flex;
        flex-wrap:wrap;
        height:3rem ;      
    }
    .pic-list li{
        width:25%;
        display: flex;
        flex-direction: column;
        text-align: center;
    }
    .pic-list li i{
        margin:0 auto;
        height: .9rem;
        width:.9rem;
        background: url(../../img/lis_1.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(2) i{
        background: url(../../img/lis_2.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(3) i{
        background: url(../../img/lis_3.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(4) i{
        background: url(../../img/lis_4.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(5) i{
        background: url(../../img/lis_5.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(6) i{
        background: url(../../img/lis_6.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(7) i{
        background: url(../../img/lis_7.png) no-repeat;
        background-size: cover;
    }
    .pic-list li:nth-child(8) i{
        background: url(../../img/lis_8.png) no-repeat;
        background-size: cover;
    }
    .pic-list li sub{
        height: .45rem;
        line-height: .45rem;
        font-size:.22rem;

    }
    .news{
        background: #fff;
        display: flex;
        padding:0 .1rem .1rem .3rem ;
    }
    .news-h{
        flex:1;
        color:#FF8124;
        font-size: .32rem;
        line-height: .4rem;
    }
    .news-list{
        padding:0 .06rem;
        flex:8;
        height: .9rem;
        border:1px solid #eee;
        color:#666;
        border-radius: 5px;
        line-height: .4rem;
        overflow: hidden;
    }
    .cont-list{
        background: #fff;
    }
    

 .dayday {
     width: 100%;
     display: flex;
     background: #fff;
     margin-top: .15rem;
     line-height: .7rem;
     color: #f65c38;
     position: relative;
 }

 .dayday i {
     border: .01rem solid #f65c38;
     border-radius: 50%;
     width: .4rem;
     line-height: .4rem;
     text-align: center;
     height: .4rem;
     display: inline-block;
     margin-left: .2rem;
     margin-top: .15rem;
 }

 .dayday h1 {
     font-size: .35rem;
     padding-left: .1rem;
 }

 .dayday span {
     padding-left: .1rem;
     font-size:.22rem;
 }

 .dayday b {
     position: absolute;
     right: .2rem;
     color: #666;
 }

 .daydayCon {
     display: flex;
     width: 100%;
     margin-top: .2rem; 
 }

 .daydayCon_left {
     flex: 1;
 }

 .daydayCon_right {
     flex: 1;
 }

 .daydayCon img {
     width: 100%;
     height: auto
 }

 .daydayCon_left img {
     width: 95%;
     height: 84%;
 }
 .hometown{
     margin-top: -.5rem;
     background: #fff;
     height: .7rem;
     line-height: .7rem;
     color: #f69057;
     position: relative;
     font-weight: normal;   
 }
   .hometown h1{
        text-align: center;       
   }
  .hometown b{
     position: absolute;
     right: .3rem;
     top: 0;
  }
  .hometownCon {
       display: flex;
       flex-wrap: wrap;
  }
 
  .hometownCon dl{
       width:48%;
       margin-left: 1%;
  }
  .hometownCon dl dt{
       width:100%;
       height: 3.6rem;
  }  
  .hometownCon dl dt img{
       width: 100%;
       height: 100%;
  }
  .hometownCon dl dd{
       height: 1.5rem;
  }
  .hometownCon dl dd h5{
       font-weight: normal;
       width: 95%;
       padding-left: 2.5%; 
       height: .8rem;
       display: box;
       display: -webkit-box;
       overflow: hidden;
       text-overflow: ellipsis;
       -webkit-line-clamp:2;
       -webkit-box-orient:vertical;
  }
   .hometownCon dl dd p{
       position: relative;

   }
  .hometownCon dl dd p span{
        color: red;
        font-size: .3rem;
        padding-left: 2.5%;
        padding-bottom: .2rem;
  }
   .hometownCon dl dd p i{
        position: absolute;
        right: .1rem;
        top:0;
   }

    .load_bottom{
        height: 1rem;
        line-height: 1rem;
        text-align: center;
        background: #fff;
        font-size: .22rem;      
    }

</style>

