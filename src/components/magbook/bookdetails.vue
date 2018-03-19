<template>
  <div class="detail">
    <comheader></comheader>
    <navmenu></navmenu>
    <comsearch></comsearch>
    <button click="refresh">刷新</button>
    <div class="deTainer">
       <P class="dt1"></P>
       <div class="dt2">
         <div class="dt2_1">
           <!--<img src="../../assets/zanwu.png" class="site-img" height="" width=""><br>-->
           <roasting></roasting>
           <p class="dt2_1_img2" @click="collectGoods">
             <img src="../../assets/samll/xing3.png" v-show="showwritecol" width="16" height="16">
             <img src="../../assets/samll/xing2.png" v-show="showredcol" width="16" height="16">
             商品收藏
           </p>
         </div>
         <div class="dt2_2">
           <p class="site-title">商品编号：{{goodsID}}</p>
           <p class="site-title">书名：{{bname}}</p>
           <p class="site-author">作者：{{bauthor}}</p>
           <p class="site-cont">简介：{{binfo}}</p>
           <p class="site-price">单价：{{bprice}}</p>
           <p class="site-price">库存：{{bstock}}</p>
           <el-input-number v-model="num1" @change="handleChange" :min="1" :max="max" class="site-number"></el-input-number>
           <p>服务：由<b>书城网</b>发货，并提供售后服务，默认支付方式为<b><i>支付宝支付</i></b>，默认快递方式为<b><i>菜鸟裹裹</i></b>。</p>
           <p class="site-cart">
             <el-button type="primary" @click="addCart(bookid,book_num)">加入购物车</el-button>
             <el-button type="danger" @click="buyNow()">立即购买</el-button>
           </p>
         </div>
         <div class="dt2_3">
            <p>店铺信息：</p>
            <button class="btn2" @click="collectShop"><img src="">店铺收藏</button>
            <button><router-link to="../currentShop">进入店铺</router-link></button>
            <div class="dt2_3_bottom">
              <li class="r1"><i class="ri1"></i><router-link to="">正品保障</router-link></li>
              <li class="r1"><i class="ri2"></i><router-link to="">服务支持</router-link></li>
              <li class="r1"><i class="ri3"></i><router-link to="">礼品包装</router-link></li>
              <li class="r1"><i class="ri4"></i><router-link to="">差价返还</router-link></li>
              <li class="r1"><i class="ri5"></i><router-link to="">15天换货</router-link></li>
              <li class="r1"><i class="ri6"></i><router-link to="">支持7天无理由退货</router-link></li>
              <li class="r1"><i class="ri7"></i><router-link to="">支持礼品卡</router-link></li>
            </div>
         </div>
       </div>
      <!--tab-->
       <div class="dt3">
         <div class="import-case-type-select import-case-type-select-active" id="csvTypeId">
           <a class="text-white" v-on:click="selectCaseType('csv','#csvTypeId')">
             <div class="font-logo"></div>
             <div><span class="english-font-style">商品详情</span></div>
           </a>
         </div>
         <div class="import-case-type-select import-case-type-select-active" id="fitTypeId">
           <a class="text-white" v-on:click="selectCaseType('fitProject','#fitTypeId')">
             <div class="font-logo"></div>
             <div><span class="english-font-style">商品评论</span></div>
           </a>
         </div>
         <!--<div class="import-case-type-select import-case-type-select-active" id="fitTypeSuiteId">
           <a class="text-white" v-on:click="selectCaseType('fitSuite','#fitTypeSuiteId')">
             <div class="font-logo"></div>
             <div><span class="english-font-style">商品问答</span></div>
           </a>
         </div>-->
         <!--tab 显示-->
         <!--tab 1 -->
         <div class="import-case-content" v-if="caseType==='csv'">
           <p>tab1</p>
           <div class="tab cont_1">
             <p>商品的基本信息</p>
           </div>
           <div class="tab cont_2">
             <p>内容简介</p>
           </div>
           <div class="tab cont_3">
             <p>作者简介</p>
           </div>
           <div class="tab cont_4">
             <p>书籍插画</p>
           </div>
         </div>
         <!-- tab2-->
         <div class="import-case-content" v-if="caseType==='fitProject'">
           <p>tab2</p>
           <tabE></tabE>
         </div>
         <!--<div class="import-case-content" v-if="caseType==='fitSuite'">
           <p>tab3</p>
         </div>-->
       </div>
    </div>
    <!-- <comfooter></comfooter>-->
  </div>
</template>
<script>
  import comheader from '../../components/comheader'
  import comfooter from '../../components/comfooter'
  import navmenu from '../../components/navmenu'
  import tabE from '../magbook/tabE.vue'
  import comsearch from '../../components/comm/comsearch.vue'
  import roasting from '../../components/comm/roasting.vue'
  import {addToCart,booksItem} from '../../api/account'
  export default {
  	 mounted(){
    this.getDetailBook()
    },
    data () {
      return {
        caseType:"csv",
        fileFileId:"",
        fitUrl:"",
        prefix:"",
        testSuite:"",
        testSuiteId:"",
        testProjectName:"",
        goodsID:null,
        bname: null,
        bauthor: null,
        binfo: null,
        bprice:null,
        bstock:null,
        showredcol:false,
        showwritecol:true,
        num1:1,
        max:10,  //对商品的限购数
      }
    },
    components: {
      comheader,
      comfooter,
      navmenu,
      tabE,
      comsearch,
      roasting,
    },
    methods: {
    	refresh(){
    		this.getDetailBook()
    	},
      handleChange(value) {  //数量值
        this.num1=value
        console.log(value);
      },
      changeMoney(row,num){
      },
      changeQuantity(row, type){
        if( type > 0 ){
          row.count++;
        }else{
          row.count > 1 ? row.count--: row.count = 1;
        }
        this.changeCount(row);
      },
      //数量文本框值改变
      changeCount (row) {
        if(null == row.count || row.count == ""){
          row.count=1;
        }
        row.totalPrice = (row.count * row.price).toFixed(2);//保留两位小数
        console.log(row.totalPrice+" = "+ row.count +" * "+ row.price)
        //增加商品数量也需要重新计算商品总价
      },
	    selectCaseType:function(type,selected){
	        this.caseType=type;
	        $("caseTypeId").find("div.import-case-type-select").each(function(){
	          $(this).removeClass("import-case-type-select-active");
	          $(this).find("a.text-white").each(function(){
	            $(this).removeClass("a.text-white");
	            $(this).addClass("text-muted");
	          });
	        });
	        var csvObj=$(selectedId);
	        csvObj.addClass("import-case-type-select-active");
	        $(this).removeClass("text-muted")
	        $(this).addClass("text-white")
	    },
      //加购物车
      addCart(bookid,book_num){
        debugger
        let userJsonStr = sessionStorage.getItem('user')
        if(userJsonStr){
          userJsonStr=JSON.parse(userJsonStr)
          this.name=userJsonStr.cname
        }
        let para={
          name:this.name,
          id: this.goodsID,
          number:this.num1
        }
        console.log(this.num1)
        sessionStorage.setItem('bookid',JSON.stringify(para))
        addToCart(para).then((data)=>{
          debugger
          if(data.data==="成功！"){
          console.log(this.name)
          this.$message({message:"加入成功",duration:1500})
        }else if(data.data==="用户名为空，请登陆"){
          this.$message({message:"用户名为空，请登陆",duration:1500})
          window.location.href = '../Logining'
        }else{
          this.$message({message:"加入失败",duration:1500})
          console.log('失败')
          console.log(data)
        }
      }).catch((data)=>{
          this.$message({message:"异常",duration:1500})
      })
      },
      //商品信息
      getDetailBook(){
        debugger
      	console.log(1)
        let thisbookid = sessionStorage.getItem('bookid')
        if(thisbookid){
          thisbookid=JSON.parse(thisbookid)
          //this.id=thisbookid.id
        }
        console.log("bid:"+thisbookid.id)
        /*alert(thisbookid.id)*/
        let para={
          bid:thisbookid.id
        }
        //接口
        booksItem(para).then((res)=>{
          debugger
				//返回信息
          this.goodsID=res.data.bid
          this.bname=res.data.bname
          this.bauthor=res.data.bauthor
          this.binfo=res.data.bintro
          this.bprice=res.data.bprice
        this.bstock=res.data.bstock
      }).catch ((res)=>{
          this.$message({message:"异常",duration:1500})
        })
      },
      //收藏商品
      collectGoods(){
        debugger
        //星星变颜色
        if(this.showredcol==true){
          this.showwritecol=true
          this.showredcol=false
        }else {
          this.showredcol=true
          this.showwritecol=false
        }
        if(this.showredcol==true){
          //进行添加商品收藏交互
         /* let para={
            name:"",
            bid:"",
            sid:"" //店铺id
          }*/

        }
      },
      ///收藏店铺
      collectShop(){
        let para={
          name:"",
          sid:""//店铺id
        }
        //收藏成功跳出提示语
      },
      //立即购买
      buyNow(){
        //获取商品的信息，存入session,跳转页面
          //获取的数量就是选择的数量
      },
      //商品详情
      GoodsDetail(){

      },
      //商品评价
      GoodsEvaluate(){

      },
      //进去店铺
      comeInShop(){

      },
      supportGiftCard(){

      },
    }
  }
</script>
<style lang="scss" scoped>
  .ri1{
    background-position: -20px -250px;
  }
  .r1:hover{
    text-decoration: underline;
  }
  .ri2{
    background-position: 0 -250px;
  }
  .ri4{
    background-position: -80px -250px;
  }
  .ri5{
    background-position: -40px -250px;
  }
  .ri3{
    background-position: 0 -270px;
  }
  .ri6{
    background-position: -20px -270px;
  }
  .ri7{
    background-position: -42px -814px;
  }

  .r1 >i{

    float: left;
    width: 20px;
    height: 20px;
    overflow: hidden;
    background-image: url('../../assets/samll/product_sprites.png');
    background-repeat: no-repeat;
    margin: 3px 3px 0 0;
  }
  .dt2_3_bottom{
    margin: 20px 0;
    width: 100%;
    height: 100%;
  }
  .dt2_3_bottom >li{
    float: left;
    margin-bottom: 10px;
    margin-right: 15px;
    color: #855758;
  }
  .dt2_3_bottom >li:last-child{
  }
  .site-number{
    margin:10px 0;
  }
  .import-case-type-select{
    float: left;
    width: 50%  ;
    height: 45px;
    line-height: 45px;
    background-color: gainsboro;
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
    background-color:whitesmoke;
  }
  .dt3{
    margin-top: 100px;
    width: 100%;
    /*border: 1px solid blue;*/
  }
  .dt2{
    width: 100%;
    min-height: 300px;
  }
  .dt2_1{
    width: 30%;
    float: left;
    height: 100%;/*
    border: 1px solid gold;*/
  .site-img{
    width:90%;
    /*background-color: antiquewhite;*/
    height: 50%;
  }
    .dt2_1_img2{
      width: 100%;
    }
  }
  .dt2_2{
    /*border: 1px solid green;*/
    width: 40%;
    float: left;
    margin-left: 3%;
    text-align: left;/*
    background-color: #d2ecf9;*/
    p{
      margin-bottom: 10px;
    }
  }
  .dt2_3{
    text-align: left;
    width: 20%;

    float: left;
    margin-left: 5%;
    /*background-color: bisque;*/
    button{
      border: none;
      height: 35px;
      width: 80px;
      background-color: gainsboro;
      cursor: pointer;
      border-radius: 5%;
    }
  }
.dt1{
	width:100%;
	height:80px	;
	/*border:1px solid green;*/
	margin:10px auto;
  background: url("../../assets/gg/gg01.jpg") no-repeat center;
}
  .deTainer{
    width: 80%;
    margin: 10px 5% 10px 15%;
    min-height: 300px;
    /*border: 1px solid red;*/
  }
  .btn2{
    width: 80px;
    height: 35px;
    background-color: gainsboro;
    border: none;
  }
  .site-title{
    font-weight: bold;
    font-size: 20px;
  }
</style>
