<template>
   <div id="search">
     <!--logo-->
     <div class="s1"><img src="../../assets/logo.png" class="logo" width="200" height="100"></div>
     <!--search-->
     <div class="s2">
       <el-input v-model="filters.name" class="f1" placeholder="请输入你想搜索的东西"></el-input>
       <el-button type="danger" class="f2" @click="SearchGoods">搜索</el-button>
     </div>
     <!--btn-->
     <div class="s3">
         <router-link to=""><el-button type="danger" class="f3">购物车{{num}}</el-button></router-link>
       <router-link to=""><el-button type="success" class="f4">我的订单</el-button></router-link>
     </div>
   </div>
</template>
<script>
  import {searchBook} from '../../api/account'
  export default{
    name: 'search',
    data(){
        return{
          num:0,
          books:[],
          filters: {
            name: ''
          },
        }
    },
    methods:{
      SearchGoods(){
       //s this.listLoading = true
        let para={
          key:this.filters.name
        }
        searchBook(para).then((res)=>{
        this.books=res.data
        //this.listLoading = false;
      }).catch((res)=>{
          this.$message({message:"异常",duration:1500})
      })
      },
    }
  }
</script>

<style scoped lang="scss">
#search{
  width: 90%;
  height: 100px;
  margin: 50px 0 10px 10%;
}
  .s1,.s2,.s3{
     width: 33%;
    height: 100%;
    line-height: 100px;
  }
  .s1{
    text-align: left;
    text-indent: 20px;
    float: left;
  }
  .logo{
    margin-left: 0;
  }
  .s2{
    float: left;
    text-align: center;
  }
  .s3{
    float: right;
    text-align: center;
  }
  .f1{
    width: 70%;
  }
  .f2{
    width: 20%;
  }
  .f3,.f4{
    ;
  }
  .f4{
    margin-right: 0
  }
</style>
