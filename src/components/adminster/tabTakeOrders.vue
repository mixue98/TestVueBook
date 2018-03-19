<style lang="scss">
</style>

<template>
  <div id="TakeOrders">
    <el-table :data="TakeOrders" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
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
          <el-button size="small" type="success" @click="remindingSend(scope.$index,scope.row)">提醒收货</el-button>
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
import {findAllOrderByState} from '../../api/account.js'
  export default {
    name: 'TakeOrders',
    mounted() {
      this.getTakeOrders()
    },
    data(){
      return{
        TakeOrders:[],
        size:8,
        total:1,
        page:1
      }
    },
    methods:{
       handleCurrentChange(val) {
        this.page = val;
        this.getTakeOrders()
      },
      getTakeOrders(){
        debugger
        let para={
          page:this.page,
          size:this.size,
          state:"1"
        }
        findAllOrderByState(para).then((res)=>{
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
            this.TakeOrders=res.data.content
        }).catch((res)=>{

        })
      },
      remindingSend(index,row){

      },
    }
  }
</script>
