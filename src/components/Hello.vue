<template>
  <div class="hello">
    <!--
    <el-button type="" class="fel-btn"><router-link to='Logining' >去登录</router-link></el-button><br>
    <el-button type="" class="fel-btn"><router-link to='Home' >去首页</router-link></el-button><br>
    <el-button type="" class="fel-btn"><router-link to='Regi'>去注册</router-link></el-button><br>
    -->
     <!--<h1>{{ msg }}</h1>-->
    <logining></logining>
  </div>
</template>
<script>
import logining from '../views/Logining.vue'
//import loginbg from '../components/bg/loginbg.vue'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to bookshop'
    }
  },
  components:{
    logining,
   // loginbg
  }
}
</script>
<style scoped>
.hello{
		width: 100%;
	  	/*min-height: 800px;*/
}
.fel-btn{
  margin-bottom: 20px;
}
h1, h2 {
  font-weight: normal;
}
h1{
  background-color: green;
}
ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
