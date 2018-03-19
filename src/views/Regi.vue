<template>
   <div class="bg">
      <p class="titleTop">Welcome to Bookshop</p>
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm register-container">
	  <h3>注册</h3>
	  <el-form-item  prop="account" class="fel">
	    <el-input type="text" v-model="ruleForm2.account" auto-complete="on" placeholder="请输入邮箱"></el-input>
	  </el-form-item>
	  <el-form-item  prop="pass" class="fel">
	    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off" placeholder="请输入密码"></el-input>
	  </el-form-item>
	  <el-form-item  prop="checkPass" class="fel">
	    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="请再次输入密码"></el-input>
	  </el-form-item>

	  <el-form-item >
	    <el-button type="primary" class="el-btn" @click="submitForm('ruleForm2')">注册</el-button>
	    <el-button @click="resetForm('ruleForm2')">重置</el-button>
	  </el-form-item>
	  <router-link to='Logining' class="link-re">已有账号，去登录！</router-link>
	</el-form>
   </div>
</template>
<script>
  import {register} from '../../src/api/account.js'
  export default {
    data () {
      var validateAccount = (rule, value, cb) => {
      //var pattern = /^[\w\u4e00-\u9fa5]{3,10}$/g
      var pattern=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
      if (value === '') {
        cb(new Error('请输入邮箱'))
      } else if (!pattern.test(value)) {
        cb(new Error('请输入正确的邮箱格式'))
      } else {
       cb()
      }
    }
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'))
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          account: ''
        },
        rules2: {
          pass: [
          { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
          { validator: validatePass2, trigger: 'blur' }
          ],
          account: [
          { validator: validateAccount, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      submitForm (formName) {
      	let self = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let data = {
                cname: self.ruleForm2.account,
                cpwd: self.ruleForm2.checkPass
            }
            register(data)
                  .then(function(res){
                    if(res.data==="注册成功，请激活"){
                      self.$message({message:"注册成功，请激活",duration:1500})
                      console.log(res.data)
                      window.location.href = '../Logining'
                      //this.$router.push('../Logining')
                    }else if(res.data==="用户名存在！"){
                      self.$message({message:"用户名存在！",duration:1500})
                      console.log("用户名存在！")
                    }
                  })
                  .catch(function(err){
                      console.log(err)
                    })
          } else {
            console.log('no')
            return false
          }
        })
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>
<style style="scss" scoped>
 .register-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 0px auto;
    width: 350px;
    padding: 30px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;

  }
  .titleTop{
  font-size: 30px;
  margin-bottom: 50px;
  text-shadow:10px 9px 3px #119111;
  -webkit-text-stroke: 1.4px #1CB00C;
}
  .bg{
  	width:100%;
  	height:650px;
  	background:url('../assets/bg04.jpg') no-repeat center;
  		background-size:100% 120%; 
  		z-index: -1;
  }
   h3{
    text-align:center;
    margin-bottom:20px;


   }
   .fel{
    margin-left:-25%;
    margin-bottom: 30px;
    width: 121%;
   }
   .el-btn{
    margin-left:-100px;

   }
   .link-re{
   	color: black;
   }
   .link-re:hover{
   	color: red;
   	cursor: pointer;
   }
</style>
