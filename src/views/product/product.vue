<template>
	<div>
   	    <div class="banner">
   	    	<img src="../../img/运营用.png" alt="">
   	    </div>
       	<h4>卡伊 荞麦沙琪玛 318g 诉讼香甜卡伊卡伊 荞麦沙琪玛 318g 诉讼香甜...</h4>
       	<div class="product_msg">
       		<div class="price">
        		￥<b>109.00</b><span>￥998.00</span>
        		<br><small>(运费:￥8.00)</small>
        	</div>
        	<button class="query">溯源查询</button>
       	</div>
        <div class="discount">
        	<span>店铺优惠</span>
        	满3件包邮
        </div>
        <div class="shop">
        	<div class="shop_name">
        		<i class="icon iconfont icon-shop"></i>
        		<div>
        			<p>恒之然旗舰店</p>
        			<p class="shopper">店主：HZR1501032</p>
        		</div>       		
        	</div>        	
        	<span class="enter">进入店铺</span>
        </div>
        <div class="hot">       	
        	<h4>热门推荐</h4>
        	<div class="hot_list">
        		<dl>
        			<dt><img src="../../img/conning_06.png" alt=""></dt>
        			<dd class="tit">升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产···</dd>
        			<dd class="pri">￥109.00</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../img/conning_06.png" alt=""></dt>
        			<dd class="tit">升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产···</dd>
        			<dd class="pri">￥109.00</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../img/conning_06.png" alt=""></dt>
        			<dd class="tit">升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产···</dd>
        			<dd class="pri">￥109.00</dd>
        		</dl>
        		<dl>
        			<dt><img src="../../img/conning_06.png" alt=""></dt>
        			<dd class="tit">升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产升元冷面荞麦冷面黑龙江特产···</dd>
        			<dd class="pri">￥109.00</dd>
        		</dl>
        	</div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
       return {

       }
    }
    
}
</script>
<style scoped>

.banner{
  height: 7.5rem;

}
.banner img{
  width:100%;
  height: 100%;
}

h4{
    padding:.15rem 10px;
  font-size: .26rem;
    font-weight: normal;
    background:#fff;
}
.product_msg{
    height: 1.3rem;
    background:#fff;
    display: flex;
    padding:0 10px;
}
.price{
    width:70%;
    color:red;
    line-height: .5rem;
}
.price b{
    font-size: .34rem;
   
}
.price span{
    color: #999;
    text-decoration:line-through;
}
.price small{
    color:#666;
    font-size: .26rem
}
.query{
    width:30%;
    height: .75rem;
    outline: none;
    background: none;
    border:none;
    background: #4F99F2;
    color:#fff;
    font-size: .3rem;
    border-radius: 5px;
    margin-top: .1rem
}
.discount{
    padding:0 10px;
    background:#fff;
    height: .72rem;
    line-height: .72rem;
    margin-bottom: .2rem;
    color:#666;
    font-size: .3rem;
}
.discount span{
    padding:2px;
    color:red;
    font-size: .26rem;
    border-radius: 4px;
    border:1px solid red;
}
.shop{
    height: 1rem;
    padding:.1rem 10px;
    background: #fff;
    margin-bottom: .2rem;
    display: flex;
    justify-content: space-between;
    font-size: .28rem;
    color:#333;
}
.shop_name{
    display: flex;
    
}
.shop_name .icon{
    line-height: .7rem;
    font-size: .7rem;
    color:#FF6D1F;
    margin-right: 6px;
}
.shopper{
    font-size: .24rem;
    color:#666;
}
.enter{
    width:30%;
    margin-top: .06rem;
    height: .7rem;
    color:#333;
    text-align: center;
    font-size: .3rem;
    border-radius: 5px;
    line-height: .68rem;
    border:1px solid #999;
}
.hot h4{
    height: .64rem;
    color: #333;
    text-align: center;
    font-weight: normal;
}
.hot_list{
    padding-left: 10px;
    background: #fff;
    display: flex;
    margin-bottom: .2rem;
    overflow-x:scroll;
}
.hot_list dl{
    margin-right: 4px;
    width: 2rem;
    height: 3.3rem;
}
.hot_list dl dt{
    width: 2rem;
    height: 2rem;
}
.hot_list dl dt img{
    width:100%;
    height: 100%;
}
.hot_list dl .tit{
    width:100%;
    height: .72rem;
    display: box;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp:2;
    -webkit-box-orient:vertical;
}
.hot_list dl .pri{
    text-align: center;
    color:red;
} 	
</style>