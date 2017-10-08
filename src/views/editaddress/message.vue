<template>
    <div class="message">
        <tips :active="isShow">{{dialog_info}}</tips>
        <header class="head">
            <i class="iconfont icon-back" @click="back"></i>
            <span>收货地址</span>
            <i class="iconfont icon-home"></i>
        </header>
        <section>
            <input type="text" placeholder="收货人姓名" v-model="name" ref='name'>
            <input type="text" placeholder="手机号" v-model="phone">
            <div class="select">
                <select v-model="province">
                    <option value="">请选择省</option>
                    <option v-for="x in province_list" :value="x.name">{{x.name}}</option>
                    
                </select>
                <select v-model="city">
                    <option value="">请选择市</option>
                     <option v-for="x in city_list" :value="x.name">{{x.name}}</option>
                </select>
            </div>

            <select class="district" v-model="area">
                <option value="">请选择区</option>
                 <option v-for="x in area_list" :value="x">{{x}}</option>
            </select>
            <input type="text" placeholder="详细地址" v-model="site">
            <span class="default"><i>√</i>设为默认地址</span>
            <button class="save" @click="save">保存</button>
        </section>
        <loading :isActive="isActive"></loading>
    </div>
</template>

<script>
import tips from "../../components/tips.vue";
import loading from "../../components/loadings.vue";
import token from '../../utils/getcookie.js'
//不能直接返回取到的token值,而在运行时再获取,否则会出现缓存问题

export default {
    data() {
        return {
            name:"",
            phone:"",
            site:"",
            isShow:false,
            isActive:false,
            dialog_info:'',
            province:'',
            city:'',
            area:'',
            province_list:[],
            city_list:[],
            area_list:[]
        }
    },
    components:{
        tips,
        loading
    },
    created(){
        //console.log(this.$route.params.id)
        this.isActive=true;
        //点击新添地址进入
        let get_address_info=new Promise((resolve,reject)=>{
            this.$http.post('/get_address_info').then((res)=>{//请求全国各省份地区信息
                resolve(res.data)
            })
        })
        //点击编辑进入
        let edit_address_info=new Promise((resolve,reject)=>{
        //utils.js?e2b2:108 Uncaught (in promise) Error: Request failed with status code 
            let id=this.$route.params.id;
            this.$http.get('/edit_delivery_info',{//点击编辑的时候传过来了id
                id:id,
                token:token()
            }).then((res)=>{
                resolve(res.data)
            })
        })
        Promise.all([get_address_info,edit_address_info]).then((res)=>{
            this.province_list=res[0];
            //console.log(res[1])
            this.isActive=false;

            this.name=res[1].name;
            this.phone=res[1].phone;
            this.site=res[1].site;
            this.province=res[1].province;
            this.city=res[1].city;
            this.area=res[1].area;

        })
        


       /* this.$http.post('/get_address_info').then((res)=>{
           // console.log(res)
            this.province_list=res.data;
            this.isActive=false;
        })*/
    },
    watch:{
        'province':function(n){
            //console.log(n)
            let list=this.province_list;
            if(list.length>0){
                list.forEach((item)=>{
                    if(item.name==n){
                        this.city_list=item.city
                    }
                })
            }
        },
        'city':function(n){
            console.log(n)
            let list=this.city_list;
            if(list.length>0){
                list.forEach((item)=>{
                    if(item.name==n){
                        this.area_list=item.area
                    }
                })
            }
        }
    },
    methods: {
        back() {
            history.go(-1)
        },
        dialog(info){          
            this.isShow=true;
            setTimeout(()=>{
               this.isShow=false;
            },1500)  
            this.dialog_info=info;       
        },
        save(){
            let reg_phone=/^1[34578]\d{9}$/;
            let that=this; 
            if(!this.name){                 
                this.$modal.show({
                    title:'这是title',
                    info:'这是提示信息',
                    callback:function(){
                        that.$refs.name.focus()
                    }
                })              
                //this.dialog("请输入姓名")
                return        
            }
            if(!this.phone || !reg_phone.test(this.phone)){
                this.dialog("手机号输入有误")
                return 
            }
            if(!this.province){
                this.dialog("请选择省份")
                return 
            }
            if(!this.city){
                this.dialog("请选择城市")
                return 
            }
            if(!this.area){
                this.dialog("请选择区")
                return 
            }
            if(!this.site){
                this.dialog("请填写详细地址")
                return 
            }
            this.$http.post('/add_new_address',{
                name:this.name,
                phone:this.phone,
                province:this.province,
                city:this.city,
                area:this.area,
                site:this.site,
                token:token()
                
           // is_edit://判断是编辑还是新添
            }).then((res)=>{
                console.log(res)
            })
            this.$router.replace("/myaddress")
           
        },
    }
}
</script>

<style scoped>

.default{
    display: block;
    padding-left:.3rem;
    margin-top:.3rem;
}
.default i{
    font-style: normal;
    display: inline-block;
    width:.5rem;
    height: 0.5rem;
    line-height: .5rem;
    text-align: center;
    border:1px solid #ccc;
    border-radius:50%;
    margin-right:.2rem;
    color:#fff;
    background:red;
}
.save{
    width:60%;
    height:.8rem;
    background: red;
    border:none;
    border-radius:.45rem;
    color:#fff;
    font-size: .32rem;
    margin-left: 20%;
    margin-top:.6rem;
    outline: none;
}
.message {
    width: 100%;
    height: 100%;
    background: #eee;
}

.head {
    width: 100%;
    height: .85rem;
    background: #fff;
    line-height: .85rem;
    display: flex;
    justify-content: space-between;
    padding: 0 .3rem;
    border-bottom: 1px solid #ccc;
    font-size: 14px;
    background: #fff;
}

.icon-home {
    display: inline-block;
    width: .6rem;
    height: 0.6rem;
    border: 1px solid #ccc;
    border-radius: 50%;
    text-align: center;
    line-height: .6rem;
    margin-top: 5px;
}

section {
    width: 100%;
}

input {
    width: 92%;
    background: #fff;
    border: none;
    height: .8rem;
    margin-left: 5%;
    margin-top: .3rem;
    padding-left: .2rem;
}

select {
    width: 40%;
    height: .7rem;
    border: none;
    padding-left:.2rem;
}
.select{
    display:flex;
    justify-content: space-between;
    padding:0 .3rem;
    margin-top:.28rem;
}
.district{
    width:90%;
    margin-left:5%;
    margin-top:.28rem;
}
</style>
