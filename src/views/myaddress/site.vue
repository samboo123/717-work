<template>
    <div class="siteModel">
        <tips :active="isShow">删除成功</tips>
        <header class="head">
            <i class="iconfont icon-back" @click="back"></i>
            <span>收货地址</span>
            <i class="iconfont icon-home"></i>
        </header>
        <section>
            <ul class="uls">
                <li v-for='(x,ind) in add_list'>
                    <span class="name_phone">{{x.name}}<b>{{x.phone}}</b></span>
                    <small class="site">{{x.province+' '+x.city+' '+x.site}}</small>
                    <p class="default">
                        <span class="r" :class="{dui:ind==0}" @click="setDefault"><i>✔</i>设为默认</span>
                        <span class="cancel">
                            <span @click="edit(x.id)"><i class="iconfont icon-send"></i>编辑</span>
                            <span @click="remove(x.id)"><i class="iconfont icon-apps"></i>删除</span>  
                        </span>
                    </p>
                </li>
            </ul>
            <button class="add" @click="add">+新增加地址</button>
        </section>
    </div>
</template>

<script>
import token from '../../utils/getcookie.js';
import tips from "../../components/tips.vue";

export default {
    data(){
        return {
            add_list:[],
            isShow:false,
            isChecked:true
        }
    },
    created(){
        //console.log(this.$route.params.id)
        this.$http.post('/get_address_list',{token:token()}).then((res)=>{//请求cookie存入的地址信息
            //console.log(res.data)
            this.add_list=res.data
        })
    },
    components:{
        tips
    },
    methods:{
        add(){
            this.$router.push({name:'editaddress'})//区分、点击传参params,query;用不同路由
        },        
        back(){
            history.go(-1)
        },
        edit(id){
            this.$router.push({name:'editaddress',params:{id:id}})
        },
        remove(id){
            this.$http.get('/remove_delivery_info',{//点击编辑的时候传过来了id
                id:id,
                token:token()
            }).then((res)=>{
                let idx;
                if(res.data=='success'){
                    this.isShow=true;
                    setTimeout(()=>{
                        this.isShow=false;
                    },1000)

                    this.add_list.forEach((item,index)=>{
                        if(item.id==id){
                            idx=index
                        }
                    })
                    this.add_list.splice(idx,1)
                }                
            })
        },
        setDefault(){}
    }
}
</script>

<style scoped>
    .siteModel{
        width:100%;
        height:100%;
        background: #f5f5f5;
    }
    .uls{
        width:100%;
        background: #fff;
    }
    .uls li{
        min-height:2rem;
    }
    .name_phone{
        display:block;
        padding-top:.28rem;
        font-size: .3rem;
        padding-left:.3rem;
    }
    .name_phone b{
        font-weight: normal;
        padding-left:.3rem;
    }
    .site{
        display: block;
        color:#666;
        padding-left:.3rem;
        margin-top:.2rem;
    }
    .default{
        width:100%;
        margin-top:.28rem;
        line-height: .8rem;
        border-top:1px solid #eee;
        padding-left:.3rem;
        display:flex;
        justify-content: space-between;
        padding-right:.2rem;
        color:#666;
    }
    .default .r i{
        display: inline-block;
        font-style:normal;
        width:.5rem;
        height: 0.5rem;
        border-radius:50%;
        margin-right:.2rem;
        border:1px solid #ccc;
        line-height: .5rem;
        text-align: center;
        font-size:0;
        background: #fff;
        color:#666;
    }
    .default .dui i{
        font-size: .3rem;
        background: red;
        color:#fff;
    }
    .cancel i{
        padding:0 .2rem;
    }
    .add{
        width:70%;
        height:.85rem;
        background:red;
        border:none;
        border-radius:.55rem;
        color:#fff;
        font-size:.29rem;
        margin-left: 15%;
        margin-top:.8rem;
        outline: none;
    }
    .head{
        width:100%;
        height:.85rem;
        background: #fff;
        line-height: .85rem;
        display: flex;
        justify-content: space-between;
        padding:0 .3rem;
        border-bottom:1px solid #ccc;
        font-size: 14px;
    }
    .icon-home{
        display: inline-block;
        width:.6rem;
        height: 0.6rem;
        border:1px solid #ccc;
        border-radius:50%;
        text-align: center;
        line-height: .6rem;
        margin-top:5px;
    }
</style>
