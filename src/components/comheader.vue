<style lang="scss" scoped>
.header{
  width: 100%;
  height: 40px;
  position: fixed;
  left: 0;
  top: 0;
  background-color: #f9f9f9;
  border-bottom: 1px solid #f2f2f2;
  z-index: 1000;
   p{
   	float: left;
   	width: 33%;
   	height: 40px;
   	line-height: 40px;
   }
}
.shouye{
   		text-align: left;
   		text-indent: 100px;
   	}
.header-cont{
font-family: 'times new roman', times, serif;
color: #0F570C;
font-size: 20px;
word-spacing: 0.6pt;
font-weight:bold;

}
.username{
   text-align: right;
   padding-right: -70px;
}
a:link{color:black;}
a:active{color:#ff0000;}
a:visited{color:black;}
a:hover{color:red;}
</style>
<template>
    <div class="header">
      <p class="shouye"><router-link to="Home">首页</router-link></p>
      <p class="header-cont">书城网</p>

      <p class="username">欢迎：{{username}}&nbsp;&nbsp;&nbsp;&nbsp;<router-link to="Logining">退出</router-link></p>
     <!--<el-button type="danger" v-show="isShow" class="showname" style="" @click="refresh()" size="small">刷新</el-button>-->
    </div>
</template>
<script>
import {getusername} from '../../src/api/account.js'
export default {
  name: 'head',
  mounted(){
    debugger
    this.getuser()
  	//sessionStorage.getItem('cname') // => 返回testKey对应的值
  	// 取值时：把获取到的Json字符串转换回对象
	 },
  data(){
    return{
     username:null,
      isShow:true
    }
  },
	 methods:{
          refresh(){
         /*   this.getuser()*/
          	/*debugger
          	var userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.username="欢迎"+userJsonStr.cname*/
          		//this.isShow=false
          		//console.log(loginParams.cname) // => tom
          	},

          getuser(){
          	debugger
            let userJsonStr = sessionStorage.getItem('user')
            if(userJsonStr){
              userJsonStr=JSON.parse(userJsonStr)
              this.name=userJsonStr.cname
            }
            this.username=this.name
          /*	let para={

          	}
             getusername(para).then((data)=>{
              if(data.data==="不存在用户名，请登陆！"){

               console.log('不存在用户名，请登陆！')
               this.$message({message:"不存在用户名，请登陆！",duration:1500})
              // this.username="<router-link to='Logining'>请登录</router-link>"
              }else{
                this.refresh()

              }
            }).catch((data)=>{
              console.log('err')
              console.log(data)
              debugger
            })*/
          }
	 }
 /* beforeMount(){
       var showname=""
       findLogin().then((data)=>{
              if(data.data==="不存在用户名，请登陆！"){
               console.log('不存在用户名，请登陆！')
               showname="不存在用户名，请登陆！"
              }else{
                console.log('成功')
                console.log(data)
               showname=data.data
              }
            }).catch((data)=>{
              console.log('err')
              console.log(data)
            })
    },
    */
}
</script>
