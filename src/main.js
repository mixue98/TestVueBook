// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/index.js'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$ajax=axios

const Vrouter = new VueRouter({
  router
})
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
/* eslint-disable no-new */
new Vue({
 // el: '#app',
 // store, //把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  //components: {Counter},
  router,
  Vrouter,
  Counter,
  render: h =>h(App)
}).$mount('#app')

Vue.filter('dCurrency', function(value) {
  return '￥'+value
})
Vue.filter('dTofixed', function(value) {
  var isNum = parseFloat(value);
  if( !isNum ){
      alert("请输入数字")
      return "请输入数字";
  } else {
      var value = Math.round(isNum*100)/100;
      var item = value.toString().split(".");
      if(item.length == 1){
          value = value.toString()+".00";
          return value;
      }
      if(item.length > 1){
          if(item[1].length < 2){
              value = value.toString()+"0";
          }
          return value;
      }
  }
})
