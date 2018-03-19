
<template>
    <div class="myevaluate">
         <h3>{{title}}</h3>
         <comheader></comheader>
         <navmenu></navmenu>
         <div class="product">
                      
         </div>         
    </div>
</template>
<script>
import {} from '../../../src/api/account.js'
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
    export default {
        name: 'myevaluate',
        mounted(){

        },
        data(){
        	return {
        		title: '我的评价',
        		value3: null,
                msg1: '显示商品',
                products:[],
        	}
        },
        methods: {
        	makeEvaluate(){
        		let payorder =sessionStorage.getItem('pay')
            	if(payorder){
            		payorder=JSON.parse(payorder)
            		this.sumMoney=payorder.price
            		this.oid=payorder.id   //订单id
            	}
        	}
            
      },
       components: {
       comheader,
       navmenu
    }
    
  }
</script>
<style lang="scss" scoped>
  .evaluate{
    width: 80%;
    margin:10px 10%;
  }
  .showProduct{
    margin-left: 20px;
    width: 40%;
    height: 400px;
    border:1px solid red;
    float: left;
  }
  .showRate{
    width: 40%;
    height: 400px;
    border:1px solid red;
    float: left;
    margin-left: 20px;
    
  }
  .p1{
      float: left;
     
    }
    .p2{
      float: left;
      margin-top: 20px;
    }
  .txtrate{

  }
  //商品样式
.select_list_book{
	border:1px solid gray;
	width:25%;
	min-height:100px;
   float: left;
   margin:10px 10px;
   text-overflow: ellipsis;
}
</style>
