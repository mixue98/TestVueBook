
<template>
    <div class="pay">
         <h3>{{title}}</h3>
         <comheader></comheader>
         <navmenu></navmenu>
         <div class="product">
            <h4 class="fel">订单号：{{orderID}} 订单时间：{{convertTime(orderTimed)}}</h4>
            <h4 class="fel">{{adsmsg}}</h4>
            <li class="fels">
	             <p class="product_bid">地址id:{{aid}}</p>
	             <p class="product_bid">收货人姓名:{{aname}}</p>
	             <p class="product_bid">所属地区:{{asite}}</p>
	             <p class="product_bid">电话:{{aphone}}</p>
	             <p class="product_bid">详细地址:{{asited}}</p>
	             <p class="product_bid">邮编:{{apostcode}}</p>
             </li>
           <!--<li class="pliaddress" v-for="addressd in addressds" :key="addressd">
             <p class="product_bid">地址id:{{addressd.aid}}</p>
             <p class="product_bid">收货人姓名:{{addressd.aname}}</p>
             <p class="product_bid">所属地区:{{addressd.asite}}</p>
             <p class="product_bid">电话:{{addressd.aphone}}</p>
             <p class="product_bid">详细地址:{{addressd.asited}}</p>
             <p class="product_bid">邮编:{{addressd.apostcode}}</p>
           </li>-->
            <li class="showProduct" v-for="commodity in commoditys" :key="commodity">

                <p class="pmsg">{{msg1}}</p>
                <p class="product_bid fel">详情id:{{commodity.did}}</p>
                <div class="pp"><img src="../../assets/zanwu.png" class="pimg" width="150" height="200"></div>
              <!--显示商品-->
                <div class="commodity">
                    <li class="select_list_book" >
                        <p class="product_bid">书编号:{{commodity.book.bid}}</p>
                        <p class="product_bname">商品名称:{{commodity.book.bname}}</p>
                        <p class="product_bid">类型:{{commodity.book.classify}}</p>
                        <p class="product_numbeer">数量：{{commodity.dnumber}}</p>
                        <p class="product_cbprice">总价：{{commodity.dprice}}</p>
                        <p class="product_cbprice">出版社：{{commodity.bpress}}</p>
                        <p class="product_cbprice">出版日期：{{commodity.bdate}}</p>
                        <p class="product_cbprice">作者：{{commodity.bauthor}}</p>
                        <p class="product_cbprice">书页数：{{commodity.bpage}}</p>
                        <p class="product_cbprice">书简介：{{commodity.bintro}}</p>
                        <p class="product_cbprice">库存量：{{commodity.bstock}}</p>
                        <p class="product_cbprice">图书类型：{{commodity.classify}}</p>

                    </li>
                </div>
            </li>
        </div>
    <!--<el-button type="success"  @click="refresh" size="small">刷新</el-button>-->
    </div>
</template>

<script>
import {findOrderItem} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
import {formatDate} from '../../utils/data.js'
import {dateFormat} from '../../utils/datatime.js'
    export default {
        name: 'pay',
        mounted(){
           this.getOrderID()
           this.getList()
        },
        data(){
        	return {
        		title: '订单详情',
                msg1: '商品信息',
                commoditys:[],   //商品数组 一个订单中有多个商品，每个商品都进行评价
                orderID:this.orderID,
                orderTimed:null,
                name:this.name,
               // addressds:[],
                aid:null,
                aname:null,
                asite:null,
                asited:null,
                aphone:null,
                apostcode:null,
                adsmsg:'地址详情'
        	}
        },
        methods: {
        	refresh(){
        		this.getOrderID()
        	},
        	getOrderID(){
              debugger
        		let detailorder =sessionStorage.getItem('detailOID')
            	if(detailorder){
            		detailorder=JSON.parse(detailorder)
            		this.orderTimed=detailorder.otime
            		this.orderID=detailorder.oid   //订单id
            	}
            	   this.orderID=this.orderID
            		let timeStamp=this.orderTimed
            
            	let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}	                    	        
        	},
        	convertTime (timestamp) {
		      let date = new Date(timestamp)
		      let fmt = 'yyyy-MM-dd HH:mm:ss'		      
		      return dateFormat(date, fmt)
		    },
        	getList(){
	           	debugger
	          	let payorder =sessionStorage.getItem('pay')
            	if(payorder){
            		payorder=JSON.parse(payorder)
            		this.sumMoney=payorder.price
            		this.oid=this.orderID   //订单id
            	}
	          	let para={
	                oid:this.orderID  //订单编号
	          	}
	          	findOrderItem(para).then((res) => {
	          		
                  this.aid=res.data.address.aid
                  this.aname=res.data.address.aname
                  this.aphone=res.data.address.aphone
                  this.asite=res.data.address.asite
                  this.asited=res.data.address.asited
                  this.apostcode=res.data.address.apostcode

                  console.log("address数组："+res.data.address.aid)
                  console.log("address数组："+res.data.address.aname)

	          		 this.commoditys = res.data.details
			        }).catch((res)=>{
                        console.log("err")
			        })
            },

      },
       components: {
       comheader,
       navmenu
    }

  }
</script>
<style lang="scss" scoped>
.product{
	width:80%;
	margin:20px 5% 20px 15%;

}
.fel{
	text-align:left;
	width:100%;
	margin:10px 10px;
}
.pmsg{
	text-align:left;
	margin:10px 10px;
}
.pp{
   width:40%;

}
.fels{
		text-align:left;
	width:100%;
	margin:10px 10px;
	text-indent:50px;

}
.pimg{
	float:left;

}
.commodity{
	background:#f5f5f5;
}
.select_list_book{
	margin-left:30%;
	width:50%;
	text-align:left;

}
</style>
