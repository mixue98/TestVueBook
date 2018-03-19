<template>
  <div id="children">
	 
	 <comheader></comheader>
      <navmenu></navmenu>
      <h3 class="ptitle">{{title}}</h3>
       <div id="main" v-loading="loading2" element-loading-text="拼命加载中" >
	        
            <li class="goods-list" v-for="book in books" :key="book">
			    <router-link to="../detail" class="goods-list-link">  
				     <div class="goods-list-desc">				      
				        <p><img src="../../assets/book01.jpg" class="site-img" height="150" width="150"></p>
					    <p class="site-title">书名：{{book.bname}}</p>
					    <p class="site-author">作者：{{book.bauthor}}</p>
					    <p class="site-cont">简述：{{book.bintro}}</p>
					    <p class="site-bprice" style="color:red;">售价：{{book.bprice}}￥</p>   
                        <p class="site-bnum" style="color:red;" >数量：{{book_number}}个</p>
				    </div>
			    </router-link>
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
     <!--  <el-button type="success"  @click="refresh" size="small">刷新</el-button> -->
  </div>
</template>
<script>
import comheader from '../../components/comheader.vue'
import navmenu from '../../components/navmenu.vue'
import {findBooksByClassify,addToCart} from  '../../../src/api/account.js'
  export default{
    name: 'children',
     mounted(){
     	debugger
        this.getBooks()
    },
    data(){
        return{
          title:'儿童读物',
          totals: 1,  //总书数
	      size: 10,     //每页显示条数
	      page: 1,      //默认一页
 		  loading2: false,  
          book_number:1,       
          books:[]
        }
    },
    methods: {
    	refresh(){
    		this.getBooks()
    	},
    	getBooks(){
    		debugger
    		this.loading2= false
			let data={
 				page: this.page,
 				size: this.size,
 				key: 'child'
				}
			findBooksByClassify(data).then((res)=>{
				console.log(res.data)
				this.books=res.data.content   //				   
				this.totals = res.data.totalElements  //        
          		this.loading2 = false
            })	
    	},
    	handleCurrentChange(val){		
			 this.page=val
			 this.getBooks()
			 this.loading2= false
		},
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
	              console.log(data)
	              debugger
	            })
       }
    },
     components: {
       comheader,
       navmenu
    }
  }
</script>

<style scoped>
#children{
  width: 80%;height: 50px;
  margin: 10% auto;
}
.ptitle{
	margin:0px auto;
}
.addbook{
  color: red;
}
 .bookimg {
    height: 200px;
  }
  .text{
    text-align: center;
  }
  .listContainer {
    padding-top: 30px;
  }
/*书*/
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
</style>
