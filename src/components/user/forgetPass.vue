<template>
  <div id="forgetPass">
    <h3 class="currentTitle">WELCOME TO BOOKSHOP</h3>
    <div id="container">

      <!--填写账户名-->
      <div id="re_text" class="fs" v-show="showFill">
        <h2>找回密码</h2>
        <input type="text" v-model="inputAccount" placeholder="请输入邮箱" id="re_ccount"></input>
        <!--<label class="lab1" v-show="showA">请输入正确的账号</label>-->
        <input type="text" placeholder="请输入验证码" id="incode" v-model="inputCode">
        <p id="code" class="code" @click="createCode">{{code}}</p>
      <!--  <label class="lab2">请输入正确的验证码</label>
        <label class="refreshCode1">请刷新验证码</label>-->
        <input type="button" value="下一步" id="next" @click="validate">
      </div>
      <!--身份验证-->
      <div id="FindPass" class="fs" v-show="showID">
        <h2>找回密码</h2>
        <p>验证方式：邮箱验证</p>
         <p>邮箱账号：<span id="user_email">{{inputAccount}}</span></p>
        <div>
          <p class="p1">邮箱验证码：
            <input type="button" v-model="getCode" id="goCode" v-bind:disabled="dis" @click="sendCode(this)">
            <input type="text" placeholder="请输入验证码" id="code2" v-model="inputCode2">
          </p>
          </div>
          <label class="lab2 a3" v-show="sC">请输入正确的验证码</label>
          <input type="button" value="下一步" id="next2" @click="validateCode">
      </div>
      <!--设置新密码-->
      <div id="RepeatPass" class="fs" v-show="showSetpass">
        <h2>找回密码</h2>
        <input type="password" id="newPass" placeholder="请输入新密码" v-model="inputNewPass">
       <!-- <label class="lab4" v-show="showPassLabel">密码由6-22位数字和英文混合组成</label>-->
        <input type="password" id="rePass" placeholder="请确认密码" v-model="ConfirmNewPass">
        <!--<label class="lab5">请再次输入密码</label>-->
       <!-- <label class="lab3">两次输入的密码不一致！</label>-->
        <input type="button" value="下一步" id="next3" @click="validatePass">
      </div>
      <!--完成-->
      <div id="successPass" class="fs" v-show="showSuccess">
        <h2>找回密码</h2>
        <p>密码已重置！请<router-link to="../logining">登录</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
  import {validate,createcode,forgetPwd} from '../../api/account'
  export default{
    name: 'forgetPass',
    data(){
        return{
          msg:'密码',
          code:"获取验证码",
          inputAccount:this.value,
          showA:false,
          inputCode:this.value,
          showFill:true,//
          showID:false,
          showSetpass:false,
          showSuccess:false,
          sC:false,
          inputCode2:this.value,
          CodeTime:360,
          btn:null,
          dis:false,
          getCode:"获取验证码",
          clock:null,
          showPassLabel:true,
          inputNewPass:this.value,
          ConfirmNewPass:this.value

        }
    },
     methods: {
       onSubmit() {
         this.$message({message: "此功能暂时未开发", duration: 1500})
       },
       //发送验证码
       sendCode(thistbn){
         debugger
         this.dis=true
         this.getCode=this.CodeTime+"秒后重新获取"
         this.clock=setInterval(this.doLoop,1000);
           let para={
               name:this.inputAccount
           }
         createcode(para).then((data)=>{
           if(data.data==="成功！"){
           this.$message({message:"验证码已发送到您的邮箱！",duration:1500})
         }else{
          // sessionStorage.setItem('user', JSON.stringify(loginParams))  //session 存值
             this.$message({message:"失败！",duration:1500})
         }
       }).catch((data)=>{
          this.$message({message:"异常！",duration:1500}) 
       })
       },
       //验证邮箱发送的验证码
       validateCode(){
       	debugger
           if(this.inputCode2.length<=0){
             this.$message({message: "请输入验证码", duration: 1500})
           }else{
             //验证码正确；
             //跳到下一步设置新密码，隐藏账号div,隐藏验证div
             let para={
               name:this.inputAccount,
               code:this.inputCode2
             }
             //接口
             validate(para).then((data)=>{
              if(data.data==="验证成功！"){
                  this.$message({message: "验证成功，前去设置新密码！", duration: 1500})
                  this.showID=false
                  this.showSetpass=true
              }else{
                this.$message({message: "验证错误", duration: 1500})
              }
             }).catch((data)=>{
              this.$message({message:"异常！",duration:1500})
             })
             //验证码错误!
         }
       },
       validatePass(){
         debugger
         var regPass=/^[a-zA-Z0-9]{6,22}$/;  //密码由6-22位数字和英文混合组成
         console.log(this.inputNewPass+"2:"+this.ConfirmNewPass)
           if(this.inputNewPass===""||this.ConfirmNewPass===""){
             this.$message({message: "请填写密码", duration: 1500})
           }else if(!regPass.test(this.inputNewPass)){
              this.showPassLabel=true
             this.$message({message: "密码由6-22位数字和英文混合组成", duration: 1500})
           }else if(this.inputNewPass!==this.ConfirmNewPass){
             this.$message({message: "两次密码不一致", duration: 1500})
           }else {
          // this.$message({message: "yes", duration: 1500})
               let para={
                 name:this.inputAccount,
                 pwd:this.ConfirmNewPass
               }
             //找回密码接口
               forgetPwd(para).then((data)=>{
               	debugger
               	console.log(1)
              if(data.data==="修改成功！"){   //
                  this.showSetpass=false
                  this.showSuccess=true
                  }else if (data.data==="不存在用户") {
                    this.$router.push("../Regi")
              }else{
                this.$message({message: "设置失败", duration: 1500})
              }
             }).catch((data)=>{
              this.$message({message:"异常！",duration:1500})
             })
           }
       },
       //获取验证码
       createCode(){
         debugger
         //this.$message({message:"请刷新验证码",duration:1500})
         this.code = "";
         var codelength = 4;
         var codeArray = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
           'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
           'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
         for (var i = 0; i < codelength; i++) {
           var charnum = Math.floor(Math.random() * 52);
           console.log(charnum)
           this.code += codeArray[charnum];
         }
       },
       //验证输入的用户名和验证码
        validate(){
         var regemail = /^[_\.0-9a-z-]+@([0-9a-z][0-9a-z-]+\.){1,4}[a-z]{2,3}$/;  //邮箱
         // var regphone=/^1[3|4|5|8][0-9]\d{4,8}$/;  //手机号
         if (!regemail.test(this.inputAccount)) {
           this.$message({message:"请输入正确的邮箱",duration:1500})
          } else {
           //console.log(this.code+"2:"+this.inputCode.toUpperCase())
           if (this.code.toUpperCase() === this.inputCode.toUpperCase()) {
             /*this.$message({message: "进入下一步", duration: 1500})*/
              this.showFill=false
             this.showID=true
           //  console.log(this.showID)
           } else {
             this.$message({message: "验证码不正确", duration: 1500})
           }
         }
        },
       doLoop(){
         this.CodeTime--
         if(this.CodeTime<=0){
           clearInterval(this.clock)
           this.dis=false
           this.getCode="点击发送验证码"
           this.CodeTime=360
         }else {
           this.getCode = this.CodeTime+'秒后可重新获取';
         }
       }
     }
  }
</script>
<style lang="scss" scoped>
  @import "../../style/findPass.scss";
  #forgetPass{
    width: 100%;
    height: 500px;
  }
  #re_ccount{
    width: 50%;
  }
  #next2{
    margin-top: 40px;
  }
  .currentTitle{
    margin:10px auto;
  }
  #container{
    margin: 20px auto;
  }
  .lab4{
    display: block;
    color: red;
  }
/*.p1{
	color:red;
}
.warp{
	width: 50%;
	margin:20px auto;
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
  }*/
</style>
