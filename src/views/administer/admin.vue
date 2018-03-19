<template>
  <div id="bg">
      <p id="seller" style="float: right;margin-right: 50px;width: 100%">
        <router-link to="../admin" style="color: white;float: right">管理员入口</router-link>
      </p>
      <p class="titleTop">Welcome to Bookshop</p>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2"  label-position="left" label-width="0px" class="demo-ruleForm   login-container">
	    <h3 class="title">登录</h3>
	    <el-form-item prop="account">
	      <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
	    </el-form-item>
	    <el-form-item prop="checkPass">
	      <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
	    </el-form-item>
	    <!--  <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>-->
	    <el-form-item style="width:100%;">
	      <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
	      <!--  <el-button @click.native.prevent="handleReset2">重置</el-button> -->
	    </el-form-item>
        <p class="forgetPass" style="cursor: pointer" @click="forgetPass">忘记密码？</p>
	    <el-button type="" class="fel-btn"><router-link to='adminRegister'>立即去注册！</router-link></el-button><br>
	   </el-form>

  </div>
</template>
<script>
  import {managerLogin} from '../../api/account.js'
  export default {
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          checkPass: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
        },
        checked: true
      };
    },
    methods: {
      handleReset2(formName) {
        this.$refs.ruleForm2.resetFields();
      },
      forgetPass(){
        debugger
           //获取用户的session
        this.$router.push("../forgetPass")
      },
      handleSubmit2(ev) {
        var _this = this
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            _this.logining= true
            var loginParams = { mname: _this.ruleForm2.account, mpwd: _this.ruleForm2.checkPass }
            managerLogin(loginParams).then((data)=>{
              if(data.data==="用户名不存在或者密码错误！"){
              	 _this.logining= false
               console.log('用户名不存在或者密码错误！')
               this.$message({message:"用户名不存在或者密码错误！",duration:1500})
              }else{
                sessionStorage.setItem('adminUser', JSON.stringify(loginParams))  //session 存值
                console.log('成功')
                console.log(data)
                 _this.logining= false
                _this.$router.push('../adminHome')
              }
            }).catch((data)=>{
              console.log('err')
              console.log(data)
             // debugger
            })

          }else{
             console.log('no')
            return false
          }
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
.forgetPass{
  float:right;
  margin:10px 10px;
}
.forgetPass:hover{
  color:red;
  cursor:pointer;
}
  .login-container {
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      margin: 0px auto 40px auto;
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
.demo-ruleForm{
}
.titleTop{
  font-size: 30px;
  margin-bottom: 50px;
  text-shadow:10px 9px 3px #119111;
  -webkit-text-stroke: 1.4px #1CB00C;

}
  #bg{
  	z-index: 1;
    margin: 0 0;
    padding: 0 0;
    height: 650px;
  	 background-size:100% 120%;
  	width: 100%;
  }

</style>
