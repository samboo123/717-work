<template>
    <div class="wrap">
	   	<div class="settings">
	        <div class="head">
	            <i class="icon iconfont icon-back" @click="back_mine"></i>
	            <p>设置</p>
	            <span></span>
	        </div>	        
      	    <ul class="sel_list">
		      	<li>
		      		<p>我的头像</p>
		      		<div class="right">
		      			<div class="headpic">
	       					<img src="../../img/headpic.png" alt="">
	       				</div>
	       				<b>></b>
		      		</div>
		      	</li>
		      	<li>
		      		<p>用户名</p>
		      		<div class="right">路飞<b>></b></div>
		      	</li>
		      	<li>
		      		<p>我的二维码名片</p>
		      		<div class="right">
		      			<div class="code">
	       					<img src="../../img/headpic.png" alt="">
	       				</div>
	       				<b>></b>
		      		</div>
		      	</li>
	        </ul>
			<div class="exit">
          		<span @click="exitNow">退出登录</span>
        	</div>
	    </div>
    </div>
</template>
<script>

//import tips from '../../components/tips.vue'

export default {
  	data(){
  		return {
          
        }
  	},
  	components:{
  		
  	},
    methods:{
      back_mine(){

        this.$router.push({name:'mine'})
      },
      exitNow(){
      	let cookie=document.cookie
      	//console.log(cookie)
		function setCookie(cname, cvalue, exdays) {  
		    var d = new Date();  
		    d.setTime(d.getTime() + (exdays*24*60*60*1000));  
		    var expires = "expires="+d.toUTCString();  
		    document.cookie = cname + "=" + cvalue + "; " + expires;  
		}
        setCookie('1505B-token','',-1);  
  
      	this.$router.replace({name:'login'})
      }   
    },
    beforeRouteEnter:function(to,from,next){
    	//console.log(to.name)
  		/*if(to.name=='mine'){
  			next()
  		}*/
  		//console.log(from.name)
  		//router.push('/login')
  		next()
  	}
}
</script>
<style scoped>
.wrap{
    width:100%;
    height: 100%;
}
.settings{
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
	font-size: .34rem;
	background:#fff;
	border-bottom: 1px solid #eee;
    margin-bottom: .2rem;
}
.head p{
	text-align: center;
	color:#333;	
}
.head .icon{
	font-size: .32rem;
	text-align: center;
}

.sel_list {
  overflow-y: scroll;
  background: #eee;
  padding:0 10px;
  background: #fff;
}


.sel_list li{
  height: 1.04rem;
  line-height:1.04rem;
  border-bottom: 1px solid #eee;
  color:#333;
  font-size: .32rem;
  display: flex;
  justify-content: space-between;
}
.sel_list li .iconfont{
  font-size: .5rem;
}
.right{
	display: flex;
}
.right b{
	margin-left: 10px;
}
.sel_list li:first-child{
	height: 1.44rem;
	line-height:1.44rem;
}
.headpic{
	width: 1.3rem;
	height: 1.3rem;
	border-radius: 50%;
	border: 1px solid #ccc;
	margin-top: .07rem;
}
.code{
	width: .5rem;
	height: .5rem;
	margin-top: .1rem;
}
.headpic img,.code img{
	width:100%;
	height: 100%;
}
.exit{
    padding-top: 1rem;
}
.exit span{
  display: block;
  width:80%;
  margin:0 auto;
  background:#F02424;
  color:#fff;
  font-size: .36rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: .5rem;
  box-shadow: 1px 3px 3px 0px #FD7E7E;
}
</style>
