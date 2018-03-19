import * as types from './types'
import {BOOK_ADD, BOOK_DELETE, BOOK_UPDATE, BUY_BOOK, CANCEL_BOOK} from './types'

/*export default {
	UserLogin({commit}, data){
		commit(types.LOGIN, data)
	},
	UserLoginout({commit}){
		commit(types.LOGINOUT)
	}
	/*UserName({commit},data){
		commit(types.USERNAME, data)
	} 
}*/

const actions ={
	UserLogin({commit}, data){
		commit(types.LOGIN, data)
	},
	UserLoginout({commit}){
		commit(types.LOGINOUT)
	},
	addBooks: ({commit},book) => commit('BOOK_ADD', book),
	deleteBook: ({commit},id) => commit('BOOK_DELETE', id),
	updateBook: ({commit},book) => commit('BOOK_UPDATE', book),
	buyBook: ({commit},book) => commit('BUY_BOOK', book),
	cancelBook: ({commit},id) => commit('CANCEL_BOOK', id)
}
export default actions