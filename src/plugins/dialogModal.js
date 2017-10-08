import Vue from 'vue';
import {AwsomeDialog} from '../components/dialog/AwsomeDialog'

let Modal={
	install(Vue,options){
		Vue.prototype.$modal=new AwsomeDialog()
	}
}
Vue.use(Modal)