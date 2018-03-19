<template>
		<li class="goods-list" >
		    <router-link to="../bookdetail"  class="goods-list-link">
			     <div class="goods-list-desc">
			         <p><img src="../assets/book01.jpg" height="150" width="150"></p>
			         <p class="goods-list-name">{{ title }}</p>
			         <p class="goods-list-price">{{ price|dTofixed|dCurrency }}</p>
			    </div>
		    </router-link>
        <p class="site-cart"><el-button type="primary" @click="addCart(book.bid,book_number)">加入购物车</el-button></p>
    </li>
</template>

<script>
 import {findBooksByPage} from '../../src/api/account.js'
  export default {
  	name: 'booklist',
      mounted(){
        this.getList()
      },
    data () {
      return {
        title: '活着',
        price: '20￥',

      }
    },
    methods: {
       getList: function(){
          let params = {
            title: '',
            price: ''
          }
       },
       addCart(bid,num){

       },
   },
  }
</script>
<style lang="scss" scoped>
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
