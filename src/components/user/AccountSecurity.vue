<template>
  <div id="setPaypass">
	 <comheader></comheader>
     <navmenu></navmenu>
    <div class="setAs">
      <h3 class="currentTitle">{{msg}}</h3>
      <h4>{{paymsg}}</h4>
      <el-input type="password" class="input_pay" v-model="paypass" maxlength="6" autofocus></el-input>
      <el-button type="primary" @click="onSubmit">提交</el-button>
    </div>
  </div>
</template>
<script>
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
import {addPayPwd,} from '../../../src/api/account.js'
  export default{
    name: 'setPaypass',
    mounted:{
    	//this.getpaypass()
    },
    data(){
        return{
          msg:'账号安全',
          paymsg: '请设置6位数字密码',
          paypass: this.value
        }
    },
     methods:{
        onSubmit() {
        	 console.log("paypass"+this.paypass)
        	debugger
        	let reg=/^\d{6}$/
        	if(this.paypass===""){
             	debugger
                   this.$message({message:"请输入支付密码",duration:1500})
            }else if(this.paypass.length<6){
                    this.$message({message:"请输入6位数字密码",duration:1500})
            }else if(!reg.test(this.paypass)){
                 this.$message({message:"请输入数字密码",duration:1500})
            }else{
            	debugger
            	let userJsonStr = sessionStorage.getItem('user')
          	        if(userJsonStr){
          		    userJsonStr=JSON.parse(userJsonStr)
          		    this.name=userJsonStr.cname
          	        }
             	let para={
      				name:this.name,
      				password:this.paypass
      			}
      			addPayPwd(para).then((data)=>{
	               debugger
	               console.log(data.data)
	               if(data.data==="设置成功"){
                       this.$message({message:"设置成功",duration:1500})
                       sessionStorage.setItem('userpaypass',JSON.stringify(para))
                       //前往刚才的支付页面
                      // window.location("../Paypage")
                        this.$router.push("../Paypage")
	               }else if(data.data==="输入密码不能为空"){
                       this.$message({message:"输入密码不能为空",duration:1500})
                    }else if(data.data.length<6){
                       this.$message({message:"请输入6位数字密码",duration:1500})
	               }else{
	               	 console.log(data.data)
	               }
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })
      		}
       }
    },
     components: {
       comheader,
       navmenu
    }

  }
</script>

<style scoped>
h3{
	margin:10px auto;
}
.currentTitle{
  margin-bottom: 10px;
}
h4{
     margin-top:20px;
}
.input_pay{
	width:30%;
	margin:20px auto;
}
.form{
	width:30%;
	margin:100px auto;
}
.p1{
	color:red;
}
.warp{
	width: 50%;
	margin:20px auto;
}
#setPaypass{
  width: 80%;
  height: 800px;
  margin: 100px auto;
}
.setAs{
  margin: 50px auto;
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
