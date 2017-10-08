
import './dialog.css'
class Dialog{
	constructor(){
		this.show =this.show.bind(this)
		this.hide =this.hide.bind(this)
	}		
	tpl(options){

		let {title,info}=options

		return `
				<div class="dialog-container">
					<div class="dialog-title">${title}</div>
					<div class="dialog-info">${info}</div>
					<div class="dialog-btns">
						<button class="certain">确定</button>
						<button class="cancel">取消</button>
					</div>
				</div>					
			`
	}
	createElement(type,props={class:''},doms='',callback){
		let el=document.createElement('div');
		for(let key in props){
			el.setAttribute(key,props[key])
		}
		el.innerHTML=doms;
		return el;
	}
	bindEvent(callback){
		if(!this.layout.querySelector('.certain')) return;
		this.layout.querySelector('.certain').addEventListener('click',()=>{
			this.hide()
			callback && callback()
		})
		this.layout.querySelector('.cancel').addEventListener('click',()=>{
			this.hide()
		})
	}
	init(options){
		let layout=document.querySelector('.layout')
			, body=document.querySelector('body')
			;
		if(!layout){//页面中不存在layout,为null	
			this.layout = layout = this.createElement('div',{class:'layout'},this.tpl(options));
			this.bindEvent(options.callback)
			body.appendChild(layout)
	
		}else{
			//有就直接show/hide
		}
	}
	
	show(options={title:'这是title',info:'这是提示信息'}){
		this.init(options);

		/*if(!this.layout.querySelector('.certain')) return;
		this.layout.style.background='rgba(0,0,0,.7)';
		this.container.style.transform='translate3d(-50%,-50%,0) scale(1)';
		this.container.style.opacity='1'*/
	}
	hide(){
		//remove或样式隐藏
		document.querySelector('body').removeChild(this.layout)
	}
}

export {Dialog}