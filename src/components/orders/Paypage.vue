
<template>
    <div class="pay">
         <p style="float:right;display:none">用户：{{name}}</p>
         <h3>{{title}}</h3>
         <comheader></comheader>
         <navmenu></navmenu>
         <div class="pattern">
              <h4 class="ph4">{{message3}}</h4>
              <p style="display:none;">{{aid}}</p>
         </div>
         
         <p class="sumMoney">请支付<span>{{sumMoney}}￥</span></p>
         <h4 >{{message}}</h4>
         <div class="ipt_pay">            
             <el-input type="password" class="input_pay"  maxlength="6" autofocus v-model="currentPassword"></el-input><br>             
             <el-button type="success" class="paybtn" @click="confirmPay" size="large">确认支付</el-button><br>
             <el-button  class="paybtn" @click="temporary" size="large">暂不支付</el-button>
          </div>
    </div>
</template>

<script>
import {payment,checkPayPwd,addToOrders} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
    export default {
        name: 'pay',
        mounted(){
        	//页面一进来就加载进行判断是否设置了支付密码，没有就跳去设置
        	//有就不管，点击确认支付就进行判断密码
        	this.checkPayPassword() //检查是否有支付密码   
            //this.getpayPass()  //进行密码匹配
            this.getmoney()   //
        },
        data(){
        	return {
        		title: '支付页面',
                message: '请输入6位数支付密码',
	            message3: '支付方式：本店全部默认为支付宝支付',
	            sumMoney: 0,
	            currentPassword:this.value,
	            aid:null,
	            name:this.name
        	}
        },
        methods: {
        	//生成订单
        	generateOrders(){
        		debugger
        		 let Proselection = sessionStorage.getItem('seleList')
		          	if(Proselection){
		          		Proselection=JSON.parse(Proselection)
		          		this.name=Proselection.name
		          		this.listid=Proselection.id  //商品清单id数组
		          	}
		       //  this.getmoney()
		       console.log("price:"+this.sumMoney)
		       console.log("aid:"+this.aid)
		         let para={
		         	name:this.name,
		         	id:this.listid,
		         	price: this.sumMoney,
		         	aid:this.aid, //地址
		         	state:0
		         }

		         addToOrders(para).then((data)=>{
	               debugger	 
	               console.log(data.data)      
	               if(data.data==="成功！"){
	                    this.$message({message:"订单成功，等待发货",duration:1500})                               	               
	               }else{	               	
	                    this.$message({message:"此订单失败",duration:1500})    
	               	    console.log(data.data)
	               }	              
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })
        	},
            confirmPay(){
            	debugger
            	  let reg=/^\d{6}$/
            	
            	 console.log(this.currentPassword)
                //payment            	
            	if(this.currentPassword===""){
                     this.$message({message:"请输入支付密码！",duration:1500})
            	}else if(!reg.test(this.currentPassword)){
            		this.$message({message:"请输入6位数支付密码！",duration:1500})
            	}else{
            		this.validatePass()
            	}

            },
            getmoney(){
            	debugger
            	//将存入的地址和价格取出来
            	let orderinfo =sessionStorage.getItem('info')
            	if(orderinfo){
            		orderinfo=JSON.parse(orderinfo)
            		this.sumMoney=orderinfo.productPrice
            		this.aid=orderinfo.selecteAddress
            	}
            },
            validatePass(){
            	//校验密码
            	let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}
	          	let para={
                    name: this.name,
                    password: this.currentPassword
            	}
            	payment(para).then((data)=>{
	               debugger	       
	            if(data.data==="请登陆"){
	            	this.$message({message:"用户名为空，请登陆",duration:1500})
	            	window.location.href = '../Logining'	               	              
	            }else if(data.data==="密码不正确"){                
	                 this.$message({message:"密码不正确！",duration:1500})	                                         
	            }else if(data.data==="密码正确"){
                    this.$message({message:"完成支付",duration:1500}) 
                    //支付成功，生成订单，传参
                    //商品清单数组id  name用户名 总价格price  aid地址
                   
		          	this.generateOrders()
                    
                    this.$router.push("../myOrder")
	            }else{
	            	console.log(data.data)
	            	this.$message({message:"订单失败",duration:1500}) 
	            }
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })
            },
            checkPayPassword(){
            	debugger
            	let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}
	          	let userJsonpay= sessionStorage.getItem('userpaypass')  //设置密码的页面
	          	if(userJsonpay){
	          		userJsonpay=JSON.parse(userJsonpay)
	          		this.password=userJsonpay.password  //如果为空
	          	}
	          	let para={
                    name: this.name,
                    password: this.password
            	}
            	checkPayPwd(para).then((data)=>{
	               debugger	       
	            if(data.data==="支付密码为空"){
	                this.$message({message:"您还未设置支付密码，前往设置！！！",duration:1500})
	                window.location.href = '../AccountSecurity'
	            }else if(data.data==="请登陆"){
	                this.$message({message:"用户名为空，请登陆",duration:1500})
	                window.location.href = '../Logining'
	            }else if(data.data==="支付密码不为空"){
	                 //有支付密码，不做处理
	                console.log(data)	                
	            }else{
	            	console.log(data.data)
	            	this.$message({message:"报错",duration:1500}) 
	            }
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })

            },          
            temporary(){
            	//暂不支付就进入待付款订单
            	debugger
        		 let Proselection = sessionStorage.getItem('seleList')
		          	if(Proselection){
		          		Proselection=JSON.parse(Proselection)
		          		this.name=Proselection.name
		          		this.listid=Proselection.id  //商品清单id数组
		          	}
		       //  this.getmoney()
		       console.log("price:"+this.sumMoney)
		       console.log("aid:"+this.aid)
		         let para={
		         	name:this.name,
		         	id:this.listid,
		         	price: this.sumMoney,
		         	aid:this.aid,
		         	state:-1
		         }

		         addToOrders(para).then((data)=>{
	               debugger	 
	               console.log(data.data)      
	               if(data.data==="成功！"){
	                    this.$message({message:"订单成功，等待付款，进入订单",duration:1500})    
	                    this.$router.push("../myOrder")

	               }else{	               	
	                    this.$message({message:"此订单失败",duration:1500})    
	               	    console.log(data.data)
	               }	              
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })

               
            }
      },
       components: {
       comheader,
       navmenu
      }
       
    
    
  }
</script>
<style lang="scss" scoped>
.pattern{
   width:90%;
   margin:30px 5%;
   min-height:60px; 

  }
  .sumMoney{
  	height: 50px;
    span{
    	color: red;
    	font-size: 20px;
    	font-weight: bold;
    }
  }
  .pay{
    width:75;
    margin:10px 12.5%;
  }
  .ipt_pay{

  }
  .input_pay{
    width:150px;
    margin:20px auto;
  }
  .ph4{
    float:left;
  }
  .paybtn{
  	margin: 10px 0;
  }
  
</style>
