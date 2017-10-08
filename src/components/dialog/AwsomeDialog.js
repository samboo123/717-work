import {Dialog} from './dialog'

class AwsomeDialog extends Dialog{

	constructor(){
		super();		
	}

	show(options={title:'这是title',info:'这是提示信息'}){
		this.init(options);
		this.container=this.layout.querySelector('.dialog-container');

		this.container.addEventListener('click',function(e){
			e.stopPropagation()
		})
		this.layout.addEventListener('click',()=>{
			this.hide()
		})

		setTimeout(()=>{
			this.layout.classList.add('layout-active');
			this.container.classList.add('dialog-container-active')
		},0)
	}

	hide(){
		this.layout.classList.remove('layout-active');
		this.container.style.transform='translate3d(-50%,-50%,0) scale(0.5)';

		//document.querySelector('body').removeChild(this.layout)
		//动画结束再执行删除layout
		let _this=this;
		const layoutPiece = new Promise(function(resolve){
			_this.layout.addEventListener('webkitTransitionEnd',function(){
				resolve('layout end')
			})
		})
		const containerPiece = new Promise(function(resolve){
			_this.container.addEventListener('webkitTransitionEnd',function(){
				resolve('container end')
			})
		})
/*containerPiece.then(function(msg){
	console.log(msg)
	document.querySelector('body').removeChild(_this.layout)
})*/
		Promise.all([layoutPiece,containerPiece]).then(function(data){
			//console.log(data)
			document.querySelector('body').removeChild(_this.layout)
		})

	}

}

export {AwsomeDialog}