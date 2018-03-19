<template>
  <div id="collect">
    <comheader></comheader>
    <navmenu></navmenu>
    <h3 class="currentTitle">我的收藏</h3>
    <div id="tabs0">

      <ul class="menu0" id="menu0">
        <li @click="setTab(0,0)" class="hover">商品收藏</li>
        <li @click="setTab(0,1)">店铺收藏</li>
      </ul>
      <div class="main" id="main0">
        <ul class="block">
          <li v-show="s1">
            <!--<bookList></bookList>-->
            <div id="booklist">
              <p class="p1">全部商品分类显示</p>
              <li class="goods-list" >
              <router-link to="../bookdetail"  class="goods-list-link">
              <div class="goods-list-desc">
                <p><img src="../assets/book01.jpg" height="150" width="150"></p>
                <p class="goods-list-name">{{ title }}</p>
                <p class="goods-list-price">{{ price }}</p>
              </div>
              </router-link>
              <p class="site-cart"><el-button type="primary" @click="addCart(book.bid,book_number)">加入购物车</el-button></p>
              </li>
            </div>
      </li>
        </ul>
        <ul>
          <li>
            <shopList></shopList>
            <!--<div class="test">
              <p>shsh</p>
            </div>-->
          </li>
        </ul>
      </div>
    </div>
  <!--书籍分页-->
    <el-col :span="24" class="toolbar">
         <el-pagination
           small
           layout="prev, pager, next"
           :total="total" @current-change="handleCurrentChange" :page-size="size"
           style="margin-bottom:50px;">
         </el-pagination>
    </el-col>
  </div>
</template>

<script>
import pushgoods from '../components/magbook/GoodsList/pushgoods.vue'
  import tabE from '../components/magbook/tabE.vue'
  import tabBook from '../components/magbook/tabBook.vue'
  import tabShop from '../components/magbook/tabShop.vue'
import comheader from '../components/comheader.vue'
import navmenu from '../components/navmenu'
  import bookList from '../components/magbook/GoodsList/bookList.vue'
  import shopList from '../components/magshop/shopList.vue'
export default{
	name: 'collect',
	components: {
	  comheader,
	  navmenu,
    tabBook,
    tabShop,
    tabE,
    bookList,
    shopList,
    pushgoods
	},
  data(){
    return{
      s1:true,
      s2:false,
      page:1,
      size:10,
      total:30,
      title: '活着',
      price: '20￥',
    }
  },
  methods:{
    setTab(m,n){
     debugger
      var tli=document.getElementById("menu"+m).getElementsByTagName("li");
      var mli=document.getElementById("main"+m).getElementsByTagName("ul");
      for(let i=0;i<tli.length;i++){
        tli[i].className=i==n?"hover":"";
        mli[i].style.display=i==n?"block":"none";
//        if(this.s1==true){
//          this.s2=false
//        }else {
//          this.s1=false
//        }
      }
    },
    handleCurrentChange(val){
      this.page=val
    },
    addCart(bid,num){

    },
  }
}
</script>
<style lang="scss" scoped>
  .test{
    width: 100%;
    height: 100px;
    background-color: #8097f9;
  }
  .currentTitle{
    margin-bottom: 10px;
  }
  h3{
    margin: 20px auto;
  }
  a:link{
    color:#00F;
    text-decoration:none;
  }
  a:visited {
    color: #00F;
    text-decoration:none;
  }
  a:hover {
    color: #c00;

  }
  ul{
    list-style:none;
  }
  #collect{
    width: 80%;
    margin:80px 5% 10px 15%;
    height: 100%;
    /*font-size: 25px;*/

    /*border: 1px solid red;*/
  }
  .main{
    clear:both;
  /*  padding:8px;*/
    text-align:center;
  }
  #tabs0 {
   /* min-height: 200px;*/
    height: 100%;
    width: 100%;
    border: 1px solid gainsboro;
    /*border: 1px solid #aa49cb;*/
    background-color: #f2f6fb;
  }
  .menu0{
    width: 100%;
  }
  .menu0 li{
    display: block;
    float: left;
    padding: 4px 0;
    width:50%;
    text-align: center;
    cursor:pointer;
    background: #FFFFff;
  }
  .menu0 li.hover{
    background: #f2f6fb;
  }
  #main0 ul{
    display: none;
  }
  #main0 ul.block{
    display: block;
  }
  /*pushgoods*/
  .pushGoods{
    width: 100%;
    min-height: 100px;
    border: 1px solid gainsboro;
  }
  /*BOOKLIST*/
  #bookList{
    width:100%;
    height: 100%;
    border: 1px solid deeppink;
    background-color: darkorange;
  }
  .p1{
    text-align: left;
    /*font-size: 18px;*/
    margin: 10px auto;
  }
  /*...*/
  .goods-list {
    width: 18%;
    float: left;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-left: 5px;
  }
  /* .goods-list:nth-of-type(odd) {
     border-right: 1px solid #ccc;
     } */
  .goods-list:nth-of-type(even) {
    /* border-left: 1px solid #ccc;*/

  }

  .goods-list-link {
    display: block;
    margin:10px 0;
    text-align: center;
    background-color: #fff;
  }
  .goods-list:nth-of-type(even) .goods-list-link{
    /*margin-left: 0; */
  }
  .goods-list:nth-of-type(odd) .goods-list-link{
    /*margin-right: 0;*/
  }
  .goods-list-pic {
    padding: 5px;
  }
  .goods-list-pic > img {
    width: auto;
    border:1px solid red;
  }
  .goods-list-desc {
    border:1px solid gray;

  }
  .goods-list-desc:after {
    display: block;
    content: '';
    clear: both;
  }
  .goods-list-name,.goods-list-price {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #333;
    float: left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .goods-list-price {
    color: #ff8000;
    float: right;
  }
</style>
