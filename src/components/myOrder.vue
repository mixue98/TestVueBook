<template>

    <div id="myorder">
       <p style="float:right;display: none">用户：{{name}}</p>
       <comheader></comheader>
       <navmenu></navmenu>


      <!-- <el-button type="danger" class="" style="float:right;margin-right:10%;margin-top:50px;" @click="refresh()" size="small">刷新</el-button> -->
        <!--全部订单 -->
        <div class="allOrders">
          <h3 class="currentTitle">{{msg}}</h3>
            <el-button type="danger" class="tag" @click="dispalyAllOrders">全部订单</el-button>
            <el-button type="success" class="tag" @click="dispalayPay">待付款</el-button>
             <el-button type="success" class="tag" @click="dispalaySend" style="background:#999900
                ;">待发货</el-button>
            <el-button type="success" class="tag" @click="dispalayTake" style="background:#006600
                   ;">待收货</el-button>
             <el-button type="success" class="tag" @click="dispalayEvaluate" style="background:#006666
               ;">待评价</el-button>
             <!--所有订单-->
            <el-table :data="orders" highlight-current-row v-loading="listLoading" v-show="ShowAllOrders"
                style="width: 100%;margin-left:10px" class="table_col">
		          <el-table-column type="selection" width="55" v-show="showSelect"></el-table-column>
		          <el-table-column type="index" width="60"></el-table-column>
		          <!-- prop 传值-->
		          <el-table-column prop="oid" label="订单编号"  sortable></el-table-column>
                  <el-table-column prop="odate" label="订单时间"  sortable></el-table-column>
		          <el-table-column prop="oprice" label="价格"  sortable></el-table-column>
		          <!-- <el-table-column prop="address" label="地址"  sortable></el-table-column> -->

		          <el-table-column prop="opay" label="支付方式"  sortable></el-table-column>
		          <el-table-column prop="osend" label="快递方式"  sortable></el-table-column>
		          <el-table-column prop="ostate" label="交易状态"  sortable></el-table-column>
		          <el-table-column label="操作" >
		            <template scope="scope">
		              <el-button type="danger" @click="GoDetails(scope.$index,scope.row)" size="small">查看详情</el-button>
		            </template>
		          </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
		        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="totala" v-show="alltool"
		                       style="float:right;">
		        </el-pagination>
		    </el-col>


             <!--待付款 -->

            <el-table :data="ordersPay" highlight-current-row v-loading="listLoading"  v-show="showPay"
                style="width: 100%;margin-left:10px" class="table_col">

		          <el-table-column prop="oid" label="订单编号"  sortable></el-table-column>
		          <el-table-column prop="oprice" label="价格"  sortable></el-table-column>
		          <el-table-column prop="address.aid" label="地址id"  sortable></el-table-column>
		           <el-table-column prop="oremark" label="备注"  sortable></el-table-column>
		          <el-table-column prop="opay" label="支付方式"  sortable></el-table-column>
		          <el-table-column prop="osend" label="快递方式"  sortable></el-table-column>
		         <!-- <el-table-column prop="ostate" label="交易状态"  sortable></el-table-column> -->
		          <el-table-column label="操作" >
		            <template scope="scope">
		              <el-button type="danger" @click="GoPay(scope.$index,scope.row)" size="small">去付款</el-button>
		              <el-button type="danger" @click="delPayOrder(scope.$index,scope.row)" size="small">删除</el-button>
		            </template>
		          </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
		        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="totalb" v-show="paytool"
		                       style="float:right;">
		        </el-pagination>
		    </el-col>

             <!--待发货 -->

            <el-table :data="ordersSend" highlight-current-row v-loading="listLoading" v-show="showSend"
                style="width: 100%;margin-left:10px" class="table_col">

		          <el-table-column prop="oid" label="订单编号"  sortable></el-table-column>
		          <el-table-column prop="oprice" label="价格"  sortable></el-table-column>
		          <!-- <el-table-column prop="address" label="地址"  sortable></el-table-column> -->
		           <el-table-column prop="oremark" label="备注"  sortable></el-table-column>
		          <el-table-column prop="opay" label="支付方式"  sortable></el-table-column>
		          <el-table-column prop="osend" label="快递方式"  sortable></el-table-column>
		         <!-- <el-table-column prop="ostate" label="交易状态"  sortable></el-table-column> -->
		          <el-table-column label="操作" >
		            <template scope="scope">
		              <el-button type="danger" @click="GoUrge(scope.$index,scope.row)" size="small">催发货</el-button>
		            </template>
		          </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
		        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="totalc" v-show="sendtool"
		                       style="float:right;">
		        </el-pagination>
		    </el-col>
              <!--待收货 -->
            <el-table :data="ordersTake" highlight-current-row v-loading="listLoading"  v-show="showTake"
                style="width: 100%;margin-left:10px" class="table_col">
		          <el-table-column prop="oid" label="订单编号"  sortable></el-table-column>
		          <el-table-column prop="oprice" label="价格"  sortable></el-table-column>
		          <!-- <el-table-column prop="address" label="地址"  sortable></el-table-column> -->
		           <el-table-column prop="oremark" label="备注"  sortable></el-table-column>
		          <el-table-column prop="opay" label="支付方式"  sortable></el-table-column>
		          <el-table-column prop="osend" label="快递方式"  sortable></el-table-column>
		          <!--<el-table-column prop="ostate" label="交易状态"  sortable></el-table-column> -->
		          <el-table-column label="操作" >
		            <template scope="scope">
		               <el-button type="danger" @click="Goconfirm(scope.$index,scope.row)" size="small">确认收货</el-button>
		              <!--<el-button type="text" @click="dialogVisible = true">确认收货</el-button>-->
                        <!--<el-dialog
                          title="提示"
                          :visible.sync="dialogVisible"
                          size="tiny"
                          :before-close="handleClose">
                          <span>您确认收货？</span>
                          <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisible = false">取 消</el-button>
                            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                          </span>
                        </el-dialog>-->
		           <!--   <el-button type="danger" @click="GoTake(scope.$index,scope.row)" size="small">确认收货</el-button> -->
		            </template>
		          </el-table-column>
            </el-table>
            <el-col :span="24" class="toolbar">
		        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="totald" v-show="taketool"
		                       style="float:right;">
		        </el-pagination>
		    </el-col>
             <!--待评价 -->
            <el-table :data="ordersEvaluate" highlight-current-row v-loading="listLoading"  v-show="showEvaluate"
                style="width: 100%;margin-left:10px" class="table_col">

		          <!-- prop 传值-->
		          <el-table-column prop="oid" label="订单编号"  sortable></el-table-column>
		          <el-table-column prop="oprice" label="价格"  sortable></el-table-column>
		          <el-table-column prop="odate" label="订单时间"  sortable></el-table-column>
		           <el-table-column prop="oremark" label="备注"  sortable></el-table-column>
		          <el-table-column prop="opay" label="支付方式"  sortable></el-table-column>
		          <el-table-column prop="osend" label="快递方式"  sortable></el-table-column>
		         <!-- <el-table-column prop="ostate" label="交易状态"  sortable></el-table-column> -->
		          <el-table-column label="操作" >
		            <template scope="scope">
		              <el-button type="danger" @click="GoEvaluate(scope.$index,scope.row)" size="small">去评价</el-button>
		            </template>
		          </el-table-column>
            </el-table>
	               <!--工具条-->
		    <el-col :span="24" class="toolbar">
		        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="totale" v-show="Evaluatetool"
		                       style="float:right;">
		        </el-pagination>
		    </el-col>
        </div>
    </div>
</template>
<script>
import TabItems from '../components/TabItems.vue'
import comheader from '../components/comheader.vue'
import comfooter from '../components/comfooter'
import navmenu from '../components/navmenu.vue'
import {findAllOrdersByPage,findAllOrdersByState,deleteOrders,updateOrder} from '../api/account.js'
import {dateFormat} from '../utils/datatime.js'
  export default {
  	name: 'myorder',
  	 mounted(){
  	 	this.refresh()
        this.getAllOrders()
    },
	components: {
	  comheader,
	  navmenu,
	  TabItems,
	  comfooter
	},
	data(){
		return{
			msg: '我的订单',
			name: this.name,
			orders: [],
			ordersPay:[],
			ordersSend:[],
			ordersTake:[],
			ordersEvaluate:[],
			aid:null,
			size:30,
			totala:1,
			totalb:1,
			totalc:1,
			totald:1,
			totale:1,

			page:1,
			page2:1,
			page3:1,
			page4:1,
			page5:1,
			listLoading:false,
			showPay:false,
			showSend:false,
			showTake:false,
			showEvaluate:false,
			ShowAllOrders:true,
			dialogVisible: false,
			showSelect:false,
			alltool:true,
			paytool:false,
			Evaluatetool:false,
			sendtool:false,
			taketool:false
		}
	},
	methods: {

        //分页状态
		handleCurrentChange(val) {
		    	debugger
		       // this.listLoading = true
		        this.page = val
		     //     this.dispalyAllOrders()
		        this.page2=val
		     //   this.dispalayPay()
		        this.page3=val
		      //  this.dispalaySend()
		        this,page4=val
		      //  this.dispalayTake()
		        this.page5=val
		      //  this.dispalayEvaluate()

		        this.getAllOrders()
		        this.listLoading = false
	    },
	    refresh(){
	      	this.getAllOrders()
	      /*	this.dispalayPay()
	      	this.dispalaySend()
	      	this.dispalayTake()
	      	this.dispalayEvaluate()*/
	    },
	      //显示
	    dispalayPay(){
	    	debugger
	     	this.listLoading = true
            this.showPay=true
            this.paytool=true
            this.alltool=false
            this.sendtool=false
            this.taketool=false
            this.Evaluatetool=false
            this.ShowAllOrders=false
	     	this.showSend=false
	     	this.showTake=false
	     	this.showEvaluate=false
	     	this.listLoading = false
	     	let userJsonStr = sessionStorage.getItem('user')
          	   if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	    }
          	    debugger
          	 let para={
	          page:this.page2,
	          size:this.size,
	          name:this.name,
	          state:"-1"
	        }
	        this.listLoading=true
	        findAllOrdersByState(para).then((data) =>{
	        	debugger
	        	console.log("待付款")
	        	console.log(data.data)
                this.ordersPay = data.data.content
	            this.totalb = data.data.totalElements
	            this.page2=data.data.totalPages
	            console.log("page:"+this.page)
	            this.listLoading = false
	        }).catch((data) =>{
	        	 console.log(data)
	        })
	    },
	    dispalaySend(){
	     	this.listLoading = true
	     	this.paytool=false
            this.alltool=false
            this.sendtool=true
            this.taketool=false
            this.Evaluatetool=false
	     	this.showPay=false
	     	this.showSend=true
	     	this.ShowAllOrders=false
	     	this.showTake=false
	     	this.showEvaluate=false
	     	this.listLoading = false
	     	let userJsonStr = sessionStorage.getItem('user')
          	   if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	    }
          	    debugger
          	 let para={
	          page:this.page3,
	          size:this.size,
	          name:this.name,
	          state:"0"
	        }

	        this.listLoading=true
	        findAllOrdersByState(para).then((data) =>{
	        	debugger
	        	console.log("待发货")
	        	console.log(data.data)
                this.ordersSend = data.data.content
	            this.totalc = data.data.totalElements
	            this.page3=data.data.totalPages
	            this.listLoading = false
	        }).catch((data) =>{
	        	 console.log(data)
	        })
	    },
	    dispalayTake(){
	     	this.listLoading = true
	     	 this.paytool=false
            this.alltool=false
            this.sendtool=false
            this.taketool=true
            this.Evaluatetool=false
	     	this.showSend=false
	     	this.ShowAllOrders=false
	     	this.showPay=false
	     	this.showEvaluate=false
	     	this.showTake=true
	     	this.listLoading = false


          	 let para={
	          page:this.page4,
	          size:this.size,
	          name:this.name,
	          state:"1"
	        }

	        this.listLoading=true
	        findAllOrdersByState(para).then((data) =>{
	        	debugger

	        	console.log(data.data)
                this.ordersTake = data.data.content
	            this.totald = data.data.totalElements
	            this.page4=data.data.totalPages
	            this.listLoading = false
	        }).catch((data) =>{
	        	 console.log(data)
	        })
	    },
	    dispalayEvaluate(){
	     	this.listLoading = true
	     	 this.paytool=false
            this.alltool=false
            this.sendtool=false
            this.taketool=false
            this.Evaluatetool=true
	     	this.showTake=false
	     	this.ShowAllOrders=false
	     	this.showSend=false
	     	this.showPay=false
	     	this.showEvaluate=true
	     	this.listLoading = false
          	 let para={
	          page:this.page5,
	          size:this.size,
	          name:this.name,
	          state:2
	        }
	        this.listLoading=true
	        findAllOrdersByState(para).then((data) =>{
	        	debugger
	        	console.log(data.data)
                this.ordersEvaluate = data.data.content
	            this.totale = data.data.totalElements
	            this.page5=data.data.totalPages
	            this.listLoading = false
	        }).catch((data) =>{
	        	 console.log(data)
	        })
	    },
	    dispalyAllOrders(){
	     	this.listLoading = true
	     	this.paytool=false
	     	this.alltool=true

            this.sendtool=false
            this.taketool=false
            this.Evaluatetool=false
	     	this.showPay=false
	     	this.showSend=false
	     	this.showTake=false
	     	this.showEvaluate=false
	     	this.ShowAllOrders=true
	     	this.listLoading = false
            this.getAllOrders()
            this.listLoading = false

	     },
		//全部订单
		getAllOrders(){

			let userJsonStr = sessionStorage.getItem('user')
          	   if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	    }
          	 let para={
	          page:this.page,
	          size:this.size,
	          name:this.name
	        }
	        this.listLoading=true
	        sessionStorage.setItem('userOrder',JSON.stringify(para))
	        
	        findAllOrdersByPage(para).then((data)=>{
	        	 debugger
	          this.listLoading = false
	          for(let i=0;i<data.data.content.length;i++){
	          //	this.convertTime(data.data.content[i].ostate)
		        console.log(data.data.content[i].ostate)
		         let pdate={
		        	time:data.data.content[i].odate
		        }
		        sessionStorage.setItem('odate',JSON.stringify(pdate))
		     //   let nS = data.data.content[i].odate
		      //  data.data.content[i].odate = new Date(parseInt(nS) * 1000).toLocaleString().substr(0, 17)

		        if (data.data.content[i].ostate === -1) {
		          data.data.content[i].ostate = "待付款"
		        } else if (data.data.content[i].ostate === 0) {
		          data.data.content[i].ostate = "待发货"
		        } else if (data.data.content[i].ostate === 1) {
		          data.data.content[i].ostate = "待收货"
		        } else if (data.data.content[i].ostate === 2) {
		          data.data.content[i].ostate = "待评价"
		        }
		      }
              this.orders = data.data.content
	          this.totala = data.data.totalElements
	          this.page=data.data.totalPages
	          this.listLoading = false
            }).catch((data)=>{
              console.log(data)
            })
		},
		//转换时间
	    convertTime (timestamp) {
		      let date = new Date(timestamp)
		      let fmt = 'yyyy-MM-dd'
		      return dateFormat(date, fmt)
	    },
		//删除订单
		delPayOrder(index,row){
			//debugger
			  this.listLoading = false

	          let para = {
	           // name:this.name,
	            oid: row.oid   //订单id
	          }
                console.log("rowid"+row.oid)
	          deleteOrders(para).then((res) => {
	          	console.log(res)
	         // 	debugger
	            console.log("del")
	            if(res.data==="成功"){	  //
	            	 console.log("ok")
	              this.$message({message:"删除成功",duration:1500})
	              this.dispalayPay()
	            }else{
	            	 console.log("no")
	             this.$message({message:"删除失败",duration:1500})
	              console.log(res.data)
	            }
	          }).catch((res) => {

	          	 console.log("err")
	               this.$message({message:"删除失败",duration:1500})
	        })
		//	this.$confirm('确认删除该订单吗?', '提示', {type: 'warning'}).then(() => {
	    //    })
		},
		//查看详情
		GoDetails(index,row){
			this.listLoading=true
            let para={
				oid:row.oid,
				otime:row.odate
			}
              sessionStorage.setItem('detailOID',JSON.stringify(para))
          //  this.$message({message:"此功能暂时未开发",duration:1500})
            this.listLoading=false
            this.$router.push("../OrderDetail")
            //详情页面进入石获取接口信息
		},
		//去支付
		GoPay(index,row){
			debugger
			//获取订单id，价格 跳转到支付页面
          //  this.$message({message:"此功能暂时未开发",duration:1500})

            let paypara={
            	id:row.oid,  //订单id
            	price:row.oprice,
            	aid:row.address.aid
            }
            console.log(row.oprice+"aid:"+row.address.aid)
            sessionStorage.setItem('pay',JSON.stringify(paypara))
            this.$router.push("../orderPay")
		},
		//去催发货
		GoUrge(index,row){
			//加入催发货列表
			//没有买家功能，暂时点催发货后就进入待收货

           //this.$router.push("../Sendpage")
          // updateOrder
           let para={
           	oid:row.oid,
           	state:1
           }
           updateOrder(para).then((data)=>{
	               debugger
	               console.log(data.data)
	               if(data.data==="成功"){
	                    this.$message({message:"成功，进入待收货订单",duration:1500})
	                     this.dispalaySend()
	               }else{
	                    this.$message({message:"发货失败",duration:1500})
	               	    console.log(data.data)
	               }
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })

		},
		//去收货
		//对话框
	/*	handleClose(done) {
			//确认之后将订单状态更改为待评价
	        this.$confirm('确认收货？')
	          .then(_ => {
	            done();
	          })
	           .catch(_ => {});
	    },*/
	    //
	    Goconfirm(index,row){
	    	debugger
            let para={
	           	oid:row.oid,
	           	state:2
           }

           updateOrder(para).then((data)=>{
	               debugger
	               console.log(data.data)
	               if(data.data==="成功"){
	                    this.$message({message:"确认收货成功，请去评价",duration:1500})
	                     this.dispalaySend()
	               }else{
	                    this.$message({message:"收货失败",duration:1500})
	               	    console.log(data.data)
	               }
	            }).catch((data)=>{
	              console.log(data)
	              debugger
	            })
	    },
	/*	GoTake(index,row){
			this.$confirm('确认收货吗？', '提示', {})

		},*/
		//去评价
		GoEvaluate(index,row){
			debugger
			let para={
				oid:row.oid,
				otime:row.odate
			}
              sessionStorage.setItem('evOID',JSON.stringify(para))
			//获取订单id,

          //  this.$message({message:"此功能暂时未开发",duration:1500})
            this.$router.push("../Evaluatepage")
		}
	}

  }
</script>
<style scoped>
 .allOrders{
 	width:80%;
 	margin:80px 10%;
 }
 .currentTitle{
   margin-bottom: 10px;
 }
 .tag{
    margin-left:10px;
    float:left;
    	margin-bottom:10px;


 }
 .table_col{

  text-align:left;

 }
</style>
