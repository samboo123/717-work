<template>
	<div class="shop">
		<header class="head">
			<i class="iconfont icon-back"></i>
			<b>购物车</b>
			<span @click="change_edit">
				{{edit}}
				<i class="iconfont icon-message"></i>
			</span>
		</header>

		<div class="main">
			<div class="cart_main">
				<div class="empt_box" v-if="if_has_items">
					<div class="empt_imgs"><img src="../../img/conning_06.png" alt=""></div>
					<p>购物车为空</p>
					<span @click="go_shopping">去逛逛</span>
				</div>

				<div class="shop_list" v-else>
					<item-comp v-for="x in cart_list" :info="x" :key="x.id" @del-item-id="del"></item-comp>
				</div>
			</div>
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

		<div class="foot">
			<div class="foot_left">
				<div class="btns icon iconfont" :class="{'icon-check':check_all}" @click="selected_all">√</div>
				<span>全选</span>
			</div>
			<div class="foot_right">
				<div class="total">
					<p>
						<span>合计：</span>
						<span class="price_total">{{get_selected}}</span>
					</p>
					<b>运费：0.00</b>
				</div>
				<button type="button" @click="account">{{get_account}}</button>
			</div>
		</div>
	</div>
</template>
<script>
import {mapState,mapGetters,mapMutations} from 'vuex'
import item from './item.vue'
import goods from  '../../components/goods.vue'

export default {
	data() {
		return {
      		if_has_items:true,
     		check_all:false,
     		edit:'编辑',
     		get_account:'结算',
     		is_edit:true,
     		edit_list:[],//
     		hotgoodslist:[]
		}
	},
	created() {
		let cookie=document.cookie.split(';');
		let token;
    	for(let i=0;i<cookie.length;i++){
    		if(cookie[i].indexOf('1505B-token')>-1){
    			token=cookie[i].split('=')[1]
    		}
    	}
    	//console.log(cookie)
    	this.$http.post('/user/Cart/addCart',{token:token}).then((res)=>{
    		console.log(res)
    	})
    	this.$http.post('/mall/index/getGoodsChannel',{channel_id:1}).then((res)=>{
          //  console.log(res.data.data.data)
            this.hotgoodslist=[...res.data.data.data.data]
        })
    },
    components:{
      "item-comp":item,
      'goods':goods
    },
    computed:{
      ...mapState(['cart_list']),
      ...mapGetters(['get_selected']),
    
    },
    methods:{
      selected_all(){
        this.check_all = !this.check_all;
        this.$store.commit('check_all',this.check_all);
        console.log(this.$store.state.cart_list)
      },
      go_shopping(){
      	this.$router.push('/home')
      },
      change_edit(){
      	if(this.is_edit){
      		this.get_account='删除'
      		this.edit='完成'
      		this.is_edit=false
      	}else{
      		this.get_account='结算'
      		this.edit='编辑'
      		this.is_edit=true
      	}
      },
      del(obj){

      	//console.log(obj.id)//编辑完成；选中取消选中；都会触发；if(this.selected)
		this.edit_list.push(obj) 

      },
      account(){
      	if(!this.is_edit){//去删除
      		let arr=[];
      		this.edit_list.forEach((item,index)=>{
      			//console.log(item.selected)
      			//if(item.selected){
      				arr.push(item.id)
      			//}
      		})
      		this.delete_item(arr)
      	}else{//去结算

      	}
      },
      ...mapMutations(['delete_item'])
    },
    mounted(){
      if(this.cart_list.length>0){
        this.if_has_items = false
      } 
    }
}
</script>
<style scoped>
.shop {
	background: #f5f5f5;
    display:flex;
    flex-direction: column;
    width:100%;
    height:100%;

}

.head {
	width: 100%;
	height: 0.88rem;
	line-height: 0.88rem;
	display: flex;
	justify-content: space-between;
	border-bottom: 1px solid #eee;
	padding: 0 8px;
	text-align: center;
	flex-shrink: 0;
	font-size: 0.22rem;
  
}

.head span i {
	padding-left: 10px;
}

.head b {
	padding-left: 28px;
	font-weight: normal;
}

.main {
	width: 100%;
    flex:1;
	overflow: hidden;
	overflow-y: auto;
}

.bottom {
	width: 100%;
	height: .7rem;
	line-height: .8rem;
	font-size: 0.3rem;
	color: #666;
	text-align: center;
}

.empt_box {
	width: 100%;
	height: 6.2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background: #fff;
	flex-direction: column;
	margin-bottom:10px;
}

.empt_imgs {
	width: 1.36rem;
	height: 1.36rem;
}

.empt_imgs img {
	display: block;
	width: 100%;
}
.empt_box span{
	border:1px solid red;
	padding:5px 8px;
	margin-top:8px;
	border-radius:5px;
	color:red
}
.empt_box p{
	line-height: 30px;
	color:#666;
}

.foot {
	width: 100%;
	height: 1rem;
	background: #fff;
	border-top: solid 0.02rem #e5e5e5;
	border-bottom: solid 0.02rem #e5e5e5;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 0.2rem;
}

.foot_left {
	display: flex;
	flex-shrink: 0;
}

.foot_left span {
	font-size: 0.32rem;
	color: #333;
}

.foot_right button {
	width: 2.55rem;
	height: 100%;
	display: block;
	background: #fc4141;
	font-size: 0.32rem;
	color: #fff;
	outline: none;
	border: none;
	flex-shrink: 0;
}

.foot_right {
	display: flex;
	height: 100%;
	justify-content: flex-end;
	align-items: center;
}

.total {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 0 0.3rem;
}

.total b {
	font-weight: normal;
	font-size: 0.24rem;
	display: block;
	color: #666;
}

.total p {
	color: #333;
	font-size: 0.28rem;
	display: flex;
}

.price_total {
	color: #fc4141;
}

.total p span {
	display: block;
	line-height: 0.4rem;
}

.shop_list {
	width: 100%;
}
.btns {
	width: 0.45rem;
	height: 0.45rem;
	font-size: 0.36rem;
	line-height: 0.42rem;
	border: solid 0.02rem #cccccc;
	border-radius: 50%;
	overflow: hidden;
	text-align: center;
	color: #fff;
	margin-right: 0.12rem;
}
.icon-check {
	background: #fc4141;
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
</style>
