<template>  
    <div class="detail">
       	<div class="head">
       		   <i class="icon iconfont icon-back"  @click="back_home">返回</i>
       		   <ul>
       		       <router-link :to="{name:'product'}" tag="span"><li>商品</li></router-link>
       		       <router-link :to="{name:'pro_detail'}" tag="span"><li>详情</li></router-link>
       		   </ul>
       		   <i class="icon iconfont icon-message"><span class="rolk"></span></i>
       	</div>
        <div class="content">
          <router-view></router-view> 
        </div>             
        <div class="foot">
           	<div class="i_sel">
           		<i class="icon iconfont icon-people"></i>
           		<sub>客服</sub>
           	</div>
           	<div class="i_sel">
           		<i class="icon iconfont icon-cart"><span class="roll">1</span></i>
           		<sub>购物车</sub>
           	</div>
           	<span class="add">加入购物车</span>
           	<span class="buy">立即购买</span>
        </div> 
    </div>   
</template>
<script>
export default {
    props:[],
    data() {
        return {
           
        }
    },
    methods:{
    	back_home:function(){
        this.$router.push({name:"home"})
      }
    }
}
</script>
<style scoped>
.detail{
	width:100%;
	height: 100%;
	overflow: hidden;
  background: #eee;
  display: flex;
  flex-direction: column;
}

.head{
	//margin-top: .4rem;
	height: .88rem;
	line-height: .88rem;
	display: flex;
	justify-content: space-between;
	padding:0 10px;
	font-size: .34rem;
	background:#fff;
	border-bottom: 1px solid #eee;
}
.head ul{
	width:30%;
    display: flex;
    justify-content: space-between;
}
.head ul li{
	color:#333;	
}
.router-link-active{
	border-bottom: 2px solid #000;
}
.head .icon{
	font-size: .34rem;
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
}



.foot{
	height: 1.1rem;
	line-height: 1.1rem;
    text-align: center;
    display: flex;
    background: #f6f6f6;
}
.i_sel{
    width:15%;
    display: flex;
    flex-direction: column;
}
.i_sel i{
    height: .4rem;
    line-height: .88rem;
    font-size: .5rem;
    position: relative
}
.i_sel .roll{
	position: absolute;
	right:15%;
	top:10%;
	width:.3rem;
	height: .3rem;
	text-align: center;
	line-height: .3rem;
	font-size: .22rem;
	color:#fff;
	border-radius: 50%;
	background: red;
}
.i_sel sub{
    font-size: .22rem;
    line-height: .94rem;
}
.add,.buy{
    width:35%;
    font-size: .3rem;
    
    color:#fff;
}
.add{   
    background: #FE8282;
}
.buy{   
    background: #FC4141;
}


</style>

