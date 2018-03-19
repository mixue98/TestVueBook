<template>
  <div id="information">

    <comheader></comheader>
    <navmenu></navmenu>
    <!-- 编辑-->
    <el-row class="warp">
      <p class="currentTitle">{{msg}}</p>
	    <el-col :span="24" class="warp-main">
        <p style="margin: 10px 40px;text-align: left;color:red;">账号：{{name}}</p>
	      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
	        <!--<el-form-item label="账号">
	          <el-input prop="name" disabled></el-input>
	        </el-form-item>-->
	        <el-form-item prop="nikename" label="昵称">
	          <el-input v-model="form.nikename" v-bind:disabled="disabledInput"></el-input>
	        </el-form-item>
	        <el-form-item prop="sex" label="性别">
	          <el-input v-model="form.sex" v-bind:disabled="disabledInput"></el-input>
	        </el-form-item>
	        <el-form-item prop="phone" label="电话">
	          <el-input v-model="form.phone" v-bind:disabled="disabledInput"></el-input>
	        </el-form-item>
	        <el-form-item prop="signature" label="个性签名">
	          <el-input type="textarea" v-model="form.signature" :rows="5" v-bind:disabled="disabledInput"></el-input>
	        </el-form-item>
	        <el-form-item>
	           <el-button type="primary" @click="editInfo">编辑</el-button>
	          <el-button type="primary" @click="onSubmit">提交</el-button>
	        </el-form-item>
	      </el-form>
	    </el-col>
  </el-row>
  </div>
</template>
<script>
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
import {findUser,GetInformation} from '../../../src/api/account.js'
  export default{
    name: 'information',
     mounted(){
        this.getUserinfo()

    },
    data(){
	    var validateSex=(rule, value, callback) => {
	    	 var pattern = /^['男'|'女']$/
	        if (value === '') {
	          callback(new Error('请输入性别'))
	        } else {
	          if (!pattern.test(value)) {
	            callback(new Error('请输入正确的性别'))
	          }
	          callback()
	        }
	    }
	   var validatePhone = (rule, value, cb) => {
	   	debugger
		       var reg=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/  //手机号
		      if (value === '') {
		        cb(new Error('请输入手机号'))
		      } else if (!reg.test(value)) {
		        cb(new Error('请输入正确的手机号'))
		      } else {
		       cb()
		      }
	    }
	        return{
	            msg:'个人信息',
	            disabledInput:true,  //不可编辑
	            name:this.name,
		        form: {

		          nikename: '',
		          sex: '',
		          phone: '',
		          signature:''
		        },
		        rules: {
			          nikename: [
			            {required: true, message: '请输入昵称', trigger: 'blur'},
			          ],
			          sex: [

			            {required: true, message: '请输入性别', validator: validateSex, trigger: 'blur'}
			          ],
			           phone: [

			             {  required: true, message: '请输手机号', trigger: 'blur' },
			             {validator: validatePhone}
			          ],
			          signature: [
			           {required: true,message: '请输入签名',  trigger: 'blur'}
			          ]
	            }
	        }
    },
     methods: {

     	/*
          用户点进去，可以看到自己的信息
          没有编辑过就显示暂无信息
          用户可以点击编辑来显示自己的信息
     	*/

	      	//获取信息
	      	getUserinfo(){
	      		let userJsonStr = sessionStorage.getItem('user')
          	      if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	}

	      		let para={
	      			//name:"1356506281@qq.com" //需要先获取用户
	      			name:this.name
	      		}
	      		findUser(para).then((res) => {
			          debugger
			          console.log(1)
			          this.form.nikename = res.data.nikename
			          this.form.sex = res.data.sex
			          this.form.phone=res.data.phone
			          this.form.signature=res.data.signature
			          this.from.account=this.name
			        })

	      	},
	      	//编辑信息
	      	editInfo(){

	      		  this.disabledInput=false
	      		  this.$message({message:"请编辑",duration:1500})
	      	},
	      	//提交
	      	onSubmit(){

            let userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	}

	      		debugger
		        var that = this
		        this.$refs.form.validate((valid) => {
		          if (valid) {
		            var args = {
		            	//username: "1356506281@qq.com",   //需要获取用户
		            	username:this.name,
		            	nickname: this.form.nikename,
		            	sex: this.form.sex,
		            	phone: this.form.phone,
		            	signature:this.form.signature
		            }
		            GetInformation(args).then((data)=>{
		            	debugger
		              if(data.msg==="请求成功！"){
		                 console.log(data)
		                 this.$message({message:"编辑成功",duration:1500})
		                // this.getUserinfo() //更新数据
		               //  this.$router.push('../Home')
		               }else if(data.data==="没有这个用户"){

                           this.$message({message:"没有这个用户",duration:1500})
                        }else if(data.data==="不存在用户"){
                        this.$message({message:"请先登录",duration:1500})
                          window.location.href = '../Logining'

		              }else{
		              	 this.$message({message:"请求失败",duration:1500})
		                console.log('失败')
		                console.log(data)

		              }
		            }).catch((data)=>{
		              console.log('err')
		              console.log(data)
		              debugger
		            })
		          } else {
		            console.log('error submit!!')
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
  .information{
    margin:50px auto;
  }
.warp{
	width: 50%;
	margin:50px auto;
}
.currentTitle{
  margin-bottom: 10px;
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
