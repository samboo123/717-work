//引用common style
import './css/reset.css'

import './font/iconfont.css'
//引用框架和配置文件
import Vue from 'vue'
import Store from './store/store'
import Router from './routes/router.config'
import App from './App.vue'

import axios from 'axios';
Vue.prototype.$http=axios;
//插件--弹出框
import modal from './plugins/dialogModal';//undefined===>import './plugins/modal';



//开发环境使用，测试环境或者线上环境请注掉
import './mock/mock'

new Vue({
  el: '#app',
  store:Store,
  router:Router,
  render: h => h(App)
})

//首页进入到我的页面时取到token令牌