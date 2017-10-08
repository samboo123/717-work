<template>
 	<div class="mine">
		    <div class="head">
       		<i class="icon iconfont icon-settings" @click="go_settings"></i>
       		<p>我的717商城</p>
       		<i class="icon iconfont icon-message"><span class="rolk"></span></i>
       	</div>
       	<div class="content">
       		<div class="head_pic">
       			<div class="headpic">
       				<img src="../../img/headpic.png" alt="">
       			</div>	   
       			<p>717123212247</p>   			
       		</div>
       		<div class="myshop">
       			<p><i class="icon iconfont icon-shop"></i><i class="mr">我的店铺</i></p>
				<b>></b>
       		</div>
       		<ul class="cont_list">
       			<li>
       				<i class="icon iconfont icon-pay"></i>
       				<sub>待付款</sub>
       			</li>
       			<li>
       				<i class="icon iconfont icon-send"></i>
       				<sub>待发货</sub>
       			</li>
       			<li>
       				<i class="icon iconfont icon-deliver"></i>
       				<sub>待收货</sub>
       			</li>
       			<li>
       				<i class="icon iconfont icon-refund"></i>
       				<sub>售后</sub>
       			</li>
       			<li @click="go_myorder">
       				<i class="icon iconfont icon-form"></i>
       				<sub>我的订单  ></sub>
       			</li>
       		</ul>
       		<ul class="sel_list">
       			<li>
       				<p><i class="icon iconfont icon-form"></i>账户余额</p><b>></b>
       			</li>
       			<li @click="go_myaddress">
       				<p><i class="icon iconfont icon-list"></i>地址管理</p><b>></b>
       			</li>
       			<li>
       				<p><i class="icon iconfont icon-people"></i>我的服务</p><b>></b>
       			</li>
       		</ul>
       		<div class="hot">
       			<h4>热门推荐</h4>
       			<div class="hometownCon">                        
				          
                <goods v-for="item in hotgoodslist" :key="item.id" :items="item"
                        :obj_data='item.obj_data' 
                        :goods_name='item.goods_name' 
                        :price='item.discount_price'
                        :id='item.goods_id'
                     >                   
                </goods> 
               
            </div>      
            <div class="load_bottom">到底了噢~~</div>  
       		</div>
       	</div>	
       	<!-- <tips-comp :active="isShow">添加购物车成功</tips-comp> -->
  	</div>

</template>
<script>

import goods from  '../../components/goods.vue'
//import tips from '../../components/tips.vue'
import router from '../../routes/router.config'
export default {
  	data(){
  		return {
            hotgoodslist: [],
            //isShow:false
        }
  	},
  	components:{
  		'goods':goods
  	},
  	methods:{
  		go_settings(){
  			this.$router.push('/settings')
  		},
      go_myaddress(){
        this.$router.push('/myaddress')
      },
      go_myorder(){
        this.$router.push({name:'myorder'})
      }
  	},
    created() {
        this.$http.post('/mall/index/getGoodsChannel',{channel_id:1}).then((res)=>{
          //  console.log(res.data.data.data)
            this.hotgoodslist=[...res.data.data.data.data]
        })
    },
  	beforeRouteEnter:function(to,from,next){
  		//console.log(to.name)
  		
  		//router.push('/login')
  		
  		next()
  	}
}
</script>
<style scoped>
.mine{
	width:100%;
	height: 100%;
	overflow: hidden;
  background: #eee;
  display: flex;
  flex-direction: column;
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
	color:#333;	
}
.router-link-active{
	border-bottom: 2px solid #000;
}
.head .icon{
	font-size: .4rem;
	text-align: center;
}
.head .icon-message{
	font-size: .4rem;
	position: relative;
}
.head .icon-message .rolk{
	position: absolute;
	right:2%;
	top:18%;
	width:.16rem;
	height: .16rem;
	text-align: center;
	line-height: .3rem;
	font-size: .22rem;
	color:#fff;
	border-radius: 50%;
	background: red;
}
.content {
    overflow-y: scroll;
    flex: 1;
    background: #eee;
}

.head_pic{
  padding-top: .15rem;
  height: 2rem;
  background: url(../../img/mine_bg.png);
  background-size: cover;
  color:#fff;
  text-align: center;
}
.headpic{
	width: 1.24rem;
	height: 1.24rem;
	border-radius: 50%;
	margin:0 auto;	
}
.headpic img{
	width:100%;
	height: 100%;
}
.head_pic p{
	height: .6rem;
	line-height: .5rem;
	font-size: .26rem;
}
.myshop{
	height: 1.7rem;
	line-height: 1.7rem;
	font-size: .36rem;
	color:#FB3434;
	display: flex;
	justify-content: space-between;
	padding:0 10px;
	background: #fff;
	border-bottom: 1px solid #eee;
}
.myshop p{
  display: flex;
}
.myshop .icon{
  line-height: 1.8rem;
  font-size: .9rem;
  color:#FB3434;
  margin-right:8px; 
}
.myshop .mr{
  display: inline-block;
  line-height: 1.8rem;
  font-style:normal;
}
.myshop b{
	line-height: 1.7rem;
}
.cont_list{
	display:flex;
	text-align: center;
	background: #fff;
	border-bottom: 1px solid #eee;
	margin-bottom: .2rem;
	padding-top: .2rem;
}
.cont_list li{
	width:20%;
	height: 1.3rem;
	background: #fff;
	display: flex;
	flex-direction: column;
	font-size: .28rem;
	color:#333;
}
.cont_list li .iconfont{
	font-size: .5rem;
}
.sel_list{
	padding:0 10px;
	background: #fff;
	margin-bottom: .2rem;
}
.sel_list li{
	height: 1rem;
	line-height:1rem;
	border-bottom: 1px solid #eee;
	display: flex;
	justify-content: space-between;
	color:#333;
	font-size: .3rem;
}
.sel_list li .iconfont{
	font-size: .46rem;
	margin-right: 5px;
}
.hot{
	background:#fff;
}
.hot h4{
    height: .7rem;
    line-height:.7rem;
    color: #333;
    text-align: center;
    font-weight: normal;
    font-size: .3rem;
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
       height: .82rem;
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
	line-height:1rem;
	background: #eee;
	color:#666;
	text-align: center;
}
</style>
