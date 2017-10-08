import axios from 'axios'
import AxiosAdapter from 'axios-mock-adapter'

let mocker=new AxiosAdapter(axios);

function random(min, max) {
    return Math.floor(Math.random() * max - min)+min
}
let timer;
function delay(data) {
    return function(){
        return new Promise(function (resolve, reject) {
            timer = setTimeout(() => {
                resolve([200, data])
                clearTimeout(timer)
            }, random(1000, 5000))
        })
    }
}
function delay2(data){
	return new Promise(function (resolve, reject) {
        timer = setTimeout(() => {
            resolve([200, data])
            clearTimeout(timer)
        }, random(1000, 5000))
    })
}
//首页商品列表
import getGoodsChannel from '../server/getGoodsChannel.json'

mocker.onPost('/mall/index/getGoodsChannel').reply(200,{
	channel_id:1,
	data:getGoodsChannel
})
mocker.onPost('/mall/index/getGoodsChannel').reply(200,{
	channel_id:2,
	data:getGoodsChannel
})
mocker.onPost('/mall/index/getGoodsChannel').reply(200,{
	channel_id:3,
	data:getGoodsChannel
})


//请求购物车数据
mocker.onPost('/cart/list').reply((config)=>{	
	let token=JSON.parse(config.data).token
	//console.log(token)
	if(localStorage.getItem('cart-info-list')){
		return [200,JSON.params(localStorage.getItem('cart-info-list')).token]
	}else{
		return [200,'没有信息，是否需要登录']
	}	
})
//购物车
import addCart from '../server/addCart.json';

//mocker.onPost('/user/Cart/addCart',{key_code:123,goods_id:123}).reply(200,addCart)
mocker.onPost('/user/Cart/addCart').reply((config)=>{
	//	//模拟本地存储
	let params=JSON.parse(config.data)
	let user_token=params.token;
	let cart_info={};
	let ls=window.localStorage;
	if(!ls.getItem('cart-info-list')){
		cart_info[user_token]=[]
	}else{
		cart_info=JSON.parse(ls.getItem('cart-info-list'))
	}
	if(cart_info[user_token]){
		cart_info[user_token].push(params.goods_info)
	}else{
		cart_info[user_token]=[...(params.goods_info)]
	}
	
	ls.setItem('cart-info-list',JSON.stringify(cart_info))
	return [200,addCart]
})


//请求分类页的数据
import category from '../server/product.json';
//let timer;
mocker.onPost('/h5/mtop.relationrecommend.wirelessrecommend.recommend').reply(function(){
	return new Promise(function(resolve,reject){
        timer=setTimeout(()=>{
			resolve([200,category])
			clearInterval(timer)
		},2000)
	})
})
//域名'http://www.lb717.com'

//模拟接口
//验证码获取
mocker.onPost('/verifycode').reply(config=>{
	//console.log(config)//config是axios请求时携带过来的数据
	let phone=JSON.parse(config.data).pn

	return [200,phone.slice(-4)]
})
//注册
mocker.onPost('/register').reply(config=>{
	//console.log(config)
	let register_info=JSON.parse(config.data);

	let ls=window.localStorage;
	let register_arr=[];

	if(!ls.getItem('register_info')){//没有记录
		register_arr.push(register_info)
	}else{
		register_arr=JSON.parse(ls.getItem('register_info'))
		register_arr.push(register_info)
	}
	
	ls.setItem('register_info',JSON.stringify(register_arr))
//[{"pn":"15810265285","vc":"5285","pd":"123"},{"pn":"15810265805","vc":"5805","pd":"456"}]
	return [200,'success']
})

//登录
mocker.onPost('/login').reply(config=>{
	//console.log(config)
	
	let login_info=JSON.parse(config.data);//Object {login_pn: "15810265285", login_pd: "5285"}
	//console.log(login_info)
	let ls=window.localStorage;
	let register_arr=JSON.parse(ls.getItem('register_info'));
let flag=false;
	register_arr.forEach((v,i)=>{
		if(v.phone_number===login_info.login_phone_number && v.password===login_info.login_password){
			flag=true;
		}
	})
	if(flag){
		//return [200,1]
		return [200,{
            token:login_info.login_pn
        }]
	}else{
		return [500,'账户或密码有误！']
	}
	
})

//请求全国各省份地区信息
import address_info from '../server/address.json';
mocker.onPost('/get_address_info').reply(delay(address_info))

//新加邮寄地址
mocker.onPost('/add_new_address').reply((config)=>{
	//console.log(config.data)
	let params=JSON.parse(config.data)
	let ls=window.localStorage;
	if(ls.getItem('address_list')){
		let add_list=JSON.parse(ls.getItem('address_list'));
		params.id = (add_list[params.token].length+1);
		add_list[params.token].push(params);
		ls.setItem('address_list',JSON.stringify(add_list))//////
	}else{
		let obj={};
		params.id=1;
		obj[params.token]=[params];
		ls.setItem('address_list',JSON.stringify(obj))
	}
	

	return [200,1]
})
//请求邮寄地址列表
mocker.onPost('/get_address_list').reply((config)=>{
	//console.log(config.data)//post情况==>let token = config.token;
	let token=JSON.parse(config.data).token;
	//console.log(token)
	let ls=window.localStorage;
	let add_list=JSON.parse(ls.getItem('address_list'));
	return [200,add_list && add_list[token]]
})

//编辑邮寄地址信息
mocker.onGet('/edit_delivery_info').reply(config=>{
	let delivery_id=config.id;
	//return [200,delivery_id]
	let token=config.token;

	let ls=window.localStorage;
	let user_list=JSON.parse(ls.getItem('address_list'))[token];

	let res=[];
	if(user_list){
		user_list.forEach(item=>{
			if(item.id==delivery_id){
				res=item
			}
		})
	}
	return new Promise(function (resolve, reject) {
        let timer = setTimeout(() => {
            resolve([200, res])//这里返回什么message.vue里就接受什么
            clearTimeout(timer)
        }, random(1000, 3000))
    })	
})
//删除邮寄地址信息

mocker.onGet('/remove_delivery_info').reply(config=>{
	let delivery_id=config.id;
	//return [200,delivery_id]
	let token=config.token;

	let ls=window.localStorage;
	let delivery_list=JSON.parse(ls.getItem('address_list'));
	let user_list=delivery_list[token];

	let delivery_index;
	if(user_list){
		user_list.forEach((item,index)=>{
			if(item.id==delivery_id){
				delivery_index=index
			}
		})
	}
	user_list.splice(delivery_index,1);
	delivery_list[token]=user_list;

	ls.setItem('address_list',JSON.stringify(delivery_list))

	return new Promise(function (resolve, reject) {
        let timer = setTimeout(() => {
            resolve([200, 'success'])//这里返回什么message.vue里就接受什么
            clearTimeout(timer)
        }, random(1000, 3000))
    })	
})
