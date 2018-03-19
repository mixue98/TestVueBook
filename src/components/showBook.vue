<template>
  <div id="test">
       <!-- <el-button type="primary" v-on:click="getBooks" style="">搜索</el-button> -->
	   <h3>{{titletop}}</h3>
	   <div id="main" v-loading="loading2" element-loading-text="拼命加载中" >

            <li class="goods-list" v-for="book in books" :key="book">
			    <router-link to="../bookdetail" class="goods-list-link">
				     <div class="goods-list-desc" >
				        <p><img src="../assets/book01.jpg" class="site-img" height="150" width="150"></p>
				        <!--<p>{{book.bid}}</p>-->
					    <p class="site-title">书名：{{book.bname}}</p>
					    <p class="site-author">作者：{{book.bauthor}}</p>
					    <p class="site-cont">简述：{{book.bintro}}</p>
					    <p class="site-bprice" style="color:red;">售价：{{book.bprice}}￥</p>
               <p class="site-bnum" style="color:red;" >数量：{{book_number}}个</p>
				    </div>
			    </router-link>
            <!--  <p><el-button @click="clickDetail(bid)">详细</el-button></p>-->
			    <p class="site-cart"><el-button type="primary" @click="addCart(book.bid,book_number)">加入购物车</el-button></p>
		    </li>
	   </div>
	   <el-col :span="24" class="toolbar">
	        <el-pagination
			  small
			  layout="prev, pager, next"
			  :total="totals" @current-change="handleCurrentChange" :page-size="size"
			  style="margin-bottom:50px;">
			</el-pagination>
      </el-col>
  </div>
</template>

<script>
//import list from '../components/list'
import {findBooksByPage,addToCart} from '../api/account.js'
export default {
  name: 'test',
    mounted(){
        this.getBooks()
    },
	data () {
	    return {
	      titletop: '书籍展示',
	      totals: 1,  //总书数
	      size: 10,     //每页显示条数
	      page: 1,      //默认一页
 		  loading2: false,
          book_number:1,
          books:[],
        currentBid:null,
	  }
	},
	methods: {
		handleCurrentChange(val){
			// this.loading2= true
			 this.page=val
			 this.getBooks()
			 this.loading2= false
		},
		getBooks() {
			debugger
			this.loading2= false
			let data={
 				page: this.page,
 				size: this.size
       // totalElements:this.totals,  //总书数
				}
			findBooksByPage(data).then((res)=>{
				this.books=res.data.content   //
				this.totals = res.data.totalElements  //
          		this.loading2 = false
            })
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
         id: bookid,
         number:book_num
       }
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
                console.log(data)
              }
            }).catch((data)=>{
              console.log('err')
              })
	 	}
	 },
   clickDetail(bid){
     debugger
     let para={
       currentBid:bid
     }
     console.log(bid)
     sessionStorage.setItem('getBid',JSON.stringify(para))
     this.$router.push('../bookdetails')
   },
	components: {
	  //  list
	}
}
</script>

<style style="scss" scoped>
#test{
	width:100%;
    min-height:800px;
}
 #main{
 	width:80%;
    margin:30px 6% 50px 14%;
 }
 /* list */
 .goods-list {
    width: 18%;
    float: left;
    box-sizing: border-box;
    margin-bottom: 10px;
    margin-left: 5px;
   /*  border: 1px solid red; */
  }
  .goods-list-link {
    display: block;
    margin:10px 0;
    text-align: center;
    background-color: #fff;
  /*   border: 1px solid blue; */
  }

  .goods-list-pic {
    padding: 5px;
  }

  .goods-list-desc {
    border:1px solid gray;

  }
  p{
  	color: black;
  	margin-bottom:5px;
  }
  .site-bnum{
    display:none;
  }
  /*
   .goods-list-pic > img {
    width: auto;
    border:1px solid red;
  }

   .goods-list:nth-of-type(even) .goods-list-link{
    /*margin-left: 0;
  }
    .goods-list:nth-of-type(odd) .goods-list-link{
    /*margin-right: 0;
  }

  .goods-list-desc:after {
    display: block;
     content: '';
    clear: both;
  } */
 /*  .goods-list-name,.goods-list-price {
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
 } */
</style>
