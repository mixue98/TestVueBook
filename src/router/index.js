import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Logining from '../views/Logining.vue'
import Home from '../views/Home.vue'
import Regi from '../views/Regi.vue'
import currentShop from '../views/currentShop.vue'
import myCollect from '../views/myCollect.vue'
import shopcart from '../components/shopcart.vue'
import information from '../components/user/information.vue'
import changePass from '../components/user/changePass'
import address from '../components/user/Newaddress.vue'
import myOrder from '../components/myOrder.vue'
import activity from '../components/advertising/activity.vue'
import Paypage from '../components/orders/Paypage'
import Evaluatepage from '../components/orders/Evaluatepage'
import OrderDetail from '../components/orders/OrderDetail'
import Sendpage from '../components/orders/Sendpage'
import Takepage from '../components/orders/Takepage'
import checkout from '../components/orders/checkout'
import childBook from '../components/magbook/childBook'
import education from '../components/magbook/education'
import literature from '../components/magbook/literature'
import AccountSecurity from '../components/user/AccountSecurity'
import orderPay from '../components/orders/orderPay'
import NewEvaluatepage from '../components/orders/NewEvaluatepage'
import bookdetail from '../components/magbook/bookdetails.vue'
import forgetPass from  '../components/user/forgetPass.vue'
import admin from '../views/administer/admin.vue'
import backstageHome from '../views/shopKeppers/backstageHome.vue'
import manageBook from '../views/shopKeppers/manageBook.vue'
import manageOrder from '../views/shopKeppers/manageOrder.vue'
import adminEditorInfo from '../views/shopKeppers/adminEditorInfo.vue'
import adminRegister from '../views/administer/adminRegister.vue'
import adminHome from '../views/administer/adminHome.vue'
//import  test from '../components/comm/test.vue'
//import store from '../store/index'
//import store from '../vuex/store'
Vue.use(Router)

//路由懒加载
/*const login = resolve => {
	require.ensure(['../views/Login'], () => {
		resolve(require('../views/Login'))
	})
}

const regi = resolve => {
	require.ensure(['../views/Regi'], () => {
         resolve(require('../views/Regi'))
	})
}*/

const routes = [
    {
      path: '/Logining',
      name: 'Logining',
      component: Logining
    },
    {
      path: '/Regi',
      name: 'Regi',
      component: Regi
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/Home',
      name: 'Home',
      component: resolve => require(['../views/Home'],resolve),
    },
    {
      path: '/myCollect',
      name: 'myCollect',
      component: myCollect
    },
    {
      path: '/currentShop',
      name: 'currentShop',
      component: currentShop
    },
    {
      path: '/shopcart',
      name: 'shopcart',
      component: shopcart
    },
    {
      path: '/information',
      component: information
    },
  /*{
    path: '/test',
    component: test
  },
  */
    {
      path: '/changePass',
      component: changePass
    },
    {
      path: '/forgetPass',
      component: forgetPass
    },
    {
      path: '/AccountSecurity',
      component: AccountSecurity
    },
    {
      path: '/address',
      component: address
    },
    {
      path: '/myOrder',
      component: myOrder
    },
    {
      path: '/orderPay',
      component: orderPay
    },
    {
      path: '/checkout',
      component: checkout
    },
    {
      path: '/activity',
      component: activity
    },
    {
      path: '/bookdetail',
      name: 'bookdetail',
      component: bookdetail,
    /*  children: [
       {
         path: 'message',
         component: message
       }
      ] */
    },
  /*  {
      path: '/',
      name: 'Hello',
      component: Hello
    },*/
    {
      path: '/',
      name: 'Logining',
      component: Logining
    },
    {
      path: '/Paypage',
      component: Paypage
    },
    {
      path: '/Evaluatepage',
      component: Evaluatepage
    },
    {
      path: '/NewEvaluatepage',
      component: NewEvaluatepage
    },
     {
      path: '/OrderDetail',
      component: OrderDetail
    },
     {
      path: '/Takepage',
      component: Takepage
    },
    {
      path: '/Sendpage',
      component: Sendpage
    },
    {
      path: '/childBook',
      component: childBook
    },
    {
      path: '/education',
      component: education
    },
    {
      path: '/literature',
      component: literature
    },
  {
    path: '/backstageHome',
    component: backstageHome
  },
  {
    path: '/manageBook',
    component: manageBook
  },
  {
    path: '/manageOrder',
    component: manageOrder
  },
  {
    path: '/adminEditorInfo',
    component: adminEditorInfo
  },
  {
    path: '/adminRegister',
    component: adminRegister
  },
  {
    path: '/adminHome',
    component: adminHome
  },




]

//注册全局钩子用来拦截导航
/*routes.beforeEach((to, from, next) => {
  let token =store.state.token
  if(to.meta.requiresAuth){
  	if(token){
  		next()
  	}else{
  		next({
  			path: '/Login',
  			query: {redirect: to.fullPath}
  		})
  	}
  }else{
  	next()
  }
})*/

export default new Router({
  mode: 'history',
  routes
})
