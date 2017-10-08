<template>

    <div class="mask" :class="{'active':isActive}">
      <h1><img src="../img/loading.gif" ></h1>
    </div>

</template>
<script>
  export default {
    name:'mask-view',
    props:['isActive']
  }
</script>
<style scoped>
    .mask{
      position: absolute;
      width:100%;
      height: 100%;
      top:0;
      left:0;
      background:#19224F;
      color:#fff; 
      display: none;      
      vertical-align: center;
      justify-content: center; 
    }
    .active{
    	//display: flex;
      display:block;
    }
</style>