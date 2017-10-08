<template>
   
    <div class="result">       
        <div class="heads">
          <span class="icon iconfont icon-back" @click="back_search"></span>
          <input class="search-box" type="text" placeholder="请输入您查找的商品">
          <span class="icon iconfont icon-search"></span>
        </div> 
        <main>
        	搜索结果页...
        </main>       
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
    	back_search(){
    		this.$router.push({name:'search'})
    	}
    }
}
</script>
<style scoped>
.result{
  width: 100%;
  height:100%;
  overflow: hidden;         
}
.heads{
  width: 100%;
  height: .9rem;
  position: relative;
  padding-bottom: .15rem;
  border-bottom:1px solid #eee;
}
.heads .icon-search{
  position: absolute;
  top: .2rem;
  left: 1.2rem;
} 
.heads .icon-back{
  position: absolute;
  top: .2rem;
  left: 0.4rem;
}
.search-box{
  outline:none;
  width:80%;
  height: 80%;
  background:#f6f6f6; 
  border:0;
  margin-top: 2%;  
  margin-left: 14%;
  text-indent: .6rem; 
  border-radius: 3%;
  font-size: .23rem;
}
</style>

