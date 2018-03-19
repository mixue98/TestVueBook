import * as types from './types'

const mutations= {
	[types.LOGIN]: (state, data) => {
		//更改token的值
		state.token=data
		window.sessionStorage.setItem('token', data)
	},
	[types.LOGINOUT]: (state) => {
     //登出清除token
     state.token= null
     window.sessionStorage.removeItem('token')
	},
	/*[types.USERNAME]: (state, data) => {
		//存用户
		state.username= data
		window.sessionStorage.setItem('username', data)
	}*/
	//  我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
	[BOOK_ADD](state,book){
		if(state.bookInfo.length==0){
			book.id=1
		}else{
			book.id=state.bookInfo[state.bookInfo.length-1].id+1
		}
		state.bookInfo.push((book))
	},
	[BOOK_DELETE](state,bid){
		state.bookInfo=state.bookInfo.filter(item =>{
			return item.id!=bid
		})
	},
	[BOOK_UPDATE](state,book){
		state.bookInfo.map(item=>{
			if(item.id==book.id){
				return book
			}
		})
	},
	[BUY_BOOK](state,book){
		alert(book)
		console.log(book)
		if(!book.num){
			book.num=1
			state.added.push(book)
		}else{
			state.added.find(item=>{
				if(item.id==book.id){					
					item.num++
				}
			})
		}
		console.log(state.added)
	},
	[CANCEL_BOOK](state,id){
		state.added=state.added.filter(item=>{
			if(item.id==id)
				item.num=0
			return item.id!=id
		})
		console.log(state.added)
	}
}

export default mutations