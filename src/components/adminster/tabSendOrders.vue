<style lang="scss">
</style>

<template>
  <div id="SendOrders">
    <el-table :data="SendOrders" highlight-current-row v-loading="listLoading" @selection-change="selsChange"
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
          <el-button size="small" type="info" @click="remindingTake(scope.$index,scope.row)">去发货</el-button>
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
import {findAllOrderByState,updateState} from '../../api/account.js'
  export default {
    name: 'SendOrders',
    mounted() {
      this.getSendOrders()
    },
    data(){
      return{
        SendOrders:[],
        size:8,
        total:1,
        page:1
      }
    },
    methods:{
       handleCurrentChange(val) {
        this.page = val;
        this.getSendOrders()
      },
      getSendOrders(){
        debugger
        let para={
          page:this.page,
          size:this.size,
          state:"0"
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
            this.SendOrders=res.data.content
        }).catch((res)=>{

        })
      },
      remindingTake(index,row){
        debugger
        //获取该用户和订单，发货之后订单状态改变
         let currentUserOrder = sessionStorage.getItem('userOrder')
               if(currentUserOrder){
              currentUserOrder=JSON.parse(currentUserOrder)
              this.username=currentUserOrder.name
                }
                console.log(this.username)
                let para={
                  oid:row.oid
                }
                updateState(para).then((res)=>{
                      if(res.data==="成功"){
                        this.$message({message:"已发货",duration:1500})
                      }else{
                        this.$message({message:"发货失败",duration:1500})
                      }
                }).catch((res)=>{
                  this.$message({message:"异常",duration:1500})
                })
      },
    }
  }
</script>
