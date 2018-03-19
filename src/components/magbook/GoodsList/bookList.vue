<style lang="scss" scoped>
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

<template>
  <div id="booklist">
    <p class="p1">全部商品分类显示</p>
    <li class="goods-list" >
      <router-link to="../bookdetail"  class="goods-list-link">
        <div class="goods-list-desc">
          <p><img src="../../../assets/book01.jpg" height="150" width="150"></p>
          <p class="goods-list-name">{{ title }}</p>
          <p class="goods-list-price">{{ price }}</p>
        </div>
      </router-link>
      <p class="site-cart"><el-button type="primary" @click="addCart(book.bid,book_number)">加入购物车</el-button></p>
    </li>
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
	import tabBook from '../tabBook.vue'
	import list from '../../../components/list.vue'
	export default {
		name: 'booklist',
		data(){
			return{
        page:1,
        size:10,
        total:30,
        title: '活着',
        price: '20￥',
			}
		},
		components:{
			tabBook,
			list
		},
    methods:{
      handleCurrentChange(val){
        this.page=val
      },
      addCart(bid,num){

      },
    }
	}
</script>
