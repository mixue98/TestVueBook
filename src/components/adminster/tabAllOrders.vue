<style lang="scss" scoped>
</style>

<template>
  <div id="allOrders">

    <el-table :data="allOrders" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
              style="width: 100%;" class="tf">
      <el-table-column type="index" width="60"></el-table-column>
      <el-table-column prop="oid" label="订单编号" width="120"  sortable ></el-table-column>
      <el-table-column prop="odate" label="订单时间" width="150" sortable ></el-table-column>
      <el-table-column prop="osend" label="配送方式" width="120"sortable></el-table-column>
      <el-table-column prop="oprice" label="价格" width="120" sortable></el-table-column>
      <el-table-column prop="oremark" label="备注" width="120" sortable></el-table-column>
      <el-table-column prop="address" label="收货地址" width="120" sortable></el-table-column>
      <el-table-column prop="ostate" label="订单状态" width="120" sortable></el-table-column>

      <el-table-column label="操作" fixed="right" width="150" >
        <template scope="scope">
          <el-button size="small" type="info" @click="seeDetail(scope.$index,scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-col :span="24" class="toolbar" >
      <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="size" :total="total"
                     style="float:right;">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
import {findAllOrder} from '../../api/account.js'
  export default {
    name: 'allOrders',
    mounted() {
      this.getallOrders()
    },
    data(){
      return{
        allOrders:[],
        size:5,
        total:1,
        page:1,
        username:null,
      }
    },
    methods:{
       handleCurrentChange(val) {
        this.page = val;
        this.getallOrders()
      },
      getallOrders(){
        let para={
          page:this.page,
          size:this.size
        }
        findAllOrder(para).then((res)=>{

           for(let i=0;i<res.data.content.length;i++){
             let pdate={
              time:res.data.content[i].odate
            }
            sessionStorage.setItem('odate',JSON.stringify(pdate))
            if (res.data.content[i].ostate === -1) {
              res.data.content[i].ostate = "待付款"
            } else if (res.data.content[i].ostate === 0) {
              res.data.content[i].ostate = "待发货"
            } else if (res.data.content[i].ostate === 1) {
              res.data.content[i].ostate = "待收货"
            } else if (res.data.content[i].ostate === 2) {
              res.data.content[i].ostate = "待评价"
            } else if (res.data.content[i].ostate===3) {
              res.data.content[i].ostate="已评价"
            }
          }
            this.total=res.data.totalElements
            this.allOrders=res.data.content
           // this.page=res.data.totalPages

        }).catch((res)=>{

        })
      },
      seeDetail(index,row){
        debugger
        let currentUserOrder = sessionStorage.getItem('userOrder')
               if(currentUserOrder){
              currentUserOrder=JSON.parse(currentUserOrder)
              this.username=currentUserOrder.name
                }
                console.log(this.username)
                 this.$message({message:"进入查看订单",duration:1500})
      },
    }
  }
</script>
