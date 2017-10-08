<template>
    <transition>
        <div class="tips" v-if="active"><slot></slot></div>
    </transition>
</template>
<script>
export default {
    props:['active'],
    data() {
        return {
           
        }
    },
    
}
</script>
<style>
    .tips{
        color:#fff;
        font-size:.24rem;
        background:rgba(0,0,0,.7);
        border-radius: 2px;
        width:80%;
        height: .88rem;
        line-height:.88rem;
        text-align: center;
        position: fixed;
        left:50%;
        top:50%;
        transform:translate3d(-50%,-50%,0);
    }
    .v-enter,.v-leave-to{
        opacity: 0
    }
    .v-leave,.v-enter-to{
        opacity: 1
    }
    .v-enter-active,.v-leave-active{
        transition: all 1s linear
    }
</style>

