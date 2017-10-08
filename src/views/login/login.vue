<template>
  <div class="loading">
   	<div class="login" v-if="isLogin">
      <div class="head">
        <i class="icon iconfont icon-back" @click.stop="back_home"></i>
        <p>登录会员</p>
        <span @click="go_register">注册</span>
      </div>
      <div class="content">
        <ul class="int_list">
          <li>
            <i class="icon iconfont icon-people"></i><input type="text" v-model="login_phone_number" placeholder="请输入您的手机号">
          </li>
          <li>
            <i class="icon iconfont icon-form"></i><input type="text" v-model="login_password" placeholder="请输入您的密码">
          </li>
        </ul>
        <div class="loadbtn">
          <span @click="login">立即登录</span>
        </div>
      </div>
    </div>
    <div class="register" v-else>
      <div class="head">
        <i class="icon iconfont icon-back" @click="back_home"></i>
        <p>注册会员</p>
        <span @click="go_login">登录</span>
      </div>
      <div class="content">
        <ul class="int_list">
          <li>
            <i class="icon iconfont icon-people"></i><input type="text" v-model.trim="phone_number" placeholder="请输入您的手机号">
          </li>
          <li class="certify">
           <i class="icon iconfont icon-apps"></i><input type="text" v-model.trim="verify_code" placeholder="请输入验证码">
           <span  class="get_certify" @click="get_verifycode">获取验证码</span>
         </li>
          <li>
            <i class="icon iconfont icon-form"></i><input type="text" v-model.trim="password" placeholder="请输入您的密码">
          </li>
        </ul>
        <div class="certain">
          <span @click="register">确定</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

//import tips from '../../components/tips.vue'

export default {
  	data(){
  		return {
          isLogin:true,
          phone_number:'',
          verify_code:'',
          password:'',
          login_phone_number:'',
          login_password:'',
        }
  	},
  	components:{
  		
  	},
    methods:{
      back_home(){
        this.$router.push('/home')
      },
      go_register(){
        this.isLogin=false
      },
      go_login(){
        this.isLogin=true
      },
      get_verifycode(){
        this.$http.post('/verifycode',{pn:this.phone_number,vc:this.verify_code}).then((params)=>{//把输入的数据通过二参{}传出去
          console.log(params)
        })
      },
      register(){
        this.$http.post('/register',{pn:this.phone_number,vc:this.verify_code,pd:this.password}).then((params)=>{
          //console.log(params)//Object {status: 200, data: "success", headers: undefined, config: Object}
          this.isLogin=true
          /*if(params.data=='success'){//不是注册成功就跳我的页面
            this.$router.push('/mine')
          }*/
        })
      },
      login(){
        this.$http.post('/login',{//登录方式，登录设备..登陆成功存了cookie
          login_pn:this.login_phone_number,
          login_pd:this.login_password
        }).then((res)=>{
          /*if(res.data==1){
            this.$router.push({name:'mine'})
          }*/
          //console.log(res.data);//{token: "15810265285"}
          document.cookie = "1505B-token="+res.data.token
          //token是登陆成功后提供给后台的账户和密码,后台预存后返回给客户端一个令牌,以备下次直接登录
          this.$router.push({name:'mine'})
        })
      }
    }
}
</script>
<style scoped>
.loading{
  width:100%;
  height: 100%;
}
.login,.register{
	width:100%;
	height: 100%;
	overflow: hidden;
  background: #eee;
  display: flex;
  flex-direction: column;
}
.head{
	height: .88rem;
	line-height: .88rem;
	display: flex;
	justify-content: space-between;
	padding:0 10px;
	font-size: .34rem;
	background:#fff;
	border-bottom: 1px solid #eee;
  margin-bottom: .2rem;
}
.head p{
	text-align: center;
	color:#333;	
}
.head span{
  font-size: .26rem;
  color:#F02424;
}
.head .icon{
	font-size: .32rem;
	text-align: center;
}

.content {
  overflow-y: scroll;
  flex: 1;
  background: #eee;
}
.int_list{
  padding:0 10px;
  background: #fff;

}
.int_list input{
  border:none;
  background:none;
  outline:none;
}
.int_list li{
  height: 1.2rem;
  line-height:1.2rem;
  border-bottom: 1px solid #eee;
  color:#333;
  font-size: .28rem;
  display: flex;
}
.int_list li .iconfont{
  font-size: .5rem;
  margin-right: 5px;
}

.loadbtn,.certain{
    padding-top: 1rem;
}
.loadbtn span,.certain span{
  display: block;
  width:80%;
  margin:0 auto;
  background:#F02424;
  color:#fff;
  font-size: .36rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  border-radius: .5rem;
  box-shadow: 1px 3px 3px 0px #FD7E7E;
}

.certify{
  position: relative;
}
.get_certify{
  width:2rem;
  height: .8rem;
  display: block;
  color:#F02424;
  line-height: .8rem;
  text-align: center;
  border-radius: .4rem;
  border:1px solid #F02424;
  position: absolute;
  right:0;
  top:.2rem;
}

</style>
