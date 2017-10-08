<template>
   <div class="search-yu">
    <div class="heads">
      <span class="icon iconfont icon-search"></span>
          <input class="search-box" type="text" v-model="search_val" placeholder="请输入您查找的商品"><button class="btn1" @click="search">搜索</button>
      </div>
      <div class="remove">
      最近搜索
      <span class="icon iconfont icon-search"></span>
      </div>  
      <p class="records" v-if="no_cookie">暂无搜索记录...</p>
      <ul class="Recent-search" v-if="!no_cookie">
        <li v-for='(val,i) in sear_list' :key="i">{{val}}</li>
      </ul> 
      <div class="everyones">
        大家都在搜
      </div>
      <ol class="everyone">
        <li>蜂蜜</li>
        <li class="on">三黄鸡</li>
        <li>红酒</li>
        <li>红枣</li>
        <li>蜂蜜</li>
        <li>三黄鸡</li>
        <li class="on">红酒</li>
      </ol>            
   </div>
 
</template>
<script>
export default {
  data(){
    return {
      no_cookie:false,
      search_val:'',
      sear_list:[]
    }
  },
  methods:{
    search:function(){
      let search_val=this.search_val;
      if(!search_val) return;

      let arr=[];
      let ls=window.localStorage;
      if(ls.getItem('search-res')){
        arr=[...JSON.parse(ls.getItem('search-res'))]
      }
      arr.push(search_val)

      ls.setItem('search-res',JSON.stringify(arr));

      this.$router.push({name:'result'},search_val)
    }
  },
  created(){
    let sear=window.localStorage.getItem('search-res');
    //console.log(typeof sear)
    if(!sear){
      this.no_cookie=true
    }else{
      this.sear_list=[...JSON.parse(sear)]
      this.no_cookie=false
    }
  }
}
</script>
<style scoped>
.search-yu{
  width: 100%;
  height:100%;
  overflow: hidden;         
}
.heads{
  width: 100%;
  height: .70rem;
  position: relative
}
.heads .icon{
  position: absolute;
  top: .15rem;
  left: .5rem;
}
.search-box{
  outline:none;
  width:75%;
  height: 80%;
  background:#f6f6f6; 
  border:0;
  margin-top: 2%;  
  margin-left: 6%;
  text-indent: .6rem; 
  border-radius: 3%;
  font-size: .23rem;
}
.ico-s{
  position: absolute;
  left: 9%;
  top:36%;
}
.btn1{
  width: 50px;
  height: 80%;
  border:0;
  background: #f6f6f6;
  margin-left: 5px;
  font-size: .22rem;
}
.remove{
  width: 100%;
  height: .60rem;
  font-size: .22rem;  
  line-height:.60rem;
  text-indent: 5.5%;    
}
.remove-iconfont{
  position: absolute;
  right:5%;
  font-size: .25rem;
  top:7%;
}
.Recent-search{
  width: 100%;
  height: 1.8rem; 
}
.Recent-search li{
  width: 70px;
  height: .6rem;
  border:1px solid #ccc;
  border-radius: 5px;
  float: left;
  margin-top: 2%; 
  margin-left: 18px;
  text-align: center;
  line-height: .6rem;
  font-size: .24rem;
  color:#333;
}
.records{
  padding-left: 20px;
  height: .7rem
}
.everyone{
  width: 100%;
  height: 1.8rem; 
}
.everyone li{
  width: 70px;
  height: .6rem;
  border:1px solid #ccc;
  border-radius: 5px;
  float: left;
  margin-top: 2%; 
  margin-left: 18px;
  text-align: center;
  line-height: .6rem;
  font-size: .24rem;
  color:#666
}
.on{
  color:#fd7171;
  border:#fd7171;
}
.everyones{
  width: 100%;
  height: .60rem;
  font-size: .22rem;  
  line-height:.60rem;
  text-indent: 5.5%;   
}
 

</style>

