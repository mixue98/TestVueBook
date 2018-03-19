<style lang="scss" scoped>
  #manageOrder{
  }
  .main{
    margin: 80px 0 0 200px;
  }
  /*tab样式*/
   .import-case-type-select{
    float: left;
    width: 10%;
    height: 45px;
    line-height: 45px;
    background-color: #87afff;
     margin-right: 5px;
     border-radius: 5%;
     a{
      color: white;
     }
  }
  .tab{
    width: 100%;
    text-align: left;
    min-height: 100px;
    margin-bottom:50px ;
    p{
      background-color: gainsboro;
    }
  }
  .import-case-type-select:hover{
    background-color: #4861f5;
  }
  .import-case-type-select-active{
  }
  .ft{
    width: 100%;
    margin: auto;
  }
  .fb{
    width: 100%;
    margin: 10px 10px;
  }
  .import-case-content{
    width: 100%;
  }
  .text-white{
    color: red;
  }
  .text-muted{
    color: green;
  }
  .warp-breadcrum{
    margin: 10px 10px;
  }
</style>

<template>
  <div id="manageOrder">
    <adminHeader></adminHeader>
    <adminLeftMenu></adminLeftMenu>
    <div class="main">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/adminHome' }"><b>首页</b></el-breadcrumb-item>
          <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
      <el-col :span="24">
        <div class="ft">
          <div class="import-case-type-select import-case-type-select-active" id="allOrders">
            <a class="text-white" v-on:click="selectCaseType('all','#allOrders')">
              <div class="font-logo"></div>
              <div><span class="english-font-style">全部订单</span></div>
            </a>
          </div>
          <div class="import-case-type-select import-case-type-select-active" id="willPay">
            <a class="text-white" v-on:click="selectCaseType('pay','#willPay')">
              <div class="font-logo"></div>
              <div><span class="english-font-style">待付款</span></div>
            </a>
          </div>
          <div class="import-case-type-select import-case-type-select-active" id="willSend">
            <a class="text-white" v-on:click="selectCaseType('send','#willSend')">
              <div class="font-logo"></div>
              <div><span class="english-font-style">待发货</span></div>
            </a>
          </div>
          <div class="import-case-type-select import-case-type-select-active" id="willTake">
            <a class="text-white" v-on:click="selectCaseType('take','#willTake')">
              <div class="font-logo"></div>
              <div><span class="english-font-style">待收货</span></div>
            </a>
          </div>
          <div class="import-case-type-select import-case-type-select-active" id="willEvaluate">
            <a class="text-white" v-on:click="selectCaseType('evaluate','#willEvaluate')">
              <div class="font-logo"></div>
              <div><span class="english-font-style">待评价</span></div>
            </a>
          </div>
        </div>
      </el-col>
      <el-col :span="24">
        <div class="fb">
          <!--tab 显示-->
          <!--tab 1 -->
          <div class="import-case-content" v-if="caseType==='all'">
            <tabAllOrders></tabAllOrders>
          </div>
          <!-- tab2-->
          <div class="import-case-content" v-if="caseType==='pay'">
            <tabPayOrders></tabPayOrders>
          </div>
          <div class="import-case-content" v-if="caseType==='send'">
            <tabSendOrders></tabSendOrders>
          </div>
          <div class="import-case-content" v-if="caseType==='take'">
            <tabTakeOrders></tabTakeOrders>
          </div>
          <div class="import-case-content" v-if="caseType==='evaluate'">
            <tabEvaluateOrders></tabEvaluateOrders>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
  import adminLeftMenu from '../../components/adminster/adminLeftMenu.vue'
  import adminHeader from '../../components/adminster/adminHeader.vue'
import tabAllOrders from '../../components/adminster/tabAllOrders.vue'
import tabPayOrders from '../../components/adminster/tabPayOrders.vue'
import tabTakeOrders from '../../components/adminster/tabTakeOrders.vue'
import tabSendOrders from '../../components/adminster/tabSendOrders.vue'
import tabEvaluateOrders from '../../components/adminster/tabEvaluateOrders.vue'

  export default {
    name: 'manageOrder',
    mounted(){

    },
    data(){
      return {
        caseType:"all",
      }
    },
    methods:{
    	  selectCaseType:function(type,selected){
	        this.caseType=type;
	        $("caseTypeId").find("div.import-case-type-select").each(function(){
	          $(this).removeClass("import-case-type-select-active");
	          $(this).find("a.text-white").each(function(){
	            $(this).removeClass("a.text-white");
	            $(this).addClass("text-muted");
              $(this).addClass("click-bg")
	          });
	        });
	        var csvObj=$(selectedId);
	        csvObj.addClass("import-case-type-select-active");
	        $(this).removeClass("text-muted")
	        $(this).addClass("text-white")
          $(this).addClass("click-bg")
	    },

    },
    components:{
      tabAllOrders,
      tabPayOrders,
      tabTakeOrders,
      tabEvaluateOrders,
      tabSendOrders,
      adminHeader,
      adminLeftMenu
    }
  }
</script>
