<template>
    <dl @click="go_detail">
      <dt>
         <img :src="'http://www.lb717.com/'+obj_data" alt="">
      </dt>
      <dd>
         <h5>{{goods_name}}</h5>
         <p><span>￥{{price}}</span><i class="icon iconfont icon-cart " @click.stop="addCart"></i></p>
      </dd>
    </dl>     
</template>
<script>
import token from '../utils/getcookie'
export default {
    props:['obj_data','goods_name','price','id'],
    data() {
        return {
           
        }
    },
    methods:{ //goods_info是提供给后台的信息
        addCart:function(){
          this.$http.post('/user/Cart/addCart',{
            goods_info:{
            id:this.id,
            price:this.price
            },token:token
          }).then((res)=>{
            if(res.data==1){

              let data = {
                  id:this.id,
                  price:this.price,
                  goods_name:this.goods_name,
                  count:1,
                  obj_data:this.obj_data,
                  selected:false
              }

              this.$store.commit('add_to_cart',data)

              this.$emit('tips-active',true)
            }
            setTimeout(()=>{
              this.$emit('tips-active',false)
            },3000)
          })
        },
        go_detail:function(){
          this.$router.push({name:'detail',query:{
            id:this.id
          }})
        }
    }
    
}
</script>
<style>
 dl dt img{
       width:100%;
       height: 3.6rem;
  }    
/*  dl dd{
       height: 1.5rem;
  }
    dl dd h5{
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
  } */
    dl dd p{
      position: relative;
   }
   dl dd p span{
        color: red;
        font-size: .3rem;
        padding-left: 2.5%;
        padding-bottom: .2rem;
  }
    dl dd p i{
        position: absolute;
        right: .1rem;
        top:0;
   } 
</style>

