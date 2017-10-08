import Vue from 'vue'
import VueRouter from 'vue-router'
import entry from '../views/index/entry.vue'
import home from '../views/home/home.vue'
import cart from '../views/cart/cart.vue'
import mine from '../views/mine/mine.vue'
import search from '../views/search/search.vue'
import result from '../views/result/result.vue'
import category from '../views/category/category.vue'
import detail from '../views/detail/detail.vue'
import product from '../views/product/product.vue'
import pro_detail from '../views/pro_detail/pro_detail.vue'
import login from '../views/login/login.vue'
import settings from '../views/settings/settings.vue'
import myorder from '../views/myorder/myorder.vue'
import myaddress from '../views/myaddress/site.vue'
import editaddress from '../views/editaddress/message.vue'
//import community from '../views/community/search.vue'

Vue.use(VueRouter);

let routes = [
    {
        path:'*',
        redirect:'/entry/home'
    },
   /* {
        path:'/entry/category',
        redirect:'/entry/category/0'
    },*/
    {
        name:'entry',
        path:'/entry',
        component:entry,
        children:[
            {
                name:'home',
                path:'home',
                component:home
            },
            {
                name:'category',
                path:'category/:index?',
                component:category
            },
            {
                name:'cart',
                path:'cart',
                component:cart
            },
            {
                name:'mine',
                path:'mine',
                component:mine
            },
            /*{
                name:'community',
                path:'/community',
                component:community
            },*/
            {
                name:'search',
                path:'search',
                component:search
            },
            {
                name:'result',
                path:'result',
                component:result
            }
        ]
    },
    {
        path:'/detail',
        redirect:'/detail/product'
    },
    {
        name:'detail',
        path:'/detail',
        component:detail,
        children:[
            {
                name:'product',
                path:'product',
                component:product
            },
            {
                name:'pro_detail',
                path:'pro_detail',
                component:pro_detail
            }
        ]
    },
    {
        name:'login',
        path:'/login',
        component:login
    },
    {
        name:'settings',
        path:'/settings',
        component:settings
    },
    {
        name:'myorder',
        path:'/myorder',
        component:myorder
    },
    {
        name:'myaddress',
        path:'/myaddress',
        component:myaddress
    },
    {
        name:'editaddress',
        path:'/editaddress/:id?',
        component:editaddress
    },
]

const router = new VueRouter({
    routes
})

router.beforeEach(function(to,from,next){
    if(to.name=='login'){
        next()
        return;
    }
    if(to.name=='mine'){
        let meta = to.matched.some((info)=>{info.meta.username});
        
        let cookie_list = document.cookie.split(';')
        let token=null;
        for(let i=0;i<cookie_list.length;i++){
            if(cookie_list[i].indexOf('1505B-token')>-1){
                token=cookie_list[i].split('=')[1]
                //console.log(token)//15810265285、、默认登录
            }
        }       
        if(!token){
            next({
                path:'/login'
            })
        }else{
            next()
        }
    }else{
        next()   
    }    
})


export default router