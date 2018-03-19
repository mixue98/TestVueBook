<template>
  <div id="changePass">

	 <comheader></comheader>
     <navmenu></navmenu>
    <div class="content">
      <p class="p1">{{msg}}</p>
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '../Home' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>个人信息</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-row class="warp">
        <el-col :span="24" class="warp-main">
          <el-form ref="form" :model="form" :rules="rules2" label-width="120px">
            <el-form-item label="原密码" prop="oldpwd">
              <el-input type="password" v-model="form.oldpwd"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newpwd">
              <el-input type="password" v-model="form.newpwd"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPwd">
              <el-input type="password" v-model="form.confirmPwd"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="default" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import {updatePwd} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
//import func  from '../../../src/utils/tools.js'
  export default{
    name: 'changePass',
    data(){
       var validatePass = (rule, value, callback) => {
       //	debugger
        if (value === '') {
          callback(new Error('请输入新密码'))
        } else {
          if (this.form.confirmPwd!== '') {
            this.$refs.form.validateField('confirmPwd')
          }
          callback()
        }
      }
      var validatePass2 = (rule, value2, callback) => {
      	//debugger
        if (value2 === '') {
        	console.log(1)
          callback(new Error('请再次输入密码'))
        } else if (value2 !== this.form.newpwd) {
        	console.log(2)
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      }

        return{
          msg:'修改登陆密码',
          form: {
          oldpwd: '',
          newpwd: '',
          confirmPwd: ''
          },
          rules2: {
          oldpwd: [
               {required: true, message: '请输入旧密码', trigger: 'blur'},
          ],
          newpwd: [

              { validator: validatePass, trigger: 'blur' }
          ],
          confirmPwd: [

               { validator: validatePass2, trigger: 'blur' }
          ],
        }
        }
    },
     methods:{
      onSubmit(formName) {
              let userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	}
      	debugger
       //  this.$message({message:"此功能暂时未开发",duration:1500})
            this.$refs[formName].validate((valid) => {
	          if (valid) {
	            let data = {
	              //  name:"1356506281@qq.com",  //需登录获取用户
	                name:this.name,
		            oldpwd:this.form.oldpwd,
		            newpwd:this.form.confirmPwd
	            }
	          	debugger
	            updatePwd(data)
	                  .then(function(res){
	                    if(res.data==="修改成功！"){
	                        console.log(3)
	                        console.log(res.data)
                           alert("修改成功！")
	                      //this.$message({message:"修改成功,前往登录！",duration:1500})
	                        window.location.href = '../Logining'  //
	                    }else if(res.data==="原密码不正确！"){
	                    	alert("原密码不正确！")
	                     	console.log("原密码不正确！")
                           //this.$message({message:"原密码不正确！",duration:1500})
                        }else if(res.data==="不存在用户"){
                        	alert("不存在用户")
                           	console.log("不存在用户")
                            //  this.$message({message:"不存在用户！",duration:1500})
                                window.location.href = '../Logining'  //
                        }else{
                        	alert("用户名存在")
	                     // this.$message({message:"修改失败",duration:1500})
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
      }
    },
    components: {
       comheader,
       navmenu
    }

  }
</script>
<style scoped>
  .content{
    margin: 80px auto;
  }
.p1{
	color:red;
}
.warp{
	width: 50%;
	margin:20px auto;
}
.warp-breadcrum{
  margin-left: 15%;
}
#manager{
  border: 1px solid red;
  width: 80%;height: 50px;
  margin: 10% auto;
}
.addbook{
  color: red;
}
 .bookimg {
    height: 200px;
  }
  .text{
    text-align: center;
  }
  .listContainer {
    padding-top: 30px;
  }
</style>
