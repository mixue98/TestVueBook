
<template>
    <div class="checkout">
         <h3>{{title}}</h3>
         <comheader></comheader>
         <navmenu></navmenu>
         <div class="addr-list">
            <p style="width:100%"><h4 class="padress">{{message1}}</h4></p><br>
            <ul>   <!--绑定数据-->
              <li v-for="(item,index) in filterAddress" v-bind:class="{'check':index==currentIndex}" @click="currentIndex=index">
                <dl>
                  <dt>{{item.aname}}</dt>
                  <dd class="address">{{item.aid}}:{{item.asite}}{{item.asited}}</dd>
                  <dd class="tel">{{item.aphone}}</dd>
                </dl>
                              
                <div class="addr-opration addr-set-default" v-if="!item.isDefault">
                  <a href="javascript:;" class="addr-set-default-btn" @click="setDefault(item.addressId)"><i>设为默认</i></a>
                </div>
                <div class="addr-opration addr-default" v-if="item.isDefault">默认地址</div>
              </li>
            </ul>
          </div>
        <div class="inventory">               
            <h4>{{message2}}</h4><br>
            <li class="select_list_book" v-for="product in products" :key="product">
                  <p><img src="../../assets/zanwu.png" width="50" height="50"></p>                 
                  <p class="product_bname">商品名称:{{product.book.bname}}</p>
                  <p class="product_bid">单价:{{product.book.bprice}}</p>
                  <p class="product_numbeer">数量：{{product.cbnumber}}</p>
                  <p class="product_cbprice">总价：{{product.cbprice}}</p>
            </li>
        </div>
        <p class="send_parttern">说明：配送方式默认为菜鸟裹裹</p>
        <el-button type="success" class="paybtn" @click="Gopayment" size="large">去支付</el-button>
    </div>
</template>
<script>
import {findAllAddress,showPaid} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
    export default {
        name: 'checkout',
        mounted(){
           this.getAddress()
           this.getList()  //商品
           this.getAddressList();  //newad
        },
        data(){
        	return {
	            title: '填写订单',
	            message: '收货人信息',
	            message1: '配送地址',
	            message2: '商品清单',
	            address:[],
	            sels:[],
	            addressList:[],
	            currentIndex:0,
	            limitNum:5,
	            money:0,
	            products:[],
                aid:null
        	}
        },
        methods: {
            Gopayment(){
	          	debugger
	             this.aid=this.addressList[this.currentIndex].aid
	                console.log(this.aid)
	          	let para={
	          		selecteAddress:this.aid, //传入地址id
	          		productPrice:this.money,
	             // productID:this.products  //商品数组id
	          	}
	          	sessionStorage.setItem('info',JSON.stringify(para)) //把信息存入session中
	            
	          	//获取选中的地址，商品信息，去支付页面
	           
	          	console.log("地址"+this.currentIndex)
	            console.log("proid"+this.products)
	          	console.log("jiage"+this.products.cbprice)
	            this.$router.push("../Paypage")
            },
            getAddress(){
	           	let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}
	    		let para = { 
	    			name:this.name	       
		        };
		        this.listLoading = true;	        
		        findAllAddress(para).then((res) => {
		        	if(res.data.length===0){
		        		this.$message({message:"暂无地址，前去添加",duration:1500})    
		        		this.$router.push("../address")
		        	}else{
		        		this.address = res.data
		                this.listLoading = false     
		        	}
		             
		        })

            },
            getAddressList: function() {
            	let userJsonStr = sessionStorage.getItem('user')
		          	if(userJsonStr){
		          		userJsonStr=JSON.parse(userJsonStr)
		          		this.name=userJsonStr.cname
		        }
		    	let para = { 
		    			name:this.name	       
			    }
				//var _this = this
				findAllAddress(para).then((res) => {
		          this.addressList = res.data

		          
		        })
		    },
		    setDefault:function(addressId){
				this.addressList.forEach(function(address,index){
					if(address.addressId==addressId){
						address.isDefault = true;
					}else{
						address.isDefault = false;
					}
				})
		    },
            getList(){
	           	debugger
	           	 let Proselection = sessionStorage.getItem('seleList')
	          	if(Proselection){
	          		Proselection=JSON.parse(Proselection)
	          		this.name=Proselection.name
	          		this.listid=Proselection.id  //商品清单id数组
	          	}
	          	let para={
	                name:this.name,
	                id:this.listid
	          	}
	            console.log("listid"+this.listid)
	          	showPaid(para).then((res) => {        		  
			          this.products = res.data
			          console.log("length"+res.data.length)			        
			          for(let i=0;i<res.data.length;i++){
	                       this.money+=res.data[i].cbprice
			          }			       		           
			        })
            }
      },
      computed: {
      	filterAddress:function(){
			return this.addressList.slice(0,this.limitNum);
		}
      },
       components: {
       comheader,
       navmenu
          
    }
    
  }
</script>
<style lang="scss" scoped>
  .checkout{
    width:80%;
    margin:10px 10%;   
    
  }
  h4{
    float:left;
  }
  .addressA{
    width:90%;
    margin:10px 5%;
    border:1px solid red;
  }
  .inventory{
   width:90%;
   height: 100%;
   margin:50px 5%;
   min-height: 150px;
  }
  .table_col{
  	text-align: left;
  }
  .paybtn{
    float:right;
    margin-right:5%;
    margin-bottom:50px;
    margin-top: 50px;
  }
//商品样式
.select_list_book{
	border:1px solid gray;
	width:20%;
	min-height:100px;
   float: left;
   margin:10px 10px;
   text-overflow: ellipsis;
}
//配送{
.send_parttern{
 float:left;
 margin:10px 10px;
}

//地址样式
.addr-list{
	
	 width:90%;
    margin:30px 5% 30px 5%;
    min-height:300px;
    border-bottom:1px solid gray;
}

.addr-list ul:after {
  visibility: hidden;
  display: block;
  content: " ";
  clear: both; }

.addr-list li {
	text-align:center;
  position: relative;
  float: left;
  width: 25%;
  height: 150px;
  margin: 10px 2% 10px 10px;
  background: #fff;
  border: 2px solid #e9e9e9;
  
  cursor: pointer;
   }
  .addr-list li dt {
    margin-bottom: 10px;
    font-size: 18px; 
}
  .addr-list li dd {
    margin-bottom: 6px;

    line-height: 20px; 
}
  .addr-list li .address {
  	
    text-overflow:ellipsis;
    height: 40px;
    overflow: hidden;
}
  .addr-list li .tel {
    color: #605F5F; 
}
  .addr-list li .addr-opration {
    position: absolute; }
    .addr-list li .addr-opration .icon {
      width: 100%;
      height: 100%; }
    .addr-list li .addr-opration:hover .icon {
      fill: #EE7A23; }
  .addr-list li .addr-edit {
    display: none;
    top: 20px;
    right: 20px;
    width: 20px;
    height: 20px; }
  .addr-list li .addr-del {
    display: none;
    bottom: 20px;
    right: 20px;
    width: 20px;
    height: 20px; }
  .addr-list li .addr-set-default, .addr-list li .addr-default {
    bottom: 15px;
    left: 20px;
    color: yellow;
     
     }
.addr-list li .addr-set-default {
  display: none;
}
  .addr-list li:nth-child(4n) {
    margin-right: 0; }
  .addr-list li:hover {
    border-color: #EE7A23; }
  .addr-list li.addr-new {
    color: #333;
    text-align: center; }
    .addr-list li.addr-new .add-new-inner {
      padding-top: 20px; }
      .addr-list li.addr-new .add-new-inner .icon-add {
        display: inline-block;
        width: 50px;
        height: 50px; }
        .addr-list li.addr-new .add-new-inner .icon-add .icon-add {
          width: 50px;
          height: 50px;
          fill: #605F5F; }
      .addr-list li.addr-new .add-new-inner p {
        margin-top: 10px; }
  .addr-list li.check {
    border-color: #EE7A23;
    border-width: 2px; }
    .addr-list li.check .addr-opration {
      display: block; }

</style>
