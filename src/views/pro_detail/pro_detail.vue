<template>
	<div>
      <div class="product_cont">
        <div class="cont_left">
          <p>生产许可证号：66666666</p>
          <p>品名：巧罗</p>
          <p>商品条形码：666666666666</p>
          <p>保质期：9个月</p>
          <p>包装方式：瓶装</p>
        </div>
        <div class="con_right">
          <p>品牌：榛子巧克力酱</p>
          <p>生产厂家：上海巧罗上海巧罗食品有限公司</p>
          <p>重量：320g</p>
          <p>贮藏方式：阴凉干燥</p>
        </div>
      </div>
      <div class="img_list">
        <img src="../../img/pic2.gif" alt="">
        <img src="../../img/pic2.gif" alt="">
        <img src="../../img/pic2.gif" alt="">
        <img src="../../img/pic2.gif" alt="">
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

.product_cont{
	padding-top: 1rem;
	height: 2.1rem;
	padding:0 10px;
	line-height: .4rem;
	color:#666;
	font-size: .22rem;
	display: flex;
	justify-content: space-between;
}
.cont_left{
	width:60%;
}
.cont_right{
	width:40%;
}
.img_list img{
	width:100%;
	height: 5.3rem;
}
</style>