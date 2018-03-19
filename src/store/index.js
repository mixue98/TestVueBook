import Vue from 'vue'
import Vuex from 'vuex'

import *as getters from './getters'
import mutations from './mutations.js'
import actions from './actions.js'

Vue.use(Vuex)

const state= {
	//token: windows.sessionStorage.getItem('token')
	//username: ''
	bookInfo: [
      {
      	id: 1,
      	bookName: 'the book name id life',
      	imgUrl: '',
      	price: 100
      },
      {
      	id: 2,
      	bookName: 'the book name id life2',
      	imgUrl: '',
      	price: 100
      },
      {
      	id: 3,
      	bookName: 'the book name id life3',
      	imgUrl: '',
      	price: 100
      },
      {
      	id: 4,
      	bookName: 'the book name id life4',
      	imgUrl: '',
      	price: 100
      }
	],
	added: [],
}

export  default new Vuex.Store({
	state,
	getters,
	mutations,
	actions
})