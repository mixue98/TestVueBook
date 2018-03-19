<style lang="scss">
  .el-menu-demo{
    height: 40px;
    text-indent: 15%;

    line-height: 40px;
    background-color: #611014;
    color: whitesmoke;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
    vertical-align: middle;
    .in1{
      line-height: 40px;
    }
  }
  .con-ul{
    list-style: none;
    width: 100%;
    height: 35px;
    background-color: #611014;
    line-height: 35px;
    margin-top: 10px;
    color: white;
    font-weight: bold;
    >li{
      float: left;
      color: white;
      text-align: center;
      width: 150px;
    }
     li:hover{
       background-color: rgba(0, 0, 0, 0.77);
     }
    li:nth-child(1){
      margin-left: 20%;
      color: white;
      background-color: black;
    }
    .con-ul-link{
      color: white;
    }
  }
  .con-pin{
    width: 60%;
    margin: 10px auto;
    float:left;
  margin-left:20%;
     .con-pin-in{
       width: 50%;
       float: left;
     }
  }
  .con-pin-btn{
    float: left;
    margin-left: 10px;
  }
  .con-p1{
    width: 100%;
    img{
      width: 100%;
    }
  }
  /*轮播图样式*/
  .con-banner{
    width: 100%;
    height: 300px;
    margin: 10px auto;
    /*border: 1px solid red;*/
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 500px;
    /*height: 100%;*/
    margin: 0;
    /*border: 1px solid red;*/
  }

  .el-carousel__item:nth-child(2n) {
/*    background-color: #99a9bf;*/

    background: url("../assets/shop/s2.jpg") no-repeat center;
    background-size: 100% 100%;
  }

  .el-carousel__item:nth-child(2n+1) {
    /*background-color: #d3dce6;*/
    background: url("../assets/shop/s3.jpg") no-repeat center;
    background-size: 100% 100%;
  }
.con-p2{
  width: 70%;
  margin: 10px auto;
  img{
    width: 100%;
  }
}
  /*店铺信息*/
  .con-div{
    width: 70%;
    border: 1px solid green;
    min-height: 500px;
    margin: 10px auto;
  }
  .con-div-left{
    width: 20%;
    /*border: 1px solid gainsboro;*/
    float: left;
    height:100%;
  }
  .con-div-right{
    border-bottom: 1px solid black;
    border-top: 1px solid black;
    height: 100%;
    width: 72%;
    padding: 10px 10px;
    margin-left:5%;
    float: left;
  }
  .shop-detail{
   text-align: left;
    margin-bottom: 10px;
  }
  .sp1{
    font-weight: bold;
    line-height: 30px;
    text-align: center;
    background: black;
    color: white;
    height: 30px;
  }
  .sp2{
    width: 100%;
    text-align: center;
    img{
      width: 80%;
    }
  }
  .sp3{
    text-align: center;
    font-weight: bold;
  }
  .sp4,.sp5,.sp6,.sp7{
    text-indent: 10px;
  }
  .con-div-left-top1{
   border: 1px solid gainsboro;
  }
.con-div-left-top2{
  margin: 10px 10px;
}
  .sr1{
    border-bottom:1px solid black ;
  }
</style>

<template>
   <div id="shop">
      <comheader></comheader>
      <comsearch></comsearch>
      <navmenu></navmenu>
      <div class="content">
         <p class="con-p1"><img src="../assets/shop/s1.jpg"></p>
         <ul class="con-ul">
           <li><router-link to="../" class="con-ul-link" >首页</router-link></li>
           <li><router-link to="../" class="con-ul-link">儿童图书馆</router-link></li>
           <li><router-link to="../" class="con-ul-link">畅销书排行</router-link></li>
           <li><router-link to="../" class="con-ul-link">青春文学</router-link></li>
           <li><router-link to="../" class="con-ul-link">人文社科</router-link></li>
           <li><router-link to="../" class="con-ul-link">新书推荐</router-link></li>
           <li><router-link to="../" class="con-ul-link">专题页</router-link></li>
         </ul>
         <p class="con-pin">
           <el-input placeholder="平凡的世界" class="con-pin-in"></el-input>
           <el-button class="con-pin-btn" @click="curSearch" type="danger">本店搜索</el-button>
         </p>
        <el-carousel :interval="5000" arrow="always" class="con-banner">
          <el-carousel-item v-for="item in 2" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
          <p class="con-p2"><img src="../assets/shop/s4.jpg"></p>
          <!--店铺信息-->
          <div class="con-div">
            <!--zuo-->
             <div class="con-div-left">
                <div class="con-div-left-top1">
                  <p class="shop-detail sp1">店铺信息</p>
                  <p class="shop-detail sp2"><img src="../assets/zanwu.png"></p>
                  <p class="shop-detail sp3">{{shopname}}</p>
                  <p class="shop-detail sp4">开店时间{{opentime}}</p>
                  <p class="shop-detail sp5">所在地：{{openaddress}}</p>
                  <p class="shop-detail sp6">服务：{{service}}</p>
                  <p class="shop-detail sp7">商家评价：{{shopevaluate}}</p>
                </div>
                <p class="con-div-left-top2"><img src="../assets/shop/sp1.png"></p>
             </div>
            <!--you-->
            <div class="con-div-right">
                <h3 class="sr1">商品推荐</h3>

            </div>
          </div>
      </div>
      <p>{{shopname}}</p>
   </div>
</template>

<script>
  import comheader from '../components/comheader.vue'
  import comfooter from '../components/comfooter'
  import showBook from '../components/showBook.vue'
  import navmenu from '../components/navmenu.vue'
  import banner from '../components/banner.vue'
  import comsearch from '../components/comm/comsearch.vue'
  import comm from '../components/comm/comm.vue'
  export default{
  	name: 'shop',
  	mounted:{

  	},
    components:{
      comm,
      comsearch,
      comheader,
      comfooter,
      showBook,
      navmenu,
      banner
    },
  	data(){
  		return{
  			shopname: '获取当前店铺的名字',
        activeIndex: '1',
        opentime: null,
        openaddress:null,
        service:null,
        shopevaluate:null,
  		}
  	},
  	methods:{
      curSearch(){

      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },

  	},
  }
</script>
