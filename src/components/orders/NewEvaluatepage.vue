
<template>
    <div class="evaluate">
        <p style="float:right;display:none;">用户：{{name}}</p>
         <h3>{{title}}</h3>
         <h4>订单号：{{orderID}} 订单时间：{{convertTime(orderTimed)}}</h4>
         <el-button type="success"  @click="refresh" size="small">刷新</el-button>
         <comheader></comheader>
         <navmenu></navmenu>
        <div class="product">
            <li class="showProduct" v-for="commodity in commoditys" :key="commodity">
                <p class="pmsg">{{msg1}}{{num}}</p>
              <!--显示商品-->
                <div class="commodity">
                    <li class="select_list_book" >
                        <img src="../../assets/zanwu.png" class="pimg" width="100" height="100">
                        <p class="product_bid">详情id:{{commodity.did}}</p>
                        <p class="product_bid">书编号:{{commodity.book.bid}}</p>
                        <p class="product_bname">商品名称:{{commodity.book.bname}}</p>
                        <p class="product_bid">类型:{{commodity.book.classify}}</p>
                        <p class="product_numbeer">数量：{{commodity.dnumber}}</p>
                        <p class="product_cbprice">总价：{{commodity.dprice}}</p>
                    </li>
                </div>
              <!--商品评价-->
                <div class="showRate">
                    <p class="p1">{{Satisfaction}}</p>
                    <el-rate
                      v-model="value3"
                      show-text>
                    </el-rate>
                    <p class="p2">{{giverate}}</p>
                    <el-input type="textarea" :rows="8" class="txtrate" v-model="currentcomment[0]"></el-input>
                </div>
            </li>
            <el-button type="success" class="confirm" @click="submitEvaluate" size="large">提交评价</el-button>
        </div>
    </div>
</template>
<script>
import {dateFormat} from '../../utils/datatime.js'
import {findOrderItem,addComment} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
    export default {
        name: 'evaluate',
        mounted(){
            this.getOrderID()
            this.getList()
        },
        data(){
        	return {
        		title: '评价订单',
        		value3: null,
                msg1: '商品',
                num:1,
                commoditys:[],   //商品数组 一个订单中有多个商品，每个商品都进行评价
                orderID:this.oid,
                orderTimed:null,
                Satisfaction: '商品满意度：',
                giverate: '您的评语:',
                name:this.name,
                currentcomment:[""],
                bid:null
            }
        },
        methods: {
        	refresh(){
        		this.getOrderID()
                this.getList()
        	},
        	getOrderID(){

        		let payorder =sessionStorage.getItem('pay')
            	if(payorder){
            		payorder=JSON.parse(payorder)
            		this.sumMoney=payorder.price
            		this.oid=payorder.id   //订单id
            	}
            	this.orderID=this.oid
            	let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}
	          	let orderTime=sessionStorage.getItem('odate')
	          	if(orderTime){
	          		orderTime=JSON.parse(orderTime)
	          		this.orderTimed=orderTime.time
	          	}
	          	let timeStamp=this.orderTimed
        	},
        	convertTime (timestamp) {
		      let date = new Date(timestamp)
		      let fmt = 'yyyy-MM-dd HH:mm:ss'
		      return dateFormat(date, fmt)
		    },
        	//获取订单商品，一个商品一个评价
        	//商品横排显示
        	getList(){
	           	debugger
	          	let payorder =sessionStorage.getItem('pay')
            	if(payorder){
            		payorder=JSON.parse(payorder)
            		this.sumMoney=payorder.price
            		this.oid=payorder.id   //订单id
            	}
	          	let para={
	                oid:this.oid  //订单编号
	          	}
	          	findOrderItem(para).then((res) => {
			          this.commoditys = res.data.details
			          console.log("length"+res.data.length)
			          for(let i=1; i<=res.data.length;i++){
                          this.num=res.data[i]

                          console.log(this.num)
			          }
			        }).catch((res)=>{
                        console.log("err")
			        })
            },
            makeEvaluate(){
            	debugger
            	let para={
            		name:this.name,
            		//bid:1,
            		bid:this.commoditys.book.bid,
            		comment:this.currentcomment
            	}
            	
            	addComment(para).then((res) => {
            	/*	if(res.data==="成功！"){
            			this.$message({message:"wu",duration:1500})
            		}*/
			          this.commoditys = res.data
			        }).catch((res)=>{
                        console.log("err")
			        })
        		//
        	},
        	submitEvaluate(){
	              this.makeEvaluate()
        	}

      },
       components: {
       comheader,
       navmenu
    },
    computed:{

    }

  }
</script>
<style lang="scss" scoped>
.product{
	margin:20px auto;
}
.pmsg{
  width: 100%;
  height: 40px;
  line-height: 35px;
}
  .evaluate{
    width: 80%;
    margin:10px 10%;
  }
  .showProduct{
    margin: 20px 10%;
    width: 80%;
    height: 400px;
    border:1px solid #999;
  }
  .commodity{
    width: 45%;
    margin-right: 10%;
    float: left;
    background-color: beige;
    min-height: 300px;
  }
  .showRate{
    width: 45%;
    min-height: 300px;
    float: left;
    background-color: cornsilk;
  }
  .p1,.p2{
    margin-bottom: 10px;
    text-align: left;
    }
    .pimg{

    }
    .p2{
    }
  .txtrate{
  	resize: none;
  }
  //商品样式
.select_list_book{
   margin:10px 10px;
   text-overflow: ellipsis;
   p{
   	text-align: left;
   	text-indent: 20px;
   	margin-top: 5px;
   }
}
</style>
