<template>
  <div id="shopcart">
  <p style="float:right;display: none">用户：{{name}}</p>
    <comheader></comheader>
    <navmenu></navmenu>

  <!--  <el-button type="danger" class="" style="float:right;margin-right:10%;" @click="refresh()" size="small">刷新</el-button> -->
    <div class="formtable">
      <p class="currentTitle">购物车</p>
         <!-- 列表 -->  <!--获取选中行的值来实现批量删除-->
        <el-table :data="books" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
                style="width: 100%;margin-left:10px" class="table_col">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" width="60"></el-table-column>
          <!-- prop 传值-->
          <el-table-column prop="bname" label="商品"  sortable></el-table-column>
          <el-table-column prop="bid" label="商品编号"  sortable></el-table-column>
          <el-table-column prop="bprice" label="价格"  sortable></el-table-column>
          <el-table-column prop="cbnumer" label="数量"  sortable></el-table-column>
          <el-table-column prop="cbprice" label="合计" sortable></el-table-column>
          <el-table-column label="操作" >
            <template scope="scope">
              <el-button type="danger" @click="delBook(scope.$index,scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      <!--工具条-->
      <el-col :span="24" class="toolbar">
         <el-button type="danger" class="batchDeleteBook" @click="batchDeleteBook" :disabled="this.sels.length===0">批量删除</el-button>
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total"
                       style="float:right;">
        </el-pagination>
      </el-col>
    </div>
        <p  class="check_out1"  size="small" disabled>总价：{{sum}} </p><br>
        <el-button type="success" class="check_out2" @click="GoCash" size="large">去下单</el-button>
  </div>
</template>
<script>
import {findAllCartByPage,removeToCart,removeByQuery,calculateTatolById} from '../api/account.js'
import comheader from '../components/comheader'
import comfooter from '../components/comfooter.vue'
import navmenu from '../components/navmenu.vue'
  export default {
    name: 'shopcart',
     mounted(){
        this.getShopBooks()
        debugger
         this.sumMoney()
    },
    data() {
      return {
        books:[],
        sum:0,
        total:1,
        sels:[],  //列表选中项
        page:1,
        size:10,
        listLoading:false,
        name:this.name
      }
    },
    methods: {
        refresh(){
	        debugger
	        this.getShopBooks()
	        this.sumMoney()
        },
	    handleCurrentChange(val) {
	        this.listLoading = true
	        this.page = val
	        this.getShopBooks()
	        this.sumMoney()
	        this.listLoading = false
	    },
        sumMoney(){
	        debugger
	        var listid=this.sels.map(item => item.bid)
	            let para = {
	              id: listid,
	             name:this.name
	            }
	            calculateTatolById(para).then((res) => {
	            	debugger
	              console.log("sum="+res.data)
	              this.sum=res.data
	              sessionStorage.setItem('seleList', JSON.stringify(para))
	          }).catch((res) => {
	              debugger
	          })
        },
        getShopBooks(){
	        let userJsonStr = sessionStorage.getItem('user')
	          	if(userJsonStr){
	          		userJsonStr=JSON.parse(userJsonStr)
	          		this.name=userJsonStr.cname
	          	}
	        let para={
	          page:this.page,
	          size:this.size,
	          name:this.name
	        }
	        this.listLoading=true
	        //请求购物车接口
	        findAllCartByPage(para).then((res) => {
	          //debugger
	          console.log(1)
	          this.total = res.data.totalElements
	          this.books = res.data.content
	          this.listLoading = false
	        })
        },
      selsChange: function (sels) {
        this.sels = sels
        this.sumMoney()
          this.sum=sum
      },
      //删除
        delBook(index, row){
	        this.$confirm('确认删除该商品吗?', '提示', {type: 'warning'}).then(() => {
	          this.listLoading = true
	          let para = {
	            name:this.name,
	            id: row.bid
	          }
	          //请求删除商品记录接口
	          removeToCart(para).then((res) => {
	            this.listLoading = false
	            console.log(2)
	            debugger
	            if(res.data==="成功！"){
	              this.listLoading = false
	              this.$message({
	                message: '删除成功',
	                type: 'success'
	              })
	              this.getShopBooks()
	              this.sumMoney()
	            }else{
	              this.listLoading = false
	              this.$message({
	                message: '删除失败',
	                type: 'error'
	              })
	              console.log(res.data)
	            }
	          })
	        }).catch((res) => {
	              console.log('err')
	              console.log(data)
	        })
      },
      //批量删除
      batchDeleteBook(){
          var ids = this.sels.map(item => item.bid)  //返回一个数组
          this.$confirm('确认删除选中记录吗？', '提示', {
            type: 'warning'
          }).then(() => {
            this.listLoading = true
/*
          let userJsonStr = sessionStorage.getItem('user')
          	if(userJsonStr){
          		userJsonStr=JSON.parse(userJsonStr)
          		this.name=userJsonStr.cname
          	}     */
            let para = {
              id: ids,
             name:this.name
            }
            removeByQuery(para).then((res) => {
              this.listLoading = false;
              this.$message({
                message: '删除成功',
                type: 'success'
              })
              this.getShopBooks();
            })
          }).catch((res) => {
            console.log("err")
          })
      },
      GoCash(){
      	//购物车为空时不跳转
        //获取选中的商品，计算总价，用户id
        if(this.sels.length<=0){
        	this.$message({message:"您还未选择商品！",duration:1500})
        }else{
        	 this.$router.push("../checkout")
        }
      }
    },
    computed:{

    },
  	components: {
  		comheader,
  		comfooter,
      navmenu
  	}
  }
</script>
<style scoped>
 .formtable{
  width: 80%;
  min-height: 50px;
  margin:80px auto;
 }
 .currentTitle{
   margin-bottom: 10px;
 }
 .money{
    float:right;
  width: 80%;
  height: 50px;
  line-height: 50px;
  margin:10px 10%;
  color: red;
 }
 .check_out1{
  margin-top:30px;
  float:right;
  margin-right:10%;
  color:red;
 }
 .check_out2{
 	margin-top:50px;
  float:right;
  margin-right:-5%;
 }
 .table_col{
  text-align:left;
 }
 .batchDeleteBook{
  float:left;
  margin-left:10px;
 }
 #shopcart{

 }
</style>
